import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Certification,
  ContentItem,
  ContentKind,
  GalleryGroup,
  MediaFile,
  PageContent,
  Profile,
} from "./types";
import {
  byMostRecent,
  getMimeType,
  isImageFile,
  isReportFile,
  slugify,
  titleFromFolder,
} from "./utils";

const ROOT = /* turbopackIgnore: true */ process.cwd();
const ASSETS = path.join(ROOT, "Assets");
const CONTENTS = path.join(ROOT, "Contents");

const KIND_FOLDERS: Record<ContentKind, string> = {
  projects: "Projects",
  internships: "Internships",
  leadership: "Leadership",
};

const PLACEHOLDER_COVERS = [
  "/placeholders/cover-01.svg",
  "/placeholders/cover-02.svg",
  "/placeholders/cover-03.svg",
  "/placeholders/cover-04.svg",
  "/placeholders/cover-05.svg",
  "/placeholders/cover-06.svg",
];

/**
 * Decode a file buffer as text, tolerating UTF-16 (with or without BOM) and a
 * UTF-8 BOM. Windows editors (Notepad, PowerShell `>`) often save markdown as
 * UTF-16LE, which would otherwise make gray-matter fail to parse frontmatter
 * and silently blank out a page. This keeps content robust to that.
 */
function decodeBuffer(buffer: Buffer): string {
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
    return buffer.subarray(2).toString("utf16le");
  }
  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
    return buffer.subarray(2).swap16().toString("utf16le");
  }
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xef &&
    buffer[1] === 0xbb &&
    buffer[2] === 0xbf
  ) {
    return buffer.subarray(3).toString("utf8");
  }
  // BOM-less UTF-16LE heuristic: ASCII-range markdown produces many 0x00 bytes
  // in the high byte of each code unit.
  const sample = buffer.subarray(0, 64);
  let nulls = 0;
  for (const byte of sample) if (byte === 0x00) nulls += 1;
  if (sample.length > 8 && nulls / sample.length > 0.25) {
    return buffer.toString("utf16le");
  }
  return buffer.toString("utf8");
}

function readFileSafe(filePath: string): string {
  try {
    return decodeBuffer(fs.readFileSync(filePath)).replace(/\r\n/g, "\n").trim();
  } catch {
    return "";
  }
}

function listSubdirs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function mediaUrl(kind: ContentKind, ...parts: string[]): string {
  const segments = [KIND_FOLDERS[kind], ...parts.flatMap((p) => p.split("/"))];
  return `/media/${segments.map((s) => encodeURIComponent(s)).join("/")}`;
}

function profileMediaUrl(filename: string): string {
  return `/media/Profile/${encodeURIComponent(filename)}`;
}

function toMedia(kind: ContentKind, urlParts: string[], filename: string): MediaFile {
  return {
    name: filename
      .replace(/\.[^.]+$/, "")
      .replace(/^WhatsApp Image\s+/i, "Photo ")
      .replace(/^IMG-\d{8}-WA/i, "Photo ")
      .replace(/^IMG[-_]?/i, "Photo ")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
    filename,
    url: mediaUrl(kind, ...urlParts, filename),
    mimeType: getMimeType(filename),
  };
}

/** Order gallery groups: concept-style first, detailed-style last, else alpha. */
function galleryRank(title: string): number {
  const t = title.toLowerCase();
  if (/concept|overview|schematic|preliminary/.test(t)) return 0;
  if (/detail|documentation|construction|analysis|final/.test(t)) return 2;
  return 1;
}

function collectMedia(
  kind: ContentKind,
  folderName: string,
  folderPath: string,
): { images: MediaFile[]; reports: MediaFile[]; galleries: GalleryGroup[] } {
  if (!fs.existsSync(folderPath)) {
    return { images: [], reports: [], galleries: [] };
  }

  const entries = fs.readdirSync(folderPath, { withFileTypes: true });
  const rootFiles = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => !/^description\.md$/i.test(name))
    .sort((a, b) => a.localeCompare(b));

  const rootImages: MediaFile[] = [];
  const reports: MediaFile[] = [];
  for (const filename of rootFiles) {
    const media = toMedia(kind, [folderName], filename);
    if (isImageFile(filename)) rootImages.push(media);
    else if (isReportFile(filename)) reports.push(media);
  }

  // Each immediate subfolder becomes a titled gallery group.
  const subdirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));

  const subGroups: GalleryGroup[] = [];
  const subImages: MediaFile[] = [];
  for (const sub of subdirs) {
    const subImgs = fs
      .readdirSync(path.join(folderPath, sub), { withFileTypes: true })
      .filter((e) => e.isFile() && isImageFile(e.name))
      .map((e) => e.name)
      .sort((a, b) => a.localeCompare(b))
      .map((filename) => toMedia(kind, [folderName, sub], filename));
    if (subImgs.length > 0) {
      subGroups.push({ title: sub, images: subImgs });
      subImages.push(...subImgs);
    }
  }
  subGroups.sort(
    (a, b) => galleryRank(a.title) - galleryRank(b.title) || a.title.localeCompare(b.title),
  );

  let galleries: GalleryGroup[];
  if (subGroups.length > 0) {
    galleries =
      rootImages.length > 0
        ? [{ title: "Overview", images: rootImages }, ...subGroups]
        : subGroups;
  } else {
    galleries = rootImages.length > 0 ? [{ title: "", images: rootImages }] : [];
  }

  return { images: [...rootImages, ...subImages], reports, galleries };
}

function firstParagraph(markdown: string): string {
  const plain = markdown
    .replace(/^#+\s+/gm, "")
    .replace(/\*\*?/g, "")
    .trim();
  const block = plain.split(/\n{2,}/).find((part) => part.trim().length > 0);
  if (!block) return "";
  const sentence = block.replace(/\n/g, " ").trim();
  if (sentence.length <= 220) return sentence;
  // Truncate at a word boundary rather than mid-word.
  const clipped = sentence.slice(0, 217);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 120 ? clipped.slice(0, lastSpace) : clipped).trim()}…`;
}

function titleFromBody(markdown: string, fallback: string): string {
  const heading = markdown.match(/^#\s+(.+)$/m);
  if (heading?.[1]) return heading[1].trim();
  return fallback;
}

function parseStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function loadItem(kind: ContentKind, folderName: string): ContentItem {
  const folderPath = path.join(ASSETS, KIND_FOLDERS[kind], folderName);
  const descriptionPath = path.join(folderPath, "Description.md");
  const raw = readFileSafe(descriptionPath);
  const { data, content } = matter(raw || "---\n---\n");
  const { images, reports, galleries } = collectMedia(kind, folderName, folderPath);
  const slug = slugify(typeof data.slug === "string" ? data.slug : folderName);
  const coverFromFrontmatter =
    typeof data.cover === "string" && data.cover
      ? mediaUrl(kind, folderName, data.cover)
      : undefined;
  const cover =
    coverFromFrontmatter ??
    images[0]?.url ??
    PLACEHOLDER_COVERS[
      Math.abs(
        [...folderName].reduce((acc, char) => acc + char.charCodeAt(0), 0),
      ) % PLACEHOLDER_COVERS.length
    ];

  const body = content.trim();
  const inferredTitle = titleFromBody(body, titleFromFolder(folderName));
  const inferredSummary = firstParagraph(body);

  const defaultSummary =
    kind === "projects"
      ? `Placeholder summary for ${folderName}. Replace this in Assets/${KIND_FOLDERS[kind]}/${folderName}/Description.md.`
      : inferredSummary || `Overview for ${folderName}.`;

  let orderedImages = images;
  if (typeof data.cover === "string" && data.cover) {
    const coverIndex = images.findIndex((image) => image.filename === data.cover);
    if (coverIndex > 0) {
      orderedImages = [
        images[coverIndex],
        ...images.slice(0, coverIndex),
        ...images.slice(coverIndex + 1),
      ];
    }
  }

  const placeholderImages: MediaFile[] = [
    {
      name: "Placeholder gallery image",
      filename: "placeholder.svg",
      url: cover,
      mimeType: "image/svg+xml",
    },
    {
      name: "Placeholder detail",
      filename: "placeholder-2.svg",
      url:
        PLACEHOLDER_COVERS[
          (PLACEHOLDER_COVERS.indexOf(cover) + 1) % PLACEHOLDER_COVERS.length
        ] ?? PLACEHOLDER_COVERS[0],
      mimeType: "image/svg+xml",
    },
  ];
  const usePlaceholder = images.length === 0 && kind === "projects";
  const finalGalleries: GalleryGroup[] = usePlaceholder
    ? [{ title: "", images: placeholderImages }]
    : galleries;

  return {
    slug,
    kind,
    title:
      typeof data.title === "string" && data.title
        ? data.title
        : inferredTitle,
    summary:
      typeof data.summary === "string" && data.summary
        ? data.summary
        : defaultSummary,
    body:
      body ||
      `## Overview\n\nThis is placeholder content for **${folderName}**. Add details to \`Description.md\` to replace it.\n\nDrop images into this folder for the gallery, and PDF/DOCX files for downloadable reports.`,
    technologies: parseStringList(data.technologies),
    learnings: parseStringList(data.learnings),
    year: typeof data.year === "string" ? data.year : undefined,
    period:
      typeof data.period === "string" && data.period
        ? data.period
        : typeof data.year === "string" && data.year
          ? data.year
          : undefined,
    role: typeof data.role === "string" ? data.role : undefined,
    organization:
      typeof data.organization === "string" ? data.organization : undefined,
    discipline:
      typeof data.discipline === "string" && data.discipline
        ? data.discipline
        : undefined,
    link:
      typeof data.link === "string" && data.link ? data.link : undefined,
    featured: Boolean(data.featured),
    cover,
    images: usePlaceholder ? placeholderImages : orderedImages,
    galleries: finalGalleries,
    reports,
    folderPath,
  };
}

export function getItems(kind: ContentKind): ContentItem[] {
  const dir = path.join(ASSETS, KIND_FOLDERS[kind]);
  return listSubdirs(dir)
    .map((folder) => loadItem(kind, folder))
    .sort(byMostRecent);
}

export function getItemBySlug(
  kind: ContentKind,
  slug: string,
): ContentItem | undefined {
  return getItems(kind).find((item) => item.slug === slug);
}

export function getAllProjects(): ContentItem[] {
  return getItems("projects");
}

export function getFeaturedProjects(): ContentItem[] {
  const projects = getAllProjects();
  const featured = projects.filter((project) => project.featured);
  return featured.length > 0 ? featured : projects.slice(0, 3);
}

export function getProfile(): Profile {
  const raw = readFileSafe(path.join(ASSETS, "Profile", "Description.md"));
  const { data, content } = matter(raw || "---\n---\n");
  const profileDir = path.join(ASSETS, "Profile");
  const allDocuments: MediaFile[] = fs.existsSync(profileDir)
    ? fs
        .readdirSync(profileDir, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((name) => !/^description\.md$/i.test(name))
        .filter((name) => isReportFile(name))
        .sort((a, b) => a.localeCompare(b))
        .map((filename) => ({
          name: filename
            .replace(/\.[^.]+$/, "")
            .replace(/[-_]+/g, " ")
            .replace(/\s+/g, " ")
            .trim(),
          filename,
          url: profileMediaUrl(filename),
          mimeType: getMimeType(filename),
        }))
    : [];

  // Detect a resume/CV file (prefer PDF for in-browser preview), then surface
  // it as `resume` and keep it out of the generic Documents list.
  const isResume = (file: MediaFile) => /resume|cv/i.test(file.filename);
  const resume =
    allDocuments.find((f) => isResume(f) && /\.pdf$/i.test(f.filename)) ??
    allDocuments.find(isResume);
  const documents = allDocuments.filter(
    (f) => !isResume(f) && f.url !== resume?.url,
  );

  return {
    name:
      typeof data.name === "string" && data.name
        ? data.name
        : "Your Name",
    title:
      typeof data.title === "string" && data.title
        ? data.title
        : "Civil & Digital Engineering",
    tagline:
      typeof data.tagline === "string" && data.tagline
        ? data.tagline
        : "Designing precise infrastructure with clarity, systems thinking, and modern digital tools.",
    location:
      typeof data.location === "string" && data.location
        ? data.location
        : "Melbourne, Australia",
    email:
      typeof data.email === "string" && data.email
        ? data.email
        : "hello@example.com",
    studentEmail:
      typeof data.studentEmail === "string" ? data.studentEmail : undefined,
    phone: typeof data.phone === "string" ? data.phone : undefined,
    linkedin:
      typeof data.linkedin === "string" ? data.linkedin : undefined,
    github: typeof data.github === "string" ? data.github : undefined,
    body:
      content.trim() ||
      "Placeholder about section. Edit `Assets/Profile/Description.md` to introduce yourself, your focus areas, and what you are looking for next.",
    credentials: parseStringList(data.credentials),
    resume,
    documents,
  };
}


const CERTIFICATIONS: Certification[] = [
  {
    label: "CAPM®",
    issuer: "Certified Associate in Project Management · PMI",
    monogram: "PM",
    file: "capm.png",
  },
  {
    label: "ACCA",
    issuer: "Advanced Diploma in Accounting & Business",
    monogram: "AC",
    file: "acca.png",
  },
  {
    label: "Monash University",
    issuer: "BEng (Hons) Civil Engineering",
    monogram: "M",
    file: "monash.png",
  },
].map(({ file, ...rest }) => {
  const exists = fs.existsSync(
    path.join(ROOT, "public", "badges", file),
  );
  return exists ? { ...rest, image: `/badges/${file}` } : rest;
});

export function getCertifications(): Certification[] {
  return CERTIFICATIONS;
}

export function getPageContent(
  filename: "About" | "Projects" | "Internships" | "Leadership",
): PageContent {
  const raw = readFileSafe(path.join(CONTENTS, `${filename}.md`));
  const { data, content } = matter(raw || "---\n---\n");
  const fallbacks: Record<typeof filename, PageContent> = {
    About: {
      title: "About",
      intro:
        "An engineer focused on digital delivery, sustainable design, and clear communication.",
      body: "Replace this copy in `Contents/About.md`.",
    },
    Projects: {
      title: "Projects",
      intro:
        "Selected engineering work spanning digital twins, BIM, design technology, and infrastructure.",
      body: "Each project page is generated from folders in `Assets/Projects`.",
    },
    Internships: {
      title: "Internships",
      intro: "Industry experience across consulting, construction, and public infrastructure.",
      body: "Add internship details under `Assets/Internships`.",
    },
    Leadership: {
      title: "Leadership",
      intro: "Roles that built community, communication, and ownership beyond coursework.",
      body: "Add leadership entries under `Assets/Leadership`.",
    },
  };

  const fallback = fallbacks[filename];

  const bodyText = content.trim();
  const derivedIntro = firstParagraph(bodyText);

  return {
    title:
      typeof data.title === "string" && data.title
        ? data.title
        : titleFromBody(bodyText, fallback.title),
    intro:
      typeof data.intro === "string" && data.intro
        ? data.intro
        : derivedIntro || fallback.intro,
    body: bodyText || fallback.body,
  };
}

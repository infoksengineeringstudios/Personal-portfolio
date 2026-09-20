export type ContentKind = "projects" | "internships" | "leadership";

export interface ContentItem {
  slug: string;
  kind: ContentKind;
  title: string;
  summary: string;
  body: string;
  technologies: string[];
  learnings: string[];
  year?: string;
  period?: string;
  role?: string;
  organization?: string;
  /** e.g. "Civil", "Digital", "Design & build" — used for filtering/labelling. */
  discipline?: string;
  /** Optional external URL — a live site or repository for the project. */
  link?: string;
  featured: boolean;
  cover?: string;
  images: MediaFile[];
  /** Gallery sections. One per image subfolder (title = folder name), or a
   * single untitled group when the project has no subfolders. */
  galleries: GalleryGroup[];
  reports: MediaFile[];
  folderPath: string;
}

export interface GalleryGroup {
  title: string;
  images: MediaFile[];
}

export interface MediaFile {
  name: string;
  filename: string;
  url: string;
  mimeType: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  studentEmail?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  body: string;
  credentials: string[];
  resume?: MediaFile;
  documents: MediaFile[];
}

export interface PageContent {
  title: string;
  intro: string;
  body: string;
}

export interface Certification {
  /** Short display name, e.g. "CAPM®". */
  label: string;
  /** Issuer / what it is, e.g. "Project Management Institute". */
  issuer: string;
  /** Two-letter fallback monogram shown when no badge image is present. */
  monogram: string;
  /** Badge image URL under /badges, present only when the file exists. */
  image?: string;
  /** Optional verification / credential URL. */
  href?: string;
}

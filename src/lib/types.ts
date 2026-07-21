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
  featured: boolean;
  cover?: string;
  images: MediaFile[];
  reports: MediaFile[];
  folderPath: string;
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

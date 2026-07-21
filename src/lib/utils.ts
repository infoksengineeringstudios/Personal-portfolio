export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleFromFolder(folderName: string): string {
  return folderName.trim();
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const MONTH_NAMES: Record<string, string> = {
  jan: "January",
  feb: "February",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  sept: "September",
  oct: "October",
  nov: "November",
  dec: "December",
};

/**
 * Expand abbreviated month names to their full form, e.g.
 * "Feb 2027 – Jun 2027" → "February 2027 – June 2027".
 * Word boundaries mean already-full names (April, July, …) are left untouched.
 */
export function expandMonths(value: string): string {
  return value.replace(
    /\b(jan|feb|mar|apr|may|jun|jul|aug|sept|sep|oct|nov|dec)\b\.?/gi,
    (match, abbr: string) => MONTH_NAMES[abbr.toLowerCase()] ?? match,
  );
}

export function getExperiencePeriod(item: {
  period?: string;
  year?: string;
}): string | undefined {
  const raw = item.period ?? item.year;
  return raw ? expandMonths(raw) : raw;
}

export function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    svg: "image/svg+xml",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  return map[ext] ?? "application/octet-stream";
}

export function isImageFile(filename: string): boolean {
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(filename);
}

export function isReportFile(filename: string): boolean {
  return /\.(pdf|docx?|pptx?|xlsx?)$/i.test(filename);
}

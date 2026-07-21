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

const MONTH_INDEX: Record<string, number> = {
  january: 0, jan: 0,
  february: 1, feb: 1,
  march: 2, mar: 2,
  april: 3, apr: 3,
  may: 4,
  june: 5, jun: 5,
  july: 6, jul: 6,
  august: 7, aug: 7,
  september: 8, sept: 8, sep: 8,
  october: 9, oct: 9,
  november: 10, nov: 10,
  december: 11, dec: 11,
};

/** Convert a single date token ("Nov 2025", "2024", "Present") to a sortable number. */
function datePointValue(token: string): number | null {
  const t = token.trim().toLowerCase();
  if (!t) return null;
  if (/^(present|current|now|ongoing)$/.test(t)) return Number.POSITIVE_INFINITY;
  const withMonth = t.match(/^([a-z]+)\.?\s+(\d{4})$/);
  if (withMonth) {
    const month = MONTH_INDEX[withMonth[1]];
    if (month !== undefined) return Number(withMonth[2]) * 12 + month;
  }
  const yearOnly = t.match(/^(\d{4})$/);
  if (yearOnly) return Number(yearOnly[1]) * 12 + 6;
  return null;
}

/**
 * Sortable {start, end} keys for an experience period like
 * "July 2025 – Nov 2025" or "May 2024 – Present". Higher = more recent.
 */
export function periodSortValue(
  period?: string,
  year?: string,
): { start: number; end: number } {
  const raw = (period ?? year ?? "").trim();
  const parts = raw.split(/\s*[–—-]\s*/);
  const start = datePointValue(parts[0] ?? "") ?? Number.NEGATIVE_INFINITY;
  const end =
    parts.length > 1 ? datePointValue(parts[1] ?? "") ?? start : start;
  return { start, end };
}

/** Compare two experience items, most recent first (reverse-chronological). */
export function byMostRecent(
  a: { period?: string; year?: string },
  b: { period?: string; year?: string },
): number {
  const ka = periodSortValue(a.period, a.year);
  const kb = periodSortValue(b.period, b.year);
  const cmp = (x: number, y: number) => (x === y ? 0 : x > y ? 1 : -1);
  return cmp(kb.end, ka.end) || cmp(kb.start, ka.start);
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

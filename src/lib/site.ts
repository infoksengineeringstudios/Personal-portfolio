/**
 * Canonical site origin, resolved in this order:
 *   1. NEXT_PUBLIC_SITE_URL  — set this in Vercel/prod to your final domain
 *   2. VERCEL_URL            — auto-provided on Vercel deployments (preview/prod)
 *   3. http://localhost:3000 — local development fallback
 *
 * Used by metadataBase, sitemap.ts, and robots.ts so OpenGraph/canonical
 * URLs point at the real domain instead of localhost.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = getSiteUrl();

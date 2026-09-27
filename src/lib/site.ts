/**
 * Canonical site origin, resolved in this order:
 *   1. NEXT_PUBLIC_SITE_URL   — override if the final domain ever changes
 *   2. https://www.ksantchurn.com — the production canonical origin (default)
 *
 * We deliberately do NOT fall back to VERCEL_URL: canonical, og:url and
 * og:image must always point at the real domain, never at a per-deployment
 * *.vercel.app preview URL. Used by metadataBase, sitemap.ts and robots.ts.
 */
const PRODUCTION_ORIGIN = "https://www.ksantchurn.com";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  return PRODUCTION_ORIGIN;
}

export const SITE_URL = getSiteUrl();

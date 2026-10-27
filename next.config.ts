import type { NextConfig } from "next";

// Content-Security-Policy: locks the site to its own origin, blocks it being
// framed/clickjacked, and only allows the Vercel analytics/insights endpoints.
// 'unsafe-inline'/'unsafe-eval' are kept for Next.js' inline runtime so the
// site can't break; everything else is tightly scoped.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    // Local Assets are served via /media; placeholders are SVG.
    unoptimized: true,
  },
  // Ensure Assets are available to the /media route on Vercel.
  outputFileTracingIncludes: {
    "/media/[...path]": ["./Assets/**/*"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/internships/taylemay-group",
        destination: "/internships/tayelamay-group",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

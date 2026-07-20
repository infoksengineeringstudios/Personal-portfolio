import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local Assets are served via /media; placeholders are SVG.
    unoptimized: true,
  },
  // Ensure Assets are available to the /media route on Vercel.
  outputFileTracingIncludes: {
    "/media/[...path]": ["./Assets/**/*"],
  },
};

export default nextConfig;

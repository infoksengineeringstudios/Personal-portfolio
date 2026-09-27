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

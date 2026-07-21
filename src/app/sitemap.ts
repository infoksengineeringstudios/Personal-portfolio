import type { MetadataRoute } from "next";
import { getItems } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/internships`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/leadership`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = (
    ["projects", "internships", "leadership"] as const
  ).flatMap((kind) =>
    getItems(kind).map((item) => ({
      url: `${SITE_URL}/${kind}/${item.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  );

  return [...staticRoutes, ...dynamicRoutes];
}

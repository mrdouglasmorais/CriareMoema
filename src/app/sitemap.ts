import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/** Somente a home — demais rotas desativadas por ora. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

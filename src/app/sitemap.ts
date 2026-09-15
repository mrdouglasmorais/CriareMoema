import type { MetadataRoute } from "next";
import { ambientes } from "@/data/ambientes";
import { getPublishedPosts } from "@/lib/posts/repository";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();
  const publishedPosts = await getPublishedPosts();

  const ambienteUrls: MetadataRoute.Sitemap = ambientes.map((ambiente) => ({
    url: `${base}/ambientes/${ambiente.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogUrls: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/ambientes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...ambienteUrls,
    {
      url: `${base}/catalogo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/para-profissionais`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...blogUrls,
    {
      url: `${base}/privacidade`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/termos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

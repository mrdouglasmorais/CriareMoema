import type { BlogBlock } from "@/data/blog";
import type { PostInput, PostStatus, StudioPost } from "@/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function isBlogBlock(value: unknown): value is BlogBlock {
  if (!isRecord(value) || typeof value.type !== "string") return false;

  if (value.type === "paragraph" || value.type === "callout") {
    return typeof value.text === "string";
  }
  if (value.type === "heading") {
    return (value.level === 2 || value.level === 3) && typeof value.text === "string";
  }
  if (value.type === "list") {
    return Array.isArray(value.items) && value.items.every((item) => typeof item === "string");
  }
  return false;
}

export function parseContent(value: unknown): BlogBlock[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isBlogBlock);
}

export function parsePostStatus(value: unknown): PostStatus {
  return value === "published" ? "published" : "draft";
}

export function parseStudioPost(id: string, data: unknown): StudioPost | null {
  if (!isRecord(data)) return null;
  const slug = asString(data.slug);
  const title = asString(data.title);
  if (!slug || !title) return null;

  return {
    id,
    slug,
    title,
    subtitle: asString(data.subtitle),
    excerpt: asString(data.excerpt),
    content: parseContent(data.content),
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : null,
    updatedAt: asString(data.updatedAt, new Date().toISOString()),
    createdAt: asString(data.createdAt, new Date().toISOString()),
    readingMinutes: Math.max(1, asNumber(data.readingMinutes, 1)),
    category: asString(data.category, "Trend Report"),
    seoTitle: asString(data.seoTitle, title),
    seoDescription: asString(data.seoDescription),
    keywords: asStringArray(data.keywords),
    coverImage: asString(data.coverImage),
    coverImageWidth: asNumber(data.coverImageWidth),
    coverImageHeight: asNumber(data.coverImageHeight),
    coverImageAlt: asString(data.coverImageAlt),
    status: parsePostStatus(data.status),
    authorEmail: asString(data.authorEmail),
  };
}

export function parsePostInput(value: unknown): PostInput | null {
  if (!isRecord(value)) return null;
  const title = asString(value.title).trim();
  const slug = asString(value.slug).trim();
  if (!title || !slug) return null;

  const id = asString(value.id).trim();

  return {
    id: id || undefined,
    slug,
    title,
    subtitle: asString(value.subtitle).trim(),
    excerpt: asString(value.excerpt).trim(),
    content: parseContent(value.content),
    category: asString(value.category, "Trend Report").trim() || "Trend Report",
    seoTitle: asString(value.seoTitle).trim(),
    seoDescription: asString(value.seoDescription).trim(),
    keywords: asStringArray(value.keywords).map((item) => item.trim()).filter(Boolean),
    coverImage: asString(value.coverImage).trim(),
    coverImageWidth: asNumber(value.coverImageWidth),
    coverImageHeight: asNumber(value.coverImageHeight),
    coverImageAlt: asString(value.coverImageAlt).trim(),
    status: parsePostStatus(value.status),
  };
}

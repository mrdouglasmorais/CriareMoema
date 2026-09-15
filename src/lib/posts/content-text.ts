import type { BlogBlock } from "@/data/blog";

export function flattenBlogContent(content: BlogBlock[]): string {
  return content
    .map((block) => {
      if (block.type === "list") return block.items.filter((item) => item.trim()).join(". ");
      return block.text.trim();
    })
    .filter(Boolean)
    .join("\n\n");
}

export function countContentWords(content: BlogBlock[]): number {
  return flattenBlogContent(content)
    .split(/\s+/)
    .filter(Boolean).length;
}

export function hasStructuredHeadings(content: BlogBlock[]): boolean {
  return content.some((block) => block.type === "heading" && block.text.trim().length > 0);
}

/** Converte data do CMS (`YYYY-MM-DD`) para ISO 8601 com fuso de São Paulo. */
export function toIsoDateTime(value: string): string {
  if (/T/.test(value)) return value;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value}T08:00:00-03:00`;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString();
}

export function imageMimeType(src: string): string {
  const path = src.split("?")[0]?.toLowerCase() ?? "";
  if (path.endsWith(".webp")) return "image/webp";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".gif")) return "image/gif";
  return "image/jpeg";
}

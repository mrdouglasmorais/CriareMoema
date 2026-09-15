import type { BlogBlock } from "@/data/blog";

export function estimateReadingMinutes(content: BlogBlock[]): number {
  const words = content.reduce((total, block) => {
    if (block.type === "list") {
      return total + countWords(block.items.join(" "));
    }
    return total + countWords(block.text);
  }, 0);

  return Math.max(1, Math.round(words / 200) || 1);
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

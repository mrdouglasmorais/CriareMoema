import type { BlogBlock } from "@/data/blog";

export interface SlashCommand {
  id: string;
  label: string;
  hint: string;
  keywords: string[];
  create: () => BlogBlock;
}

export const slashCommands: SlashCommand[] = [
  {
    id: "paragraph",
    label: "Texto",
    hint: "Parágrafo corrido",
    keywords: ["texto", "paragrafo", "p"],
    create: () => ({ type: "paragraph", text: "" }),
  },
  {
    id: "h2",
    label: "Título",
    hint: "Seção principal (H2)",
    keywords: ["h2", "titulo", "heading"],
    create: () => ({ type: "heading", level: 2, text: "" }),
  },
  {
    id: "h3",
    label: "Subtítulo",
    hint: "Subseção (H3)",
    keywords: ["h3", "subtitulo"],
    create: () => ({ type: "heading", level: 3, text: "" }),
  },
  {
    id: "list",
    label: "Lista",
    hint: "Itens com marcadores",
    keywords: ["lista", "list", "bullet"],
    create: () => ({ type: "list", items: [""] }),
  },
  {
    id: "callout",
    label: "Destaque",
    hint: "Citação em evidência",
    keywords: ["destaque", "callout", "aviso"],
    create: () => ({ type: "callout", text: "" }),
  },
];

export function filterSlashCommands(query: string): SlashCommand[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return slashCommands;
  return slashCommands.filter((command) => {
    const haystack = [command.label, command.hint, ...command.keywords]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export function slashQueryFrom(text: string): string | null {
  if (!text.startsWith("/") || text.includes("\n") || text.includes(" ")) return null;
  return text.slice(1);
}

export function blockFromMarkdownShortcut(text: string): BlogBlock | null {
  if (text === "# ") return { type: "heading", level: 2, text: "" };
  if (text === "## ") return { type: "heading", level: 3, text: "" };
  if (text === "- " || text === "* ") return { type: "list", items: [""] };
  if (text === "> ") return { type: "callout", text: "" };
  return null;
}

export function emptyParagraph(): BlogBlock {
  return { type: "paragraph", text: "" };
}

export function blockLabel(block: BlogBlock): string {
  if (block.type === "heading") return block.level === 3 ? "Subtítulo" : "Título";
  if (block.type === "list") return "Lista";
  if (block.type === "callout") return "Destaque";
  return "Texto";
}

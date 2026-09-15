"use client";

import { useEffect, useState } from "react";
import type { BlogBlock } from "@/data/blog";
import { BlockSlashMenu } from "@/components/studio/block-slash-menu";
import { BlockTextarea } from "@/components/studio/block-textarea";
import {
  blockFromMarkdownShortcut,
  blockLabel,
  emptyParagraph,
  filterSlashCommands,
  slashQueryFrom,
  type SlashCommand,
} from "@/data/studio-editor";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";

interface ContentBlocksEditorProps {
  blocks: BlogBlock[];
  onChange: (blocks: BlogBlock[]) => void;
}

interface FocusTarget {
  index: number;
  item?: number;
}

export function ContentBlocksEditor({ blocks, onChange }: ContentBlocksEditorProps) {
  const [focusTo, setFocusTo] = useState<FocusTarget | null>(null);
  const [slashAt, setSlashAt] = useState<number | null>(null);
  const [slashIndex, setSlashIndex] = useState(0);

  const safeBlocks = blocks.length > 0 ? blocks : [emptyParagraph()];

  useEffect(() => {
    if (!focusTo) return;
    const timer = window.setTimeout(() => setFocusTo(null), 0);
    return () => window.clearTimeout(timer);
  }, [focusTo]);

  function replace(next: BlogBlock[], focus?: FocusTarget) {
    onChange(next);
    if (focus) setFocusTo(focus);
  }

  function update(index: number, next: BlogBlock) {
    replace(safeBlocks.map((block, i) => (i === index ? next : block)));
  }

  function insertAt(index: number, block: BlogBlock) {
    const next = [...safeBlocks.slice(0, index), block, ...safeBlocks.slice(index)];
    replace(next, { index });
    setSlashAt(null);
  }

  function remove(index: number) {
    if (safeBlocks.length === 1) {
      replace([emptyParagraph()], { index: 0 });
      return;
    }
    replace(
      safeBlocks.filter((_, i) => i !== index),
      { index: Math.max(0, index - 1) },
    );
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= safeBlocks.length) return;
    const next = [...safeBlocks];
    const [block] = next.splice(index, 1);
    next.splice(target, 0, block);
    replace(next, { index: target });
  }

  function applyCommand(index: number, command: SlashCommand, mode: "replace" | "insert") {
    if (mode === "insert") {
      insertAt(index + 1, command.create());
      return;
    }
    update(index, command.create());
    setSlashAt(null);
  }

  function onTextChange(index: number, text: string, current: BlogBlock) {
    const shortcut = blockFromMarkdownShortcut(text);
    if (shortcut && (current.type === "paragraph" || current.type === "callout")) {
      update(index, shortcut);
      setSlashAt(null);
      return;
    }
    if (current.type === "list") return;
    update(index, current.type === "heading" ? { ...current, text } : { ...current, text });
    const query = slashQueryFrom(text);
    setSlashAt(query !== null ? index : null);
    setSlashIndex(0);
  }

  function handleKey(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    index: number,
    block: BlogBlock,
    itemIndex?: number,
  ) {
    const query = block.type !== "list" && "text" in block ? slashQueryFrom(block.text) : null;
    const commands = query !== null ? filterSlashCommands(query) : [];

    if (slashAt === index && query !== null) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSlashIndex((current) => Math.min(current + 1, Math.max(commands.length - 1, 0)));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSlashIndex((current) => Math.max(current - 1, 0));
        return;
      }
      if (event.key === "Enter" && commands[slashIndex]) {
        event.preventDefault();
        applyCommand(index, commands[slashIndex], "replace");
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setSlashAt(null);
        return;
      }
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (block.type === "list" && itemIndex !== undefined) {
        if (!block.items[itemIndex]?.trim()) {
          const remaining = block.items.filter((_, i) => i !== itemIndex);
          const next = [...safeBlocks];
          if (remaining.length === 0) next[index] = emptyParagraph();
          else next[index] = { type: "list", items: remaining };
          next.splice(index + 1, 0, emptyParagraph());
          replace(next, { index: index + 1 });
          return;
        }
        const items = [...block.items];
        items.splice(itemIndex + 1, 0, "");
        update(index, { type: "list", items });
        setFocusTo({ index, item: itemIndex + 1 });
        return;
      }
      insertAt(index + 1, emptyParagraph());
      return;
    }

    if (event.key === "Backspace") {
      if (block.type === "list" && itemIndex !== undefined) {
        if (block.items[itemIndex] === "") {
          event.preventDefault();
          const items = block.items.filter((_, i) => i !== itemIndex);
          if (items.length === 0) {
            update(index, emptyParagraph());
            return;
          }
          update(index, { type: "list", items });
          setFocusTo({ index, item: Math.max(0, itemIndex - 1) });
        }
        return;
      }
      if ("text" in block && block.text === "") {
        event.preventDefault();
        remove(index);
      }
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
          Conteúdo
        </p>
        <p className="mt-1 text-xs text-white/35">
          Digite <kbd className="rounded bg-white/8 px-1.5 py-0.5 text-white/55">/</kbd> para
          blocos · <kbd className="rounded bg-white/8 px-1.5 py-0.5 text-white/55">#</kbd> título ·{" "}
          <kbd className="rounded bg-white/8 px-1.5 py-0.5 text-white/55">-</kbd> lista ·{" "}
          <kbd className="rounded bg-white/8 px-1.5 py-0.5 text-white/55">&gt;</kbd> destaque
        </p>
      </div>

      <div className="rounded-3xl border border-white/8 bg-white/[0.02] px-2 py-3 sm:px-4 sm:py-5">
        {safeBlocks.map((block, index) => {
          const query = block.type !== "list" && "text" in block ? slashQueryFrom(block.text) : null;
          const showSlash = slashAt === index && query !== null;
          const commands = query !== null ? filterSlashCommands(query) : [];

          return (
            <div key={`${block.type}-${index}`} className="group relative">
              <div className="flex gap-1 sm:gap-2">
                <div className="flex w-16 shrink-0 flex-col items-center gap-0.5 pt-1 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                  <IconButton
                    label="Inserir bloco"
                    onClick={() => {
                      setSlashIndex(0);
                      setSlashAt((current) => (current === index ? null : index));
                    }}
                  >
                    <Plus className="size-3.5" />
                  </IconButton>
                  <IconButton label="Mover para cima" onClick={() => move(index, -1)}>
                    <ChevronUp className="size-3.5" />
                  </IconButton>
                  <IconButton label="Mover para baixo" onClick={() => move(index, 1)}>
                    <ChevronDown className="size-3.5" />
                  </IconButton>
                  <IconButton label="Remover bloco" onClick={() => remove(index)}>
                    <Trash2 className="size-3.5" />
                  </IconButton>
                </div>

                <div className="relative min-w-0 flex-1 py-1">
                  <p className="mb-1 font-heading text-[10px] uppercase tracking-[0.14em] text-white/20">
                    {blockLabel(block)}
                  </p>

                  {block.type === "heading" && (
                    <BlockTextarea
                      value={block.text}
                      autoFocus={focusTo?.index === index}
                      placeholder={block.level === 3 ? "Subtítulo" : "Título da seção"}
                      className={cn(
                        "font-heading font-bold tracking-tight",
                        block.level === 3 ? "text-xl" : "text-2xl sm:text-3xl",
                      )}
                      onChange={(text) => onTextChange(index, text, block)}
                      onKeyDown={(event) => handleKey(event, index, block)}
                    />
                  )}

                  {(block.type === "paragraph" || block.type === "callout") && (
                    <div
                      className={cn(
                        block.type === "callout" &&
                          "rounded-2xl border border-amber-400/20 bg-amber-400/8 px-4 py-3",
                      )}
                    >
                      <BlockTextarea
                        value={block.text}
                        autoFocus={focusTo?.index === index}
                        placeholder={
                          block.type === "callout"
                            ? "Destaque para o leitor"
                            : "Escreva ou digite / para comandos"
                        }
                        className={cn(
                          "text-base leading-relaxed",
                          block.type === "callout" && "text-amber-50/90",
                        )}
                        onChange={(text) => onTextChange(index, text, block)}
                        onKeyDown={(event) => handleKey(event, index, block)}
                      />
                    </div>
                  )}

                  {block.type === "list" && (
                    <ul className="space-y-2">
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/35" aria-hidden />
                          <BlockTextarea
                            value={item}
                            autoFocus={focusTo?.index === index && focusTo.item === itemIndex}
                            placeholder={`Item ${itemIndex + 1}`}
                            className="text-base leading-relaxed"
                            onChange={(text) => {
                              const items = block.items.map((current, i) =>
                                i === itemIndex ? text : current,
                              );
                              update(index, { type: "list", items });
                            }}
                            onKeyDown={(event) => handleKey(event, index, block, itemIndex)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  {showSlash && (
                    <BlockSlashMenu
                      commands={commands}
                      activeIndex={slashIndex}
                      onPick={(command) => applyCommand(index, command, "replace")}
                    />
                  )}

                  {slashAt === index && query === null && (
                    <BlockSlashMenu
                      commands={filterSlashCommands("")}
                      activeIndex={slashIndex}
                      onPick={(command) =>
                        applyCommand(
                          index,
                          command,
                          isBlankBlock(block) ? "replace" : "insert",
                        )
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function isBlankBlock(block: BlogBlock): boolean {
  if (block.type === "list") return block.items.every((item) => !item.trim());
  return !block.text.trim();
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-6 items-center justify-center rounded-md text-white/35 transition-colors hover:bg-white/8 hover:text-white/80"
    >
      {children}
    </button>
  );
}

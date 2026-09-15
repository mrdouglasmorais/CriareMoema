"use client";

import { slashCommands, type SlashCommand } from "@/data/studio-editor";
import { cn } from "@/lib/utils";
import { Heading2, Heading3, List, Pilcrow, Quote } from "lucide-react";

const icons: Record<string, typeof Pilcrow> = {
  paragraph: Pilcrow,
  h2: Heading2,
  h3: Heading3,
  list: List,
  callout: Quote,
};

interface BlockSlashMenuProps {
  commands: SlashCommand[];
  activeIndex: number;
  onPick: (command: SlashCommand) => void;
}

export function BlockSlashMenu({ commands, activeIndex, onPick }: BlockSlashMenuProps) {
  const items = commands.length > 0 ? commands : slashCommands;

  return (
    <div
      className="absolute left-0 top-full z-20 mt-2 w-[min(100%,20rem)] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      role="listbox"
      aria-label="Comandos do editor"
    >
      <p className="px-2.5 pb-1.5 pt-1 font-heading text-[10px] uppercase tracking-[0.16em] text-white/30">
        Blocos
      </p>
      {items.map((command, index) => {
        const Icon = icons[command.id] ?? Pilcrow;
        const active = index === activeIndex;
        return (
          <button
            key={command.id}
            type="button"
            role="option"
            aria-selected={active}
            onMouseDown={(event) => {
              event.preventDefault();
              onPick(command);
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors",
              active ? "bg-amber-400/12 text-white" : "text-white/70 hover:bg-white/5",
            )}
          >
            <span className="flex size-8 items-center justify-center rounded-lg border border-white/8 bg-white/5">
              <Icon className="size-4" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-medium">{command.label}</span>
              <span className="block text-xs text-white/35">{command.hint}</span>
            </span>
          </button>
        );
      })}
      {commands.length === 0 && (
        <p className="px-2.5 py-2 text-sm text-white/35">Nenhum bloco com esse nome.</p>
      )}
    </div>
  );
}

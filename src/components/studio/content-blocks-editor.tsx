"use client";

import type { BlogBlock } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { studioFieldClass, studioTextareaClass } from "@/components/studio/field-styles";
import { Plus, Trash2 } from "lucide-react";

interface ContentBlocksEditorProps {
  blocks: BlogBlock[];
  onChange: (blocks: BlogBlock[]) => void;
}

function emptyBlock(type: BlogBlock["type"]): BlogBlock {
  if (type === "heading") return { type: "heading", level: 2, text: "" };
  if (type === "list") return { type: "list", items: [""] };
  if (type === "callout") return { type: "callout", text: "" };
  return { type: "paragraph", text: "" };
}

export function ContentBlocksEditor({ blocks, onChange }: ContentBlocksEditorProps) {
  function update(index: number, next: BlogBlock) {
    onChange(blocks.map((block, i) => (i === index ? next : block)));
  }

  function remove(index: number) {
    onChange(blocks.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Label>Conteúdo</Label>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="glass" size="sm" onClick={() => onChange([...blocks, emptyBlock("paragraph")])}>
            <Plus aria-hidden /> Parágrafo
          </Button>
          <Button type="button" variant="glass" size="sm" onClick={() => onChange([...blocks, emptyBlock("heading")])}>
            <Plus aria-hidden /> Título
          </Button>
          <Button type="button" variant="glass" size="sm" onClick={() => onChange([...blocks, emptyBlock("list")])}>
            <Plus aria-hidden /> Lista
          </Button>
          <Button type="button" variant="glass" size="sm" onClick={() => onChange([...blocks, emptyBlock("callout")])}>
            <Plus aria-hidden /> Destaque
          </Button>
        </div>
      </div>

      {blocks.length === 0 && (
        <p className="text-sm text-white/35">Adicione blocos para montar o artigo.</p>
      )}

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={`${block.type}-${index}`} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-white/30">
                {block.type === "paragraph" && "Parágrafo"}
                {block.type === "heading" && "Título"}
                {block.type === "list" && "Lista"}
                {block.type === "callout" && "Destaque"}
              </p>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => remove(index)} aria-label="Remover bloco">
                <Trash2 />
              </Button>
            </div>

            {block.type === "heading" && (
              <div className="space-y-3">
                <select
                  className={studioFieldClass}
                  value={block.level}
                  onChange={(event) =>
                    update(index, {
                      ...block,
                      level: Number(event.target.value) === 3 ? 3 : 2,
                    })
                  }
                >
                  <option value={2}>H2</option>
                  <option value={3}>H3</option>
                </select>
                <Input
                  value={block.text}
                  onChange={(event) => update(index, { ...block, text: event.target.value })}
                  className={studioFieldClass}
                  placeholder="Título da seção"
                />
              </div>
            )}

            {(block.type === "paragraph" || block.type === "callout") && (
              <Textarea
                value={block.text}
                onChange={(event) => update(index, { ...block, text: event.target.value })}
                className={studioTextareaClass}
                placeholder={block.type === "callout" ? "Frase de destaque" : "Texto do parágrafo"}
              />
            )}

            {block.type === "list" && (
              <div className="space-y-2">
                {block.items.map((item, itemIndex) => (
                  <Input
                    key={itemIndex}
                    value={item}
                    onChange={(event) => {
                      const items = block.items.map((current, i) =>
                        i === itemIndex ? event.target.value : current,
                      );
                      update(index, { type: "list", items });
                    }}
                    className={studioFieldClass}
                    placeholder={`Item ${itemIndex + 1}`}
                  />
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => update(index, { type: "list", items: [...block.items, ""] })}
                >
                  Adicionar item
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

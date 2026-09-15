"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studioFieldClass } from "@/components/studio/field-styles";
import { studioCopy } from "@/data/studio";
import { uploadStudioCover } from "@/lib/actions/upload";
import { Loader2, Upload } from "lucide-react";

interface CoverUploaderProps {
  url: string;
  width: number;
  height: number;
  alt: string;
  cloudinaryReady: boolean;
  onChange: (cover: { url: string; width: number; height: number; alt: string }) => void;
}

export function CoverUploader({
  url,
  width,
  height,
  alt,
  cloudinaryReady,
  onChange,
}: CoverUploaderProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setPending(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadStudioCover(formData);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      onChange({
        url: result.asset.url,
        width: result.asset.width,
        height: result.asset.height,
        alt: alt || file.name.replace(/\.[^.]+$/, ""),
      });
    } finally {
      setPending(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cover-file">Imagem de capa</Label>
        <div className="flex flex-wrap items-center gap-3">
          <Input
            id="cover-file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFile}
            disabled={!cloudinaryReady || pending}
            className="h-12 cursor-pointer file:mr-3 file:text-amber-200"
          />
          {pending && (
            <span className="inline-flex items-center gap-2 text-sm text-white/45">
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Enviando…
            </span>
          )}
        </div>
        <p className="text-xs text-white/35">{studioCopy.coverHint}</p>
        {!cloudinaryReady && (
          <p className="text-xs text-amber-200/70">
            Cloudinary ainda não está configurado — use uma URL manual abaixo.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover-url">{studioCopy.coverUrlFallback}</Label>
        <Input
          id="cover-url"
          value={url}
          onChange={(event) =>
            onChange({ url: event.target.value, width, height, alt })
          }
          className={studioFieldClass}
          placeholder="https://res.cloudinary.com/... ou /catalog/cat-04003.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover-alt">Texto alternativo da capa</Label>
        <Input
          id="cover-alt"
          value={alt}
          onChange={(event) =>
            onChange({ url, width, height, alt: event.target.value })
          }
          className={studioFieldClass}
          placeholder="Descrição da imagem para SEO e acessibilidade"
        />
      </div>

      {error && (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      {url && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/8">
          <Image
            src={url}
            alt={alt || "Pré-visualização da capa"}
            fill
            unoptimized={url.startsWith("http")}
            className="object-cover"
            sizes="(min-width: 1024px) 640px, 100vw"
          />
        </div>
      )}

      {cloudinaryReady && (
        <p className="inline-flex items-center gap-2 text-xs text-white/30">
          <Upload className="size-3.5" aria-hidden />
          Upload assinado via Cloudinary
        </p>
      )}
    </div>
  );
}

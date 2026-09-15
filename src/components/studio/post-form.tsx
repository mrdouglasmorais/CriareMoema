"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ContentBlocksEditor } from "@/components/studio/content-blocks-editor";
import { CoverUploader } from "@/components/studio/cover-uploader";
import { studioFieldClass, studioTextareaClass } from "@/components/studio/field-styles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BlogBlock } from "@/data/blog";
import { postCategories, studioCopy } from "@/data/studio";
import { removeStudioPost, saveStudioPost } from "@/lib/actions/posts";
import { slugify } from "@/lib/posts/slug";
import type { PostInput, StudioPost } from "@/types";
import { Loader2 } from "lucide-react";

interface PostFormProps {
  post?: StudioPost;
  cloudinaryReady: boolean;
}

interface FormState {
  title: string;
  subtitle: string;
  excerpt: string;
  slug: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  coverImage: string;
  coverImageWidth: number;
  coverImageHeight: number;
  coverImageAlt: string;
  content: BlogBlock[];
  slugLocked: boolean;
}

function toState(post?: StudioPost): FormState {
  return {
    title: post?.title ?? "",
    subtitle: post?.subtitle ?? "",
    excerpt: post?.excerpt ?? "",
    slug: post?.slug ?? "",
    category: post?.category ?? postCategories[0],
    seoTitle: post?.seoTitle ?? "",
    seoDescription: post?.seoDescription ?? "",
    keywords: post?.keywords.join(", ") ?? "",
    coverImage: post?.coverImage ?? "",
    coverImageWidth: post?.coverImageWidth ?? 0,
    coverImageHeight: post?.coverImageHeight ?? 0,
    coverImageAlt: post?.coverImageAlt ?? "",
    content: post?.content ?? [{ type: "paragraph", text: "" }],
    slugLocked: Boolean(post?.slug),
  };
}

export function PostForm({ post, cloudinaryReady }: PostFormProps) {
  const router = useRouter();
  const [state, setState] = useState<FormState>(() => toState(post));
  const [pending, setPending] = useState<"draft" | "published" | "delete" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const input = useMemo<PostInput>(
    () => ({
      id: post?.id,
      title: state.title.trim(),
      subtitle: state.subtitle.trim(),
      excerpt: state.excerpt.trim(),
      slug: state.slug.trim() || slugify(state.title),
      category: state.category,
      seoTitle: state.seoTitle.trim(),
      seoDescription: state.seoDescription.trim(),
      keywords: state.keywords
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      coverImage: state.coverImage.trim(),
      coverImageWidth: state.coverImageWidth,
      coverImageHeight: state.coverImageHeight,
      coverImageAlt: state.coverImageAlt.trim(),
      content: state.content,
      status: "draft",
    }),
    [post?.id, state],
  );

  async function persist(status: "draft" | "published") {
    setError(null);
    setPending(status);
    try {
      const result = await saveStudioPost({ ...input, status });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      router.replace(`/studio/posts/${result.post.id}`);
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  async function onDelete() {
    if (!post) return;
    const confirmed = window.confirm("Excluir esta postagem? Essa ação não pode ser desfeita.");
    if (!confirmed) return;
    setPending("delete");
    try {
      const result = await removeStudioPost(post.id, post.slug);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      router.replace("/studio/posts");
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        void persist("draft");
      }}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={state.title}
            onChange={(event) => {
              const title = event.target.value;
              setState((current) => ({
                ...current,
                title,
                slug: current.slugLocked ? current.slug : slugify(title),
              }));
            }}
            className={studioFieldClass}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            value={state.slug}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                slug: event.target.value,
                slugLocked: true,
              }))
            }
            className={studioFieldClass}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            value={state.subtitle}
            onChange={(event) => setState((current) => ({ ...current, subtitle: event.target.value }))}
            className={studioFieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <select
            id="category"
            value={state.category}
            onChange={(event) => setState((current) => ({ ...current, category: event.target.value }))}
            className={studioFieldClass}
          >
            {postCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Resumo</Label>
        <Textarea
          id="excerpt"
          value={state.excerpt}
          onChange={(event) => setState((current) => ({ ...current, excerpt: event.target.value }))}
          className={studioTextareaClass}
        />
      </div>

      <CoverUploader
        url={state.coverImage}
        width={state.coverImageWidth}
        height={state.coverImageHeight}
        alt={state.coverImageAlt}
        cloudinaryReady={cloudinaryReady}
        onChange={(cover) =>
          setState((current) => ({
            ...current,
            coverImage: cover.url,
            coverImageWidth: cover.width,
            coverImageHeight: cover.height,
            coverImageAlt: cover.alt,
          }))
        }
      />

      <ContentBlocksEditor
        blocks={state.content}
        onChange={(content) => setState((current) => ({ ...current, content }))}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="seoTitle">Título SEO</Label>
          <Input
            id="seoTitle"
            value={state.seoTitle}
            onChange={(event) => setState((current) => ({ ...current, seoTitle: event.target.value }))}
            className={studioFieldClass}
            placeholder={state.title}
            maxLength={70}
          />
          <p className="text-xs text-white/35">
            {(state.seoTitle || state.title).length}/70 · {studioCopy.seoTitleHint}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="keywords">Palavras-chave (separadas por vírgula)</Label>
          <Input
            id="keywords"
            value={state.keywords}
            onChange={(event) => setState((current) => ({ ...current, keywords: event.target.value }))}
            className={studioFieldClass}
          />
          <p className="text-xs text-white/35">{studioCopy.keywordsHint}</p>
        </div>
        <div className="space-y-2 lg:col-span-2">
          <Label htmlFor="seoDescription">Descrição SEO</Label>
          <Textarea
            id="seoDescription"
            value={state.seoDescription}
            onChange={(event) =>
              setState((current) => ({ ...current, seoDescription: event.target.value }))
            }
            className={studioTextareaClass}
            placeholder={state.excerpt}
            maxLength={170}
          />
          <p className="text-xs text-white/35">
            {(state.seoDescription || state.excerpt).length}/170 · {studioCopy.seoDescriptionHint}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-300" role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="glass" size="lg" disabled={pending !== null}>
          {pending === "draft" ? <Loader2 className="animate-spin" /> : null}
          {studioCopy.saveDraft}
        </Button>
        <Button
          type="button"
          variant="amber"
          size="lg"
          disabled={pending !== null}
          onClick={() => void persist("published")}
        >
          {pending === "published" ? <Loader2 className="animate-spin" /> : null}
          {studioCopy.publish}
        </Button>
        {post && (
          <Button
            type="button"
            variant="destructive"
            size="lg"
            disabled={pending !== null}
            onClick={() => void onDelete()}
          >
            {pending === "delete" ? <Loader2 className="animate-spin" /> : null}
            {studioCopy.delete}
          </Button>
        )}
      </div>
    </form>
  );
}

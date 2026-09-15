import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/landing/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import type { BlogBlock } from "@/data/blog";
import {
  getAllPublishedSlugs,
  getPublishedPostBySlug,
  getPublishedPosts,
} from "@/lib/posts/repository";
import { imageMimeType, toIsoDateTime } from "@/lib/posts/content-text";
import { slugify } from "@/lib/posts/slug";
import { createPageMetadata } from "@/lib/metadata";
import { buildBlogPostJsonLd } from "@/lib/seo/blog-structured-data";
import { siteConfig } from "@/lib/site-config";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return getAllPublishedSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${slug}`,
    keywords: post.keywords,
    ogImage: post.coverImage,
    ogImageWidth: post.coverImageWidth,
    ogImageHeight: post.coverImageHeight,
    ogImageAlt: post.coverImageAlt,
    ogImageType: imageMimeType(post.coverImage),
    article: {
      publishedTime: toIsoDateTime(post.publishedAt),
      modifiedTime: toIsoDateTime(post.updatedAt ?? post.publishedAt),
      authors: [siteConfig.name],
      section: post.category,
      tags: post.keywords,
    },
  });
}

function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {block.text}
            </p>
          );
        }
        if (block.type === "heading") {
          const Tag = `h${block.level}` as "h2" | "h3";
          const headingId = slugify(block.text) || `secao-${i + 1}`;
          return (
            <Tag
              id={headingId}
              key={i}
              className={
                block.level === 2
                  ? "mt-12 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                  : "mt-8 font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
              }
            >
              {block.text}
            </Tag>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="mt-4 space-y-2.5 pl-0">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400" aria-hidden>
                    <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "callout") {
          return (
            <div
              key={i}
              className="my-8 border-l-2 border-amber-500/28 pl-6 py-1"
            >
              <p className="text-base italic leading-relaxed text-white/55 sm:text-lg">
                {block.text}
              </p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const outrosPosts = (await getPublishedPosts())
    .filter((item) => item.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd data={buildBlogPostJsonLd(post)} />
      <main id="conteudo-principal" className="min-w-0 overflow-x-clip">

        {/* ── Hero cinematográfico ─────────────────────────────────────── */}
        <section
          className="relative overflow-hidden border-b border-border/30"
          style={{ minHeight: "calc(100dvh - var(--site-header-height, 4rem))" }}
        >
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-950/15 to-transparent" />

          <div
            className="relative z-10 mx-auto flex max-w-3xl flex-col justify-end px-4 pb-14 sm:px-6 sm:pb-20"
            style={{ minHeight: "calc(100dvh - var(--site-header-height, 4rem))" }}
          >
            <Reveal className="space-y-4">
              <nav aria-label="Navegação estrutural">
                <ol className="flex flex-wrap items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  <li>
                    <Link href="/" className="transition-colors hover:text-amber-400">
                      Início
                    </Link>
                  </li>
                  <li aria-hidden className="text-white/25">/</li>
                  <li>
                    <Link href="/blog" className="transition-colors hover:text-amber-400">
                      Blog
                    </Link>
                  </li>
                </ol>
              </nav>

              <div className="flex flex-wrap items-center gap-3">
                <span className="section-tag text-white/38">{post.category}</span>
                <span className="flex items-center gap-1.5 text-xs text-white/55">
                  <Clock className="size-3.5" aria-hidden />
                  {post.readingMinutes} min de leitura
                </span>
                <time dateTime={post.publishedAt} className="text-xs text-white/55">
                  {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>

              <h1
                className="font-heading font-bold tracking-tight text-white"
                style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.5rem)", lineHeight: 1.08 }}
              >
                {post.title}
              </h1>
              <p className="text-base text-white/70 sm:text-lg">{post.subtitle}</p>
            </Reveal>
          </div>
        </section>

        {/* ── Conteúdo do artigo ──────────────────────────────────────── */}
        <article className="py-14 sm:py-20" aria-label={post.title}>
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              {/* Lead quote */}
              <blockquote className="mb-10 border-l-4 border-amber-500/50 pl-5">
                <p className="text-base italic leading-relaxed text-muted-foreground sm:text-lg">
                  {post.excerpt}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.05}>
              <BlogContent blocks={post.content} />
            </Reveal>

            {/* Footer do artigo */}
            <Reveal delay={0.1} className="mt-14 border-t border-border/40 pt-8">
              <p className="text-sm text-muted-foreground">
                Publicado por{" "}
                <strong className="font-semibold text-foreground">{siteConfig.name}</strong>{" "}
                em{" "}
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </p>
              <div className="mt-6 flex flex-wrap gap-6">
                <Link href="/blog" className="editorial-link group">
                  <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
                  Ver todos os artigos
                </Link>
                <Link
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link group"
                >
                  Falar com especialista
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </article>

        {/* ── Continue lendo ──────────────────────────────────────────── */}
        {outrosPosts.length > 0 && (
          <section
            className="border-t border-border/30 bg-muted/15 py-14 sm:py-20"
            aria-labelledby="outros-artigos-heading"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <Reveal>
                <p className="label-eyebrow">Continue lendo</p>
                <h2
                  id="outros-artigos-heading"
                  className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  Mais artigos
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {outrosPosts.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25 rounded-sm"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                      <Image
                        src={other.coverImage}
                        alt={other.coverImageAlt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center transition-transform duration-600 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    </div>
                    <div className="mt-4 space-y-1.5">
                      <span className="section-tag text-white/28">{other.category}</span>
                      <p className="font-heading text-sm font-bold leading-snug text-white/75 transition-colors duration-300 group-hover:text-white/95 sm:text-base">
                        {other.title}
                      </p>
                      <span className="editorial-link mt-1 inline-flex">
                        Ler
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaSection compact />
      </main>
    </>
  );
}

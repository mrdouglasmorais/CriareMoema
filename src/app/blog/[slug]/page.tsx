import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/landing/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts, getAllBlogSlugs, getBlogPostBySlug, type BlogBlock } from "@/data/blog";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${slug}`,
    keywords: post.keywords,
    ogImage: post.coverImage,
    ogImageAlt: post.coverImageAlt,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
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
          return (
            <Tag
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
              className="vitral-card relative my-8 overflow-hidden"
            >
              {/* Accent stripe */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500" aria-hidden />
              <div className="px-6 py-5 pl-8 text-sm leading-relaxed text-foreground/90 sm:text-base">
                {block.text}
              </div>
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
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const outrosPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blog/${slug}`,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    image: new URL(post.coverImage, siteConfig.url).toString(),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: new URL(siteConfig.organization.logoPath, siteConfig.url).toString(),
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, articleLd]} />
      <main id="conteudo-principal" className="min-w-0 overflow-x-clip">

        {/* ── Hero cinematográfico ─────────────────────────────────────── */}
        <section className="relative min-h-[55svh] overflow-hidden border-b border-border/30">
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

          <div className="relative z-10 mx-auto flex min-h-[55svh] max-w-3xl flex-col justify-end px-4 pb-14 sm:px-6 sm:pb-20">
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
                <span className="rounded-full border border-amber-500/40 bg-black/60 px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-300 backdrop-blur-sm">
                  {post.category}
                </span>
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
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-4 py-2.5 text-sm font-semibold text-foreground/85 transition-all duration-300 hover:border-amber-500/35 hover:bg-muted/50"
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  Ver todos os artigos
                </Link>
                <Link
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 px-4 py-2.5 text-sm font-semibold text-stone-950 shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_4px_16px_rgba(245,158,11,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-200 hover:to-amber-400"
                >
                  Solicitar diagnóstico gratuito
                  <ArrowRight className="size-4" aria-hidden />
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
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {outrosPosts.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="vitral-card vitral-shimmer group flex overflow-hidden transition-all duration-500 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    <div className="relative h-auto w-32 shrink-0 overflow-hidden sm:w-40">
                      <Image
                        src={other.coverImage}
                        alt={other.coverImageAlt}
                        fill
                        sizes="160px"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    </div>
                    <div className="flex flex-col justify-between gap-2 p-4 sm:p-5">
                      <div>
                        <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-500/80">
                          {other.category}
                        </span>
                        <p className="mt-1.5 font-heading text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-amber-100 sm:text-base">
                          {other.title}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 transition-all group-hover:gap-1.5">
                        Ler
                        <ArrowRight className="size-3" aria-hidden />
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

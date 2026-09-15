import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/landing/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedPosts } from "@/lib/posts/repository";
import { createPageMetadata } from "@/lib/metadata";
import { buildBlogCollectionJsonLd } from "@/lib/seo/blog-structured-data";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Blog & Tendências em Móveis Planejados | Criare Moema",
  description:
    "Trend Reports, guias técnicos e tendências em móveis planejados, design de interiores e marcenaria de alto padrão em São Paulo. Conteúdo especializado para quem exige o melhor.",
  path: "/blog",
  keywords: [
    "tendências móveis planejados 2025",
    "blog marcenaria alto padrão São Paulo",
    "design de interiores Moema",
    "cozinha planejada tendências 2025",
    "closet planejado guia",
    "trend report móveis planejados",
    "decoração alto padrão São Paulo",
    "guia móveis sob medida",
  ],
});

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <JsonLd data={buildBlogCollectionJsonLd(posts)} />
      <main id="conteudo-principal" className="min-w-0 overflow-x-clip">

        <PageHero
          headingId="blog-heading"
          eyebrow={`Trend Report · ${siteConfig.name}`}
          lines={[
            { text: "Blog &" },
            { text: "Tendências.", gradient: true },
          ]}
          description="Insights sobre design de interiores, marcenaria de alto padrão, tendências de mercado e guias técnicos para arquitetos e proprietários exigentes."
          watermark="BLOG"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Blog" },
          ]}
          stats={[
            { value: `${posts.length}`, label: "artigos publicados" },
            { value: "5'", label: "leitura média" },
            { value: "100%", label: "conteúdo original" },
          ]}
          cta={{ label: "Ler artigos", targetId: "lista-artigos" }}
        />

        <section
          id="lista-artigos"
          className="py-16 sm:py-20"
          aria-label="Artigos do blog"
          style={{ scrollMarginTop: "var(--site-header-height, 4rem)" }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Stagger className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <StaggerItem key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-sm"
                    >
                      {/* Image — full-bleed photo */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          src={post.coverImage}
                          alt={post.coverImageAlt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                        {/* Number + category */}
                        <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
                          <span className="section-tag text-white/35">{post.category}</span>
                          <span className="font-heading text-[10px] font-bold text-white/22 tabular-nums">
                            {num}
                          </span>
                        </div>
                      </div>

                      {/* Editorial text */}
                      <div className="mt-5 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-white/28">
                          <Clock className="size-3 shrink-0 text-white/20" aria-hidden />
                          <span>{post.readingMinutes} min</span>
                          <span aria-hidden className="text-white/15">·</span>
                          <time dateTime={post.publishedAt} className="tabular-nums">
                            {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </time>
                        </div>

                        <h2 className="font-heading text-lg font-bold leading-snug tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white/96 sm:text-xl">
                          {post.title}
                        </h2>

                        <p className="text-sm leading-relaxed text-white/38 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="border-t border-white/[0.065] pt-4">
                          <span className="editorial-link">
                            Ler artigo
                            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <CtaSection compact />
      </main>
    </>
  );
}

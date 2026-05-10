import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/landing/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts } from "@/data/blog";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Blog & Tendências | Criare Moema",
  description:
    "Trend Reports, guias técnicos e tendências em móveis planejados, design de interiores e marcenaria de alto padrão. Conteúdo para quem exige o melhor.",
  path: "/blog",
  keywords: [
    "tendências móveis planejados",
    "blog marcenaria alto padrão",
    "design de interiores Moema",
    "cozinha planejada tendências",
    "closet planejado guia",
    "trend report móveis",
  ],
});

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${siteConfig.url}/blog`,
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd]} />
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
            { value: `${blogPosts.length}`, label: "artigos publicados" },
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
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {blogPosts.map((post, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <StaggerItem key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="vitral-card vitral-shimmer group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                        <Image
                          src={post.coverImage}
                          alt={post.coverImageAlt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-950/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Category + number */}
                        <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
                          <span className="rounded-full border border-amber-500/40 bg-black/60 px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300 backdrop-blur-md">
                            {post.category}
                          </span>
                          <span className="font-heading text-xs font-bold text-white/30 tabular-nums">
                            {num}
                          </span>
                        </div>
                      </div>

                      {/* Solid content panel */}
                      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                        {/* Meta */}
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <Clock className="size-3.5 text-amber-500/60" aria-hidden />
                          <span>{post.readingMinutes} min de leitura</span>
                          <span aria-hidden className="text-white/20">·</span>
                          <time dateTime={post.publishedAt} className="tabular-nums">
                            {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </time>
                        </div>

                        <h2 className="font-heading text-lg font-bold leading-snug tracking-tight text-white/90 transition-colors duration-300 group-hover:text-amber-100 sm:text-xl">
                          {post.title}
                        </h2>

                        <p className="flex-1 text-sm leading-relaxed text-white/45 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* CTA row */}
                        <div className="mt-1 flex items-center justify-between border-t border-amber-500/12 pt-4">
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 transition-all duration-300 group-hover:gap-2.5 group-hover:text-amber-300">
                            Ler artigo
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                          </span>
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-500/25 text-amber-400/60 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:border-amber-400/40 group-hover:text-amber-300"
                            aria-hidden
                          >
                            <ArrowRight className="size-3" />
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

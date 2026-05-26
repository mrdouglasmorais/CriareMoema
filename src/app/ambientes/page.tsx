import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/landing/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ambientes } from "@/data/ambientes";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Ambientes Planejados em Moema | Criare Moema",
  description:
    "Cozinhas, closets, dormitórios, home office, lavabos e mais — móveis planejados de alto padrão sob medida em Moema, São Paulo. Conheça nossos projetos.",
  path: "/ambientes",
  keywords: [
    "ambientes planejados Moema",
    "móveis planejados por ambiente",
    "cozinha planejada Moema",
    "closet planejado São Paulo",
    "dormitório planejado",
    "home office sob medida",
    "lavabo planejado",
    "sala planejada",
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
      name: "Ambientes",
      item: `${siteConfig.url}/ambientes`,
    },
  ],
};

export default function AmbientesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd]} />
      <main id="conteudo-principal" className="min-w-0 overflow-x-clip">

        <PageHero
          headingId="ambientes-page-heading"
          eyebrow={`Sob medida · ${siteConfig.name}`}
          lines={[
            { text: "Ambientes" },
            { text: "planejados.", gradient: true },
          ]}
          description="Do briefing à instalação — projetos personalizados para cada cômodo, com execução fiel ao aprovado e acabamento de alto padrão. Selecione o ambiente que você quer transformar."
          watermark="AMBIENTES"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Ambientes" },
          ]}
          stats={[
            { value: `${ambientes.length}`, label: "ambientes disponíveis" },
            { value: "5", label: "anos de garantia" },
          ]}
          cta={{ label: "Explorar ambientes", targetId: "lista-ambientes" }}
        />

        <section
          id="lista-ambientes"
          className="py-16 sm:py-20"
          aria-label="Lista de ambientes"
          style={{ scrollMarginTop: "var(--site-header-height, 4rem)" }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {ambientes.map((ambiente, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <StaggerItem key={ambiente.slug}>
                    <Link
                      href={`/ambientes/${ambiente.slug}`}
                      className="group relative block overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                    >
                      {/* Image — tall editorial proportions */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={ambiente.image}
                          alt={`${ambiente.title} planejada em Moema — Criare Moema`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        />

                        {/* Layered gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-950/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Top row: category + number */}
                        <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
                          <span className="rounded-full border border-amber-500/40 bg-black/55 px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300 backdrop-blur-md">
                            {ambiente.subtitle}
                          </span>
                          <span className="font-heading text-xs font-bold text-white/30 tabular-nums">
                            {num}
                          </span>
                        </div>

                        {/* Bottom content — editorial */}
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                          <h2 className="font-heading text-xl font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-amber-100 sm:text-2xl">
                            {ambiente.title}
                          </h2>
                          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/55 sm:text-sm">
                            {ambiente.shortDescription}
                          </p>

                          {/* CTA row */}
                          <div className="mt-4 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 transition-all duration-300 group-hover:gap-2.5 group-hover:text-amber-300">
                              Ver projetos
                              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                            </span>
                            {/* Animated ring on hover */}
                            <span
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-amber-500/20"
                              aria-hidden
                            >
                              <ArrowRight className="size-3.5" />
                            </span>
                          </div>
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

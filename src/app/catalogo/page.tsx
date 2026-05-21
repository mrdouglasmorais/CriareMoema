import type { Metadata } from "next";
import { CatalogGallery } from "@/components/catalog/catalog-gallery";
import { CatalogHero } from "@/components/catalog/catalog-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Catálogo de Projetos | Criare Moema",
  description:
    "Galeria de projetos realizados pela Criare Moema — cozinhas, dormitórios, closets, lavabos e detalhes de marcenaria de alto padrão em Moema, São Paulo.",
  path: "/catalogo",
  keywords: [
    "catálogo móveis planejados Moema",
    "galeria projetos cozinha planejada",
    "fotos closet planejado São Paulo",
    "imagens dormitório sob medida",
    "portfólio marcenaria alto padrão",
    "Criare Moema projetos realizados",
  ],
});

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Catálogo", item: `${siteConfig.url}/catalogo` },
  ],
};

const imageGalleryLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Catálogo de Projetos — Criare Moema",
  description:
    "Galeria de projetos de móveis planejados de alto padrão realizados pela Criare Moema em Moema, São Paulo.",
  url: `${siteConfig.url}/catalogo`,
  author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
};

export default function CatalogoPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd, imageGalleryLd]} />

      <main id="conteudo-principal" className="min-w-0 overflow-x-clip">

        {/* ── Hero — animado, com CTA de scroll ───────────────────────── */}
        <CatalogHero />

        {/* ── Galeria — 100% da largura do navegador ─────────────────── */}
        <section
          id="galeria"
          className="pb-16 pt-8 sm:pb-20"
          aria-label="Galeria de projetos"
          style={{ scrollMarginTop: "var(--site-header-height, 4rem)" }}
        >
          {/* Filtros — com padding horizontal */}
          <div className="px-4 sm:px-6 lg:px-10">
            <CatalogGallery />
          </div>
        </section>

        <CtaSection compact />
      </main>
    </>
  );
}

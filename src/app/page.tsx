import type { Metadata } from "next";
import { CriareLanding } from "@/components/landing/criare-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { brandImages } from "@/lib/brand-assets";
import { faqItems } from "@/data/faq";
import { createPageMetadata, defaultSeoTitle } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

/**
 * Metadados da home com canonical explícito.
 * OG image aponta para o arquivo estático /og-image.png (public/).
 * As dimensões reais 2147×1193 são propagadas via createPageMetadata.
 */
export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: defaultSeoTitle,
    description: siteConfig.description,
    path: "/",
    ogImage: "/og-image.png",
    ogImageWidth: 2147,
    ogImageHeight: 1193,
    ogImageAlt: siteConfig.ogImageAlt,
    keywords: siteConfig.seoKeywords,
  });
}

export default function HomePage() {
  const orgId      = `${siteConfig.url}#organization`;
  const storeId    = `${siteConfig.url}#furniturestore`;
  const websiteId  = `${siteConfig.url}#website`;
  const webPageId  = `${siteConfig.url}#webpage`;
  const ogImageUrl = new URL("/og-image.png", siteConfig.url).toString();
  const logoUrl    = new URL(siteConfig.organization.logoPath, siteConfig.url).toString();

  /** Organization — entidade reutilizada por outros schemas via @id */
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    legalName: siteConfig.organization.legalName,
    url: siteConfig.url,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 200,
      height: 200,
    },
    image: ogImageUrl,
    sameAs: [...siteConfig.sameAs],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
  };

  /** WebSite — habilita Sitelinks Searchbox no Google */
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    alternateName: "Criare Moema Móveis Planejados",
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": orgId },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/catalogo?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  /** WebPage — metadata da página principal */
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webPageId,
    name: defaultSeoTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": websiteId },
    about: { "@id": storeId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImageUrl,
      width: 2147,
      height: 1193,
      caption: siteConfig.ogImageAlt,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      ],
    },
  };

  /** FurnitureStore + LocalBusiness — dados da loja física */
  const furnitureStoreLd = {
    "@context": "https://schema.org",
    "@type": ["FurnitureStore", "LocalBusiness"],
    "@id": storeId,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    image: [
      ogImageUrl,
      new URL(brandImages.hero.src, siteConfig.url).toString(),
    ],
    logo: logoUrl,
    founder: { "@id": orgId },
    sameAs: [...siteConfig.sameAs],
    currenciesAccepted: "BRL",
    paymentAccepted: "Cartão de crédito, PIX, Boleto bancário, Financiamento",
    priceRange: "$$$",
    servesCuisine: null,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.googleMapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "São Paulo", containedInPlace: { "@type": "State", name: "SP" } },
      { "@type": "Neighborhood", name: "Moema" },
      { "@type": "Neighborhood", name: "Ibirapuera" },
      { "@type": "Neighborhood", name: "Vila Clementino" },
      { "@type": "Neighborhood", name: "Brooklin" },
      { "@type": "Neighborhood", name: "Vila Mariana" },
    ],
    knowsAbout: [
      "Móveis Planejados",
      "Cozinha Planejada",
      "Closet Sob Medida",
      "Dormitório Planejado",
      "Home Office Planejado",
      "Lavanderia Planejada",
      "Marcenaria de Alto Padrão",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo de Ambientes Planejados",
      url: `${siteConfig.url}/catalogo`,
    },
  };

  const faqPageLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[organizationLd, websiteLd, webPageLd, furnitureStoreLd, faqPageLd]} />
      <CriareLanding />
    </>
  );
}

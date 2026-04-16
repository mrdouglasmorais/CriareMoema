import type { Metadata } from "next";
import { CriareLanding } from "@/components/landing/criare-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { brandImages } from "@/lib/brand-assets";
import { createPageMetadata, defaultSeoTitle } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const ogImagePath = "/opengraph-image";

/**
 * Metadados da home com canonical explícito.
 * Por quê: `alternates.canonical` concentra autoridade na URL oficial; útil se no futuro
 * existirem campanhas com query strings ou espelhos de conteúdo.
 */
export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: defaultSeoTitle,
    description: siteConfig.description,
    path: "/",
    ogImage: ogImagePath,
    ogImageAlt: siteConfig.ogImageAlt,
    keywords: siteConfig.seoKeywords,
  });
}

export default function HomePage() {
  const storeId = `${siteConfig.url}#furniturestore`;
  const websiteId = `${siteConfig.url}#website`;
  const webPageId = `${siteConfig.url}#webpage`;
  const ogImageUrl = new URL(ogImagePath, siteConfig.url).toString();

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webPageId,
    name: defaultSeoTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": websiteId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImageUrl,
      width: 1200,
      height: 630,
      caption: siteConfig.ogImageAlt,
    },
  };

  const furnitureStoreLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": storeId,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: new URL(brandImages.hero.src, siteConfig.url).toString(),
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
    hasMap: siteConfig.mapEmbedUrl,
  };

  return (
    <>
      <JsonLd data={[webPageLd, furnitureStoreLd]} />
      <CriareLanding />
    </>
  );
}

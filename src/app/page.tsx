import type { Metadata } from "next";
import { CriareLanding } from "@/components/landing/criare-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { brandImages } from "@/lib/brand-assets";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

/**
 * Metadados da home com canonical explícito.
 * Por quê: `alternates.canonical` concentra autoridade na URL oficial; útil se no futuro
 * existirem campanhas com query strings ou espelhos de conteúdo.
 */
export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: `${siteConfig.name} | ${siteConfig.titleSuffix}`,
    description: siteConfig.description,
    path: "/",
  });
}

export default function HomePage() {
  const storeId = `${siteConfig.url}#furniturestore`;

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
      <JsonLd data={furnitureStoreLd} />
      <CriareLanding />
    </>
  );
}

import { CriareLanding } from "@/components/landing/criare-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";

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

import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site-config";

const ogImage = "/opengraph-image";

/**
 * Metadados raiz + template de título. Filhas podem sobrescrever via generateMetadata.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.titleSuffix}`,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: "/brand/icon.png",
    apple: "/brand/icon.png",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.titleSuffix}`,
    description: siteConfig.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    images: [ogImage],
  },
};

export const rootViewport: Viewport = {
  themeColor: "#0c0a09",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Caminho sem domínio, ex: /blog/post */
  path?: string;
  /** Imagem absoluta ou path — metadataBase resolve paths relativos */
  ogImage?: string;
  noIndex?: boolean;
  /** Quando presente, Open Graph usa type=article (artigos, estudos de caso). */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
  };
}

const defaultOg = ogImage;

/**
 * Centraliza título (com template), canonical e Open Graph.
 * Por quê: títulos consistentes aumentam CTR; canonical consolida sinais de ranking;
 * og:* e twitter:* melhoram rich results em redes e Discover.
 */
export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage: ogImagePath = defaultOg,
  noIndex = false,
  article,
}: PageMetadataInput): Metadata {
  const canonical = new URL(path || "/", siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: article ? "article" : "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
      }),
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.twitterHandle,
      images: [ogImagePath],
    },
  };
}

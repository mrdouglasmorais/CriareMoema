import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const ogImage = "/opengraph-image";

/** Título padrão alinhado entre `<title>`, `og:title` e `twitter:title` (CTR e pré-visualizações). */
export const defaultSeoTitle = `${siteConfig.name} | ${siteConfig.titleSuffix}`;

/**
 * Metadados raiz + template de título. Filhas podem sobrescrever via generateMetadata.
 * Por quê: OG/Twitter completos melhoram cliques em compartilhamentos; keywords reforçam tema;
 * robots explícitos evitam ambiguidade; verificação opcional liga Search Console/Bing Webmaster.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultSeoTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seoKeywords],
  icons: {
    icon: "/brand/icon.png",
    apple: "/brand/icon.png",
  },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultSeoTitle,
    description: siteConfig.description,
    emails: [siteConfig.email],
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeoTitle,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: siteConfig.ogImageAlt,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const rootViewport = {
  themeColor: "#0c0a09",
  width: "device-width" as const,
  initialScale: 1,
  viewportFit: "cover" as const,
};

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Caminho sem domínio, ex: /blog/post */
  path?: string;
  /** Imagem absoluta ou path — metadataBase resolve paths relativos */
  ogImage?: string;
  /** Alt da imagem OG/Twitter (pré-visualização e leitores de tela). */
  ogImageAlt?: string;
  /** Palavras-chave; padrão: `siteConfig.seoKeywords`. */
  keywords?: readonly string[] | string;
  noIndex?: boolean;
  /** Quando presente, Open Graph usa type=article (artigos, estudos de caso). */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
  };
}

const defaultOg = ogImage;

function normalizeKeywords(keywords?: readonly string[] | string): string[] {
  if (keywords === undefined) return [...siteConfig.seoKeywords];
  if (typeof keywords === "string") {
    return keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
  }
  return [...keywords];
}

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
  ogImageAlt = siteConfig.ogImageAlt,
  keywords,
  noIndex = false,
  article,
}: PageMetadataInput): Metadata {
  const canonical = new URL(path || "/", siteConfig.url).toString();
  const keywordList = normalizeKeywords(keywords);

  return {
    metadataBase: new URL(siteConfig.url),
    // `absolute` ignora o template `%s | Criare Moema` do layout raiz,
    // evitando títulos duplos como "Blog | Criare Moema | Criare Moema".
    title: { absolute: title },
    description,
    keywords: keywordList,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
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
          alt: ogImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      images: {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    },
  };
}

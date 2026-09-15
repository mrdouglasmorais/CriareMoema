import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Imagem OG padrão: gerada pelo route handler src/app/opengraph-image.tsx
 * (gradiente dark com nome + tagline + descrição — 1200×630).
 * A home page sobrescreve com o screenshot real /og-image.png (2147×1193).
 */
const OG_IMAGE_URL = "/opengraph-image";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

/** Título padrão para home — inclui localização explícita para SEO local. */
export const defaultSeoTitle =
  "Criare Moema | Móveis Planejados de Alto Padrão em Moema, São Paulo";

/**
 * Metadados raiz + template de título.
 * Filhas sobrescrevem via generateMetadata / export const metadata.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultSeoTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seoKeywords],

  // ── Identidade da aplicação ────────────────────────────────────────────────
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },

  /*
   * Ícones: Next.js resolve automaticamente a partir dos arquivos
   * src/app/icon.png e src/app/apple-icon.png — não declarar aqui
   * evita conflito com os links gerados pelo framework.
   * O favicon.ico em src/app/ cobre browsers legados.
   */

  // ── Manifest PWA ──────────────────────────────────────────────────────────
  manifest: "/manifest.webmanifest",

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultSeoTitle,
    description: siteConfig.description,
    emails: [siteConfig.email],
    phoneNumbers: [siteConfig.telephone],
    images: [
      {
        url: OG_IMAGE_URL,
        secureUrl: OG_IMAGE_URL,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: siteConfig.ogImageAlt,
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X card ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: defaultSeoTitle,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: [
      {
        url: OG_IMAGE_URL,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },

  // ── Verificação Search Console ────────────────────────────────────────────
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "qXkJzBXiRY6wwPH6PO-KqM2ANM75KSZXUVJzx7BOFl8",
  },
};

export const rootViewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
    { media: "(prefers-color-scheme: light)", color: "#0c0a09" },
  ],
  width: "device-width" as const,
  initialScale: 1,
  viewportFit: "cover" as const,
};

// ─── createPageMetadata ────────────────────────────────────────────────────────

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Caminho sem domínio, ex: /blog/post */
  path?: string;
  /** Override da imagem OG — absolute URL ou path relativo ao metadataBase. */
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  /** Alt da imagem OG/Twitter. */
  ogImageAlt?: string;
  /** MIME da imagem OG. */
  ogImageType?: string;
  /** Palavras-chave; padrão: `siteConfig.seoKeywords`. */
  keywords?: readonly string[] | string;
  noIndex?: boolean;
  /** Quando presente, og:type vira "article". */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  };
}

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
 * Gera metadados completos para qualquer página:
 * título canônico, canonical URL, Open Graph, Twitter Card e robots.
 */
export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage: ogImagePath = OG_IMAGE_URL,
  ogImageWidth = OG_IMAGE_WIDTH,
  ogImageHeight = OG_IMAGE_HEIGHT,
  ogImageAlt = siteConfig.ogImageAlt,
  ogImageType = "image/png",
  keywords,
  noIndex = false,
  article,
}: PageMetadataInput): Metadata {
  const canonical = new URL(path || "/", siteConfig.url).toString();
  const keywordList = normalizeKeywords(keywords);

  return {
    metadataBase: new URL(siteConfig.url),
    title: { absolute: title },
    description,
    keywords: keywordList,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,

    alternates: {
      canonical,
      languages: { "pt-BR": canonical },
    },

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
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
      emails: [siteConfig.email],
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: article.authors ?? [siteConfig.name],
        section: article.section,
        tags: article.tags,
      }),
      images: [
        {
          url: ogImagePath,
          secureUrl: ogImagePath,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
          type: ogImageType,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      images: [
        {
          url: ogImagePath,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
        },
      ],
    },
  };
}

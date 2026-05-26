/**
 * Resolve a URL canônica em ordem de prioridade:
 * 1. NEXT_PUBLIC_SITE_URL   — domínio de produção (configure no painel Vercel)
 * 2. Domínio de produção fixo — garante sitemap e canonicals corretos em qualquer deploy
 *
 * VERCEL_URL foi removido do fallback pois retorna a URL do deploy específico
 * (ex.: criare-moema-abc123-habitvs.vercel.app), corrompendo sitemap e canonicals.
 */
const PRODUCTION_URL = "https://www.criaremoema.com.br";

function resolveBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return PRODUCTION_URL;
}

export const siteConfig = {
  name: "Criare Moema",
  titleSuffix: "Móveis Planejados Criare",
  /** Linha de foco principal — SEO local e hero. */
  brandFocusLine: "Móveis planejados · São Paulo · Moema",
  tagline: "Manifeste sua personalidade",
  description:
    "Móveis planejados em Moema, São Paulo. Cozinhas, dormitórios, closets e ambientes sob medida com alto padrão de execução.",
  /**
   * Palavras-chave para `<meta name="keywords">` e consistência editorial (Google dá pouco peso,
   * mas ajuda outras ferramentas e reforça o tema da página).
   */
  seoKeywords: [
    "móveis planejados Moema",
    "móveis planejados de alto padrão",
    "móveis sob medida São Paulo",
    "cozinha planejada Moema",
    "cozinha sob medida alto padrão",
    "closet planejado de luxo",
    "dormitório planejado",
    "home office planejado",
    "Criare Moema",
    "loja de móveis planejados Moema",
    "marcenaria alto padrão",
    "projeto de móveis sob medida",
    "móveis planejados para arquitetos",
  ] as const,
  /** Texto descritivo para `og:image:alt` / acessibilidade em previews. */
  ogImageAlt:
    "Criare Moema — móveis planejados em Moema, São Paulo: cozinhas, dormitórios e ambientes sob medida.",
  referenceLandingUrl: "https://ads.criaremoema.com.br/",
  whatsappUrl:
    "https://wa.me/5511942703131?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Criare%20Moema.",
  url: resolveBaseUrl(),
  locale: "pt_BR",
  language: "pt-BR",
  twitterHandle: "@criaremoema",
  email: "contato@criaremoema.com.br",
  sameAs: ["https://ads.criaremoema.com.br/"],
  organization: {
    legalName: "Criare Moema",
    logoPath: "/brand/logo.png",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.736897756038!2d-46.665890999999995!3d-23.613767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5b69e398b3bf%3A0xabee84d156866bad!2sCriare%20Moema!5e0!3m2!1spt-BR!2sbr!4v1772225745306!5m2!1spt-BR!2sbr",
  geo: {
    latitude: -23.613767,
    longitude: -46.665891,
  },
  /** Horários exibidos em “Venha nos visitar” (ajuste conforme a loja). */
  openingHoursLines: [
    "Segunda a sexta: 10h às 19h",
    "Sábado: 10h às 16h",
    "Domingo: fechado",
  ] as const,
  /** Navegação no app Waze (coordenadas da loja). */
  wazeUrl: "https://waze.com/ul?ll=-23.613767,-46.665891&navigate=yes",
  address: {
    streetAddress: "Alameda dos Nhambiquaras, 1910",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
    neighborhood: "Moema",
    postalCode: "04090-004",
  },
  /**
   * Prazo absoluto opcional (ISO). Se vazio, a seção Novidades usa contador de N dias
   * a partir da primeira renderização no cliente (padrão: 7 dias).
   */
  countdownTarget: process.env.NEXT_PUBLIC_NOVIDADES_AT ?? "",
  /** Dias do contador quando não há `countdownTarget` definido. */
  countdownDurationDays: 7,
  /** Links do rodapé — inclui páginas internas e âncoras da landing. */
  footerQuickLinks: [
    { href: "/ambientes", label: "Ambientes" },
    { href: "/catalogo", label: "Catálogo" },
    { href: "/para-profissionais", label: "Para Profissionais" },
    { href: "/blog", label: "Blog / Tendências" },
    { href: "/#quem-somos", label: "Quem Somos" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#localizacao", label: "Localização" },
  ] as const,
  /** Perfil oficial (rodapé / redes). */
  instagramUrl: "https://www.instagram.com/criaremoema/",
  /** Abrir local no Google Maps (coordenadas da loja). */
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=-23.613767,-46.665891",
};

export type SiteConfig = typeof siteConfig;

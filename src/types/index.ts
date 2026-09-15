import type { BlogBlock } from "@/data/blog";

/** Tipos globais reutilizados entre componentes e data files. */

/** Qualquer componente que aceita className extra. */
export interface WithClassName {
  className?: string;
}

/** Entrada de navegação (header, footer, sitemap). */
export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

/** Item genérico com id + texto (benefícios, diferenciais, listas). */
export interface ListItem {
  id: string;
  text: string;
}

/** Card de feature/produto. */
export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

/** Depoimento/testimonial. */
export interface Testimonial {
  id: string;
  name: string;
  neighborhood: string;
  stars: number;
  text: string;
  avatarUrl?: string;
}

/** Badge de confiança (números de impacto). */
export interface TrustBadge {
  id: string;
  value: string;
  label: string;
}

/** Estado do formulário de lead. */
export type FormStatus = "idle" | "pending" | "success" | "error";

/** Resultado de uma Server Action de formulário. */
export type ActionResult =
  | { ok: true }
  | { ok: false; message: string };

/** Status editorial de uma postagem gerida no Studio. */
export type PostStatus = "draft" | "published";

/** Sessão HMAC do Studio — não expõe o token do Firebase no cookie. */
export interface StudioSession {
  uid: string;
  email: string;
  exp: number;
}

/** Estado das integrações necessárias para o Studio. */
export interface IntegrationStatus {
  firebaseClient: boolean;
  firebaseAdmin: boolean;
  cloudinary: boolean;
  sessionSecret: boolean;
}

/** Capa enviada ao Cloudinary (ou URL manual). */
export interface CoverImageAsset {
  url: string;
  width: number;
  height: number;
}

/** Postagem persistida no Firestore (Studio). */
export interface StudioPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: BlogBlock[];
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
  readingMinutes: number;
  category: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  coverImage: string;
  coverImageWidth: number;
  coverImageHeight: number;
  coverImageAlt: string;
  status: PostStatus;
  authorEmail: string;
}

/** Payload de criação/edição enviado pelo formulário do Studio. */
export interface PostInput {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: BlogBlock[];
  category: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  coverImage: string;
  coverImageWidth: number;
  coverImageHeight: number;
  coverImageAlt: string;
  status: PostStatus;
}

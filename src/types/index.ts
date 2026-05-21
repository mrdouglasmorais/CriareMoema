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

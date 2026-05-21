import { cn } from "@/lib/utils";

/**
 * Base de todas as seções da landing.
 * - Desktop: fullpage snap com min-height de viewport
 * - Mobile: padding vertical generoso sem snap
 */
const snapBase = cn(
  // Desktop snap
  "lg:min-h-[calc(100dvh-var(--site-header-height))]",
  "lg:snap-start lg:snap-always lg:flex lg:flex-col",
);

/** Padding vertical mobile — espaçamento editorial generoso. */
const sectionMobilePad = "py-20 sm:py-28 lg:py-0";

/**
 * Separador premium entre seções — linha muito sutil.
 */
const sectionDivider = cn(
  "border-t border-white/[0.055]",
);

/** Seção padrão: conteúdo centrado no viewport (desktop). */
export function landingSection(className?: string) {
  return cn(snapBase, sectionMobilePad, "lg:justify-center", sectionDivider, className);
}

/** Hero: fullpage + conteúdo alinhado à base. */
export function landingHeroSection(className?: string) {
  return cn(
    snapBase,
    "justify-end lg:justify-end",
    "border-b border-white/[0.05]",
    className,
  );
}

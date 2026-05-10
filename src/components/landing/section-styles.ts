import { cn } from "@/lib/utils";

/**
 * Base de todas as seções da landing.
 * - Desktop: fullpage snap com min-height de viewport
 * - Mobile: padding vertical generoso sem snap
 * - Bordas adaptativas: usa border-border que já é adaptive (light/dark via CSS var)
 */
const snapBase = cn(
  "transition-[background-color,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
  "motion-safe:duration-[900ms]",
  // Desktop snap
  "lg:min-h-[calc(100dvh-var(--site-header-height))]",
  "lg:snap-start lg:snap-always lg:flex lg:flex-col",
);

/** Padding vertical no mobile — desktop usa snap sem padding extra. */
const sectionMobilePad = "py-16 sm:py-20 lg:py-0";

/**
 * Separador premium entre seções: usa border-border (adaptive) com
 * sombra inset que funciona em ambos os temas.
 */
const sectionDivider = cn(
  // Borda top: adaptive via border-border
  "border-t border-border/40",
  // Sombra inset: clara em dark (branco/5), escura em light (preto/4)
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
  "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
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
    "border-b border-border/30",
    className,
  );
}

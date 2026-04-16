import { cn } from "@/lib/utils";

const snapBase =
  "border-border/25 transition-[background-color,box-shadow,border-color,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:duration-[1100ms] lg:min-h-[calc(100dvh-var(--site-header-height))] lg:snap-start lg:snap-always lg:flex lg:flex-col";

/** Respiro vertical no mobile — desktop usa snap + conteúdo centralizado (sem padding extra). */
const sectionMobilePad = "py-14 sm:py-16 lg:py-0";

/** Seção padrão: conteúdo centrado na viewport (desktop). */
export function landingSection(className?: string) {
  return cn(
    snapBase,
    sectionMobilePad,
    "lg:justify-center",
    "border-y border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] max-lg:border-white/[0.09] max-lg:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_12px_48px_-28px_rgba(0,0,0,0.35)]",
    className,
  );
}

/** Hero: mesma altura + snap, conteúdo alinhado à base. */
export function landingHeroSection(className?: string) {
  return cn(
    snapBase,
    "justify-end lg:justify-end",
    "border-b border-white/[0.06]",
    className,
  );
}

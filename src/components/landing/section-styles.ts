import { cn } from "@/lib/utils";

const snapBase =
  "border-border/25 transition-[background-color,box-shadow,border-color,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:duration-[1100ms] lg:min-h-[calc(100dvh-var(--site-header-height))] lg:snap-start lg:snap-always lg:flex lg:flex-col";

/** Seção padrão: conteúdo centrado na viewport (desktop). */
export function landingSection(className?: string) {
  return cn(
    snapBase,
    "lg:justify-center",
    "border-y border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
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

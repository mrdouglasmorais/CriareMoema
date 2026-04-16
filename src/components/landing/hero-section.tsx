"use client";

import { HeroAmbientLayers } from "@/components/landing/hero-ambient-layers";
import { HeroScrollArrow } from "@/components/landing/hero-scroll-arrow";
import { landingHeroSection } from "@/components/landing/section-styles";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        landingHeroSection(),
        "relative flex flex-col overflow-hidden",
        "max-lg:min-h-[calc(100svh-var(--site-header-height))] max-lg:max-h-[calc(100svh-var(--site-header-height))]",
        "lg:min-h-[calc(100dvh-var(--site-header-height))] lg:max-h-[calc(100dvh-var(--site-header-height))]",
      )}
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width);
        mouseY.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
    >
      <HeroAmbientLayers reduce={!!reduce} mouseX={mouseX} mouseY={mouseY} />

      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-6xl flex-1 flex-col px-4 pb-[max(5rem,env(safe-area-inset-bottom,0px))] pt-6 sm:px-6 sm:pb-24 sm:pt-10">
        <div className="relative z-10 max-w-3xl space-y-8">
          <motion.p
            className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-amber-500/35 bg-amber-950/40 px-4 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300 shadow-[0_0_32px_-4px_rgba(245,158,11,0.35)] backdrop-blur-md sm:text-xs sm:tracking-[0.28em]"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            {siteConfig.brandFocusLine}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="relative isolate font-heading text-balance text-[clamp(1.85rem,7.5vw,2.5rem)] font-bold leading-[1.08] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeOut, delay: 0.12 }}
          >
            <span className="bg-gradient-to-br from-stone-50 via-white to-amber-100/90 bg-clip-text text-transparent drop-shadow-sm">
              Manifeste sua personalidade
            </span>
          </motion.h1>

          <motion.p
            className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.22 }}
          >
            Cozinha, sala, lavanderia, dormitório, closet, lavabo e home office — projetos
            planejados sob medida em{" "}
            <strong className="font-semibold text-foreground/90">Moema</strong> e região, para quem
            exige execução impecável.
          </motion.p>
        </div>
      </div>

      <HeroScrollArrow />
    </section>
  );
}

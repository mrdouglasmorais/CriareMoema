"use client";

import Link from "next/link";
import { HeroAmbientLayers } from "@/components/landing/hero-ambient-layers";
import { HeroScrollArrow } from "@/components/landing/hero-scroll-arrow";
import { landingHeroSection } from "@/components/landing/section-styles";
import { WhatsAppOfficialLogo } from "@/components/icons/whatsapp-official-logo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        "dark",
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

      {/* Raios de luz prismáticos */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
          <div
            className="absolute -left-20 top-0 h-full w-[45%] origin-top-left"
            style={{
              background: "linear-gradient(170deg, rgba(245,158,11,0.10) 0%, transparent 70%)",
              transform: "skewX(-15deg)",
            }}
          />
          <div
            className="absolute -right-20 top-0 h-full w-[35%] origin-top-right"
            style={{
              background: "linear-gradient(190deg, rgba(139,92,246,0.08) 0%, transparent 65%)",
              transform: "skewX(10deg)",
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-1 flex-col px-5 pb-[max(5rem,env(safe-area-inset-bottom,0px))] pt-10 sm:px-8 sm:pb-28 sm:pt-14 lg:px-10">
        <div className="relative z-10 flex flex-1 flex-col justify-end max-w-4xl space-y-7 pb-4 sm:pb-8">

          {/* Eyebrow editorial — linha + texto, sem pill/badge */}
          <motion.div
            className="flex items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <span className="h-px w-12 bg-amber-500/50 shrink-0" aria-hidden />
            <span className="font-heading text-[0.68rem] font-500 uppercase tracking-[0.26em] text-amber-400/70">
              {siteConfig.brandFocusLine}
            </span>
          </motion.div>

          {/* Heading — editorial, massivo */}
          <motion.h1
            id="hero-heading"
            className="font-heading font-bold leading-[0.97] tracking-[-0.03em] text-balance"
            style={{ fontSize: "clamp(3.25rem, 10vw + 0.5rem, 8rem)" }}
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
          >
            <span className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
              Manifeste sua
            </span>
            <br />
            <span className="bg-gradient-to-br from-white/90 via-white/75 to-amber-100/60 bg-clip-text text-transparent">
              personalidade
            </span>
          </motion.h1>

          {/* Descrição — sutil, não compete com o título */}
          <motion.p
            className="max-w-lg text-pretty text-base leading-relaxed text-white/45 sm:text-lg lg:text-xl"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.22 }}
          >
            Projetos planejados sob medida em Moema — cozinha, dormitório,
            closet e home office com execução impecável.
          </motion.p>

          {/* CTAs — primário âmbar + secundário editorial */}
          <motion.div
            className="flex flex-wrap items-center gap-5 pt-1"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: easeOut, delay: 0.34 }}
          >
            {/* CTA primário — refinado, sem cores fortes */}
            <Link
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-11 items-center gap-2.5 rounded-xl px-6 sm:h-12 sm:px-7",
                "font-heading text-[0.78rem] font-semibold uppercase tracking-[0.06em]",
                "border border-amber-500/28 bg-amber-500/7 text-amber-400/78",
                "transition-all duration-400",
                "hover:border-amber-500/45 hover:bg-amber-500/12 hover:text-amber-400/96",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
              )}
              aria-label="Falar com especialista pelo WhatsApp"
            >
              <WhatsAppOfficialLogo className="size-4 shrink-0" aria-hidden />
              Falar com especialista
            </Link>

            {/* CTA secundário — editorial text-link */}
            <button
              type="button"
              onClick={() => {
                const html = document.documentElement;
                const target = document.getElementById("ambientes");
                if (!target) return;
                const prev = html.style.scrollSnapType;
                html.style.scrollSnapType = "none";
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                setTimeout(() => {
                  html.style.scrollSnapType = prev;
                }, 900);
              }}
              className="editorial-link group"
            >
              Ver ambientes
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </button>
          </motion.div>

        </div>
      </div>

      <HeroScrollArrow />
    </section>
  );
}

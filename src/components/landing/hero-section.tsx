"use client";

import Link from "next/link";
import { HeroAmbientLayers } from "@/components/landing/hero-ambient-layers";
import { HeroScrollArrow } from "@/components/landing/hero-scroll-arrow";
import { landingHeroSection } from "@/components/landing/section-styles";
import { WhatsAppOfficialLogo } from "@/components/icons/whatsapp-official-logo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  return (
    <section
      aria-labelledby="hero-heading"
      // Hero sempre dark: foto de fundo escura + overlay — texto precisa ser sempre claro
      // independente da preferência de tema do usuário.
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

      {/* Raios de luz prismáticos — efeito vitral no hero */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
          {/* Raio âmbar */}
          <div
            className="absolute -left-20 top-0 h-full w-[45%] origin-top-left"
            style={{
              background: "linear-gradient(170deg, rgba(245,158,11,0.12) 0%, transparent 70%)",
              transform: "skewX(-15deg)",
            }}
          />
          {/* Raio violeta */}
          <div
            className="absolute -right-20 top-0 h-full w-[35%] origin-top-right"
            style={{
              background: "linear-gradient(190deg, rgba(139,92,246,0.10) 0%, transparent 65%)",
              transform: "skewX(10deg)",
            }}
          />
          {/* Prisma central — arco-íris sutil */}
          <div
            className="absolute left-1/2 top-0 h-[60%] w-px -translate-x-1/2 opacity-20"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(245,158,11,0.6) 30%, rgba(139,92,246,0.6) 60%, transparent 100%)",
              filter: "blur(8px)",
              width: "3px",
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-6xl flex-1 flex-col px-4 pb-[max(5rem,env(safe-area-inset-bottom,0px))] pt-8 sm:px-6 sm:pb-24 sm:pt-10">
        <div className="relative z-10 max-w-3xl space-y-8">
          <motion.p
            className="prismatic-ring inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-amber-950/40 px-4 py-2.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-xl sm:tracking-[0.28em]"
            style={{ boxShadow: "0 0 40px -6px rgba(245,158,11,0.5), 0 0 80px -20px rgba(139,92,246,0.3)" }}
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            {siteConfig.brandFocusLine}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="relative isolate font-heading text-balance font-bold leading-[1.02] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(3rem, 9vw + 0.5rem, 7rem)" }}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeOut, delay: 0.12 }}
          >
            <span className="bg-gradient-to-br from-stone-50 via-white to-amber-100/90 bg-clip-text text-transparent drop-shadow-sm">
              Manifeste sua personalidade
            </span>
          </motion.h1>

          <motion.p
            className="max-w-xl text-pretty text-xl leading-relaxed text-white/70 sm:text-2xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.22 }}
          >
            Cozinha, sala, lavanderia, dormitório, closet, lavabo e home office — projetos
            planejados sob medida em{" "}
            <strong className="font-semibold text-foreground/90">Moema</strong> e região, para quem
            exige execução impecável.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 pt-2"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.34 }}
          >
            <Link
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-12 items-center gap-2.5 rounded-xl px-6 text-sm font-semibold sm:h-14 sm:px-8 sm:text-base",
                "bg-gradient-to-b from-amber-400 to-amber-500 text-stone-950",
                "shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_4px_20px_rgba(245,158,11,0.4)]",
                "transition-all duration-300",
                "hover:from-amber-300 hover:to-amber-400 hover:shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_8px_28px_rgba(245,158,11,0.55)]",
                "active:from-amber-500 active:to-amber-600 active:shadow-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label="Falar com especialista pelo WhatsApp"
            >
              <WhatsAppOfficialLogo className="size-5 shrink-0" aria-hidden />
              Falar com especialista
            </Link>

            <button
              type="button"
              onClick={() => {
                const html = document.documentElement;
                const target = document.getElementById("ambientes");
                if (!target) return;
                // Desativa snap temporariamente para não bloquear scrollIntoView
                const prev = html.style.scrollSnapType;
                html.style.scrollSnapType = "none";
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                // Restaura snap após a animação de scroll completar
                setTimeout(() => {
                  html.style.scrollSnapType = prev;
                }, 900);
              }}
              className={cn(
                "inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-6 text-sm font-semibold text-foreground/90 backdrop-blur-sm sm:h-14 sm:px-8 sm:text-base",
                "transition-all duration-300",
                "hover:border-white/30 hover:bg-white/12 hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              Ver ambientes
              <ChevronDown className="size-4 shrink-0 opacity-70" aria-hidden />
            </button>
          </motion.div>
        </div>
      </div>

      <HeroScrollArrow />
    </section>
  );
}

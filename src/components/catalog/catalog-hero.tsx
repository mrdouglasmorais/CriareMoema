"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { startTransition, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1400, delay = 600) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { startTransition(() => setValue(target)); return; }
    const t = setTimeout(() => {
      let start: number | null = null;
      function step(ts: number) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        setValue(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay, reduce]);

  return value;
}

// ─── Stat block ───────────────────────────────────────────────────────────────

interface StatProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
}

function Stat({ value, prefix = "", suffix = "", label, delay = 800 }: StatProps) {
  const count = useCountUp(value, 1200, delay);
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {prefix}{count}{suffix}
      </span>
      <span className="mt-1.5 text-xs text-muted-foreground">{label}</span>
    </motion.div>
  );
}

// ─── Word-by-word animated heading ────────────────────────────────────────────

function AnimatedHeading() {
  const reduce = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  const lines = [
    { text: "Cada detalhe,", gradient: false },
    { text: "uma decisão.", gradient: true },
  ];

  return (
    <h1
      id="catalogo-heading"
      className="mt-5 font-heading font-bold tracking-tight"
      style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", lineHeight: 1.02 }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          <motion.span
            className={cn(
              "block",
              line.gradient && "text-gradient-amber",
            )}
            initial={reduce ? false : { y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: 0.15 + li * 0.12,
              duration: 0.7,
              ease: EASE,
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

// ─── Scroll CTA ───────────────────────────────────────────────────────────────

function ScrollCTA() {
  const reduce = useReducedMotion();

  function scrollToGallery() {
    document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.div
      className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={scrollToGallery}
        className={cn(
          "inline-flex cursor-pointer items-center gap-3 rounded-xl px-7 py-3.5",
          "font-heading text-[0.78rem] font-semibold uppercase tracking-[0.06em]",
          "border border-amber-500/28 bg-amber-500/7 text-amber-400/78",
          "transition-all duration-400 hover:border-amber-500/45 hover:bg-amber-500/12 hover:text-amber-400/96",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/40",
        )}
      >
        Explorar projetos
        <motion.span
          animate={reduce ? undefined : { y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="size-5" aria-hidden />
        </motion.span>
      </button>

      <span className="text-sm text-muted-foreground">
        17 fotos · 6 categorias · Alta resolução
      </span>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function CatalogHero() {
  const reduce = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  const hints = [
    "Clique para ampliar",
    "Scroll para zoom",
    "Duplo clique 2,8×",
    "Setas ← → para navegar",
    "Arraste quando zoom",
  ];

  return (
    <section
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden"
      aria-labelledby="catalogo-heading"
    >
      {/* ── Fundo — orbs animados ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {/* Orb âmbar */}
        <motion.div
          className="absolute left-[-10%] top-[-15%] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.18),transparent_65%)]"
          animate={reduce ? undefined : {
            scale: [1, 1.12, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        {/* Orb violeta */}
        <motion.div
          className="absolute bottom-[-10%] right-[-8%] h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.13),transparent_65%)]"
          animate={reduce ? undefined : {
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
        />

        {/* Palavra editorial de fundo — alto impacto */}
        <motion.div
          className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none font-heading font-bold leading-none text-foreground/[0.035]"
          style={{ fontSize: "clamp(8rem, 22vw, 20rem)", writingMode: "horizontal-tb" }}
          initial={reduce ? false : { opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 1.2, ease: EASE }}
          aria-hidden
        >
          CATÁLOGO
        </motion.div>

        {/* Linha separadora decorativa */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* ── Conteúdo ──────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20">

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Navegação estrutural"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <ol className="flex flex-wrap items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
            <li>
              <Link href="/" className="transition-colors hover:text-amber-400">
                Início
              </Link>
            </li>
            <li aria-hidden className="text-muted-foreground/25">/</li>
            <li className="text-amber-500/70">Catálogo</li>
          </ol>
        </motion.nav>

        {/* Layout split */}
        <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">

          {/* Texto principal */}
          <div className="max-w-2xl">
            <motion.p
              className="label-eyebrow"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
            >
              Portfólio · Moema · São Paulo
            </motion.p>

            <AnimatedHeading />

            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.55, ease: EASE }}
            >
              Navegue pelo acervo de projetos realizados. Filtre por ambiente,
              amplie qualquer imagem e use o zoom para ver a precisão de execução
              que nos define.
            </motion.p>

            <ScrollCTA />

            {/* Hints de gesto */}
            <motion.div
              className="mt-6 flex flex-wrap gap-1.5"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              {hints.map((hint) => (
                <span
                  key={hint}
                  className="inline-flex items-center rounded-full border border-border/40 bg-muted/25 px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/55"
                >
                  {hint}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Stats com count-up */}
          <div className="flex shrink-0 flex-wrap gap-10 lg:flex-col lg:items-end lg:gap-8">
            <Stat value={17} label="fotos neste catálogo" delay={700} />
            <Stat value={6} label="categorias" delay={850} />
            <Stat value={5} suffix="K+" label="pixels de resolução" delay={1000} />
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom center */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden
      >
        <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          Role para ver
        </span>
        <motion.div
          className="h-8 w-[1px] origin-top rounded-full bg-gradient-to-b from-amber-400/60 to-transparent"
          animate={reduce ? undefined : { scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

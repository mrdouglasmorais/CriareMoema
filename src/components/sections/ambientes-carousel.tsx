"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ambientes } from "@/data/ambientes";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 5800; // ms
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Slide transition variants ────────────────────────────────────────────────

const slideVariants = {
  enter: (d: number) => ({
    x: d > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: "0%", opacity: 1 },
  exit: (d: number) => ({
    x: d > 0 ? "-28%" : "28%",
    opacity: 0,
    scale: 0.96,
  }),
};

const textVariants = {
  enter: { opacity: 0, y: 32 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AmbientesCarousel() {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const touchStart = useRef<number | null>(null);
  const total = ambientes.length;

  const goTo = useCallback(
    (index: number, dir?: number) => {
      const d = dir ?? (index > current ? 1 : -1);
      setDirection(d);
      setCurrent(index);
      setProgressKey((k) => k + 1);
    },
    [current],
  );

  const prev = useCallback(() => goTo((current - 1 + total) % total, -1), [current, total, goTo]);
  const next = useCallback(() => goTo((current + 1) % total, 1), [current, total, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(id);
  }, [current, paused, next]);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch swipe
  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (delta < -50) next();
    else if (delta > 50) prev();
    touchStart.current = null;
  }

  const active = ambientes[current];
  const idx = String(current + 1).padStart(2, "0");

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Main slide ──────────────────────────────────────────────────── */}
      <div
        className="relative h-[340px] overflow-hidden sm:h-[440px] lg:h-[520px]"
        aria-roledescription="carrossel"
        aria-label="Ambientes sob medida"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active.slug}
            className="absolute inset-0"
            custom={direction}
            variants={reduce ? undefined : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Image — zoom-in on enter */}
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
            >
              <Image
                src={active.image}
                alt={active.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>

            {/* Gradient layers — left dominance for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />

            {/* Slide number — giant decorative background */}
            <div
              className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-heading font-bold leading-none text-white/5 sm:right-10"
              style={{ fontSize: "clamp(8rem, 20vw, 18rem)" }}
              aria-hidden
            >
              {idx}
            </div>

            {/* Content — editorial layout */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-5 sm:p-10 lg:p-14"
              key={`text-${active.slug}`}
              variants={reduce ? undefined : textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
            >
              {/* Category pill */}
              <div className="mb-4">
                <span className="prismatic-ring inline-flex rounded-full bg-black/50 px-3.5 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-md">
                  {active.subtitle}
                </span>
              </div>

              {/* Heading — editorial, massive */}
              <h3
                className="font-heading font-bold leading-[0.95] text-white"
                style={{ fontSize: "clamp(1.9rem, 6vw, 5rem)" }}
              >
                {active.title}
              </h3>

              {/* Description — oculta em mobile para não estourar a altura */}
              <p className="mt-3 hidden max-w-lg text-sm leading-relaxed text-white/60 sm:block sm:text-base lg:text-lg">
                {active.shortDescription}
              </p>

              {/* CTA */}
              <div className="mt-4 flex items-center gap-4 sm:mt-6">
                <Link
                  href={`/ambientes/${active.slug}`}
                  className={cn(
                    "inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold sm:px-7 sm:py-4",
                    "bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-stone-950",
                    "shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_4px_20px_rgba(245,158,11,0.4)]",
                    "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(245,158,11,0.5)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70",
                  )}
                >
                  Conhecer este ambiente
                  <ArrowRight className="size-4 shrink-0" aria-hidden />
                </Link>

                <Link
                  href="/ambientes"
                  className="text-sm font-semibold text-white/50 underline-offset-2 transition-colors hover:text-white/80"
                >
                  Ver todos
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── Prev / Next — faixas verticais full-height ───────────────── */}
        <button
          type="button"
          onClick={prev}
          aria-label="Ambiente anterior"
          className="group absolute inset-y-0 left-0 z-20 flex w-14 items-center justify-center focus-visible:outline-none sm:w-20"
        >
          {/* Gradiente hover — não sobrepõe conteúdo */}
          <span className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100" />
          {/* Ícone sutil */}
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full text-white/20 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white/75 group-hover:backdrop-blur-sm group-focus-visible:bg-white/10 group-focus-visible:text-white/75 sm:h-10 sm:w-10">
            <ChevronLeft className="size-4 sm:size-5" strokeWidth={1.5} aria-hidden />
          </span>
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Próximo ambiente"
          className="group absolute inset-y-0 right-0 z-20 flex w-14 items-center justify-center focus-visible:outline-none sm:w-20"
        >
          <span className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100" />
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full text-white/20 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white/75 group-hover:backdrop-blur-sm group-focus-visible:bg-white/10 group-focus-visible:text-white/75 sm:h-10 sm:w-10">
            <ChevronRight className="size-4 sm:size-5" strokeWidth={1.5} aria-hidden />
          </span>
        </button>

        {/* ── Dot indicators + counter ─────────────────────────────────── */}
        <div className="absolute bottom-6 right-5 z-20 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
            {ambientes.map((amb, i) => (
              <button
                key={amb.slug}
                type="button"
                role="tab"
                aria-selected={i === current}
                onClick={() => goTo(i)}
                className={cn(
                  "rounded-full transition-all duration-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/60",
                  i === current
                    ? "h-2 w-8 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                    : "h-2 w-2 bg-white/30 hover:bg-white/55",
                )}
                aria-label={`${amb.title} (slide ${i + 1})`}
              />
            ))}
          </div>

          <span className="font-heading text-[10px] font-semibold tabular-nums tracking-[0.16em] text-white/35">
            {idx} — {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* ── Progress bar ─────────────────────────────────────────────── */}
        {!paused && !reduce && (
          <motion.div
            key={progressKey}
            className="absolute bottom-0 left-0 z-20 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-amber-300"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            aria-hidden
          />
        )}
      </div>

      {/* ── Thumbnail strip ───────────────────────────────────────────── */}
      <div
        className="flex gap-2.5 overflow-x-auto px-4 py-4 sm:gap-3 sm:px-8 sm:py-5 lg:px-12"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
        role="group"
        aria-label="Miniaturas de ambientes"
      >
        {ambientes.map((amb, i) => {
          const isActive = i === current;
          return (
            <button
              key={amb.slug}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "group relative shrink-0 overflow-hidden rounded-xl transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
                "h-20 w-28 sm:h-24 sm:w-36",
                isActive
                  ? "scale-105 ring-2 ring-amber-400 ring-offset-2 ring-offset-background"
                  : "opacity-45 hover:opacity-75 hover:scale-[1.02]",
              )}
              aria-label={amb.title}
              aria-pressed={isActive}
            >
              <Image
                src={amb.image}
                alt={amb.title}
                fill
                sizes="128px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.06]"
              />
              {/* Dark overlay + title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <p className="absolute bottom-1.5 left-1.5 right-1.5 font-heading text-[9px] font-semibold leading-tight text-white/85 sm:text-[10px]">
                {amb.title.split(" ")[0]}
              </p>

              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="thumb-active"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-amber-400"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

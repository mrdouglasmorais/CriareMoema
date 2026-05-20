"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ambientes } from "@/data/ambientes";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 8000;
const EASE = [0.22, 1, 0.36, 1] as const;

export function AmbientesCarousel() {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const touchStart = useRef<number | null>(null);
  const total = ambientes.length;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  // Autoplay
  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(id);
  }, [current, reduce, next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch/swipe
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

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100dvh - var(--site-header-height))" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carrossel"
      aria-label="Ambientes sob medida Criare Moema"
    >
      {/* ── Slides com crossfade ────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        {ambientes.map((amb, i) => {
          const isActive = i === current;
          return (
            <motion.div
              key={amb.slug}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
              aria-hidden={!isActive}
            >
              {/* Imagem com Ken Burns sutil */}
              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.08 }}
                animate={isActive ? { scale: 1 } : { scale: 1.05 }}
                transition={{ duration: 8, ease: "easeOut" }}
              >
                <Image
                  src={amb.image}
                  alt={amb.title}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Gradientes de profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/12" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* ── Overlay de contexto — topo esquerdo ─────────────────────── */}
      <div className="absolute left-8 top-8 z-20 sm:left-12 lg:left-16">
        <span className="section-tag">01 — Ambientes</span>
      </div>

      {/* ── Contador — topo direito ──────────────────────────────────── */}
      <div
        className="absolute right-8 top-8 z-20 font-heading text-[10px] font-500 tabular-nums tracking-[0.20em] text-white/25 sm:right-12 lg:right-16"
        aria-label={`Slide ${current + 1} de ${total}`}
      >
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* ── Conteúdo — overlay bottom-left ──────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-8 pb-14 sm:px-12 sm:pb-16 lg:px-16 lg:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            className="max-w-2xl"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          >
            {/* Categoria */}
            <p className="label-eyebrow mb-4 text-amber-400/55">
              {active.subtitle}
            </p>

            {/* Título — massivo, editorial */}
            <h3
              className="font-heading font-bold leading-[0.94] tracking-tight text-white"
              style={{ fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
            >
              {active.title}
            </h3>

            {/* Descrição — visível apenas em desktop */}
            <p className="mt-4 hidden max-w-md text-sm leading-relaxed text-white/45 lg:block">
              {active.shortDescription}
            </p>

            {/* CTA editorial */}
            <div className="mt-6 flex items-center gap-8">
              <Link
                href={`/ambientes/${active.slug}`}
                className="editorial-link group"
              >
                Conhecer este ambiente
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>

              <Link
                href="/ambientes"
                className="font-heading text-[0.68rem] font-500 uppercase tracking-[0.18em] text-white/18 transition-colors duration-300 hover:text-white/45"
              >
                Ver todos
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dots — bottom right ──────────────────────────────────────── */}
      <div
        className="absolute bottom-14 right-8 z-20 flex items-center gap-2 sm:right-12 lg:right-16"
        role="tablist"
        aria-label="Slides de ambientes"
      >
        {ambientes.map((amb, i) => (
          <button
            key={amb.slug}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={amb.title}
            onClick={() => goTo(i)}
            className={cn(
              "rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/60",
              i === current
                ? "h-[2px] w-7 bg-white/75"
                : "h-[2px] w-3 bg-white/20 hover:bg-white/45",
            )}
          />
        ))}
      </div>

      {/* ── Progress line — bottom ───────────────────────────────────── */}
      {!reduce && (
        <motion.div
          key={progressKey}
          className="absolute bottom-0 left-0 right-0 z-20 h-px origin-left bg-amber-400/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          aria-hidden
        />
      )}
    </div>
  );
}

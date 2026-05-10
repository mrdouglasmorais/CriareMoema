"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageHeroLine {
  text: string;
  gradient?: boolean;
}

export interface PageHeroStat {
  value: string;
  label: string;
}

export interface PageHeroProps {
  /** Small eyebrow label above the title */
  eyebrow: string;
  /** Title lines — last with gradient by default if gradient: true */
  lines: PageHeroLine[];
  /** Body paragraph */
  description?: string;
  /** Background watermark word */
  watermark?: string;
  /** Breadcrumb trail */
  breadcrumbs: Breadcrumb[];
  /** Optional right-column stats */
  stats?: PageHeroStat[];
  /** Optional CTA that scrolls to a section */
  cta?: {
    label: string;
    targetId: string;
  };
  /** Accessible id for the h1 */
  headingId: string;
  /** Additional section className */
  className?: string;
}

// ─── Animated lines ───────────────────────────────────────────────────────────

function AnimatedLines({ lines, headingId }: { lines: PageHeroLine[]; headingId: string }) {
  const reduce = useReducedMotion();
  return (
    <h1
      id={headingId}
      className="mt-5 font-heading font-bold tracking-tight"
      style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)", lineHeight: 1.04 }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block", line.gradient && "text-gradient-amber")}
            initial={reduce ? false : { y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: EASE }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function PageHero({
  eyebrow,
  lines,
  description,
  watermark,
  breadcrumbs,
  stats,
  cta,
  headingId,
  className,
}: PageHeroProps) {
  const reduce = useReducedMotion();

  function scrollToTarget() {
    if (!cta) return;
    const el = document.getElementById(cta.targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      className={cn(
        "relative flex min-h-[68svh] flex-col justify-center overflow-hidden",
        className,
      )}
      aria-labelledby={headingId}
    >
      {/* ── Background ──────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {/* Orb âmbar */}
        <motion.div
          className="absolute left-[-10%] top-[-15%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.16),transparent_65%)]"
          animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        {/* Orb violeta */}
        <motion.div
          className="absolute bottom-[-10%] right-[-8%] h-[45vw] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.11),transparent_65%)]"
          animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.45, 0.85, 0.45] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
        />

        {/* Watermark */}
        {watermark && (
          <motion.div
            className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none font-heading font-bold leading-none text-foreground/[0.032]"
            style={{ fontSize: "clamp(7rem, 20vw, 18rem)" }}
            initial={reduce ? false : { opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 1.2, ease: EASE }}
            aria-hidden
          >
            {watermark}
          </motion.div>
        )}

        {/* Amber line bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Navegação estrutural"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <ol className="flex flex-wrap items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
            {breadcrumbs.map((bc, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-muted-foreground/25">/</span>}
                {bc.href ? (
                  <Link href={bc.href} className="transition-colors hover:text-amber-400">
                    {bc.label}
                  </Link>
                ) : (
                  <span className="text-amber-500/70">{bc.label}</span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Split layout */}
        <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">

          {/* Left: text */}
          <div className="max-w-2xl">
            <motion.p
              className="label-eyebrow"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
            >
              {eyebrow}
            </motion.p>

            <AnimatedLines lines={lines} headingId={headingId} />

            {description && (
              <motion.p
                className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.55, ease: EASE }}
              >
                {description}
              </motion.p>
            )}

            {cta && (
              <motion.div
                className="mt-10"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.55, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={scrollToTarget}
                  className={cn(
                    "inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-base font-semibold",
                    "bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-stone-950",
                    "shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_4px_24px_rgba(245,158,11,0.4)]",
                    "transition-all duration-200 hover:-translate-y-0.5",
                    "hover:shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_32px_rgba(245,158,11,0.55)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60",
                  )}
                >
                  {cta.label}
                  <motion.span
                    animate={reduce ? undefined : { y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    aria-hidden
                  >
                    ↓
                  </motion.span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Right: stats */}
          {stats && stats.length > 0 && (
            <motion.div
              className="flex shrink-0 flex-wrap gap-10 lg:flex-col lg:items-end lg:gap-8"
              initial={reduce ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    {s.value}
                  </span>
                  <span className="mt-1.5 text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
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

"use client";

import Image from "next/image";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function getRemaining(target: number, now: number) {
  const diff = Math.max(0, target - now);
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, total: diff };
}

function resolveDeadlineMs(): number {
  const raw = siteConfig.countdownTarget?.trim();
  if (raw) {
    const t = new Date(raw).getTime();
    if (Number.isFinite(t) && t > Date.now()) return t;
  }
  return Date.now() + siteConfig.countdownDurationDays * 24 * 60 * 60 * 1000;
}

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Mosaico 2×2 — fundo da seção (ambientes Criare). */
const MOSAIC = [
  brandImages.hero,
  brandImages.ambientes,
  brandImages.showcase1,
  brandImages.showcase2,
] as const;

export interface NovidadesCountdownProps {
  className?: string;
}

export function NovidadesCountdown({ className }: NovidadesCountdownProps) {
  const reduce = useReducedMotion();
  const [deadline, setDeadline] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const end = resolveDeadlineMs();
    queueMicrotask(() => {
      setDeadline(end);
      setNow(Date.now());
    });
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds, total } = useMemo(() => {
    if (deadline === null || now === 0) {
      return {
        days: siteConfig.countdownDurationDays,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 1,
      };
    }
    return getRemaining(deadline, now);
  }, [deadline, now]);

  const ended = deadline !== null && now > 0 && total === 0;

  const cells = [
    { label: "Dias", value: pad(days) },
    { label: "Horas", value: pad(hours) },
    { label: "Minutos", value: pad(minutes) },
    { label: "Segundos", value: pad(seconds) },
  ] as const;

  const summary = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;

  return (
    <motion.article
      className={cn(
        "relative isolate min-h-[min(85svh,900px)] w-full overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_40px_120px_-48px_rgba(0,0,0,0.85)] sm:min-h-[min(88vh,900px)] sm:rounded-[2.25rem]",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: easeOut }}
      aria-labelledby="novidades-titulo-visivel"
    >
      {/* Mosaico de fundo — imagens grandes cobrindo toda a área */}
      <div
        className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[3px] bg-background sm:gap-1"
        aria-hidden
      >
        {MOSAIC.map((img, i) => (
          <div key={img.src} className="relative min-h-[140px] overflow-hidden sm:min-h-[200px]">
            <Image
              src={img.src}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover motion-safe:transition-transform motion-safe:duration-[18s] motion-safe:ease-in-out motion-safe:hover:scale-[1.04]"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/93 via-background/78 to-background/92 max-lg:from-background/96 max-lg:via-background/84 max-lg:to-background/95"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(245,158,11,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(245,158,11,0.06)_0%,transparent_40%,transparent_60%,rgba(120,53,15,0.12)_100%)]"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-50"
        style={{
          background:
            "linear-gradient(135deg, rgba(251,191,36,0.25), transparent 40%, rgba(245,158,11,0.15))",
        }}
        animate={reduce ? {} : { opacity: [0.35, 0.55, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[inherit] flex-col justify-center px-4 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto w-full max-w-5xl text-center">
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-amber-400/95 sm:text-xs">
            {siteConfig.brandFocusLine}
          </p>

          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-950/35 px-5 py-2.5 shadow-[0_0_48px_-12px_rgba(245,158,11,0.45)] backdrop-blur-md">
            <span
              className="relative flex h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.95)]"
              aria-hidden
            >
              {!reduce && (
                <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/50" />
              )}
            </span>
            <span className="font-heading text-sm font-bold uppercase tracking-[0.38em] text-amber-50 sm:text-base">
              Em breve
            </span>
          </div>

          <h2
            id="novidades-titulo-visivel"
            className="mt-8 font-heading text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tighter sm:mt-10"
          >
            <span className="bg-gradient-to-br from-stone-50 via-white to-amber-200/95 bg-clip-text text-transparent">
              Novidades chegando
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Em até{" "}
            <strong className="font-semibold text-amber-100/95">{siteConfig.countdownDurationDays} dias</strong>{" "}
            revelamos o que preparamos para o seu lar — acompanhe a contagem.
          </p>
        </div>

        {ended ? (
          <p className="mt-14 text-center font-heading text-xl font-semibold text-primary">
            Novidades em atualização — volte em instantes.
          </p>
        ) : (
          <div className="mx-auto mt-12 w-full max-w-6xl lg:mt-16">
            <p id="novidades-timer-label" className="sr-only">
              Tempo restante: {summary}
            </p>
            {/* Mobile: carrossel com snap; desktop: grade */}
            <div
              className={cn(
                "flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-visible scroll-px-3 pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible md:grid-cols-4",
                "[&::-webkit-scrollbar]:hidden",
              )}
              role="timer"
              aria-labelledby="novidades-timer-label"
              aria-live="polite"
              aria-atomic="true"
            >
              {cells.map((cell, i) => (
                <motion.div
                  key={cell.label}
                  className={cn(
                    "relative flex min-h-[148px] min-w-[42%] shrink-0 snap-center snap-always flex-col items-center justify-center rounded-2xl border border-white/15 px-4 py-6 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:min-h-[168px] sm:min-w-0 sm:snap-align-none sm:px-5 sm:py-8",
                    "bg-gradient-to-b from-white/[0.12] to-white/[0.04] transition-all duration-500",
                    "hover:border-amber-400/35 hover:shadow-[0_28px_70px_-24px_rgba(245,158,11,0.22)]",
                  )}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.07 * i, duration: 0.55, ease: easeOut }}
                >
                  <span
                    className="font-heading text-[clamp(2.75rem,10vw,4.25rem)] font-bold tabular-nums leading-none tracking-tighter text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
                    suppressHydrationWarning
                  >
                    {cell.value}
                  </span>
                  <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/85 sm:text-xs">
                    {cell.label}
                  </span>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground/90 md:hidden" aria-hidden>
              Deslize para ver todos os valores
            </p>
          </div>
        )}
      </div>
    </motion.article>
  );
}

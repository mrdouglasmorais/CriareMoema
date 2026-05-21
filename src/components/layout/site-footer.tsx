"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { WhatsAppOfficialLogo } from "@/components/icons/whatsapp-official-logo";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock, ExternalLink, Mail, MapPin, Navigation } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.001" fill="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

// ─── Static cinematic background ─────────────────────────────────────────────

function FooterBackground() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Imagem principal com ken-burns sutil */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          src={brandImages.showcase2.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Overlay principal — deixa imagem levemente visível */}
      <div className="absolute inset-0 bg-[oklch(0.10_0.008_55)]/82" />

      {/* Gradiente direcional — escurece mais à esquerda (área de texto) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />

      {/* Gradiente vertical — fade superior e inferior */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Grain texture — sofisticação premium */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Glow âmbar — borda superior */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent 0%, rgba(245,158,11,0.35) 40%, rgba(245,158,11,0.35) 60%, transparent 100%)" }}
      />
      {/* Glow âmbar — halo superior */}
      <div
        className="absolute inset-x-0 top-0 h-72"
        style={{ background: "radial-gradient(ellipse 55% 100% at 30% 0%, rgba(245,158,11,0.07), transparent)" }}
      />
    </div>
  );
}

// ─── Animated tagline — continuous cycling manifesto ─────────────────────────

const TAGLINE_LINES = [
  { text: "Alto padrão", amber: false },
  { text: "não é adjetivo.", amber: false },
  { text: "É método.", amber: true },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.17, delayChildren: 0 },
  },
  exit: {
    transition: { staggerChildren: 0.09, staggerDirection: -1 as const },
  },
};

const lineVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.88, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: "-14%",
    opacity: 0,
    transition: { duration: 0.48, ease: [0.4, 0, 1, 1] },
  },
};

function AnimatedTagline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;

    const REVEAL_TIME = 1700;   // aguarda o reveal inicial terminar
    const SHOW_DURATION = 4000; // tempo que as linhas ficam visíveis
    const PAUSE_DURATION = 850; // pausa entre saída e nova entrada

    let showTimer: ReturnType<typeof setTimeout>;
    let pauseTimer: ReturnType<typeof setTimeout>;

    function runCycle() {
      showTimer = setTimeout(() => {
        setVisible(false);
        pauseTimer = setTimeout(() => {
          setCycleKey((k) => k + 1);
          setVisible(true);
          runCycle();
        }, PAUSE_DURATION);
      }, SHOW_DURATION);
    }

    const initial = setTimeout(runCycle, REVEAL_TIME);

    return () => {
      clearTimeout(initial);
      clearTimeout(showTimer);
      clearTimeout(pauseTimer);
    };
  }, [inView, reduce]);

  return (
    <div
      ref={ref}
      className="mt-10 sm:mt-12"
      aria-label={TAGLINE_LINES.map((l) => l.text).join(" ")}
    >
      {/* Label pré-tagline */}
      <motion.span
        className="mb-6 block font-heading text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-amber-500/60"
        initial={reduce ? false : { opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.05, duration: 0.6, ease: EASE }}
        aria-hidden
      >
        Manifesto Criare
      </motion.span>

      {/* Linha âmbar que cresce antes do texto */}
      <motion.span
        className="mb-7 block h-px origin-left bg-gradient-to-r from-amber-500/50 via-amber-400/25 to-transparent"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ delay: 0.18, duration: 0.9, ease: EASE }}
        style={{ transformOrigin: "left center" }}
        aria-hidden
      />

      {/* Linhas do manifesto — ciclo contínuo */}
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={cycleKey}
            variants={containerVariants}
            initial={reduce ? "visible" : "hidden"}
            animate="visible"
            exit={reduce ? {} : "exit"}
          >
            {TAGLINE_LINES.map((line, i) => (
              <div key={i} className="overflow-hidden leading-none">
                <motion.p
                  variants={lineVariants}
                  className="font-heading font-bold leading-[1.06] tracking-[-0.01em]"
                  style={{
                    fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
                    color: line.amber
                      ? "transparent"
                      : i === 0
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.72)",
                    ...(line.amber && {
                      backgroundImage:
                        "linear-gradient(105deg, #f59e0b 0%, #fbbf24 45%, #f59e0b 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                    }),
                  }}
                >
                  {line.text}
                </motion.p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shimmer âmbar — linha final */}
      <motion.span
        className="mt-8 block h-[1px] bg-gradient-to-r from-amber-500/40 via-amber-300/20 to-transparent"
        initial={{ width: 0 }}
        animate={inView ? { width: "clamp(120px, 30%, 320px)" } : {}}
        transition={{ delay: 1.1, duration: 1.4, ease: EASE }}
        aria-hidden
      />
    </div>
  );
}

// ─── Main footer ──────────────────────────────────────────────────────────────

export interface SiteFooterProps {
  className?: string;
  compact?: boolean;
}

export function SiteFooter({ className, compact = false }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative z-10 mt-auto flex flex-col overflow-hidden",
        !compact && "lg:snap-start lg:snap-always lg:scroll-mt-[var(--site-header-height)] lg:min-h-[100dvh]",
        compact && "min-h-fit",
        className,
      )}
      style={{ background: "oklch(0.10 0.008 55)" }}
    >
      {/* Background com imagem + overlays */}
      {!compact && <FooterBackground />}

      {/* Ambient top glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px z-10"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.28), transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 z-10"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(245,158,11,0.05), transparent)" }}
        aria-hidden
      />

      {/* ── Brand statement — expands to fill the upper area ─────────── */}
      <div className="relative z-20 flex flex-1 flex-col justify-end border-b border-white/[0.06] px-6 pb-14 pt-20 sm:px-10 sm:pb-16 sm:pt-24 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-7xl">

          {/* Logo */}
          <Link
            href="/"
            className="inline-flex focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <Image
              src={brandImages.logo.src}
              alt={`${siteConfig.name} — logotipo`}
              width={brandImages.logo.width}
              height={brandImages.logo.height}
              className="h-9 w-auto opacity-65 sm:h-10"
            />
          </Link>

          {/* Tagline — animated editorial */}
          <AnimatedTagline />

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-8 sm:mt-12">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link group"
            >
              <WhatsAppOfficialLogo className="size-3.5 shrink-0" aria-hidden />
              Solicitar diagnóstico gratuito
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/22 transition-colors duration-300 hover:text-white/55"
            >
              <InstagramIcon className="size-3.5" />
              @criaremoema
            </a>
          </div>
        </div>
      </div>

      {/* ── Info grid ─────────────────────────────────────────────────── */}
      <div className="relative z-20 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 xl:px-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Nav */}
          <nav aria-label="Mapa do site">
            <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">
              Navegar
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/" className="text-white/42 transition-colors duration-200 hover:text-white/75">
                  Início
                </Link>
              </li>
              {siteConfig.footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/42 transition-colors duration-200 hover:text-white/75"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Address */}
          <div>
            <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">
              Loja
            </h2>
            <address className="mt-5 space-y-4 not-italic">
              <p className="flex gap-3 text-sm leading-relaxed text-white/42">
                <MapPin className="mt-0.5 size-4 shrink-0 text-white/28" aria-hidden />
                <span>
                  <strong className="font-semibold text-white/65">{siteConfig.name}</strong>
                  <br />
                  <span className="block">{siteConfig.address.streetAddress}</span>
                  <span className="block">
                    {siteConfig.address.neighborhood} · {siteConfig.address.addressLocality}
                  </span>
                  <span className="mt-1 block text-white/25">CEP {siteConfig.address.postalCode}</span>
                </span>
              </p>
              <p className="flex items-center gap-3 text-sm">
                <Mail className="size-4 shrink-0 text-white/28" aria-hidden />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white/42 transition-colors hover:text-white/70"
                >
                  {siteConfig.email}
                </a>
              </p>
            </address>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={siteConfig.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/35 transition-all duration-200 hover:border-white/20 hover:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <Navigation className="size-3.5" aria-hidden />
                Waze
              </a>
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/35 transition-all duration-200 hover:border-white/20 hover:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <ExternalLink className="size-3.5" aria-hidden />
                Google Maps
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">
              Horário
            </h2>
            <div className="mt-5 flex gap-3 text-sm text-white/42">
              <Clock className="mt-0.5 size-4 shrink-0 text-white/28" aria-hidden />
              <ul className="space-y-2">
                {siteConfig.openingHoursLines.map((line) => (
                  <li key={line} className="leading-snug">{line}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Brand focus */}
          <div>
            <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">
              Sobre
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/38">
              {siteConfig.tagline} — móveis planejados de alto padrão em Moema, São Paulo.
            </p>
            <p className="mt-4 font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/20">
              {siteConfig.brandFocusLine}
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div
        className="relative z-20 border-t px-6 py-5 sm:px-10 lg:px-16 xl:px-24"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/20">
            © {year} {siteConfig.organization.legalName} — Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <p className="text-xs text-white/15">
              Cozinha · Closet · Dormitório · Home office · Moema · São Paulo
            </p>
            <Link href="/termos" className="text-xs text-white/22 transition-colors hover:text-white/50">
              Termos
            </Link>
            <Link href="/privacidade" className="text-xs text-white/22 transition-colors hover:text-white/50">
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

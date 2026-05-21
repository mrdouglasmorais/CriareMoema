"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Expand,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  catalogCategories,
  catalogImages,
  type CatalogCategory,
  type CatalogImage,
} from "@/data/catalog";

type ActiveCategory = CatalogCategory | "Todos";
const ALL_CATEGORIES: ActiveCategory[] = ["Todos", ...catalogCategories];
const EASE = [0.22, 1, 0.36, 1] as const;
const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZOOM_STEP = 0.6;
const DBL_SCALE = 2.8;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function IconXTwitter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Grid item ────────────────────────────────────────────────────────────────

interface GridItemProps {
  image: CatalogImage;
  onOpen: (img: CatalogImage) => void;
  index: number;
}

function GridItem({ image, onOpen, index }: GridItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      className="group relative mb-2 block w-full cursor-pointer overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
      onClick={() => onOpen(image)}
      aria-label={`Ampliar: ${image.alt}`}
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.04 }}
      whileHover={reduce ? undefined : { scale: 1.012 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.07]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent transition-all duration-400 group-hover:ring-amber-400/25" />

      <div className="absolute left-3 top-3 translate-y-2 opacity-0 transition-all duration-350 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="inline-flex items-center rounded-full border border-white/18 bg-black/60 px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 backdrop-blur-md">
          {image.category}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-350 group-hover:opacity-100">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 shadow-xl shadow-black/50 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
          <Expand className="size-4" aria-hidden />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 translate-y-1 p-3.5 opacity-0 transition-all duration-350 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="line-clamp-2 font-heading text-[11px] font-medium leading-relaxed text-white/60">
          {image.alt.split(" — ")[0]}
        </p>
      </div>
    </motion.button>
  );
}

// ─── Lightbox share panel ─────────────────────────────────────────────────────

interface SharePanelProps {
  imageUrl: string;
  onClose: () => void;
}

function SharePanel({ imageUrl, onClose }: SharePanelProps) {
  const [copied, setCopied] = useState(false);

  const networks = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: WhatsAppIcon,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(imageUrl)}`,
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: IconFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`,
    },
    {
      id: "twitter",
      label: "X",
      icon: IconXTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent("Confira este projeto:")}`,
    },
  ];

  async function copy() {
    await navigator.clipboard.writeText(imageUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-white/12 bg-background/95 shadow-2xl shadow-black/60"
      style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", transformOrigin: "top right" }}
      initial={{ opacity: 0, scale: 0.88, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -8 }}
      transition={{ duration: 0.25, ease: EASE }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="border-b border-white/[0.07] px-4 py-3">
        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.20em] text-white/30">
          Compartilhar imagem
        </p>
      </div>
      <div className="p-3 space-y-1">
        {networks.map((net) => (
          <a
            key={net.id}
            href={net.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.06]"
          >
            <net.icon className="size-4 text-white/35 transition-colors group-hover:text-white/65" />
            <span className="text-sm text-white/45 transition-colors group-hover:text-white/80">{net.label}</span>
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.06]"
        >
          {copied ? (
            <Check className="size-4 text-amber-400" />
          ) : (
            <Copy className="size-4 text-white/35 transition-colors group-hover:text-white/65" />
          )}
          <span className={cn("text-sm transition-colors", copied ? "text-amber-400/80" : "text-white/45 group-hover:text-white/80")}>
            {copied ? "Link copiado!" : "Copiar link"}
          </span>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
  image: CatalogImage;
  images: CatalogImage[];
  onClose: () => void;
  onNavigate: (img: CatalogImage) => void;
  direction: number;
}

function Lightbox({ image, images, onClose, onNavigate, direction }: LightboxProps) {
  const reduce = useReducedMotion();
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const currentIndex = images.findIndex((img) => img.id === image.id);
  const isZoomed = scale > MIN_SCALE;

  const pageUrl = typeof window !== "undefined"
    ? `${window.location.origin}/catalogo?foto=${image.id}`
    : `/catalogo?foto=${image.id}`;

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => { startTransition(() => { resetZoom(); setShareOpen(false); }); }, [image.id, resetZoom]);

  /* block scroll + hide site header */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-lightbox", "open");
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.removeAttribute("data-lightbox");
    };
  }, []);

  /* keyboard */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowRight") { onNavigate(images[(currentIndex + 1) % images.length]); return; }
      if (e.key === "ArrowLeft") { onNavigate(images[(currentIndex - 1 + images.length) % images.length]); return; }
      if (e.key === "+" || e.key === "=") { setScale((s) => clamp(s + ZOOM_STEP, MIN_SCALE, MAX_SCALE)); return; }
      if (e.key === "-") {
        setScale((s) => {
          const n = clamp(s - ZOOM_STEP, MIN_SCALE, MAX_SCALE);
          if (n <= MIN_SCALE) setOffset({ x: 0, y: 0 });
          return n;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, images, onClose, onNavigate]);

  /* scroll thumbnail into view */
  useEffect(() => {
    const el = thumbsRef.current?.children[currentIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [currentIndex]);

  function getMaxOffset() {
    if (!stageRef.current) return { x: 0, y: 0 };
    const { width, height } = stageRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, (width * (scale - 1)) / 2),
      y: Math.max(0, (height * (scale - 1)) / 2),
    };
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    setScale((s) => {
      const n = clamp(s * factor, MIN_SCALE, MAX_SCALE);
      if (n <= MIN_SCALE) setOffset({ x: 0, y: 0 });
      return n;
    });
  }

  function handleDoubleClick() {
    if (isZoomed) { resetZoom(); } else { setScale(DBL_SCALE); }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!isZoomed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPanning(true);
    panRef.current = { startX: e.clientX, startY: e.clientY, baseX: offset.x, baseY: offset.y };
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!panRef.current) return;
    const { x: maxX, y: maxY } = getMaxOffset();
    setOffset({
      x: clamp(panRef.current.baseX + (e.clientX - panRef.current.startX), -maxX, maxX),
      y: clamp(panRef.current.baseY + (e.clientY - panRef.current.startY), -maxY, maxY),
    });
  }

  function handlePointerUp() { panRef.current = null; setIsPanning(false); }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (isZoomed) return;
    if (info.offset.x < -80 || info.velocity.x < -500) {
      onNavigate(images[(currentIndex + 1) % images.length]);
    } else if (info.offset.x > 80 || info.velocity.x > 500) {
      onNavigate(images[(currentIndex - 1 + images.length) % images.length]);
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: reduce ? 0 : dir * 80, opacity: 0, scale: reduce ? 1 : 0.94 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: reduce ? 0 : -dir * 80, opacity: 0, scale: reduce ? 1 : 0.94 }),
  };

  const zoomOut = () => setScale((s) => { const n = clamp(s - ZOOM_STEP, MIN_SCALE, MAX_SCALE); if (n <= MIN_SCALE) setOffset({ x: 0, y: 0 }); return n; });
  const zoomIn = () => setScale((s) => clamp(s + ZOOM_STEP, MIN_SCALE, MAX_SCALE));
  const pct = Math.round(scale * 100);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "oklch(0.06 0 0 / 0.97)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria — ${image.alt}`}
    >
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 shrink-0 border-b border-white/[0.07] bg-white/[0.03] backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 sm:px-5">

          {/* Left: counter + category */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-heading text-[11px] font-semibold tabular-nums text-white/35">
              {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <span className="hidden h-3 w-px bg-white/12 sm:block" aria-hidden />
            <span className="hidden font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-white/28 sm:block">
              {image.category}
            </span>
          </div>

          {/* Center caption */}
          <p className="absolute left-1/2 max-w-[38%] -translate-x-1/2 truncate text-center font-heading text-[11px] font-medium text-white/25 max-lg:hidden">
            {image.alt.split(" — ")[0]}
          </p>

          {/* Right: controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Zoom pill */}
            <div className="flex items-center rounded-full border border-white/10 bg-white/[0.05] p-[3px]">
              <button
                type="button"
                onClick={zoomOut}
                disabled={scale <= MIN_SCALE}
                className="grid h-7 w-7 cursor-pointer place-items-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                aria-label="Diminuir zoom (−)"
              >
                <Minus className="size-3" aria-hidden />
              </button>

              <button
                type="button"
                onClick={resetZoom}
                disabled={!isZoomed}
                className="cursor-pointer min-w-[3.25rem] px-1 text-center font-heading text-[10px] font-semibold tabular-nums text-white/35 transition-colors hover:text-white/75 disabled:cursor-default disabled:pointer-events-none"
                aria-label="Resetar zoom"
              >
                {pct}%
              </button>

              <button
                type="button"
                onClick={zoomIn}
                disabled={scale >= MAX_SCALE}
                className="grid h-7 w-7 cursor-pointer place-items-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                aria-label="Aumentar zoom (+)"
              >
                <Plus className="size-3" aria-hidden />
              </button>
            </div>

            {/* Reset when zoomed */}
            <AnimatePresence>
              {isZoomed && (
                <motion.button
                  type="button"
                  onClick={resetZoom}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/10 text-white/35 transition-colors hover:border-white/20 hover:text-white/75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                  aria-label="Resetar zoom (R)"
                >
                  <RotateCcw className="size-3.5" aria-hidden />
                </motion.button>
              )}
            </AnimatePresence>

            <span className="h-5 w-px bg-white/10" aria-hidden />

            {/* Share */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShareOpen((v) => !v)}
                aria-expanded={shareOpen}
                aria-label="Compartilhar esta imagem"
                className={cn(
                  "grid h-8 w-8 cursor-pointer place-items-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                  shareOpen
                    ? "border-white/20 bg-white/8 text-white/75"
                    : "border-white/10 text-white/35 hover:border-white/20 hover:text-white/70",
                )}
              >
                <Share2 className="size-3.5" aria-hidden />
              </button>
              <AnimatePresence>
                {shareOpen && (
                  <SharePanel imageUrl={pageUrl} onClose={() => setShareOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/10 text-white/35 transition-colors hover:border-white/22 hover:text-white/75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
              aria-label="Fechar (Esc)"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* ── Stage ─────────────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        onClick={() => shareOpen && setShareOpen(false)}
      >

        {/* Prev */}
        <button
          type="button"
          onClick={() => onNavigate(images[(currentIndex - 1 + images.length) % images.length])}
          className="absolute left-3 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/50 shadow-xl shadow-black/40 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-black/60 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25 sm:left-5 sm:h-12 sm:w-12"
          aria-label="Foto anterior (←)"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>

        {/* Image stage */}
        <div
          ref={stageRef}
          className="relative h-full w-full select-none overflow-hidden"
          style={{
            cursor: isZoomed ? (isPanning ? "grabbing" : "grab") : "default",
            touchAction: isZoomed ? "none" : "auto",
          }}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={handleDoubleClick}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={image.id}
              className="absolute inset-0 flex items-center justify-center"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: EASE }}
              drag={!isZoomed ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
            >
              <div
                className="relative h-full w-full"
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                  transformOrigin: "center",
                  willChange: "transform",
                  transition: isPanning ? "none" : "transform 0.18s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  draggable={false}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile hint */}
          <AnimatePresence>
            {!isZoomed && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.7 }}
                className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/8 bg-black/50 px-3.5 py-1.5 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25 backdrop-blur-md sm:hidden"
              >
                Duplo toque para ampliar · Deslize para navegar
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => onNavigate(images[(currentIndex + 1) % images.length])}
          className="absolute right-3 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/50 shadow-xl shadow-black/40 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-black/60 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25 sm:right-5 sm:h-12 sm:w-12"
          aria-label="Próxima foto (→)"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>

      {/* ── Thumbnail strip ───────────────────────────────────────────────── */}
      <div className="shrink-0 border-t border-white/[0.07] bg-white/[0.025] backdrop-blur-xl">
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:px-5"
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
          role="listbox"
          aria-label="Miniaturas"
        >
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              role="option"
              aria-selected={img.id === image.id}
              onClick={() => onNavigate(img)}
              className={cn(
                "relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
                img.id === image.id
                  ? "scale-105 ring-1 ring-white/50 ring-offset-1 ring-offset-black/60 opacity-100"
                  : "opacity-28 hover:opacity-55",
              )}
              aria-label={`Foto ${i + 1}${img.id === image.id ? " (atual)" : ""}`}
            >
              <Image src={img.src} alt="" fill className="object-cover" sizes="56px" aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function CatalogGallery() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("Todos");
  const [selected, setSelected] = useState<CatalogImage | null>(null);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { startTransition(() => setMounted(true)); }, []);

  const filtered =
    activeCategory === "Todos"
      ? catalogImages
      : catalogImages.filter((img) => img.category === activeCategory);

  /* restore image from URL on mount */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fotoId = params.get("foto");
    if (fotoId) {
      const img = catalogImages.find((i) => i.id === fotoId);
      if (img) {
        startTransition(() => {
          setActiveCategory(img.category);
          setSelected(img);
        });
      }
    }
  }, []);

  function openImage(image: CatalogImage) {
    setDirection(0);
    setSelected(image);
    window.history.pushState({}, "", `/catalogo?foto=${image.id}`);
  }

  function closeImage() {
    setSelected(null);
    window.history.pushState({}, "", "/catalogo");
  }

  function navigateTo(image: CatalogImage) {
    if (!selected) return;
    const cur = filtered.findIndex((img) => img.id === selected.id);
    const nxt = filtered.findIndex((img) => img.id === image.id);
    setDirection(nxt >= cur ? 1 : -1);
    setSelected(image);
    window.history.replaceState({}, "", `/catalogo?foto=${image.id}`);
  }

  return (
    <>
      {/* ── Category filters ── */}
      <LayoutGroup>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
          {ALL_CATEGORIES.map((cat) => {
            const count =
              cat === "Todos"
                ? catalogImages.length
                : catalogImages.filter((img) => img.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                className={cn(
                  "relative shrink-0 cursor-pointer overflow-hidden rounded-full px-4 py-2 font-heading text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-350 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                  isActive
                    ? "border border-amber-500/35 bg-amber-500/8 text-amber-400/85"
                    : "border border-white/10 bg-transparent text-white/35 hover:border-white/18 hover:text-white/65",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    aria-hidden
                  />
                )}
                <span className="relative inline-flex items-center gap-1.5">
                  {cat}
                  <span className={cn("tabular-nums text-[10px]", isActive ? "text-amber-400/55" : "text-white/20")}>
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* ── Masonry grid ── */}
      <motion.div
        key={activeCategory}
        className="mt-8 columns-2 gap-2 sm:columns-3 lg:columns-4 xl:columns-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {filtered.map((image, i) => (
          <div key={image.id} className="break-inside-avoid">
            <GridItem image={image} onOpen={openImage} index={i} />
          </div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center text-white/30">
          <p className="font-heading text-lg font-semibold">Nenhuma imagem nesta categoria</p>
        </div>
      )}

      {/* ── Lightbox — rendered in portal to escape overflow:clip ancestors ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {selected && (
            <Lightbox
              image={selected}
              images={filtered}
              onClose={closeImage}
              onNavigate={navigateTo}
              direction={direction}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

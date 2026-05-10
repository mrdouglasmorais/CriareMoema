"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Minus, Plus, RotateCcw, X } from "lucide-react";
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
      className="group relative mb-2 block w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
      onClick={() => onOpen(image)}
      aria-label={`Ampliar: ${image.alt}`}
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.04 }}
      whileHover={reduce ? undefined : { scale: 1.012 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
    >
      {/* Imagem */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.07]"
      />

      {/* Overlay hover — gradiente premium */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

      {/* Borda vitral no hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-400 group-hover:ring-amber-400/30" />

      {/* Badge de categoria — aparece no hover */}
      <div className="absolute left-3 top-3 translate-y-2 opacity-0 transition-all duration-350 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-black/60 px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300 backdrop-blur-md">
          {image.category}
        </span>
      </div>

      {/* Expand icon — centro */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-350 group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white shadow-xl shadow-black/50 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
          <Expand className="size-5" aria-hidden />
        </div>
      </div>

      {/* Caption bottom */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1 p-3.5 opacity-0 transition-all duration-350 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="line-clamp-2 font-heading text-[11px] font-medium leading-relaxed text-white/70">
          {image.alt.split(" — ")[0]}
        </p>
      </div>
    </motion.button>
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
  const stageRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(
    null,
  );
  const thumbsRef = useRef<HTMLDivElement>(null);
  const currentIndex = images.findIndex((img) => img.id === image.id);
  const isZoomed = scale > MIN_SCALE;

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetZoom();
  }, [image.id, resetZoom]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowRight") { onNavigate(images[(currentIndex + 1) % images.length]); return; }
      if (e.key === "ArrowLeft") { onNavigate(images[(currentIndex - 1 + images.length) % images.length]); return; }
      if (e.key === "+" || e.key === "=") { setScale((s) => clamp(s + ZOOM_STEP, MIN_SCALE, MAX_SCALE)); return; }
      if (e.key === "-") { setScale((s) => { const n = clamp(s - ZOOM_STEP, MIN_SCALE, MAX_SCALE); if (n <= MIN_SCALE) setOffset({ x: 0, y: 0 }); return n; }); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, images, onClose, onNavigate]);

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

  function handlePointerUp() {
    panRef.current = null;
    setIsPanning(false);
  }

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
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria — ${image.alt}`}
    >
      {/* ── Top bar — liquid glass ──────────────────────────────────────── */}
      <div className="relative z-10 shrink-0 border-b border-white/8 bg-white/4 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">

          {/* Counter + category */}
          <div className="flex items-center gap-3">
            <span className="font-heading text-[11px] font-semibold tabular-nums text-white/40">
              {currentIndex + 1}/{images.length}
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden />
            <span className="hidden font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-400/60 sm:block">
              {image.category}
            </span>
          </div>

          {/* Caption — center */}
          <p className="absolute left-1/2 max-w-[40%] -translate-x-1/2 truncate text-center font-heading text-[11px] font-medium text-white/30 max-lg:hidden">
            {image.alt.split(" — ")[0]}
          </p>

          {/* Controls right */}
          <div className="flex items-center gap-2">
            {/* Zoom pill */}
            <div className="flex items-center rounded-full border border-white/12 bg-white/6 p-[3px] backdrop-blur-sm">
              <button
                type="button"
                onClick={zoomOut}
                disabled={scale <= MIN_SCALE}
                className="grid h-7 w-7 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
                aria-label="Diminuir zoom"
              >
                <Minus className="size-3" aria-hidden />
              </button>

              <button
                type="button"
                onClick={resetZoom}
                disabled={!isZoomed}
                className="min-w-[3.5rem] px-1 text-center font-heading text-[10px] font-semibold tabular-nums text-white/40 transition-colors hover:text-white disabled:pointer-events-none"
                aria-label="Resetar zoom"
                title="Resetar zoom"
              >
                {pct}%
              </button>

              <button
                type="button"
                onClick={zoomIn}
                disabled={scale >= MAX_SCALE}
                className="grid h-7 w-7 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
                aria-label="Aumentar zoom"
              >
                <Plus className="size-3" aria-hidden />
              </button>
            </div>

            {/* Divider */}
            <span className="h-5 w-px bg-white/12" aria-hidden />

            {/* Reset zoom */}
            {isZoomed && (
              <button
                type="button"
                onClick={resetZoom}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/12 text-white/45 transition-colors hover:border-amber-400/40 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
                aria-label="Resetar zoom (R)"
              >
                <RotateCcw className="size-3.5" aria-hidden />
              </button>
            )}

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/12 text-white/45 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
              aria-label="Fechar (Esc)"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* ── Stage ─────────────────────────────────────────────────────────── */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">

        {/* Prev button */}
        <button
          type="button"
          onClick={() => onNavigate(images[(currentIndex - 1 + images.length) % images.length])}
          className="absolute left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/40 text-white/60 shadow-xl shadow-black/40 backdrop-blur-xl transition-all duration-200 hover:border-white/35 hover:bg-black/65 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 sm:left-6 sm:h-14 sm:w-14"
          aria-label="Foto anterior (←)"
        >
          <ChevronLeft className="size-5 sm:size-6" aria-hidden />
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
              transition={{ duration: 0.35, ease: EASE }}
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

          {/* Hint mobile */}
          <AnimatePresence>
            {!isZoomed && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-3.5 py-1.5 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30 backdrop-blur-md sm:hidden"
              >
                Duplo toque para ampliar · Deslize para navegar
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => onNavigate(images[(currentIndex + 1) % images.length])}
          className="absolute right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/40 text-white/60 shadow-xl shadow-black/40 backdrop-blur-xl transition-all duration-200 hover:border-white/35 hover:bg-black/65 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 sm:right-6 sm:h-14 sm:w-14"
          aria-label="Próxima foto (→)"
        >
          <ChevronRight className="size-5 sm:size-6" aria-hidden />
        </button>
      </div>

      {/* ── Thumbnail strip ───────────────────────────────────────────────── */}
      <div className="shrink-0 border-t border-white/8 bg-white/3 backdrop-blur-xl">
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:px-6"
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
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
                img.id === image.id
                  ? "scale-105 ring-2 ring-amber-400 ring-offset-1 ring-offset-black/60 opacity-100"
                  : "opacity-30 hover:opacity-60 hover:scale-102",
              )}
              aria-label={`Foto ${i + 1}${img.id === image.id ? " (atual)" : ""}`}
            >
              <Image src={img.src} alt="" fill className="object-cover" sizes="64px" aria-hidden />
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

  const filtered =
    activeCategory === "Todos"
      ? catalogImages
      : catalogImages.filter((img) => img.category === activeCategory);

  function openImage(image: CatalogImage) {
    setDirection(0);
    setSelected(image);
  }

  function closeImage() {
    setSelected(null);
  }

  function navigateTo(image: CatalogImage) {
    if (!selected) return;
    const cur = filtered.findIndex((img) => img.id === selected.id);
    const nxt = filtered.findIndex((img) => img.id === image.id);
    setDirection(nxt >= cur ? 1 : -1);
    setSelected(image);
  }

  return (
    <>
      {/* ── Category filter ── */}
      <LayoutGroup>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar por categoria"
        >
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
                  "relative shrink-0 overflow-hidden rounded-full px-4 py-2 font-heading text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
                  isActive
                    ? "text-stone-950 shadow-md shadow-amber-500/25"
                    : "border border-border/50 bg-transparent text-muted-foreground hover:border-amber-500/30 hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 bg-gradient-to-b from-amber-300 to-amber-400"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    aria-hidden
                  />
                )}
                <span className="relative inline-flex items-center gap-1.5">
                  {cat}
                  <span
                    className={cn(
                      "tabular-nums text-[10px]",
                      isActive ? "text-stone-800/70" : "text-muted-foreground/60",
                    )}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* ── Masonry grid — full-width, sem container ── */}
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

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
          <p className="font-heading text-lg font-semibold">Nenhuma imagem nesta categoria</p>
        </div>
      )}

      {/* ── Lightbox ── */}
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
      </AnimatePresence>
    </>
  );
}

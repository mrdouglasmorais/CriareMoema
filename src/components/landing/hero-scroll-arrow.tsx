"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, type MouseEvent } from "react";

const TARGET_SECTION_ID = "ambientes";

export interface HeroScrollArrowProps {
  className?: string;
}

export function HeroScrollArrow({ className }: HeroScrollArrowProps) {
  const reduce = useReducedMotion();

  const scrollToNext = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const el = document.getElementById(TARGET_SECTION_ID);
      if (!el) return;
      // Desativa scroll-snap temporariamente para não bloquear scrollIntoView
      const html = document.documentElement;
      const prev = html.style.scrollSnapType;
      html.style.scrollSnapType = "none";
      el.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
      setTimeout(() => {
        html.style.scrollSnapType = prev;
      }, 900);
    },
    [reduce],
  );

  return (
    <motion.div
      className={cn(
        "pointer-events-auto absolute bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-10",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={scrollToNext}
        className="group flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-label="Ir para a próxima seção: ambientes"
      >
        <span className="font-heading text-[11px] font-medium uppercase tracking-[0.38em] text-stone-300/85 sm:text-xs sm:tracking-[0.42em]">
          Explorar
        </span>
        <span
          className="relative flex h-14 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-500 group-hover:border-amber-400/35 group-hover:shadow-[0_12px_40px_-10px_rgba(245,158,11,0.25)] sm:h-16 sm:w-11"
          aria-hidden
        >
          <span className="absolute inset-x-3 top-2 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          <motion.span
            className="flex flex-col items-center text-amber-300/95"
            animate={reduce ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="size-5 sm:size-6" strokeWidth={2.2} />
          </motion.span>
        </span>
        <span className="mt-2 h-8 w-px bg-gradient-to-b from-amber-500/50 to-transparent opacity-80 transition-opacity duration-500 group-hover:from-amber-400 group-hover:opacity-100" />
      </button>
    </motion.div>
  );
}

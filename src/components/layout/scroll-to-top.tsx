"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const SHOW_AFTER = 380;

export interface ScrollToTopProps {
  className?: string;
}

export function ScrollToTop({ className }: ScrollToTopProps) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    const { pathname, search } = window.location;
    window.history.replaceState(null, "", `${pathname}${search}#top`);
    requestAnimationFrame(() => {
      document.getElementById("top")?.focus({ preventScroll: true });
    });
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, x: -16, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -12, scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "group fixed z-[85] flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-background/75 text-foreground shadow-lg shadow-black/30 backdrop-blur-xl transition-all duration-500 hover:border-white/22 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "bottom-[max(2rem,env(safe-area-inset-bottom,0px))] left-[max(1.25rem,env(safe-area-inset-left,0px))] sm:bottom-8 sm:left-5 lg:bottom-12 lg:left-8 lg:h-14 lg:w-14",
            className,
          )}
          onClick={goTop}
          aria-label="Voltar ao topo da página"
        >
          <ChevronUp className="size-5 text-white/38 transition-colors duration-400 group-hover:text-white/70 lg:size-5" strokeWidth={1.5} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

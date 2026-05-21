"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WhatsAppOfficialLogo } from "@/components/icons/whatsapp-official-logo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export interface WhatsAppFabProps {
  className?: string;
}

export function WhatsAppFab({ className }: WhatsAppFabProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "fixed z-100",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6",
        className,
      )}
    >
      {/* Pulse rings */}
      {!reduce && (
        <>
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full border border-white/18"
            animate={{ scale: [1, 1.7], opacity: [0.45, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 0 }}
            aria-hidden
          />
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full border border-white/10"
            animate={{ scale: [1, 1.7], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 0.8 }}
            aria-hidden
          />
        </>
      )}

      <motion.a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={reduce ? undefined : { scale: 1.08 }}
        whileTap={reduce ? undefined : { scale: 0.93 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-background/82 p-3.5 text-white/55 shadow-xl shadow-black/40 backdrop-blur-xl transition-colors duration-500 hover:border-white/24 hover:text-white/88 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Abrir conversa no WhatsApp"
      >
        <WhatsAppOfficialLogo className="size-full shrink-0" />
      </motion.a>
    </div>
  );
}

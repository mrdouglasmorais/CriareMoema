"use client";

import { WhatsAppOfficialLogo } from "@/components/icons/whatsapp-official-logo";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Share2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { startTransition, useCallback, useEffect, useState } from "react";

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

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

interface Network {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  getUrl: (url: string) => string;
}

const NETWORKS: Network[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    shortLabel: "WhatsApp",
    icon: WhatsAppOfficialLogo,
    getUrl: (url) => `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    shortLabel: "Facebook",
    icon: IconFacebook,
    getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    shortLabel: "Twitter",
    icon: IconXTwitter,
    getUrl: (url) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Confira:")}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    shortLabel: "LinkedIn",
    icon: IconLinkedIn,
    getUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring", stiffness: 340, damping: 30 } as const;

export function FloatingSocialShare() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  const pageUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}`
      : pathname;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* silent */
    }
  }, [pageUrl]);

  useEffect(() => {
    startTransition(() => setOpen(false));
  }, [pathname]);

  /* bloqueia scroll quando o painel está aberto */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Backdrop blur ────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[88] touch-none"
            style={{ backdropFilter: "blur(14px) brightness(0.55)", WebkitBackdropFilter: "blur(14px) brightness(0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* ── Bottom-right anchor — visível apenas em sm+, stacked above WhatsApp FAB ── */}
      <div
        className="fixed z-[105] hidden flex-col items-end gap-3 sm:flex"
        style={{
          bottom: "calc(max(1.25rem, env(safe-area-inset-bottom, 0px)) + 4rem)",
          right: "max(1.25rem, env(safe-area-inset-right, 1.25rem))",
        }}
        aria-label="Compartilhar esta página"
      >

        {/* ── Share panel ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              className="w-[min(22rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-white/12 bg-background/95 shadow-2xl shadow-black/60"
              style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", transformOrigin: "right bottom" }}
              initial={reduce ? {} : { opacity: 0, scale: 0.82, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, scale: 0.82, y: 16 }}
              transition={reduce ? {} : SPRING}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                  Compartilhar página
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-300 hover:border-white/20 hover:text-white/65 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              </div>

              {/* Networks grid */}
              <div className="grid grid-cols-5 gap-3 p-5">
                {NETWORKS.map((net, i) => {
                  const Icon = net.icon;
                  return (
                    <motion.a
                      key={net.id}
                      href={net.getUrl(pageUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Compartilhar no ${net.label}`}
                      title={net.label}
                      initial={reduce ? {} : { opacity: 0, y: 14, scale: 0.75 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.05 + i * 0.055, duration: 0.45, ease: EASE }}
                      className="group flex flex-col items-center gap-2 focus-visible:outline-none"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-all duration-400 group-hover:border-white/22 group-hover:bg-white/[0.09] group-focus-visible:ring-1 group-focus-visible:ring-white/30">
                        <Icon className="size-5 text-white/38 transition-colors duration-400 group-hover:text-white/78" aria-hidden />
                      </span>
                      <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.10em] text-white/22 transition-colors duration-300 group-hover:text-white/50">
                        {net.shortLabel}
                      </span>
                    </motion.a>
                  );
                })}

                {/* Copy link */}
                <motion.button
                  type="button"
                  onClick={copyLink}
                  aria-label="Copiar link da página"
                  title="Copiar link"
                  initial={reduce ? {} : { opacity: 0, y: 14, scale: 0.75 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.05 + NETWORKS.length * 0.055, duration: 0.45, ease: EASE }}
                  className="group flex flex-col items-center gap-2 focus-visible:outline-none"
                >
                  <span className={[
                    "flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-400",
                    copied
                      ? "border-amber-500/35 bg-amber-500/8"
                      : "border-white/10 bg-white/[0.05] group-hover:border-white/22 group-hover:bg-white/[0.09]",
                  ].join(" ")}>
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                          <Check className="size-5 text-amber-400" aria-hidden />
                        </motion.span>
                      ) : (
                        <motion.span key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                          <Copy className="size-5 text-white/38 transition-colors duration-400 group-hover:text-white/78" aria-hidden />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className={[
                    "font-heading text-[9px] font-semibold uppercase tracking-[0.10em] transition-colors duration-300",
                    copied ? "text-amber-400/70" : "text-white/22 group-hover:text-white/50",
                  ].join(" ")}>
                    {copied ? "Copiado" : "Link"}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Toggle button ────────────────────────────────────────────── */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar compartilhamento" : "Compartilhar página"}
          animate={reduce ? {} : { scale: open ? 1.14 : 1 }}
          whileHover={reduce ? {} : { scale: open ? 1.14 : 1.07 }}
          whileTap={reduce ? {} : { scale: 0.9 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={[
            "flex h-12 w-12 items-center justify-center rounded-full shadow-xl shadow-black/45 transition-all duration-500",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            open
              ? "border border-white/22 bg-background/95"
              : "border border-white/12 bg-background/82 hover:border-white/22 hover:bg-background/92",
          ].join(" ")}
          style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                <X className="size-[17px] text-white/55" aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="share"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                <Share2 className="size-[17px] text-white/38" aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

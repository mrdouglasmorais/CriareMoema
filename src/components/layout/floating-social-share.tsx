"use client";

import { WhatsAppOfficialLogo } from "@/components/icons/whatsapp-official-logo";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Share2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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
  icon: React.ElementType;
  iconClass?: string;
  getUrl: (url: string) => string;
}

const NETWORKS: Network[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: WhatsAppOfficialLogo,
    iconClass: "text-[#25D366]",
    getUrl: (url) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: IconFacebook,
    iconClass: "text-[#1877f2]",
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    icon: IconXTwitter,
    iconClass: "text-foreground/85",
    getUrl: (url) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Confira:")}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: IconLinkedIn,
    iconClass: "text-[#0a66c2]",
    getUrl: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

export function FloatingSocialShare() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const pageUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}`
      : pathname;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent */
    }
  }, [pageUrl]);

  /* fecha ao clicar fora */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* fecha ao navegar */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const EASE = [0.22, 1, 0.36, 1] as const;

  function itemAnimate(i: number) {
    return {
      initial: reduce ? {} : { opacity: 0, x: 24, scale: 0.85 },
      animate: reduce ? {} : { opacity: 1, x: 0, scale: 1 },
      exit: reduce ? {} : { opacity: 0, x: 20, scale: 0.88 },
      transition: reduce
        ? {}
        : { delay: i * 0.055, duration: 0.3, ease: EASE },
    };
  }

  return (
    <div
      ref={ref}
      className="fixed right-0 top-1/2 z-[88] -translate-y-1/2"
      aria-label="Compartilhar esta página"
    >
      <div className="flex flex-col items-end gap-2 pr-3 sm:pr-4">

        {/* Rede sociais — surgem acima do botão principal */}
        <AnimatePresence>
          {open && (
            <motion.div className="flex flex-col items-end gap-2">
              {NETWORKS.map((net, i) => {
                const Icon = net.icon;
                const href = net.getUrl(pageUrl);
                const anim = itemAnimate(i);
                return (
                  <motion.a
                    key={net.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Compartilhar no ${net.label}`}
                    initial={anim.initial}
                    animate={anim.animate}
                    exit={anim.exit}
                    transition={anim.transition}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-background/80 shadow-lg shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:-translate-x-0.5 hover:border-amber-500/30 hover:shadow-amber-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
                    title={net.label}
                  >
                    <Icon
                      className={`size-[18px] shrink-0 transition-transform duration-200 group-hover:scale-110 ${net.iconClass ?? "text-foreground/80"}`}
                      aria-hidden
                    />
                  </motion.a>
                );
              })}

              {/* Copiar link */}
              {(() => {
                const anim = itemAnimate(NETWORKS.length);
                return (
                <motion.button
                  type="button"
                  aria-label="Copiar link da página"
                  initial={anim.initial}
                  animate={anim.animate}
                  exit={anim.exit}
                  transition={anim.transition}
                  onClick={copyLink}
                  title="Copiar link"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-background/80 shadow-lg shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:-translate-x-0.5 hover:border-amber-500/30 hover:shadow-amber-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
                >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="size-[18px] text-amber-400" aria-hidden />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Copy
                        className="size-[18px] shrink-0 text-foreground/70 transition-transform duration-200 group-hover:scale-110 group-hover:text-amber-400"
                        aria-hidden
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão principal — toggle */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu de compartilhamento" : "Compartilhar esta página"}
          whileHover={reduce ? {} : { scale: 1.06 }}
          whileTap={reduce ? {} : { scale: 0.94 }}
          className={[
            "relative flex h-11 w-11 items-center justify-center rounded-full shadow-lg shadow-black/40 backdrop-blur-xl transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            open
              ? "border border-amber-500/50 bg-amber-500/15 shadow-amber-500/20"
              : "border border-white/15 bg-background/80 hover:border-amber-500/35 hover:bg-amber-500/8",
          ].join(" ")}
        >
          {/* Anel âmbar pulsante quando aberto */}
          <AnimatePresence>
            {open && (
              <motion.span
                key="ring"
                className="absolute inset-0 rounded-full border border-amber-500/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.5, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <X className="size-[18px] text-amber-400" aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="share"
                initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <Share2 className="size-[18px] text-foreground/80" aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

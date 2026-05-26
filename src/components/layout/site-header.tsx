"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export interface SiteHeaderProps {
  className?: string;
}

const nav = [
  { href: "/", label: "Home" },
  { href: "/ambientes", label: "Ambientes" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/para-profissionais", label: "Para Profissionais" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#localizacao", label: "Localização" },
] as const;

function isActive(href: string, pathname: string): boolean {
  if (href.startsWith("/#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteHeader({ className }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    startTransition(() => setMenuOpen(false));
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full",
        "bg-background/50 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/35",
        "border-b border-white/[0.06]",
        className,
      )}
    >
      <div className="pt-[env(safe-area-inset-top,0px)]">
        <div className="mx-auto flex h-[var(--site-header-inner)] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">

          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image
              src={brandImages.logo.src}
              alt={`${siteConfig.name} — logotipo`}
              width={brandImages.logo.width}
              height={brandImages.logo.height}
              className="h-8 w-auto sm:h-9 lg:h-10"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Seções da página"
            className="hidden min-w-0 flex-1 items-center justify-end lg:flex"
          >
            <ul className="flex items-center gap-x-0.5">
              {nav.map((item) => {
                const active = isActive(item.href, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-4 py-2.5 font-heading text-[0.7rem] font-500 uppercase tracking-[0.18em] transition-colors duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                        active
                          ? "text-white/90"
                          : "text-white/35 hover:text-white/75",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-3 -bottom-px h-px rounded-full bg-amber-400/70"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          aria-hidden
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg text-white/40 transition-colors hover:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <X className="size-5" aria-hidden />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <Menu className="size-5" aria-hidden />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              key="backdrop"
              type="button"
              className="fixed inset-x-0 top-[var(--site-header-height)] bottom-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden"
              aria-hidden
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id={menuId}
              className="fixed inset-x-0 top-[var(--site-header-height)] z-[60] overflow-y-auto border-b border-white/[0.06] bg-background/90 px-5 py-6 shadow-2xl shadow-black/50 backdrop-blur-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navegação"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <ul className="flex flex-col pb-[env(safe-area-inset-bottom,0px)]">
                {nav.map((item, i) => {
                  const active = isActive(item.href, pathname);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, delay: i * 0.035, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-4 py-4 font-heading text-xs font-600 uppercase tracking-[0.2em] transition-colors border-b border-white/[0.05] last:border-0",
                          active
                            ? "text-white/90"
                            : "text-white/30 hover:text-white/70",
                        )}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {active && (
                          <span className="h-px w-6 shrink-0 bg-amber-400/70" aria-hidden />
                        )}
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

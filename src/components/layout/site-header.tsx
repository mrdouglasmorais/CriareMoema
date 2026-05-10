"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export interface SiteHeaderProps {
  className?: string;
}

const nav = [
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
    setMenuOpen(false);
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
        "bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/55",
        "dark:bg-background/60 dark:supports-[backdrop-filter]:bg-background/45",
        "border-b border-transparent",
        "[border-image:linear-gradient(90deg,transparent_0%,rgba(245,158,11,0.35)_30%,rgba(139,92,246,0.25)_60%,transparent_100%)_1]",
        className,
      )}
    >
      <div className="pt-[env(safe-area-inset-top,0px)]">
        <div className="mx-auto flex h-[var(--site-header-inner)] max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image
              src={brandImages.logo.src}
              alt={`${siteConfig.name} — logotipo`}
              width={brandImages.logo.width}
              height={brandImages.logo.height}
              className="h-9 w-auto sm:h-11 lg:h-14"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Seções da página"
            className="hidden min-w-0 flex-1 items-center justify-end font-heading lg:flex"
          >
            <ul className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1 sm:gap-x-2">
              {nav.map((item) => {
                const active = isActive(item.href, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative rounded-md px-2.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 sm:text-sm",
                        active
                          ? "text-amber-400"
                          : "text-muted-foreground hover:text-amber-400",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                      {/* Indicador animado abaixo do link ativo */}
                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-1.5 -bottom-[1px] h-[2px] rounded-full bg-amber-400"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          aria-hidden
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Theme toggle */}
          <ThemeToggle className="shrink-0" />

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
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

      {/* Mobile menu — AnimatePresence */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              key="backdrop"
              type="button"
              className="fixed inset-x-0 top-[var(--site-header-height)] bottom-0 z-[55] bg-black/55 backdrop-blur-[2px] lg:hidden"
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
              className="fixed inset-x-0 top-[var(--site-header-height)] z-[60] max-h-[min(70vh,28rem)] overflow-y-auto border-b border-border/30 bg-background/90 px-4 py-4 shadow-2xl shadow-black/40 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/75 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navegação"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <ul className="flex flex-col gap-1 pb-[env(safe-area-inset-bottom,0px)]">
                {nav.map((item, i) => {
                  const active = isActive(item.href, pathname);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold uppercase tracking-[0.14em] transition-colors",
                          active
                            ? "bg-amber-500/10 text-amber-400"
                            : "text-foreground hover:bg-muted/50 active:bg-muted/70",
                        )}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {active && (
                          <span className="h-4 w-[2px] shrink-0 rounded-full bg-amber-400" aria-hidden />
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

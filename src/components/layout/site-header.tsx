"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export interface SiteHeaderProps {
  className?: string;
}

const nav = [
  { href: "/#novidades", label: "Novidades" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#localizacao", label: "Localização" },
] as const;

export function SiteHeader({ className }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

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
        "fixed inset-x-0 top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65",
        className,
      )}
    >
      <div className="pt-[env(safe-area-inset-top,0px)]">
        <div className="mx-auto flex h-[var(--site-header-inner)] max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMenuOpen(false)}
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

          <nav
            aria-label="Seções da página"
            className="hidden min-w-0 flex-1 items-center justify-end font-heading lg:flex"
          >
            <ul className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1 sm:gap-x-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-2.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-all duration-500 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-x-0 top-[var(--site-header-height)] bottom-0 z-[55] bg-black/55 backdrop-blur-[2px] lg:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
          />
          <div
            id={menuId}
            className="fixed inset-x-0 top-[var(--site-header-height)] z-[60] max-h-[min(70vh,28rem)] overflow-y-auto border-b border-border/40 bg-background/98 px-4 py-4 shadow-2xl shadow-black/40 supports-[backdrop-filter]:bg-background/92 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navegação"
          >
            <ul className="flex flex-col gap-1 pb-[env(safe-area-inset-bottom,0px)]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-3.5 text-base font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-muted/50 active:bg-muted/70"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </header>
  );
}

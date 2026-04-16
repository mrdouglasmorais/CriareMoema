import Image from "next/image";
import Link from "next/link";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Clock, Mail, MapPin, Navigation } from "lucide-react";

export interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();

  const addressLines = [
    siteConfig.address.streetAddress,
    `${siteConfig.address.neighborhood} · ${siteConfig.address.addressLocality} — ${siteConfig.address.addressRegion}`,
    `CEP ${siteConfig.address.postalCode}`,
  ] as const;

  return (
    <footer
      className={cn(
        "relative z-10 mt-auto lg:snap-start lg:snap-always lg:scroll-mt-[var(--site-header-height)] lg:min-h-[min(100dvh,900px)] lg:flex lg:flex-col lg:justify-end",
        className,
      )}
    >
      <div
        className={cn(
          "border-t border-border/50 bg-muted/20",
          "-mt-[min(14rem,32svh)] pt-[min(14rem,32svh)]",
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="grid gap-12 border-b border-border/30 pb-12 lg:grid-cols-12 lg:gap-10 lg:pb-14">
            <div className="space-y-4 lg:col-span-4">
              <Link
                href="/"
                className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Image
                  src={brandImages.logo.src}
                  alt={`${siteConfig.name} — logotipo`}
                  width={brandImages.logo.width}
                  height={brandImages.logo.height}
                  className="h-10 w-auto opacity-95 sm:h-11"
                />
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {siteConfig.tagline} — {siteConfig.description}
              </p>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-500/85">
                {siteConfig.brandFocusLine}
              </p>
            </div>

            <nav
              className="lg:col-span-2"
              aria-label="Mapa do site"
            >
              <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
                Navegar
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground transition-colors duration-300 hover:text-amber-400/95"
                  >
                    Início
                  </Link>
                </li>
                {siteConfig.footerQuickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition-colors duration-300 hover:text-amber-400/95"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
                Loja
              </h2>
              <address className="mt-4 space-y-3 not-italic">
                <p className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <MapPin
                    className="mt-0.5 size-5 shrink-0 text-amber-500/90"
                    aria-hidden
                  />
                  <span>
                    <span className="font-semibold text-foreground">{siteConfig.name}</span>
                    <br />
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
                <p className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 shrink-0 text-amber-500/80" aria-hidden />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-amber-400/95 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </address>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={siteConfig.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/25 bg-background/40 px-3 py-2 text-xs font-semibold text-foreground/90 transition-all duration-300 hover:border-amber-500/45 hover:bg-amber-950/25"
                >
                  <Navigation className="size-3.5 text-amber-500" aria-hidden />
                  Waze
                </a>
                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-xs font-semibold text-foreground/90 transition-all duration-300 hover:border-amber-500/35 hover:bg-muted/40"
                >
                  Google Maps
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-xs font-semibold text-foreground/90 transition-all duration-300 hover:border-amber-500/35 hover:bg-muted/40"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
                Horário
              </h2>
              <div className="mt-4 flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <Clock className="mt-0.5 size-5 shrink-0 text-amber-500/90" aria-hidden />
                <ul className="list-none space-y-1.5">
                  {siteConfig.openingHoursLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 rounded-xl border border-dashed border-amber-500/20 bg-amber-950/15 px-3 py-2.5 text-xs leading-relaxed text-amber-200/85">
                Estacionamento no local. Atendimento com foco em Moema e Grande São Paulo.
              </p>
            </div>
          </div>

          <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground/90 sm:text-sm">
            Loja de móveis planejados · Cozinha planejada · Quarto planejado · Closet · Home office ·
            Móveis sob medida · Moema · São Paulo
          </p>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/35 pt-8 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
            <p>
              © {year} {siteConfig.organization.legalName} — Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-end">
              <Link href="#" className="transition-colors hover:text-foreground">
                Termos de uso
              </Link>
              <Link href="#" className="transition-colors hover:text-foreground">
                Políticas de privacidade
              </Link>
              <Link href="#" className="transition-colors hover:text-foreground">
                Políticas de cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

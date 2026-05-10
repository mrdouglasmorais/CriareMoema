import Image from "next/image";
import Link from "next/link";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Clock, ExternalLink, Mail, MapPin, Navigation } from "lucide-react";

/** Instagram SVG — Lucide não inclui redes sociais */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.001" fill="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export interface SiteFooterProps {
  className?: string;
  /**
   * Quando true, remove min-height de viewport e classes de snap —
   * adequado para páginas que não são a landing (404, erro, privacidade, etc.).
   */
  compact?: boolean;
}

export function SiteFooter({ className, compact = false }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative z-10 mt-auto lg:flex lg:flex-col lg:justify-end",
        !compact && "lg:snap-start lg:snap-always lg:scroll-mt-[var(--site-header-height)] lg:min-h-[min(100dvh,900px)]",
        className,
      )}
      style={{ background: "oklch(0.10 0.008 55)" }}
    >
      {/* Ambient top glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.3), transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(245,158,11,0.06), transparent)" }}
        aria-hidden
      />

      <div className={cn("-mt-[min(14rem,32svh)] pt-[min(14rem,32svh)]")}>
        <div className="w-full px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24">

          {/* ── Main grid ─────────────────────────────── */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">

            {/* Brand column */}
            <div className="space-y-6 lg:col-span-4">
              <Link
                href="/"
                className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <Image
                  src={brandImages.logo.src}
                  alt={`${siteConfig.name} — logotipo`}
                  width={brandImages.logo.width}
                  height={brandImages.logo.height}
                  className="h-10 w-auto opacity-90 sm:h-11"
                />
              </Link>

              <p className="max-w-xs text-sm leading-relaxed text-white/45">
                {siteConfig.tagline} — móveis planejados de alto padrão em Moema, São Paulo.
              </p>

              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-500/70">
                {siteConfig.brandFocusLine}
              </p>

              {/* Instagram — card dedicado */}
              <div className="pt-2">
                <p className="mb-3 font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                  Redes Sociais
                </p>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit max-w-[220px] items-center gap-3 rounded-2xl border border-white/10 px-3.5 py-3 transition-all duration-300 hover:border-[#E1306C]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E1306C]/50"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "linear-gradient(135deg, rgba(131,58,180,0.12) 0%, rgba(193,53,132,0.10) 50%, rgba(253,29,29,0.08) 100%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  {/* Instagram gradient icon container */}
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #833ab4 0%, #c13584 40%, #fd1d1d 70%, #fcb045 100%)",
                    }}
                  >
                    <InstagramIcon className="size-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white/85 transition-colors duration-300 group-hover:text-white">
                      @criaremoema
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-white/25 transition-all duration-300 group-hover:text-[#E1306C]/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </div>

            {/* Nav column */}
            <nav className="lg:col-span-2" aria-label="Mapa do site">
              <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                Navegar
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-white/50 transition-colors duration-200 hover:text-amber-400"
                  >
                    Início
                  </Link>
                </li>
                {siteConfig.footerQuickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/50 transition-colors duration-200 hover:text-amber-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Address column */}
            <div className="lg:col-span-3">
              <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                Loja
              </h2>
              <address className="mt-5 space-y-4 not-italic">
                <p className="flex gap-3 text-sm leading-relaxed text-white/50">
                  <MapPin className="mt-0.5 size-4.5 shrink-0 text-amber-500/80" aria-hidden />
                  <span>
                    <span className="font-semibold text-white/80">{siteConfig.name}</span>
                    <br />
                    <span className="block">{siteConfig.address.streetAddress}</span>
                    <span className="block">
                      {siteConfig.address.neighborhood} · {siteConfig.address.addressLocality} — {siteConfig.address.addressRegion}
                    </span>
                    <span className="block">CEP {siteConfig.address.postalCode}</span>
                  </span>
                </p>
                <p className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 shrink-0 text-amber-500/70" aria-hidden />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-white/50 underline-offset-4 transition-colors hover:text-amber-400 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </address>

              {/* Map links — Waze & Google Maps only */}
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={siteConfig.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/22 px-3 py-2 text-xs font-semibold text-amber-400/80 transition-all duration-200 hover:border-amber-500/45 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
                  style={{ background: "rgba(245,158,11,0.07)" }}
                >
                  <Navigation className="size-3.5" aria-hidden />
                  Waze
                </a>
                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/45 transition-all duration-200 hover:border-white/20 hover:text-white/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <ExternalLink className="size-3.5" aria-hidden />
                  Google Maps
                </a>
              </div>
            </div>

            {/* Hours column */}
            <div className="lg:col-span-3">
              <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                Horário de Atendimento
              </h2>
              <div className="mt-5 flex gap-3 text-sm text-white/50">
                <Clock className="mt-0.5 size-4.5 shrink-0 text-amber-500/80" aria-hidden />
                <ul className="list-none space-y-2">
                  {siteConfig.openingHoursLines.map((line) => (
                    <li key={line} className="leading-snug">{line}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* ── SEO keyword strip ─────────────────────── */}
          <div
            className="mt-12 border-t pt-8"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <p className="text-center text-xs leading-relaxed text-white/20">
              Loja de móveis planejados · Cozinha planejada · Quarto planejado · Closet · Home office ·
              Móveis sob medida · Moema · São Paulo
            </p>
          </div>

          {/* ── Bottom bar ────────────────────────────── */}
          <div
            className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-6 text-center sm:flex-row sm:text-left"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <p className="text-xs text-white/25">
              © {year} {siteConfig.organization.legalName} — Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-end">
              <Link
                href="/termos"
                className="text-xs text-white/30 transition-colors hover:text-white/60"
              >
                Termos de uso
              </Link>
              <Link
                href="/privacidade"
                className="text-xs text-white/30 transition-colors hover:text-white/60"
              >
                Política de privacidade
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

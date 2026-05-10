import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { FooterWrapper } from "@/components/layout/footer-wrapper";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SnapManager } from "@/components/layout/snap-manager";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ThemeScript } from "@/components/layout/theme-script";
import { Analytics } from "@/components/analytics/analytics";
import { FloatingSocialShare } from "@/components/layout/floating-social-share";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { JsonLd } from "@/components/seo/json-ld";
import { rootMetadata, rootViewport } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = rootMetadata;
export { rootViewport as viewport };

const orgId = `${siteConfig.url}#organization`;
const websiteId = `${siteConfig.url}#website`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": orgId,
  name: siteConfig.name,
  legalName: siteConfig.organization.legalName,
  url: siteConfig.url,
  logo: new URL(siteConfig.organization.logoPath, siteConfig.url).toString(),
  email: siteConfig.email,
  sameAs: [...siteConfig.sameAs],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.language,
  publisher: { "@id": orgId },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
      lang={siteConfig.language}
      className={`${syne.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline antes da hidratação — evita flash de tema errado (FOUC) */}
        <ThemeScript />
        <Analytics />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <ThemeProvider>
        <SnapManager />
        <div className="relative flex min-h-full flex-col">
          {/*
           * Ambient mesh background — cinematográfico.
           * Dark: orbs âmbar + violeta profundo criam profundidade.
           * Light: orbs quentes suaves, sem escurecer.
           */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700"
          >
            {/* Dark mode mesh */}
            <div className="absolute inset-0 dark:block hidden bg-[radial-gradient(ellipse_90%_65%_at_15%_-10%,rgba(245,158,11,0.22),transparent_55%),radial-gradient(ellipse_70%_55%_at_88%_15%,rgba(139,92,246,0.18),transparent_50%),radial-gradient(ellipse_80%_60%_at_5%_80%,rgba(6,78,59,0.15),transparent_55%),radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(9,9,11,0.98),transparent)]" />
            {/* Light mode mesh */}
            <div className="absolute inset-0 dark:hidden block bg-[radial-gradient(ellipse_80%_60%_at_15%_-15%,rgba(245,158,11,0.1),transparent_55%),radial-gradient(ellipse_60%_50%_at_88%_10%,rgba(139,92,246,0.06),transparent_50%),radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(245,240,235,0.98),transparent)]" />
          </div>
          <SiteHeader />
          <div className="flex flex-1 flex-col pt-[var(--site-header-height)]">
            <span id="top" className="sr-only" tabIndex={-1}>
              Topo da página
            </span>
            {children}
            <FooterWrapper />
          </div>
          <WhatsAppFab />
          <FloatingSocialShare />
          <ScrollToTop />
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

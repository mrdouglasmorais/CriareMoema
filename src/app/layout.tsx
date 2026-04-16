import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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
      data-landing-snap
      className={`dark ${syne.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <div className="relative flex min-h-full flex-col">
          <div
            className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-25%,rgba(217,119,6,0.12),transparent_50%),radial-gradient(ellipse_90%_60%_at_100%_0%,rgba(120,53,15,0.15),transparent_55%),radial-gradient(ellipse_80%_50%_at_0%_100%,rgba(41,37,36,0.9),transparent_45%)]"
            aria-hidden
          />
          <SiteHeader />
          <div className="flex flex-1 flex-col pt-[var(--site-header-height)]">
            <span id="top" className="sr-only" tabIndex={-1}>
              Topo da página
            </span>
            {children}
            <SiteFooter />
          </div>
          <WhatsAppFab />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}

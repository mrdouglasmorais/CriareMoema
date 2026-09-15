import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { SnapManager } from "@/components/layout/snap-manager";
import { ThemeScript } from "@/components/layout/theme-script";
import { Analytics } from "@/components/analytics/analytics";
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
      className={`${syne.variable} ${dmSans.variable} dark h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Garante dark class antes da hidratação — sem FOUC */}
        <ThemeScript />
        {/*
          Desabilita o scroll restoration nativo do browser antes da hidratação.
          Sem isso, o browser pode restaurar a posição salva de uma visita anterior
          (ex.: usuário havia rolado até a seção de endereço) ao recarregar a página.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if("scrollRestoration"in history){history.scrollRestoration="manual"}window.scrollTo(0,0)`,
          }}
        />
        <Analytics />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <SnapManager />
        <div className="relative flex min-h-full flex-col">
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}

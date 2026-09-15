"use client";

import { usePathname } from "next/navigation";
import { FloatingSocialShare } from "@/components/layout/floating-social-share";
import { FooterWrapper } from "@/components/layout/footer-wrapper";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_15%_-10%,rgba(245,158,11,0.22),transparent_55%),radial-gradient(ellipse_70%_55%_at_88%_15%,rgba(139,92,246,0.18),transparent_50%),radial-gradient(ellipse_80%_60%_at_5%_80%,rgba(6,78,59,0.15),transparent_55%),radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(9,9,11,0.98),transparent)]" />
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
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Wrapper client que decide se o footer usa altura de viewport completa (snap da landing)
 * ou altura compacta (todas as outras páginas).
 *
 * Por quê: SiteFooter é Server Component — não pode ler pathname.
 * Este wrapper é mínimo ("use client" só para usePathname), mantendo o footer estático.
 */
export function FooterWrapper() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return <SiteFooter compact={!isLanding} />;
}

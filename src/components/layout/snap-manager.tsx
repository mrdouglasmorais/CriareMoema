"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Gerencia o atributo `data-landing-snap` no <html>.
 * Scroll-snap fullpage (y mandatory) só faz sentido na landing ("/"),
 * onde todas as seções têm `snap-start`. Em outras páginas, remover o
 * atributo evita pulos erráticos causados por snap points isolados.
 *
 * Estratégia idêntica ao ThemeScript/ThemeProvider: mínimo JS no cliente,
 * sem rerender do Server Component pai.
 */
export function SnapManager() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    if (pathname === "/") {
      html.setAttribute("data-landing-snap", "");
    } else {
      html.removeAttribute("data-landing-snap");
    }
  }, [pathname]);

  return null;
}

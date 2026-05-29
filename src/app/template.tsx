"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

/**
 * template.tsx — remonta a cada navegação de rota (ao contrário de layout.tsx que persiste).
 *
 * O useEffect desabilita o scroll restoration nativo do browser e força o scroll
 * ao topo imediatamente. Sem isso, o browser restaura a posição salva da visita
 * anterior (ex.: usuário estava na seção de endereço) ao voltar para a página.
 *
 * `behavior: "instant"` evita que o scroll-smooth do CSS faça a rolagem visível.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

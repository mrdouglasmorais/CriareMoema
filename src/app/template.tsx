"use client";

import { motion } from "framer-motion";

/**
 * template.tsx — renderiza um componente NOVO a cada navegação de rota.
 * Ao contrário de layout.tsx (que persiste), template cria uma instância nova,
 * permitindo que o Framer Motion anime a entrada de cada página individualmente.
 */
export default function Template({ children }: { children: React.ReactNode }) {
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

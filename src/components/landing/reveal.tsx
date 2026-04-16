"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Deslocamento vertical inicial (px) */
  y?: number;
  /** Blur inicial (px) — 0 desativa */
  blur?: number;
}

export function Reveal({ children, className, delay = 0, y = 40, blur = 10 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: blur ? `blur(${blur}px)` : "none" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px", amount: 0.2 }}
      transition={{ duration: 0.75, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function Stagger({ children, className, stagger = 0.08 }: StaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? {} : { opacity: 0, y: 24, scale: 0.98 },
        show: reduce ? {} : { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export interface ScaleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Zoom suave + fade — ideal para imagens e cards. */
export function ScaleReveal({ children, className, delay = 0 }: ScaleRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

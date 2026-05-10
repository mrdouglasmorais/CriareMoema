"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { LeadForm } from "@/components/forms/lead-form";
import { Reveal } from "@/components/landing/reveal";
import { landingSection } from "@/components/landing/section-styles";
import { WhatsAppOfficialLogo } from "@/components/icons/whatsapp-official-logo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export interface CtaSectionProps {
  className?: string;
  /**
   * Quando true, desativa o fullpage snap e o min-height de viewport.
   * Use em páginas fora da landing (ex.: /ambientes, /blog).
   */
  compact?: boolean;
}

const BENEFITS = [
  {
    text: "Atendimento personalizado com arquiteto",
    detail: "Do briefing à entrega",
  },
  {
    text: "Projeto executivo sem custo adicional",
    detail: "Incluído no orçamento",
  },
  {
    text: "Parcelamento em até 36×",
    detail: "Condições facilitadas",
  },
  {
    text: "5 anos de garantia após instalação",
    detail: "Tranquilidade total",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function BenefitsStack() {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <ul ref={ref} className="flex flex-col gap-2.5">
      {BENEFITS.map((item, i) => (
        <motion.li
          key={item.text}
          initial={{ y: 56 + i * 12, opacity: 0, scale: 0.94 }}
          animate={
            isInView
              ? { y: 0, opacity: 1, scale: 1 }
              : { y: 56 + i * 12, opacity: 0, scale: 0.94 }
          }
          transition={{
            duration: 0.65,
            delay: i * 0.11,
            ease: EASE,
          }}
          style={{ zIndex: BENEFITS.length - i, position: "relative" }}
          className="vitral-card group flex items-center gap-4 px-5 py-4"
        >
          {/* Number */}
          <span
            className="shrink-0 font-heading text-[11px] font-bold tabular-nums text-amber-500/50 group-hover:text-amber-400/70 transition-colors duration-300"
            aria-hidden
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* Icon */}
          <CheckCircle
            className="size-5 shrink-0 text-amber-400 transition-transform duration-300 group-hover:scale-110"
            aria-hidden
          />

          {/* Text */}
          <div className="flex flex-1 flex-col gap-0.5 min-w-0">
            <span className="text-sm font-semibold leading-snug text-white/90">
              {item.text}
            </span>
            <span className="text-[11px] leading-none text-white/35">
              {item.detail}
            </span>
          </div>

          {/* Amber accent line — cresce no hover */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-r-full bg-amber-500/0 group-hover:bg-amber-500/70 transition-all duration-300 group-hover:h-[60%] h-0"
            aria-hidden
          />
        </motion.li>
      ))}
    </ul>
  );
}

export function CtaSection({ className, compact = false }: CtaSectionProps) {
  return (
    <section
      id="contato"
      className={cn(
        compact
          ? "border-t border-white/8 py-16 sm:py-20"
          : landingSection(),
        "relative overflow-hidden",
        className,
      )}
      aria-labelledby="cta-heading"
      style={{ background: "oklch(0.11 0.008 55)" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 110%, rgba(245,158,11,0.13), transparent 62%), radial-gradient(ellipse 50% 40% at 80% 0%, rgba(139,92,246,0.07), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Left: copy */}
          <Reveal className="space-y-8">
            <div className="space-y-4">
              <p className="label-eyebrow">{siteConfig.brandFocusLine}</p>
              <h2
                id="cta-heading"
                className="font-heading font-bold text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1 }}
              >
                Pronto para transformar{" "}
                <span className="text-gradient-amber">seus ambientes?</span>
              </h2>
              <p className="text-base leading-relaxed text-white/55 sm:text-lg">
                Solicite um diagnóstico gratuito com um dos nossos especialistas. Em minutos,
                entendemos seu espaço, suas necessidades e apresentamos as melhores soluções
                em móveis planejados sob medida.
              </p>
            </div>

            {/* Benefits — stack cinematográfico */}
            <BenefitsStack />

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-medium text-white/30">ou prefere falar direto?</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* WhatsApp CTA */}
            <Link
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2.5 rounded-2xl border border-[#25D366]/35 bg-[#1a2e22] px-6 py-3.5 text-sm font-semibold text-[#4ade80] transition-all duration-300 hover:border-[#25D366]/60 hover:bg-[#1f3628] hover:text-[#86efac] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
            >
              <WhatsAppOfficialLogo className="size-4 shrink-0" aria-hidden />
              Conversar diretamente no WhatsApp
            </Link>
          </Reveal>

          {/* Right: form — vitral cinematográfico */}
          <Reveal delay={0.1}>
            <div className="vitral-card vitral-shimmer overflow-hidden">
              <div className="p-6 sm:p-8">
                <p className="mb-1 label-eyebrow">diagnóstico gratuito</p>
                <p className="mb-6 font-heading text-xl font-bold text-white sm:text-2xl">
                  Converse com um especialista
                </p>
                <LeadForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

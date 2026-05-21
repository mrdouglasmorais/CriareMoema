import Link from "next/link";
import { Reveal } from "@/components/landing/reveal";
import { landingSection } from "@/components/landing/section-styles";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const recursos = [
  "Catálogos técnicos em PDF de alta resolução",
  "Blocos 3D para AutoCAD e SketchUp",
  "Consultor dedicado com prioridade de agenda",
  "Trend reports exclusivos em design de interiores",
] as const;

export function ParaProfissionaisTeaser() {
  return (
    <section
      id="para-profissionais"
      className={cn(landingSection(), "!p-0 overflow-hidden")}
      aria-labelledby="profissionais-heading"
    >
      {/* Layout split — imagem 55% | texto 45% */}
      <div className="flex flex-col lg:flex-row lg:min-h-[calc(100dvh-var(--site-header-height))]">

        {/* ── Vídeo — 55% do espaço em desktop ──────────────────────── */}
        <div className="relative h-[55svh] w-full shrink-0 overflow-hidden lg:h-auto lg:w-[55%]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <iframe
              src="https://www.youtube.com/embed/CDmyBzAO1a4?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&fs=0&iv_load_policy=3&disablekb=1&playlist=CDmyBzAO1a4"
              allow="autoplay; encrypted-media"
              title="Fundo vídeo — Para Profissionais"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "max(100%, calc(177.78 * 1vh))",
                height: "max(100%, calc(56.25 * 1vw))",
                transform: "translate(-50%, -50%)",
                filter: "brightness(0.85) saturate(0.90) contrast(1.04)",
              }}
            />
          </div>
          {/* Overlay gradient para integrar com o texto em mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/80" />

          {/* Número de seção — posicionado na imagem */}
          <div className="absolute left-8 top-8 z-10 sm:left-10 lg:left-12">
            <span className="section-tag text-white/40">05 — Profissionais</span>
          </div>
        </div>

        {/* ── Texto — 45% do espaço em desktop ──────────────────────── */}
        <Reveal
          delay={0.1}
          y={24}
          blur={0}
          className="flex flex-1 flex-col justify-center px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20 xl:px-20"
        >
          <p className="label-eyebrow mb-5 text-amber-400/55">
            Para Arquitetos e Designers
          </p>

          <h2
            id="profissionais-heading"
            className="font-heading font-bold"
          >
            Você projeta.{" "}
            <br className="hidden lg:block" />
            <span className="text-gradient-amber">Nós executamos.</span>
          </h2>

          <p className="mt-6 max-w-sm text-base leading-relaxed text-white/40">
            Suporte técnico completo do briefing à entrega —
            com a precisão que preserva a sua assinatura.
          </p>

          {/* Recursos — lista mínima */}
          <ul className="mt-10 space-y-5 border-t border-white/[0.07] pt-10">
            {recursos.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 text-sm leading-relaxed text-white/40"
              >
                <span
                  className="mt-[0.55em] h-px w-5 shrink-0 bg-amber-500/40"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-8">
            <Link
              href="/para-profissionais"
              className={cn(
                "inline-flex h-11 items-center gap-2.5 rounded-xl px-6 sm:h-12 sm:px-7",
                "font-heading text-[0.78rem] font-semibold uppercase tracking-[0.06em]",
                "border border-amber-500/28 bg-amber-500/7 text-amber-400/78",
                "transition-all duration-400 hover:border-amber-500/45 hover:bg-amber-500/12 hover:text-amber-400/96",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/40",
              )}
            >
              Acessar portal
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </Link>

            <Link href="/para-profissionais" className="editorial-link group self-center">
              Saiba mais
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Reveal } from "@/components/landing/reveal";
import { AmbientesCarousel } from "@/components/sections/ambientes-carousel";
import { ArrowRight } from "lucide-react";

export function AmbientesGrid() {
  return (
    <>
      {/* Cabeçalho — dentro do container */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="label-eyebrow">Móveis Planejados · Moema · São Paulo</p>

          <h2
            id="ambientes-heading"
            className="mt-4 font-heading font-bold"
          >
            Cada cômodo,{" "}
            <span className="text-gradient-amber">um projeto único.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Do briefing à instalação — marcenaria sob medida com acabamento de alto padrão,
            execução fiel ao projeto e garantia de 5 anos.
          </p>

          {/* Estatísticas de credibilidade */}
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
            {[
              { value: "+2.000", label: "projetos entregues" },
              { value: "5 anos", label: "de garantia" },
              { value: "100%", label: "fiel ao projeto" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Carrossel — full-width, sem container */}
      <div className="mt-10">
        <AmbientesCarousel />
      </div>

      {/* CTA secundário */}
      <Reveal delay={0.2} className="mt-6 flex justify-center">
        <Link
          href="/ambientes"
          className="inline-flex items-center gap-2 rounded-xl border border-foreground/20 bg-transparent px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-muted/50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Ver todos os ambientes
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Reveal>
    </>
  );
}

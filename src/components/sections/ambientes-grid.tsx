import Link from "next/link";
import { Reveal } from "@/components/landing/reveal";
import { AmbientesCarousel } from "@/components/sections/ambientes-carousel";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "+2.000", label: "projetos entregues" },
  { value: "5 anos", label: "de garantia" },
  { value: "100%", label: "fiel ao projeto" },
] as const;

export function AmbientesGrid() {
  return (
    <>
      {/* Carousel full-viewport — elemento primário da seção */}
      <AmbientesCarousel />

      {/* Strip de stats + CTA — strip horizontal abaixo do carousel */}
      <Reveal
        y={20}
        blur={0}
        className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.06] py-10">
          {/* Stats editoriais */}
          <div className="flex flex-wrap gap-x-10 gap-y-5">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="font-heading text-xl font-bold tracking-tight text-white/85 sm:text-2xl">
                  {stat.value}
                </span>
                <span className="font-heading text-[0.65rem] font-500 uppercase tracking-[0.16em] text-white/28">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA editorial — alinhado à direita */}
          <Link href="/ambientes" className="editorial-link group shrink-0">
            Ver todos os ambientes
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </Reveal>
    </>
  );
}

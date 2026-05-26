import { Reveal, Stagger, StaggerItem } from "@/components/landing/reveal";
import { landingSection } from "@/components/landing/section-styles";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: "t1",
    name: "Fernanda Oliveira",
    neighborhood: "Moema, SP",
    text: "O processo foi muito tranquilo do início ao fim. O arquiteto entendeu exatamente o que eu queria, e o resultado ficou incrível. Cozinha e home office planejados com perfeição.",
  },
  {
    id: "t2",
    name: "Ricardo e Camila",
    neighborhood: "Ibirapuera, SP",
    text: "Nossa reforma estava emperrada por meses. A Criare Moema resolveu tudo com organização e prazo cumprido. O dormitório e o closet ficaram ainda melhores do que esperávamos.",
  },
  {
    id: "t3",
    name: "Marcelo Tavares",
    neighborhood: "Vila Olímpia, SP",
    text: "Primeira vez que faço um projeto planejado e não me arrependo. A qualidade dos materiais e o acabamento são de altíssimo padrão. Atendimento diferenciado do começo ao fim.",
  },
] as const;

const badges = [
  { value: "5 anos", label: "de garantia" },
] as const;

export interface TestimonialsSectionProps {
  className?: string;
}

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  return (
    <section
      id="depoimentos"
      className={cn(
        landingSection(),
        "bg-muted/10 max-lg:bg-muted/18",
        className,
      )}
      aria-labelledby="depoimentos-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Cabeçalho editorial */}
        <Reveal>
          <span className="section-tag">06 — Depoimentos</span>
          <h2
            id="depoimentos-heading"
            className="mt-5 font-heading font-bold"
          >
            O que nossos clientes dizem
          </h2>
        </Reveal>

        {/* Quotes — 3 colunas editoriais, sem card boxes */}
        <Stagger className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-3">
          {testimonials.map((item, i) => (
            <StaggerItem key={item.id}>
              <figure className="flex h-full flex-col">
                {/* Número decorativo */}
                <span
                  className="mb-6 block font-heading text-[0.65rem] font-600 tabular-nums tracking-[0.22em] text-white/15"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Citação — texto grande editorial */}
                <blockquote className="flex-1 border-t border-white/[0.07] pt-6">
                  <p
                    className="font-heading leading-[1.55] text-white/65"
                    style={{ fontSize: "clamp(1rem, 1.4vw + 0.2rem, 1.125rem)" }}
                  >
                    &ldquo;{item.text}&rdquo;
                  </p>
                </blockquote>

                {/* Autor */}
                <figcaption className="mt-8">
                  <p className="font-heading text-sm font-semibold text-white/75">
                    {item.name}
                  </p>
                  <p className="mt-0.5 font-heading text-[0.68rem] font-500 uppercase tracking-[0.16em] text-white/25">
                    {item.neighborhood}
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Badges de credibilidade — strip horizontal abaixo das quotes */}
        <Reveal delay={0.15} className="mt-20">
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-white/[0.06] pt-10">
            <p className="font-heading text-[0.68rem] font-500 uppercase tracking-[0.20em] text-white/20">
              {siteConfig.brandFocusLine}
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {badges.map((badge) => (
                <div key={badge.label} className="flex flex-col gap-0.5">
                  <span className="font-heading text-2xl font-bold text-amber-400/80 lg:text-3xl">
                    {badge.value}
                  </span>
                  <span className="font-heading text-[0.65rem] font-500 uppercase tracking-[0.14em] text-white/25">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

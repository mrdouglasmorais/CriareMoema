import Image from "next/image";
import { ScaleReveal, Stagger, StaggerItem, Reveal } from "@/components/landing/reveal";
import { landingSection } from "@/components/landing/section-styles";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "t1",
    name: "Fernanda Oliveira",
    neighborhood: "Moema, SP",
    stars: 5,
    text: "O processo foi muito tranquilo do início ao fim. O arquiteto entendeu exatamente o que eu queria, e o resultado ficou incrível. Cozinha e home office planejados com perfeição.",
  },
  {
    id: "t2",
    name: "Ricardo e Camila",
    neighborhood: "Ibirapuera, SP",
    stars: 5,
    text: "Nossa reforma estava emperrada por meses. A Criare Moema resolveu tudo com organização e prazo cumprido. O dormitório e o closet ficaram ainda melhores do que esperávamos.",
  },
  {
    id: "t3",
    name: "Marcelo Tavares",
    neighborhood: "Vila Olímpia, SP",
    stars: 5,
    text: "Primeira vez que faço um projeto planejado e não me arrependo. A qualidade dos materiais e o acabamento são de altíssimo padrão. Atendimento diferenciado do começo ao fim.",
  },
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
        "relative overflow-hidden bg-muted/15 max-lg:bg-muted/25",
        className,
      )}
      aria-labelledby="depoimentos-heading"
    >
      {/* Background image with overlay */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={brandImages.depoimentos.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/85" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="label-eyebrow">
            {siteConfig.brandFocusLine}
          </p>
          <h2
            id="depoimentos-heading"
            className="mt-3 font-heading font-bold"
          >
            O que nossos clientes dizem
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Mais de 15 anos transformando lares em Moema e Grande São Paulo com projetos 
            planejados sob medida.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item.id}>
              <figure className="vitral-card vitral-shimmer group flex h-full flex-col gap-5 p-6 transition-all duration-500 hover:-translate-y-1">
                {/* Stars */}
                <div className="flex gap-1" aria-label={`${item.stars} de 5 estrelas`}>
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1">
                  <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <figcaption>
                  <p className="font-heading text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.neighborhood}</p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Trust badges */}
        <Reveal delay={0.15} className="mt-14 flex flex-wrap items-center justify-center gap-8">
          {[
            { value: "15+", label: "anos no mercado" },
            { value: "5.000+", label: "projetos entregues" },
            { value: "5 anos", label: "de garantia" },
            { value: "36x", label: "sem juros" },
          ].map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-1 text-center">
              <span className="font-heading text-3xl font-bold text-amber-400 lg:text-4xl">
                {badge.value}
              </span>
              <span className="text-xs text-muted-foreground">{badge.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

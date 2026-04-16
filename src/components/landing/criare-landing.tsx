import Image from "next/image";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { NovidadesCountdown } from "@/components/landing/novidades-countdown";
import { Reveal, ScaleReveal, Stagger, StaggerItem } from "@/components/landing/reveal";
import { landingSection } from "@/components/landing/section-styles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Check, Clock, MapPin, Navigation } from "lucide-react";

const benefits = [
  "Processo organizado do briefing à instalação",
  "Maior fábrica de móveis da América Latina",
  "Flexibilidade financeira, até 36x",
  "Personalização de alto padrão com ótimo custo-benefício",
  "5 anos de garantia após instalação",
  "Projeto personalizado junto ao arquiteto",
] as const;

const diferenciaisList = [
  "Processo organizado do briefing à instalação.",
  "Maior fábrica de móveis planejados da América Latina.",
  "Flexibilidade financeira, com parcelamento em até 36x e possibilidade de 90 dias para o primeiro pagamento.",
  "5 anos de garantia após a instalação.",
  "Projeto personalizado junto ao arquiteto.",
  "Personalização de alto padrão com ótimo custo-benefício.",
] as const;

export function CriareLanding() {
  return (
    <main id="conteudo-principal" className="min-w-0 overflow-x-clip">
      <HeroSection />

      <section
        id="novidades"
        className={cn(landingSection(), "relative overflow-hidden bg-muted/5")}
        aria-labelledby="novidades-heading"
      >
        <div className="mx-auto w-full max-w-[min(100%,88rem)] px-3 sm:px-6">
          <h2 id="novidades-heading" className="sr-only">
            Contagem regressiva para novidades
          </h2>
          <NovidadesCountdown />
        </div>
      </section>

      <section
        id="ambientes"
        className={cn(landingSection(), "bg-muted/20")}
        aria-labelledby="ambientes-heading"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:items-center sm:px-6">
          <ScaleReveal>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-white/5 transition-all duration-700 hover:ring-amber-500/25">
              <Image
                src={brandImages.ambientes.src}
                alt="Ambientes planejados Criare: cozinha, sala e dormitório em alto padrão."
                width={brandImages.ambientes.width}
                height={brandImages.ambientes.height}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </ScaleReveal>
          <Reveal delay={0.08}>
            <div>
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-amber-500/90">
                {siteConfig.brandFocusLine}
              </p>
              <h2
                id="ambientes-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl"
              >
                Conheça de perto a excelência e qualidade da Criare.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Cozinha • Sala • Lavanderia • Dormitório • Closet • Lavabo • Home Office
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="beneficios"
        className={landingSection()}
        aria-labelledby="beneficios-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-amber-500/90">
              {siteConfig.brandFocusLine}
            </p>
            <h2
              id="beneficios-heading"
              className="mt-3 font-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Por que escolher a <span className="text-primary">Criare Moema</span>?
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((text) => (
              <StaggerItem key={text}>
                <div className="group flex h-full gap-3 rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur transition-all duration-500 hover:border-amber-500/35 hover:bg-card/80 hover:shadow-lg hover:shadow-amber-950/20">
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-amber-500 transition-transform duration-500 group-hover:scale-110"
                    aria-hidden
                  />
                  <span className="text-sm font-medium leading-relaxed text-foreground/90">{text}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section
        id="quem-somos"
        className={cn(landingSection(), "bg-muted/15")}
        aria-labelledby="quem-somos-heading"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:items-start sm:px-6">
          <Reveal delay={0.05} className="order-2 space-y-5 sm:order-1">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-amber-500/90">
              {siteConfig.brandFocusLine}
            </p>
            <h2
              id="quem-somos-heading"
              className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Quem somos
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Na Criare Moema, nós desenhamos e entregamos projetos planejados sob medida{" "}
              <strong className="font-semibold text-foreground">
                para quem não aceita improviso na execução.
              </strong>
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Foco em aproveitamento inteligente de espaço, estética consistente e instalação fiel ao
              projeto. Alta tecnologia no processo fabril, garantindo qualidade em cada detalhe.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Sempre começamos pelo que importa: rotina, medidas, circulação e prioridades do seu dia
              a dia. A partir disso, o projeto evolui para materiais, acabamentos e soluções que façam
              sentido para seu estilo de vida.
            </p>
            <p className="font-heading text-lg font-semibold text-foreground">
              Aqui, alto padrão não é adjetivo. É método!
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Projeto executivo, acompanhamento e pós-venda para você ter previsibilidade, evitar
              atraso e frustração na entrega.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Manifeste a sua personalidade em ambientes únicos, assim como você.
            </p>
            <p className="text-sm text-muted-foreground">Estacionamento no local para sua comodidade.</p>
          </Reveal>
          <ScaleReveal delay={0.1} className="relative order-1 sm:order-2">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 hover:border-amber-500/20">
              <Image
                src={brandImages.showcase1.src}
                alt="Projeto de móveis planejados — ambientes integrados."
                width={brandImages.showcase1.width}
                height={brandImages.showcase1.height}
                sizes="(min-width: 640px) 45vw, 100vw"
                className="h-auto max-h-[min(520px,50vh)] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02] lg:max-h-none"
              />
            </div>
          </ScaleReveal>
        </div>
      </section>

      <section
        id="diferenciais"
        className={cn(landingSection(), "bg-muted/20")}
        aria-labelledby="diferenciais-heading"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:items-start sm:px-6">
          <Reveal>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-amber-500/90">
              {siteConfig.brandFocusLine}
            </p>
            <h2
              id="diferenciais-heading"
              className="mt-3 font-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Diferenciais Criare Moema
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Na Criare Moema, o foco é entregar projetos planejados de alto padrão com execução fiel ao
              que foi aprovado.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Unimos atendimento com arquiteto, a estrutura da maior fábrica de móveis planejados da
              América Latina e condições de pagamento que ajudam a viabilizar o projeto sem atropelar
              decisões importantes.
            </p>
            <ul className="mt-8 list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {diferenciaisList.map((item) => (
                <li key={item} className="transition-colors duration-300 hover:text-foreground/80">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <ScaleReveal delay={0.12}>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 hover:border-amber-500/25">
              <Image
                src={brandImages.showcase2.src}
                alt="Detalhe de marcenaria e acabamento — móveis planejados."
                width={brandImages.showcase2.width}
                height={brandImages.showcase2.height}
                sizes="(min-width: 640px) 45vw, 100vw"
                className="h-auto max-h-[min(560px,55vh)] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:max-h-none"
              />
            </div>
          </ScaleReveal>
        </div>
      </section>

      <section
        id="pagamento"
        className={landingSection()}
        aria-labelledby="pagamento-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2
              id="pagamento-heading"
              className="font-heading text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
            >
              Conheça nossas{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                condições de pagamento
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground italic sm:text-base">
              *Condições sujeitas à análise e às políticas comerciais da Criare Moema.
            </p>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                t: "Parcelamento em até 36x",
                d: "Flexibilidade para adequar o investimento ao seu fluxo e ao projeto.",
              },
              {
                t: "Primeira parcela em até 90 dias",
                d: "Possibilidade de alongar o início das parcelas, conforme análise.",
              },
              {
                t: "5 anos de garantia",
                d: "Tranquilidade após a instalação, alinhada às políticas da loja.",
              },
            ].map((card) => (
              <StaggerItem key={card.t}>
                <Card className="group h-full border-border/60 bg-gradient-to-b from-card/90 to-card/40 shadow-xl backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-950/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-xl font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-amber-100 sm:text-2xl">
                      {card.t}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{card.d}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section
        id="faq"
        className={cn(
          landingSection(),
          "bg-muted/10 lg:justify-start lg:overflow-y-auto lg:py-16 lg:[scrollbar-gutter:stable]",
        )}
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-2 sm:px-6">
          <Reveal>
            <FaqSection />
          </Reveal>
        </div>
      </section>

      <section
        id="localizacao"
        className={cn(
          landingSection(),
          "relative z-20 border-b-0 bg-background shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]",
        )}
        aria-labelledby="localizacao-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2
              id="localizacao-heading"
              className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Venha nos visitar
            </h2>
            <p className="mt-3 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-amber-500/90">
              {siteConfig.brandFocusLine}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
            <Reveal delay={0.06} className="flex flex-col justify-center gap-8">
              <div className="space-y-8">
                <p className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <MapPin
                    className="mt-1 size-7 shrink-0 text-amber-500 transition-transform duration-500 hover:scale-110"
                    aria-hidden
                  />
                  <span>
                    <strong className="text-lg font-semibold text-foreground">Criare Moema</strong>
                    <br />
                    <span className="text-foreground/95">{siteConfig.address.streetAddress}</span>
                    <br />
                    <span className="text-foreground/95">
                      {siteConfig.address.neighborhood} · {siteConfig.address.addressLocality} —{" "}
                      {siteConfig.address.addressRegion}
                    </span>
                    <br />
                    <span className="text-muted-foreground">CEP {siteConfig.address.postalCode}</span>
                    <br />
                    <span className="mt-2 inline-block text-muted-foreground">
                      Estacionamento no local para sua comodidade.
                    </span>
                  </span>
                </p>

                <div className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <Clock
                    className="mt-1 size-7 shrink-0 text-amber-500 transition-transform duration-500 hover:scale-110"
                    aria-hidden
                  />
                  <div>
                    <strong className="text-lg font-semibold text-foreground">
                      Horário de funcionamento
                    </strong>
                    <ul className="mt-2 list-none space-y-1.5 text-foreground/90">
                      {siteConfig.openingHoursLines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={siteConfig.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-xl border border-amber-500/35 bg-amber-950/25 px-4 py-3 text-sm font-semibold text-amber-100 transition-all duration-500 hover:border-amber-500/55 hover:bg-amber-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Navigation className="size-4 shrink-0" aria-hidden />
                  Abrir rota no Waze
                </a>

                <p className="rounded-xl border border-dashed border-amber-500/25 bg-amber-950/20 px-4 py-3 text-sm text-amber-200/90 backdrop-blur-sm transition-colors duration-500 hover:border-amber-500/40">
                  Atendimento com foco em <strong className="font-semibold">Moema</strong> e toda a
                  Grande São Paulo — projetos sob medida para cada bairro.
                </p>
              </div>
            </Reveal>

            <ScaleReveal delay={0.12} className="min-h-[280px] lg:min-h-0">
              <div className="group relative flex h-full min-h-[300px] overflow-hidden rounded-2xl border border-border/50 shadow-2xl ring-1 ring-amber-500/15 transition-all duration-700 hover:ring-amber-500/35 lg:min-h-[min(420px,55vh)]">
                <iframe
                  title="Mapa — Criare Moema São Paulo"
                  src={siteConfig.mapEmbedUrl}
                  className="h-full min-h-[300px] w-full flex-1 transition-transform duration-700 ease-out group-hover:scale-[1.02] lg:min-h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </ScaleReveal>
          </div>
        </div>
      </section>
    </main>
  );
}

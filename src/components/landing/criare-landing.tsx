import Image from "next/image";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { Reveal, ScaleReveal, Stagger, StaggerItem } from "@/components/landing/reveal";
import { landingSection } from "@/components/landing/section-styles";
import { AmbientesGrid } from "@/components/sections/ambientes-grid";
import { ParaProfissionaisTeaser } from "@/components/sections/para-profissionais-teaser";
import { ProjetosAssinadosSection } from "@/components/sections/projetos-assinados-section";
import { CtaSection } from "@/components/sections/cta-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { benefits, diferenciais, paymentCards } from "@/data/home";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Check, Clock, MapPin, Navigation } from "lucide-react";

export function CriareLanding() {
  return (
    <main
      id="conteudo-principal"
      className="min-w-0 overflow-x-clip max-lg:pb-[max(7.5rem,env(safe-area-inset-bottom,0px))]"
    >
      <HeroSection />

      {/* Ambientes — carrossel full-width */}
      <section
        id="ambientes"
        className={cn(landingSection(), "bg-muted/20 max-lg:bg-muted/30 overflow-hidden")}
        aria-labelledby="ambientes-heading"
      >
        <AmbientesGrid />
      </section>

      {/* Projetos assinados — vitrine de parceria com arquitetos */}
      <ProjetosAssinadosSection />

      <section
        id="beneficios"
        className={cn(landingSection(), "max-lg:bg-muted/12")}
        aria-labelledby="beneficios-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="label-eyebrow">
              {siteConfig.brandFocusLine}
            </p>
            <h2
              id="beneficios-heading"
              className="mt-3 font-heading font-bold"
            >
              Por que escolher a <span className="text-primary">Criare Moema</span>?
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <StaggerItem key={item.id}>
                <div className="vitral-card vitral-shimmer group flex h-full gap-3 p-5 transition-all duration-500 hover:-translate-y-1">
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-amber-500 transition-transform duration-500 group-hover:scale-110"
                    aria-hidden
                  />
                  <span className="text-sm font-medium leading-relaxed text-foreground/90">{item.text}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Portal do Arquiteto — teaser para /para-profissionais */}
      <ParaProfissionaisTeaser />

      <section
        id="quem-somos"
        className={cn(landingSection(), "bg-muted/15 max-lg:bg-muted/28")}
        aria-labelledby="quem-somos-heading"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:items-start sm:px-6">
          <Reveal delay={0.05} className="order-2 space-y-5 sm:order-1">
            <p className="label-eyebrow">
              {siteConfig.brandFocusLine}
            </p>
            <h2
              id="quem-somos-heading"
              className="font-heading font-bold"
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
            <div className="vitral-card group relative overflow-hidden transition-all duration-700 hover:-translate-y-1">
              <Image
                src={brandImages.showcase1.src}
                alt="Projeto de móveis planejados — ambientes integrados."
                width={brandImages.showcase1.width}
                height={brandImages.showcase1.height}
                sizes="(min-width: 640px) 45vw, 100vw"
                className="h-auto max-h-[min(560px,62svh)] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02] sm:max-h-[min(520px,50vh)] lg:max-h-none"
              />
            </div>
          </ScaleReveal>
        </div>
      </section>

      <section
        id="diferenciais"
        className={cn(landingSection(), "bg-muted/20 max-lg:bg-muted/30")}
        aria-labelledby="diferenciais-heading"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:items-start sm:px-6">
          <Reveal>
            <p className="label-eyebrow">
              {siteConfig.brandFocusLine}
            </p>
            <h2
              id="diferenciais-heading"
              className="mt-3 font-heading font-bold"
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
              {diferenciais.map((item) => (
                <li key={item.id} className="transition-colors duration-300 hover:text-foreground/80">
                  {item.text}
                </li>
              ))}
            </ul>
          </Reveal>
          <ScaleReveal delay={0.12}>
            <div className="vitral-card group relative overflow-hidden transition-all duration-700 hover:-translate-y-1">
              <Image
                src={brandImages.showcase2.src}
                alt="Detalhe de marcenaria e acabamento — móveis planejados."
                width={brandImages.showcase2.width}
                height={brandImages.showcase2.height}
                sizes="(min-width: 640px) 45vw, 100vw"
                className="h-auto max-h-[min(580px,62svh)] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:max-h-[min(560px,55vh)] lg:max-h-none"
              />
            </div>
          </ScaleReveal>
        </div>
      </section>

      <section
        id="pagamento"
        className={cn(landingSection(), "max-lg:bg-muted/12")}
        aria-labelledby="pagamento-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2
              id="pagamento-heading"
              className="font-heading font-bold"
            >
              Conheça nossas{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
                condições de pagamento
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground italic sm:text-base">
              *Condições sujeitas à análise e às políticas comerciais da Criare Moema.
            </p>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-3">
            {paymentCards.map((card) => (
              <StaggerItem key={card.id}>
                <Card className="vitral-card vitral-shimmer group h-full transition-all duration-500 hover:-translate-y-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-xl font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-amber-100 sm:text-2xl">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <TestimonialsSection />

      <CtaSection />

      <section
        id="faq"
        className={cn(
          landingSection(),
          "bg-muted/10 max-lg:bg-muted/22 lg:justify-start lg:overflow-y-auto lg:py-16 lg:[scrollbar-gutter:stable]",
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
              className="font-heading font-bold"
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

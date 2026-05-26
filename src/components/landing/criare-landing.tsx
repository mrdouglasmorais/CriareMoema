import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/reveal";
import { landingSection } from "@/components/landing/section-styles";
import { AmbientesGrid } from "@/components/sections/ambientes-grid";
import { ParaProfissionaisTeaser } from "@/components/sections/para-profissionais-teaser";
import { ProjetosAssinadosSection } from "@/components/sections/projetos-assinados-section";
import { CtaSection } from "@/components/sections/cta-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { benefits, diferenciais } from "@/data/home";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Check, Clock, MapPin, Navigation } from "lucide-react";

export function CriareLanding() {
  return (
    <main
      id="conteudo-principal"
      className="min-w-0 overflow-x-clip max-lg:pb-[max(6rem,env(safe-area-inset-bottom,0px))]"
    >
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── 01 Ambientes — carousel full-viewport ───────────────────── */}
      <section
        id="ambientes"
        className={cn(
          "border-t border-white/[0.055]",
          "lg:min-h-[calc(100dvh-var(--site-header-height))]",
          "lg:snap-start lg:snap-always lg:flex lg:flex-col",
        )}
        aria-labelledby="ambientes-heading"
      >
        {/* heading sr-only para SEO/acessibilidade */}
        <h2 id="ambientes-heading" className="sr-only">Ambientes sob medida — Criare Moema</h2>
        <AmbientesGrid />
      </section>

      {/* ── 02 Projetos assinados ───────────────────────────────────── */}
      <ProjetosAssinadosSection />

      {/* ── 03 Quem somos — split: texto esquerda | imagem direita ──── */}
      <section
        id="quem-somos"
        className={cn(landingSection(), "!p-0 overflow-hidden")}
        aria-labelledby="quem-somos-heading"
      >
        <div className="flex flex-col lg:flex-row-reverse lg:min-h-[calc(100dvh-var(--site-header-height))]">

          {/* Vídeo — 58% espaço desktop */}
          <div className="relative h-[55svh] w-full shrink-0 overflow-hidden lg:h-auto lg:w-[58%]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <iframe
                src="https://www.youtube.com/embed/nIRm5am0OTg?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&fs=0&iv_load_policy=3&disablekb=1&playlist=nIRm5am0OTg"
                allow="autoplay; encrypted-media"
                title="Fundo vídeo — Quem somos"
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
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/8 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-background/70" />

            <div className="absolute left-8 top-8 z-10 sm:left-10 lg:left-12">
              <span className="section-tag text-white/35">03 — Sobre</span>
            </div>
          </div>

          {/* Texto — 42% espaço desktop */}
          <Reveal
            delay={0.1}
            y={24}
            blur={0}
            className="flex flex-1 flex-col justify-center px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20 xl:px-20"
          >
            <p className="label-eyebrow mb-5 text-amber-400/55">
              {siteConfig.brandFocusLine}
            </p>
            <h2
              id="quem-somos-heading"
              className="font-heading font-bold"
            >
              Quem somos
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/45">
              Desenhamos e entregamos projetos planejados sob medida para quem não aceita improviso na execução.
              Alta tecnologia no processo fabril, garantindo qualidade em cada detalhe.
            </p>
            <ul className="mt-10 space-y-5 border-t border-white/[0.07] pt-10">
              {[
                "Projeto desenvolvido junto ao seu arquiteto — ou ao nosso, se preferir",
                "Fidelidade total ao projeto aprovado. Sem substituições de material de última hora",
                "23 anos de fábrica em Bento Gonçalves — polo moveleiro da Serra Gaúcha",
                "Loja na Alameda dos Nhambiquaras, 1910.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4 text-sm leading-relaxed text-white/38">
                  <span className="mt-[0.55em] h-px w-5 shrink-0 bg-amber-500/35" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-10 font-heading text-base font-semibold text-white/75">
              Alto padrão não é adjetivo. É método.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 04 Diferenciais — split: imagem esquerda | texto direita ── */}
      <section
        id="diferenciais"
        className={cn(landingSection(), "!p-0 overflow-hidden")}
        aria-labelledby="diferenciais-heading"
      >
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100dvh-var(--site-header-height))]">

          {/* Vídeo — 52% */}
          <div className="relative h-[55svh] w-full shrink-0 overflow-hidden lg:h-auto lg:w-[52%]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <iframe
                src="https://www.youtube.com/embed/IOPxvJObk-M?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&fs=0&iv_load_policy=3&disablekb=1&playlist=IOPxvJObk-M"
                allow="autoplay; encrypted-media"
                title="Fundo vídeo — Diferenciais"
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
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/8 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/75" />

            <div className="absolute left-8 top-8 z-10 sm:left-10 lg:left-12">
              <span className="section-tag text-white/35">04 — Método</span>
            </div>
          </div>

          {/* Texto — 48% */}
          <Reveal
            delay={0.1}
            y={24}
            blur={0}
            className="flex flex-1 flex-col justify-center px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20 xl:px-20"
          >
            <p className="label-eyebrow mb-5 text-amber-400/55">
              {siteConfig.brandFocusLine}
            </p>
            <h2
              id="diferenciais-heading"
              className="font-heading font-bold"
            >
              Diferenciais Criare Moema
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/40">
              Maior fábrica de móveis planejados da América Latina combinada com
              atendimento personalizado para arquitetos.
            </p>
            <ul className="mt-10 space-y-5 border-t border-white/[0.07] pt-10">
              {diferenciais.map((item) => (
                <li key={item.id} className="flex items-start gap-4 text-sm leading-relaxed text-white/38">
                  <span className="mt-[0.55em] h-px w-5 shrink-0 bg-amber-500/35" aria-hidden />
                  {item.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── 05 Para Profissionais ────────────────────────────────────── */}
      <ParaProfissionaisTeaser />

      {/* ── 06 Depoimentos ──────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── 08 Benefícios — strip horizontal ────────────────────────── */}
      <section
        id="beneficios"
        className={cn(landingSection(), "max-lg:bg-muted/8")}
        aria-labelledby="beneficios-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <span className="section-tag">08 — Por que a Criare</span>
            <h2
              id="beneficios-heading"
              className="mt-5 font-heading font-bold"
            >
              Por que escolher a Criare Moema?
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <StaggerItem key={item.id}>
                <div className="group flex items-start gap-4 border-t border-white/[0.065] py-6 transition-colors duration-400 hover:border-amber-500/20">
                  <Check
                    className="mt-[0.2em] size-3.5 shrink-0 text-amber-500/50 transition-colors duration-400 group-hover:text-amber-400"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-white/42 transition-colors duration-400 group-hover:text-white/68">
                    {item.text}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 09 CTA ──────────────────────────────────────────────────── */}
      <CtaSection />

      {/* ── 10 FAQ ──────────────────────────────────────────────────── */}
      <section
        id="faq"
        className={cn(
          landingSection(),
          "bg-muted/8 max-lg:bg-muted/14 lg:justify-start lg:overflow-y-auto lg:py-16 lg:[scrollbar-gutter:stable]",
        )}
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-2 sm:px-8 lg:px-10">
          <Reveal>
            <FaqSection />
          </Reveal>
        </div>
      </section>

      {/* ── 11 Localização ──────────────────────────────────────────── */}
      <section
        id="localizacao"
        className={cn(landingSection(), "relative z-20 border-b-0 bg-background !p-0 overflow-hidden")}
        aria-labelledby="localizacao-heading"
      >
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100dvh-var(--site-header-height))]">

          {/* Texto — 45% espaço desktop */}
          <Reveal
            delay={0.06}
            className="flex flex-col justify-center px-8 py-16 sm:px-12 sm:py-20 lg:w-[45%] lg:px-14 xl:px-18"
          >
            <span className="section-tag">11 — Visita</span>
            <h2
              id="localizacao-heading"
              className="mt-5 font-heading font-bold"
            >
              Venha nos visitar
            </h2>

            <div className="mt-10 space-y-8">
              <p className="flex items-start gap-4 text-base leading-relaxed text-white/45">
                <MapPin className="mt-1 size-4.5 shrink-0 text-amber-500/60" aria-hidden />
                <span>
                  <strong className="font-semibold text-white/80">{siteConfig.name}</strong>
                  <br />
                  {siteConfig.address.streetAddress}
                  <br />
                  {siteConfig.address.neighborhood} · {siteConfig.address.addressLocality} —{" "}
                  {siteConfig.address.addressRegion}
                  <br />
                  <span className="text-white/28">CEP {siteConfig.address.postalCode}</span>
                  <br />
                  <span className="mt-2 inline-block text-white/28">
                    Estacionamento no local para sua comodidade.
                  </span>
                </span>
              </p>

              <div className="flex items-start gap-4 text-base leading-relaxed text-white/45">
                <Clock className="mt-1 size-4.5 shrink-0 text-amber-500/60" aria-hidden />
                <div>
                  <strong className="font-semibold text-white/80">Horário de funcionamento</strong>
                  <ul className="mt-2 space-y-1.5">
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
                className="editorial-link group"
              >
                <Navigation className="size-3.5 shrink-0" aria-hidden />
                Abrir rota no Waze
              </a>

              <p className="border-l border-white/[0.07] pl-5 text-sm text-white/28">
                Atendimento com foco em{" "}
                <strong className="font-semibold text-white/55">Moema</strong> e toda a Grande São Paulo.
              </p>
            </div>
          </Reveal>

          {/* Mapa — 55% full-bleed à direita */}
          <div className="relative h-[60svh] w-full shrink-0 overflow-hidden lg:h-auto lg:flex-1">
            <iframe
              title="Mapa — Criare Moema São Paulo"
              src={siteConfig.mapEmbedUrl}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}

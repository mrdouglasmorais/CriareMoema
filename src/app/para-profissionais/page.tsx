import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/forms/lead-form";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { brandImages } from "@/lib/brand-assets";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, BookOpen, Box, FileText, Shield, Star, Users } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Para Arquitetos e Designers | Portal do Profissional | Criare Moema",
  description:
    "Portal exclusivo para arquitetos e designers de interiores: catálogos técnicos, blocos 3D, atendimento dedicado e condições especiais para parceiros. Cadastre-se gratuitamente.",
  path: "/para-profissionais",
  keywords: [
    "móveis planejados para arquitetos",
    "catálogo técnico móveis",
    "blocos 3D marcenaria",
    "parceria arquiteto móveis planejados",
    "Criare Moema arquiteto",
    "especificação móveis planejados",
    "designer de interiores Moema",
  ],
});

const beneficios = [
  {
    id: "b1",
    icon: FileText,
    title: "Catálogos Técnicos",
    description:
      "PDFs de alta resolução com toda a linha de acabamentos, cores e materiais disponíveis — Laccatos, Laccas, madeirados e mais.",
  },
  {
    id: "b2",
    icon: Box,
    title: "Blocos 3D",
    description:
      "Biblioteca de blocos para AutoCAD e SketchUp, atualizada com cada linha de produto. Inclua a Criare nos seus projetos com precisão milimétrica.",
  },
  {
    id: "b3",
    icon: Users,
    title: "Consultor Dedicado",
    description:
      "Um consultor especializado exclusivo para atender arquitetos — prioridade de agenda, suporte técnico e resposta rápida.",
  },
  {
    id: "b4",
    icon: Star,
    title: "Condições Especiais",
    description:
      "Tabela de preços e condições comerciais diferenciadas para projetos firmados em parceria. Consulte seu consultor.",
  },
  {
    id: "b5",
    icon: Shield,
    title: "Garantia de Execução",
    description:
      "5 anos de garantia após a instalação — você apresenta o projeto com a segurança de que a execução vai corresponder.",
  },
  {
    id: "b6",
    icon: BookOpen,
    title: "Trend Reports",
    description:
      "Conteúdo exclusivo sobre tendências em marcenaria, materiais e design de interiores para manter seus projetos na vanguarda.",
  },
] as const;

const comoFunciona = [
  {
    step: "01",
    title: "Cadastro gratuito",
    description: "Preencha o formulário abaixo. Seu consultor dedicado entrará em contato em até 24h.",
  },
  {
    step: "02",
    title: "Acesso ao material técnico",
    description: "Receba catálogos, blocos 3D e tabela de preços para profissionais por e-mail ou WhatsApp.",
  },
  {
    step: "03",
    title: "Briefing do projeto",
    description: "Compartilhe o projeto com seu consultor. Nossa equipe analisa viabilidade e faz o orçamento.",
  },
  {
    step: "04",
    title: "Execução fiel",
    description: "Aprovado o projeto, executamos com precisão fabril — fiel ao que foi especificado.",
  },
] as const;

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Para Profissionais",
      item: `${siteConfig.url}/para-profissionais`,
    },
  ],
};

export default function ParaProfissionaisPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd]} />
      <main id="conteudo-principal" className="min-w-0 overflow-x-clip">

        {/* ── Hero cinematográfico ─────────────────────────────────────── */}
        <section
          className="relative flex flex-col overflow-hidden border-b border-border/30"
          style={{ minHeight: "calc(100dvh - var(--site-header-height, 4rem))" }}
          aria-labelledby="profissionais-hero-heading"
        >
          <Image
            src={brandImages.paraProfissionais.src}
            alt="Projeto de interiores de alto padrão — Criare Moema para arquitetos"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Layered gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-950/20 to-transparent" />

          <div className="relative z-10 mx-auto flex flex-1 max-w-6xl flex-col justify-end px-5 pb-14 pt-8 sm:px-6 sm:pb-24 sm:pt-0">
            <Reveal className="max-w-2xl space-y-4 sm:space-y-5">
              <nav aria-label="Navegação estrutural" className="hidden sm:block">
                <ol className="flex flex-wrap items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  <li>
                    <Link href="/" className="transition-colors hover:text-amber-400">
                      Início
                    </Link>
                  </li>
                  <li aria-hidden className="text-white/25">/</li>
                  <li className="text-amber-400/90">Para Profissionais</li>
                </ol>
              </nav>

              <span className="section-tag text-white/28">Portal do Arquiteto · {siteConfig.name}</span>

              <h1
                id="profissionais-hero-heading"
                className="font-heading font-bold tracking-tight text-white/90"
                style={{ fontSize: "clamp(2.1rem, 5.5vw, 4.8rem)", lineHeight: 1.06 }}
              >
                Você projeta.{" "}
                <span className="text-white/48">Nós executamos.</span>
              </h1>

              {/* Descrição — versão curta no mobile, completa no sm+ */}
              <p className="text-sm leading-relaxed text-white/70 sm:hidden">
                Parceria completa para arquitetos e designers: catálogos, suporte técnico e precisão na execução.
              </p>
              <p className="hidden text-base leading-relaxed text-white/70 sm:block sm:text-lg">
                A Criare Moema é parceira de arquitetos e designers de interiores que exigem precisão
                milimétrica na execução. Suporte técnico completo para que seus projetos ganhem vida
                com o mais alto padrão de acabamento.
              </p>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:gap-4 sm:pt-2">
                <a
                  href="#cadastro"
                  className="inline-flex h-11 items-center justify-center gap-2.5 rounded-xl border border-amber-500/28 bg-amber-500/7 px-6 font-heading text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-amber-400/78 transition-all duration-400 hover:border-amber-500/45 hover:bg-amber-500/12 hover:text-amber-400/96 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/40 sm:h-12 sm:px-8"
                >
                  Cadastrar-me gratuitamente
                  <ArrowRight className="size-3.5 shrink-0" aria-hidden />
                </a>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/6 px-6 font-heading text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-white/55 backdrop-blur-sm transition-all duration-400 hover:border-white/28 hover:bg-white/10 hover:text-white/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 sm:h-12 sm:px-8"
                >
                  Falar pelo WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Benefícios ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24" aria-labelledby="beneficios-prof-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <p className="label-eyebrow">{siteConfig.brandFocusLine}</p>
              <h2
                id="beneficios-prof-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tighter sm:text-4xl"
              >
                Tudo que você precisa para{" "}
                <span className="text-white/50">especificar</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Desde os materiais técnicos até o acompanhamento pós-venda — a Criare Moema garante
                que a parceria com o arquiteto se reflita em cada detalhe do projeto executado.
              </p>
            </Reveal>

            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {beneficios.map((item, i) => (
                <StaggerItem key={item.id}>
                  <article className="vitral-card group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1">

                    {/* Número editorial */}
                    <span
                      className="mb-5 block font-heading text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-amber-500/38"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Ícone */}
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/8 text-amber-400 transition-all duration-500 group-hover:border-amber-500/40 group-hover:bg-amber-500/15 group-hover:shadow-[0_0_18px_rgba(245,158,11,0.18)]">
                      <item.icon className="size-[18px]" aria-hidden />
                    </div>

                    {/* Texto */}
                    <p className="font-heading text-[0.93rem] font-bold leading-snug text-white/90">
                      {item.title}
                    </p>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/48">
                      {item.description}
                    </p>

                    {/* Linha âmbar que cresce no hover */}
                    <div className="mt-5 h-px w-0 bg-gradient-to-r from-amber-500/55 via-amber-400/25 to-transparent transition-[width] duration-500 group-hover:w-full" />
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ── Como funciona ────────────────────────────────────────────── */}
        <section
          className="border-y border-border/30 bg-muted/15 py-16 sm:py-24"
          aria-labelledby="como-funciona-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <p className="label-eyebrow">Processo simplificado</p>
              <h2
                id="como-funciona-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tighter sm:text-4xl"
              >
                Como funciona a parceria
              </h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {comoFunciona.map((item, i) => (
                <StaggerItem key={item.step}>
                  <article className="vitral-card group relative flex flex-col gap-4 p-6">
                    {/* Connector line (desktop) */}
                    {i < comoFunciona.length - 1 && (
                      <div
                        className="absolute left-full top-8 z-10 hidden h-px w-4 bg-gradient-to-r from-amber-500/30 to-transparent lg:block"
                        aria-hidden
                      />
                    )}

                    {/* Número grande âmbar — decorativo */}
                    <span
                      className="font-heading text-5xl font-bold leading-none text-amber-500/20 transition-colors duration-500 group-hover:text-amber-500/35 lg:text-6xl"
                      aria-hidden
                    >
                      {item.step}
                    </span>

                    {/* Linha âmbar fina abaixo do número */}
                    <div className="h-px w-8 bg-gradient-to-r from-amber-500/40 to-transparent" />

                    <p className="font-heading text-base font-bold leading-snug text-white/88">
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed text-white/48">{item.description}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ── Formulário de cadastro ───────────────────────────────────── */}
        <section
          id="cadastro"
          className="py-16 sm:py-24"
          aria-labelledby="cadastro-heading"
          style={{ scrollMarginTop: "var(--site-header-height, 4rem)" }}
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
            <Reveal className="space-y-6">
              <p className="label-eyebrow">{siteConfig.name}</p>
              <h2
                id="cadastro-heading"
                className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl"
              >
                Cadastre-se como{" "}
                <span className="text-white/50">parceiro</span>
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Preencha o formulário e em até 24 horas úteis um consultor dedicado entrará em contato
                com catálogos, blocos 3D e informações sobre a tabela para profissionais.
              </p>
              <ul className="space-y-3">
                {[
                  "Catálogos técnicos completos por e-mail",
                  "Blocos 3D para AutoCAD e SketchUp",
                  "Consultor exclusivo para arquitetos",
                  "Acesso à tabela de preços para profissionais",
                  "Suporte no orçamento e especificação",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400"
                      aria-hidden
                    >
                      <svg viewBox="0 0 12 12" className="size-3" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="rounded-xl border border-dashed border-amber-500/25 bg-amber-950/15 px-4 py-3 text-sm text-amber-200/80">
                Dados exclusivos para uso interno. Nenhum dado é compartilhado com terceiros.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="vitral-card overflow-hidden">
                <div className="p-6 sm:p-8">
                  <p className="mb-1 label-eyebrow">portal do arquiteto</p>
                  <p className="mb-6 font-heading text-xl font-bold text-foreground sm:text-2xl">
                    Solicitar acesso ao portal
                  </p>
                  <LeadForm showMessage={true} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}

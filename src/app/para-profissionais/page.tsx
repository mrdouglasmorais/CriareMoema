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
          className="relative min-h-[65svh] overflow-hidden border-b border-border/30"
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-950/20 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[65svh] max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6 sm:pb-24">
            <Reveal className="max-w-2xl space-y-5">
              <nav aria-label="Navegação estrutural">
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

              {/* Badge */}
              <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-950/60 px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-sm">
                Portal do Arquiteto · {siteConfig.name}
              </span>

              <h1
                id="profissionais-hero-heading"
                className="font-heading font-bold tracking-tight text-white"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)", lineHeight: 1.05 }}
              >
                Você projeta.{" "}
                <span className="text-gradient-amber">Nós executamos.</span>
              </h1>
              <p className="text-base leading-relaxed text-white/75 sm:text-lg">
                A Criare Moema é parceira de arquitetos e designers de interiores que exigem precisão
                milimétrica na execução. Suporte técnico completo para que seus projetos ganhem vida
                com o mais alto padrão de acabamento.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#cadastro"
                  className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 px-8 text-sm font-semibold text-stone-950 shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_4px_24px_rgba(245,158,11,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-200 hover:to-amber-400 hover:shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_32px_rgba(245,158,11,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 sm:h-14 sm:px-10 sm:text-base"
                >
                  Cadastrar-me gratuitamente
                  <ArrowRight className="size-4 shrink-0" aria-hidden />
                </a>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-14 sm:px-10 sm:text-base"
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
                <span className="text-gradient-amber">especificar</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Desde os materiais técnicos até o acompanhamento pós-venda — a Criare Moema garante
                que a parceria com o arquiteto se reflita em cada detalhe do projeto executado.
              </p>
            </Reveal>

            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {beneficios.map((item) => (
                <StaggerItem key={item.id}>
                  <div className="vitral-card vitral-shimmer group flex h-full flex-col gap-4 p-6 transition-all duration-500 hover:-translate-y-0.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-950/30 text-amber-400 transition-all duration-500 group-hover:border-amber-500/55 group-hover:bg-amber-950/55 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                      <item.icon className="size-5" aria-hidden />
                    </div>
                    <div>
                      <p className="font-heading text-base font-bold text-foreground">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
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
            <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {comoFunciona.map((item, i) => (
                <StaggerItem key={item.step}>
                  <div className="relative flex flex-col gap-4">
                    {/* Connector line (desktop) */}
                    {i < comoFunciona.length - 1 && (
                      <div className="absolute left-full top-6 hidden h-px w-8 bg-gradient-to-r from-amber-500/40 to-transparent lg:block" aria-hidden />
                    )}
                    <span className="font-heading text-5xl font-bold text-amber-500/25 lg:text-6xl">
                      {item.step}
                    </span>
                    <p className="font-heading text-lg font-bold text-foreground">{item.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
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
                <span className="text-gradient-amber">parceiro</span>
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
                {/* Accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" aria-hidden />
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

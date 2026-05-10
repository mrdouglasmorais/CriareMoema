import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/reveal";
import { landingSection } from "@/components/landing/section-styles";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, Box, FileText, Users } from "lucide-react";

const beneficios = [
  {
    id: "pp1",
    icon: FileText,
    title: "Catálogos técnicos",
    description:
      "Acabamentos, cores e materiais em PDF de alta resolução, sempre atualizados.",
  },
  {
    id: "pp2",
    icon: Box,
    title: "Blocos 3D",
    description:
      "Biblioteca para AutoCAD e SketchUp. Inclua a Criare nos seus projetos com precisão.",
  },
  {
    id: "pp3",
    icon: Users,
    title: "Consultor dedicado",
    description:
      "Prioridade de agenda e suporte técnico exclusivo para arquitetos parceiros.",
  },
  {
    id: "pp4",
    icon: BookOpen,
    title: "Trend reports",
    description:
      "Conteúdo exclusivo sobre tendências em marcenaria e design de interiores.",
  },
] as const;

export function ParaProfissionaisTeaser() {
  return (
    <section
      id="para-profissionais"
      className={cn(landingSection(), "relative overflow-hidden")}
      aria-labelledby="profissionais-heading"
    >
      {/* Fundo vitral — orb dourado + roxo para diferenciar esta seção */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_50%,rgba(245,158,11,0.12),transparent_60%),radial-gradient(ellipse_60%_50%_at_90%_50%,rgba(139,92,246,0.10),transparent_55%)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">

        {/* Bloco principal — headline de alto impacto */}
        <Reveal>
          <p className="label-eyebrow">Para Arquitetos e Designers</p>

          <h2
            id="profissionais-heading"
            className="mt-4 max-w-3xl font-heading font-bold"
          >
            Você projeta.{" "}
            <span className="text-gradient-amber">Nós executamos.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A Criare Moema é a parceira de marcenaria que o seu projeto merece.
            Suporte técnico completo, do briefing à entrega — com precisão que preserva
            a sua assinatura.
          </p>
        </Reveal>

        {/* Cards de benefícios com vitral-card */}
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map((item) => (
            <StaggerItem key={item.id}>
              <div className="vitral-card vitral-shimmer group flex h-full flex-col gap-4 p-6 transition-all duration-500 hover:-translate-y-1">
                {/* Ícone em destaque */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 transition-all duration-300 group-hover:border-amber-500/60 group-hover:bg-amber-500/20">
                  <item.icon className="size-5" aria-hidden />
                </div>
                <div className="flex-1">
                  <p className="font-heading text-base font-bold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* CTA de alto impacto — full-width banner vitral */}
        <Reveal delay={0.2} className="mt-10">
          <div className="vitral-card relative overflow-hidden p-8 sm:p-10">
            {/* Glow background interno */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_0%_50%,rgba(245,158,11,0.12),transparent_60%)]"
              aria-hidden
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="label-eyebrow">Cadastro gratuito · Acesso imediato</p>
                <p className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Acesse o Portal do Arquiteto
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Catálogos, blocos 3D, condições exclusivas para parceiros e
                  consultoria técnica dedicada — tudo em um único lugar.
                </p>
              </div>

              <Link
                href="/para-profissionais"
                className={cn(
                  "inline-flex shrink-0 items-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold",
                  "bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-stone-950",
                  "shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_-1px_0_rgba(0,0,0,0.1)_inset,0_4px_20px_rgba(245,158,11,0.3)]",
                  "transition-all duration-200 hover:-translate-y-[1px]",
                  "hover:from-amber-200 hover:via-amber-300 hover:to-amber-400",
                  "hover:shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_32px_rgba(245,158,11,0.45)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60",
                )}
              >
                Quero ser parceiro
                <ArrowRight className="size-5 shrink-0" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

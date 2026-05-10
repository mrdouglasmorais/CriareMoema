import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/reveal";
import { landingSection } from "@/components/landing/section-styles";
import { brandImages } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const projetos = [
  {
    id: "p1",
    titulo: "Residência Moema",
    arquiteto: "Arq. Ana Lima",
    ambientes: "Cozinha · Closet · Home Office",
    descricao:
      "Integração entre cozinha gourmet e sala de estar com painéis em Laccato fosco e iluminação LED multicamadas.",
    image: brandImages.projetoAssinado1,
    imageAlt: "Projeto residência Moema — cozinha e closet planejados por Arq. Ana Lima",
  },
  {
    id: "p2",
    titulo: "Apartamento Jardins",
    arquiteto: "Arq. Pedro Alves",
    ambientes: "Dormitório · Closet · Sala",
    descricao:
      "Suite master com closet walk-in em madeirado escuro, cabeceira estofada integrada e painel de TV com nicho lateral.",
    image: brandImages.projetoAssinado2,
    imageAlt: "Projeto apartamento Jardins — dormitório e closet planejados por Arq. Pedro Alves",
  },
  {
    id: "p3",
    titulo: "Cobertura Ibirapuera",
    arquiteto: "Arq. Marina Costa",
    ambientes: "Cozinha · Sala · Lavabo",
    descricao:
      "Ambientes integrados com marcenaria em ton de nude fosco, bancada em quartzito e lavabo de alta especificação.",
    image: brandImages.projetoAssinado3,
    imageAlt: "Projeto cobertura Ibirapuera — ambientes integrados por Arq. Marina Costa",
  },
] as const;

export function ProjetosAssinadosSection() {
  return (
    <section
      id="projetos-assinados"
      className={cn(landingSection(), "bg-muted/15 max-lg:bg-muted/28")}
      aria-labelledby="projetos-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">

        {/* Cabeçalho split — título à esquerda, CTA à direita */}
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="label-eyebrow">{siteConfig.brandFocusLine}</p>
            <h2 id="projetos-heading" className="mt-4 font-heading font-bold">
              Projetos{" "}
              <em className="not-italic text-gradient-amber">assinados</em>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Marcenaria que respeita a concepção autoral do arquiteto —
              executada com precisão milimétrica e entregue no prazo.
            </p>
          </div>

          <Link
            href="/para-profissionais"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border/50 bg-transparent px-5 py-3 text-sm font-semibold text-foreground/80 transition-all duration-300 hover:border-amber-500/50 hover:text-amber-500 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Portal do Arquiteto
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>

        {/* Cards de projetos */}
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((projeto, i) => (
            <StaggerItem key={projeto.id} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <article className="vitral-card group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1">

                {/* Imagem com overlay premium */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={projeto.image.src}
                    alt={projeto.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Arquiteto badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="prismatic-ring inline-flex rounded-full bg-black/60 px-3.5 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-200 backdrop-blur-md">
                      {projeto.arquiteto}
                    </span>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <p className="font-heading text-lg font-bold leading-tight text-foreground">
                    {projeto.titulo}
                  </p>
                  <p className="label-eyebrow" style={{ letterSpacing: "0.15em" }}>
                    {projeto.ambientes}
                  </p>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {projeto.descricao}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

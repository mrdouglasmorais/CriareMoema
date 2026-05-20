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
      className={cn(landingSection(), "bg-muted/12 max-lg:bg-muted/22")}
      aria-labelledby="projetos-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Cabeçalho split — título à esquerda, CTA à direita */}
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="section-tag">02 — Projetos</span>
            <h2
              id="projetos-heading"
              className="mt-5 font-heading font-bold"
            >
              Projetos{" "}
              <em className="not-italic text-gradient-amber">assinados</em>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/40">
              Marcenaria que respeita a concepção autoral do arquiteto —
              executada com precisão milimétrica.
            </p>
          </div>

          <Link
            href="/para-profissionais"
            className="editorial-link group shrink-0"
          >
            Portal do Arquiteto
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>

        {/* Grid photography-forward — sem card boxes */}
        <Stagger className="mt-14 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((projeto, i) => (
            <StaggerItem key={projeto.id} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <article className="group flex h-full flex-col">

                {/* Imagem — fotografia dominante, sem borda/box */}
                <div className={cn(
                  "relative overflow-hidden",
                  i === 0 ? "aspect-[16/10] sm:aspect-[3/2]" : "aspect-[4/3]",
                )}>
                  <Image
                    src={projeto.image.src}
                    alt={projeto.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="img-editorial object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Overlay sutil que surge no hover */}
                  <div className="photo-overlay" aria-hidden />
                  {/* Linha âmbar inferior — aparece no hover */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-400/70 to-amber-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>

                {/* Texto editorial abaixo da imagem — sem box/card */}
                <div className="mt-5 flex flex-col gap-2">
                  {/* Arquiteto — eyebrow minimal */}
                  <p className="font-heading text-[0.68rem] font-500 uppercase tracking-[0.20em] text-amber-400/55">
                    {projeto.arquiteto}
                  </p>

                  {/* Título do projeto */}
                  <h3 className="font-heading text-lg font-bold leading-tight text-white/90 transition-colors duration-300 group-hover:text-white">
                    {projeto.titulo}
                  </h3>

                  {/* Ambientes */}
                  <p className="text-[0.75rem] font-500 uppercase tracking-[0.12em] text-white/25">
                    {projeto.ambientes}
                  </p>

                  {/* Descrição */}
                  <p className="mt-1 text-sm leading-relaxed text-white/40">
                    {projeto.descricao}
                  </p>
                </div>

              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Rodapé da seção — linha divisória + CTA */}
        <Reveal delay={0.18} className="mt-16">
          <div className="flex items-center gap-8">
            <div className="h-px flex-1 bg-white/[0.06]" aria-hidden />
            <p className="font-heading text-[0.7rem] font-500 uppercase tracking-[0.18em] text-white/20">
              {siteConfig.brandFocusLine}
            </p>
            <div className="h-px flex-1 bg-white/[0.06]" aria-hidden />
          </div>
        </Reveal>

      </div>
    </section>
  );
}

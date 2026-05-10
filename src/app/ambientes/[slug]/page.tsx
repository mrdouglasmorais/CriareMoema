import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ambientes, getAllAmbienteSlugs, getAmbienteBySlug } from "@/data/ambientes";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { Check, ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllAmbienteSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ambiente = getAmbienteBySlug(slug);
  if (!ambiente) return {};

  return createPageMetadata({
    title: ambiente.seoTitle,
    description: ambiente.seoDescription,
    path: `/ambientes/${slug}`,
    keywords: ambiente.keywords,
  });
}

export default async function AmbientePage({ params }: Props) {
  const { slug } = await params;
  const ambiente = getAmbienteBySlug(slug);
  if (!ambiente) notFound();

  const outrosAmbientes = ambientes.filter((a) => a.slug !== slug).slice(0, 3);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ambientes",
        item: `${siteConfig.url}/ambientes`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ambiente.title,
        item: `${siteConfig.url}/ambientes/${slug}`,
      },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${ambiente.title} sob medida — ${siteConfig.name}`,
    description: ambiente.seoDescription,
    url: `${siteConfig.url}/ambientes/${slug}`,
    image: new URL(ambiente.image, siteConfig.url).toString(),
    provider: {
      "@type": "FurnitureStore",
      name: siteConfig.name,
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
    },
    areaServed: {
      "@type": "City",
      name: "São Paulo",
    },
    serviceType: "Móveis Planejados sob Medida",
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, serviceLd]} />
      <main id="conteudo-principal" className="min-w-0 overflow-x-clip">

        {/* ── Hero com imagem cinematográfica ─────────────────────────── */}
        <section
          className="relative min-h-[60svh] overflow-hidden border-b border-border/30"
          aria-labelledby="ambiente-heading"
        >
          <Image
            src={ambiente.image}
            alt={`${ambiente.title} planejada — Criare Moema, Moema São Paulo`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Layered gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Ambient amber glow at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-950/20 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[60svh] max-w-6xl flex-col justify-end px-4 pb-14 sm:px-6 sm:pb-20">
            <Reveal>
              <nav aria-label="Navegação estrutural" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  <li>
                    <Link href="/" className="transition-colors hover:text-amber-400">
                      Início
                    </Link>
                  </li>
                  <li aria-hidden className="text-white/30">/</li>
                  <li>
                    <Link href="/ambientes" className="transition-colors hover:text-amber-400">
                      Ambientes
                    </Link>
                  </li>
                  <li aria-hidden className="text-white/30">/</li>
                  <li className="text-amber-400/90">{ambiente.title}</li>
                </ol>
              </nav>

              {/* Category badge */}
              <span className="mb-4 inline-flex items-center rounded-full border border-amber-500/40 bg-amber-950/60 px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-sm">
                {ambiente.subtitle}
              </span>

              <h1
                id="ambiente-heading"
                className="font-heading font-bold tracking-tight text-white"
                style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", lineHeight: 1.04 }}
              >
                {ambiente.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                {ambiente.shortDescription}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Conteúdo principal ──────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
            <Reveal className="space-y-6">
              <p className="label-eyebrow">{siteConfig.name}</p>
              <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {ambiente.title}{" "}
                <span className="text-gradient-amber">sob medida</span>{" "}
                em Moema
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {ambiente.longDescription}
              </p>
              <Link
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 px-8 text-sm font-semibold text-stone-950 shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_4px_24px_rgba(245,158,11,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-200 hover:to-amber-400 hover:shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_32px_rgba(245,158,11,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 sm:h-14 sm:px-10 sm:text-base"
              >
                {ambiente.ctaLabel}
                <ArrowRight className="size-4 shrink-0" aria-hidden />
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="vitral-card overflow-hidden">
                {/* Accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" aria-hidden />
                <div className="p-6 sm:p-8">
                  <p className="mb-5 font-heading text-base font-bold text-foreground">
                    O que inclui este projeto
                  </p>
                  <Stagger className="space-y-3">
                    {ambiente.features.map((feature) => (
                      <StaggerItem key={feature}>
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400" aria-hidden>
                            <Check className="size-3" strokeWidth={2.5} />
                          </span>
                          <span className="text-sm leading-relaxed text-foreground/90">{feature}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Outros ambientes ────────────────────────────────────────── */}
        {outrosAmbientes.length > 0 && (
          <section
            className="border-t border-border/30 bg-muted/15 py-16 sm:py-20"
            aria-labelledby="outros-ambientes-heading"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <Reveal>
                <p className="label-eyebrow">Continue explorando</p>
                <h2
                  id="outros-ambientes-heading"
                  className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  Outros ambientes
                </h2>
              </Reveal>
              <Stagger className="mt-8 grid gap-5 sm:grid-cols-3">
                {outrosAmbientes.map((outro) => (
                  <StaggerItem key={outro.slug}>
                    <Link
                      href={`/ambientes/${outro.slug}`}
                      className="vitral-card vitral-shimmer group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={outro.image}
                          alt={`${outro.title} planejada — Criare Moema`}
                          fill
                          sizes="(min-width: 640px) 33vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col gap-1.5 p-4">
                        <p className="font-heading text-base font-bold text-foreground transition-colors group-hover:text-amber-100">
                          {outro.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{outro.subtitle}</p>
                        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold text-amber-400 transition-all group-hover:gap-1.5">
                          Ver projetos
                          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        <CtaSection compact />
      </main>
    </>
  );
}

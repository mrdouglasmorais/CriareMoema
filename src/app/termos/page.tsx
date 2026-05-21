import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Termos de Uso",
    description: `Leia os termos e condições de uso do site da ${siteConfig.name}. Conheça seus direitos e responsabilidades ao navegar em nosso site.`,
    path: "/termos",
    noIndex: false,
  });
}

const proseSection = cn(
  "prose prose-invert max-w-none",
  "prose-headings:font-heading prose-headings:tracking-tight",
  "prose-h2:mt-10 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-foreground",
  "prose-h3:mt-6 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-foreground",
  "prose-p:text-muted-foreground prose-p:leading-relaxed",
  "prose-li:text-muted-foreground prose-li:leading-relaxed",
  "prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline",
  "prose-strong:text-foreground",
);

export default function TermosPage() {
  const lastUpdated = "10 de maio de 2025";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Termos de Uso", item: `${siteConfig.url}/termos` },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd]} />
    <main className="min-w-0 overflow-x-clip">

      {/* Premium header */}
      <header className="relative overflow-hidden border-b border-border/30 pb-12 pt-28 sm:pb-16 sm:pt-36">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute left-[-10%] top-[-20%] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.1),transparent_65%)]" />
          <div className="absolute bottom-[-10%] right-[-5%] h-[30vw] w-[30vw] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_65%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
              <li>
                <Link href="/" className="transition-colors hover:text-amber-400">
                  Início
                </Link>
              </li>
              <li aria-hidden className="text-muted-foreground/25">/</li>
              <li className="text-amber-500/70" aria-current="page">
                Termos de Uso
              </li>
            </ol>
          </nav>

          <p className="label-eyebrow">{siteConfig.name}</p>
          <h1
            className="mt-3 font-heading font-bold tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.08 }}
          >
            Termos de{" "}
            <span className="text-gradient-amber">Uso</span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Última atualização: <time dateTime="2025-05-10">{lastUpdated}</time>
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className={proseSection}>
          <p>
            Ao acessar e utilizar o site da <strong>{siteConfig.name}</strong>, você concorda com os
            presentes Termos de Uso. Leia atentamente antes de continuar navegando.
          </p>

          <h2>1. Aceitação dos termos</h2>
          <p>
            O uso deste site implica a aceitação plena e irrevogável destes Termos de Uso. Caso não
            concorde com alguma disposição, recomendamos que não utilize o site.
          </p>

          <h2>2. Uso do site</h2>
          <p>Este site destina-se exclusivamente a:</p>
          <ul>
            <li>Apresentar os produtos e serviços da {siteConfig.name}</li>
            <li>Facilitar o contato entre clientes e nossa equipe</li>
            <li>Fornecer informações sobre móveis planejados sob medida</li>
          </ul>
          <p>É proibido utilizar este site para fins ilegais, fraudulentos ou que violem direitos de terceiros.</p>

          <h2>3. Propriedade intelectual</h2>
          <p>
            Todo o conteúdo deste site — incluindo textos, imagens, logotipos, design e código-fonte —
            é de propriedade exclusiva da {siteConfig.name} ou de seus licenciantes, e está protegido
            pelas leis de propriedade intelectual. É vedada a reprodução, distribuição ou uso comercial
            sem autorização prévia e por escrito.
          </p>

          <h2>4. Links externos</h2>
          <p>
            Este site pode conter links para sites de terceiros (como WhatsApp, Instagram, Google Maps
            e Waze). A {siteConfig.name} não se responsabiliza pelo conteúdo ou pelas práticas de
            privacidade desses sites.
          </p>

          <h2>5. Limitação de responsabilidade</h2>
          <p>
            As informações disponibilizadas neste site têm caráter meramente informativo. A{" "}
            {siteConfig.name} não garante que as informações estejam sempre completas, atualizadas ou
            livres de erros. Não nos responsabilizamos por danos diretos ou indiretos decorrentes do
            uso ou da impossibilidade de uso do site.
          </p>

          <h2>6. Preços e condições comerciais</h2>
          <p>
            Eventuais valores, condições de pagamento e prazos divulgados no site são meramente
            indicativos e estão sujeitos a alteração sem aviso prévio, conforme as políticas comerciais
            vigentes da loja. As condições definitivas são acordadas diretamente com nossa equipe.
          </p>

          <h2>7. Privacidade</h2>
          <p>
            O tratamento dos seus dados pessoais é regido por nossa{" "}
            <Link href="/privacidade">Política de Privacidade</Link>, que integra estes Termos de Uso.
          </p>

          <h2>8. Modificações</h2>
          <p>
            A {siteConfig.name} reserva-se o direito de alterar estes Termos de Uso a qualquer momento.
            As alterações entram em vigor na data de publicação. O uso contínuo do site após qualquer
            modificação implica a aceitação dos novos termos.
          </p>

          <h2>9. Legislação aplicável</h2>
          <p>
            Estes Termos de Uso são regidos pelas leis brasileiras. Fica eleito o foro da Comarca de
            São Paulo, SP, para dirimir quaisquer controvérsias decorrentes deste instrumento.
          </p>

          <h2>10. Contato</h2>
          <p>Para esclarecimentos sobre estes termos:</p>
          <ul>
            <li>
              <strong>E-mail:</strong>{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>
              <strong>Endereço:</strong> {siteConfig.address.streetAddress},{" "}
              {siteConfig.address.neighborhood}, {siteConfig.address.addressLocality} —{" "}
              {siteConfig.address.addressRegion}
            </li>
          </ul>
        </div>

        {/* Footer note */}
        <div className="vitral-card mt-12 p-5 text-sm text-muted-foreground">
          <p>
            Consulte também nossa{" "}
            <Link href="/privacidade" className="text-amber-400 hover:underline">
              Política de Privacidade
            </Link>{" "}
            para entender como tratamos seus dados pessoais.
          </p>
        </div>
      </div>
    </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Política de Privacidade",
    description: `Saiba como a ${siteConfig.name} coleta, usa e protege suas informações pessoais. Comprometidos com a transparência e a segurança dos seus dados.`,
    path: "/privacidade",
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

export default function PrivacidadePage() {
  const lastUpdated = "10 de maio de 2025";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Política de Privacidade", item: `${siteConfig.url}/privacidade` },
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
                Privacidade
              </li>
            </ol>
          </nav>

          <p className="label-eyebrow">{siteConfig.name}</p>
          <h1
            className="mt-3 font-heading font-bold tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.08 }}
          >
            Política de{" "}
            <span className="text-gradient-amber">Privacidade</span>
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
            A <strong>{siteConfig.name}</strong> valoriza a sua privacidade e está comprometida com a
            proteção dos seus dados pessoais. Esta Política de Privacidade explica como coletamos,
            usamos, armazenamos e protegemos as informações que você nos fornece ao utilizar nosso site.
          </p>

          <h2>1. Informações que coletamos</h2>
          <p>Podemos coletar as seguintes informações:</p>
          <ul>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de WhatsApp ou telefone</li>
            <li>Mensagens enviadas por meio de formulários de contato</li>
            <li>Dados de navegação (cookies e tecnologias similares)</li>
          </ul>

          <h2>2. Como usamos suas informações</h2>
          <p>Utilizamos seus dados para:</p>
          <ul>
            <li>Responder às suas solicitações e dúvidas</li>
            <li>Enviar informações sobre nossos produtos e serviços, quando solicitado</li>
            <li>Melhorar a experiência de uso do nosso site</li>
            <li>Cumprir obrigações legais e regulatórias</li>
          </ul>

          <h2>3. Compartilhamento de dados</h2>
          <p>
            Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins
            comerciais. Podemos compartilhar informações com fornecedores de serviços que nos auxiliam
            nas operações do site, desde que esses parceiros se comprometam a manter a confidencialidade
            dos seus dados.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Nosso site pode utilizar cookies para melhorar a experiência de navegação. Você pode
            configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade
            de algumas partes do site.
          </p>

          <h2>5. Segurança dos dados</h2>
          <p>
            Adotamos medidas técnicas e organizacionais para proteger suas informações contra acesso
            não autorizado, perda ou alteração. No entanto, nenhum método de transmissão pela internet
            é 100% seguro.
          </p>

          <h2>6. Seus direitos (LGPD)</h2>
          <p>
            De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:
          </p>
          <ul>
            <li>Acessar os dados que mantemos sobre você</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>Solicitar a exclusão dos seus dados</li>
            <li>Revogar seu consentimento a qualquer momento</li>
            <li>Obter informações sobre o compartilhamento dos seus dados</li>
          </ul>
          <p>
            Para exercer seus direitos, entre em contato conosco pelo e-mail{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>

          <h2>7. Retenção de dados</h2>
          <p>
            Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas
            nesta política ou conforme exigido por lei.
          </p>

          <h2>8. Alterações nesta política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. A data de última atualização
            sempre estará indicada no topo desta página. Recomendamos que você a revise regularmente.
          </p>

          <h2>9. Contato</h2>
          <p>
            Em caso de dúvidas sobre esta política ou sobre o tratamento dos seus dados, entre em contato:
          </p>
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
            Ao utilizar nosso site e enviar formulários, você concorda com os termos desta Política de
            Privacidade. Consulte também nossos{" "}
            <Link href="/termos" className="text-amber-400 hover:underline">
              Termos de Uso
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
    </>
  );
}

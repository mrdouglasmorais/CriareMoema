import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      className={cn(
        // grow: ocupa todo o espaço restante no flex column do layout (após o header, antes do footer).
        // O footer é compact nesta página (via FooterWrapper), então não há conflito de viewport.
        // safe-area-inset-bottom garante espaço para notch inferior (iPhone).
        "flex grow flex-col items-center justify-center",
        "px-4 pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-8 sm:px-6",
      )}
    >
      {/* Ambient glow decorativo */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(245,158,11,0.07),transparent_65%)]"
        aria-hidden
      />

      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        {/* Código numérico */}
        <p
          className="font-heading text-[clamp(5rem,20vw,8rem)] font-bold leading-none tracking-tighter"
          aria-hidden
        >
          <span className="bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(245,158,11,0.35)]">
            404
          </span>
        </p>

        <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Página não encontrada
        </h1>

        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          O endereço pode ter mudado ou o conteúdo foi removido.
          <br className="hidden sm:block" />
          Tente voltar ao início ou entre em contato.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold",
              "bg-gradient-to-b from-amber-400 to-amber-500 text-stone-950",
              "shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_4px_16px_rgba(245,158,11,0.3)]",
              "transition-all duration-300 hover:from-amber-300 hover:to-amber-400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            Voltar ao início
          </Link>

          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-semibold text-foreground/80",
              "transition-all duration-300 hover:border-white/25 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            Falar no WhatsApp
          </a>
        </div>

        <p className="mt-10 text-xs text-muted-foreground/60">
          {siteConfig.name} · {siteConfig.address.neighborhood},{" "}
          {siteConfig.address.addressLocality}
        </p>
      </div>
    </main>
  );
}

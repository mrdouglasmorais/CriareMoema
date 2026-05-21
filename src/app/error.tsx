"use client";

import Link from "next/link";
import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Aqui você pode enviar o erro para um serviço de monitoramento (ex: Sentry)
    console.error(error);
  }, [error]);

  return (
    <main
      className={cn(
        // grow: ocupa todo o espaço restante no flex column do layout.
        // O footer é compact nestas páginas (via FooterWrapper).
        "flex grow flex-col items-center justify-center",
        "px-4 pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-8 sm:px-6",
      )}
    >
      {/* Ambient glow decorativo */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(245,158,11,0.06),transparent_65%)]"
        aria-hidden
      />

      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        {/* Ícone de erro */}
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-card/60 shadow-xl backdrop-blur-md"
          aria-hidden
        >
          <span className="font-heading text-3xl font-bold text-amber-400">!</span>
        </div>

        <h1 className="mt-6 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Algo deu errado
        </h1>

        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Ocorreu um erro inesperado nesta página.
          <br className="hidden sm:block" />
          Tente novamente ou volte ao início.
        </p>

        {error.digest && (
          <p className="mt-2 font-mono text-[11px] text-muted-foreground/50">
            Código: {error.digest}
          </p>
        )}

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold",
              "bg-gradient-to-b from-amber-400 to-amber-500 text-stone-950",
              "shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_4px_16px_rgba(245,158,11,0.3)]",
              "transition-all duration-300 hover:from-amber-300 hover:to-amber-400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <RefreshCcw className="size-4 shrink-0" aria-hidden />
            Tentar novamente
          </button>

          <Link
            href="/"
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-semibold text-foreground/80",
              "transition-all duration-300 hover:border-white/25 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            Voltar ao início
          </Link>
        </div>

        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-amber-400 hover:underline"
        >
          Precisa de ajuda? Fale no WhatsApp
        </a>

        <p className="mt-10 text-xs text-muted-foreground/60">
          {siteConfig.name} · {siteConfig.address.neighborhood},{" "}
          {siteConfig.address.addressLocality}
        </p>
      </div>
    </main>
  );
}

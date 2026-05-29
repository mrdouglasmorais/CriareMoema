"use client";

import Link from "next/link";
import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppOfficialLogo } from "@/components/icons/whatsapp-official-logo";
import { submitLead, type LeadFormState } from "@/lib/actions/lead";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { CheckCircle, Loader2, Send } from "lucide-react";

export interface LeadFormProps {
  className?: string;
  /** Exibe o campo de mensagem opcional */
  showMessage?: boolean;
}

const inputBase = cn(
  "w-full rounded-xl px-4 py-3.5 text-sm",
  "border border-amber-500/15 bg-white/5 text-white/90",
  "placeholder:text-white/25",
  "backdrop-blur-sm",
  "transition-all duration-300",
  "hover:border-amber-500/30 hover:bg-white/8",
  "focus:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-500/15 focus:bg-white/8",
  "disabled:cursor-not-allowed disabled:opacity-40",
);

export function LeadForm({ className, showMessage = true }: LeadFormProps) {
  const pathname = usePathname();
  const [state, formAction, isPending] = useActionState<LeadFormState, FormData>(
    submitLead,
    { status: "idle" },
  );

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "vitral-card flex flex-col items-center gap-5 px-6 py-10 text-center",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle className="size-12 text-amber-400" aria-hidden />
        <div className="space-y-2">
          <p className="font-heading text-xl font-bold text-white">
            Mensagem enviada com sucesso!
          </p>
          <p className="text-sm leading-relaxed text-white/55">
            Em breve um dos nossos especialistas entrará em contato com você.
          </p>
        </div>
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-amber"
        >
          <WhatsAppOfficialLogo className="size-4 shrink-0" aria-hidden />
          Falar pelo WhatsApp agora
        </a>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className={cn("space-y-4", className)}
      noValidate
      aria-label="Formulário de contato"
    >
      <input type="hidden" name="page" value={pathname} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="lead-name"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Nome <span className="text-amber-400" aria-hidden>*</span>
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Seu nome completo"
            disabled={isPending}
            className={inputBase}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="lead-email"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            E-mail <span className="text-amber-400" aria-hidden>*</span>
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="seu@email.com"
            disabled={isPending}
            className={inputBase}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="lead-phone"
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          WhatsApp <span className="text-amber-400" aria-hidden>*</span>
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(11) 9 9999-9999"
          disabled={isPending}
          className={inputBase}
        />
      </div>

      {showMessage && (
        <div className="space-y-1.5">
          <label
            htmlFor="lead-message"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Mensagem{" "}
            <span className="text-muted-foreground/60 normal-case tracking-normal">(opcional)</span>
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={3}
            placeholder="Conte um pouco sobre o ambiente que deseja planejar..."
            disabled={isPending}
            className={cn(inputBase, "resize-none")}
          />
        </div>
      )}

      {state.status === "error" && (
        <p
          className="rounded-lg border border-red-500/30 bg-red-950/30 px-4 py-2.5 text-sm text-red-300"
          role="alert"
          aria-live="assertive"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "btn-amber w-full py-4 text-sm tracking-wide sm:text-base",
          "disabled:translate-y-0",
        )}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden />
            Enviando...
          </>
        ) : (
          <>
            <Send className="size-4 shrink-0" aria-hidden />
            Falar com especialista
          </>
        )}
      </button>

      <p className="text-center text-[11px] leading-relaxed text-muted-foreground/60">
        Ao enviar, você concorda com nossa{" "}
        <Link
          href="/privacidade"
          className="underline underline-offset-2 hover:text-muted-foreground"
        >
          política de privacidade
        </Link>
        . Sem spam.
      </p>
    </form>
  );
}

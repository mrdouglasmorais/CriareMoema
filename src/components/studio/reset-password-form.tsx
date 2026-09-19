"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studioFieldClass } from "@/components/studio/field-styles";
import { studioCopy } from "@/data/studio";
import { requestStudioPasswordReset } from "@/lib/firebase/studio-password";
import { Loader2 } from "lucide-react";

interface ResetPasswordFormProps {
  defaultEmail?: string;
}

export function ResetPasswordForm({ defaultEmail = "" }: ResetPasswordFormProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!email) {
      setError("Informe o e-mail da conta.");
      return;
    }

    startTransition(async () => {
      const result = await requestStudioPasswordReset(email);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setNotice(studioCopy.resetPasswordSent);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-sm leading-relaxed text-white/45">{studioCopy.resetPasswordHint}</p>
      <div className="space-y-2">
        <Label htmlFor="studio-reset-email">E-mail</Label>
        <Input
          id="studio-reset-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          disabled={pending}
          defaultValue={defaultEmail}
          className={studioFieldClass}
          placeholder="voce@criaremoema.com.br"
        />
      </div>
      {notice && (
        <p className="text-sm text-emerald-300" role="status" aria-live="polite">
          {notice}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-300" role="alert" aria-live="assertive">
          {error}
        </p>
      )}
      <Button type="submit" variant="amber" size="xl" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            {studioCopy.resetPasswordPending}
          </>
        ) : (
          studioCopy.resetPasswordCta
        )}
      </Button>
    </form>
  );
}

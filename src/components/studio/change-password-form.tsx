"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/studio/password-field";
import { studioFieldClass } from "@/components/studio/field-styles";
import { studioCopy } from "@/data/studio";
import { postStudioSession } from "@/lib/auth/studio-session-client";
import { updateStudioPassword } from "@/lib/firebase/studio-password";
import { Loader2 } from "lucide-react";

interface ChangePasswordFormProps {
  defaultEmail?: string;
  lockEmail?: boolean;
  createSession?: boolean;
  successMessage: string;
  onSuccess?: () => void;
}

export function ChangePasswordForm({
  defaultEmail = "",
  lockEmail = false,
  createSession = false,
  successMessage,
  onSuccess,
}: ChangePasswordFormProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const email = String(form.get("email") ?? "").trim();
    const currentPassword = String(form.get("currentPassword") ?? "");
    const nextPassword = String(form.get("nextPassword") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (!email || !currentPassword || !nextPassword || !confirmPassword) {
      setError("Preencha e-mail, senha atual e a nova senha.");
      return;
    }
    if (nextPassword.length < 6) {
      setError("A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (nextPassword !== confirmPassword) {
      setError("A confirmação não confere com a nova senha.");
      return;
    }
    if (nextPassword === currentPassword) {
      setError("A nova senha precisa ser diferente da atual.");
      return;
    }

    startTransition(async () => {
      const result = await updateStudioPassword({ email, currentPassword, nextPassword });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      if (createSession) {
        const session = await postStudioSession(result.idToken);
        if (!session.ok) {
          setNotice(successMessage);
          setError(session.message);
          return;
        }
      }
      setNotice(successMessage);
      if (!lockEmail) {
        formElement.reset();
      }
      onSuccess?.();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="studio-change-email">E-mail</Label>
        <Input
          id="studio-change-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          disabled={pending || lockEmail}
          readOnly={lockEmail}
          defaultValue={defaultEmail}
          className={studioFieldClass}
          placeholder="voce@criaremoema.com.br"
        />
      </div>
      <PasswordField
        id="studio-current-password"
        name="currentPassword"
        label={studioCopy.changePasswordCurrent}
        autoComplete="current-password"
        disabled={pending}
      />
      <PasswordField
        id="studio-next-password"
        name="nextPassword"
        label={studioCopy.changePasswordNew}
        autoComplete="new-password"
        disabled={pending}
      />
      <PasswordField
        id="studio-confirm-password"
        name="confirmPassword"
        label={studioCopy.changePasswordConfirm}
        autoComplete="new-password"
        disabled={pending}
      />
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
            {studioCopy.changePasswordPending}
          </>
        ) : (
          studioCopy.changePasswordCta
        )}
      </Button>
    </form>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangePasswordForm } from "@/components/studio/change-password-form";
import { PasswordField } from "@/components/studio/password-field";
import { ResetPasswordForm } from "@/components/studio/reset-password-form";
import { studioFieldClass } from "@/components/studio/field-styles";
import { studioCopy } from "@/data/studio";
import { postStudioSession } from "@/lib/auth/studio-session-client";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { describeFirebaseAuthError } from "@/lib/firebase/studio-password";
import { isSafeStudioPath } from "@/lib/auth/paths";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  firebaseReady: boolean;
}

type LoginMode = "signin" | "change-password" | "reset-password";

export function LoginForm({ firebaseReady }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [mode, setMode] = useState<LoginMode>("signin");
  const [error, setError] = useState<string | null>(null);

  function goToStudio() {
    const next = searchParams.get("next") ?? "/studio";
    router.replace(isSafeStudioPath(next) ? next : "/studio");
    router.refresh();
  }

  function switchMode(next: LoginMode) {
    setMode(next);
    setError(null);
  }

  function onSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!firebaseReady) {
      setError("Firebase Auth ainda não foi configurado no ambiente.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      setError("Informe e-mail e senha.");
      return;
    }

    startTransition(async () => {
      const auth = getFirebaseAuth();
      if (!auth) {
        setError("Firebase Auth indisponível neste navegador.");
        return;
      }

      try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await credential.user.getIdToken();
        const result = await postStudioSession(idToken);
        if (!result.ok) {
          setError(result.message);
          return;
        }
        goToStudio();
      } catch (err) {
        const code = typeof err === "object" && err && "code" in err ? String(err.code) : "";
        setError(describeFirebaseAuthError(code));
      }
    });
  }

  if (!firebaseReady) {
    return (
      <p className="text-sm text-red-300" role="alert">
        Firebase Auth ainda não foi configurado no ambiente.
      </p>
    );
  }

  if (mode === "change-password") {
    return (
      <div className="space-y-4">
        <ChangePasswordForm
          createSession
          successMessage={studioCopy.changePasswordSuccess}
          onSuccess={goToStudio}
        />
        <button
          type="button"
          onClick={() => switchMode("signin")}
          className="w-full text-center text-sm text-white/45 transition-colors hover:text-amber-200"
        >
          {studioCopy.changePasswordBack}
        </button>
      </div>
    );
  }

  if (mode === "reset-password") {
    return (
      <div className="space-y-4">
        <ResetPasswordForm />
        <button
          type="button"
          onClick={() => switchMode("signin")}
          className="w-full text-center text-sm text-white/45 transition-colors hover:text-amber-200"
        >
          {studioCopy.changePasswordBack}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="studio-email">E-mail</Label>
        <Input
          id="studio-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          disabled={pending}
          className={studioFieldClass}
          placeholder="voce@criaremoema.com.br"
        />
      </div>
      <PasswordField
        id="studio-password"
        name="password"
        label={studioCopy.loginPassword}
        autoComplete="current-password"
        disabled={pending}
      />
      {error && (
        <p className="text-sm text-red-300" role="alert" aria-live="assertive">
          {error}
        </p>
      )}
      <Button type="submit" variant="amber" size="xl" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            {studioCopy.loginPending}
          </>
        ) : (
          studioCopy.loginCta
        )}
      </Button>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => switchMode("change-password")}
          disabled={pending}
          className="w-full text-center text-sm text-white/45 transition-colors hover:text-amber-200"
        >
          {studioCopy.changePasswordLink}
        </button>
        <button
          type="button"
          onClick={() => switchMode("reset-password")}
          disabled={pending}
          className="w-full text-center text-sm text-white/45 transition-colors hover:text-amber-200"
        >
          {studioCopy.resetPasswordLink}
        </button>
      </div>
    </form>
  );
}

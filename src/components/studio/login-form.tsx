"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/studio/password-field";
import { studioFieldClass } from "@/components/studio/field-styles";
import { studioCopy } from "@/data/studio";
import { postStudioSession } from "@/lib/auth/studio-session-client";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { isSafeStudioPath } from "@/lib/auth/paths";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  firebaseReady: boolean;
}

type LoginMode = "signin" | "change-password";

function authErrorMessage(code: string): string {
  if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
    return "E-mail ou senha inválidos.";
  }
  if (code === "auth/too-many-requests") {
    return "Muitas tentativas. Aguarde um momento e tente de novo.";
  }
  if (code === "auth/weak-password") {
    return "A nova senha precisa ter pelo menos 6 caracteres.";
  }
  return "Não foi possível concluir. Verifique os dados e tente de novo.";
}

export function LoginForm({ firebaseReady }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [mode, setMode] = useState<LoginMode>("signin");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function goToStudio() {
    const next = searchParams.get("next") ?? "/studio";
    router.replace(isSafeStudioPath(next) ? next : "/studio");
    router.refresh();
  }

  function switchMode(next: LoginMode) {
    setMode(next);
    setError(null);
    setNotice(null);
  }

  function onSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

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
        setError(authErrorMessage(code));
      }
    });
  }

  function onChangePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (!firebaseReady) {
      setError("Firebase Auth ainda não foi configurado no ambiente.");
      return;
    }

    const form = new FormData(event.currentTarget);
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
      const auth = getFirebaseAuth();
      if (!auth) {
        setError("Firebase Auth indisponível neste navegador.");
        return;
      }

      try {
        const credential = await signInWithEmailAndPassword(auth, email, currentPassword);
        await updatePassword(credential.user, nextPassword);
        const idToken = await credential.user.getIdToken(true);
        const result = await postStudioSession(idToken);
        if (!result.ok) {
          setNotice(studioCopy.changePasswordSuccess);
          setError(result.message);
          return;
        }
        setNotice(studioCopy.changePasswordSuccess);
        goToStudio();
      } catch (err) {
        const code = typeof err === "object" && err && "code" in err ? String(err.code) : "";
        setError(authErrorMessage(code));
      }
    });
  }

  if (mode === "change-password") {
    return (
      <form onSubmit={onChangePassword} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="studio-change-email">E-mail</Label>
          <Input
            id="studio-change-email"
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
        <button
          type="button"
          onClick={() => switchMode("signin")}
          disabled={pending}
          className="w-full text-center text-sm text-white/45 transition-colors hover:text-amber-200"
        >
          {studioCopy.changePasswordBack}
        </button>
      </form>
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
      <button
        type="button"
        onClick={() => switchMode("change-password")}
        disabled={pending}
        className="w-full text-center text-sm text-white/45 transition-colors hover:text-amber-200"
      >
        {studioCopy.changePasswordLink}
      </button>
    </form>
  );
}

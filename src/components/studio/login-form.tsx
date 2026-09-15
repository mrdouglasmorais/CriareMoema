"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studioFieldClass } from "@/components/studio/field-styles";
import { studioCopy } from "@/data/studio";
import { createStudioSession } from "@/lib/actions/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { isSafeStudioPath } from "@/lib/auth/paths";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  firebaseReady: boolean;
}

export function LoginForm({ firebaseReady }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
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
        const result = await createStudioSession(idToken);
        if (!result.ok) {
          setError(result.message);
          return;
        }

        const next = searchParams.get("next") ?? "/studio";
        router.replace(isSafeStudioPath(next) ? next : "/studio");
        router.refresh();
      } catch (err) {
        const code = typeof err === "object" && err && "code" in err ? String(err.code) : "";
        if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
          setError("E-mail ou senha inválidos.");
        } else if (code === "auth/too-many-requests") {
          setError("Muitas tentativas. Aguarde um momento e tente de novo.");
        } else {
          setError("Não foi possível entrar. Verifique as credenciais e o Firebase.");
        }
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
      <div className="space-y-2">
        <Label htmlFor="studio-password">Senha</Label>
        <Input
          id="studio-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
          className={studioFieldClass}
        />
      </div>
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
    </form>
  );
}

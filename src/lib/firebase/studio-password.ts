import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

export function describeFirebaseAuthError(code: string): string {
  if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
    return "E-mail ou senha atual inválidos.";
  }
  if (code === "auth/too-many-requests") {
    return "Muitas tentativas. Aguarde um momento e tente de novo.";
  }
  if (code === "auth/weak-password") {
    return "A nova senha precisa ter pelo menos 6 caracteres.";
  }
  if (code === "auth/invalid-email") {
    return "E-mail inválido.";
  }
  if (code === "auth/requires-recent-login") {
    return "Entre de novo com a senha atual e tente alterar outra vez.";
  }
  return "Não foi possível concluir. Verifique os dados e tente de novo.";
}

function errorCode(error: unknown): string {
  return typeof error === "object" && error && "code" in error ? String(error.code) : "";
}

export async function updateStudioPassword(input: {
  email: string;
  currentPassword: string;
  nextPassword: string;
}): Promise<{ ok: true; idToken: string } | { ok: false; message: string }> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { ok: false, message: "Firebase Auth indisponível neste navegador." };
  }

  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.currentPassword,
    );
    await updatePassword(credential.user, input.nextPassword);
    const idToken = await credential.user.getIdToken(true);
    return { ok: true, idToken };
  } catch (error) {
    return { ok: false, message: describeFirebaseAuthError(errorCode(error)) };
  }
}

export async function requestStudioPasswordReset(
  email: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { ok: false, message: "Firebase Auth indisponível neste navegador." };
  }

  try {
    const continueUrl = new URL("/studio/login", window.location.origin).toString();
    await sendPasswordResetEmail(auth, email, { url: continueUrl });
    return { ok: true };
  } catch (error) {
    const code = errorCode(error);
    if (code === "auth/invalid-email") {
      return { ok: false, message: describeFirebaseAuthError(code) };
    }
    // Não revela se o e-mail existe.
    return { ok: true };
  }
}

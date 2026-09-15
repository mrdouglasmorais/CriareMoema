"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase/admin";
import {
  getAllowedStudioEmails,
  isFirebaseAdminConfigured,
  isSessionSecretConfigured,
} from "@/lib/firebase/config";
import { enforceLoadLimit } from "@/lib/integrations/load-gate";
import {
  STUDIO_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  buildSession,
  signSession,
} from "@/lib/auth/session";
import type { ActionResult } from "@/types";

function loginFailedMessage(error: unknown): string {
  const raw = error instanceof Error ? error.message : "";
  if (raw.includes("STUDIO_SESSION_SECRET")) {
    return "Segredo da sessão ausente no servidor. Configure STUDIO_SESSION_SECRET na Vercel.";
  }
  if (/PEM|private key|DECODER|cert/i.test(raw)) {
    return "Firebase Admin com chave inválida. Confira FIREBASE_ADMIN_PRIVATE_KEY na Vercel.";
  }
  if (/auth\/|id-token|Firebase ID token/i.test(raw)) {
    return "Sessão do Firebase expirada. Entre de novo.";
  }
  return "Não foi possível validar o login no servidor.";
}

export async function createStudioSession(idToken: string): Promise<ActionResult> {
  try {
    if (!idToken.trim()) {
      return { ok: false, message: "Token de autenticação ausente." };
    }

    if (!isFirebaseAdminConfigured()) {
      return { ok: false, message: "Firebase Admin não configurado no servidor." };
    }

    if (!isSessionSecretConfigured()) {
      return { ok: false, message: "STUDIO_SESSION_SECRET ausente ou muito curta (mín. 16)." };
    }

    const identity = createHash("sha256").update(idToken).digest("hex").slice(0, 24);
    const load = enforceLoadLimit("auth.login", identity);
    if (!load.ok) {
      return { ok: false, message: load.message };
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const email = decoded.email?.toLowerCase();
    if (!email) {
      return { ok: false, message: "A conta não possui e-mail." };
    }

    const allowed = getAllowedStudioEmails();
    if (allowed.length > 0 && !allowed.includes(email)) {
      return { ok: false, message: "Este e-mail não tem acesso ao Studio." };
    }

    const token = signSession(buildSession(decoded.uid, email));
    const store = await cookies();
    store.set(STUDIO_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return { ok: true };
  } catch (error) {
    console.error("[studio.login]", error instanceof Error ? error.message : error);
    return { ok: false, message: loginFailedMessage(error) };
  }
}

export async function destroyStudioSession(): Promise<void> {
  const store = await cookies();
  store.delete(STUDIO_SESSION_COOKIE);
}

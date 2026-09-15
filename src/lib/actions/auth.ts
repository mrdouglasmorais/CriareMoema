"use server";

import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase/admin";
import { getAllowedStudioEmails, isFirebaseAdminConfigured } from "@/lib/firebase/config";
import { enforceLoadLimit, getRequestIdentity } from "@/lib/integrations/load-gate";
import {
  STUDIO_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  buildSession,
  signSession,
} from "@/lib/auth/session";
import type { ActionResult } from "@/types";

export async function createStudioSession(idToken: string): Promise<ActionResult> {
  if (!idToken.trim()) {
    return { ok: false, message: "Token de autenticação ausente." };
  }

  if (!isFirebaseAdminConfigured()) {
    return { ok: false, message: "Firebase Admin não configurado no servidor." };
  }

  const allowed = getAllowedStudioEmails();
  const load = enforceLoadLimit("auth.login", await getRequestIdentity());
  if (!load.ok) {
    return { ok: false, message: load.message };
  }

  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const email = decoded.email?.toLowerCase();
    if (!email) {
      return { ok: false, message: "A conta não possui e-mail." };
    }
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
    const message = error instanceof Error ? error.message : "Falha ao validar sessão.";
    return { ok: false, message };
  }
}

export async function destroyStudioSession(): Promise<void> {
  const store = await cookies();
  store.delete(STUDIO_SESSION_COOKIE);
}

import { createHash } from "node:crypto";
import { isSessionSecretConfigured } from "@/lib/firebase/config";
import { verifyFirebaseIdToken } from "@/lib/firebase/verify-id-token";
import { enforceLoadLimit } from "@/lib/integrations/load-gate";
import { buildSession, signSession } from "@/lib/auth/session-token";

export type IssuedStudioSession =
  | { ok: true; token: string }
  | { ok: false; message: string };

function loginFailedMessage(error: unknown): string {
  const raw = error instanceof Error ? error.message : "";
  if (raw.includes("STUDIO_SESSION_SECRET")) {
    return "Segredo da sessão ausente no servidor. Configure STUDIO_SESSION_SECRET na Vercel.";
  }
  if (/PEM|private key|DECODER|cert/i.test(raw)) {
    return "Firebase Admin com chave inválida. Confira FIREBASE_ADMIN_PRIVATE_KEY na Vercel.";
  }
  if (/auth\/|id-token|Firebase ID token|JWTExpired|JWTClaim|JWS/i.test(raw)) {
    return "Sessão do Firebase expirada. Entre de novo.";
  }
  if (raw.includes("projectId")) {
    return "Firebase projectId ausente no servidor.";
  }
  return "Não foi possível validar o login no servidor.";
}

export async function issueStudioSession(idToken: string): Promise<IssuedStudioSession> {
  try {
    if (!idToken.trim()) {
      return { ok: false, message: "Token de autenticação ausente." };
    }

    if (!isSessionSecretConfigured()) {
      return { ok: false, message: "STUDIO_SESSION_SECRET ausente ou muito curta (mín. 16)." };
    }

    const identity = createHash("sha256").update(idToken).digest("hex").slice(0, 24);
    const load = enforceLoadLimit("auth.login", identity);
    if (!load.ok) {
      return { ok: false, message: load.message };
    }

    const decoded = await verifyFirebaseIdToken(idToken);
    const email = decoded.email?.toLowerCase();
    if (!email) {
      return { ok: false, message: "A conta não possui e-mail." };
    }

    return { ok: true, token: signSession(buildSession(decoded.uid, email)) };
  } catch (error) {
    console.error("[studio.login]", error instanceof Error ? error.message : error);
    return { ok: false, message: loginFailedMessage(error) };
  }
}

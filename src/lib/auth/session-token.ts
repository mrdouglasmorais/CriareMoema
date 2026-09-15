import { createHmac, timingSafeEqual } from "node:crypto";
import type { StudioSession } from "@/types";

export const STUDIO_SESSION_COOKIE = "criare_studio";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 5;

function getSessionSecret(): string | null {
  const secret = process.env.STUDIO_SESSION_SECRET?.trim();
  return secret && secret.length >= 16 ? secret : null;
}

function isStudioSession(value: unknown): value is StudioSession {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.uid === "string" &&
    typeof record.email === "string" &&
    typeof record.exp === "number"
  );
}

export function signSession(payload: StudioSession): string {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("STUDIO_SESSION_SECRET ausente ou muito curta (mín. 16 caracteres).");
  }

  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function verifySessionToken(token: string): StudioSession | null {
  const secret = getSessionSecret();
  if (!secret) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!isStudioSession(parsed)) return null;
    if (parsed.exp * 1000 < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function buildSession(uid: string, email: string): StudioSession {
  return {
    uid,
    email: email.toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
}

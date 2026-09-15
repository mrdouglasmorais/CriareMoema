import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  STUDIO_SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/auth/session-token";
import type { StudioSession } from "@/types";

export {
  STUDIO_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  signSession,
  verifySessionToken,
  buildSession,
} from "@/lib/auth/session-token";

export async function getStudioSession(): Promise<StudioSession | null> {
  const store = await cookies();
  const token = store.get(STUDIO_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireStudioSession(): Promise<StudioSession> {
  const session = await getStudioSession();
  if (!session) {
    redirect("/studio/login");
  }
  return session;
}

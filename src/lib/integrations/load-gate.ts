import { headers } from "next/headers";

export type LoadChannel = "auth.login" | "studio.upload" | "contact.lead";

interface LoadPolicy {
  limit: number;
  windowMs: number;
}

interface LoadBucket {
  count: number;
  resetAt: number;
}

const POLICIES: Record<LoadChannel, LoadPolicy> = {
  "auth.login": { limit: 8, windowMs: 15 * 60_000 },
  "studio.upload": { limit: 20, windowMs: 15 * 60_000 },
  "contact.lead": { limit: 5, windowMs: 15 * 60_000 },
};

const buckets = new Map<string, LoadBucket>();

export async function getRequestIdentity(): Promise<string> {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip")?.trim() ||
    "local"
  );
}

export function enforceLoadLimit(
  channel: LoadChannel,
  identifier: string,
): { ok: true } | { ok: false; message: string } {
  const policy = POLICIES[channel];
  const key = `${channel}:${identifier.toLowerCase()}`;
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + policy.windowMs });
    return { ok: true };
  }

  if (current.count >= policy.limit) {
    return {
      ok: false,
      message: "Muitas tentativas neste momento. Aguarde um pouco e tente de novo.",
    };
  }

  current.count += 1;
  return { ok: true };
}

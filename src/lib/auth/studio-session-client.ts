import type { ActionResult } from "@/types";

function isActionResult(value: unknown): value is ActionResult {
  if (typeof value !== "object" || value === null || !("ok" in value)) return false;
  const record = value as Record<string, unknown>;
  if (record.ok === true) return true;
  return record.ok === false && typeof record.message === "string";
}

export async function postStudioSession(idToken: string): Promise<ActionResult> {
  const response = await fetch("/api/studio/session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  const payload: unknown = await response.json().catch(() => null);
  if (isActionResult(payload)) {
    return payload;
  }

  return {
    ok: false,
    message: "Não foi possível validar o login no servidor.",
  };
}

export async function deleteStudioSession(): Promise<void> {
  await fetch("/api/studio/session", { method: "DELETE" });
}

"use server";

import { createMoskitDeal } from "@/lib/moskit";

export type LeadFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";
  const page    = (formData.get("page")    as string | null)?.trim() ?? "/";

  if (!name || !email || !phone) {
    return { status: "error", message: "Preencha nome, e-mail e WhatsApp." };
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return { status: "error", message: "E-mail inválido." };
  }

  // ── Moskit CRM ────────────────────────────────────────────────────────────
  await createMoskitDeal({ name, email, phone, message, page });

  // ── Webhook legado (opcional) ─────────────────────────────────────────────
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, source: "site" }),
      });
    } catch {
      // Silently fail — não bloqueia o usuário se webhook estiver offline
    }
  }

  return { status: "success" };
}

/**
 * Moskit CRM — cliente mínimo para criação de negócios via API v2.
 *
 * Documentação: https://moskit.readme.io/reference
 *
 * Variáveis de ambiente necessárias (servidor):
 *   MOSKIT_API_KEY   — chave de API (Configurações > Integrações no Moskit)
 *   MOSKIT_FUNNEL_ID — ID do funil onde o negócio será criado
 *   MOSKIT_STEP_ID   — ID da etapa inicial do funil
 */

const MOSKIT_BASE = "https://api.moskit.com.br/v2";

export interface MoskitLeadInput {
  name: string;
  email: string;
  phone: string;
  message?: string;
  /** Origem do lead — gravada como nota e no nome do negócio. Default: "site" */
  source?: string;
}

export interface MoskitDealResult {
  ok: boolean;
  dealId?: number;
  error?: string;
}

/**
 * Cria um negócio no Moskit com os dados do lead.
 * Retorna `{ ok: true }` em caso de sucesso ou `{ ok: false, error }` em caso de falha.
 * Nunca lança exceção — erros são capturados e retornados.
 */
export async function createMoskitDeal(
  input: MoskitLeadInput,
): Promise<MoskitDealResult> {
  const apiKey = process.env.MOSKIT_API_KEY;
  const funnelId = process.env.MOSKIT_FUNNEL_ID
    ? Number(process.env.MOSKIT_FUNNEL_ID)
    : undefined;
  const stepId = process.env.MOSKIT_STEP_ID
    ? Number(process.env.MOSKIT_STEP_ID)
    : undefined;

  if (!apiKey || !funnelId || !stepId) {
    // Variáveis não configuradas — pula silenciosamente em dev/staging
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Moskit] MOSKIT_API_KEY, MOSKIT_FUNNEL_ID ou MOSKIT_STEP_ID não configurados.",
      );
    }
    return { ok: true }; // Não bloqueia o usuário
  }

  const source = input.source ?? "site";
  const dealName = `Lead ${source} — ${input.name}`;

  const noteLines: string[] = [
    `Origem: ${source}`,
    `E-mail: ${input.email}`,
    `Telefone: ${input.phone}`,
  ];
  if (input.message) noteLines.push(`Mensagem: ${input.message}`);

  const body = {
    name: dealName,
    funnelId,
    stepId,
    people: [
      {
        name: input.name,
        emails: [{ email: input.email }],
        phones: [{ phone: input.phone.replace(/\D/g, ""), type: 1 }],
      },
    ],
    note: noteLines.join("\n"),
  };

  try {
    const res = await fetch(`${MOSKIT_BASE}/deals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "(sem corpo)");
      console.error(`[Moskit] Erro ${res.status}: ${text}`);
      return { ok: false, error: `HTTP ${res.status}` };
    }

    const data = (await res.json()) as { id?: number };
    return { ok: true, dealId: data.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Moskit] Falha na requisição:", message);
    return { ok: false, error: message };
  }
}

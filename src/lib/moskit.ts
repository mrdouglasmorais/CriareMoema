/**
 * Moskit CRM — cliente para criação de negócios via API v2.
 *
 * Base URL: https://api.moskitcrm.com/v2
 *
 * Variáveis de ambiente (servidor):
 *   MOSKIT_API_KEY      — obrigatória. Moskit > Configurações > Integrações.
 *   MOSKIT_USER_ID      — obrigatória. ID do usuário responsável pelos leads
 *                         (Moskit > Usuários > URL ou GET /users).
 *   MOSKIT_PIPELINE_ID  — opcional. ID numérico do pipeline.
 *                         Se omitido, busca pelo nome em MOSKIT_PIPELINE_NAME.
 *   MOSKIT_PIPELINE_NAME — opcional. Padrão: "Funil de Vendass".
 *   MOSKIT_STAGE_ID     — opcional. ID da etapa inicial.
 *                         Se omitido, usa a etapa de menor priority do pipeline.
 */

const BASE = "https://api.moskitcrm.com/v2";
const DEFAULT_PIPELINE_NAME = "Funil de Vendass";

// ── Cache de pipeline/stage (por instância de servidor) ───────────────────────
let _pipelineId: number | null = null;
let _stageId: number | null = null;

// ── Tipos internos ────────────────────────────────────────────────────────────
interface MoskitPipeline  { id: number; name: string }
interface MoskitStage     { id: number; name: string; priority?: number; pipeline?: { id: number } }

// ── Tipos públicos ────────────────────────────────────────────────────────────
export interface MoskitLeadInput {
  name: string;
  email: string;
  phone: string;
  message?: string;
  source?: string;
}

export interface MoskitDealResult {
  ok: boolean;
  dealId?: number;
  error?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
async function api<T>(
  method: "GET" | "POST",
  path: string,
  apiKey: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { apikey: apiKey, "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} ${method} ${path}: ${text}`);
  return JSON.parse(text) as T;
}

async function resolvePipelineId(apiKey: string): Promise<number> {
  if (_pipelineId !== null) return _pipelineId;
  if (process.env.MOSKIT_PIPELINE_ID) {
    return (_pipelineId = Number(process.env.MOSKIT_PIPELINE_ID));
  }
  const name = (process.env.MOSKIT_PIPELINE_NAME ?? DEFAULT_PIPELINE_NAME).toLowerCase();
  const list = await api<MoskitPipeline[]>("GET", "/pipelines", apiKey);
  const match = list.find((p) => p.name.toLowerCase() === name);
  if (!match) throw new Error(
    `[Moskit] Pipeline "${name}" não encontrado. Disponíveis: ${list.map(p => p.name).join(", ")}`,
  );
  return (_pipelineId = match.id);
}

async function resolveStageId(apiKey: string, pipelineId: number): Promise<number> {
  if (_stageId !== null) return _stageId;
  if (process.env.MOSKIT_STAGE_ID) {
    return (_stageId = Number(process.env.MOSKIT_STAGE_ID));
  }
  const all = await api<MoskitStage[]>("GET", `/stages?pipelineId=${pipelineId}`, apiKey);
  const own = all
    .filter((s) => !s.pipeline || s.pipeline.id === pipelineId)
    .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
  if (!own.length) throw new Error(`[Moskit] Pipeline ${pipelineId} não possui etapas.`);
  return (_stageId = own[0].id);
}

// ── Exportação principal ──────────────────────────────────────────────────────

export async function createMoskitDeal(input: MoskitLeadInput): Promise<MoskitDealResult> {
  const apiKey = process.env.MOSKIT_API_KEY;
  const userId = process.env.MOSKIT_USER_ID ? Number(process.env.MOSKIT_USER_ID) : undefined;

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Moskit] MOSKIT_API_KEY não configurada — lead não enviado ao CRM.");
    }
    return { ok: true };
  }

  if (!userId) {
    console.error("[Moskit] MOSKIT_USER_ID não configurado — impossível criar deal.");
    return { ok: true }; // não bloqueia o usuário
  }

  try {
    const pipelineId = await resolvePipelineId(apiKey);
    const stageId    = await resolveStageId(apiKey, pipelineId);
    const user       = { id: userId };
    const source     = input.source ?? "site";

    // 1. Cria contato
    const contact = await api<{ id: number }>("POST", "/contacts", apiKey, {
      name: input.name,
      emails: [{ address: input.email }],
      phones: [{ number: input.phone.replace(/\D/g, "") }],
      responsible: user,
      createdBy: user,
    });

    // 2. Cria deal
    const deal = await api<{ id: number }>("POST", "/deals", apiKey, {
      name: `${input.name} - Lead Site`,
      stage: { id: stageId },
      responsible: user,
      createdBy: user,
      status: "OPEN",
      contacts: [{ id: contact.id }],
    });

    // 3. Adiciona nota com contexto do lead
    const noteLines = [
      `Origem: ${source}`,
      `E-mail: ${input.email}`,
      `Telefone: ${input.phone}`,
      ...(input.message ? [`Mensagem: ${input.message}`] : []),
    ];
    await api("POST", `/deals/${deal.id}/notes`, apiKey, {
      description: noteLines.join("\n"),
      user,
    }).catch((err) => {
      // Nota é secundária — não falha o deal se der erro
      console.warn("[Moskit] Falha ao criar nota:", err.message);
    });

    return { ok: true, dealId: deal.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Moskit] Falha:", message);
    return { ok: false, error: message };
  }
}

/**
 * Teste de integração Moskit — espelha exatamente o fluxo de moskit.ts
 * Execute: node scripts/test-moskit.mjs
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// ── Lê .env.local ─────────────────────────────────────────────────────────────
try {
  const lines = readFileSync(resolve(process.cwd(), ".env.local"), "utf8").split("\n");
  for (const line of lines) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const [k, ...rest] = t.split("=");
    process.env[k.trim()] = rest.join("=").trim();
  }
} catch { console.error("⚠️  .env.local não encontrado — usando env do sistema."); }

// ── Config ────────────────────────────────────────────────────────────────────
const BASE       = "https://api.moskitcrm.com/v2";
const API_KEY    = process.env.MOSKIT_API_KEY;
const USER_ID    = process.env.MOSKIT_USER_ID    ? Number(process.env.MOSKIT_USER_ID)    : undefined;
const PIPELINE_ID = process.env.MOSKIT_PIPELINE_ID ? Number(process.env.MOSKIT_PIPELINE_ID) : undefined;
const STAGE_ID   = process.env.MOSKIT_STAGE_ID   ? Number(process.env.MOSKIT_STAGE_ID)   : undefined;

let passed = 0;
let failed = 0;

function assert(label, condition, detail = "") {
  if (condition) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.error(`  ❌ ${label}${detail ? ` — ${detail}` : ""}`);
    failed++;
  }
}

const H = { apikey: API_KEY, "Content-Type": "application/json" };

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method, headers: H,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, ok: res.ok, data };
}

console.log("\n════════════════════════════════════════════════");
console.log("  Moskit CRM — Teste de Integração");
console.log("════════════════════════════════════════════════\n");

// ── Pré-condições ─────────────────────────────────────────────────────────────
console.log("🔑  Variáveis de ambiente");
assert("MOSKIT_API_KEY definida",    !!API_KEY);
assert("MOSKIT_USER_ID definido",    !!USER_ID);
assert("MOSKIT_PIPELINE_ID definido", !!PIPELINE_ID);
assert("MOSKIT_STAGE_ID definido",   !!STAGE_ID);

if (failed > 0) {
  console.error("\n❌  Variáveis obrigatórias ausentes. Verifique .env.local\n");
  process.exit(1);
}

const user = { id: USER_ID };

// ── 1. Conectividade e autenticação ────────────────────────────────────────────
console.log("\n🌐  Conectividade e autenticação");
const pingRes = await req("GET", "/pipelines");
assert("API acessível (HTTP 200)",       pingRes.ok,                         `HTTP ${pingRes.status}`);
assert("Chave de API válida (não 401)",  pingRes.status !== 401,             `HTTP ${pingRes.status}`);
assert("Resposta é array de pipelines",  Array.isArray(pingRes.data));

// ── 2. Pipeline ────────────────────────────────────────────────────────────────
console.log("\n📋  Pipeline");
const pipelines = pingRes.data;
const pipeline  = pipelines.find(p => p.id === PIPELINE_ID);
assert(`Pipeline ${PIPELINE_ID} existe`,  !!pipeline,  pipeline ? "" : `IDs disponíveis: ${pipelines.map(p=>p.id).join(", ")}`);
if (pipeline) assert(`Nome: "${pipeline.name}"`, true);

// ── 3. Etapa ───────────────────────────────────────────────────────────────────
console.log("\n🪜  Etapa");
const stagesRes = await req("GET", `/stages?pipelineId=${PIPELINE_ID}`);
assert("GET /stages retorna 200",  stagesRes.ok, `HTTP ${stagesRes.status}`);
const stages = Array.isArray(stagesRes.data) ? stagesRes.data : [];
const stage  = stages.find(s => s.id === STAGE_ID);
assert(`Stage ${STAGE_ID} pertence ao pipeline`, !!stage, stage ? "" : `IDs disponíveis: ${stages.map(s=>s.id).join(", ")}`);
if (stage) assert(`Etapa: "${stage.name}" (priority: ${stage.priority})`, true);

// ── 4. Contato ─────────────────────────────────────────────────────────────────
console.log("\n👤  Contato (POST /contacts)");
const contactPayload = {
  name: "Teste Integração Site",
  emails: [{ address: "teste-ci@criaremoema.com.br" }],
  phones: [{ number: "11999999999" }],
  responsible: user,
  createdBy: user,
};
const contactRes = await req("POST", "/contacts", contactPayload);
assert("POST /contacts retorna 200/201",    contactRes.ok,              `HTTP ${contactRes.status} — ${JSON.stringify(contactRes.data)}`);
assert("Contato tem id numérico",           typeof contactRes.data?.id === "number");
assert("Nome gravado corretamente",         contactRes.data?.name === contactPayload.name);
assert("E-mail gravado (primaryEmail.id)",  !!contactRes.data?.primaryEmail?.id);
assert("Telefone gravado (primaryPhone.id)",!!contactRes.data?.primaryPhone?.id);
assert("responsible.id correto",            contactRes.data?.responsible?.id === USER_ID);

const contactId = contactRes.data?.id;

// ── 5. Deal ────────────────────────────────────────────────────────────────────
console.log("\n💼  Deal (POST /deals)");
const leadName    = "Teste Integração - Lead Site";
const dealPayload = {
  name: leadName,
  stage: { id: STAGE_ID },
  responsible: user,
  createdBy: user,
  status: "OPEN",
  contacts: [{ id: contactId }],
};
const dealRes = await req("POST", "/deals", dealPayload);
assert("POST /deals retorna 200/201",   dealRes.ok,              `HTTP ${dealRes.status} — ${JSON.stringify(dealRes.data)}`);
assert("Deal tem id numérico",          typeof dealRes.data?.id === "number");
assert(`Nome: "${leadName}"`,           dealRes.data?.name === leadName);
assert("stage.id correto",             dealRes.data?.stage?.id === STAGE_ID);
assert("status = OPEN",               dealRes.data?.status === "OPEN");
assert("responsible.id correto",       dealRes.data?.responsible?.id === USER_ID);
assert("contacts vinculado",           Array.isArray(dealRes.data?.contacts) && dealRes.data.contacts.length > 0);

const dealId = dealRes.data?.id;

// ── 6. Nota ────────────────────────────────────────────────────────────────────
console.log("\n📝  Nota (POST /deals/:id/notes)");
const noteText = [
  "Origem: site",
  "Página: /contato",
  "E-mail: teste-ci@criaremoema.com.br",
  "Telefone: 11999999999",
  "Mensagem: Teste automatizado de integração CI.",
].join("\n");

const noteRes = await req("POST", `/deals/${dealId}/notes`, {
  description: noteText,
  user,
});
assert("POST /notes retorna 200/201",          noteRes.ok,              `HTTP ${noteRes.status} — ${JSON.stringify(noteRes.data)}`);
assert("Nota tem id numérico",                 typeof noteRes.data?.id === "number");
assert("description gravada corretamente",     noteRes.data?.description === noteText);
assert("user.id correto",                      noteRes.data?.user?.id === USER_ID);

// ── Resumo ────────────────────────────────────────────────────────────────────
console.log("\n════════════════════════════════════════════════");
console.log(`  Resultado: ${passed} passou · ${failed} falhou`);
console.log("════════════════════════════════════════════════");

if (failed === 0) {
  console.log(`\n🎉  Integração 100% — deal #${dealId} criado no Moskit`);
  console.log(`   Pipeline: [${PIPELINE_ID}] ${pipeline?.name}`);
  console.log(`   Etapa:    [${STAGE_ID}] ${stage?.name}\n`);
} else {
  console.error(`\n⚠️  ${failed} verificação(ões) falharam — revise antes do deploy.\n`);
  process.exit(1);
}

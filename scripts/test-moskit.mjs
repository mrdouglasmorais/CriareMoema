/**
 * Teste de integração Moskit — rode com:
 *   node scripts/test-moskit.mjs
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
} catch { console.error("⚠️  .env.local não encontrado."); }

const BASE     = "https://api.moskitcrm.com/v2";
const API_KEY  = process.env.MOSKIT_API_KEY;
const USER_ID  = process.env.MOSKIT_USER_ID ? Number(process.env.MOSKIT_USER_ID) : undefined;
const STAGE_ID = process.env.MOSKIT_STAGE_ID ? Number(process.env.MOSKIT_STAGE_ID) : undefined;

if (!API_KEY)  { console.error("❌  MOSKIT_API_KEY não configurada.");  process.exit(1); }
if (!USER_ID)  { console.error("❌  MOSKIT_USER_ID não configurado.");  process.exit(1); }
if (!STAGE_ID) { console.error("❌  MOSKIT_STAGE_ID não configurado."); process.exit(1); }

const H = { apikey: API_KEY, "Content-Type": "application/json" };

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method, headers: H, ...(body ? { body: JSON.stringify(body) } : {})
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} ${method} ${path}: ${text}`);
  return JSON.parse(text);
}

const user = { id: USER_ID };

// ── 1. Cria contato ────────────────────────────────────────────────────────────
console.log("\n👤  Criando contato...");
const contact = await req("POST", "/contacts", {
  name: "Teste Integração Site",
  emails: [{ address: "teste-integracao@criaremoema.com.br" }],
  phones: [{ number: "11999999999" }],
  responsible: user,
  createdBy: user,
}).catch(e => { console.error("❌", e.message); process.exit(1); });
console.log(`✅  Contato criado: [${contact.id}] ${contact.name}`);

// ── 2. Cria deal ───────────────────────────────────────────────────────────────
console.log("\n💼  Criando deal...");
const deal = await req("POST", "/deals", {
  name: "Teste Integração - Lead Site",
  stage: { id: STAGE_ID },
  responsible: user,
  createdBy: user,
  status: "OPEN",
  contacts: [{ id: contact.id }],
}).catch(e => { console.error("❌", e.message); process.exit(1); });
console.log(`✅  Deal criado: [${deal.id}] ${deal.name}`);

// ── 3. Adiciona nota ───────────────────────────────────────────────────────────
console.log("\n📝  Adicionando nota...");
const note = await req("POST", `/deals/${deal.id}/notes`, {
  description: "Origem: site\nE-mail: teste-integracao@criaremoema.com.br\nTelefone: 11999999999\nMensagem: Teste automático de integração.",
  user,
}).catch(e => { console.warn("⚠️  Nota falhou (não crítico):", e.message); return null; });
if (note) console.log(`✅  Nota criada: [${note.id}]`);

console.log(`\n🎉  Integração OK — verifique no Moskit: pipeline [${process.env.MOSKIT_PIPELINE_ID}] > etapa "Entrada de Leads" [${STAGE_ID}]\n`);

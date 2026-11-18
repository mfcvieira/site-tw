/*
 * Agente de IA do site da TW Consulting: ponte entre o site e a API da Anthropic.
 *
 * O navegador manda a conversa; esta função junta as regras (regras.mjs), chama o modelo
 * e devolve a resposta. A chave da API e os números de WhatsApp dos sócios ficam só nas
 * variáveis do Netlify, e os números só saem depois que a conversa estiver qualificada.
 *
 * Variáveis no Netlify (Project configuration > Environment variables):
 *   AGENTE_ANTHROPIC_KEY   chave da API da Anthropic (console.anthropic.com)
 *   AGENTE_MODELO          id do modelo (docs.claude.com > Models)
 *   AGENTE_WA_HENRY, AGENTE_WA_MIGUEL, AGENTE_WA_ADRIANA
 *                          55 + DDD + número, só dígitos. Sócio sem número não aparece
 *   AGENTE_MAX_MSGS        opcional: mensagens do visitante por conversa (padrão 20)
 *   AGENTE_MODELO_TESTE    opcional: modelo do link de teste (padrão: o mesmo de AGENTE_MODELO)
 *   AGENTE_API_URL         opcional, só para teste local: endereço de uma API simulada
 *
 * As regras vão com cache (o texto fixo é reaproveitado entre as mensagens, mais barato e rápido).
 * Link de teste (trwcon.com/?agente=teste): a página manda teste: true e a conversa usa as regras
 * em teste (regras-teste.mjs) e o modelo de teste, sem afetar os visitantes, que seguem com
 * regras.mjs e AGENTE_MODELO. Para comparar modelos no teste, mande modelo: claude-opus-5-5.
 */
import REGRAS from './regras.mjs';
import REGRAS_TESTE from './regras-teste.mjs';

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODELOS_TESTE = ['claude-opus-5-5', 'claude-sonnet-5-5'];
const SOCIOS = [
  { id: 'henry', nome: 'Henry Costa', papel: 'Estratégia, varejo e produto', env: 'AGENTE_WA_HENRY' },
  { id: 'miguel', nome: 'Miguel Vieira', papel: 'Estratégia, M&A e IA', env: 'AGENTE_WA_MIGUEL' },
  { id: 'adriana', nome: 'Adriana Hirano', papel: 'Sourcing e categorias', env: 'AGENTE_WA_ADRIANA' },
];
// além destes, a frente (regras antigas) ou a prioridade (regras novas)
const OBRIGATORIOS = ['nome', 'cargo', 'empresa', 'porte', 'desafio', 'emjogo'];
const VAZIO = /^(-|\?|\.\.\.|vazio|\(vazio\)|n\/a|a descobrir|n[aã]o informado|n[aã]o sei|n[aã]o disse|ainda n[aã]o sei|a confirmar|avaliando)$/iu;

function sair(status, dados) {
  return new Response(JSON.stringify(dados), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' },
  });
}

function chaveDe(rotulo) {
  return rotulo.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
}

// Lê os campos do bloco <ficha> que o modelo escreve no fim de cada resposta
export function campos(texto) {
  const out = {};
  const re = /<\s*ficha[^>]*>([\s\S]*?)(?:<\s*\/\s*ficha\s*>|$)/giu;
  let m;
  while ((m = re.exec(texto))) {
    for (const linha of m[1].split(/\r?\n/)) {
      const mm = linha.match(/^\s*[-*]?\s*([\p{L}_ ]{3,24}?)\s*:\s*(.*)$/u);
      if (!mm) continue;
      const v = mm[2].trim().replace(/^["']+|["']+$/g, '').trim();
      if (v && !VAZIO.test(v)) out[chaveDe(mm[1])] = v;
    }
  }
  return out;
}

// f: o resumo somado da conversa; atual: o resumo da resposta que o modelo acabou de dar.
// A decisão (qualificado e interesse) tem de vir da resposta atual, nunca de turnos antigos,
// que chegam pelo navegador e podem ter sido forjados.
export function qualificada(f, atual) {
  const tem = (o, k) => typeof o[k] === 'string' && o[k].trim() !== '';
  const sim = (o, k) => tem(o, k) && /^s/i.test(o[k].trim());
  return sim(atual, 'qualificado') && sim(atual, 'interesse') && OBRIGATORIOS.every((k) => tem(f, k)) && (tem(f, 'frente') || tem(f, 'prioridade'));
}

export default async (req) => {
  if (req.method !== 'POST') return sair(405, { error: 'method' });
  const chave = process.env.AGENTE_ANTHROPIC_KEY;
  const modelo = process.env.AGENTE_MODELO;
  if (!chave || !modelo) return sair(503, { error: 'not_configured' });

  // só aceita chamada do próprio site
  const origem = req.headers.get('origin') || '';
  if (origem) {
    let hostOrigem = '';
    try { hostOrigem = new URL(origem).host; } catch { hostOrigem = ''; }
    if (hostOrigem !== new URL(req.url).host) return sair(403, { error: 'origin' });
  }

  // pedido
  const bruto = await req.text();
  if (bruto.length > 300000) return sair(413, { error: 'prompt_too_large' });
  let pedido;
  try { pedido = JSON.parse(bruto); } catch { return sair(400, { error: 'invalid_request' }); }
  const turnos = pedido && Array.isArray(pedido.turns) ? pedido.turns : null;
  if (!turnos || turnos.length < 1 || turnos.length > 80) return sair(400, { error: 'invalid_request' });

  const msgs = [];
  let total = 0;
  let doVisitante = 0;
  for (const t of turnos) {
    if (!t || typeof t !== 'object') return sair(400, { error: 'invalid_request' });
    const papel = t.role;
    const texto = t.content;
    if (!['user', 'assistant'].includes(papel) || typeof texto !== 'string' || !texto.trim()) return sair(400, { error: 'invalid_request' });
    if (texto.length > 8000) return sair(413, { error: 'prompt_too_large' });
    total += texto.length;
    if (papel === 'user') doVisitante++;
    // turnos seguidos do mesmo papel viram um só (a API alterna visitante e agente)
    if (msgs.length && msgs[msgs.length - 1].role === papel) msgs[msgs.length - 1].content += '\n\n' + texto;
    else msgs.push({ role: papel, content: texto });
  }
  if (total > 150000) return sair(413, { error: 'prompt_too_large' });
  if (msgs[0].role !== 'user' || msgs[msgs.length - 1].role !== 'user') return sair(400, { error: 'invalid_request' });
  const maxMsgs = parseInt(process.env.AGENTE_MAX_MSGS || '20', 10) || 20;
  if (doVisitante > maxMsgs) return sair(429, { error: 'rate_limited' });

  // regras com cache; no link de teste, as regras e o modelo de teste
  const teste = pedido.teste === true;
  let modeloUsado = modelo;
  let regras = REGRAS;
  if (teste) {
    modeloUsado = MODELOS_TESTE.includes(pedido.modelo) ? pedido.modelo : (process.env.AGENTE_MODELO_TESTE || modelo);
    regras = REGRAS_TESTE;
  }
  const sistema = [{ type: 'text', text: regras, cache_control: { type: 'ephemeral' } }];

  // chamada ao modelo
  let resp;
  let j = null;
  const inicio = Date.now();
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 55000);
  try {
    resp = await fetch(process.env.AGENTE_API_URL || API_URL, {
      method: 'POST',
      signal: ctl.signal,
      headers: { 'content-type': 'application/json', 'x-api-key': chave, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: modeloUsado, max_tokens: 3000, system: sistema, messages: msgs }),
    });
    j = await resp.json().catch(() => null);
  } catch {
    return sair(502, { error: 'upstream_error' });
  } finally {
    clearTimeout(timer);
  }
  if (resp.status === 429 || resp.status === 529) return sair(429, { error: 'rate_limited' });
  if (!resp.ok || !j) return sair(502, { error: 'upstream_error' });
  const texto = (Array.isArray(j.content) ? j.content : []).filter((b) => b && b.type === 'text').map((b) => b.text).join('');
  if (!texto.trim()) return sair(502, { error: 'empty_completion' });
  const saida = { text: texto, truncated: j.stop_reason === 'max_tokens' };
  if (teste) saida.teste = { modelo: modeloUsado, ms: Date.now() - inicio, uso: j.usage || null };

  // os números dos sócios só saem com a conversa qualificada (conferido aqui, não na página)
  let f = {};
  for (const m of msgs) if (m.role === 'assistant') f = { ...f, ...campos(m.content) };
  const atual = campos(texto);
  f = { ...f, ...atual };
  if (qualificada(f, atual)) {
    const socios = SOCIOS
      .map((s) => ({ id: s.id, nome: s.nome, papel: s.papel, wa: String(process.env[s.env] || '').replace(/\D/g, '') }))
      .filter((s) => s.wa.length >= 12);
    saida.socios = socios;
  }
  return sair(200, saida);
};

export const config = {
  path: '/api/agente',
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};

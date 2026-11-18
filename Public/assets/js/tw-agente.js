/*
 * Agente de IA do site da TW Consulting (janela de conversa).
 * Adaptado do agente do iperform.ai: conversa de verdade com o modelo, uma pergunta por vez,
 * resumo "O desafio numa página" ao lado e, só com o caso qualificado e a autorização da pessoa,
 * botões para continuar no WhatsApp com um dos sócios.
 *
 * LIGADO = false: o site continua com o formulário de contato e o agente só aparece no link de
 * teste (?agente=teste). Para ligar para todos, troque para true.
 */
(function () {
  'use strict';
  var LIGADO = false;

  var CFG = window.TW_AGENTE || {};
  var API = CFG.api || '/api/agente';
  var PRIV = CFG.priv || 'politica-de-privacidade.html';
  var LINKEDIN = 'https://www.linkedin.com/company/trwcon/';
  var MAX_USER = 16;                                        // mensagens do visitante por conversa (o servidor aceita 20)

  // ---------- liga e desliga
  function ligado() {
    if (LIGADO) return true;
    try {
      var q = new URLSearchParams(location.search).get('agente');
      if (q === 'teste') sessionStorage.setItem('twAgente', '1');
      if (q === 'off') sessionStorage.removeItem('twAgente');
      return sessionStorage.getItem('twAgente') === '1';
    } catch (e) { return false; }
  }
  if (!ligado()) return;
  document.documentElement.classList.add('agente-on');

  var GREETING = 'Oi, eu sou o agente de IA da TW Consulting\n\nMe conta qual desafio da sua empresa você quer discutir, que eu organizo com você e encaminho para um dos sócios';
  var STARTERS = [
    'Nossa receita cresce e a margem não acompanha',
    'Estamos avaliando uma aquisição',
    'Quero rever a estratégia para os próximos anos',
    'Quero usar IA nas decisões da empresa'
  ];
  var FIELDS = ['quem', 'empresa', 'desafio', 'jogo', 'frente'];
  var LABELS = { quem: 'Quem fala', empresa: 'Empresa', desafio: 'Desafio', jogo: 'O que está em jogo', frente: 'Como a TW pode ajudar' };
  var RAW = ['fatos', 'nome', 'cargo', 'empresa', 'setor', 'porte', 'desafio', 'jogo', 'frente', 'socio'];
  var STATUS = { idle: 'Pronto para ouvir', think: 'Pensando', write: 'Escrevendo', ready: 'Desafio organizado', off: 'Fora do ar' };

  // ---------- janela
  var ICON = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2.2l1.9 4.7a1.6 1.6 0 0 0 .9.9l4.7 1.9-4.7 1.9a1.6 1.6 0 0 0-.9.9L10 17.2l-1.9-4.7a1.6 1.6 0 0 0-.9-.9L2.5 9.7l4.7-1.9a1.6 1.6 0 0 0 .9-.9L10 2.2Z" fill="currentColor"></path></svg>';
  var XICO = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>';
  var SEND = '<svg id="ag-ico-send" width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  var STOP = '<svg id="ag-ico-stop" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" hidden><rect x="1" y="1" width="12" height="12" rx="2" fill="currentColor"></rect></svg>';
  var BUBBLE = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" style="flex: none"><path d="M10 2.6c-4.2 0-7.5 3-7.5 6.8 0 1.5.5 2.9 1.4 4L3 17.4l4.3-1.3c.8.3 1.7.5 2.7.5 4.2 0 7.5-3 7.5-6.8S14.2 2.6 10 2.6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path><path d="M6.8 9.4h6.4M6.8 12h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path></svg>';
  var OUT = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 11L11 5M6 5h5v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  function markup() {
    var li = FIELDS.map(function (k, i) {
      return '<li data-k="' + k + '"><span class="ag-fn">0' + (i + 1) + '</span><div class="ag-fc"><span class="ag-fk">' + LABELS[k] + '</span><span class="ag-fv">A descobrir</span></div><span class="ag-fg" aria-hidden="true"></span></li>';
    }).join('');
    return '<div class="ag-bk" data-ag-close></div>' +
      '<div class="ag-w" role="dialog" aria-modal="true" aria-labelledby="ag-t" tabindex="-1">' +
        '<div class="ag-c">' +
          '<div class="ag-h">' +
            '<span class="ag-av">' + ICON + '</span>' +
            '<div class="ag-id"><span class="ag-n" id="ag-t">Agente de IA da TW Consulting</span><span class="ag-s" id="ag-status" data-s="idle"><i></i><span id="ag-st">Pronto para ouvir</span></span></div>' +
            '<div class="ag-pr" aria-hidden="true"><span id="ag-count">0 de 5 pontos</span><div class="ag-bars" id="ag-bars"><i></i><i></i><i></i><i></i><i></i></div></div>' +
            '<button class="ag-x ag-tab" type="button" id="ag-tab">Resumo</button>' +
            '<button class="ag-x" type="button" data-ag-close aria-label="Fechar a conversa">' + XICO + '</button>' +
          '</div>' +
          '<div class="ag-log" id="ag-log" role="log" aria-live="polite" tabindex="0" aria-label="Mensagens"></div>' +
          '<div class="ag-chips" id="ag-chips"></div>' +
          '<form class="ag-comp" id="ag-comp"><textarea id="ag-box" rows="1" maxlength="1200" placeholder="Escreva aqui o desafio da sua empresa" aria-label="Sua mensagem"></textarea><button class="ag-send" id="ag-send" type="submit" aria-label="Enviar mensagem">' + SEND + STOP + '</button></form>' +
          '<div class="ag-note" id="ag-note" role="status" hidden></div>' +
          '<div class="ag-leg"><span>Você conversa com uma IA, não envie dados sigilosos · <a href="' + PRIV + '">Privacidade</a> · <a href="' + LINKEDIN + '" target="_blank" rel="noopener">TW no LinkedIn</a></span><button type="button" id="ag-reset">Recomeçar</button></div>' +
        '</div>' +
        '<aside class="ag-f" id="ag-ficha" aria-label="O desafio numa página">' +
          '<p class="ag-ey">O desafio numa página</p>' +
          '<span class="ag-ft">O que o agente já entendeu</span>' +
          '<span class="ag-fs">O resumo se preenche enquanto a conversa avança</span>' +
          '<ol class="ag-fl" id="ag-fields">' + li + '</ol>' +
          '<div class="ag-ff" id="ag-ff"></div>' +
        '</aside>' +
      '</div>';
  }
  var root = document.createElement('div');
  root.className = 'ag';
  root.id = 'ag';
  root.hidden = true;
  root.innerHTML = markup();
  document.body.appendChild(root);

  var $ = function (id) { return document.getElementById(id); };
  var log = $('ag-log'), box = $('ag-box'), chips = $('ag-chips'), note = $('ag-note'), comp = $('ag-comp'), win = root.querySelector('.ag-w');
  var state = null, trigger = null;
  var DASH = String.fromCharCode(8211, 8212), QUOTES = String.fromCharCode(34, 39, 8220, 8221), DOTS = String.fromCharCode(8230);

  function fresh() {
    return { turns: [], ficha: {}, base: {}, qual: '', inv: '', socios: null, consent: false, invited: false, pointed: false, busy: false, replies: 0, ctl: null, off: state ? state.off : false, done: false };
  }

  // ---------- servidor: guarda a chave, as regras e os números dos sócios
  function ask(turns, signal) {
    var st = state;
    return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', signal: signal, body: JSON.stringify({ turns: turns }) })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (!r.ok || !j || typeof j.text !== 'string') {
            throw { code: (j && j.error) || (r.status === 429 ? 'rate_limited' : 'upstream_error') };
          }
          if (Array.isArray(j.socios)) st.socios = j.socios.filter(function (s) { return s && s.wa; });
          return { text: j.text, truncated: !!j.truncated };
        });
      }, function (e) { throw { code: e && e.name === 'AbortError' ? 'cancelled' : 'upstream_error' }; });
  }

  // ---------- texto
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function tidy(s) {
    return String(s || '').replace(/\r/g, '')
      .replace(/```[a-z]*/gi, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(new RegExp('(\\d)\\s*[' + DASH + ']\\s*(\\d)', 'g'), '$1 a $2')
      .replace(new RegExp('[ \\t]*[' + DASH + '][ \\t]*', 'g'), ', ')
      .split('\n').map(function (l) { return l.replace(/[ \t]+$/, '').replace(/([^.\s])\.$/, '$1'); }).join('\n')
      .trim();
  }
  function setParas(node, text) {
    node.textContent = '';
    text.split(/\n{2,}/).forEach(function (p) {
      p = p.trim();
      if (!p) return;
      var para = el('p');
      p.split('\n').forEach(function (line, i) {
        if (i) para.appendChild(document.createElement('br'));
        para.appendChild(document.createTextNode(line));
      });
      node.appendChild(para);
    });
  }
  function normKey(k) { return k.toLowerCase().normalize('NFD').replace(/[^a-z]/g, ''); }
  var KEYS = { fatos: 'fatos', nome: 'nome', cargo: 'cargo', papel: 'cargo', empresa: 'empresa', setor: 'setor', porte: 'porte', tamanho: 'porte', faturamento: 'porte', desafio: 'desafio', problema: 'desafio', emjogo: 'jogo', jogo: 'jogo', impacto: 'jogo', frente: 'frente', caminho: 'frente', socio: 'socio', interesse: 'inv', investimento: 'inv', qualificado: 'qual', qualificada: 'qual' };
  function tidyField(v, max) {
    max = max || 220;
    v = tidy(v);
    while (v && QUOTES.indexOf(v.charAt(0)) >= 0) v = v.slice(1);
    while (v && QUOTES.indexOf(v.charAt(v.length - 1)) >= 0) v = v.slice(0, -1);
    v = v.trim();
    if (/^(-|\?|\.\.\.|vazio|\(vazio\)|n\/a|a descobrir|n[aã]o informado|n[aã]o sei|n[aã]o disse|ainda n[aã]o sei)$/i.test(v)) return '';
    if (v.length > max) v = v.slice(0, max - 3).replace(/\s+\S*$/, '') + DOTS;
    return v;
  }
  function parseFicha(body) {
    var out = {};
    body.split('\n').forEach(function (line) {
      var m = line.match(/^\s*[-*]?\s*([A-Za-zÀ-ÿ_ ]{3,24}?)\s*:\s*(.*)$/);
      if (!m) return;
      var k = KEYS[normKey(m[1])];
      if (k) out[k] = tidyField(m[2], k === 'fatos' ? 700 : 220);
    });
    return out;
  }
  function splitReply(raw) {
    raw = String(raw || '');
    var vis = raw, ficha = null;
    var i = raw.search(/<\s*ficha\b/i);
    if (i >= 0) {
      var rest = raw.slice(i).replace(/^<\s*ficha[^>\n]*>?/i, '');
      var j = rest.search(/<\s*\/\s*ficha/i);
      ficha = parseFicha(j >= 0 ? rest.slice(0, j) : rest);
      vis = raw.slice(0, i) + (j >= 0 ? rest.slice(j).replace(/^<\s*\/\s*ficha\s*>?/i, '') : '');
    } else {
      var m = raw.match(/<\s*(f(i(c(h(a)?)?)?)?)?$/i);
      if (m) vis = raw.slice(0, m.index);
    }
    return { vis: tidy(vis), ficha: ficha };
  }
  function firstName(v) {
    var m = String(v || '').trim().match(/^[A-Za-zÀ-ÿ]{2,20}/);
    return m ? m[0].charAt(0).toUpperCase() + m[0].slice(1) : '';
  }
  function qualOf(v) { v = String(v || '').trim(); return /^s/i.test(v) ? 'sim' : (/^n/i.test(v) ? 'nao' : ''); }

  // ---------- resumo
  function viewOf(f, k) {
    if (k === 'quem') return [firstName(f.nome), f.cargo].filter(Boolean).join(', ');
    if (k === 'empresa') return [f.empresa, f.setor, f.porte].filter(Boolean).join(', ');
    return f[k] || '';
  }
  function filled(f, k) {
    if (k === 'quem') return !!(f.nome && f.cargo);
    if (k === 'empresa') return !!(f.empresa && f.porte);
    return !!f[k];
  }
  function done() { return FIELDS.filter(function (k) { return filled(state.ficha, k); }).length; }

  // ---------- WhatsApp: só existe depois da qualificação, com os números que o servidor manda
  function waMessage(socio) {
    var f = state.ficha, name = firstName(f.nome);
    var who = [name ? 'aqui é ' + name : '', f.cargo ? f.cargo + (f.empresa ? ' da ' + f.empresa : '') : (f.empresa || '')].filter(Boolean).join(', ');
    var rows = [['Empresa', viewOf(f, 'empresa')], ['Desafio', f.desafio], ['O que está em jogo', f.jogo], ['O que procuro', f.frente]]
      .filter(function (r) { return r[1]; });
    var hello = 'Olá' + (socio ? ', ' + firstName(socio.nome) : '') + (who ? ', ' + who : '') + '. Vim pelo site da TW Consulting';
    return [hello, '', 'Resumo que o agente de IA organizou comigo'].concat(rows.map(function (r) { return r[0] + ': ' + r[1]; })).join('\n');
  }
  function sugerido() { var s = normKey(state.ficha.socio || ''); return /henry/.test(s) ? 'henry' : (/adriana/.test(s) ? 'adriana' : (/miguel/.test(s) ? 'miguel' : '')); }
  function waLink(socio, cls) {
    var a = el('a', 'ag-wa ' + (cls || ''));
    a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.href = 'https://wa.me/' + socio.wa + '?text=' + encodeURIComponent(waMessage(socio));
    a.addEventListener('click', function (e) {
      if (state.consent) return;
      e.preventDefault();
      var cb = root.querySelector('#ag-hand input[type=checkbox]');
      if (cb) { cb.focus(); cb.parentNode.classList.remove('flash'); void cb.parentNode.offsetWidth; cb.parentNode.classList.add('flash'); }
    });
    a.innerHTML = BUBBLE;
    var t = el('span', 'ag-wt');
    t.appendChild(el('b', null, 'Falar com ' + socio.nome));
    t.appendChild(el('small', null, socio.papel + (sugerido() === socio.id ? ' · sugerido para este tema' : '')));
    a.appendChild(t);
    if (sugerido() === socio.id) a.classList.add('sug');
    return a;
  }
  function socioList(cls) {
    var wrap = el('div', 'ag-socios');
    (state.socios || []).forEach(function (s) { wrap.appendChild(waLink(s, cls)); });
    return wrap;
  }
  var NO_NUMBER = 'Os números dos sócios ainda não foram cadastrados no site';

  // ---------- painel
  function paintPanel(changed) {
    FIELDS.forEach(function (k) {
      var li = root.querySelector('#ag-fields li[data-k="' + k + '"]');
      var v = viewOf(state.ficha, k);
      li.querySelector('.ag-fv').textContent = v || 'A descobrir';
      li.classList.toggle('on', filled(state.ficha, k));
      if (changed && changed.indexOf(k) >= 0) { li.classList.remove('flash'); void li.offsetWidth; li.classList.add('flash'); }
    });
    var n = done();
    for (var i = 0; i < FIELDS.length; i++) $('ag-bars').children[i].classList.toggle('on', i < n);
    $('ag-count').textContent = n + ' de ' + FIELDS.length + ' pontos';
    paintTab();
    var ff = $('ag-ff');
    ff.textContent = '';
    if (state.qual === 'sim') {
      if (state.socios && state.socios.length) ff.appendChild(socioList('dark'));
      ff.appendChild(el('span', 'ag-fs', !(state.socios && state.socios.length) ? NO_NUMBER : (state.consent ? 'O WhatsApp abre com o resumo pronto' : 'Antes, autorize o envio no resumo ao lado da conversa')));
      gate();
    }
  }
  function paintTab() { $('ag-tab').textContent = root.getAttribute('data-view') === 'ficha' ? 'Conversa' : 'Resumo ' + done() + '/' + FIELDS.length; }
  function setView(v) { if (v) root.setAttribute('data-view', v); else root.removeAttribute('data-view'); paintTab(); }
  function mergeFicha(f) {
    if (!f) return;
    RAW.forEach(function (k) { if (f[k] && f[k] !== state.ficha[k]) state.ficha[k] = f[k]; });
  }

  // ---------- conversa na tela
  function atBottom() { log.scrollTop = log.scrollHeight; }
  function addMsg(who, text) {
    var row = el('div', 'ag-m ' + who), b = el('div', 'ag-b');
    if (text != null) setParas(b, text);
    row.appendChild(b);
    log.appendChild(row);
    atBottom();
    return b;
  }
  function thinking(b) {
    b.textContent = '';
    var d = el('span', 'ag-dots');
    d.appendChild(el('i')); d.appendChild(el('i')); d.appendChild(el('i'));
    d.appendChild(el('em', null, 'Pensando'));
    b.appendChild(d);
  }
  function card(id, eyebrow, title) {
    var c = $(id);
    if (!c) {
      c = el('div', 'ag-card'); c.id = id;
      c.appendChild(el('p', 'ag-ey', eyebrow));
      c.appendChild(el('b', null, title));
    }
    while (c.children.length > 2) c.removeChild(c.lastChild);
    log.appendChild(c);
    return c;
  }
  function showHand() {
    var c = card('ag-hand', 'Pronto para os sócios', 'O seu desafio já está organizado');
    c.appendChild(el('div', 'ag-pre', waMessage(null)));
    var lab = el('label', 'ag-ok'), cb = el('input'), tx = el('span', null, 'Autorizo enviar este resumo a um sócio da TW Consulting pelo WhatsApp, conforme a ');
    cb.type = 'checkbox'; cb.checked = !!state.consent;
    cb.addEventListener('change', function () { state.consent = cb.checked; paintPanel(); gate(); });
    var pa = el('a', null, 'Política de Privacidade'); pa.href = PRIV; pa.target = '_blank'; pa.rel = 'noopener';
    tx.appendChild(pa); lab.appendChild(cb); lab.appendChild(tx); c.appendChild(lab);
    if (state.socios && state.socios.length) {
      c.appendChild(el('span', 'ag-hint', 'Escolha com quem quer falar. O WhatsApp abre com esta mensagem pronta, e você pode ajustar antes de enviar'));
      c.appendChild(socioList(''));
    } else {
      c.appendChild(el('span', 'ag-hint', NO_NUMBER));
    }
    gate();
    atBottom();
  }
  function gate() {
    Array.prototype.forEach.call(root.querySelectorAll('a.ag-wa'), function (a) {
      a.setAttribute('aria-disabled', state.consent ? 'false' : 'true');
      a.classList.toggle('is-off', !state.consent);
    });
  }
  function showContent() {
    var c = card('ag-more', 'Para acompanhar', 'A TW publica conteúdo no LinkedIn');
    var b = el('a', 'ag-lnk'); b.href = LINKEDIN; b.target = '_blank'; b.rel = 'noopener noreferrer';
    b.appendChild(document.createTextNode('Seguir a TW no LinkedIn')); b.insertAdjacentHTML('beforeend', OUT); c.appendChild(b);
    atBottom();
  }

  // ---------- estado da janela
  function setStatus(s) { $('ag-status').setAttribute('data-s', s); $('ag-st').textContent = STATUS[s] || ''; }
  function setBusy(on) {
    state.busy = on;
    $('ag-ico-send').toggleAttribute('hidden', on);
    $('ag-ico-stop').toggleAttribute('hidden', !on);
    $('ag-send').setAttribute('aria-label', on ? 'Parar a resposta' : 'Enviar mensagem');
    Array.prototype.forEach.call(chips.children, function (c) { c.disabled = on; });
  }
  function setNote(text, retry) {
    note.textContent = '';
    if (!text) { note.hidden = true; return; }
    note.hidden = false;
    note.appendChild(el('span', null, text));
    if (retry) {
      var b = el('button', null, 'Tentar de novo');
      b.type = 'button';
      b.addEventListener('click', function () { send(null, true); });
      note.appendChild(b);
    }
  }
  function goOff(text) {
    state.off = true;
    comp.hidden = true; chips.hidden = true;
    setNote(text);
    setStatus('off');
  }
  function grow() { box.style.height = 'auto'; box.style.height = Math.max(48, Math.min(box.scrollHeight + 2, 140)) + 'px'; }

  // ---------- conversa com o modelo
  function pageNote(n) {
    var missing = [], f0 = state.ficha;
    if (!f0.desafio) missing.push('o desafio concreto');
    if (!f0.nome) missing.push('o nome da pessoa');
    if (!f0.cargo) missing.push('o cargo dela');
    if (!f0.empresa) missing.push('a empresa e o setor');
    if (!f0.porte) missing.push('o porte da empresa (faturamento aproximado ou número de funcionários)');
    if (!f0.jogo) missing.push('o que está em jogo');
    if (!f0.frente) missing.push('a frente em que a pessoa procura apoio');
    if (state.inv !== 'sim') missing.push('a confirmação de que ela quer levar o assunto para uma conversa com um sócio');
    var page = '[Nota da página] Esta é a sua resposta número ' + n;
    if (f0.fatos) page += '. O que a pessoa já disse: ' + f0.fatos + '. Confira isso antes de perguntar e não pergunte de novo';
    if (state.invited) page += '. Os botões de WhatsApp dos sócios já estão na tela, mantenha qualificado: sim e não repita o convite';
    else if (!missing.length) page += '. Os pontos já estão respondidos: se o caso combinar com a TW, marque qualificado: sim e convide para escolher um sócio nos botões de WhatsApp';
    else {
      page += '. Para liberar o WhatsApp ainda falta: ' + missing.join('; ') + '. Não fale dos botões antes disso';
      if (n >= 5) page += '. A conversa já está longa: pergunte só o que falta, de forma direta. Só marque qualificado: nao se o caso não combinar com a TW';
      if (state.qual === 'nao') page += '. Você já tinha indicado o LinkedIn: se a pessoa mostrar um caso que combina com a TW, retome e pergunte só o que falta';
      if (n > 1) page += '. Se você já comentou o desafio, não comente de novo nem repita o que a pessoa disse: vá direto à próxima pergunta, em no máximo 20 palavras';
    }
    return page;
  }

  function send(text, isRetry) {
    if (state.busy || state.off || state.done) return;
    if (!isRetry) {
      text = String(text || '').trim();
      if (!text) return;
      state.turns.push({ role: 'user', content: text.slice(0, 1200) });
      addMsg('u', text.slice(0, 1200));
    }
    var mine = state;
    chips.hidden = true;
    setNote('');
    setBusy(true);
    setStatus('think');
    log.setAttribute('aria-busy', 'true');
    var bubble = addMsg('a', null);
    thinking(bubble);
    var ctl = new AbortController();
    state.ctl = ctl;
    var input = state.turns.concat([{ role: 'user', content: pageNote(state.replies + 1) }]);
    ask(input, ctl.signal).then(function (res) {
      if (mine !== state) return;
      setStatus('write');
      finish(bubble, res.text, !!res.truncated);
    }, function (e) {
      if (mine !== state) return;
      fail(e || {}, bubble);
    }).then(function () {
      if (mine !== state) return;
      state.ctl = null;
      setBusy(false);
      log.removeAttribute('aria-busy');
      if (!state.off) setStatus(state.qual === 'sim' ? 'ready' : 'idle');
    });
  }

  function finish(bubble, raw, truncated) {
    state.turns.push({ role: 'assistant', content: raw });
    state.replies++;
    var r = splitReply(raw);
    setParas(bubble, r.vis || 'Anotei o que você contou no resumo do desafio');
    if (truncated) bubble.appendChild(el('span', 'ag-cut', 'A resposta foi cortada'));
    mergeFicha(r.ficha);
    var inv = qualOf(r.ficha && r.ficha.inv);
    if (inv) state.inv = inv;
    var q = qualOf(r.ficha && r.ficha.qual);
    var full = FIELDS.every(function (k) { return filled(state.ficha, k); });
    if (q === 'sim' && full && state.inv === 'sim' && state.socios) state.qual = 'sim';
    else if (q === 'nao' && state.qual !== 'sim') state.qual = 'nao';
    paintPanel(FIELDS.filter(function (k) { return viewOf(state.ficha, k) !== viewOf(state.base, k); }));
    state.base = Object.assign({}, state.ficha);
    if (state.qual === 'sim') { state.invited = true; var more = $('ag-more'); if (more) more.remove(); showHand(); }
    else if (state.qual === 'nao' && !state.pointed) { state.pointed = true; showContent(); }
    else atBottom();
    if (state.turns.filter(function (t) { return t.role === 'user'; }).length >= MAX_USER) {
      state.done = true;
      comp.hidden = true;
      setNote('Esta conversa chegou ao limite de mensagens, recomece se quiser continuar');
    }
  }

  function fail(e, bubble) {
    var code = e.code || 'upstream_error';
    var row = bubble.parentNode;
    state.ficha = Object.assign({}, state.base);   // o que uma resposta que falhou escreveu no painel não fica
    paintPanel();
    if (row && row.parentNode) row.parentNode.removeChild(row);
    if (code === 'cancelled') return;
    if (code === 'not_configured') goOff('O agente está fora do ar agora');
    else if (code === 'rate_limited') setNote('Muitas mensagens em pouco tempo, espere um pouco e tente de novo', true);
    else if (code === 'prompt_too_large') { state.turns = state.turns.slice(-6); setNote('A conversa ficou longa demais para uma resposta só, tente de novo', true); }
    else setNote('A resposta não chegou, tente de novo', true);
  }

  function reset() {
    if (state && state.ctl) state.ctl.abort();
    state = fresh();
    log.textContent = '';
    log.removeAttribute('aria-busy');
    setNote('');
    setBusy(false);
    comp.hidden = !!state.off;
    chips.hidden = !!state.off;
    if (state.off) setNote('O agente está fora do ar agora');
    setStatus(state.off ? 'off' : 'idle');
    addMsg('a', GREETING);
    paintPanel();
    box.value = '';
    grow();
  }

  // ---------- abrir e fechar
  function open(text, from) {
    text = String(text || '').trim();
    trigger = from || document.activeElement;
    root.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    setView('');
    atBottom();
    if (text) send(text);
    if (window.matchMedia('(min-width:861px)').matches && !comp.hidden) box.focus(); else win.focus();
  }
  function close() {
    root.hidden = true;
    document.documentElement.style.overflow = '';
    if (trigger && trigger.focus) try { trigger.focus(); } catch (e) {}
  }

  // ---------- ligações
  STARTERS.forEach(function (t) {
    var b = el('button', null, t);
    b.type = 'button';
    b.addEventListener('click', function () { send(t); });
    chips.appendChild(b);
  });
  comp.addEventListener('submit', function (e) {
    e.preventDefault();
    if (state.busy) { if (state.ctl) state.ctl.abort(); return; }
    var t = box.value.trim();
    if (!t) { box.focus(); return; }
    box.value = '';
    grow();
    send(t);
  });
  box.addEventListener('input', grow);
  box.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      if (!state.busy) { if (comp.requestSubmit) comp.requestSubmit(); else $('ag-send').click(); }
    }
  });
  $('ag-reset').addEventListener('click', reset);
  $('ag-tab').addEventListener('click', function () { setView(root.getAttribute('data-view') === 'ficha' ? '' : 'ficha'); });
  Array.prototype.forEach.call(root.querySelectorAll('[data-ag-close]'), function (b) { b.addEventListener('click', close); });
  root.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    var f = Array.prototype.filter.call(win.querySelectorAll('a[href],button,textarea,input'), function (x) { return !x.disabled && x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === win)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  // botões "Falar com sócio" e "Conversar com um sócio" do site abrem o agente
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-agente]:not(form), a[href$="#contato"]') : null;
    if (!t) return;
    if (t.tagName === 'A' && !t.hasAttribute('data-agente') && !/s[óo]cio/i.test(t.textContent || '')) return;
    e.preventDefault();
    open('', t);
  });
  Array.prototype.forEach.call(document.querySelectorAll('form[data-agente]'), function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var field = f.querySelector('[name=text]');
      var v = field ? field.value : '';
      if (field) field.value = '';
      open(v, field);
    });
  });

  reset();
  if (location.hash === '#agente') open('');
})();

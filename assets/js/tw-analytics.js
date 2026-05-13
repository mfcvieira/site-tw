/* ══════════════════════════════════════════════════
   TW Consulting — Analytics e tracking
   Carregado em todas as páginas (index, insights, materiais, glossario, artigos).
   Atualizado: 2026-05-04 (Dia 7 do plano)

   COMO ATIVAR:
     1. Crie propriedade GA4 em https://analytics.google.com
     2. Pegue o Measurement ID (formato G-XXXXXXXXXX)
     3. Substitua TW_GA4_ID abaixo pelo valor real
     4. (Opcional) LinkedIn Insight Tag: pegue Partner ID em
        https://www.linkedin.com/campaignmanager/ e substitua TW_LINKEDIN_PARTNER_ID
     5. Faça upload deste arquivo para o GoDaddy

   ENQUANTO TW_GA4_ID e TW_LINKEDIN_PARTNER_ID forem placeholders, NADA é enviado
   (verificação no início de cada bloco).
══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── PLACEHOLDERS — TROCAR PELOS IDs REAIS ────────────────
  const TW_GA4_ID = 'G-W7S02D8YTS';                  // TW Consulting — configurado em 2026-05-05
  const TW_LINKEDIN_PARTNER_ID = 'XXXXXXX';          // ex.: 1234567

  const isGA4Configured = TW_GA4_ID && !TW_GA4_ID.includes('XXXX');
  const isLinkedInConfigured = TW_LINKEDIN_PARTNER_ID && !TW_LINKEDIN_PARTNER_ID.includes('XXXX');

  // ─── GOOGLE ANALYTICS 4 ───────────────────────────────────
  if (isGA4Configured) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + TW_GA4_ID;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', TW_GA4_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=Strict;Secure'
    });
  } else {
    // Stub: gtag continua existindo mas não envia nada.
    // Permite que o resto do código chame gtag('event', ...) sem quebrar.
    window.gtag = window.gtag || function () { /* noop até GA4 ser configurado */ };
  }

  // ─── LINKEDIN INSIGHT TAG ─────────────────────────────────
  if (isLinkedInConfigured) {
    window._linkedin_partner_id = TW_LINKEDIN_PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(TW_LINKEDIN_PARTNER_ID);

    (function (l) {
      if (!l) {
        window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
        window.lintrk.q = [];
      }
      const s = document.getElementsByTagName('script')[0];
      const b = document.createElement('script');
      b.type = 'text/javascript';
      b.async = true;
      b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      s.parentNode.insertBefore(b, s);
    })(window.lintrk);
  } else {
    window.lintrk = window.lintrk || function () { /* noop */ };
  }

  // ─── EVENTOS CUSTOMIZADOS ─────────────────────────────────
  // Esses eventos são disparados independente de GA4 estar configurado.
  // Se gtag existir como stub, simplesmente não envia.

  // 1. Cliques em CTAs principais
  document.addEventListener('DOMContentLoaded', function () {
    const ctaSelectors = [
      '.btn-primary',
      '.tw-nav-cta',
      '.tw-article-cta-btn',
      '.value-card-link',
      '.newsletter-btn',
      '.ia-cta-row a'
    ].join(',');

    document.querySelectorAll(ctaSelectors).forEach(function (el) {
      el.addEventListener('click', function (e) {
        const label = (el.textContent || '').trim().slice(0, 80);
        const href = el.getAttribute('href') || '';
        gtag('event', 'cta_click', {
          cta_label: label,
          cta_href: href,
          page_path: location.pathname
        });
      });
    });

    // 2. Cliques em links de download de material (e-book futuro)
    document.querySelectorAll('a[href$=".pdf"], a[download]').forEach(function (el) {
      el.addEventListener('click', function () {
        gtag('event', 'material_download', {
          file_url: el.getAttribute('href'),
          page_path: location.pathname
        });
      });
    });
  });

  // 3. Scroll-depth (25/50/75/100%)
  (function () {
    const milestones = [25, 50, 75, 100];
    const triggered = {};
    function checkScroll() {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      if (total <= 0) return;
      const pct = Math.round((h.scrollTop / total) * 100);
      milestones.forEach(function (m) {
        if (pct >= m && !triggered[m]) {
          triggered[m] = true;
          gtag('event', 'scroll_depth', {
            depth: m,
            page_path: location.pathname
          });
        }
      });
    }
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { checkScroll(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
  })();

})();

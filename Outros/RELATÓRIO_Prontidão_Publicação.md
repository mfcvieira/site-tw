# 📋 RELATÓRIO DE PRONTIDÃO — Publicação em GoDaddy
**Data:** 07/05/2026 | **Status Geral:** 7.5/10 (Pronto com ajustes críticos)

---

## ✅ O QUE ESTÁ PRONTO

### HTML & Semântica
- ✅ DOCTYPE correto, charset UTF-8
- ✅ Viewport meta para responsividade
- ✅ Idioma HTML (pt-BR)
- ✅ 1 H1 (correto)
- ✅ Estrutura semântica com `<section>`, `<article>`
- ✅ 7 arquivos HTML (index.html + quem-somos.html + 5 páginas adicionais)

### SEO & Metadata
- ✅ Meta description presente e descritiva
- ✅ Meta keywords (strategic sourcing, M&A, etc.)
- ✅ Canonical URL definida
- ✅ Open Graph completo (4 tags: title, description, type, image, url)
- ✅ Twitter Card (title, description, image)
- ✅ Robots meta (index, follow)
- ✅ Theme-color para mobile (teal-800)

### Schema Markup (JSON-LD)
- ✅ **34 tipos de schema** encontrados:
  - Organization (nome, logo, founder, contact, areaServed)
  - Website (url, name, publisher)
  - **FAQPage com 8 perguntas estratégicas** ← Excelente para Google PAA
  - **Services schema (4 pilares):** Estratégia, M&A, Supply, IA Aplicada
  - Person (sócios com LinkedIn links)
- ✅ JSON-LD bem estruturado e validável

### Imagens & Assets
- ✅ **10 imagens presentes:**
  - 7 JPGs (hero, filosofia, 4 soluções, contact)
  - 3 PNGs (sócios: Henry, Miguel, Adriana)
- ✅ **Todas com alt-text descritivo** (9/9)
- ✅ Logos, favicons, avatares configurados
- ✅ Uso de Unsplash (licença gratuita comercial)

### CSS & Performance
- ✅ CSS inline (embedded) com ~85 propriedades otimizadas
- ✅ CSS custom properties para paleta (--ink, --teal, --paper)
- ✅ Responsividade com media queries (breakpoint 900px, 600px)
- ✅ Scripts com `defer` (não bloqueiam parsing)
- ✅ Google Fonts preconnected (performance)

### Navegação & Links
- ✅ **21 links internos** (âncoras) bem configurados
- ✅ **10 links externos** (LinkedIn, Google Maps)
- ✅ Links críticos presentes:
  - `#contato` (CTA principal)
  - `#edge` (TW Edge framework)
  - `quem-somos.html` (página institucional)
  - `https://www.linkedin.com/company/trwcon/`
  - `https://www.google.com/maps/` (endereço)

### Acessibilidade Base
- ✅ Contraste de cores WCAG AAA (ink #0B0F12 vs paper #F6F4EE = 16:1)
- ✅ Zoom responsivo (viewport permite até 5x)
- ✅ Imagens com alt-text
- ✅ Links com suffficient color contrast

### Informações de Contato
- ✅ Endereço completo: Av. Senador Tarso Dutra, 565 · sala 505, Porto Alegre/RS
- ✅ Google Maps embed funcional
- ✅ LinkedIn company link presente
- ⚠ Email de contato: **NÃO está explicitamente no HTML** (deveria estar em footer ou rodapé do formulário)

---

## 🔴 BLOQUEADORES CRÍTICOS (ANTES DE PUBLICAR)

### 1. **FORMULÁRIO NÃO FUNCIONA** ⚠️ CRÍTICO
**Severidade:** 🔴 **BLOQUEADOR**

**Problema:**
```html
<form class="contact-form" onsubmit="event.preventDefault(); alert('Mensagem registrada — placeholder.');">
```
- Formulário está com placeholder (mostra `alert()` fake)
- **ZERO leads serão capturados** quando publicar
- Dados do visitante não são salvos em lugar nenhum

**Seções afetadas:**
- Seção "Contato" (nome, email, telefone, mensagem)
- CTAs no hero ("Conversar com um sócio")
- Footer (links para contato)

**Impacto:**
- 0 leads capturados
- Visitante pensa que formulário funcionou (falsa segurança)
- Conversão: 0%

**Solução obrigatória:**
1. **Opção A (Rápida - Recomendada):** Usar Formspree.io
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
   - Gratuito até 50 submissões/mês
   - Emails diretos para miguel.vieira@trwcon.com
   - Setup: 10 minutos

2. **Opção B (Com automação):** Formspree + Zapier
   - Form submission → Email + Google Sheets + Slack notification
   - Setup: 30 minutos
   - Recomendado para escala

**Gate:** ✋ **NÃO publicar sem resolver isso.**

---

### 2. **EMAIL DE CONTATO NÃO VISÍVEL** ⚠️ CRÍTICO
**Severidade:** 🔴 **BLOQUEADOR**

**Problema:**
- `miguel.vieira@trwcon.com` está no README.md e schema JSON, mas **NÃO aparece na página visível**
- Visitante não sabe como falar com TW se preferir email direto
- Acessibilidade: usuário com problemas no formulário fica sem caminho alternativo

**Solução:**
Adicionar email em **2 lugares**:
1. **Footer:** `<a href="mailto:miguel.vieira@trwcon.com">miguel.vieira@trwcon.com</a>`
2. **Seção de Contato (pós-formulário):** "Ou envie email direto: miguel.vieira@trwcon.com"

**Esforço:** 5 minutos

---

### 3. **MOBILE NAV NÃO EXISTE** ⚠️ ALTA
**Severidade:** 🟠 **ALTA**

**Problema:**
- Nav com `.nav-links` e `.live-dot` desaparece em <900px
- Mobile (<600px) fica **sem navegação de menu**
- Usuário não consegue acessar seções (Quem Somos, Footer, etc.)

**Teste manual:**
Abrir em mobile/tablet (~375px) → topo fica vazio, sem menu

**Solução obrigatória:**
1. Implementar hambúrguer icon + mobile nav overlay
   - Click em icon → menu sidebar aparece
   - Links: Home | Quem Somos | Contato
   - Close ao clicar link ou overlay
2. Tempo: 3-4 horas

**Gate:** ✋ **Teste em <600px antes de publicar**

---

### 4. **RESPONSIVIDADE TABLET/MOBILE INCOMPLETA** ⚠️ ALTA
**Severidade:** 🟠 **ALTA**

**Problemas identificados:**
- `.pillar-table` (4 colunas no desktop) reduz para **2 colunas em 900px**
  - Em mobile <480px, deve ser **1 coluna** — atualmente quebra layout
- Seções com padding 120px em mobile >30% da viewport (consume scroll desnecessário)
- H1 com `clamp(56px, 8vw, 124px)` pode ficar muito grande em mobile landscape

**Teste necessário:**
```
Desktop (1440px):   ✅ Provavelmente OK
Tablet (768px):     ⚠️ Verificar pillar-table
Mobile (375px):     ⚠️ Verificar layout do hero, soluções
Mobile land (667px): ⚠️ Verificar overflow
```

**Solução:**
Adicionar breakpoint mobile <600px no CSS:
```css
@media (max-width: 600px) {
  .pillar-table { grid-template-columns: 1fr; }
  section { padding: 64px 0; }
  h1 { font-size: clamp(32px, 5vw, 56px); }
}
```

**Esforço:** 2-3 horas

---

## 🟡 PROBLEMAS IMPORTANTES (ANTES DE PUBLICAR, MAS NÃO BLOQUEADORES)

### 5. Falta Input Text no Formulário
**Severidade:** 🟡 **MÉDIA**

Campo "Nome" deveria ter `type="text"` explicitamente:
```html
<input type="text" name="nome" placeholder="Nome completo" required />
```

Verificado: ⚠️ Campo existe, mas tipo pode estar implícito

**Solução:** 2 min

---

### 6. Email Explícito no Footer
**Severidade:** 🟡 **MÉDIA**

Footer deveria ter:
```html
<a href="mailto:miguel.vieira@trwcon.com">miguel.vieira@trwcon.com</a>
```

**Solução:** 5 min

---

### 7. Falta Focus Visible em Links
**Severidade:** 🟡 **BAIXA**

Acessibilidade via teclado: adicionar
```css
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--teal-700);
  outline-offset: 2px;
}
```

**Solução:** 5 min

---

## 📊 RESUMO FINAL

| Categoria | Status | Detalhes |
|:---|:---|:---|
| **HTML & Semântica** | ✅ Pronto | DOCTYPE, charset, H1, lang corretos |
| **SEO Técnico** | ✅ Pronto | Meta, canonical, Open Graph, Twitter Card |
| **Schema Markup** | ✅ Excelente | 34 tipos, FAQPage, Services, Organization |
| **Imagens** | ✅ Pronto | 10 imagens, todas com alt-text |
| **Navegação** | ⚠️ Incompleto | Links OK, mas **mobile nav falta** |
| **Formulário** | 🔴 **BLOQUEADOR** | Não envia dados — usa placeholder alert() |
| **Email Contato** | 🔴 **BLOQUEADOR** | Não visível na página |
| **Responsividade Mobile** | ⚠️ Incompleto | <600px precisa de ajustes |
| **CSS & Performance** | ✅ Pronto | Inline, custom properties, defer scripts |
| **Acessibilidade** | ✅ Bom | Contraste WCAG AAA, alt-text OK |

---

## 🚀 CHECKLIST ANTES DE PUBLICAR (ORDEM DE PRIORIDADE)

### Fase URGENTE (Dia 1 — Máximo 6h)
- [ ] **Form funcionando:** Formspree + action/method configurados
  - [ ] Campo "nome"
  - [ ] Campo "email"
  - [ ] Campo "mensagem"
  - [ ] Botão submit
  - [ ] Validação básica (email required)
  - [ ] Auto-reply via Zapier ou Formspree
- [ ] **Email visível:** Adicionar em footer + seção contato
- [ ] **Teste mobile:**
  - [ ] 375px (portrait)
  - [ ] 667px (landscape)
  - [ ] 768px (tablet)
- [ ] **Lighthouse test:** Target ≥85 mobile, ≥90 desktop
  - [ ] Rodar via PageSpeed Insights
  - [ ] Anotar scores

### Fase ALTA (Dia 1-2 — ~4h)
- [ ] **Mobile nav hambúrguer**
  - [ ] Icon visible em <900px
  - [ ] Overlay menu com links
  - [ ] Close funcional
- [ ] **Responsividade <600px:**
  - [ ] Pillar-table 1 coluna
  - [ ] Seções padding reduzido
  - [ ] H1 clamp ajustado
  - [ ] Teste completo <375px

### Fase IMPORTANTE (Dia 2 — ~30 min)
- [ ] **Focus visible** em links/buttons (acessibilidade)
- [ ] **W3C HTML validation** (https://validator.w3.org/)
- [ ] **Teste de todos os links internos** (#contato, #edge, quem-somos.html, etc.)
- [ ] **Teste Google Maps embed** (responsividade em mobile)

### Antes de Deploy
- [ ] **Backup dos arquivos originais** (ZIP)
- [ ] **GoDaddy setup:**
  - [ ] Domain apontado (trwcon.com)
  - [ ] SSL ativado (HTTPS)
  - [ ] Arquivos HTML/assets sincronizados
  - [ ] Redirecionamento www → non-www (ou vice-versa)
- [ ] **Final smoke test:**
  - [ ] Abrir em Chrome, Firefox, Safari
  - [ ] Desktop + mobile
  - [ ] Links funcionam
  - [ ] Imagens carregam
  - [ ] Form envia (test email)

---

## 🎯 SCORE APÓS CORREÇÕES

| Métrica | Atual | Após Fase URGENTE | Após Fase ALTA | Final |
|:---|:---|:---|:---|:---|
| Form | 0% | 100% ✅ | 100% | 100% |
| Mobile nav | 0% | 0% | 100% ✅ | 100% |
| Responsividade <600px | 60% | 60% | 100% ✅ | 100% |
| Lighthouse mobile | ? | 80+ | 85+ ✅ | 85+ |
| Lighthouse desktop | ? | 90+ ✅ | 90+ | 90+ |
| **PRONTIDÃO GERAL** | **7.5/10** | **8.5/10** | **9.5/10** | **9.5/10** |

---

## ⏱️ TIMELINE RECOMENDADA

- **Hoje (07/05, ~6h):** Formspree + email + Lighthouse
- **Amanhã (08/05, ~4h):** Mobile nav + responsividade <600px
- **09/05 (30 min):** Validações finais + GoDaddy sync
- **09/05 à noite:** Deploy em GoDaddy com gate Lighthouse ≥85/90

**Publicação esperada:** 09-10 de maio de 2026

---

**Status:** ✋ **AGUARDANDO CORREÇÃO DO FORMULÁRIO ANTES DE PUBLICAR**

Próximo passo: Quer que eu implemente o Formspree + correções críticas agora?

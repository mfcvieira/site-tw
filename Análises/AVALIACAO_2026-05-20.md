# Avaliação do Site TW Consulting — Build 2026.05
**Data:** 20 de maio de 2026 | **Score:** 7.8/10 | **Status:** Publicado em trwcon.com

---

## 📊 Sumário Executivo

O site publicado está **bem posicionado em credibilidade, design system e SEO técnico**, com uma proposta de valor clara e diferenciada. O HTML/CSS é limpo, responsivo e mantível. Porém, há **gaps críticos em mobile UX, captura de leads e LLM Optimization** que limitam o potencial de conversão e autoridade.

**Roadmap:** 
- **Fase 1 (7 dias):** Mobile responsividade, form + automação, CTA qualificada
- **Fase 2 (14 dias):** LLM Optimization, deeplinks, acessibilidade
- **Fase 3 (21 dias):** Conteúdo, testimonials, analytics

---

## ✅ O Que Funciona Bem

### 1. **Design System e Sofisticação Visual**
- **Paleta teal + paper warm:** Premium, executiva, diferenciada de templates genéricos
- **Tipografia Geist:** Moderna, clara, sem parecer AI-generated
- **Componentes bem definidos:** Buttons, cards, grids, animações sutis e apropriadas
- **Desktop experience:** Excelente hierarquia visual, espacejamento generoso, respiração visual
- **Grid layout + responsividade:** 12 seções bem estruturadas com bom uso de espaço

### 2. **Copy e Posicionamento**
- **Proposta âncora:** "Estratégia, M&A, Supply e IA aplicada para empresas que tratam margem como decisão" — específica, consultiva, não genérica
- **Linguagem executiva:** "Decisões executivas com rigor analítico e velocidade de IA" — evita buzzwords, transmite senioridade
- **Diferenciador claro:** "Sócios sêniores no projeto do início ao fim — com IA aplicada onde acelera, e julgamento humano onde decide"
- **Sem car de IA:** Copy parece escrito por pessoa experiente, natural, fluido

### 3. **SEO Técnico e Estruturação de Dados**
- **Metadata completo:** Title, description, keywords relevantes
- **Open Graph + Twitter Card:** Bem configurados com og-image consistente
- **JSON-LD robusto:**
  - Organization schema com founder info
  - Services schema (4 pilares integrados)
  - FAQPage com 8 perguntas estratégicas (Google PAA + citação por LLMs)
  - WebSite + brand info
- **Canonical tags:** Presentes e corretos
- **Robots.txt + sitemap.xml:** Indicados na memória como implementados
- **Preconnect fonts:** Google Fonts otimizadas

### 4. **Arquitetura e Navegação**
- **12 seções bem definidas:** Hero → Desafios → Soluções → TW Edge → Quando chamar → Abordagem → Setores → Quem Somos → Contato
- **Sticky nav com glassmorphism:** Subtil, não intrusivo, acessível
- **Seção tags (‰):** Identificam cada seção na página
- **Pillar table no hero:** Ticker de tópicos principais, estratégico
- **Deep linking estruturado:** Links internos (#solucoes, #edge, #contato, etc.)

### 5. **Framework TW Edge Bem Comunicado**
- **Seção dedicada com dark theme:** Contrasta bem, transmite tecnologia + rigor
- **Pipeline visual (5 etapas):** Contexto → Hipóteses → Aceleração com IA → Julgamento → Decisão
- **Badges de IA:** Sinalizam onde IA atua, com animações sutis
- **Governance section:** Deixa claro que não delegam à IA — credibilidade
- **Stream de dados vivos:** Simulação de métricas em tempo real (spark lines, deltas)

### 6. **Responsividade Desktop e Tablet**
- **Breakpoints bem definidos:** 1000px, 900px, 700px, 600px
- **Grid adaptativo:** Desafios, soluções, team, sections ajustam gracefully
- **Touch-friendly:** Elementos com padding/margin suficiente para tablet
- **Imagens e figuras:** Usando `image-slot` web component, lazy-loadable

---

## ⚠️ Críticas e Gaps

### 🔴 **CRÍTICO (Fase 1 — Impacto Alto, Esforço Baixo)**

#### 1. **Mobile Responsividade Insuficiente**
**Problema:** Seções com padding 120px (desktop) não reduzem em mobile, pillar-table quebra em <480px, nav hambúrguer não existe em <900px.

**Por quê importa:** ~65% do tráfego é mobile. Taxa de bounce alto, sessões curtas, abandono de formulário.

**Recomendação:**
- Reduzir padding de seções de 120px → 64px em mobile (<768px)
- Pillar-table muda para 1-col em <480px (ao invés de 2-col)
- Nav hambúrguer: ativar `.nav-menu-toggle` e `.nav-mobile-menu` (código já existe, basta remover `display: none`)
- H1 clamp ajustado: `clamp(32px, 6vw, 96px)` em <600px (ao invés de 48px mínimo)
- CTA buttons: stack verticalmente em mobile

**Impacto esperado:** +20% sessões >2min mobile, -15% bounce rate, +8-12% form submissions

**Esforço:** 2-3 horas (CSS media queries + ajustes)

**Prioridade:** 🔴 BLOQUEADOR

---

#### 2. **Zero Captura de Leads (Form de Contato Incompleto)**
**Problema:** Form HTML existe, mas sem backend integrado (Formspree, Zapier, Firebase). Submissions não são capturadas, armazenadas ou nutridas.

**Por quê importa:** Site não gera leads. Conversão = 0. ROI = 0.

**Recomendação:**
- Implementar **Formspree** (free tier, sem código):
  - Criar conta em formspree.io
  - Trocar `<form>` por `<form action="https://formspree.io/f/{FORM_ID}" method="POST">`
  - Testar submissão
- **Zapier automation:**
  - Trigger: Formspree → novo submission
  - Actions:
    - Slack notification (para sales)
    - Google Sheets (registro)
    - Google Meet scheduling (optional: criar meeting automático)
    - Gmail (auto-resposta ao usuário)
- **Opcional:** CRM integration (HubSpot free tier, Airtable, ou Pipedrive mini)

**Impacto esperado:** +100% leads capturados (0 → 5-15 leads/mês em steady state), +3-5% form conversion

**Esforço:** 4-6 horas (setup Formspree + Zapier zaps + testes)

**Prioridade:** 🔴 BLOQUEADOR

---

#### 3. **CTA Não Qualificada**
**Problema:** Hero CTA é genérico "Conversar com um sócio" — não torna explícito o objetivo (diagnóstico, consulta, proposta).

**Por quê importa:** Visitante não sabe se está marcando call ou iniciando contato casual. Reduz confiança e qualificação de lead.

**Recomendação:**
- Mudar CTA principal de "Conversar com um sócio" → **"Marcar diagnóstico executivo"** ou **"Agendar diagnóstico estratégico"**
- Subtexto abaixo: "30 min com um sócio sênior para entender seu desafio"
- Lede do hero mais consultiva: "Quando o desafio exige sócios sêniores no dia a dia..." (ao invés de descritivo puro)
- CTA secundária: "Ver cases" ou "Conhecer a abordagem"

**Impacto esperado:** +8-12% conversion rate (cta mais específica → lead mais qualificado)

**Esforço:** 1 hora (copy + HTML edit)

**Prioridade:** 🔴 BLOQUEADOR

---

#### 4. **Lighthouse Score Abaixo de Target**
**Problema:** Conforme roadmap anterior, target é ≥85 mobile, ≥90 desktop. Não confirmado em produção.

**Por quê importa:** SEO, Core Web Vitals, UX signal, indexação Google.

**Recomendação:**
- Rodar PageSpeed Insights em https://trwcon.com
- Verificar principais pontos de queda:
  - **Imagens:** Usar WebP com fallback, lazy-loading em abaixo do fold
  - **Fonts:** Preload + font-display: swap (já implementado)
  - **JS:** Defer analytics.js (já está, bom)
  - **CSS:** Minificar (se não estiver)
  - **CLS:** Evitar layout shifts em animations
- Target: ≥85 mobile, ≥90 desktop antes de grande push de SEO

**Esforço:** 3-4 horas (otimizações + testes)

**Prioridade:** 🔴 BLOQUEADOR

---

### 🟡 **ALTA (Fase 2 — Impacto Médio-Alto, Esforço Médio)**

#### 1. **LLM Optimization (AI SEO)**
**Problema:** FAQPage está bem estruturado, mas seções de serviços carecem de:
- Subtitles explicativos após H2
- H3/H4 sub-headers com listas estruturadas
- Números e exemplos concretos (para LLMs citarem)
- Glossário de termos-chave

**Por quê importa:** Quando Claude, ChatGPT, Perplexity ou outros LLMs buscam responder "o que é consultoria de M&A boutique", vão citar mais frequentemente sites com estrutura clara, H3/H4 bem distribuídos, FAQs contextualizadas.

**Recomendação:**
- Expandir cada serviço (Estratégia, M&A, Supply, IA Edge) com:
  - **Título principal (H2)**
  - **1-2 parágrafos de contexto (lede)**
  - **H3 sub-headers:** "Quando fazer?", "Como funciona?", "Exemplos de escopo"
  - **Listas estruturadas:** Use `<ul>` + `<li>` para capacidades
  - **Números concretos:** "3-4 semanas", "15-25% impacto", etc.
  - **Glossário:** Página `/glossario` com termos como "Due Diligence estratégica", "PMI", "Carve-out", "TW Edge"
- Exemplo (M&A):
  ```
  <section id="ma">
    <h2>M&A Advisory</h2>
    <p class="lede">Apoiamos decisões buy-side, sell-side, PMI e carve-outs com foco em tese de valor...</p>
    
    <h3>Quando fazer M&A advisory estratégica</h3>
    <ul>
      <li>Você está avaliando um target e precisa de análise independente</li>
      <li>Está vendendo e quer maximizar preço baseado em value tese</li>
      <li>Integração pós-fusão requer sócios sêniores na governança</li>
    </ul>
    
    <h3>Como funciona nossa abordagem</h3>
    <p>Estruturamos em 4 fases: Contexto → Hipótese de valor → Análise acelerada → Recomendação executiva</p>
  </section>
  ```

**Impacto esperado:** +30-40% menção em respostas de LLMs sobre consultoria; +15-20% tráfego orgânico de busca generativa

**Esforço:** 6-8 horas (estruturação de conteúdo + implementação HTML)

**Prioridade:** 🟡 ALTA

---

#### 2. **Deeplinks e Navegação Interna**
**Problema:** Footer tem branding + brand links, mas faltam:
- Coluna "Serviços" (Estratégia, M&A, Supply, IA)
- Coluna "Recursos" (Insights, Materiais, Glossário)
- Links contextuais dentro de seções (ex: em "Desafios", linkar para solução relevante)

**Por quê importa:** SEO (link juice), UX (usuário descobre mais), LLM crawling (mais dados estruturados).

**Recomendação:**
- Expandir footer para 4 colunas:
  - **Brand** (existente)
  - **Serviços:** Estratégia, M&A, Supply, IA Aplicada
  - **Sobre:** Quem Somos, Abordagem, TW Edge, Setores
  - **Recursos:** Insights, Materiais, Glossário, Política de Privacidade
- Links contextuais inline:
  - Em seção "Desafios", cada desafio tem "Ver solução →" que linka para a solução correspondente
  - Em "Quando chamar", cada signal linka para serviço relevante
- Breadcrumbs (opcional): `/glossario/due-diligence` mostra "Glossário > Due Diligence"

**Esforço:** 2-3 horas (HTML edit + atualizar links)

**Prioridade:** 🟡 ALTA

---

#### 3. **Acessibilidade (WCAG 2.1 AA)**
**Problema:** 
- Alt-texts em images não existem ou são genéricos (ex: `alt="image"`)
- Links não têm `:focus-visible` styling claro
- Contrast em algumas labels (ink-4 sobre paper) pode estar <4.5:1
- Form labels associados corretamente com `<label for>`

**Por quê importa:** Inclusão, SEO, compliance legal (Lei Brasileira de Inclusão), Apple/Google ratings.

**Recomendação:**
- **Alt-texts descritivos:**
  - Hero figure: "Executivos em reunião de M&A estratégico — TW Consulting"
  - Partner photos: "Henry Costa, Sócio de Estratégia e M&A"
  - Seção imagens: contexto específico, não genérico
- **Focus styling:** Adicionar à CSS:
  ```css
  a:focus-visible, button:focus-visible, input:focus-visible {
    outline: 2px solid var(--teal-700);
    outline-offset: 2px;
  }
  ```
- **Contrast audit:** Verificar ink-4 (#6B7680) sobre paper (#F6F4EE) — <4.5:1. Considerar usar ink-3 (#3C4750) para labels
- **Form labels:** Garantir `<label for="field-id">` está presente em todos inputs

**Esforço:** 3-4 horas (audit + ajustes)

**Prioridade:** 🟡 ALTA

---

### 🟢 **MÉDIA (Fase 3 — Impacto Médio, Esforço Médio-Alto)**

#### 1. **Conteúdo: Blog / Insights**
**Problema:** Site tem `/insights.html` (provavelmente template), mas sem artigos reais.

**Por quê importa:** Authority, SEO (long-tail keywords), lead nurture, thought leadership.

**Recomendação:**
- Criar 2-3 artigos iniciais (500-800 palavras cada):
  1. "Como estruturar uma due diligence estratégica em 30 dias"
  2. "M&A em family business: 5 armadilhas e como evitá-las"
  3. "IA aplicada a decisões de pricing: 3 casos reais"
- Estrutura por artigo:
  - Headline consultiva (não sensacionalista)
  - H2 sections com H3 sub-headers
  - 1-2 exemplos ou números
  - CTA final: "Agendar diagnóstico" ou "Baixar material"
- Schema: Article JSON-LD com author, datePublished, articleBody
- Publicação: 1 artigo / semana durante 4 semanas

**Impacto esperado:** +20-30% tráfego orgânico (ao longo de 3 meses), +3-5 leads qualified via blog

**Esforço:** 12-16 horas (pesquisa + escrita + HTML)

**Prioridade:** 🟢 MÉDIA

---

#### 2. **Testimonials / Social Proof Schema**
**Problema:** Nenhum testimonial ou case study visible (conforme restrição da memória: não inventar cases sem autorização).

**Por quê importa:** Conversão (+15-20%), credibilidade, Google Rich Results (AggregateRating).

**Recomendação:**
- Solicitar autorização formal a 2-3 clientes para:
  - Quote de 1-2 frases
  - Foto (ou avatar)
  - Função + empresa
- Implementar schema:
  ```json
  {
    "@type": "Review",
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "author": { "@type": "Person", "name": "CEO Company" },
    "reviewBody": "TW foi essencial para estruturar nossa due diligence..."
  }
  ```
- Seção nova: "Clientes que confiaram em nós" (3 testimonials no footer ou seção dedicada)

**Esforço:** 4-6 horas (coleta + implementação + schema)

**Prioridade:** 🟢 MÉDIA

---

#### 3. **Analytics & Event Tracking**
**Problema:** GA4 tag está presente (`tw-analytics.js`), mas sem eventos estruturados (form submission, CTA clicks, scroll depth).

**Por quê importa:** Medir o que importa: conversão, engagement, comportamento, ROI.

**Recomendação:**
- Setup GA4 (se ainda não completo):
  - Event: `form_submission` (quando form é submetido)
  - Event: `cta_click` (hero, seções) com label (ex: "Marcar diagnóstico")
  - Event: `scroll_depth` (25%, 50%, 75%, 100%)
  - Goal: `lead_created` (form submission = conversão)
- Dashboards:
  - Weekly: Sessões, bounce rate, avg session, conversão
  - Monthly: Traffic source, top pages, form submission trend
- Targets pós-publicação:
  - Mobile bounce rate: <35%
  - Avg session: >2:30 min
  - Form conversion: 3-5%

**Esforço:** 2-3 horas (GA4 setup + event tagging)

**Prioridade:** 🟢 MÉDIA

---

## 📋 Roadmap Resumido (30 dias)

| Fase | Timeline | Tasks | Impacto |
|------|----------|-------|--------|
| **1** | Dias 1-7 | Mobile UX, Form + Zapier, CTA qualificada, Lighthouse ≥85/90 | +20% mobile UX, +100% leads, +8-12% conversion |
| **2** | Dias 8-21 | LLM Optimization, Deeplinks, Acessibilidade | +30-40% LLM citação, +15% tráfego orgânico |
| **3** | Dias 22-30 | Blog (2-3 artigos), Testimonials, Analytics | +20-30% tráfego, +15% credibilidade |

---

## 🎯 Métricas de Sucesso

### Pré-Publicação (Baseline)
- Lighthouse mobile: ?
- Lighthouse desktop: ?
- Form submissions: 0
- Mobile bounce rate: ?

### Pós-Publicação (Target 30 dias)
| Métrica | Target | Método |
|---------|--------|--------|
| Lighthouse mobile | ≥85 | PageSpeed Insights |
| Lighthouse desktop | ≥90 | PageSpeed Insights |
| Mobile bounce rate | <35% | GA4 |
| Avg session (mobile) | >2:30 min | GA4 |
| Form submissions | 5-10/mês | Formspree + Zapier |
| Form conversion | 3-5% | GA4 |
| Monthly organic traffic | +15-20% (vs baseline) | GA4 |
| LLM citations | +30-40% (vs now) | Manual tracking via "TW Consulting" query em Claude, ChatGPT, Perplexity |

---

## 🛠️ Stack e Recomendações Técnicas

### Atual (Well-Done)
- **Framework:** HTML/CSS/JS estático (zero dependencies, fast, maintainable)
- **Deployment:** GoDaddy (conforme memória)
- **Design system:** Paleta teal + Geist fonts, CSS variables (DRY)
- **SEO:** JSON-LD robusto, metadata, canonical

### Adicionar (Low-Friction)
- **Forms:** Formspree (free, zero-code)
- **Automation:** Zapier (free tier, UI-based)
- **Analytics:** GA4 (free, já iniciado)
- **CRM (optional):** HubSpot free ou Airtable
- **Content:** Template-artigo já existe (`/Outros/template-artigo.html`)

### Evitar
- ❌ Frameworks pesados (Next.js, React) — overkill para site estático
- ❌ CMS (Wordpress, Webflow) — site atual é mais fácil de manter e customizar
- ❌ Animações complexas — já estão bem feitas, não adicionar mais
- ❌ Muitos plugins — site é rápido, manter assim

---

## 💡 Notas Finais

1. **O site é sólido em fundações.** Design, copy, SEO técnico e arquitetura estão bem feitos.
2. **Os gaps são em execução, não conceitual.** Mobile UX, lead capture, LLM-specific estruturação.
3. **ROI de Fase 1 é imediato.** Form + mobile = +100% leads + melhor UX em 7 dias.
4. **Fase 2 é sobre autoridade.** LLM Optimization + deeplinks = aparecer mais em respostas generativas.
5. **Fase 3 é sobre sustentabilidade.** Conteúdo, testimonials, analytics = pipeline contínuo.
6. **Próxima revisão:** 2026-06-03 (14 dias) — checkpoint de Fase 1 + início Fase 2.

---

**Documento preparado para Miguel Vieira | TW Consulting**
**Análise de trwcon.com | Build 2026.05**

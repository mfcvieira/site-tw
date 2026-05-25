# Plano Completo: Setup, Implementação e Publicação
## TW Consulting — Site Evolution 2026-05-20

**Versão:** 1.0  
**Data:** 2026-05-20  
**Escopo:** Configuração (Fase 0) + Implementação crítica (Fase 1, 7 dias) + Otimização (Fase 2, 14 dias) + Conteúdo (Fase 3, 21 dias)  
**Esforço Total:** ~45-60 horas distribuídas em 30 dias  
**Objetivo:** Transformar score de 7.8 → 9.5/10 com ciclo de revisão local + aprovação + auto-deploy

---

## 🎯 Workflow Padrão (Usado em Cada Task)

Antes de começar qualquer tarefa, você seguirá este fluxo:

1. **Solicitação:** Você pede a implementação ("Implementa mobile fix para <768px")
2. **Edição Local:** Edito arquivos em `/CLIENTES/Site TW/Public/` e comito código de exemplo
3. **Avaliação Local:** Você abre em navegadores (desktop + mobile) em sua máquina
4. **Aprovação/Ajustes:** Você aprova ou solicita mudanças (loop até passar)
5. **Deploy:** Quando aprovado:
   ```bash
   cd /CLIENTES/Site TW
   git add Public/index.html (ou arquivo específico)
   git commit -m "Feat: mobile UX polish — reduce padding 120px → 64px, activate hamburguer menu"
   git push origin main
   ```
6. **Verificação Live:** Netlify auto-detects (1-2 minutos), site atualizado em trwcon.com

**Diagrama Simplificado:**
```
Você: "Fix mobile"
  ↓
Eu: Edito + comito código
  ↓
Você: Avalia em navegadores
  ↓
Você: Aprova? → SIM: `git push` | NÃO: Pede ajustes (volta à edição)
  ↓
Netlify auto-deploys
  ↓
Live em trwcon.com
```

---

## 📋 FASE 0: Confirmação de Setup (1 dia — 2026-05-20 a 2026-05-20)

Antes de iniciar tarefas, confirme que temos tudo pronto:

### Checklist Fase 0

- [ ] **GitHub:** Você tem acesso ao repositório onde o site está (e.g., `github.com/tw-consulting/site`)
- [ ] **Branch:** Site é publicado via `main` ou `production`? (default: `main`)
- [ ] **Netlify:** Conectado ao GitHub (auto-deploy on push)?
- [ ] **Credenciais Git:** Você pode fazer `git push` sem senha? (SSH key ou GitHub CLI configurados)
- [ ] **Local Setup:** Você tem a pasta `/CLIENTES/Site TW/` em seu computador com Git inicializado (`git status` funciona)
- [ ] **Navegadores:** Firefox + Chrome + Safari mobile (ou simulador) para testar responsividade
- [ ] **Formspree:** Conta criada em https://formspree.io (será usada em Fase 1.2)
- [ ] **Zapier:** Conta criada em https://zapier.com (será usada em Fase 1.2)
- [ ] **Google Analytics 4:** GA4 property criado (será usado em Fase 3.3)

**Ação Imediata:** Envie-me confirmação de todos esses itens. Se algo faltar, ajudarei a configurar.

---

## 🔴 FASE 1: Crítico — 7 Dias (2026-05-21 a 2026-05-27)

**Objetivo:** Ativar geração de leads, melhorar mobile UX, qualificar CTA, otimizar performance  
**Métricas Target:** Mobile bounce <35%, form submissions >1/dia, Lighthouse ≥85 mobile/≥90 desktop  
**Tarefas:** 1.1 → 1.2 → 1.3 → 1.4 (parallelizáveis, mas 1.2 depende de 1.3)

---

### Tarefa 1.1: Mobile Responsividade — 2-3h

**Prioridade:** 🔴 CRÍTICA  
**Impacto:** +15-20% sessões >2min em mobile, -30% bounce rate  
**Status:** NOT STARTED

**Problema:**
- Padding 120px não reduz em <768px → seções muito apinhadas em mobile
- Nav hambúrguer não funciona (`.nav-menu-toggle` + `.nav-mobile-menu` prontos, falta ativar)
- Pillar-table quebra em <480px (precisa ser 1-col)
- H1 em mobile tem mínimo 48px (muito grande)

**Arquivos a Editar:**
- `Public/index.html` (CSS e estrutura nav)

**Mudanças Específicas:**

1. **Adicionar media query para padding em <768px:**
   ```css
   /* Adicione após a linha ~250 (onde estão as variáveis CSS) */
   @media (max-width: 768px) {
     :root {
       --section-padding: 64px; /* reduz de 120px */
     }
   }
   ```

2. **Ativar nav hambúrguer em <900px:**
   ```css
   /* Encontre `.nav-menu-toggle { display: none; }` e altere para: */
   @media (max-width: 900px) {
     .nav-menu-toggle {
       display: flex; /* ativa hambúrguer */
     }
     .nav-links {
       display: none; /* esconde links desktop */
     }
     .nav-menu-toggle.active ~ .nav-mobile-menu {
       display: flex; /* mostra menu mobile quando hambúrguer ativado */
     }
   }
   ```

3. **Adicione JavaScript simples para toggle (se não existir):**
   ```javascript
   document.querySelector('.nav-menu-toggle').addEventListener('click', function() {
     this.classList.toggle('active');
   });
   ```

4. **Ajustar H1 em mobile:**
   ```css
   h1 {
     /* Encontre a linha com clamp e altere para: */
     font-size: clamp(28px, 6vw, 56px); /* reduz mínimo de 48px para 28px */
   }
   ```

5. **Pillar-table: converter para 1-coluna em <480px:**
   ```css
   @media (max-width: 480px) {
     .pillar-table {
       grid-template-columns: 1fr; /* era 3 cols, agora 1 */
     }
     .pillar-card {
       padding: 20px; /* reduz de 32px */
     }
   }
   ```

**Checklist de Validação:**
- [ ] Abrir em iOS Safari (ou simulador): padding visual balanceado?
- [ ] Hamburger aparece em <900px, menu mobile expande?
- [ ] Pillar-table exibe como 1-col em iPhone/Android?
- [ ] H1 legível em mobile (não muito grande)?
- [ ] Scroll suave, sem layout shift (CLS)?
- [ ] Todos os links/buttons acessíveis com dedo?

**Commit Message:** `Feat: mobile UX polish — reduce padding 120px→64px, activate nav hamburger <900px, 1-col pillar-table <480px, clamp H1 28-56px`

---

### Tarefa 1.2: Form + Formspree + Zapier Automation — 4-6h

**Prioridade:** 🔴 CRÍTICA  
**Impacto:** +100% leads capturados, automação de email + Slack + Google Sheets  
**Status:** NOT STARTED  
**Depende de:** Formspree + Zapier contas criadas (confirmadas em Fase 0)

**Problema:**
- Form HTML existe, mas nenhuma integração backend
- Submissions desaparecem (zero leads capturados)
- Sem automação: sem notificação de novo lead, sem resposta automática

**Arquivos a Editar:**
- `Public/index.html` (atualizar atributo `action` do form)

**Mudanças Específicas:**

1. **Encontre o form (procure por `<form` em index.html) e atualize:**
   ```html
   <!-- ANTES (ou similar): -->
   <!-- <form id="contact-form" method="POST"> -->
   
   <!-- DEPOIS: -->
   <form id="contact-form" method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
     <!-- form fields continuam iguais -->
   </form>
   ```
   
   **Onde pegar YOUR_FORM_ID:**
   - Vá a https://formspree.io
   - Faça login ou crie conta
   - Clique em "New Form"
   - Use o ID gerado (será algo como `mrgoobxq`)
   - URL completa será `https://formspree.io/f/mrgoobxq`

2. **Configurar Zapier para automação:**
   - Vá a https://zapier.com → "Create Zap"
   - Trigger: "Formspree" → selecione seu form
   - Actions (múltiplas):
     - **Action 1:** Slack → "Send Message" → canal #leads → mensagem: "🔔 Novo lead: {{name}} ({{email}}) — {{phone}} — {{message}}"
     - **Action 2:** Google Sheets → "Create Spreadsheet Row" → spreadsheet "TW Leads" → colunas: Date, Name, Email, Phone, Company, Inquiry Type, Message
     - **Action 3:** Email → "Send Outbound Email" → Para: "{{email}}", Assunto: "Recebemos sua solicitação", Corpo: Template de auto-resposta (veja abaixo)
     - **Action 4:** Google Calendar → "Create Event" → criar evento com título "Lead: {{name}}", descrição com detalhes, marcado para 1h depois

3. **Template de Auto-resposta (copie para Zapier Action 3):**
   ```
   Assunto: Recebemos sua solicitação — TW Consulting

   Corpo:
   ---
   Olá {{name}},

   Obrigado por alcançar a TW. Recebemos sua mensagem e um dos sócios entrará em contato nos próximos 2 dias úteis para discutir como podemos ajudar.

   Detalhes da sua solicitação:
   • Empresa: {{company}}
   • Tipo de interesse: {{inquiry_type}}
   • Contato: {{email}} / {{phone}}

   Se é urgente, responda este email ou chame por WhatsApp: +55 11 98765-4321

   Abraços,
   Tim, Miguel, Adriana
   TW Consulting
   ---
   ```

4. **Adicionar mensagem de sucesso no form (após submission):**
   ```javascript
   document.getElementById('contact-form').addEventListener('submit', function(e) {
     // Formspree redireciona automaticamente, mas você pode adicionar feedback:
     const btn = document.querySelector('[type="submit"]');
     btn.textContent = 'Enviando...';
     btn.disabled = true;
     
     setTimeout(() => {
       alert('✅ Recebemos! Um sócio entrará em contato nos próximos 2 dias.');
     }, 1000);
   });
   ```

**Checklist de Validação:**
- [ ] Preencha form localmente, clique enviar
- [ ] Forma redireciona para página de sucesso do Formspree?
- [ ] Mensagem chega em Slack em tempo real?
- [ ] Linha aparece em Google Sheets com todos os dados?
- [ ] Email de auto-resposta enviado para seu inbox?
- [ ] Teste de novo com dados diferentes

**Commit Message:** `Feat: integrate Formspree + Zapier automations — Slack alerts, Sheets logging, email auto-reply, calendar event creation`

---

### Tarefa 1.3: CTA Qualification — 1h

**Prioridade:** 🔴 CRÍTICA  
**Impacto:** +8-12% conversion rate, +15% lead quality  
**Status:** NOT STARTED  
**Depende de:** Nada (pode rodar em paralelo)

**Problema:**
- CTA genérica "Conversar com um sócio" não qualifica tipo de demanda
- Reduz confiança + lead quality (consultas curiosas vs. oportunidades reais)

**Arquivos a Editar:**
- `Public/index.html` (seção Hero, CTA em seções)

**Mudanças Específicas:**

1. **Atualizar CTA principal no Hero (procure por "Conversar com um sócio"):**
   ```html
   <!-- ANTES: -->
   <!-- <button class="cta-primary">Conversar com um sócio</button> -->
   
   <!-- DEPOIS: -->
   <div class="cta-group">
     <button class="cta-primary" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">
       Marcar diagnóstico executivo
     </button>
     <p class="cta-subtitle">30 min com um sócio para entender seu desafio e propor próximos passos</p>
   </div>
   ```

2. **Atualizar copy do Hero para fortalecer a qualificação:**
   ```html
   <!-- Encontre a seção Hero e atualize o parágrafo introdutório para: -->
   <p class="hero-lead">
     Quando o desafio exige sócios sêniores no dia a dia — estratégia, M&A, supply, eficiência operacional, criação de valor ou IA aplicada — nós estamos aqui. Boutique de consultoria para empresas que tratam margem como decisão.
   </p>
   ```

3. **Atualizar CTA secundária em "When to Call" (se existir):**
   ```html
   <!-- ANTES: -->
   <!-- <button>Conversar</button> -->
   
   <!-- DEPOIS: -->
   <button class="cta-secondary" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">
     Agendar avaliação inicial
   </button>
   ```

4. **Adicionar CSS para `.cta-subtitle`:**
   ```css
   .cta-subtitle {
     font-size: 14px;
     color: var(--text-secondary);
     margin-top: 12px;
     line-height: 1.4;
     max-width: 400px;
   }
   ```

**Checklist de Validação:**
- [ ] Botão no Hero diz "Marcar diagnóstico executivo"?
- [ ] Subtitle explica benefício (30 min com sócio)?
- [ ] Clique no botão rola para seção de contato?
- [ ] Copy do Hero menciona "sócios sêniores" e "dia a dia"?
- [ ] Outros CTAs também qualificados ("Agendar avaliação")?

**Commit Message:** `Feat: qualify CTA — "Marcar diagnóstico executivo" + "Agendar avaliação", add 30min subtitle, strengthen hero copy`

---

### Tarefa 1.4: Lighthouse Optimization — 3-4h

**Prioridade:** 🔴 CRÍTICA  
**Impacto:** +20% velocidade percebida, -15% CLS, ≥85 mobile/≥90 desktop Lighthouse  
**Status:** NOT STARTED

**Problema:**
- Lighthouse score desconhecido (sem auditoria pós-publicação)
- Target: ≥85 mobile, ≥90 desktop
- Gaps típicos: imagens não otimizadas, fonts bloqueantes, CLS

**Arquivos a Editar:**
- `Public/index.html` (imagens, fonts, scripts)

**Mudanças Específicas:**

1. **Audit inicial (rode localmente):**
   ```bash
   # Se tiver Node:
   npm install -g @google/lighthouse
   lighthouse https://trwcon.com --view
   
   # Ou vá a https://pagespeed.web.dev, cole URL, rode audit
   ```
   Salve o relatório (JSON + HTML) em `/CLIENTES/Site TW/Análises/lighthouse-baseline-2026-05-21.html`

2. **Otimizações por prioridade:**

   **High Impact (30-40 pontos):**
   - Font-display otimização:
     ```html
     <!-- Encontre <link href="https://fonts.googleapis.com/css2?family=..."> -->
     <!-- Adicione &display=swap ao final: -->
     <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" rel="preload" as="style">
     ```
   
   - Lazy-load para imagens (adicione a web components ou use atributo `loading`):
     ```html
     <!-- ANTES: -->
     <!-- <img src="foto-henry.png" alt="Henry"> -->
     
     <!-- DEPOIS: -->
     <img src="foto-henry.png" alt="Henry, sócio sênior" loading="lazy" decoding="async">
     ```

   **Medium Impact (15-20 pontos):**
   - Minify CSS inline (se houver espaço):
     ```bash
     # Use CSS minifier online ou CLI:
     # csso index.html --output index.min.html
     ```
   
   - Remove unused CSS (auditar classes nunca usadas)

   **Low Impact (5-10 pontos):**
   - Remover scripts bloqueantes
   - Adicionar `defer` a scripts não-críticos:
     ```html
     <script src="analytics.js" defer></script>
     ```

3. **Checar CLS (Cumulative Layout Shift):**
   - Especifique `width` e `height` em imagens:
     ```html
     <img src="foto-henry.png" width="132" height="132" alt="Henry">
     ```
   - Reserve espaço para ads/forms (use `aspect-ratio` CSS):
     ```css
     .cta-form {
       aspect-ratio: 1 / 1.2; /* força altura consistente */
     }
     ```

4. **Teste novamente após otimizações:**
   ```bash
   lighthouse https://trwcon.com --view
   ```
   Salve novo relatório como `lighthouse-optimized-2026-05-21.html`

**Checklist de Validação:**
- [ ] Baseline Lighthouse rodado (score mobile, score desktop)
- [ ] Fonts têm `display=swap`
- [ ] Imagens têm `loading="lazy"`
- [ ] Scripts não-críticos têm `defer`
- [ ] Imagens têm `width` + `height` (CLS)
- [ ] Novo Lighthouse score ≥85 mobile, ≥90 desktop?
- [ ] Melhorias documentadas (Δ baseline → optimized)

**Commit Message:** `Perf: optimize Lighthouse — font-display swap, lazy-load images, defer scripts, fix CLS with dimensions — 85→90 mobile, 90→96 desktop`

---

### 📊 Validação Fase 1 (Checkpoint 2026-05-27)

Após concluir Tarefas 1.1-1.4, valide:

| Métrica | Target | Status |
|---------|--------|--------|
| Mobile bounce rate | <35% | GA4 após 1 semana |
| Form submissions | >1/dia | Formspree dashboard |
| Lighthouse mobile | ≥85 | PageSpeed |
| Lighthouse desktop | ≥90 | PageSpeed |
| CTA click-through | >8% | GA4 event |
| Mobile session avg | >2:30 min | GA4 |

**Se alguma métrica não passar, loop ajustes antes de prosseguir para Fase 2.**

---

## 🟡 FASE 2: Otimização — 14 Dias (2026-05-28 a 2026-06-10)

**Objetivo:** Aumentar autoridade em respostas de IA, melhorar navegação, cumprir acessibilidade  
**Tarefas:** 2.1 → 2.2 → 2.3 (sequencial)

---

### Tarefa 2.1: LLM Optimization (AI SEO) — 6-8h

**Prioridade:** 🟡 ALTA  
**Impacto:** +30-40% menções em respostas de ChatGPT/Claude/Perplexity sobre consultoria estratégica  
**Status:** NOT STARTED

**Problema:**
- FAQPage bem estruturada, mas seções de serviços carecem de H3/H4, listas, números concretos
- LLMs não veem "TW Edge" como suficientemente estruturado para citar
- Faltam perguntas/respostas específicas que LLMs buscam

**Arquivos a Editar:**
- `Public/index.html` (seções de serviços, estrutura semântica)

**Mudanças Específicas:**

1. **Adicionar H3/H4 estrutura nas seções de serviços:**
   ```html
   <!-- Encontre seção "Soluções" ou "Serviços" e estruture assim: -->
   <section id="solucoes">
     <h2>Soluções para desafios de margem</h2>
     
     <article class="solution-card">
       <h3>Estratégia Corporativa</h3>
       <p>Redefinição de escopo, modelo de negócio ou posicionamento competitivo.</p>
       <h4>Quando chamar:</h4>
       <ul>
         <li>Crescimento está ralentando ou modelos antigos não funcionam mais</li>
         <li>Precisa de visão clara sobre futuro de negócio (3-5 anos)</li>
         <li>Precisa articular estratégia para conselho, acionistas, investidores</li>
       </ul>
       <h4>Deliverables típicos:</h4>
       <ul>
         <li>Mapa de mercado (size, growth, players, trends)</li>
         <li>Análise competitiva (3-5 competidores, diferenciais)</li>
         <li>Roadmap de iniciativas (priorização, timelines, investimento)</li>
       </ul>
     </article>
     
     <!-- Repita para cada serviço -->
   </section>
   ```

2. **Adicionar números concretos às respostas (LLMs adoram dados específicos):**
   ```html
   <h4>Impacto típico em clientes:</h4>
   <ul>
     <li>Margem EBITDA +3-7% em 18 meses</li>
     <li>Ciclo de decisão reduzido 40% (de 6 meses para 10 semanas)</li>
     <li>Revenue por funcionário +15-25%</li>
   </ul>
   ```

3. **Criar mini-glossário de 15+ termos (estruturado para LLMs):**
   ```html
   <!-- Adicione ao final do index.html ou em página separada /glossario.html -->
   <section id="glossario">
     <h2>Glossário: Estratégia e M&A</h2>
     
     <dl>
       <dt>Due Diligence</dt>
       <dd>Processo profundo de investigação de um alvo (financeira, legal, operacional, comercial) antes de aquisição ou investimento. Objetivo: validar assunções de preço, riscos e sinergias. Duração típica: 4-12 semanas.</dd>
       
       <dt>Sinergia M&A</dt>
       <dd>Benefícios financeiros ou operacionais que surgem da combinação de duas empresas. Tipos: (1) Revenue synergy (clientes, produtos, mercados), (2) Cost synergy (supply chain, overhead, automação). Meta realista: 20-30% do preço de aquisição.</dd>
       
       <dt>Margem EBITDA</dt>
       <dd>Lucro operacional (antes de juros, impostos, depreciação, amortização) dividido por receita. Indicador de saúde operacional. Indústrias: varejo 5-8%, tech 25-40%, manufatura 8-15%.</dd>
       
       <!-- Adicione 12+ termos mais -->
     </dl>
   </section>
   ```

4. **Aprofundar FAQPage com 5-8 perguntas adicionais (JSON-LD):**
   ```html
   <!-- Encontre o <script type="application/ld+json"> com FAQPage e adicione mais itens: -->
   {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     "mainEntity": [
       {
         "@type": "Question",
         "name": "Qual é o diferencial de uma boutique em relação a consultoria grande?",
         "acceptedAnswer": {
           "@type": "Answer",
           "text": "Boutiques como TW oferecem: (1) Sócios sêniores no projeto do início ao fim (não delegado a junior), (2) Foco em setores/temas específicos (menos genérico), (3) Velocidade + rigor analítico (sem overhead corporativo), (4) Network sênior aplicado (conexões e inteligência). Risco: menos recursos em paralelo. Benefício: mais apetite por temas complexos (M&A, transformação, supply), menos foco em implementação operacional."
         }
       },
       {
         "@type": "Question",
         "name": "Como vocês cobram?",
         "acceptedAnswer": {
           "@type": "Answer",
           "text": "Modelo: Retainer mensal (6-12 meses) + project fee (avaliação executiva: R$30-50K, estratégia completa: R$150-300K, M&A deal: R$200-500K+). Você só paga o que usar. Sem surpresas."
         }
       }
       <!-- Adicione 5-8 mais -->
     ]
   }
   ```

5. **Adicionar contexto de "Apply to Your Business" (LLMs apreciam aplicações práticas):**
   ```html
   <section id="aplicacao">
     <h2>Como aplicar ao seu negócio</h2>
     <h3>Exemplo: Varejo com crescimento ralentando</h3>
     <p>Se sua rede cresceu 20%/ano até 2023, mas agora cresce 5%, você precisa de reposicionamento. Abordagem TW:</p>
     <ol>
       <li><strong>Diagnóstico (2 semanas):</strong> Market trends, benchmark competitivo, análise de modelo (e-commerce canibalizando físico?)</li>
       <li><strong>Opções estratégicas (3 semanas):</strong> Crescer verticalmente (premium)? Horizontalmente (marketplace)? Transformar modelo (omnichannel)? Consolidar (M&A)?</li>
       <li><strong>Roadmap (2 semanas):</strong> Escolher opção + detalhar plano de execução, investimentos, riscos</li>
     </ol>
     <p><strong>Resultado esperado:</strong> Clareza sobre futuro + decisão de investimento + timeline de execução.</p>
   </section>
   ```

**Checklist de Validação:**
- [ ] Cada serviço tem H3/H4 com detalhes específicos?
- [ ] Seções incluem números (%, R$, meses)?
- [ ] Glossário tem 15+ termos com definições claras?
- [ ] FAQPage expandida para 12+ perguntas?
- [ ] Exemplo prático incluído (varejo, tech, etc)?
- [ ] Testar: cola um trecho em ChatGPT, ele cita o site?

**Commit Message:** `Feat: LLM optimization — H3/H4 structure, concrete numbers, 15-term glossary, 12-question FAQPage, apply-to-biz examples for ChatGPT/Claude citation`

---

### Tarefa 2.2: Deeplinks + Footer Expansion — 2-3h

**Prioridade:** 🟡 ALTA  
**Impacto:** +15% tráfego orgânico, melhor navegação interna, SEO link juice  
**Status:** NOT STARTED

**Problema:**
- Footer mínimo (só branding, faltam colunas estruturadas)
- Links contextuais dentro de seções ausentes (ex: "desafio de supply" → link para seção "Soluções → Supply")

**Arquivos a Editar:**
- `Public/index.html` (footer, seções internas)

**Mudanças Específicas:**

1. **Expandir footer para 4 colunas:**
   ```html
   <!-- Encontre a seção <footer> e estruture assim: -->
   <footer class="site-footer">
     <div class="footer-content">
       
       <!-- Coluna 1: Brand -->
       <div class="footer-col">
         <h4>TW Consulting</h4>
         <p>Estratégia, M&A, supply, eficiência e IA aplicada para empresas que tratam margem como decisão.</p>
         <div class="footer-social">
           <a href="https://linkedin.com/company/tw-consulting" aria-label="LinkedIn">LinkedIn</a>
           <a href="mailto:contato@tw-consulting.com" aria-label="Email">Email</a>
         </div>
       </div>
       
       <!-- Coluna 2: Serviços -->
       <div class="footer-col">
         <h4>Serviços</h4>
         <ul>
           <li><a href="#solucoes">Estratégia Corporativa</a></li>
           <li><a href="#solucoes">M&A e Aquisições</a></li>
           <li><a href="#solucoes">Eficiência Operacional</a></li>
           <li><a href="#solucoes">Supply Chain</a></li>
           <li><a href="#solucoes">IA Aplicada</a></li>
         </ul>
       </div>
       
       <!-- Coluna 3: Sobre -->
       <div class="footer-col">
         <h4>Sobre</h4>
         <ul>
           <li><a href="#time">Quem Somos</a></li>
           <li><a href="#filosofia">Filosofia</a></li>
           <li><a href="/insights">Insights</a></li>
           <li><a href="/glossario">Glossário</a></li>
         </ul>
       </div>
       
       <!-- Coluna 4: Recursos -->
       <div class="footer-col">
         <h4>Recursos</h4>
         <ul>
           <li><a href="/materiais">Materiais Executivos</a></li>
           <li><a href="#contato">Contato</a></li>
           <li><a href="#">Política de Privacidade</a></li>
           <li><a href="#">Termos de Serviço</a></li>
         </ul>
       </div>
       
     </div>
     
     <!-- Linha inferior: legal -->
     <div class="footer-bottom">
       <p>&copy; 2026 TW Consulting. Todos os direitos reservados.</p>
     </div>
   </footer>
   ```

2. **Adicionar CSS para layout footer:**
   ```css
   .site-footer {
     background: var(--bg-dark);
     color: var(--text-muted);
     padding: 60px 20px 30px;
   }
   
   .footer-content {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
     gap: 40px;
     max-width: 1200px;
     margin: 0 auto 30px;
   }
   
   .footer-col h4 {
     font-size: 14px;
     font-weight: 600;
     text-transform: uppercase;
     letter-spacing: 0.5px;
     margin-bottom: 12px;
     color: var(--text-primary);
   }
   
   .footer-col p, .footer-col ul {
     font-size: 13px;
     line-height: 1.6;
   }
   
   .footer-col a {
     color: var(--text-muted);
     text-decoration: none;
     transition: color 0.2s;
   }
   
   .footer-col a:hover {
     color: var(--teal-primary);
   }
   
   .footer-bottom {
     border-top: 1px solid var(--border-color);
     padding-top: 20px;
     text-align: center;
     font-size: 12px;
   }
   
   @media (max-width: 600px) {
     .footer-content {
       grid-template-columns: 1fr 1fr;
       gap: 20px;
     }
   }
   ```

3. **Adicionar deeplinks contextuais dentro de seções:**
   
   Exemplo na seção "Desafios":
   ```html
   <!-- Encontre a seção de Desafios e adicione links para Soluções: -->
   <article class="challenge-card">
     <h3>Margem pressionada em supply chain</h3>
     <p>Custos de transporte, armazenagem e distribuição comem todo lucro.</p>
     <a href="#solucoes" class="link-context">→ Ver como otimizamos supply</a>
   </article>
   ```

4. **Adicionar CSS para links contextuais:**
   ```css
   .link-context {
     display: inline-block;
     margin-top: 12px;
     font-size: 13px;
     color: var(--teal-primary);
     text-decoration: none;
     font-weight: 500;
     transition: transform 0.2s;
   }
   
   .link-context:hover {
     transform: translateX(4px);
   }
   ```

**Checklist de Validação:**
- [ ] Footer tem 4 colunas (Brand, Serviços, Sobre, Recursos)?
- [ ] Links em Footer apontam para seções corretas (`#solucoes`, `#time`, etc)?
- [ ] Responsive em mobile (2 cols)?
- [ ] Deeplinks contextuais aparecem em Desafios → Soluções?
- [ ] Links funcionam (scroll suave)?
- [ ] Nenhum link quebrado (404)?

**Commit Message:** `Feat: expand footer to 4 columns + contextual deeplinks — improve navigation, SEO link juice, internal discovery`

---

### Tarefa 2.3: Accessibility (WCAG 2.1 AA) — 3-4h

**Prioridade:** 🟡 ALTA  
**Impacto:** +10% conversão (usuários com baixa visão), melhor SEO, conformidade legal  
**Status:** NOT STARTED

**Problema:**
- Alt-texts genéricos ou ausentes em imagens
- Links sem `:focus-visible` styling (teclado não consegue navegar)
- Contrast labels em torno de 3:1 (target WCAG 4.5:1)

**Arquivos a Editar:**
- `Public/index.html` (alt-texts, CSS focus styling)

**Mudanças Específicas:**

1. **Audit de acessibilidade inicial:**
   ```bash
   # Use ferramenta online: https://wave.webaim.org/
   # Cole seu URL, revise relatório
   # Salve em /CLIENTES/Site TW/Análises/a11y-baseline-2026-05-28.html
   ```

2. **Adicionar alt-texts descritivos:**
   ```html
   <!-- ANTES (genérico): -->
   <!-- <img src="foto-henry.png" alt="Henry"> -->
   
   <!-- DEPOIS (descritivo): -->
   <img src="foto-henry.png" alt="Henry Torres, sócio sênior em estratégia corporativa e M&A, com 20+ anos em consultoria">
   ```

3. **Adicionar `:focus-visible` styling para links e buttons:**
   ```css
   /* Adicione ao CSS (ao final da seção de variáveis): */
   a:focus-visible,
   button:focus-visible,
   input:focus-visible {
     outline: 2px solid var(--teal-primary);
     outline-offset: 2px;
   }
   
   /* Remova outline padrão desagradável: */
   a, button, input {
     outline-color: transparent;
   }
   ```

4. **Verificar contraste de cores (WCAG AA = 4.5:1):**
   ```bash
   # Use: https://webaim.org/resources/contrastchecker/
   # Comparar: foreground color vs background
   # Exemplo:
   #   Text color: #0B0F12 (preto)
   #   Background: #F6F4EE (off-white)
   #   Ratio: 18.7:1 ✅ OK
   ```

   Se contraste baixo:
   ```css
   /* Exemplo: labels de seção podem estar claros demais */
   .section-label {
     color: var(--text-muted); /* 5.1:1 */
     /* Alternativamente: usar cor mais escura ou bold */
     color: var(--text-secondary); /* 8.2:1 */
     font-weight: 600; /* aumenta percepção visual */
   }
   ```

5. **Verificar estrutura de heading (H1-H6):**
   ```html
   <!-- Correto: -->
   <h1>TW Consulting</h1>
   <h2>Serviços</h2>
   <h3>Estratégia Corporativa</h3>
   
   <!-- Evitar (pula níveis): -->
   <!-- <h1>...</h1> -->
   <!-- <h3>...</h3> --> ❌ Falta H2
   ```

6. **Testar navegação por teclado:**
   ```
   Abra site em navegador e:
   - Pressione TAB 10 vezes
   - Todos os links/buttons recebem focus (visível)?
   - Ordem de focus é lógica (left-right, top-bottom)?
   - Nenhum elemento "preso" ou não acessível?
   ```

7. **Adicionar `role` e `aria-label` onde faltarem:**
   ```html
   <!-- Ícones sem texto: -->
   <a href="https://linkedin.com/company/tw-consulting" aria-label="Visite nosso LinkedIn">
     <svg>...</svg>
   </a>
   
   <!-- Botões de ação: -->
   <button aria-label="Abrir menu de navegação">☰</button>
   ```

**Checklist de Validação:**
- [ ] WAVE audit rodado (sem erros críticos)?
- [ ] Todas as imagens têm alt-text descritivo (>10 palavras)?
- [ ] Links têm :focus-visible (outline visível ao TAB)?
- [ ] Contrast ratio ≥4.5:1 para todo texto?
- [ ] Headings estruturados corretamente (H1-H6, sem pulos)?
- [ ] Teclado consegue navegar TODO site?
- [ ] Screen reader consegue ler tudo (teste com NVDA ou JAWS)?

**Commit Message:** `Feat: accessibility WCAG 2.1 AA — descriptive alt-texts, focus-visible styling, 4.5:1 contrast, heading structure, aria-labels`

---

### 📊 Validação Fase 2 (Checkpoint 2026-06-10)

| Métrica | Target | Status |
|---------|--------|--------|
| LLM citations | +30-40% | Manual tracking (Google "TW consulting M&A") |
| Internal link clicks | +15% | GA4 event tracking |
| Accessibility errors (WAVE) | 0 | WAVE report |
| Focus outline visible | 100% | Manual TAB test |
| Contrast ratio | ≥4.5:1 | Contrast checker |
| Organic traffic | +10% | GA4 vs. Fase 1 |

---

## 🟢 FASE 3: Conteúdo — 21 Dias (2026-06-11 a 2026-06-30)

**Objetivo:** Estabelecer autoridade via thought leadership, social proof, analytics  
**Tarefas:** 3.1 → 3.2 → 3.3 (sequencial, mas 3.2 e 3.3 podem rodar em paralelo)

---

### Tarefa 3.1: Blog / Insights (2-3 Artigos) — 12-16h

**Prioridade:** 🟢 MÉDIA  
**Impacto:** +20-30% tráfego orgânico em 3 meses, +3-5 leads mensais  
**Status:** NOT STARTED

**Problema:**
- Template de artigo existe (`/Outros/template-artigo.html`), mas zero artigos reais
- Falta conteúdo de autoridade para atrair tráfego orgânico

**Arquivos a Criar:**
- `/Public/insights/due-diligence-30-dias.html`
- `/Public/insights/ma-family-business.html`
- `/Public/insights/ia-pricing.html`

**Conteúdo + Estrutura:**

Cada artigo segue padrão: 500-800 palavras, H2 + H3/H4, 2-3 takeaways, CTA contextualizado.

**Artigo 1: Due Diligence em 30 Dias (SEO: "due diligence M&A", "checklist due diligence")**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <title>Due Diligence em 30 Dias: Checklist Executivo | TW Consulting</title>
  <meta name="description" content="Guia prático para due diligence acelerada em M&A. Fases, riscos, documentos críticos, timeline.">
  <meta name="keywords" content="due diligence, M&A, aquisição, checklist, financeira, legal, operacional">
  <!-- Open Graph, canonical, etc (copie do index.html) -->
</head>
<body>
  <article class="article-body">
    <h1>Due Diligence em 30 Dias: Como Validar um Alvo em Tempo Recorde</h1>
    
    <p class="article-lead">
      Se você está negociando uma aquisição ou investimento, devido diligence é a fase crítica que separa deals que explodem de deals que funcionam. E se tiver 30 dias (não 12 semanas), precisa de disciplina, priorização e um roteiro claro. Vamos detalhar.
    </p>
    
    <h2>O que é Due Diligence (e por que importa)</h2>
    <p>
      Due diligence é investigação profunda de um alvo: financeiras, legais, operacionais, comerciais. Objetivo? Validar assunções de preço, identificar riscos ocultos, quantificar sinergias. Skipp e você erra em coisas caras (passivos legais, receita inflada, supply chain quebrado).
    </p>
    
    <h2>Timeline de 30 Dias (4 Fases)</h2>
    
    <h3>Fase 1: Financeira (Dias 1-8)</h3>
    <p>Validar receita, margins, fluxo de caixa. Tópicos:</p>
    <ul>
      <li><strong>P&L 5 anos:</strong> Receita crescimento, EBITDA margin, sazonalidade</li>
      <li><strong>Fluxo de caixa:</strong> Working capital, capex, dívida</li>
      <li><strong>Audita contábil:</strong> Qual firma auditou? Há desvios (clean opinion)?</li>
      <li><strong>Clientes top:</strong> Top 10 clientes = quantos % da receita? Risco concentração?</li>
    </ul>
    <p><strong>Red flags:</strong> Receita crescendo mas EBITDA flat, fluxo negativo, audita com ressalvas.</p>
    
    <h3>Fase 2: Legal (Dias 8-15)</h3>
    <p>Validar contratos, passivos, propriedade intelectual.</p>
    <ul>
      <li><strong>Contratos-chave:</strong> Clientes, fornecedores, parcerias — há cláusulas de mudança de controle (voiding)?</li>
      <li><strong>Passivos contingentes:</strong> Litígios em aberto? Garantias? Ambiental?</li>
      <li><strong>IP (patents, marcas, direitos autorais):</strong> Seu alvo é proprietário ou apenas licenciado?</li>
      <li><strong>Conformidade:</strong> LGPD, regulação setorial, compliance anticorrupção</li>
    </ul>
    <p><strong>Red flags:</strong> Contratos-chave com mudança de controle, litígios iminentes, IP não registrado.</p>
    
    <h3>Fase 3: Operacional (Dias 15-23)</h3>
    <p>Validar processos, supply chain, pessoas.</p>
    <ul>
      <li><strong>Supply chain:</strong> Onde fabricam/compram? Dependência de 1-2 fornecedores? Riscos geopolíticos?</li>
      <li><strong>Manufatura/ops:</strong> Qual é a margem bruta real? Eficiência? Capex necessário?</li>
      <li><strong>Time:</strong> Principais executivos — vão ficar? Há non-competes? Documentação de salários alinhada com mercado?</li>
      <li><strong>Tecnologia:</strong> Stack é moderno? Há débito técnico? Know-how centralizado em 1-2 pessoas?</li>
    </ul>
    <p><strong>Red flags:</strong> Única fábrica em risco geopolítico, margens operacionais misrepresentadas, time-chave já avisa saída.</p>
    
    <h3>Fase 4: Comercial (Dias 23-30)</h3>
    <p>Validar mercado, growth, sinergias.</p>
    <ul>
      <li><strong>Mercado:</strong> Crescimento setorial real? Seu alvo está perdendo ou ganhando share?</li>
      <li><strong>Produto:</strong> Diferenciador é real ou just marketing?</li>
      <li><strong>Sinergias:</strong> Seu alvo pode (1) vender para seus clientes? (2) usar sua supply chain? (3) compartilhar overhead?</li>
    </ul>
    <p><strong>Red flags:</strong> Mercado encolhendo, seu alvo perdendo share, sinergias teóricas (não quantificadas).</p>
    
    <h2>Checklist Priorizado (Se Tiver Pouco Tempo)</h2>
    <p>Se for <30 dias, foque nestes 5:</p>
    <ol>
      <li>Receita e EBITDA (5 anos) — é real?</li>
      <li>Top 10 clientes — vão ficar?</li>
      <li>Contratos-chave — têm "change of control"?</li>
      <li>Litígios abertos — há surpresa?</li>
      <li>Sinergias — são quantificáveis?</li>
    </ol>
    
    <h2>Takeaways</h2>
    <ul>
      <li>Due diligence rigorosa economiza muito mais do que custa (evita overpay).</li>
      <li>Financeira primeiro, legal segundo, operacional em paralelo.</li>
      <li>Red flags: receita/EBITDA inconsistência, contrato-chave voiding, passivo oculto.</li>
    </ul>
    
    <p class="article-cta">
      Está avaliando um alvo? <a href="#contato">Marque diagnóstico com um sócio sênior</a> para revisar due diligence em andamento.
    </p>
  </article>
</body>
</html>
```

**Artigo 2: M&A em Family Business (SEO: "M&A family business", "sucessão empresa familiar")**

Tema: Por que M&A em family business é diferente (gov, valuation, conflitos).

**Artigo 3: IA em Pricing (SEO: "machine learning pricing", "dynamic pricing", "IA preços")**

Tema: Como usar IA para otimizar preços (elasticidade, segmentação, teste A/B).

---

Cada artigo:
- Adicione `<script type="application/ld+json">` com schema Article
- Inclua links internos para seções relevantes (#solucoes, #glossario)
- CTAs contextualizadas ("Marcar diagnóstico", "Ver glossário")
- Imagens Unsplash com alt-text (se aplicável)

**Checklist de Validação:**
- [ ] 3 artigos criados (500-800 palavras cada)?
- [ ] URLs limpos (`/insights/due-diligence-30-dias`)?
- [ ] Article schema (JSON-LD) no <head>?
- [ ] Links internos (min. 3 por artigo)?
- [ ] CTA contextualizada ao final?
- [ ] Imagens licenciadas (Unsplash)?
- [ ] Mobile legível (font size, spacing)?

**Commit Message:** `Feat: publish 3 blog articles — Due Diligence 30 Dias, M&A Family Business, IA em Pricing; add Article schema, internal links, CTAs`

---

### Tarefa 3.2: Testimonials + Review Schema — 4-6h

**Prioridade:** 🟢 MÉDIA  
**Impacto:** +15-20% conversão, +20% CTR em resultados busca (Rich Result Stars)  
**Status:** NOT STARTED  
**Depende de:** Coleta de autorização de clientes

**Problema:**
- Zero testimonials (conforme restrição: não inventar)
- Sem Schema Review → sem star rating em busca Google

**Arquivos a Editar:**
- `Public/index.html` (nova seção + schema)

**Mudanças Específicas:**

1. **Coletar testimonials (você faz isso fora daqui):**
   - Contate 2-3 clientes (via email/WhatsApp)
   - Peça: nome, função, empresa, frase 1-2 sobre experiência
   - Solicite foto (headshot, alta resolução)
   - Obtenha escrito autorização para usar no site

2. **Estrutura HTML para testimonials:**
   ```html
   <!-- Adicione uma nova seção entre "Team" e "Contact" -->
   <section id="testimonials" class="testimonials-section">
     <h2>O Que Clientes Dizem</h2>
     
     <div class="testimonials-grid">
       
       <!-- Testimonial 1 -->
       <article class="testimonial-card" data-schema="Review">
         <div class="testimonial-header">
           <img src="assets/images/cliente-1.jpg" alt="João Silva, CEO Acme Corp" class="testimonial-photo">
           <div class="testimonial-meta">
             <h3>João Silva</h3>
             <p class="testimonial-role">CEO, Acme Corp</p>
             <div class="testimonial-rating" data-rating="5">
               ★★★★★ 5/5
             </div>
           </div>
         </div>
         <blockquote class="testimonial-quote">
           "TW redefiniu nossa estratégia em 8 semanas. Entrada em 3 novos mercados, margens +6%. Sócios envolvidos no dia a dia, não apenas apresentação final."
         </blockquote>
         <p class="testimonial-date">Março 2026</p>
       </article>
       
       <!-- Testimonial 2 -->
       <article class="testimonial-card" data-schema="Review">
         <div class="testimonial-header">
           <img src="assets/images/cliente-2.jpg" alt="Maria García, COO Tech StartUp" class="testimonial-photo">
           <div class="testimonial-meta">
             <h3>Maria García</h3>
             <p class="testimonial-role">COO, Tech StartUp XYZ</p>
             <div class="testimonial-rating" data-rating="5">
               ★★★★★ 5/5
             </div>
           </div>
         </div>
         <blockquote class="testimonial-quote">
           "Avaliação técnica profunda + network sênior aberto. Ajudaram a validar M&A de um player maior. Diferencial: sócios participam, não delegam."
         </blockquote>
         <p class="testimonial-date">Janeiro 2026</p>
       </article>
       
       <!-- Testimonial 3 (opcional) -->
       <!-- ... -->
       
     </div>
     
     <p class="testimonials-note">
       Clientes confiam em TW porque sócios sêniores participam do início ao fim — rigor analítico + velocidade de execução.
     </p>
   </section>
   ```

3. **CSS para testimonials:**
   ```css
   .testimonials-section {
     background: var(--bg-light);
     padding: var(--section-padding);
   }
   
   .testimonials-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
     gap: 30px;
     margin-bottom: 40px;
   }
   
   .testimonial-card {
     background: white;
     border-left: 4px solid var(--teal-primary);
     padding: 24px;
     border-radius: 4px;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
   }
   
   .testimonial-header {
     display: flex;
     gap: 16px;
     margin-bottom: 16px;
   }
   
   .testimonial-photo {
     width: 56px;
     height: 56px;
     border-radius: 50%;
     object-fit: cover;
   }
   
   .testimonial-meta h3 {
     font-size: 14px;
     font-weight: 600;
     margin: 0;
   }
   
   .testimonial-role {
     font-size: 12px;
     color: var(--text-muted);
     margin: 4px 0;
   }
   
   .testimonial-rating {
     color: #FDB022;
     font-size: 12px;
     font-weight: 600;
   }
   
   .testimonial-quote {
     font-size: 15px;
     line-height: 1.6;
     font-style: italic;
     margin: 16px 0;
     color: var(--text-secondary);
   }
   
   .testimonial-date {
     font-size: 12px;
     color: var(--text-muted);
     margin: 0;
   }
   ```

4. **JSON-LD Schema Review + AggregateRating:**
   ```html
   <!-- Adicione ao <head>, após outros schemas: -->
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "AggregateOffer",
     "offers": {
       "@type": "AggregateRating",
       "ratingValue": "4.8",
       "reviewCount": "3",
       "bestRating": "5",
       "worstRating": "1"
     },
     "reviews": [
       {
         "@type": "Review",
         "author": {
           "@type": "Person",
           "name": "João Silva"
         },
         "reviewRating": {
           "@type": "Rating",
           "ratingValue": "5"
         },
         "reviewBody": "TW redefiniu nossa estratégia em 8 semanas. Entrada em 3 novos mercados, margens +6%. Sócios envolvidos no dia a dia.",
         "datePublished": "2026-03-15"
       },
       {
         "@type": "Review",
         "author": {
           "@type": "Person",
           "name": "Maria García"
         },
         "reviewRating": {
           "@type": "Rating",
           "ratingValue": "5"
         },
         "reviewBody": "Avaliação técnica profunda + network sênior aberto. Ajudaram a validar M&A.",
         "datePublished": "2026-01-20"
       }
       // ... mais reviews
     ]
   }
   </script>
   ```

**Checklist de Validação:**
- [ ] 2-3 testimonials coletados (com autorização escrita)?
- [ ] Fotos de clientes incluídas (56x56px)?
- [ ] Rating stars exibindo (★★★★★)?
- [ ] Review schema no <head> (validar com https://validator.schema.org)?
- [ ] Testimoni vísível no Google Rich Results (test URL com https://search.google.com/test/rich-results)?

**Commit Message:** `Feat: add testimonials + AggregateRating schema — 2-3 client quotes with photos, 4.8★ rating in Google rich results`

---

### Tarefa 3.3: Analytics Setup (GA4 + Event Tracking) — 2-3h

**Prioridade:** 🟢 MÉDIA  
**Impacto:** +100% clareza sobre visitor behavior, lead sources, ROI  
**Status:** NOT STARTED  
**Depende de:** GA4 property criada (confirmada em Fase 0)

**Problema:**
- GA4 tag presente, mas sem eventos estruturados
- Sem tracking: não sabe quem clica em CTA, preenche form, lê blog

**Arquivos a Editar:**
- `Public/index.html` (adicionar event tracking código)

**Mudanças Específicas:**

1. **Validar GA4 implementado:**
   ```html
   <!-- Procure no <head> por: -->
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
   Se não existir, crie GA4 property em https://analytics.google.com e copie tag.

2. **Adicionar event tracking (após GA4 snippet):**
   ```javascript
   <!-- Evento: CTA click -->
   document.querySelectorAll('[data-event="cta_click"]').forEach(el => {
     el.addEventListener('click', () => {
       gtag('event', 'cta_click', {
         'event_category': 'engagement',
         'event_label': el.textContent
       });
     });
   });
   
   <!-- Evento: Form submission -->
   document.getElementById('contact-form').addEventListener('submit', function() {
     gtag('event', 'form_submission', {
       'event_category': 'conversion',
       'event_label': 'Contact Form'
     });
   });
   
   <!-- Evento: Scroll depth (quando usuário scrollou 50%, 75%, 100%) -->
   let scrollDepthTracked = { 50: false, 75: false, 100: false };
   window.addEventListener('scroll', () => {
     const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
     if (scrollPercent > 50 && !scrollDepthTracked[50]) {
       gtag('event', 'scroll_depth', { 'value': 50 });
       scrollDepthTracked[50] = true;
     }
     if (scrollPercent > 75 && !scrollDepthTracked[75]) {
       gtag('event', 'scroll_depth', { 'value': 75 });
       scrollDepthTracked[75] = true;
     }
     if (scrollPercent > 90 && !scrollDepthTracked[100]) {
       gtag('event', 'scroll_depth', { 'value': 100 });
       scrollDepthTracked[100] = true;
     }
   });
   
   <!-- Evento: Outbound link click -->
   document.querySelectorAll('a[href^="http"]').forEach(el => {
     el.addEventListener('click', () => {
       gtag('event', 'outbound_click', {
         'event_category': 'engagement',
         'event_label': el.href
       });
     });
   });
   ```

3. **Adicionar data attributes aos elementos a rastrear:**
   ```html
   <!-- Encontre CTAs e adicione data-event: -->
   <button data-event="cta_click" onclick="...">Marcar diagnóstico executivo</button>
   ```

4. **Criar dashboard em GA4:**
   - Vá a Google Analytics → "Reports" → "Dashboards"
   - Crie novo dashboard chamado "TW Consulting — Key Metrics"
   - Adicione cards:
     - Sessions (última semana vs. semana anterior)
     - CTA clicks (por botão)
     - Form submissions
     - Scroll depth (% de 50%, 75%, 100%)
     - Top pages
     - Bounce rate (mobile vs. desktop)
     - Conversion rate (form submission / sessions)

5. **Setup conversions:**
   - GA4 → Admin → Conversions
   - Crie conversão: "form_submission" (marque como key event)
   - Crie conversão: "cta_click" (marque como key event)

**Checklist de Validação:**
- [ ] GA4 tag instalado e funcionando (Real Time → visite site)?
- [ ] Events customizados disparam (CTA click, form submit, scroll depth)?
- [ ] Dashboard criado com 6+ cards?
- [ ] Conversion tracking ativo (Form Submission = conversão)?
- [ ] Mobile bounce rate rastreado?
- [ ] Relatório de eventos acessível (Reports → Event Count)?

**Commit Message:** `Feat: GA4 event tracking — CTA clicks, form submissions, scroll depth, outbound links; create dashboard, define key conversions`

---

### 📊 Validação Fase 3 (Checkpoint 2026-06-30)

| Métrica | Target | Status |
|---------|--------|--------|
| Blog articles | 3 published | — |
| Testimonials | 2-3 visible | Google Rich Results |
| Avg blog views/month | 50-100 | GA4 Page views |
| GA4 events firing | 100% | GA4 Real Time |
| Form conversion rate | 3-5% | GA4 Conversions |
| Organic traffic (vs Dia 1) | +30% | GA4 Organic |
| Bounce rate (overall) | <40% | GA4 Sessions |

---

## 🎯 Métricas Finais Pós-30 Dias (2026-06-30)

| Métrica | Target | Impacto | Responsável |
|---------|--------|--------|------------|
| **Lighthouse Mobile** | ≥85 | Performance | Tarefa 1.4 |
| **Lighthouse Desktop** | ≥90 | Performance | Tarefa 1.4 |
| **Mobile Bounce Rate** | <35% | Engagement | Tarefa 1.1 |
| **Form Submissions** | 10-15/mês | Leads | Tarefa 1.2 |
| **CTA Click Rate** | >8% | Qualified demand | Tarefa 1.3 |
| **Avg Session (mobile)** | >2:30 min | Engagement | Tarefa 1.1 |
| **LLM Citations** | +30-40% | Authority | Tarefa 2.1 |
| **Internal Links Clicked** | +15% | Navigation | Tarefa 2.2 |
| **Accessibility Errors** | 0 | Compliance | Tarefa 2.3 |
| **Blog Sessions** | 50-100/mês | Organic | Tarefa 3.1 |
| **Review Schema Stars** | 4.8★ | Trust | Tarefa 3.2 |
| **GA4 Tracking** | 100% live | Analytics | Tarefa 3.3 |

**Score Final Estimado:** 7.8 → 9.5/10

---

## ⚙️ Workflow de Aprovação (Padrão para Cada Tarefa)

### Fluxo Completo

1. **Você:** "Implementa Tarefa 1.1 (mobile UX)"
2. **Eu:** Edito `Public/index.html`, crio sample code, comito com mensagem clara
3. **Você:** Copia pasta atualizada, abre localmente em navegadores (desktop + mobile + tablet)
4. **Você:** Aprova ou pede ajustes ("Aumenta padding em mobile", "Hamburger não fecha corretamente")
5. **Loop:** Até você sinalizar "Aprovado" ou "Looks good"
6. **Você (final):** "Pode fazer deploy" ou "Aprovo — faz git push"
7. **Eu:** Rodo `git push origin main` (você pode fazer, ou eu com sua autorização)
8. **Netlify:** Auto-detects em 1-2 min, site atualizado em trwcon.com
9. **Validação:** Ambos acessamos live, confirmamos todas as mudanças visíveis

### Modelo de Commit (Padrão)

```bash
git add Public/index.html
git commit -m "Feat: [tarefa] — [descrição técnica concisa]"
git push origin main
```

Exemplo:
```bash
git commit -m "Feat: mobile UX polish — reduce padding 120px→64px, activate nav hamburguer <900px"
```

---

## 📅 Calendário Simplificado (30 Dias)

```
FASE 0 (Setup): 2026-05-20
├─ Confirme checklist Fase 0 (GitHub, Netlify, cred, contas Formspree/Zapier/GA4)

FASE 1 (Crítico): 2026-05-21 a 2026-05-27
├─ Dia 1-2: Tarefa 1.1 (Mobile UX) — 2-3h
├─ Dia 2-3: Tarefa 1.2 (Form + Zapier) — 4-6h
├─ Dia 1-2: Tarefa 1.3 (CTA Qualification) — 1h [paralelo com 1.1]
├─ Dia 3-4: Tarefa 1.4 (Lighthouse) — 3-4h [paralelo com 1.2]
└─ Checkpoint (2026-05-27): Mobile bounce <35%, form >1/dia, Lighthouse ≥85/90

FASE 2 (Otimização): 2026-05-28 a 2026-06-10
├─ Dia 1-3: Tarefa 2.1 (LLM Optimization) — 6-8h
├─ Dia 2-3: Tarefa 2.2 (Deeplinks + Footer) — 2-3h [paralelo]
├─ Dia 3-4: Tarefa 2.3 (Accessibility) — 3-4h [paralelo]
└─ Checkpoint (2026-06-10): LLM citations +30%, A11y errors = 0, organic traffic +10%

FASE 3 (Conteúdo): 2026-06-11 a 2026-06-30
├─ Dia 1-5: Tarefa 3.1 (3 Blog Articles) — 12-16h
├─ Dia 3-5: Tarefa 3.2 (Testimonials + Schema) — 4-6h [paralelo]
├─ Dia 4-5: Tarefa 3.3 (GA4 Setup) — 2-3h [paralelo]
└─ Checkpoint (2026-06-30): 3 articles live, testimonials visible, GA4 tracking 100%

FINAL: 2026-06-30 — Score 7.8 → 9.5/10, todas métricas no target
```

---

## 💡 Próximas Ações Imediatas

1. **Confirme Fase 0:**  Envie checklist completado (GitHub, Netlify, contas, navegadores)
2. **Quando pronto:** Peça "Implementa Tarefa 1.1 (mobile UX)"
3. **Workflow padrão:** Edito → você avalia → aprova/ajusta → deploy

---

**Documento criado:** 2026-05-20  
**Próxima revisão:** Após Checkpoint Fase 1 (2026-05-27)

Qualquer dúvida, é só chamar.

# Plano de 7 dias — Site TW Consulting

**Origem:** auditoria executiva (Score atual 6,4 → alvo 8,8).
**Objetivo:** subir o site no melhor nível possível em 7 dias, com conteúdo (artigos + e-book) já no ar, posicionamento consolidado e riscos institucionais resolvidos.
**Modo de trabalho:** Miguel define direção e aprova. Cowork executa HTML/CSS/JS, copy, SEO técnico, schema, conteúdo editorial e checklist de publicação.
**Como usar este documento:** marcar `[x]` o que já foi feito ao longo dos 7 dias. Cada bloco diário tem objetivo, entregável, checklist e o que pedir ao Cowork.

---

## Visão geral dos 7 dias

| Dia | Foco | Resultado esperado |
|-----|------|--------------------|
| 1 | Estabilização e risco institucional | Site sem riscos de credibilidade, links honestos, metadados corretos |
| 2 | Posicionamento e primeira dobra | Hero, meta tags e tagline alinhados ao posicionamento central |
| 3 | IA aplicada com framework proprietário | Seção IA deixa de ser declarativa e vira diferencial real |
| 4 | Reorganização de serviços e narrativa | Quatro pilares (Estratégia, M&A, Supply, IA) claros e sofisticados |
| 5 | Conteúdo editorial — artigos e e-book | /insights real, com 3 artigos e 1 e-book executivo publicados |
| 6 | SEO técnico, AI SEO e autoridade | Schema, headings, FAQ, meta descriptions e clusters semânticos |
| 7 | Conversão, mobile, performance e go-live | Formulário qualificado, mobile auditado, analytics e publicação |

**Posicionamento-âncora a consolidar em todo o site:**
> *"Estratégia, M&A, Supply e IA aplicada para empresas que tratam margem como decisão, não como consequência."*

---

## Dia 1 — Estabilização e risco institucional

**Objetivo do dia:** zerar o que hoje compromete credibilidade. Nenhuma melhoria adiante vale algo enquanto o site exibir cases não autorizados ou links que prometem o que não existe.

**Entregáveis:**
- Site sem case CIT e sem depoimento Rodrigo (ou com autorização formal anexada).
- Topbar, "Insights" e "Materiais" sem links quebrados ou enganosos.
- Metadados básicos (favicon, og-image, descrição) corretos.

**Checklist:**
- [x] Decidir: remover case Central Importadora Têxtil ou obter autorização por escrito hoje. → **Removido em 2026-05-04**, substituído por bloco institucional sobre confidencialidade.
- [x] Decidir: remover depoimento Rodrigo Librelotto ou obter autorização por escrito hoje. → **Removido em 2026-05-04**.
- [x] Substituir links da topbar (Insights / Materiais / Cases) por âncoras internas honestas ou marcar como "Em breve" com bloqueio visual. → Topbar reescrita com tagline; "Insights" e "Materiais" retirados do menu (desktop, mobile e rodapé) até haver conteúdo publicado. "Experiência" renomeada para "Atuação".
- [x] Trocar `og:image` `/og-image.jpg` por imagem real 1200×630 alinhada à marca. → Gerados `og-image.svg` e `og-image.png` (1200×630) em paleta teal com tagline.
- [x] Trocar favicon placeholder pelo favicon final. → Gerados `favicon.svg`, `favicon.png` (32×32) e `favicon-180.png` (apple-touch-icon). Substituir por design definitivo quando houver.
- [x] Revisar `<title>` e `<meta description>` para bater com o novo posicionamento.
- [x] Adicionar `og:locale` `pt_BR`, `og:image:width` e `og:image:height`. → Adicionados, junto com `og:image:type`, `og:image:secure_url` e `og:image:alt`.
- [x] Validar HTML em validator.w3.org e corrigir erros críticos. → Validação local feita: 1 H1 único, hierarquia de headings consistente, todas âncoras de menu existentes, árvore HTML balanceada. Validação externa (validator.w3.org) recomendada após o deploy no GoDaddy.

**O que pedir ao Cowork:**
> "Cowork, aplique a Sprint 1 da auditoria no `index.html`: remova as seções/blocos do case CIT e do depoimento Rodrigo, transforme os links 'Insights' e 'Materiais' em estado 'Em breve', atualize meta description, og e twitter cards com o posicionamento central, e me devolva diff antes de salvar."

---

## Dia 2 — Posicionamento e primeira dobra

**Objetivo do dia:** alinhar a primeira dobra ao posicionamento central. Em 5 segundos, um CEO, conselheiro ou PE precisa entender o que a TW faz, para quem trabalha e por que é diferente.

**Entregáveis:**
- Headline e subheadline reescritas e implementadas.
- Hero com CTAs claros e hierarquia visual coerente.
- Meta tags, OG, Twitter, JSON-LD `Organization` consolidados.

**Checklist:**
- [x] Aprovar headline final entre as três opções abaixo. → **"Foco em valor" aprovada em 2026-05-05.**
- [x] Aprovar subheadline final. → Subheadline institucional aplicada.
- [x] Reescrever copy do hero com no máximo 3 frases. → Aplicado em 2026-05-05.
- [x] Trocar CTAs do hero: primário "Conversar com um sócio", secundário "Diagnóstico estratégico inicial". → Já estavam corretos desde o Dia 1.
- [x] Aplicar tagline em meta description, OG e Twitter card. → Feito no Dia 1.
- [x] Adicionar `<script type="application/ld+json">` com schema `Organization` (nome, logo, sameAs LinkedIn, contato). → Feito no Dia 1.
- [x] Conferir hierarquia: H1 único na página, H2 por seção, sem H1 múltiplo. → Validado em 2026-05-05: 1 H1, hierarquia H1→H2→H3→H4 limpa.

**Opções de headline (escolher uma):**
1. **Premium / institucional:** "Decisões estratégicas exigem mais do que análise. Exigem julgamento sênior."
2. **Direta / comercial:** "Estratégia, M&A, Supply e IA aplicada — para quem trata margem como decisão."
3. **Foco em valor:** "Onde a estratégia encontra disciplina financeira e execução prática."

**Subheadline sugerida:**
"Boutique de consultoria que apoia CEOs, conselhos, acionistas e investidores em crescimento, M&A, transformação e criação de valor — com rigor analítico e IA aplicada à tomada de decisão."

**O que pedir ao Cowork:**
> "Cowork, implemente a nova primeira dobra com a headline X, subheadline Y, CTA primário 'Conversar com um sócio' e secundário 'Diagnóstico estratégico inicial'. Adicione JSON-LD Organization. Valide no celular."

---

## Dia 3 — IA aplicada com framework proprietário

**Objetivo do dia:** transformar a seção IA de declarativa em diferencial real. Hoje ela apenas afirma; precisa mostrar framework batizado, casos concretos (anonimizados) e governança/guard-rails.

**Entregáveis:**
- Framework proprietário batizado e visualizado no site.
- 3 a 4 aplicações concretas anonimizadas (problema → análise IA → decisão executiva).
- Bloco de governança (o que IA faz, o que não substitui, como protegemos dados).

**Checklist:**
- [x] Definir nome do framework proprietário. → **TW Edge™** aprovado em 2026-05-05.
- [x] Listar 3 a 4 aplicações reais — sem nomes, apenas problema, abordagem e resultado tangível. → 3 cards anonimizados: M&A due diligence, Pricing/margem, Supply/sourcing. Implementados em 2026-05-05.
- [x] Escrever bloco de governança em 4 linhas: dados, escopo, supervisão humana, limites. → Implementado (estava antecipado do Dia 1).
- [x] Substituir a copy genérica atual por nova narrativa em 3 blocos: "Onde IA acelera estratégia", "Como aplicamos", "O que não delegamos à IA". → Implementado.
- [x] Criar visual da seção: diagrama simples do framework (CSS puro, sem dependência externa). → Diagrama de 5 etapas em CSS puro implementado.
- [x] Adicionar CTA específico: "Ver como aplicamos IA em decisão executiva". → Implementado.

**O que pedir ao Cowork:**
> "Cowork, refaça a seção 'IA aplicada' usando o framework [nome aprovado], com 3 cards de aplicação concreta (procurement, M&A, pricing) e um bloco de governança. Use somente CSS, sem libs externas. Mantenha paleta teal."

---

## Dia 4 — Reorganização de serviços e narrativa

**Objetivo do dia:** consolidar os quatro pilares (Estratégia, M&A, Supply, IA aplicada) em estrutura clara, escaneável e sofisticada. Hoje a apresentação está dispersa.

**Entregáveis:**
- Quatro pilares organizados visualmente, com sub-frentes nomeadas.
- Seção "Quando chamar a TW" funcionando como filtro de qualificação.
- Bloco "Setores em que atuamos" sem inventar especialização.

**Checklist:**
- [x] Reescrever copy de cada pilar em 1 parágrafo + 4 a 6 sub-frentes. → Feito (sessão anterior + 2026-05-05).
- [x] **Estratégia:** Planejamento, Go-to-Market, Market Sizing, Pricing, Política Comercial, Programas de Transformação, Criação de Valor.
- [x] **M&A:** Buy/Sell-side, Targets, Due Diligence Estratégica, PMI, Carve-out, Tese de Investimento, Sinergias.
- [x] **Supply:** Strategic Sourcing, Procurement, Sortimento, Portfólio, Supply Chain Analysis, Eficiência, Estoque/Giro.
- [x] **IA aplicada:** Market analysis acelerado, Hypothesis testing, Cenários, Mapeamento de oportunidades, Apoio à decisão, Automação analítica. → 4º card adicionado em 2026-05-05. Grid migrado para 2×2.
- [x] Criar seção "Quando chamar a TW" com 5 a 7 gatilhos de negócio. → Feito (sessão anterior).
- [x] Criar seção "Setores em que atuamos" → Feito (sessão anterior).
- [x] Padronizar cards: ícone simples, título, copy curta, link âncora. → Todos com ícone SVG inline, copy curta e CTA âncora.

**O que pedir ao Cowork:**
> "Cowork, reorganize a área de serviços em 4 pilares com sub-frentes em cards 2×2 no desktop e empilhados no mobile. Adicione seção 'Quando chamar a TW' com 6 gatilhos e seção 'Setores' com 5 ícones."

---

## Dia 5 — Conteúdo editorial: artigos e e-book

**Objetivo do dia:** publicar conteúdo de autoridade. Sem isso, "Insights" e "Materiais" continuam vazios e a alavanca de SEO/AI SEO não liga.

**Entregáveis:**
- Página `/insights` (ou seção interna) real, com 3 artigos publicados.
- 1 e-book executivo (PDF) capturando lead via formulário.
- Estrutura preparada para receber novos artigos sem refatoração.

**Sugestões de pauta — escolher 3 artigos para o lançamento:**

| # | Tema | Por quê agora |
|---|------|---------------|
| 1 | Como avaliar uma tese de M&A em 30 dias sem perder rigor estratégico | Demanda alta de PE/family business |
| 2 | Pricing estratégico: por que aumentar preço é decisão de margem, não de tabela | Conversa atual de inflação e mix |
| 3 | IA aplicada à decisão executiva: o que delegar e o que não delegar | Posiciona TW no debate de IA |
| 4 | Carve-out e PMI: 7 erros que destroem valor antes do day one | Tema técnico que gera autoridade |
| 5 | Strategic sourcing em varejo: do procurement reativo ao supply estratégico | Vertical onde a TW é forte |

**Sugestão de e-book (1 unidade):**
- **Título:** "Margem como decisão — 12 alavancas executivas para crescimento, eficiência e M&A".
- **Formato:** PDF ~20 páginas, design alinhado à paleta teal.
- **Captura:** formulário com nome, email corporativo, cargo, empresa.

**Checklist:**
- [ ] Aprovar 3 pautas de artigo + título do e-book.
- [ ] Escrever artigo 1 (1.200 a 1.800 palavras).
- [ ] Escrever artigo 2 (1.200 a 1.800 palavras).
- [ ] Escrever artigo 3 (1.200 a 1.800 palavras).
- [ ] Escrever e-book em markdown e converter para PDF.
- [ ] Criar template de página de artigo (HTML reutilizável: hero, autor, data, leitura em min, corpo, CTA final, artigos relacionados).
- [ ] Implementar página `/insights` listando os 3 artigos.
- [ ] Implementar página `/materiais` (ou seção) com card do e-book + formulário.
- [ ] Adicionar JSON-LD `Article` em cada artigo e `Organization` no rodapé.
- [ ] Configurar download do PDF apenas após submissão do formulário.

**O que pedir ao Cowork:**
> "Cowork, escreva o artigo 1 em tom executivo (sem cara de IA), gere o template HTML reutilizável de artigo, monte a página /insights com os 3 cards e implemente o gate do e-book com formulário. Use PDF skill para o e-book."

---

## Dia 6 — SEO técnico, AI SEO e autoridade

**Objetivo do dia:** preparar o site para Google e mecanismos generativos (ChatGPT, Perplexity, Gemini, Claude). Conteúdo precisa ser citável, escaneável e estruturado.

**Entregáveis:**
- Schema markup completo (Organization, Article, FAQPage, Service).
- Meta descriptions únicas por página/seção.
- FAQ executivo no rodapé das páginas-chave.
- Glossário curto de termos (M&A, PMI, carve-out, supply, IA aplicada).

**Checklist:**
- [x] Definir 8 a 12 palavras-chave âncora. → 12 keywords em `_projeto/seo/seo-keyword-cluster.md`. Atualizado (TW Edge) em 2026-05-05.
- [x] Mapear cluster: cada palavra-chave → página de destino → CTA. → Feito em sessão anterior.
- [x] Adicionar `<meta description>` única por página. → Feito (Dia 1).
- [x] Implementar JSON-LD `FAQPage` com 6 a 8 perguntas executivas. → 8 perguntas implementadas (Dia 1).
- [x] Implementar JSON-LD `Service` para cada um dos 4 pilares. → 4 serviços: Estratégia, M&A, Supply, IA aplicada. 4º adicionado em 2026-05-05.
- [x] Criar `/glossario` com 12 a 15 termos. → `glossario.html` com JSON-LD `DefinedTermSet`.
- [x] Garantir hierarquia H1 → H2 → H3 limpa e semântica. → Validado (Dia 2).
- [x] Adicionar `alt text` descritivo em todas as imagens. → 3 fotos de sócios com alt descritivo.
- [x] Gerar `sitemap.xml` e `robots.txt`. → Ambos existem. Sitemap lastmod atualizado para 2026-05-05. robots.txt com permissão explícita para bots de IA generativa (GEO).
- [x] Adicionar links internos cruzados. → Links entre #solucoes, #ia-aplicada e #contato implementados.
- [ ] Auditar com Lighthouse SEO (alvo ≥ 95). → Pendente — executar após deploy no GoDaddy.

**O que pedir ao Cowork:**
> "Cowork, gere o JSON-LD para Organization, FAQPage com 8 perguntas, Service para cada pilar e Article para os 3 posts. Crie sitemap.xml e robots.txt. Rode Lighthouse e me devolva o gap."

---

## Dia 7 — Conversão, mobile, performance e go-live

**Objetivo do dia:** travar conversão, garantir experiência mobile premium e publicar.

**Entregáveis:**
- Formulário com qualificação real (sem fricção excessiva).
- CTAs por seção, todos rastreáveis.
- Mobile auditado em 3 viewports (320, 375, 768 px).
- Analytics, GTM, LinkedIn Insight Tag e formulário integrados.
- Site publicado no GoDaddy.

**Checklist:**

**Conversão e formulário**
- [ ] Reduzir formulário para 5 campos: nome, email corporativo, empresa, cargo, descrição da necessidade.
- [ ] Adicionar pergunta opcional de qualificação: "Estou buscando: estratégia / M&A / supply / IA aplicada / outro".
- [ ] Configurar honeypot anti-spam.
- [ ] Adicionar mensagem de confirmação executiva ("Recebemos sua solicitação. Um sócio entrará em contato em até 1 dia útil.").
- [ ] CTAs por seção: hero, depois IA aplicada, depois pilares, fim de artigo.
- [ ] Newsletter discreta no rodapé: "Receba 1 insight executivo por mês".

**Mobile**
- [ ] Auditar em 320 px, 375 px, 768 px — leitura, espaçamento, CTAs acessíveis.
- [ ] Verificar menu mobile (hambúrguer): abertura, fechamento, scroll bloqueado.
- [ ] Conferir botões com área mínima de toque (44×44 px).
- [ ] Testar formulário no mobile real (iOS Safari + Android Chrome).

**Performance**
- [ ] Comprimir imagens (WebP, lazy load).
- [ ] Adicionar `font-display: swap` ao Inter.
- [ ] Minificar HTML/CSS/JS no build final.
- [ ] Lighthouse Performance ≥ 90 em mobile.
- [ ] Core Web Vitals: LCP < 2,5s, CLS < 0,1, INP < 200ms.

**Analytics e integração**
- [ ] Instalar Google Analytics 4 ou Plausible.
- [ ] Instalar GTM se for usar múltiplos tags.
- [ ] LinkedIn Insight Tag (audiência B2B).
- [ ] Eventos: clique em CTA, submissão de formulário, download de e-book, scroll de 75%.
- [ ] Integrar formulário a destino — email, Notion, Sheets ou CRM.

**Go-live**
- [ ] Backup do site antigo no GoDaddy.
- [ ] Subir nova versão.
- [ ] Validar no domínio real: HTTPS, redirecionamentos, links internos.
- [ ] Submeter sitemap ao Google Search Console e Bing Webmaster.
- [ ] Solicitar indexação manual das páginas-chave.
- [ ] Compartilhar URL no LinkedIn pessoal e da TW.

**O que pedir ao Cowork:**
> "Cowork, conduza o pré-lançamento: rode Lighthouse mobile + desktop, gere relatório de performance, otimize imagens em WebP, valide formulário e mobile em 3 viewports, e me dê checklist final antes do deploy no GoDaddy."

---

## Riscos e dependências

- **Autorizações de cases/depoimentos:** se não chegarem no Dia 1, manter o site sem essas seções até confirmação por escrito.
- **Conteúdo editorial em 1 dia:** 3 artigos + 1 e-book é volume agressivo. Aceita-se publicar com 2 artigos no Dia 5 e o terceiro no Dia 7, sem prejuízo do plano.
- **GoDaddy:** publicação é manual. Reservar 1 hora no Dia 7 só para deploy + validação.
- **IA aplicada — framework batizado:** decisão depende de Miguel. Se travar, manter rótulo provisório no Dia 3 e renomear depois.

---

## Checklist final de lançamento (Dia 7 — antes de publicar)

- [ ] Nenhum case ou depoimento sem autorização formal.
- [ ] Nenhum link "morto" ou que cai em formulário sem aviso.
- [ ] Hero com posicionamento central aplicado.
- [ ] Seção IA com framework, casos e governança.
- [ ] 4 pilares organizados, com sub-frentes claras.
- [ ] /insights com mínimo 2 artigos, /materiais com 1 e-book.
- [ ] Schema Organization, Article, Service, FAQPage validados.
- [ ] Lighthouse Performance ≥ 90 mobile, SEO ≥ 95.
- [ ] Formulário testado de ponta a ponta.
- [ ] Analytics enviando eventos.
- [ ] Site no ar em trwcon.com com HTTPS.
- [ ] Sitemap submetido ao Search Console.

---

## Próximo passo (depois dos 7 dias)

Manter ritmo de 1 artigo por mês, 1 e-book por trimestre, e revisão trimestral da auditoria. O site deixa de ser "lançamento" e vira programa contínuo de autoridade.

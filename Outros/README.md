# True Worth Consulting — Handoff Package

Pacote completo do redesign do site **trwcon.com** + apresentação institucional + identidade visual social.

Pronto pra um desenvolvedor (humano ou Claude Code) implementar em codebase real (Next.js, Astro, Webflow custom code etc.) ou hospedar diretamente como HTML estático.

---

## Conteúdo

```
design_handoff_truworth_site/
├── index.html                  → Home
├── quem-somos.html             → Página institucional
├── image-slot.js               → Web component (drag-and-drop pra imagens)
├── assets/
│   ├── photos/                 → 7 fotos editoriais (Unsplash, licença comercial) + 3 sócios
│   └── logo-t-*.png            → Marca "T" em 4 versões
└── social/
    ├── TrueWorth-Apresentacao-Institucional.pptx     → 12 slides editáveis
    ├── apresentacao-institucional.html                → Versão HTML do deck
    ├── deck-stage.js                                  → Web component do deck
    ├── avatar-tw-letters-{1080|400|180}.png           → Avatar redondo "TW" serif (LinkedIn/IG perfil)
    ├── avatar-tw-{1080|400|180}.png                   → Avatar redondo com símbolo T
    └── favicon-{32|16}.png + favicon-letters-32.png   → Favicons
```

---

## Sistema visual

### Cores (CSS custom properties)
```css
--ink:      #15201F;   /* tipografia principal */
--ink-3:    #4A5453;   /* tipografia secundária */
--ink-4:    #6B7574;   /* tipografia auxiliar */
--paper:    #F6F4EE;   /* fundo principal — paper warm */
--paper-2:  #EFECE3;   /* fundo seções alternadas */
--paper-3:  #E8E4D9;   /* cards, contraste sutil */
--rule:     #D8D2C2;   /* divisores */
--teal-900: #0A2422;   /* fundo dark hero/CTAs */
--teal-700: #1F4C49;   /* accent — links, ênfase */
--teal-300: #5BAAB4;   /* legado, raro */
```

### Tipografia
- **Serif (display + ênfase):** Newsreader (Google Fonts)
- **Sans (body + UI):** Geist (Google Fonts)
- **Mono (kickers, tags, números):** Geist Mono (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Princípios
- **Paleta:** paper warm + ink profundo + teal como accent (não como cor dominante)
- **Type:** serif Newsreader pra display/H1-H2 e ênfases (`<em>` em itálico teal-700) · sans Geist pra body · mono Geist Mono pra kickers
- **Sem pontos finais** em títulos, subtítulos e itens curtos (regra adotada no site)
- **Densidade:** alta — sistema editorial estilo Bloomberg/Stripe/BCG, não landing page de SaaS
- **Iconografia:** evitada — quando necessário, usar números (`/ 01`) e tags em mono
- **Animações:** sutis (fade-in, hover de link)

---

## Estrutura — index.html

12 seções:
1. Hero (skyline noturno, citação + lede)
2. Desafios — 4 desafios executivos
3. Sobre / Filosofia (foto staircase Declan Sun)
4. Soluções — 4 cards (Estratégia · M&A · Supply · IA)
5. Quando chamar a TW
6. Setores
7. Abordagem — 3 fases (Diagnosticar · Estruturar · Implementar)
8. TW Edge™ — IA aplicada
9. Sócios — Henry · Miguel · Adriana
10. Contato (Google Maps embed + formulário)
11. Footer

## Estrutura — quem-somos.html

§01 Por que True Worth (epígrafe Benjamin Graham + tese)
§02 Quem somos · stats (3 sócios · 50+ anos · 100% independência)
§03 Propósito (elevar a modelos de excelência)
§04 Nosso jeito (4 princípios)
§05 Convite

---

## Imagens

Todas do **Unsplash com licença gratuita pra uso comercial** (sem atribuição obrigatória).

| Arquivo | Conteúdo | Autor |
|---|---|---|
| `hero.jpg` | Skyline noturno SP | Vanessa Bumbeers |
| `philos.jpg` | Escadaria curva luz quente | Declan Sun |
| `sol-estrategia.jpg` | Tabuleiro xadrez mármore | — |
| `sol-ma.jpg` | Peça puzzle preta sobre branco | Edge2Edge Media |
| `sol-supply.jpg` | Containers porto Hong Kong | Timelab |
| `sol-ia.jpg` | Detalhe arquitetura tech | — |
| `contact.jpg` | (substituído por Google Maps embed) | — |
| `socio-{henry,miguel,adriana}.png` | Fotos dos sócios | (clientes) |

Tratamento aplicado: filtro CSS leve (grayscale 0.15) pra harmonia com paleta paper/teal.

---

## Apresentação Institucional (`social/`)

**12 slides** em PowerPoint editável (texto + shapes nativos):

1. Capa — "Valor verdadeiro pra decisões que permanecem"
2. Por que True Worth — epígrafe Graham + definição
3. Tese — "O nome é a tese"
4. Quem somos — 3 sócios · 50+ anos · 100% independência
5. Propósito — econômico · social · legado
6. Soluções — 4 frentes
7. TW Edge™ — IA aplicada (4 capacidades)
8. Nosso jeito — 4 princípios
9. Sócios — Henry · Miguel · Adriana (bios completas)
10. Governança — NDA · IBGC · Independência
11. Convite — contato
12. Fechamento — marca

Versão HTML em `apresentacao-institucional.html` mantida como master editável (web component `deck-stage.js`).

---

## Avatares sociais

- **Avatar TW (letras serif):** `avatar-tw-letters-1080.png` → use como **foto de perfil LinkedIn/Instagram**. Letras "TW" em Newsreader serif creme sobre fundo teal-700.
- **Avatar T (símbolo):** `avatar-tw-1080.png` → variação alternativa com o T da marca.
- **Favicons:** 32px e 16px gerados.

---

## Próximos passos sugeridos pro dev

1. **Implementar em framework moderno** (Next.js/Astro):
   - Migrar `<style>` inline pra Tailwind ou CSS modules preservando os tokens
   - Componentizar nav, footer, section-tag, kicker
2. **Substituir Google Maps embed** por mapa interativo se quiser reduzir 3rd-party
3. **Acessibilidade:** rodar audit Lighthouse, garantir alt em todas imagens, contrastes ≥ 4.5:1 (já estão, mas validar)
4. **Performance:** converter PNGs pra WebP/AVIF, lazy-load fotos abaixo do hero
5. **CMS:** se quiser editor de conteúdo, conectar a Sanity/Contentful — copy estável fica no schema
6. **Domínio:** apontar `trwcon.com` pra Vercel/Netlify após implementação

---

## Endereço (footer/contato)

> Av. Senador Tarso Dutra, 565 · sala 505
> Bairro Petrópolis — Porto Alegre/RS
> CEP 90690-140

Embed Google Maps na seção Contato.

---

## Stack mínima recomendada

- **Hosting:** Vercel ou Netlify (HTML estático, deploy automático)
- **CMS opcional:** Sanity ou Decap CMS
- **Fontes:** Google Fonts (Newsreader · Geist · Geist Mono) já preconnect-ed
- **Analytics:** Plausible ou Fathom (privacy-first, sem cookies)

---

*Pacote gerado em 07/05/2026 pela Anthropic Claude.*

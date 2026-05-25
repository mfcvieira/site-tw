# Checklist de Go-Live — TW Consulting
**Domínio:** trwcon.com | **Hospedagem:** GoDaddy

---

## ⏳ Pendências antes de publicar

- [ ] **LinkedIn Partner ID** → `TW_LINKEDIN_PARTNER_ID` em `assets/js/tw-analytics.js`
- [ ] **CallMeBot API key** → `CALLMEBOT_PHONE` e `CALLMEBOT_APIKEY` em `index.html`
- [ ] **Brevo API key + List ID** → `BREVO_API_KEY` e `BREVO_LIST_ID` em `index.html`
- [ ] **Testar formulário** → preencher localmente e confirmar email chegando no Formspree
- [ ] **Fotos dos sócios** → confirmar versões finais de foto-henry/miguel/adriana.png
- [ ] **Favicon** → confirmar versões definitivas

---

## 📁 Arquivos para subir no GoDaddy

### Raiz (public_html)
```
index.html
glossario.html
insights.html
materiais.html
politica-de-privacidade.html
template-artigo.html
robots.txt
sitemap.xml
favicon.svg / favicon.png / favicon-180.png
og-image.png
```

### Pasta assets/
```
assets/css/tw-content.css
assets/images/foto-henry.png
assets/images/foto-miguel.png
assets/images/foto-adriana.png
assets/js/tw-analytics.js
```

**NÃO subir:** pasta `_projeto/`, `.DS_Store`, arquivos `*.backup-*`, `og-image.svg`

---

## 🚀 Upload no GoDaddy — passo a passo

1. GoDaddy → Meus Produtos → Hospedagem → Gerenciar → cPanel → File Manager
2. Navegue até `public_html`
3. Backup: selecionar tudo → compactar → baixar
4. Upload na ordem: pasta `assets/` primeiro, depois HTMLs e demais arquivos
5. Confirmar estrutura de pastas conforme lista acima

---

## ✅ Validações pós-deploy

### Funcional
- [ ] https://trwcon.com carrega sem erros e com HTTPS
- [ ] Menu mobile funciona no iOS Safari e Android Chrome
- [ ] Formulário de contato envia e email chega
- [ ] Newsletter inscreve no Brevo
- [ ] Todos os links do menu funcionam
- [ ] Páginas auxiliares abrem: glossario, insights, materiais, politica-de-privacidade

### SEO
- [ ] https://trwcon.com/robots.txt acessível
- [ ] https://trwcon.com/sitemap.xml acessível
- [ ] Submeter sitemap no Google Search Console
- [ ] Solicitar indexação manual da home

### Analytics
- [ ] GA4 Realtime mostra visita ao acessar o site
- [ ] Eventos de CTA click registrados

### Performance
- [ ] Lighthouse Mobile: Performance ≥ 90, SEO ≥ 95
- [ ] LCP < 2,5s, CLS < 0,1

---

## 📅 Após o go-live

- [ ] Compartilhar no LinkedIn pessoal (Miguel, Henry, Adriana)
- [ ] Compartilhar na página TW Consulting no LinkedIn
- [ ] Configurar monitoramento em uptimerobot.com (gratuito)
- [ ] Google Search Console — monitorar indexação semanalmente

---

## 🔑 Status dos IDs

| Item | Variável | Status |
|------|----------|--------|
| GA4 Measurement ID | `TW_GA4_ID` | ✅ G-W7S02D8YTS |
| LinkedIn Partner ID | `TW_LINKEDIN_PARTNER_ID` | ⏳ Pendente |
| Formspree endpoint | `form action` | ✅ mwvybkjq |
| CallMeBot Telegram | `@mfcvieira` | ✅ Configurado |
| CallMeBot API endpoint | Telegram text.php | ✅ Ativo |
| Brevo API key | `BREVO_API_KEY` | ⏳ Pendente |
| Brevo List ID | `BREVO_LIST_ID` | ⏳ Pendente |

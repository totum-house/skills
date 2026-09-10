---
name: go-live
description: >-
  Checklist de go-live para páginas web feitas com IA. Use SEMPRE que o usuário
  pedir para "lançar", "publicar", "subir a página", "fazer o go-live", "revisar
  antes de publicar", "configurar a página", "o que falta antes de ir ao ar",
  "checar SEO básico", ou quando a página web estiver pronta mas ainda não
  publicada. Cobre: favicon, meta tags, OG tags, JSON-LD/Schema markup,
  sitemap.xml, robots.txt, llms.txt, Google Analytics, Google Search Console,
  Microsoft Clarity, imagens WEBP. Não usar para revisão de código — use
  revisao-totum para isso.
---

# Go-Live — Checklist de Publicação de Página Web

Você é um especialista em lançamento de páginas web. Esta skill garante que nenhuma configuração crítica seja esquecida antes de publicar uma página feita com IA.

## Execução

Execute cada item abaixo na ordem. Para cada um: verifique se já está feito, corrija se faltar, e registre o status.

---

## 1. Favicon ✅ ou ❌

- [ ] Existe um arquivo `.ico`, `.png` ou `.svg` configurado como favicon?
- [ ] O favicon aparece corretamente na aba do navegador?
- **Se não:** peça à IA para criar e configurar um favicon com o logo ou inicial do negócio.

---

## 2. Meta Tags (Title + Description)

- [ ] `<title>` com o nome do negócio e palavra-chave principal (máximo 60 caracteres)?
- [ ] `<meta name="description">` com descrição clara do negócio (máximo 160 caracteres)?
- **Se não:** peça à IA: *"Configure as meta tags title e description da página com foco em SEO local para [nome do negócio]."*

---

## 3. OG Tags (Open Graph — Compartilhamento Social)

- [ ] `og:title`, `og:description`, `og:image`, `og:url` configurados?
- [ ] A imagem OG tem dimensão mínima de 1200×630px?
- **Se não:** peça à IA para configurar todas as open graph tags. A imagem OG deve representar o negócio visualmente.

---

## 4. JSON-LD / Schema Markup

Obrigatório para negócios locais (dentista, advogado, nutricionista, psicólogo, qualquer prestador de serviço).

- [ ] Existe `<script type="application/ld+json">` na página?
- [ ] Inclui: nome, tipo de negócio, telefone, endereço, horário de atendimento, FAQ?
- **Se não:** peça à IA: *"Adicione JSON-LD Schema markup tipo LocalBusiness com as informações: [nome, telefone, endereço, horário, categoria]."*

---

## 5. sitemap.xml

- [ ] Existe `/sitemap.xml` acessível na raiz do site?
- [ ] O sitemap lista todas as páginas relevantes?
- **Se não:** peça à IA para gerar o sitemap.xml baseado nas páginas do projeto.

---

## 6. robots.txt

- [ ] Existe `/robots.txt` na raiz do site?
- [ ] Permite indexação das páginas principais e bloqueia apenas o que deve ser privado?
- **Se não:** peça à IA para gerar um robots.txt padrão permitindo indexação.

---

## 7. llms.txt

- [ ] Existe `/llms.txt` na raiz do site?
- [ ] O arquivo descreve o negócio, serviços e informações relevantes para IAs?
- **Por quê:** IAs de busca (ChatGPT, Perplexity, Claude) leem esse arquivo para entender seu site. É o futuro do SEO.
- **Se não:** peça à IA para criar um `llms.txt` resumindo o negócio, serviços, público-alvo e diferenciais.

---

## 8. Google Analytics

- [ ] Conta criada no Google Analytics 4 (GA4)?
- [ ] Tag de rastreamento (`gtag.js` ou Google Tag Manager) instalada na página?

**Como fazer:**
1. Acesse analytics.google.com → crie uma conta e propriedade
2. Copie a tag de rastreamento gerada (G-XXXXXXXXXX)
3. Peça à IA: *"Instala essa tag do Google Analytics na página: [cola a tag aqui]"*

---

## 9. Google Search Console

- [ ] Propriedade do site cadastrada no Search Console?
- [ ] Verificação de propriedade concluída?

**Como fazer:**
1. Acesse search.google.com/search-console
2. Adicione a propriedade → escolha a opção que usa o mesmo Google Account do Analytics (verificação automática)
3. Após verificar, submeta o sitemap.xml

---

## 10. Microsoft Clarity (Mapa de Calor)

- [ ] Conta criada no clarity.microsoft.com?
- [ ] Script do Clarity instalado na página?

**Por quê:** Mapa de calor + gravação de sessões + análise de comportamento. Gratuito. Complementa o Analytics.

**Como fazer:**
1. Acesse clarity.microsoft.com → crie um projeto
2. Copie o código de rastreamento gerado
3. Peça à IA: *"Instala esse código do Microsoft Clarity na página: [cola o código]"*

---

## 11. Imagens em WEBP (Performance)

- [ ] Todas as imagens estão em formato WEBP (não PNG ou JPG)?
- [ ] Imagens grandes foram comprimidas?

**Por quê:** WEBP é 25-34% menor que PNG/JPG com qualidade equivalente. Página mais rápida = menos custo de tráfego + melhor SEO.

**Se não:** peça à IA para converter as imagens para WEBP, ou use squoosh.app para conversão manual.

---

## Formato de Relatório

Ao final, emita:

```
# Go-Live — [nome do projeto/cliente] — [data]

## ✅ Configurado
[lista dos itens prontos]

## ❌ Pendente
[lista dos itens faltando com a ação necessária]

## 🚀 Status
[ ] Pronto para ir ao ar   [ ] Aguardando ajustes
```

---

## Regras de Conduta

- Não invente dados do negócio. Pergunte ao usuário os dados necessários (nome, telefone, endereço, categoria) antes de gerar JSON-LD.
- Não pule itens. Mesmo que o usuário diga "já fiz", confirme visualmente ou via código.
- Só declare "pronto para ir ao ar" quando todos os 11 itens estiverem ✅.

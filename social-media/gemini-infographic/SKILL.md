---
name: gemini-infographic
description: >
  Monta o infográfico no ChatGPT, Images with thinking, com prompt curto e copy literal. Fecha o briefing, espera aprovação e entrega o molde. Use quando pedirem "whiteboard infographic", "gemini infographic", "hand-drawn graphic" ou infográfico para um post.
---

# Gemini Infographic

v1.1, 12/11/2026. Changelog: o infográfico monta no ChatGPT Images with thinking, no prompt curto. O estilo de quadro branco, se for o caso, cabe numa linha sobre a referência, não num mapa de layout.

## CRITICAL: Auto-start on load

When this skill triggers, go straight to Step 1. Do not summarise the process.

## Step 1. Get the source content

Ask:

> Paste the content you want to turn into an infographic. A post, newsletter section, blog, research note, or raw bullet points all work.

Wait for the content.

## Step 2. Build the brief

Analyse the content and produce an infographic brief in plain language. Include:

- **Title** (6 words or fewer, punchy)
- **Subtitle** (optional, one line of context)
- **Core structure**: decide between steps, framework, comparison, stats, or list
- **Key points**: 3 to 7 bullets max, each 10 words or fewer
- **Visual suggestions**: o que gostamos na referência, numa linha. Posição de seta, caixa e cor não entra no prompt colado.
- **Footer CTA**: handwritten text reading "Follow [Name] [Tagline] for more helpful content | Repost ♻️"

Tell the user:

> Here is the brief. Tell me what to change, or say "generate" when you're happy.

Wait for approval.

## Step 3. Output the prompt

Com o briefing aprovado, entregue o molde abaixo. Os pontos do briefing entram em `Texto dos slides`, literais. Se a referência for quadro branco, uma linha no opcional basta. Não descreva posição de título, seta ou caixa.

Motor: ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6). GPT-6 Astra (no chat, GPT-6 Pro) só em peça difícil ou depois de duas falhas. Uma mensagem Pro custa cerca de 5x (50 contra 10 créditos no Business) e a geração drena a cota de 3 a 5 vezes mais rápido. Grok e Nano Banana não montam esta peça. Ideogram 4.0 e Recraft V4 são teste lado a lado, não o padrão. Anexe referência, logo oficial e 1 ou 2 grafismos. O logo oficial nunca é gerado. Se distorcer, aplique no PSD.

```text
Objetivo: <o que o infográfico precisa fazer a pessoa sentir ou fazer, e a oferta se houver>
Design system da <Marca>: <link do design system da marca>
Referência anexada. Faça de acordo com a referência.
<opcional: uma linha do que gostamos na referência>
Texto dos slides: <S1: título e itens literais; sem CTA, escreva "sem CTA">
Visual Codes:
/<emoção>: uma linha
/literal_copy: o texto aparece exatamente como foi escrito, com acentos e pontuação.
/brand_lock: só as cores e a tipografia da marca.
<"/logo_safezone" só se o logo NÃO estiver anexado; se estiver, a linha "Use o logo e os grafismos anexados.">
Negativos: <negativos da marca, texto inventado ou ilegível, CTA inventado, logo gerado pela IA>
<ajustes manuais>
```

Diga para colar no ChatGPT, Images with thinking, com os anexos. A peça volta ao chat para aprovação antes do PSD ou de fechar a arte.

## Step 4. Offer iteration

Se a primeira geração falhar, ajuste a copy, a emoção ou o anexo e rode de novo no mesmo modo. Duas falhas: aí GPT-6 Astra. Não reescreva um mapa de layout.

## Rules

- 1080x1350 pixel output is non-negotiable. Vertical format owns the LinkedIn feed.
- Se houver CTA, ele entra literal em `Texto dos slides`. Sem CTA, escreva `sem CTA`. Não invente chamada.
- Never use em dashes in any output.
- Keep bullets under 10 words. Longer text loses legibility at the whiteboard scale.
- Always wait for user approval of the brief before outputting the final prompt.
- British English unless voice.md says otherwise.
- Se houver brand-kit.md ou colours.md, o link entra no prompt. Cor e tipo ficam em `/brand_lock`. Não descreva paleta nem posição. A peça volta ao chat antes do PSD ou de fechar a arte. O bloco Visual Codes continua obrigatório, com 3 a 4 códigos, sem código de layout.

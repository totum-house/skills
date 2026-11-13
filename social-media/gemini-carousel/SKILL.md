---
name: gemini-carousel
description: >
  Monta carrossel com texto no ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6), num prompt curto. Lê o conteúdo, fecha o briefing, espera aprovação e só então cola o molde com a copy literal de cada slide. 1080x1350. Use quando pedirem "carousel", "build a carousel", "gemini carousel" ou carrossel de LinkedIn. A peça volta ao chat antes do PSD ou dos slides finais.
---

# Gemini Carousel

v1.1, 12/11/2026. Changelog: o carrossel monta no ChatGPT Images with thinking, num prompt curto. O nome do arquivo permanece.

## CRITICAL: Auto-start on load

When this skill triggers, go straight to Step 1. Do not summarise.

## Step 1. Gather inputs

Ask:

> Paste the content you want in the carousel. A post, section of a newsletter, research notes, or a framework all work.

Wait for the content, then call AskUserQuestion:

```json
[
  {
    "question": "Brand style?",
    "header": "Style",
    "multiSelect": false,
    "options": [
      {"label": "Pull from brand-kit.md", "description": "Use the colours and typography in my project brand file"},
      {"label": "I will type brand colours", "description": "I will paste hex codes and font preferences"},
      {"label": "Suggest for me", "description": "Pick a palette and typography based on the content"}
    ]
  },
  {
    "question": "Number of slides?",
    "header": "Slides",
    "multiSelect": false,
    "options": [
      {"label": "6 slides", "description": "Concise, fast read"},
      {"label": "8 slides", "description": "Standard carousel length"},
      {"label": "10 slides", "description": "Deep-dive carousel"}
    ]
  }
]
```

## Step 2. Build the design brief

Analyse the content and produce a slide-by-slide brief with:

- **Slide 1 (Cover)**: hook, large bold text, visual direction
- **Slides 2 to N-1 (Body)**: one idea per slide, max 15 words per slide, visual suggestion
- **Slide N (CTA)**: repost ask, name, link or offer

For each slide include:

- Slide number
- Headline (max 8 words)
- Body text (max 15 words)
- Visual suggestion (icon, colour block, illustration, diagram)

Tell the user:

> Here is the design brief. Tell me what to change, or say "generate" when you are happy.

Wait for approval. Do not proceed until the user explicitly approves.

## Step 3. Output the prompt

Com o briefing aprovado, entregue um prompt só, no molde abaixo, com a copy literal de cada slide. A sugestão visual do briefing não entra como instrução de layout.

Motor: ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6), no lote inteiro. GPT-6 Astra (no chat, GPT-6 Pro) só se a peça for difícil ou se Images with thinking falhar duas vezes. Uma mensagem Pro custa cerca de 5x (50 contra 10 créditos no Business) e a geração drena a cota de 3 a 5 vezes mais rápido. Grok Imagens e Nano Banana não montam o carrossel. Ideogram 4.0 e Recraft V4 são teste lado a lado, não o padrão. Anexe referência e/ou KV, o logo oficial e 1 ou 2 grafismos. O logo oficial nunca é gerado. Se distorcer, aplique no PSD.

```text
Objetivo: <o que o carrossel precisa fazer a pessoa sentir ou fazer, e a oferta se houver>
Design system da <Marca>: <link do design system da marca>
Referência anexada. Faça de acordo com a referência.
<opcional: uma linha do que gostamos na referência>
Texto dos slides: <S1 (capa): ...> <S2: ...> ... (copy literal, cada slide; sem CTA, escreva "sem CTA")
Visual Codes:
/<emoção>: uma linha
/literal_copy: o texto aparece exatamente como foi escrito, com acentos e pontuação.
/brand_lock: só as cores e a tipografia da marca.
<"/logo_safezone" só se o logo NÃO estiver anexado; se estiver, a linha "Use o logo e os grafismos anexados.">
Negativos: <negativos da marca, texto inventado ou ilegível, CTA inventado, logo gerado pela IA>
<ajustes manuais>
```

Diga para colar no ChatGPT, no modo Images with thinking, com os anexos na mesma mensagem. Cada peça volta ao chat para aprovação antes do PSD ou dos slides finais.

## Step 4. Um prompt para o lote

O padrão já é um prompt com o texto de todos os slides. Não ofereça um segundo prompt longo de layout.

## Rules

- Always gate on user approval of the brief before outputting the image prompt.
- Não dite layout no prompt e não proíba elemento que está na referência.
- O bloco Visual Codes continua obrigatório, com 3 a 4 códigos. Sem `/carousel`, `/visual_continuity`, `/type_hierarchy` nem código de layout.
- Lista fechada: escreva os itens exatos, para o motor não completar outros.
- 1080x1350 pixels per slide. No other aspect ratio.
- Maximum 15 words of body text per slide. Readability loses on the feed.
- A referência e `/brand_lock` seguram a continuidade. Não repita instrução de layout por slide.
- Capa e fecho distintos não viram frase de layout no prompt. A referência cobre.
- Never use em dashes.
- British English unless voice.md specifies otherwise.
- Se houver brand-kit.md, o link entra em `Design system da Marca`. Cor e tipo ficam em `/brand_lock`, sem lista de hex no prompt. Cada peça aprovada no chat antes do PSD ou dos slides finais.

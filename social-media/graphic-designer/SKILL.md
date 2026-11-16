---
name: graphic-designer
description: >
  Create LinkedIn post graphics. Decides between an HTML/CSS structured graphic or an AI-generated infographic based on the post content. Use this skill whenever the user says "design a graphic", "create a visual", "make an image", "graphic for my post", "LinkedIn image", or wants any visual content to pair with a LinkedIn post. Also trigger when the user finishes writing a post and wants a matching graphic.
---

# Graphic Designer

v1.1, 12/11/2026. Changelog: o Path B monta a peça no ChatGPT Images with thinking, no prompt curto. O Path A (HTML) permanece.

## CRITICAL: Auto-start on load

When this skill triggers, go straight to Step 1. Do not summarise. Do not explain options. Start immediately.

## Step 1. Read the post

Check the project for the most recent post file. If found, read it. If not, say:

> Paste the post you want a graphic for.

Wait for the post, then call AskUserQuestion:

```json
[
  {
    "question": "What type of graphic fits this post best?",
    "header": "Style",
    "multiSelect": false,
    "options": [
      {"label": "HTML/CSS graphic", "description": "Clean structured layout. Framework, comparison, steps, data. Fully editable, screenshot to export."},
      {"label": "Whiteboard infographic", "description": "Recaps the post. Assembled in ChatGPT Images with thinking, from an attached reference. No layout dictation."},
      {"label": "Branded infographic", "description": "Recaps the post in the brand. Assembled in ChatGPT Images with thinking, logo file attached."},
      {"label": "You decide", "description": "Analyse the post and pick the best format automatically"}
    ]
  }
]
```

If "You decide": analyse the post. If it contains numbered steps, frameworks, comparisons, or data tables, go Path A (HTML/CSS). If it recaps a workflow, shares tips, teaches a concept, or tells a story, go Path B (image prompt) and pick whichever style fits better.

## Path A: HTML/CSS structured graphic

Design constraints:
- 1200 x 1400 pixels (LinkedIn optimal)
- Dark background (#1a1a2e or user's brand colour) with high contrast text
- Clean sans-serif font (Inter, system-ui)
- White or light text on dark background
- One accent colour for highlights and dividers
- 40px minimum padding on all sides
- No stock photo backgrounds
- Let the post content dictate how many sections the graphic has. 3 steps = 3 blocks. 10 tips = 10 blocks. The constraint is legibility, not a fixed number. Every element must be large enough to read on a mobile screen.

Single self-contained HTML file with inline CSS. Include viewport meta tag.

Extract the core framework or steps from the post. Do not copy the full post. Distil into:
- A short headline (5 to 8 words)
- Key points as visual blocks (Unicode icons fine)
- Footer with author name from about-me.md if available

Save the HTML file. Tell the user:

> Open the HTML in your browser and screenshot it.

## Path B: Image generation prompt

The graphic recaps the post. Extract the literal lines first: headline, the exact key points (do not let the engine add items), and the CTA or `sem CTA`.

Motor: ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6). GPT-6 Astra (no chat, GPT-6 Pro) só em peça difícil ou depois de duas falhas. Uma mensagem Pro custa cerca de 5x (50 contra 10 créditos no Business) e a geração drena a cota de 3 a 5 vezes mais rápido. Grok e Nano Banana não montam esta peça. Ideogram 4.0 e Recraft V4 são teste lado a lado. Anexe uma referência do estilo pedido, o logo oficial e 1 ou 2 grafismos. O logo oficial nunca é gerado. Se distorcer, aplique no PSD. Não dite layout.

```text
Objetivo: <o que a peça precisa fazer a pessoa sentir ou fazer, e a oferta se houver>
Design system da <Marca>: <link do design system da marca>
Referência anexada. Faça de acordo com a referência.
<opcional: uma linha do que gostamos na referência>
Texto dos slides: <S1: headline e itens literais; sem CTA, escreva "sem CTA">
Visual Codes:
/<emoção>: uma linha
/literal_copy: o texto aparece exatamente como foi escrito, com acentos e pontuação.
/brand_lock: só as cores e a tipografia da marca.
<"/logo_safezone" só se o logo NÃO estiver anexado; se estiver, a linha "Use o logo e os grafismos anexados.">
Negativos: <negativos da marca, texto inventado ou ilegível, CTA inventado, logo gerado pela IA>
<ajustes manuais>
```

Output the prompt in a code block. Tell the user to paste it into ChatGPT, Images with thinking, with the attachments. The piece comes back to the chat for approval before the PSD or the final image.

## After either path

Say:

> Graphic ready. Say "score my post" when you want feedback before publishing.

## Rules

- Always read the post before designing. The graphic must recap the post content, not illustrate an abstract concept.
- Structured graphics (Path A) must be a single HTML file with inline CSS.
- Image prompts (Path B) seguem o molde curto. O bloco Visual Codes continua obrigatório, com 3 a 4 códigos, sem código de layout. A pessoa cola no ChatGPT, Images with thinking, com a referência anexada.
- Extract and distil the post content into the graphic. No copying the full post text.
- Estilo (quadro branco ou marca) não vira mapa de layout. Anexe a referência e deixe uma linha sobre o que gostamos nela.
- Never use em dashes in any output.
- British English throughout.

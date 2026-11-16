---
name: quote-post
description: >
  Two-step workflow for creating quote posts on LinkedIn. Writes the quote, then a short prompt for ChatGPT Images with thinking that follows the attached reference and sets the quote literally. Use this skill whenever the user says "quote post", "quote graphic", "motivational post", "build me a quote", or wants a low-effort high-engagement LinkedIn graphic. Optimised for LinkedIn's employee and early-career audience, which skews toward motivational content.
---

# Quote Post

v1.1, 12/11/2026. Changelog: a arte da frase monta no ChatGPT Images with thinking, no prompt curto, com a referência anexada.

## CRITICAL: Auto-start on load

When this skill triggers, go straight to Step 1. Do not summarise.

## Step 1. Get the caption

Ask:

> Paste the caption this quote will accompany. The quote should reinforce the caption's message.

Wait for the caption.

## Step 2. Generate quote options

Return 9 viral motivational quote options, grouped into 3 categories of 3 quotes each:

- **Category 1: Growth and transformation** (e.g., "You don't find the time. You make it.")
- **Category 2: Resilience and grit** (e.g., "Your setback is someone else's setup.")
- **Category 3: Contrarian / bold** (e.g., "Stop asking for permission to start.")

Every quote must:

- Be under 15 words
- Feel human and authentic, not corporate
- Avoid jargon or overly technical language
- Work as a standalone line without context
- Punch hard in the first 3 words

Output format:

```
QUOTE OPTIONS for your caption

1. Growth and transformation
   a. [quote]
   b. [quote]
   c. [quote]

2. Resilience and grit
   a. [quote]
   b. [quote]
   c. [quote]

3. Contrarian / bold
   a. [quote]
   b. [quote]
   c. [quote]
```

Then ask:

> Which one lands best for your audience? Reply with the number and letter (e.g. 2b) or paste your own quote if none hit.

## Step 3. Get the reference image

Once the user has picked a quote, ask:

> Paste or describe the reference image you want to recreate. Pinterest, LinkedIn, or Google Images all work. If you don't have one, I will suggest a style.

If the user describes a style instead of uploading an image, recommend:

- **Notebook / hand-drawn** style (simple sketch, cream background, pen marks)
- **Minimalist editorial** (large serif type, lots of white space, one accent colour)
- **Bold poster** (heavy sans-serif, solid colour block background, high contrast)
- **Polaroid or film photo** with text overlay

## Step 4. Output the prompt

A frase entra literal. Motor: ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6). GPT-6 Astra (no chat, GPT-6 Pro) só depois de duas falhas. Uma mensagem Pro custa cerca de 5x (50 contra 10 créditos no Business) e a geração drena a cota de 3 a 5 vezes mais rápido. Não use Grok nem Nano Banana: esta peça tem texto. Anexe a referência. Sem logo oficial, use `/logo_safezone` e escreva `sem CTA` se não houver chamada.

```text
Objetivo: <o que a frase precisa fazer a pessoa sentir ou fazer>
Design system da <Marca>: <link do design system da marca>
Referência anexada. Faça de acordo com a referência.
<opcional: uma linha do que gostamos na referência>
Texto dos slides: <S1: "[CHOSEN QUOTE]"> sem CTA
Visual Codes:
/<emoção>: uma linha
/literal_copy: o texto aparece exatamente como foi escrito, com acentos e pontuação.
/brand_lock: só as cores e a tipografia da marca.
/logo_safezone
Negativos: texto inventado ou ilegível, CTA inventado, logo gerado pela IA, nome ou @ inventado
```

Diga para colar no ChatGPT, Images with thinking, com a referência na mesma mensagem. A peça volta ao chat para aprovação antes do PSD ou de fechar a arte. O bloco Visual Codes continua obrigatório, com 3 a 4 códigos, sem código de layout.

## Step 5. Honest expectation-setting

After the prompt, add:

> Quote posts get strong engagement but lower impressions than other formats. It is not the strongest content type. But for the effort, the return is worth it. This takes minutes.

## Rules

- Always generate at 1080x1350. Horizontal quote graphics get lost on the LinkedIn feed.
- Never allow more than 15 words in the final quote. Longer quotes lose readability.
- Never fabricate attribution. Quotes are written fresh, not sourced from real people unless the user asks for that.
- Never use em dashes in any output.
- British English unless voice.md specifies otherwise.
- Tune the quote options to the user's voice if voice.md exists.
- If the user's voice is explicitly not motivational (analytical, contrarian-only, dry), flag the mismatch and ask if quote posts suit their positioning before generating.

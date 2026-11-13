---
name: youtube-thumbnail
description: >
  Generate a branded YouTube thumbnail from a video title. Uses a reference photo of the creator and a short prompt for ChatGPT Images with thinking, with the hook copied literally. Use this skill whenever the user says "thumbnail", "youtube thumbnail", "build me a thumbnail", or wants a video cover image before writing the script. The thumbnail-first workflow mirrors the graphic-first approach for LinkedIn: sells the video before anyone hears a word of the script.
---

# YouTube Thumbnail

v1.1, 12/11/2026. Changelog: a capa com texto monta no ChatGPT Images with thinking. A foto do criador entra como anexo, não como peça montada no Nano Banana.

## CRITICAL: Auto-start on load

When this skill triggers, go straight to Step 1.

## Step 1. Gather inputs

Check the project for a reference photo config. Look in this order:

1. `thumbnail-config.md` in the project root
2. `brand-kit.md` — look for a reference image path and brand colours
3. `about-me.md` — for the creator's name and positioning

If a reference photo path is stored, pre-fill it. Otherwise ask:

> Upload or provide the path to the reference photo of yourself you want used in the thumbnail. Ideally a clear headshot with distinctive lighting and expression you plan to reuse across videos for brand consistency.

Then call AskUserQuestion:

```json
[
  {
    "question": "What is the video title?",
    "header": "Title",
    "multiSelect": false,
    "options": [
      {"label": "I will type the title", "description": "Type the full working title"},
      {"label": "Suggest one", "description": "Given the topic, propose 3 click-worthy titles first"}
    ]
  },
  {
    "question": "Emotional tone?",
    "header": "Tone",
    "multiSelect": false,
    "options": [
      {"label": "Shock / surprise", "description": "Wide eyes, open mouth, bold reaction"},
      {"label": "Curious / thinking", "description": "Slight smirk, raised eyebrow, gaze off-frame"},
      {"label": "Confident / direct", "description": "Eye contact, calm, assertive"},
      {"label": "Frustrated / strong take", "description": "Intense gaze, hand gesture, tension"}
    ]
  }
]
```

## Step 2. Apply thumbnail best practices

Every thumbnail must follow these rules:

- **Face fills 30 to 50 percent** of the frame. Readable at small sizes.
- **3 to 5 words maximum** of large text. 6 if absolutely necessary.
- **Two colours dominate**. Brand primary + one high-contrast accent (yellow, red, cyan work well).
- **One clear focal element** besides the face. Tool logo, bold number, arrow, or prop.
- **High contrast** between face, text, and background. Test by squinting.
- **Text is not a sentence**. It is a hook phrase. Examples: "I fired my team", "Claude can now...", "Don't do this".
- **No small text, no logos bottom-right** (watch time icon sits there).

## Step 3. Build the thumbnail brief

Output a concise brief the user can review:

```
THUMBNAIL BRIEF: [video title]

Composition: [face position, % of frame, direction of gaze]
Text: "[hook phrase, 3-5 words]"
Text placement: [left, right, top, wraps around face]
Colour palette: [primary hex], [accent hex], [background hex]
Supporting element: [logo / prop / arrow / number]
Emotional tone: [tone from Step 1]
```

Then ask:

> Here's the brief. Say "generate" to output the image prompt or tell me what to change.

## Step 4. Output the prompt

Posição de rosto, hex e placement do briefing não entram no prompt. A referência cobre. A frase entra literal.

Motor: ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6). A capa tem texto, então não use Grok nem Nano Banana para montá-la. A foto do criador é anexo. GPT-6 Astra (no chat, GPT-6 Pro) só depois de duas falhas. Uma mensagem Pro custa cerca de 5x (50 contra 10 créditos no Business) e a geração drena a cota de 3 a 5 vezes mais rápido. Logo oficial, se houver, é o arquivo anexado. Se distorcer, aplique no PSD. Sem chamada, escreva `sem CTA`.

```text
Objetivo: <o que a capa precisa fazer a pessoa sentir ou fazer>
Design system da <Marca>: <link do design system da marca>
Referência anexada. Faça de acordo com a referência.
<opcional: uma linha da expressão ou da ideia de foto>
Texto dos slides: <S1: "[hook phrase]"> sem CTA
Visual Codes:
/<emoção>: uma linha
/literal_copy: o texto aparece exatamente como foi escrito, com acentos e pontuação.
/brand_lock: só as cores e a tipografia da marca.
<"/logo_safezone" só se o logo NÃO estiver anexado; se estiver, a linha "Use o logo e os grafismos anexados.">
Negativos: texto inventado ou ilegível, CTA inventado, logo gerado pela IA, interface do YouTube, marca d'água
<ajuste manual: manter o rosto da foto anexada>
```

Diga para colar no ChatGPT, Images with thinking, com a foto e a referência na mesma mensagem. A capa volta ao chat para aprovação antes do PSD ou de fechar o arquivo. O bloco Visual Codes continua obrigatório, com 3 a 4 códigos, sem código de layout.

## Step 5. Offer the next move

> Want me to outline the video next? Hook, mid, CTA from the thumbnail. Or call the create skill if you have one.

## Rules

- 1280x720 pixels (16:9). YouTube's native thumbnail size.
- Never include the reference photo path in the prompt itself — the user attaches the photo separately.
- Never allow more than 6 words of text, 5 is ideal, 3 is best.
- Face must always be a visible focal point. No face-hidden compositions.
- Never use em dashes.
- British English unless voice.md specifies otherwise.
- If brand-kit.md is in the project, read it and use exact brand colours.
- Recommend the user keep a consistent thumbnail style across videos for channel recognition.

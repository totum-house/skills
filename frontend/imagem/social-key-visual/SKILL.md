---
name: social-key-visual
description: >
  Analisa 4 imagens de referência enviadas pelo usuário para extrair e codificar um design system visual completo, depois aplica esse sistema para gerar key visuals e postagens para redes sociais (feed Instagram 1:1, stories/reels 9:16, feed retrato 4:5) como arquivos PNG prontos para uso. Use esta skill SEMPRE que o usuário mencionar "social-key-visual", enviar imagens de referência de marca/identidade visual, pedir key visuals, postagens para redes sociais, materiais com identidade de marca, ou quiser gerar peças visuais a partir de referências. Também acione quando o usuário mencionar "extrair design system de imagens", "gerar post com minha identidade visual", "criar artes no estilo da marca", ou qualquer pedido de consistência visual entre peças digitais.
---

# Social Key Visual Skill

v1.1, 12/11/2026. Changelog: a peça monta no ChatGPT Images with thinking, com o prompt curto; o Modo Análise permanece.

Esta skill opera em dois modos encadeados:

1. **MODO ANÁLISE** — Extrai o design system a partir de 4 imagens de referência
2. **MODO GERAÇÃO** — Produz key visuals e posts para redes sociais usando o sistema extraído

---

## MODO 1 — ANÁLISE DE REFERÊNCIAS

### Trigger
Quando o usuário enviar 4 imagens (ou indicar que vai enviar), iniciar pelo Modo Análise antes de qualquer geração.

### O que analisar em cada imagem

Examine as 4 imagens com precisão cirúrgica e extraia:

**PALETA DE CORES**
- Cor primária dominante (hex aproximado)
- Cor(es) secundária(s) de suporte
- Cor(es) de destaque / accent
- Cor de background padrão
- Cor de texto principal
- Proporção de uso de cada cor (ex: 60% escuro, 30% médio, 10% accent)

**TIPOGRAFIA**
- Estilo da fonte de título (serifada, sans-serif, display, manuscrita, mono, condensada, etc.)
- Peso preferencial (light, regular, bold, black, condensed)
- Estilo da fonte de corpo (se diferente)
- Alinhamento predominante (centralizado, esquerda, direita)
- Tamanho relativo dos títulos vs subtítulos vs corpo
- Se usa caixa alta, baixa ou mista

**LINGUAGEM VISUAL / ESTÉTICA**
- Estilo geral (minimalista, editorial, brutal, orgânico, geométrico, ilustrativo, fotográfico, etc.)
- Uso de espaço negativo (generoso / apertado / balanceado)
- Textura ou ruído (presente / ausente / sutil)
- Bordas e contornos (arredondados / retos / sem borda)
- Sombras e profundidade (flat / com sombra / com profundidade)
- Elementos decorativos recorrentes (linhas, formas, ícones, padrões, grafismos)

**GRID E COMPOSIÇÃO**
- Estrutura de layout preferencial (centralizado / assimétrico / dividido em zonas / full bleed)
- Hierarquia visual (o que aparece primeiro, segundo, terceiro)
- Posicionamento de logo/marca (se identificável)
- Relação figura/fundo
- Presença de molduras, margens ou sangria

**TOM E ATMOSFERA**
- Temperatura emocional (premium, humano, técnico, jovem, espiritual, urgente, calmo, etc.)
- Referências estéticas identificáveis (editorial de revista, poster vintage, app moderno, luxury brand, etc.)

---

### Output do Modo Análise

Apresente o design system extraído no seguinte formato estruturado:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM EXTRAÍDO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PALETA
• Background: [hex] — uso dominante
• Primária: [hex] — [% estimado]
• Secundária: [hex] — [% estimado]  
• Accent: [hex] — uso pontual
• Texto: [hex]

TIPOGRAFIA
• Título: [estilo] / [peso] / [case] / [alinhamento]
• Corpo: [estilo] / [peso]
• Destaque: [se houver variação]

ESTÉTICA
• Estilo: [descrição em 1 linha]
• Espaço negativo: [generoso/balanceado/apertado]
• Textura: [presente/ausente/sutil]
• Formas: [arredondadas/retas/orgânicas]
• Elementos recorrentes: [lista]

COMPOSIÇÃO
• Grid: [centralizado/assimétrico/zonas/full bleed]
• Hierarquia: [o que domina primeiro]
• Atmosfera: [temperatura emocional]

FILOSOFIA VISUAL (síntese em 2-3 linhas)
[Uma descrição poética e precisa do DNA visual da marca]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Após apresentar, perguntar:
> "Design system extraído. Quer ajustar algo antes de gerar as peças? Se não, me diga: qual o texto/mensagem principal e qual formato priorizar — feed 1:1, stories 9:16 ou retrato 4:5?"

---

## MODO 2 — GERAÇÃO DE KEY VISUALS

### Entrada esperada
- Design system extraído (do Modo 1 ou fornecido pelo usuário)
- Texto/mensagem principal da peça
- Formato: `feed` (1080×1080px), `stories` (1080×1920px), `retrato` (1080×1350px) — ou "todos"
- Contexto opcional: tema, data comemorativa, CTA, hashtags, etc.

### Processo de criação

A peça (layout, texto em pt-BR, logo e grafismos) monta no ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6), no lote inteiro. GPT-6 Astra (no chat, GPT-6 Pro) só em peça difícil ou depois de duas falhas: uma mensagem Pro custa cerca de 5x (50 contra 10 créditos no Business) e a geração drena a cota de 3 a 5 vezes mais rápido. Grok Imagens e Nano Banana só para foto sem texto. Ideogram 4.0 e Recraft V4 são teste lado a lado, não o padrão. O logo oficial nunca é gerado: anexe o arquivo e, se distorcer, aplique no PSD.

Anexe em toda geração as referências do Modo 1 (ou o KV), o logo oficial e 1 ou 2 grafismos. Não dite o layout e não proíba elemento que está na referência. Sem CTA, escreva `sem CTA`. Lista fechada: os itens exatos. Cada peça volta ao chat para aprovação antes do PSD ou dos slides finais.

Formatos, se o pedido não disser outro: feed 1080×1080, stories 1080×1920, retrato 1080×1350. O tamanho não vira aula de layout.

```text
Objetivo: <o que a peça precisa fazer a pessoa sentir ou fazer, e a oferta se houver>
Design system da <Marca>: <link do design system da marca>
Referência anexada. Faça de acordo com a referência.
<opcional: uma linha do que gostamos na referência, ou uma ideia de foto>
Texto dos slides: <S1 (capa): ...> <S2: ...> ... (copy literal, cada slide)
Visual Codes:
/<emoção>: uma linha
/literal_copy: o texto aparece exatamente como foi escrito, com acentos e pontuação.
/brand_lock: só as cores e a tipografia da marca.
<"/logo_safezone" só se o logo NÃO estiver anexado; se estiver, a linha "Use o logo e os grafismos anexados.">
Negativos: <negativos da marca, texto inventado ou ilegível, CTA inventado, logo gerado pela IA>
<ajustes manuais, por exemplo personagens>
```

O bloco Visual Codes continua obrigatório, com 3 a 4 códigos. Sem `/carousel`, `/visual_continuity`, `/type_hierarchy` nem código de layout.

---

### Fontes disponíveis (caminho: `/mnt/skills/examples/canvas-design/canvas-fonts/`)

| Arquivo | Estilo |
|---|---|
| BricolageGrotesque-Bold.ttf | Sans display, impacto |
| BricolageGrotesque-Regular.ttf | Sans display, limpo |
| WorkSans-Bold.ttf | Sans funcional, forte |
| WorkSans-Regular.ttf | Sans funcional, corpo |
| InstrumentSans-Bold.ttf | Sans editorial, moderno |
| InstrumentSans-Regular.ttf | Sans editorial, corpo |
| CrimsonPro-Bold.ttf | Serif elegante, força |
| CrimsonPro-Regular.ttf | Serif elegante, corpo |
| CrimsonPro-Italic.ttf | Serif elegante, ênfase |
| Lora-Bold.ttf | Serif literário, força |
| Lora-Regular.ttf | Serif literário, corpo |
| IBMPlexSerif-Bold.ttf | Serif técnico, autoridade |
| IBMPlexMono-Regular.ttf | Mono, detalhe técnico |
| GeistMono-Regular.ttf | Mono moderno |
| Outfit-Bold.ttf | Sans friendly, impacto |
| Outfit-Regular.ttf | Sans friendly, corpo |
| BigShoulders-Bold.ttf | Condensado, grito |
| Boldonse-Regular.ttf | Display decorativo |
| Gloock-Regular.ttf | Serif editorial clássico |
| Italiana-Regular.ttf | Serif luxo, fino |
| PoiretOne-Regular.ttf | Sans art deco, elegante |
| NationalPark-Bold.ttf | Sans outdoor, impacto |
| Jura-Medium.ttf | Sans técnico, refinado |
| YoungSerif-Regular.ttf | Serif humanista |

**Critério de escolha:** Selecionar a fonte que mais se aproxima do estilo tipográfico identificado no design system. Priorizar coerência com a atmosfera da marca.

---

A lista de fontes acima não monta a peça. No PSD, a fonte é a da marca.

### Template Python base (não é o caminho de montagem)

```python
from PIL import Image, ImageDraw, ImageFont
import os

FONTS_PATH = "/mnt/skills/examples/canvas-design/canvas-fonts/"
OUTPUT_PATH = "/mnt/user-data/outputs/"

def load_font(filename, size):
    """Carrega fonte com fallback seguro."""
    try:
        return ImageFont.truetype(os.path.join(FONTS_PATH, filename), size)
    except:
        return ImageFont.load_default()

def hex_to_rgb(hex_color):
    """Converte hex para RGB."""
    h = hex_color.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def create_key_visual(
    width, height, 
    bg_color, primary_color, accent_color, text_color,
    title_text, subtitle_text=None,
    font_title="BricolageGrotesque-Bold.ttf",
    font_body="WorkSans-Regular.ttf",
    output_name="key_visual.png"
):
    img = Image.new("RGB", (width, height), color=hex_to_rgb(bg_color))
    draw = ImageDraw.Draw(img)
    
    margin = 72
    safe_w = width - (margin * 2)
    safe_h = height - (margin * 2)
    
    # [Implementar layout específico aqui]
    
    os.makedirs(OUTPUT_PATH, exist_ok=True)
    img.save(os.path.join(OUTPUT_PATH, output_name), "PNG", quality=95)
    return os.path.join(OUTPUT_PATH, output_name)
```

---

### Output esperado

- PNG da peça, no chat, antes de PSD ou de fechar os slides
- Nome de arquivo: `[marca-ou-tema]_[formato]_[variacao].png`
- Nota curta do que a referência puxou, sem reescrever o layout

---

## NOTAS DE QUALIDADE

Esta skill deve produzir peças que pareçam ter sido criadas por um designer humano experiente — não por IA. Os indicadores de qualidade são:

1. **Consistência**: Todas as peças geradas numa sessão devem ser reconhecíveis como da mesma marca
2. **Intenção**: Cada decisão de layout deve ser explicável pela filosofia visual extraída
3. **Contenção**: Menos é mais — resistir à tentação de adicionar elementos decorativos sem função
4. **Tipografia**: O texto deve respirar — nunca colado nas bordas, nunca pequeno demais para leitura em mobile
5. **Impacto**: Deve funcionar como thumbnail — reconhecível a 100px de distância

---

## FLUXO COMPLETO (referência rápida)

```
USUÁRIO envia 4 imagens + brief
    ↓
MODO 1: Analisar imagens → extrair design system → apresentar ao usuário
    ↓
USUÁRIO confirma ou ajusta sistema
    ↓
MODO 2: prompt curto → ChatGPT Images with thinking → aprovação no chat → PSD só se o logo distorcer ou se pedirem camadas
    ↓
Perguntar se quer variações, outro formato ou ajustes
```

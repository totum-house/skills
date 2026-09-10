---
name: design-system-extrator
description: >
  Extrai o design system completo de um site ao vivo a partir de uma URL — paleta de cores, tipografia, espaçamento, grid, componentes e tokens técnicos (hex, font-family, px) — sem precisar de imagens enviadas pelo usuário. Use esta skill SEMPRE que o usuário pedir para "extrair design system de um site", "tirar a paleta desse site", "pegar as fontes desse site", "documentar o design system de [URL]", "auditar visualmente um site concorrente", ou fornecer uma URL pedindo para identificar cores/fontes/estilo. Também acione quando o usuário mencionar "design-system-extrator", "clonar identidade visual de um site" (para fins de benchmark/inspiração, não replicação 1:1), "benchmark visual de concorrente", ou quiser um design system ou tokens reutilizáveis a partir de um site existente de terceiros. Diferente do social-key-visual (que parte de imagens enviadas pelo usuário), esta skill parte de uma URL viva e inspeciona o CSS renderizado no navegador.
---

# Design System Extrator

Extrai o DNA visual de um site ao vivo — cores, tipografia, espaçamento, grid, componentes — direto do CSS renderizado, sem depender de screenshots enviados pelo usuário. Produz o mesmo tipo de output do `social-key-visual`, mas com precisão técnica: valores hex exatos, font-stacks reais, escalas de espaçamento medidas, não estimadas visualmente.

## Quando usar vs. skills irmãs

| Situação | Skill certa |
|---|---|
| Usuário envia 4 imagens de referência | `social-key-visual` |
| Usuário dá uma URL de site ao vivo | **esta skill** |
| Objetivo é redesenhar/elevar um site existente | `totum-redesign-existente` (pode chamar esta skill primeiro para auditoria técnica) |
| Objetivo é documentar sistema de um projeto próprio (código) | `design:design-system` |
| Output final precisa virar `DESIGN.md` pro Google Stitch | rodar esta skill, depois formatar com `totum-stitch-design` |

## Pré-requisitos

Esta skill depende de acesso de browser. Antes do primeiro uso na sessão, chamar `tool_search` com query como "chrome browser navigate javascript" para carregar as ferramentas `claude-in-chrome`. Se não houver browser conectado ou disponível, cair para o "Modo sem browser" (ver abaixo) em vez de travar o pedido.

## Fluxo principal

### Passo 1 — Captura

1. `claude-in-chrome:navigate` até a URL fornecida.
2. Confirmar carregamento completo (ex: `get_page_text` retornando conteúdo não vazio).
3. Screenshot em dois viewports: desktop (~1440×900) e mobile (~390×844), usando `resize_window` + `computer`. Isso captura decisões visuais que CSS puro não revela: proporções reais, breakpoints aplicados de fato, tratamento de imagem/ilustração.
4. Se o site tiver mais de uma página-tipo relevante para o objetivo (ex: home + página de preço/produto) e o usuário não restringiu o escopo, perguntar se quer incluir uma segunda página antes de gastar uma rodada extra de captura — não assumir sozinho.

### Passo 2 — Inspeção técnica via JavaScript

Rodar via `claude-in-chrome:javascript_tool` o script `scripts/extract_tokens.js` (bundlado nesta skill) no contexto da página carregada. Ele varre o DOM renderizado e devolve um JSON com:

**Cores**
- Cores computadas de `background-color` e `color` nos elementos mais frequentes (body, headers, botões primários/secundários, links, cards)
- Custom properties do `:root` (variáveis CSS — sinal de que o site já tem um sistema de design formal)
- Ranking por frequência real de uso no DOM, não apenas o que existe declarado no CSS

**Tipografia**
- `font-family` computado de h1–h6, body, botões, labels
- `font-size`, `font-weight`, `line-height`, `letter-spacing` por nível de heading
- Escala tipográfica (razão entre tamanhos consecutivos)

**Espaçamento e grid**
- `max-width` dos containers principais
- `padding`/`margin` de 3 a 5 seções (nunca uma amostra só)
- `gap` em grids/flexbox
- Breakpoints ativos via `window.matchMedia` nos pontos comuns (640, 768, 1024, 1280, 1536px)

**Componentes**
- `border-radius`, `box-shadow`, `transition` de botões e cards
- Estados de hover quando detectáveis via CSSOM

Se o script falhar (CSP bloqueando execução, SPA renderizando em canvas, etc.), usar `read_page` (accessibility tree) + os dois screenshots como fallback, e sinalizar explicitamente no output quais valores são medidos e quais são estimados visualmente.

### Passo 3 — Síntese

Cruzar os dados técnicos do Passo 2 com a leitura visual dos screenshots do Passo 1 para preencher o que CSS não expõe diretamente: estilo geral, atmosfera, uso de espaço negativo, elementos decorativos recorrentes — mesma lógica de leitura qualitativa usada no `social-key-visual`.

### Passo 4 — Output

Apresentar primeiro no chat, no formato abaixo (mantém consistência com o output do `social-key-visual`):

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM EXTRAÍDO — [nome do site]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PALETA
• Background: [hex] — uso dominante
• Primária: [hex] — [contexto de uso]
• Secundária: [hex]
• Accent: [hex] — uso pontual
• Texto: [hex]

TIPOGRAFIA
• Título: [font-family real] / [peso] / [tamanho] / [escala]
• Corpo: [font-family real] / [peso] / [tamanho]
• Botões/labels: [se diferente]

ESPAÇAMENTO E GRID
• Container max-width: [px]
• Padding de seção: [px, faixa observada]
• Grid gap: [px]
• Breakpoints ativos: [lista]

COMPONENTES
• Border-radius: [px]
• Sombra: [valor ou "flat, sem sombra"]
• Transições: [duração/easing se detectado]

ESTÉTICA (leitura qualitativa)
• Estilo: [descrição em 1 linha]
• Espaço negativo: [generoso/balanceado/apertado]
• Elementos recorrentes: [lista]

FILOSOFIA VISUAL (síntese em 2-3 linhas)
[Descrição precisa do DNA visual do site]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Depois do resumo, sempre gerar dois arquivos em `/mnt/user-data/outputs/`:

1. **`[site]_design-system.md`** — o documento completo acima, formatado, para arquivo e consulta.
2. **`[site]_tokens.json`** — tokens brutos estruturados, prontos para consumo direto em código (Tailwind config, CSS variables, etc.):

```json
{
  "source_url": "",
  "extracted_at": "",
  "colors": { "background": "", "primary": "", "secondary": "", "accent": "", "text": "" },
  "typography": {
    "heading": { "family": "", "weights": [], "scale": [] },
    "body": { "family": "", "weight": "", "size": "" }
  },
  "spacing": { "container_max_width": "", "section_padding": "", "grid_gap": "", "breakpoints": [] },
  "components": { "border_radius": "", "shadow": "", "transition": "" }
}
```

Apresentar os dois arquivos com `present_files`.

## Modo sem browser

Se `claude-in-chrome` não estiver disponível na sessão (checar via `tool_search`; ausência de resultado ou usuário sem a extensão conectada), avisar isso primeiro e oferecer duas alternativas:

1. Extração parcial via `web_fetch` do HTML/CSS bruto — funciona bem em sites server-rendered simples, falha em SPAs pesadas (React/Vue client-side puro).
2. Usuário envia 4 screenshots do site → cai para o fluxo do `social-key-visual`.

Nunca apresentar valores como "medidos" se a extração técnica não rodou de fato — sinalizar com clareza quais campos são reais e quais são estimados.

## Notas de qualidade

1. **Medir, não adivinhar.** Sempre que o JavaScript de inspeção rodar com sucesso, usar os valores reais. Só cair para estimativa visual quando a inspeção técnica falhar — e sinalizar isso no output.
2. **Múltiplos pontos, nunca um só.** Não inferir paleta ou tipografia a partir de um único elemento — amostrar pelo menos 3 a 5 pontos por categoria antes de concluir.
3. **Site nem sempre é a marca inteira.** Uma landing page pode ter identidade diferente da área logada do produto. Se o objetivo for benchmark de marca completa, perguntar se há mais de uma superfície a inspecionar.
4. **Uso responsável.** Este processo serve para benchmark, inspiração e referência interna — não para clonar identidade visual de terceiros de forma idêntica em material publicado. Sinalizar isso se o pedido sugerir replicação 1:1 de uma marca com identidade registrada.

## Fluxo completo (referência rápida)

```
USUÁRIO fornece URL + escopo (1 página ou mais)
    ↓
PASSO 1: Navegar + screenshots desktop/mobile
    ↓
PASSO 2: Rodar JS de inspeção (extract_tokens.js) → tokens técnicos brutos
    ↓
PASSO 3: Cruzar dados técnicos com leitura visual → síntese qualitativa
    ↓
PASSO 4: Apresentar no chat + salvar .md e .json em outputs + present_files
    ↓
Perguntar se quer aplicar o sistema extraído em algo (redesign, key visual, LP, DESIGN.md)
```

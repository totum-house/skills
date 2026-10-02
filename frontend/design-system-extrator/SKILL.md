---
name: design-system-extrator
description: >
  Extrai o design system de um site, de uma URL ao vivo ou de um HTML já salvo/exportado (zip de builder tipo Lovable/aura.build/v0). Produz um relatório de tokens (.md+.json: paleta, tipografia, espaçamento, componentes) ou um `design-system.html` limpo reescrito do zero, visualmente idêntico ao original, com CSS/JS inline extraído em arquivos organizados, SVGs classificados e texto em PT-BR. Use SEMPRE que o usuário pedir "extrair design system de um site", "tirar a paleta desse site", "pegar as fontes desse site", "documentar o design system de [URL]", "auditar site concorrente", "limpar esse HTML", "separar CSS e JS inline desse arquivo", "reescrever esse HTML do zero", "gerar design-system.html a partir desse export", ou anexar HTML/zip exportado pedindo pra organizar/clonar a estrutura visual. Também acione com "design-system-extrator", "clonar identidade visual de site" (benchmark, não republicação idêntica), ou "benchmark visual de concorrente".
---

# Design System Extrator

Extrai o DNA visual de um site — cores, tipografia, espaçamento, grid, componentes, e opcionalmente o próprio HTML limpo e reescrito — a partir de duas fontes possíveis: uma URL ao vivo, ou um HTML já salvo/exportado (pasta ou zip). Tem dois modos de saída, escolhidos conforme o pedido do usuário:

- **Modo A — Relatório de tokens**: paleta, tipografia, espaçamento e componentes documentados em `.md` + `.json`. Rápido, bom para benchmark e referência de outra skill (ex: alimentar um redesign).
- **Modo B — HTML reescrito**: um `design-system.html` novo, escrito do zero mas visualmente idêntico ao original, com todo CSS/JS inline extraído em arquivos organizados e SVGs tratados corretamente. Bom quando o objetivo é ter um ponto de partida de código limpo, não só um relatório.

Se o pedido do usuário não deixar claro qual dos dois modos ele quer, perguntar antes de começar — os dois têm custo de execução bem diferente.

## Quando usar vs. skills irmãs

| Situação | Skill certa |
|---|---|
| Usuário envia 4 imagens de referência | `social-key-visual` |
| Usuário dá uma URL de site ao vivo, quer só o relatório de tokens | **esta skill, Modo A** |
| Usuário anexa um HTML/zip exportado, quer um HTML limpo reescrito | **esta skill, Modo B** |
| Objetivo é redesenhar/elevar um site existente do próprio cliente | `totum-redesign-existente` (pode chamar esta skill primeiro, Modo A, para auditoria técnica) |
| Objetivo é documentar sistema de um projeto próprio (código) | `design:design-system` |
| Objetivo final é construir um site novo em código de produção (Tailwind/React) | `frontend-design` — pode consumir o output desta skill (qualquer um dos dois modos) como referência de tokens |
| Output final precisa virar `DESIGN.md` pro Google Stitch | rodar esta skill (Modo A), depois formatar com `totum-stitch-design` |

## Entrada ($SOURCE)

$SOURCE pode ser:
1. **Uma URL ao vivo** — requer browser (`claude-in-chrome`). Antes do primeiro uso na sessão, chamar `tool_search` com query como "chrome browser navigate javascript" para carregar as ferramentas. Se não houver browser conectado, cair no "Modo sem browser" (ver abaixo).
2. **Um arquivo `.html` local**, ou **uma pasta/zip de export** (ex: "Salvar página como → Completa", export do Lovable/aura.build/v0/Framer). Não precisa de browser — trabalhar direto nos arquivos com `Read`/`Grep`/bash.

Se vier um `.zip`, extrair primeiro. Se vier uma pasta com muitos arquivos (exports de builders tipo aura.build/Lovable costumam vir com **centenas** de arquivos JS irrelevantes — chrome do próprio editor, não do site), identificar o `index.html` real pelo `<title>`/`<meta description>` e, na análise, considerar apenas os assets que o `index.html` de fato referencia (`<link>`, `<script src>`, `<img src>`, `<video src>` etc.) — ignorar o resto da pasta. Arquivos CSS/JS grandes (>200KB) devem ser inspecionados via `grep`/bash, não via `Read` direto (o `Read` tem limite de ~256KB e trunca).

---

## MODO A — Relatório de tokens (URL ao vivo, ou HTML local)

### Passo 1 — Captura (só se for URL)

1. `claude-in-chrome:navigate` até a URL fornecida.
2. Confirmar carregamento completo (ex: `get_page_text` retornando conteúdo não vazio).
3. Screenshot em dois viewports: desktop (~1440×900) e mobile (~390×844), usando `resize_window` + `computer`. Isso captura decisões visuais que CSS puro não revela: proporções reais, breakpoints aplicados de fato, tratamento de imagem/ilustração.
4. Se o site tiver mais de uma página-tipo relevante para o objetivo (ex: home + página de preço/produto) e o usuário não restringiu o escopo, perguntar se quer incluir uma segunda página antes de gastar uma rodada extra de captura — não assumir sozinho.

### Passo 2 — Inspeção técnica

**Se for URL com browser disponível**: rodar via `claude-in-chrome:javascript_tool` o script `scripts/extract_tokens.js` (bundlado nesta skill) no contexto da página carregada. Ele varre o DOM renderizado e devolve um JSON com:

**Cores** — cores computadas de `background-color`/`color` nos elementos mais frequentes (body, headers, botões, links, cards); custom properties do `:root`; ranking por frequência real de uso no DOM, não apenas o que existe declarado no CSS.

**Tipografia** — `font-family` computado de h1–h6, body, botões, labels; `font-size`, `font-weight`, `line-height`, `letter-spacing` por nível; escala tipográfica (razão entre tamanhos consecutivos).

**Espaçamento e grid** — `max-width` dos containers principais; `padding`/`margin` de 3 a 5 seções (nunca uma amostra só); `gap` em grids/flexbox; breakpoints ativos via `window.matchMedia`.

**Componentes** — `border-radius`, `box-shadow`, `transition` de botões e cards; estados de hover quando detectáveis via CSSOM.

**Se for HTML local** (arquivo ou pasta exportada): não há DOM renderizado nem `window.getComputedStyle` disponível. Em vez disso, medir direto do texto-fonte com `grep`/bash:
- Se o site usa um framework utility-first (Tailwind e afins — reconhecível por classes tipo `bg-stone-950`, `text-4xl`, `gap-8` no HTML), extrair a frequência de classes de cor/tipografia/espaçamento com `grep -oE 'class="[^"]*"' | tr ' ' '\n' | sort | uniq -c | sort -rn`, e resolver os valores reais (hex, px) a partir da tabela padrão do framework ou do CSS compilado bundlado (procurar `.bg-xxx{...}` no arquivo `.css` de build).
- Se o site usa CSS customizado, procurar por `:root{...}` (custom properties), blocos `<style>` inline, e folhas de estilo vinculadas — grep por `background-color`, `font-family`, `border-radius`, `box-shadow`, `@media` etc.
- Amostrar múltiplos elementos reais (h1, h2, nav, section, button, footer) via grep de `<tag[^>]*class="[^"]*"` para pegar padrões de verdade, nunca inferir a partir de um único elemento.

Se a inspeção técnica falhar (CSP bloqueando execução, SPA renderizando em canvas, HTML minificado sem classes legíveis etc.), usar `read_page` (accessibility tree) + os screenshots como fallback, e sinalizar explicitamente no output quais valores são medidos e quais são estimados visualmente.

### Passo 3 — Síntese

Cruzar os dados técnicos do Passo 2 com a leitura visual dos screenshots (se houver) para preencher o que CSS não expõe diretamente: estilo geral, atmosfera, uso de espaço negativo, elementos decorativos recorrentes.

### Passo 4 — Output

Apresentar primeiro no chat, neste formato:

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

### Modo sem browser (só se a URL exigir renderização e não houver browser)

Se `claude-in-chrome` não estiver disponível na sessão (checar via `tool_search`; ausência de resultado ou usuário sem a extensão conectada), avisar isso primeiro e oferecer três alternativas:

1. Extração parcial via `web_fetch` do HTML/CSS bruto — funciona bem em sites server-rendered simples, falha em SPAs pesadas (React/Vue client-side puro).
2. Usuário salva a página como HTML (Ctrl/Cmd+S → "Página completa") e anexa o arquivo/pasta — cai automaticamente no fluxo de "HTML local" acima, que nem precisa de browser.
3. Usuário envia 4 screenshots do site → cai para o fluxo do `social-key-visual`.

---

## MODO B — HTML reescrito do zero (`design-system.html`)

Use este modo quando o usuário quer, além (ou em vez) do relatório de tokens, um arquivo de código real: visualmente idêntico ao original, mas limpo, organizado, com assets extraídos e pronto para servir de ponto de partida a um projeto novo.

**Saída**: cria arquivos novos, relativos à pasta do `$SOURCE`. Nunca modifica o input original ou qualquer arquivo pré-existente.

Executar os passos abaixo em ordem. Completar cada um totalmente antes de passar pro próximo — não pule direto pra escrita do HTML sem ter mapeado tudo primeiro, o resultado sai incompleto.

### Passo 1 — Analisar

Ler o `$SOURCE` inteiro com atenção. Memorizar:
- Toda cor, gradiente, sombra e superfície
- Toda fonte, tamanho, peso, espaçamento e padrão tipográfico
- Toda animação, keyframe, transição e comportamento de hover
- Todo componente de UI: botões, cards, badges, inputs, accordions
- Todo padrão de layout: grids, colunas, espaçamento, alinhamento
- Todo efeito decorativo: backgrounds, glows, beams, padrões
- Todo asset referenciado: CSS, JS, fontes, imagens, CDNs
- Todo bloco `<style>` e `<script>` inline
- Todo elemento SVG e seu contexto de uso

Não começar a escrever nenhum arquivo antes de completar este passo.

### Passo 2 — Extrair CSS inline

Varrer o `$SOURCE` em busca de todo bloco `<style>` inline.

Para cada bloco:
- Determinar o que aquele CSS faz
- Salvar o conteúdo em `assets/css/[nome-descritivo].css`
- Nomear pela função: ex. `animations.css`, `components.css`, `buttons.css`
- Se vários blocos servem à mesma finalidade, mesclar em um único arquivo

### Passo 3 — Extrair JS inline

Varrer o `$SOURCE` em busca de todo bloco `<script>` inline que contenha JS de verdade.

Para cada bloco:
- Determinar o que aquele JS faz
- Salvar o conteúdo em `assets/js/[nome-descritivo].js`
- Nomear pela função: ex. `scroll-reveal.js`, `accordion.js`, `interactions.js`
- Se vários blocos servem à mesma finalidade, mesclar em um único arquivo

NÃO extrair:
- Blocos `<script type="application/ld+json">`
- Scripts de handler de evento de uma linha só

### Passo 4 — Classificar todo SVG

Varrer o `$SOURCE` em busca de todo elemento `<svg>` inline. Classificar cada um em exatamente uma destas três categorias:

**Categoria A — Ícone Lucide**
O SVG tem `class="lucide lucide-[nome]..."` ou `data-lucide="[nome]"`.
Substituir por: `<i data-lucide="[nome]" class="[classes originais não-lucide]"></i>`
O runtime JS do Lucide (já linkado) renderiza corretamente. Classes de cor (`text-orange-500`, `fill-current` etc.) continuam funcionando normalmente.
Não salvar como arquivo.

**Categoria B — SVG customizado usando currentColor**
O SVG usa `fill="currentColor"`, `stroke="currentColor"`, ou depende de classes Tailwind de cor herdadas via CSS.
Estes DEVEM continuar inline — extrair para `<img>` quebra a herança de cor.
Não salvar como arquivo. Minificar para uma única linha.

**Categoria C — SVG customizado só com cores fixas**
O SVG usa apenas valores hex/rgba fixos e não depende de herança de cor via CSS em nenhum estado (incluindo hover).
Salvar em `assets/images/svg/[nome-descritivo].svg`
Substituir por: `<img src="assets/images/svg/[nome].svg" class="[classes originais]" alt="[descrição]"/>`

Regras:
- Na dúvida entre B e C, sempre manter inline (escolher B)
- Nunca usar `<img>` para SVG que muda de cor no hover ou via classe do elemento pai
- Se o mesmo SVG aparece várias vezes, classificar uma vez e aplicar a mesma decisão em todas as ocorrências

### Passo 5 — Escrever o `design-system.html` do zero

Usando tudo memorizado no Passo 1, escrever um novo `design-system.html` na mesma pasta do `$SOURCE`.

Isto não é uma cópia nem uma edição do input. Escrever limpo, do zero, seção por seção.

**Estrutura do `<head>`:**
```html
<head>
  <!-- fonts -->
  <link .../>

  <!-- css -->
  <!-- [o que este arquivo contém e onde é usado] -->
  <link rel="stylesheet" href="assets/css/animations.css"/>

  <!-- js só de head (ex: runtime do Tailwind, precisa ficar no head) -->
  <!-- [o que este script faz] -->
  <script src="assets/resource_xxx.js"></script>
</head>
```

**Estrutura do `<body>`:**
```html
<body>

  <!-- [id-da-seção] -->
  ...conteúdo da seção...

  <!-- js -->
  <!-- [o que este arquivo faz e onde é usado] -->
  <script src="assets/js/interactions.js"></script>

</body>
```

**Regras de renderização de SVG:**
- Categoria A (Lucide): `<i data-lucide="[nome]" class="[classes]"></i>`
- Categoria B (currentColor): manter o SVG completo inline, minificado numa linha
- Categoria C (cores fixas): `<img src="assets/images/svg/[nome].svg" .../>`

**Regras de fidelidade visual:**
- Toda seção do original precisa estar presente
- Reprodução pixel-perfect: mesmo layout, espaçamento, cores e efeitos
- Todas as animações, transições, estados de hover e efeitos decorativos intactos
- Todos os caminhos de asset existentes (imagens, CSS, JS) preservados exatamente como no `$SOURCE`
- Traduzir todo o texto visível para português brasileiro (PT-BR): headings, parágrafos, labels, botões, itens de nav, badges, legendas e qualquer outro texto voltado ao usuário. NÃO traduzir: código, nomes de classe, caminhos de asset ou identificadores técnicos. Esse é o comportamento padrão porque a Totum trabalha majoritariamente pro mercado brasileiro — se o usuário pedir explicitamente pra manter o idioma original (ex: quer usar como referência de código, não como conteúdo final), manter o texto como está.

**Regras de compactação:**
- Sem linhas em branco nem espaço em branco desnecessário
- Sem atributos vazios ou redundantes
- Sem referência a asset que não é usado
- SVGs inline (Categoria B) minificados numa única linha cada

### Barra de qualidade

Antes de salvar, verificar:
- [ ] Toda seção do original está presente e visualmente idêntica
- [ ] Nenhum bloco `<style>` ou `<script>` inline sobrou
- [ ] Todo ícone Lucide usa `<i data-lucide>` — nunca `<img>` ou SVG inline
- [ ] Nenhum SVG com currentColor foi movido para `<img>`
- [ ] Todos os caminhos de asset extraídos resolvem corretamente
- [ ] Todo import no `<head>` e antes do `</body>` tem comentário descritivo
- [ ] Nenhum comentário dentro do body além de labels de seção e imports de asset
- [ ] Todo texto visível foi traduzido pra PT-BR (a menos que o usuário tenha pedido pra manter o original)
- [ ] O arquivo é visivelmente menor e mais limpo que o `$SOURCE`

### Passo 6 — Escrever `STACK.md`

Depois de salvar o `design-system.html`, criar um arquivo `STACK.md` na mesma pasta.

Listar toda tecnologia, biblioteca e ferramenta encontrada no `$SOURCE`. Para cada uma, uma linha: nome + o que faz nesse projeto. Sem categorias, sem headers, sem enfeite. Só a lista.

Formato:
```
- **Tailwind CSS** — framework CSS utility-first usado em todo o layout e estilo
- **Lucide** — biblioteca de ícones usada na interface inteira
```

Incluir só o que está de fato presente no source. Não inventar nem assumir tecnologias que não foram encontradas.

### Depois de gerar

Apresentar `design-system.html`, `STACK.md` e a pasta `assets/` com `present_files`, e perguntar se o usuário quer aplicar esse HTML como base pra algum projeto específico (ex: passar pro `frontend-design` pra virar um site novo, ou pro `totum-redesign-existente` pra comparar com um site atual).

---

## Notas de qualidade (ambos os modos)

1. **Medir, não adivinhar.** Sempre que a inspeção técnica (JS no browser, ou grep no HTML/CSS-fonte) rodar com sucesso, usar os valores reais. Só cair para estimativa visual quando a inspeção técnica falhar — e sinalizar isso no output.
2. **Múltiplos pontos, nunca um só.** Não inferir paleta, tipografia ou estrutura a partir de um único elemento — amostrar pelo menos 3 a 5 pontos por categoria antes de concluir.
3. **Site nem sempre é a marca inteira.** Uma landing page pode ter identidade diferente da área logada do produto. Se o objetivo for benchmark de marca completa, perguntar se há mais de uma superfície a inspecionar.
4. **Pasta exportada nem sempre é só o site.** Exports de builders de IA (aura.build, Lovable, v0, Framer) costumam incluir o chrome inteiro do editor — centenas de arquivos JS que não têm nada a ver com a página que o usuário quer. Filtrar pelo que o `index.html` de fato referencia antes de processar qualquer coisa.
5. **Uso responsável.** Este processo serve para benchmark, inspiração, auditoria e ponto de partida de código interno — não para publicar a identidade visual de terceiros de forma idêntica em material final de cliente, especialmente no Modo B, que produz uma reprodução pixel-perfect. Se o pedido sugerir replicação 1:1 de uma marca com identidade registrada pra publicação, sinalizar isso e recomendar diferenciação antes de qualquer entrega final.

## Fluxo completo (referência rápida)

```
USUÁRIO fornece $SOURCE (URL ou HTML/zip local) + qual modo quer (A: relatório, B: HTML limpo)
    ↓
Se pasta/zip: extrair e identificar o index.html real (ignorar chrome de builder)
    ↓
MODO A                                          MODO B
Captura (se URL) → screenshots                  Passo 1: Analisar tudo (não escrever nada ainda)
    ↓                                                ↓
Inspeção técnica (JS no browser OU grep         Passo 2: Extrair CSS inline → assets/css/
no HTML-fonte, conforme a entrada)                  ↓
    ↓                                            Passo 3: Extrair JS inline → assets/js/
Síntese (cruza dados técnicos + visual)              ↓
    ↓                                            Passo 4: Classificar cada SVG (A/B/C)
Apresentar no chat + salvar .md e .json              ↓
em outputs + present_files                      Passo 5: Escrever design-system.html do zero,
    ↓                                            traduzido PT-BR, fiel visualmente, compacto
Perguntar se quer aplicar o sistema                  ↓
extraído em algo                                Passo 6: Escrever STACK.md
                                                      ↓
                                                 present_files + perguntar próximo passo
```

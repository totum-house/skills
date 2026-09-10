---
name: hds
description: >
  HDS (Hero Design Specification). Converte uma referência visual de seção (hero, landing,
  print de concorrente, mockup de prospecção, imagem gerada por IA) em uma especificação
  estruturada e auditável, com tokens, árvore de componentes, direção de arte, plano
  responsivo, mapa de camadas Figma e uma CUT LIST dizendo exatamente o que recortar no
  Photoshop e o que reconstruir em código. Use SEMPRE que o usuário digitar "HDS",
  "gerar o HDS", "especificar essa hero", ou enviar uma imagem de site/tela pedindo para
  reconstruir, refazer, clonar estrutura, montar no Figma, transformar em código,
  extrair o design system da imagem, ou perguntando "o que eu recorto dessa imagem".
  Acione também antes de qualquer implementação de front feita a partir de uma imagem de
  referência: o HDS roda ANTES do código, nunca depois.
---

# HDS, Hero Design Specification

Converte referência visual em estrutura. A imagem é direção de arte. O HDS é a lógica.
Figma e código são a implementação. Nenhuma das três substitui as outras.

**Regra dura:** ao receber uma imagem, você não começa a construir layout. Você especifica primeiro.

---

## Escopo e modo

Duas dimensões independentes. Declare as duas na abertura do relatório.

### Escopo

| Escopo | O que é | Saída |
|---|---|---|
| `hero` | Primeira dobra apenas | Uma spec |
| `section` | Uma seção qualquer (preço, prova, features) | Uma spec |
| `page` | Página completa, várias seções | `system-spec` + uma spec por seção |
| `flow` | Várias telas do mesmo produto | `system-spec` + uma spec por tela |

**Regra dura para `page` e `flow`:** nunca rode o HDS N vezes de forma independente. Isso gera N conjuntos de token que divergem na terceira revisão.

```
/spec
  system-spec.yaml        <- tokens, componentes, direção de arte, grid. UMA vez
  design-tokens.json      <- UMA vez, para o projeto inteiro
  /screens
    01-home.yaml          <- só composição, conteúdo e delta
    02-busca.yaml
    03-checkout.yaml
  asset-manifest.json     <- UMA vez, consolidado
  cut-list.md             <- UMA vez, consolidado, agrupado por tela
```

Ordem de execução em `page` e `flow`:
1. Passe por **todas** as telas em leitura rápida, antes de especificar qualquer uma
2. Extraia o sistema comum (essa é a `system-spec`)
3. Só então especifique tela por tela, registrando apenas o que diverge
4. Consolide assets e cut list no fim, deduplicando (o mesmo botão em 4 telas é um componente, não quatro)

Se uma tela precisar de token que não existe na `system-spec`, pare e decida: ou o token entra no sistema, ou aquela tela está fora do padrão e isso é um achado que vai para as Questões em Aberto.

### Modo

| Modo | Quando | Entrega |
|---|---|---|
| **LITE** | Prospecção, prova de conceito, imagem única, prazo curto | Árvore de composição + tokens + cut list |
| **FULL** | Projeto que vai virar Figma e código de produção | Todos os artefatos |

Na dúvida, rode LITE e ofereça o upgrade. O HDS FULL custa caro em tempo. Se a spec custar mais que reconstruir a seção, ela falhou.

Combinação que quase nunca faz sentido: `flow` + LITE. Se o projeto tem várias telas, ele já é grande o bastante para pagar o FULL.

---

## Fluxo

```
Referência visual
  ↓ 1. Escopo e classificação de arquivos
  ↓ 2. Leitura semântica
  ↓ 3. Fato, estimativa, inferência
  ↓ 4. Árvore de composição
  ↓ 5. Tokens (DTCG)
  ↓ 6. Componentes
  ↓ 7. Assets e CUT LIST      <- ponto de decisão humana
  ↓ 8. Responsividade
  ↓ 9. Mapa Figma
  ↓ 10. Arquitetura de código
  ↓ 11. Gate de validação
Implementação
```

Etapas 1 a 4: leia `references/01-leitura-semantica.md`
Etapas 5, 6 e 6b (interaction_spec): leia `references/02-tokens-componentes.md`
Etapa 7: leia `references/03-assets-recorte.md` **(obrigatória em todos os modos)**
Etapa 8: leia `references/04-responsividade.md`
Etapas 9 e 10: leia `references/05-figma-codigo.md`
Etapa 11: leia `references/06-validacao.md`

Templates prontos em `assets/templates/`.

---

## As cinco camadas do HDS

1. **Design system**: cor, tipografia, espaçamento, raio, sombra, estados
2. **Layout system**: grid, container, colunas, proporção, sobreposição
3. **Componentes**: o que vira componente real, com props e variantes
4. **Direção de arte**: hierarquia, dominância, sensação, o que não pode competir
5. **Regras de implementação**: responsivo, ordem no mobile, o que é SVG, o que é CSS

Camada 4 é a que quase todo mundo pula e é a que decide se a reconstrução parece cara ou barata.

---

## Três leis inegociáveis

### Lei 1: nunca apresente estimativa como medida

Toda linha da spec carrega confiança:

- `confirmed` : está visível na imagem, sem ambiguidade
- `estimated` : deduzido por proporção, pode errar
- `inferred` : decisão sua de implementação, não estava na imagem

Se o campo não tem confiança declarada, ele não entra na spec.

### Lei 2: proporção antes de pixel

Você não sabe a escala real da imagem. Declarar `headline: 58px` é chute com casca de número.

Correto:
```yaml
headline:
  size_ratio: 0.047        # fração da largura do container
  size_px_at_1240: 58
  confidence: estimated
  anchor: container_width_estimated
```

Só use px absoluto quando existir âncora conhecida (largura de container declarada pelo cliente, export do Figma, screenshot em viewport conhecido).

### Lei 3: recortar é exceção, reconstruir é padrão

Ver `references/03-assets-recorte.md`. Texto, botão, card, ícone e navegação **nunca** saem como imagem.

---

## Vias de entrada

O HDS sempre recebe imagem. O que muda é de onde ela veio, e isso muda o nível de confiança.

| Via | Origem da referência | Confiança base |
|---|---|---|
| **A. Referência existente** | Print de concorrente, site real, Dribbble, layout do cliente | Alta. O que está lá foi construído e funciona |
| **B. Referência gerada** | `previa-hero`, `totum-imagem-web`, ChatGPT Image, Nano Banana | **Baixa. Auditar antes de especificar** |
| **C. Referência híbrida** | Layout gerado com foto real do cliente inserida | Média, por elemento |

### Regra da via B, obrigatória

Imagem gerada por IA carrega defeito estrutural. Especificar sem auditar é transformar bug de geração em requisito de implementação.

Antes de qualquer análise, audite e liste o que vai ser **descartado**:

- texto ilegível, inventado ou com letra deformada (nunca vire conteúdo da spec)
- geometria impossível: grid que não fecha, coluna que não alinha, perspectiva quebrada
- luz inconsistente entre pessoa e fundo, sombra sem fonte, reflexo que não bate
- elemento decorativo que não tem função, só apareceu
- ícone que não é ícone, é ruído com cara de ícone
- proporção de logo distorcida

Saída obrigatória na via B, antes do resto:

```
AUDITORIA DA REFERÊNCIA
Aproveitado: [composição, paleta, hierarquia, tratamento fotográfico]
Descartado: [texto gerado, ícone x, sombra do bloco y]
Corrigido na spec: [grid remontado em 12 colunas, o gerado não fechava]
```

Fluxo completo da via B: gerar referência → auditar → HDS → implementar. O HDS nunca é o primeiro passo quando não existe referência.

## Separação de escopo (etapa 1, o erro mais caro)

Quando a imagem traz um site dentro de uma moldura de apresentação (mockup institucional, browser frame, celular na mão de alguém, fundo de estúdio), você tem **dois sistemas visuais** na mesma imagem.

```
Apresentação institucional
└── Landing page do cliente     <- só isto entra no HDS
```

A moldura não é parte do site. Sombra do mockup, reflexo do notebook, gradiente do fundo de apresentação: fora. Declare essa separação explicitamente na primeira linha do relatório, antes de qualquer análise.

---

## Artefatos de saída

**LITE**
1. `composition-map.md` (árvore + relatório visual curto)
2. `design-tokens.json` (DTCG)
3. `cut-list.md` (o que recortar, roteiro Photoshop)

**FULL**, os três acima mais:
4. `hero-spec.yaml`
5. `asset-manifest.json`
6. `responsive-spec.yaml`
7. `figma-layer-map.md`
8. `implementation.md`
9. `interaction-spec.yaml`
10. `open-questions.md`
11. `validation-checklist.md`

Em escopo `page` ou `flow`, some `system-spec.yaml` e uma spec por tela em `/screens`.

Toda entrega termina com **Questões em Aberto**. Se a lista vier vazia, você não olhou direito. Sempre existe algo que a imagem não responde.

---

## Eixos de variação

Se o HDS vai alimentar geração de variações, declare o que pode mudar sem quebrar a marca:

```yaml
variation_axes:
  locked:            # nunca muda
    - brand_primary
    - logo_proportion
  flexible:          # pode variar dentro de faixa
    - media_position: [right, left, bottom]
    - headline_alignment: [left, center]
  free:              # variação livre
    - decorative_shape_style
```

Sem esse bloco, gerar variação é aposta, não sistema.

---

## Encaixe com as outras skills Totum

| Momento | Skill |
|---|---|
| Gerar a imagem de referência para o lead | `previa-hero` (roda antes) |
| Extrair tokens de site ao vivo ou HTML | `design-system-extrator` (fonte melhor que imagem, use quando existir) |
| Implementar o front depois da spec | `analise-front-totum` ou `frontend-design` |
| Criticar a interface pronta | `uiux-auditor` (roda depois) |
| Elevar site existente | `totum-redesign-existente` |

O HDS ocupa o vão entre imagem e implementação. Se existe URL ao vivo, `design-system-extrator` dá dado melhor que estimativa visual. Use os dois juntos quando der.

---

## Anti-padrões

- Começar a codar antes da spec
- Recortar botão, card ou texto como PNG
- Copiar a moldura de apresentação achando que é parte do site
- Reduzir o desktop e chamar de mobile
- Entregar px absoluto sem âncora
- Entregar spec sem Questões em Aberto
- Rodar FULL quando o pedido era prospecção

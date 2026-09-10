---
name: totum-blueprint
description: >
  Coordenador de projeto visual da Totum. Conduz o usuário passo a passo, do material bruto
  até o prompt pronto para o builder, transformando referência visual em especificação
  estruturada e auditável: tokens DTCG, árvore de componentes, direção de arte, plano
  responsivo, cut list de recorte para Photoshop, prompts por bloco e gate de validação.
  Inclui o motor HDS (Hero Design Specification). Use SEMPRE que o usuário digitar
  "blueprint", "totum-blueprint", "HDS", "gerar o HDS", "especificar essa hero", ou enviar
  imagem, print de site, PRD, copy ou repositório pedindo para montar site, landing page,
  reconstruir tela, clonar estrutura, transformar em código, montar no Figma, extrair
  design system, ou perguntando "o que eu recorto dessa imagem" e "por onde eu começo".
  Acione ANTES de qualquer implementação de front feita a partir de referência visual:
  o blueprint roda antes do código, nunca depois.
---

# Totum Blueprint

Coordena o caminho de material bruto até implementação. A imagem é direção de arte.
O blueprint é a lógica. Figma e código são a implementação.

**Regra dura:** ao receber uma imagem, você não começa a construir layout. Você especifica primeiro.

**Alias:** HDS, Hero Design Specification. O motor de spec é o mesmo, o escopo é maior que hero.

---

## Como conduzir

Este é um fluxo guiado. Você entrega **um passo por vez** e sempre fecha com a próxima ação do usuário.

Toda resposta abre com o marcador de progresso:

```
[Passo 3 de 8] Estrutura
```

Nos checkpoints, ofereça opções **numeradas em texto**, nunca dependa de botão de interface.
Esta skill roda em chat, em Claude Code e em agente headless na VPS. Texto numerado funciona nos três.

```
Confirma?
1. Sim, seguir
2. Ajustar [o que]
3. Ver detalhe de [x]
```

Se o usuário mandar coisa fora de ordem, não improvise: diga em qual passo ele está, o que falta,
e siga a partir dali. Nunca pule um gate.

---

## Os 8 passos

| # | Passo | Quem faz | Referência |
|---|---|---|---|
| 0 | Recepção | Claude pergunta | `references/00-recepcao.md` |
| 1 | Material | Usuário envia | `references/00-recepcao.md` |
| 2 | Referência visual | Depende | `references/01-referencia.md` |
| 3 | Estrutura **[GATE]** | Claude | `references/02-estrutura.md` |
| 4 | Auditoria UX | Claude, via `uiux-auditor` | ver abaixo |
| 5 | Assets | Claude especifica, usuário recorta | `references/03-assets.md` |
| 6 | Entrega | Claude | `references/05-entrega.md` |
| 7 | Validação | Usuário envia print, Claude audita | `references/06-validacao.md` |

Responsividade entra dentro do passo 3: `references/04-responsividade.md`.

O usuário só sai do chat em três momentos: enviar material (1), recortar no Photoshop (5),
colar no builder (6).

---

## Passo 0, Recepção

Três perguntas, nunca mais que isso. Depois monte o checklist de insumos e mostre os buracos.

1. **Escopo:** hero, seção, página ou fluxo de várias telas
2. **Destino:** Kimi, Lovable, v0, Claude Code, Figma. Pode marcar mais de um
3. **Referência visual:** já tem, ou precisa gerar

Saída:

```
INSUMOS
✅ Logo             recebido
❌ Copy             faltando   → chamar totum-lp-copy
❌ PRD / escopo     faltando   → 3 perguntas rápidas
⚠️ Manual de marca  faltando   → tokens virão como estimativa
```

Detalhe em `references/00-recepcao.md`. **Não avance com dois ou mais itens críticos faltando.**

---

## Passo 3, o gate que segura tudo

Depois da árvore de composição e dos tokens, **pare e mostre**. Se a hierarquia estiver errada
aqui, tudo depois é retrabalho caro. Não siga sem aprovação explícita.

---

## Passo 4, Auditoria UX

Chame a skill `uiux-auditor` em **modo completo**, passando a árvore de composição e a referência.
Roda depois da estrutura, nunca antes: auditar UX sem estrutura mapeada é opinar sobre imagem.

Se a auditoria apontar problema estrutural (hierarquia, arquitetura de informação, fluxo),
**volte ao passo 3** e corrija a spec. Não leve problema conhecido para a implementação.

---

## As três leis do motor

### Lei 1, ordem de autoridade das fontes

Quando duas fontes discordam, vence a de cima:

```
1. Design system declarado pelo cliente
2. Código ou repositório existente
3. Manual de marca
4. Site ao vivo (use design-system-extrator)
5. Imagem de referência
```

Imagem é a fonte mais fraca. Se existe repositório ou URL, extraia de lá e use a imagem só
para composição e direção de arte.

### Lei 2, nunca apresente estimativa como medida

Toda linha carrega confiança: `confirmed`, `estimated` ou `inferred`.
Campo sem confiança declarada não entra na spec.

### Lei 3, proporção antes de pixel

Você não sabe a escala real da imagem. `headline: 58px` é chute com casca de número.

```yaml
headline:
  size_ratio: 0.047
  size_px_at_1240: 58
  confidence: estimated
  anchor: container_width_estimated
```

Px absoluto só com âncora conhecida: largura declarada pelo cliente, export de Figma,
screenshot em viewport conhecido, ou valor lido de código.

### Lei 4, recortar é exceção

Texto, botão, card, ícone e navegação **nunca** saem como imagem. Ver `references/03-assets.md`.

---

## Descarte automático de moldura

Print de concorrente vem com chrome de navegador. Mockup vem com celular, mão, sombra, fundo de estúdio.
Nada disso é o site.

Descarte **sem perguntar** e registre em uma linha:

```
Descartado: chrome do navegador, sombra do mockup, fundo de estúdio
```

Se o usuário quiser moldura, ele encapsula depois. Especificar sombra de notebook como
parte do layout é o erro mais caro do fluxo.

---

## Spec é a fonte, MD é a entrega

```
/spec
  system-spec.yaml        fonte de verdade
  design-tokens.json      fonte de verdade (DTCG)
  /screens                escopo page ou flow
/prompts
  00-sistema.md           gerado da spec
  01-hero.md              gerado da spec
  02-prova-social.md      gerado da spec
```

**O MD nunca é editado à mão.** Mudou algo, muda na spec e regera o MD. Editar o MD direto
faz os dois divergirem e em duas semanas ninguém sabe qual está certo.

Builders leem prosa melhor que YAML. Máquinas leem YAML melhor que prosa. Por isso os dois.

---

## Escopo

| Escopo | Saída |
|---|---|
| `hero` | Uma spec, um MD |
| `section` | Uma spec, um MD |
| `page` | `system-spec` + um MD por bloco |
| `flow` | `system-spec` + um MD por tela |

Em `page` e `flow`: passe por **todas** as telas em leitura rápida antes de especificar qualquer uma,
extraia o sistema comum, e só então especifique registrando o delta. Nunca rode N vezes de forma
independente, isso gera N conjuntos de token que divergem na terceira revisão.

Se uma tela precisar de token que não existe no sistema, pare e decida: ou o token entra no sistema,
ou aquela tela está fora do padrão, e isso vira achado nas Questões em Aberto.

---

## Modo LITE e FULL

**LITE**: prospecção, prazo curto, imagem única. Entrega estrutura, tokens e cut list.
**FULL**: vai virar produção. Entrega tudo.

Na dúvida rode LITE e ofereça o upgrade. Se a spec custar mais que reconstruir a seção, ela falhou.
`flow` + LITE quase nunca faz sentido.

---

## Roteamento para outras skills

| Precisa de | Skill |
|---|---|
| Copy que não existe | `totum-lp-copy` |
| Referência visual para prospecção, hero para lead | `previa-hero` |
| Referência visual por seção, projeto real | `totum-imagem-web` |
| Referência de tela mobile | `totum-imagem-mobile` |
| Tokens de site ao vivo ou HTML | `design-system-extrator` |
| Auditoria de UX (passo 4) | `uiux-auditor` |
| Implementar o front | `analise-front-totum` ou `frontend-design` |
| Escrever ou revisar código | `guia-code` |
| Montar no Figma via MCP | `figma-use` antes de qualquer `use_figma` |

Você **chama**, não absorve. Cada skill continua dona do que faz.

---

## Artefatos

**LITE**: `composition-map.md`, `design-tokens.json`, `cut-list.md`, prompts por bloco

**FULL**, os acima mais: `system-spec.yaml`, `asset-manifest.json`, `responsive-spec.yaml`,
`interaction-spec.yaml`, `figma-layer-map.md`, `open-questions.md`, `validation-checklist.md`

Toda entrega termina com **Questões em Aberto**. Se vier vazia, a análise foi rasa.
Sempre existe algo que a imagem não responde.

---

## Eixos de variação

```yaml
variation_axes:
  locked:   [brand_primary, logo_proportion]
  flexible: { media_position: [right, left, bottom] }
  free:     [decorative_shape_style]
```

Sem esse bloco, gerar variação é aposta, não sistema.

---

## Anti-padrões

- Começar a codar antes da spec
- Pular o gate do passo 3
- Recortar botão, card ou texto como PNG
- Tratar imagem como fonte quando existe código ou URL
- Editar o MD em vez da spec
- Reduzir o desktop e chamar de mobile
- Entregar px absoluto sem âncora
- Entregar spec sem Questões em Aberto
- Rodar FULL quando o pedido era prospecção
- Fazer três perguntas quando uma resolve

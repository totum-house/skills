# Passo 6, Entrega

## A regra que sustenta tudo

**Spec é fonte de verdade. MD é entrega derivada. O MD nunca é editado à mão.**

Mudou a cor primária? Muda no `design-tokens.json` e regera os MDs afetados.
Editar o MD direto faz os dois divergirem, e em duas semanas ninguém sabe qual está certo.

Ao regerar, diga o que mudou:

```
Regerado: 00-sistema.md, 01-hero.md, 04-precos.md
Motivo: brand-primary de #E31E24 para #C41A20
```

## Um arquivo por bloco

```
/prompts
  00-sistema.md        tokens, componentes, direção de arte, regras globais
  01-hero.md
  02-prova-social.md
  03-como-funciona.md
  04-precos.md
  99-rodape.md
```

Cada bloco é colável sozinho, mas **todos herdam do `00-sistema.md`**. É isso que impede o
builder de reinventar a paleta no bloco 4.

Cabeçalho obrigatório de todo bloco, para o builder não perder o contexto:

```markdown
> Este bloco faz parte do projeto [nome]. Antes de gerar, aplique `00-sistema.md`.
> Não invente cor, fonte, espaçamento ou componente fora do sistema.
```

Template em `assets/templates/bloco-prompt.md`.

## Formato por destino

O usuário escolheu os destinos no passo 0. Gere só os escolhidos, e diga qual é qual.

### Kimi

Markdown descritivo, um arquivo por bloco. Prosa direta, sem YAML no corpo.
Descreva o layout em linguagem espacial ("coluna esquerda ocupa 40%, texto alinhado à esquerda"),
não em CSS. Liste os tokens como valores literais no fim do arquivo.

### Lovable e v0

Markdown, mas com três coisas explícitas que esses builders costumam ignorar:

1. **Stack travada** no topo: framework, biblioteca de estilo, o que não usar
2. **Tokens como restrição**, não sugestão: "use exclusivamente estas cores, não gere variações"
3. **Assets por caminho**, com o que é placeholder marcado

Sempre inclua a frase de contenção: "não adicione seções, animações ou elementos que não
estejam nesta especificação".

### Claude Code

Não gere prompt em prosa. Ele lê arquivo. Entregue:

```
/spec/system-spec.yaml
/spec/design-tokens.json
/spec/screens/*.yaml
/assets/
```

Mais um `implementation.md` curto com: stack alvo, estrutura de componentes, ordem de execução,
critério de pronto. Prosa longa aqui só atrapalha.

### Figma

Figma não é prompt. Dois caminhos:

**Com MCP conectado** (recomendado para quem está começando): carregue a skill `figma-use` antes
de qualquer `use_figma`. Ordem obrigatória: Variables primeiro, depois componentes, depois monta a tela.
Nunca ao contrário, senão você monta com valores soltos e depois não dá para tokenizar.

Comece por **um bloco só**. Ver acontecer em um bloco vale mais que ler documentação.

**Sem MCP**: entregue o `figma-layer-map.md` com a árvore, os nomes de frame, onde usa Auto Layout
e onde usa posição absoluta, e a lista de Variables a criar.

```
Lorentz / Hero / Desktop
├── Background                  [Frame, absoluto]
├── Header                      [Auto Layout H, space-between]
├── Hero Body                   [Auto Layout H, gap 48]
│   ├── Content                 [Auto Layout V, gap 24]
│   └── Media                   [Frame relativo, filhos absolutos]
└── Social Proof                [Auto Layout H, gap 16]
```

Regras: componente de interface usa Auto Layout sempre. Montagem fotográfica usa posição absoluta
dentro de frame controlado. Cor e espaçamento entram como Variables, nunca hardcoded.
Botão e card são componentes com variants. Desktop e mobile compartilham componentes, mudam constraints.

## Ordem de teste sugerida

Quando o usuário marcou vários destinos, sugira ordem em vez de despejar tudo:

1. Um destino, um bloco, para calibrar
2. Ajusta a spec com o que aprendeu
3. Só então roda os outros destinos

Rodar cinco destinos com uma spec não calibrada gera cinco resultados ruins e nenhuma informação
sobre qual foi o problema.

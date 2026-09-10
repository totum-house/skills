# Etapas 1 a 4, Leitura semântica

## Etapa 1, Escopo e classificação

Antes de qualquer análise, separe o que é apresentação do que é interface.

Classifique cada arquivo recebido:
identidade visual, referência de composição, fotografia, logo, asset gráfico, mockup institucional, conteúdo textual.

Saída da etapa 1, sempre a primeira coisa do relatório:

```
ESCOPO
Descartado: [moldura, fundo de estúdio, sombra do mockup, browser chrome]
Analisado: [a interface do cliente, coordenadas aproximadas na imagem]
```

Se a imagem tem site dentro de moldura e você não fizer esse corte, todo o resto da spec vem contaminado.

## Etapa 2, Leitura semântica

Decomponha em regiões e funções, não em objetos visuais. A pergunta não é "o que eu vejo", é "o que isso faz".

Responda:
- qual a estrutura principal
- quais elementos formam grupos
- quais estão sobrepostos e qual a ordem de profundidade
- quais são interativos
- quais são puramente decorativos
- quais precisam ser assets separados (feed para a etapa 7)

## Etapa 3, Fato, estimativa, inferência

Três baldes, sem mistura.

**confirmed**: está visível, sem ambiguidade.
"A hero tem dois profissionais. Existem três cards de prova social. O CTA está abaixo da descrição."

**estimated**: deduzido por proporção.
"A coluna de conteúdo ocupa cerca de 40% da largura. A headline tem cerca de 4,7% da largura do container."

**inferred**: decisão sua, não estava na imagem.
"No mobile os profissionais vão abaixo da copy. Os cards viram linha rolável. O menu vira hambúrguer."

Toda linha `inferred` precisa aparecer também em `open-questions.md`, porque é onde o cliente pode discordar.

## Etapa 4, Árvore de composição

A árvore serve para duas coisas ao mesmo tempo: nomear camadas no Figma e nomear componentes no código. Se ela não serve para as duas, está errada.

```
Landing Page
└── Hero
    ├── Background
    │   ├── Base
    │   ├── Texture
    │   └── Decorative Pattern
    ├── Header
    │   ├── Logo
    │   ├── Navigation
    │   └── CTA
    ├── Content
    │   ├── Eyebrow
    │   ├── Headline
    │   ├── Subheadline
    │   └── CTA
    ├── Media
    │   ├── Organic Frame
    │   ├── Person 01
    │   ├── Person 02
    │   └── Medical Element
    └── Social Proof
        ├── Rating
        ├── Reviews
        └── Experience
```

Regras de nomenclatura:
- inglês, PascalCase por nó
- nome funcional, não descritivo. `Person 01`, não `Homem de jaleco`
- profundidade máxima de 4 níveis. Mais que isso, você está descrevendo pixel

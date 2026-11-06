---
name: totum-red-theme-slides
description: Use quando precisar aplicar o Totum Red Theme (dark-first, vermelho Totum com parcimônia, títulos leves, pills) a uma apresentação da Totum já escrita, refazendo só o visual sem mudar conteúdo, imagens ou créditos.
---

# Totum Red Theme em slides

v1.0, 05/11/2026. Base: design system "Totum Red Theme" (`design-system-totum.md`, atualizado em 03/06/2026, oficial desde 02/11/2026) e o deck de identidade da Cenova refeito no tema em 03/11/2026 com `build_totum_red.py` (python-pptx, 16:9, re-executável). O Rael trata o tema como ponto de partida que ainda vai ser refinado.

## Quando usar

- Deck interno ou de apresentação da Totum (para cliente ou parceiro) que precisa sair com a cara da Totum.
- O Rael pede "no Red Theme", "com a identidade da Totum", "refaz o visual".

Não use para: deck de venda em HTML (`totum-apresentacao-comercial`), apresentação de identidade do cliente com a marca do cliente (`manual-da-marca`), UI de sistema (`totum-design-system`).

## Regra principal: só restyle

Conteúdo, ordem dos slides, números, fontes citadas, imagens, KVs e créditos ficam como estão. Não escreva slide novo, não corte slide, não "melhore" copy. Mudança de conteúdo só com pedido explícito. Notas do apresentador são preservadas (guarde num `notes.json` e reaplique).

## Tokens

| Papel | Valor |
|---|---|
| Fundo do slide | `#0e0918` (nunca `#000000`, nunca fundo claro) |
| Card padrão | `#1b1728`, hairline branca a 10 por cento, raio 24 px equivalente |
| Card escuro | `#0e0918` com contorno `#1f192a`, raio 16 |
| Brand card | degradê 180 graus `#432d33` para `#0e0918`, linha de topo vermelha a 30 por cento |
| Texto | `#d1cece`; títulos `#ffffff`; apoio `#9ca3af` |
| Vermelho Totum | `#da2128`, com parcimônia: pill de destaque, um número, um halo. Nunca em área grande |
| Secundária | `#077ac7` (e degradê para `#6b21ef`) só em CTA secundário |
| Badge quente | `#ef9a9a` com texto `#0e0918` |
| Botões e rótulos | sempre pill (raio total) |

## Tipografia

- Títulos: Geomanist 300, tracking -0,02 em só no título. Nunca 600 nem 700, nunca bold sintético.
- Corpo: Geomanist 400 (ênfase com geomanist-book 400, não bold). Tracking 0.
- Se Geomanist não estiver instalada, use a substituta já usada no deck Cenova: Outfit Light para títulos e Outfit 400 para corpo, e registre a troca. Gilroy, com Poppins como reserva, era a regra da paleta antiga (v1.1); use só se o Rael pedir para aquele deck.
- Nunca Inter ou fonte de sistema.
- No python-pptx, desligue negrito em todos os runs (`b=0`) e aplique a fonte também em `ea` e `cs`.

## Passo a passo

1. Inventário do deck original: lista de slides, textos, imagens (com origem e crédito), notas. Salve as notas.
2. Mapa de componentes: para cada slide, que padrão do tema vira (capa, título + cards, caso com imagens, lista numerada com pills, fontes).
3. Construa com script re-executável (padrão `build_totum_red.py`): tokens no topo, helpers `card`, `pill`, `text`, `logo`, imagens com canto arredondado geradas à parte, brand card como PNG com degradê.
4. Logo Totum do SVG oficial (`logo-totum.svg`), convertido para PNG; posição fixa no canto em todos os slides internos.
5. Imagens do cliente aparecem dentro de cards, sem filtro. A marca do cliente não vira tema do deck.
6. Reaplique as notas do apresentador.
7. QA: renderize as páginas (LibreOffice para PDF e PNG), confira slide a slide contra o original: mesmo texto, mesma ordem, mesmas imagens, nada cortado; vermelho só em pontos de destaque; nenhum título em bold; nenhum texto fora do slide.
8. Entrega: `.pptx` + PDF + folha de contato. Drive só com OK do Rael, na pasta que ele indicar; só adicionar.

## Critério de pronto

- [ ] Conteúdo, imagens, créditos e notas iguais ao original
- [ ] Fundo `#0e0918` em todos os slides; vermelho só em destaque
- [ ] Títulos peso 300, sem bold; pills nos rótulos
- [ ] Fonte substituta registrada se Geomanist faltou
- [ ] Render conferido slide a slide

## O que não fazer

- Não inventar conteúdo, dado ou fonte.
- Não usar tema claro nem vermelho em fundo inteiro.
- Não usar bold em título.
- Não redesenhar o logo Totum.

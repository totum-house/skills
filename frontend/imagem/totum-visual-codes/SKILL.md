---
name: totum-visual-codes
description: >-
  Use antes de qualquer peça visual de cliente do Totum Lab para montar a
  receita de Visual Codes (os 40 códigos com barra da Biblioteca Visual, como
  /meta_ad ou /brand_lock), ou quando alguém escrever códigos com barra ou
  /auto.
---
# Totum Visual Codes

v0.4, 12/11/2026. Changelog: a receita colada no prompt fica em 3 a 4 códigos; os estruturais saem porque a referência cobre layout. Biblioteca completa (40 códigos, conflitos, negativos universais, códigos de cliente): `visual-codes.md` (nesta pasta). Leia a seção do código antes de expandir.

## Fonte das regras do cliente

1. Livro de regras no Notion: banco Clientes em Totum Lab > Design (paleta, fontes, KV, layouts, técnicas, estilos, receitas prontas, proibido, a decidir). Ele vence o arquivo local quando houver divergência.
2. Brand kit local: `/workspace/totum-lab/design/clientes/<slug>/brand-kit/` (`brand.md`, `receitas.md`, `logo/`, `referencias/`, `personagens/`).
3. Imagens oficiais: pasta Clientes do Google Drive, link na página do cliente no Notion.

Notion, o brand kit em `/workspace/totum-lab/design/clientes/<slug>/brand-kit/` e a pasta Clientes do Drive são fontes externas a esta skill. Não estão neste repositório.

Não pergunte o que já está no livro de regras.

## Passo a passo

1. Carregue o livro de regras do cliente e as receitas prontas. Se o pedido cabe numa receita pronta, use ela.
2. Entrada mínima: cliente, tipo de peça, objetivo, mensagem, formato, ativos (logo, pessoa, produto, foto do ambiente real).
3. Monte a receita que entra no prompt colado. São 3 a 4 códigos, e o bloco continua obrigatório (regra de 12/11/2026):
   - 1 emoção, com uma linha
   - `/literal_copy`
   - `/brand_lock`
   - `/logo_safezone` só se o logo NÃO estiver anexado. Com o arquivo anexado, a linha é `Use o logo e os grafismos anexados.`
   - Sem `/carousel`, `/visual_continuity`, `/type_hierarchy` nem código de formato, composição ou layout. A referência já cobre.
4. Códigos de fotografia e de cliente não entram no prompt. Pessoa real e local real vão como anexo, citados no ajuste manual se precisar. Sem foto do ambiente, não invente local.
5. Em pedido individual, mostre antes de gerar:

```text
RECEITA
/confidence /literal_copy /brand_lock
Use o logo e os grafismos anexados.

POR QUE
/confidence: o público precisa de segurança.

PENDÊNCIAS
foto da pessoa (ou seguir sem pessoa)
```

   Em lote (vários pedidos de uma vez), não pare para confirmar: registre a receita e o porquê no próprio pedido e siga.
6. Passe a receita para a skill totum-design-peca.

## Correção

Se a revisão reprovar, identifique o código responsável e troque só ele. Registre em `receitas.md` do cliente:

```text
data | peça | receita | resultado (aprovado/ajustar/rejeitado) | código responsável | próxima troca
```

Receita aprovada três vezes vira receita pronta do cliente.

## Regras duras

- A referência manda no layout. Não proíba elemento que está nela. `/brand_lock` trava só cor e tipografia da marca. Paleta, fonte e logo de outra marca não entram.
- Códigos de cliente não vão para outro cliente.
- Negativos universais entram em toda peça.
- Item marcado "a decidir" no livro de regras: use a escolha provisória e avise no pedido.
- Nunca afirmar que gerou imagem quando entregou só prompt.

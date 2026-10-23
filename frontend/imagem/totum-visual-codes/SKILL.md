---
name: totum-visual-codes
description: >-
  Use antes de qualquer peça visual de cliente do Totum Lab para montar a
  receita de Visual Codes (os 40 códigos com barra da Biblioteca Visual, como
  /meta_ad ou /brand_lock), ou quando alguém escrever códigos com barra ou
  /auto.
---
# Totum Visual Codes

v0.3, 23/10/2026. Biblioteca completa (40 códigos, conflitos, negativos universais, códigos de cliente): `visual-codes.md` (nesta pasta). Leia a seção do código antes de expandir.

## Fonte das regras do cliente

1. Livro de regras no Notion: banco Clientes em Totum Lab > Design (paleta, fontes, KV, layouts, técnicas, estilos, receitas prontas, proibido, a decidir). Ele vence o arquivo local quando houver divergência.
2. Brand kit local: `/workspace/totum-lab/design/clientes/<slug>/brand-kit/` (`brand.md`, `receitas.md`, `logo/`, `referencias/`, `personagens/`).
3. Imagens oficiais: pasta Clientes do Google Drive, link na página do cliente no Notion.

Notion, o brand kit em `/workspace/totum-lab/design/clientes/<slug>/brand-kit/` e a pasta Clientes do Drive são fontes externas a esta skill. Não estão neste repositório.

Não pergunte o que já está no livro de regras.

## Passo a passo

1. Carregue o livro de regras do cliente e as receitas prontas. Se o pedido cabe numa receita pronta, use ela.
2. Entrada mínima: cliente, tipo de peça, objetivo, mensagem, formato, ativos (logo, pessoa, produto, foto do ambiente real).
3. Monte a receita:
   - 1 formato
   - 1 a 2 composição
   - 1 a 2 direção de arte (código de cliente conta aqui)
   - 1 emoção (obrigatória)
   - 0 ou 1 fotografia, 0 ou 1 narrativa
   - `/brand_lock` sempre, `/logo_safezone` quando há logo
   - teto de 7, ideal 6
   - `/type_hierarchy` e `/literal_copy` só entram no prompt quando o texto é gerado junto na imagem. No fluxo padrão (cena sem texto) eles valem na composição.
4. Confira conflitos: `/centered_impact` x `/asymmetric_flow`, `/studio_controlled` x `/real_environment`, e os práticos de `visual-codes.md`.
5. Pessoa real exige `/identity_lock`. Local real anexado exige `/real_environment`. Sem foto do ambiente, não use `/real_environment` e não invente local.
6. Em pedido individual, mostre antes de gerar:

```text
RECEITA
/meta_ad /hero_subject /clean_commercial /confidence /brand_lock /logo_safezone

POR QUE
/hero_subject: o produto é o argumento, precisa dominar.
/confidence: o público precisa de segurança.

PENDÊNCIAS
foto da pessoa (ou seguir sem pessoa)
```

   Em lote (vários pedidos de uma vez), não pare para confirmar: registre a receita e o porquê no próprio pedido e siga.
7. Passe a receita para a skill totum-design-peca.

## Correção

Se a revisão reprovar, identifique o código responsável e troque só ele. Registre em `receitas.md` do cliente:

```text
data | peça | receita | resultado (aprovado/ajustar/rejeitado) | código responsável | próxima troca
```

Receita aprovada três vezes vira receita pronta do cliente.

## Regras duras

- Marca vence referência. Referência fornece só o aspecto declarado (luz, materialidade, composição), nunca paleta, fonte ou logo de outra marca.
- Códigos de cliente não vão para outro cliente.
- Negativos universais entram em toda peça.
- Item marcado "a decidir" no livro de regras: use a escolha provisória e avise no pedido.
- Nunca afirmar que gerou imagem quando entregou só prompt.

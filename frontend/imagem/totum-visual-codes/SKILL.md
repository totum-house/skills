---
name: totum-visual-codes
description: >-
  Use antes de qualquer peça visual ou design do Totum Lab (anúncio, post,
  carrossel, story, KV, mockup, foto de produto) para entender objetivo e
  cliente, consultar a Biblioteca Visual (40 códigos de receita da casa mais 225
  códigos ampliados, como /meta_ads ou /3d_billboard), sugerir os códigos certos
  e montar a receita; ou quando alguém escrever códigos com barra ou /auto.
---
# Totum Visual Codes

v0.5, 12/11/2026. Duas bibliotecas, leia as duas antes de sugerir:
- Receita da casa (40 códigos, conflitos, negativos universais, códigos de cliente): `visual-codes.md` (nesta pasta)
- Biblioteca ampliada (225 códigos de cena, estilo, formato, mockup e edição, cada um com prompt completo em pt-BR): `biblioteca-ampliada.md` (nesta pasta)

Aceite o código com ou sem underline e em qualquer caixa (/metaads = /meta_ads). Atenção: /meta_ad (bloco de formato da casa) e /meta_ads (anúncio pronto da ampliada) são códigos diferentes.

## Dois modos de receita

- **Prompt curto (padrão para peça estática com texto, processo de 12/11/2026):** 3 ou 4 códigos no prompt: 1 de emoção, `/literal_copy`, `/brand_lock` e a instrução "Use o logo e os grafismos anexados". Em anúncio Meta, `/meta_ad` pode entrar no lugar da instrução de logo quando o formato precisar. Os demais códigos (formato, composição, logo_safezone, continuidade) ficam fora do prompt: quem compõe é a referência. Cada código vai com a expansão literal da biblioteca.
- **Receita completa (cena sem texto, foto, KV para Nano Banana ou Grok):** regras do passo 4 abaixo, teto de 7.

## Fonte das regras do cliente

1. Livro de regras no Notion: banco Clientes em Totum Lab > Design. Ele vence o arquivo local quando houver divergência.
2. Brand kit local: `/workspace/totum-lab/design/clientes/<slug>/brand-kit/` (`brand.md`, `receitas.md`, `logo/`, `referencias/`, `personagens/`, `grafismos/`).
3. Imagens oficiais e link do design system: pasta do cliente no Google Drive.

Não pergunte o que já está no livro de regras.

## Passo a passo

1. **Objetivo da peça.** Uma linha: o que a peça precisa causar, para quem, onde roda e a ação esperada. Se faltar, deduza e marque como suposição.
2. **Pesquisa do cliente.** Livro de regras, brand kit e receitas prontas. Anote tom, público, paleta, proibido e aprovado. Se cabe numa receita pronta, use ela.
3. **Varredura das bibliotecas.** Separe candidatos que servem ao objetivo e combinam com a marca. Códigos de cliente só para o próprio cliente.
4. **Sugestão.**
   - Prompt curto: escolha a emoção certa para cada slide ou peça (ex.: /confidence, /curiosity, /relief, /urgency, /aspiration) e some /literal_copy e /brand_lock.
   - Receita completa: 1 formato, 1 a 2 composição, 1 a 2 direção de arte, 1 emoção (obrigatória), 0 ou 1 fotografia, 0 ou 1 narrativa, 0 a 2 da ampliada, `/brand_lock` sempre, `/logo_safezone` com logo, teto de 7.
5. **Conflitos.** `/centered_impact` x `/asymmetric_flow`, `/studio_controlled` x `/real_environment`, dois de luz, dois de formato. Pessoa real exige `/identity_lock`. Sem foto do ambiente, não use `/real_environment`.
6. **Mostre a receita** ao Rael por peça ou slide, com o porquê de cada código, antes de gerar (em lote, registre no pedido e siga):

```text
OBJETIVO
capa do carrossel, feed 4:5, ação: arrastar

RECEITA
/confidence /literal_copy /brand_lock + logo e grafismos anexados

POR QUE
/confidence: a promessa precisa soar segura, sem hesitação.
```

7. **Execução.** Cole a expansão literal de cada código no prompt e passe para totum-design-peca (molde do prompt curto ou modo cena sem texto).

## Correção

Se a revisão reprovar, identifique o código responsável e troque só ele. Registre em `receitas.md` do cliente:

```text
data | peça | objetivo | receita | chat usado | resultado (aprovado/ajustar/rejeitado) | código responsável | próxima troca
```

Receita aprovada três vezes vira receita pronta do cliente.

## Regras duras

- Marca vence referência. Referência fornece só o aspecto declarado, nunca paleta, fonte ou logo de outra marca.
- Produto, logo, rótulo, cores e embalagem preservados. Não inventar texto, número ou preço na imagem.
- Códigos de cliente não vão para outro cliente.
- Item "a decidir" no livro de regras: use a escolha provisória e avise.
- Nunca afirmar que gerou imagem quando entregou só prompt.
- Código novo útil: proponha ao Rael antes de incluir na biblioteca.

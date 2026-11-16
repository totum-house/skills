---
name: totum-kv-camadas
description: Use quando precisar produzir KV, post ou carrossel de cliente no método Cenova (base sem texto com foto real, PSD em camadas nomeadas e texto vivo no PhotoCraft), em vez de uma peça achatada.
---

# KV em camadas (método Cenova)

v1.1, 12/11/2026. Changelog: a peça (layout, texto em pt-BR, logo e grafismos) monta no ChatGPT Images with thinking; Grok e Nano Banana ficam na foto sem texto. Base: v1.0, 05/11/2026, KVs Cenova v1 a v4 (29/10 a 03/11/2026), posts Cenova 01 a 04 e o reuso no Instagram CredPara pelo Lab Design (30/10/2026, 64 PSDs). O miolo técnico do PSD está na skill `totum-imagem-para-psd`; aqui fica o fluxo da peça.

## Modos

| Modo | Formato padrão | O que muda |
|---|---|---|
| KV | 4:5 (ex.: 1122x1402) ou o que o kit pedir | Uma cena forte, headline, balões ou selo, logo |
| post | 1080x1350 | Mesmo pipeline, template por tipo de post |
| carrossel | 1080x1350 por slide | Um PSD por slide, costura visual entre slides, capa com título curto |

Reels: capa 1080x1920 com a área 4:5 central (y 285 a 1635) para o recorte do grid.

## Quando usar

- Peça de campanha ou de grid que o Rael vai querer ajustar depois.
- Cliente com brand kit cadastrado (`protocolo-design`) e copy aprovada.

Não use para: peça rápida achatada (`totum-design-peca`), entrega de identidade (`manual-da-marca`), só converter uma imagem pronta em PSD (`totum-imagem-para-psd`).

## Regras fixas

1. A referência manda no layout. Hex e fonte saem do brand kit (`/brand_lock`). Não proíba elemento que está na referência.
2. O logo oficial nunca é gerado pela IA. Anexe o arquivo. Se o motor distorcer, aplique no PSD. O texto da peça entra literal no ChatGPT.
3. Foto sem texto (personagem, cena) sai no Grok Imagens ou no Nano Banana, a partir de foto real de banco (Pexels e similares, crédito do fotógrafo conferido na página). Esses motores não montam a peça: no teste inventaram CTA, completaram conteúdo errado e ignoraram o logo. O surreal da cena fica só nessa foto.
4. Se a marca proíbe pessoa gerada por IA (caso CredPara no Instagram), o modo vira **composição pura**: fundo, grafismo, mockup de tela e tipografia, sem pessoa, até haver foto real autorizada.
5. Público e diversidade seguem o kit (ex.: Cenova 14 a 80 anos, KVs com várias idades).
6. Separador automático de camadas por IA (Qwen-Image-Layered) foi testado e descartado: resolução baixa. Não entra na entrega.
7. Fontes do cliente, sem troca: ex. CredPara Outfit 800 nos títulos e DM Sans no apoio; Cenova pelo kit vigente. Fonte faltando: pare e pergunte.

## Passo a passo

### 1. Inventário de referências
1. Leia o brand kit (`brand.md`, `receitas.md`) e a copy aprovada. Congele a copy: copie o arquivo para `fonte/` com data e hash; se o original mudar depois, registre.
2. Junte refs: KV anterior aprovado, peças de referência do cliente, fotos de banco escolhidas (`stock/`), logo oficial (`assets/`).
3. Escreva por peça: modo, formato, copy literal e camadas previstas para o PSD. Não descreva o layout no prompt.

### 2. Foto sem texto e montagem da peça
1. Foto de personagem ou cena, se a peça precisar: Grok Imagens ou Nano Banana, sem texto e sem logo. Salve em `base/<peca>-foto.png`. Reprove dedo extra ou pessoa com cara de banco de imagem.
2. A peça sai no ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6), no molde de `totum-design-peca`. GPT-6 Astra (no chat, GPT-6 Pro) só em peça difícil ou depois de duas falhas. Uma mensagem Pro custa cerca de 5x (50 contra 10 créditos no Business) e a geração drena a cota de 3 a 5 vezes mais rápido. Ideogram 4.0 e Recraft V4 são teste lado a lado, não o padrão.
3. Anexe em toda geração: referência boa e/ou KV, logo oficial e 1 ou 2 grafismos. Não dite o layout. Sem CTA, escreva `sem CTA`. Lista fechada: os itens exatos.
4. Salve o prompt em `prompt-<peca>.md` e a peça em `<peca>.png`.
5. Modo composição pura: pule a foto; o fundo e os grafismos são desenhados no script com os hex do kit, e o texto continua literal.
6. Mande cada peça ao chat para aprovação antes do PSD ou dos slides finais.

### 3. Montagem do PSD
Só depois da aprovação no chat. Siga `totum-imagem-para-psd`, passos 4 a 6, a partir da peça aprovada. Se o logo distorceu, aplique o arquivo oficial:
- recorte `pessoa` com rembg;
- formas (balões, placa da headline, pílula do CTA) desenhadas no script com a cor do kit;
- texto vivo e visível, no PostScript com peso, como manda a regra de `totum-imagem-para-psd` (`styleRuns`, texto de caixa, gravação no `ag-psd` com `invalidateTextLayers: true`);
- grupos `balao-N`, `headline`, `cta`.

Camadas padrão: `fundo`, `grafismo`, `pessoa`, `detalhes`, `balao-N` (forma + texto), `headline`, `subtitulo`/`apoio-*`, `cta`, `logo`.

Para carrossel e post em lote, use um template por tipo (`post`, `carrossel`, `slide`, `reels`, `quadro`) no mesmo script, como o gerador CredPara: margem, área segura e posição do logo fixas por template.

### 4. QA
1. `readPsd` (`ag-psd`) e `photocraft-cli info` em cada PSD: camadas nomeadas, texto como camada de tipo visível, fonte PostScript com peso.
2. PNG convertido do próprio PSD e `contato.png` por pasta.
3. Checagens: texto dentro da área segura (grid 3:4 corta cerca de 34 px de cada lado do 4:5), grafismo sem encostar em texto nem na área de proteção do logo, lima ou cor de destaque só sobre o fundo que o kit permite, teste de miniatura (100 px) para ver se o título lê no grid.
4. Tabela SIM/NÃO no README da pasta.

### 5. Entrega
- Local: `<cliente>/pecas/<data>-<assunto>/<peca>/` com PNG, `psd/`, `contato.png`; `fonte/` com scripts, prompts e copy congelada.
- Drive: KV na pasta de KV existente do cliente; post e carrossel na pasta de social media existente. Só adicionar; nunca apagar, mover ou renomear sem OK do Rael.
- Créditos de foto de banco listados no README.

## Critério de pronto

- [ ] Peça montada no ChatGPT com copy literal; foto sem texto só quando houver personagem ou cena (ou composição pura quando a marca exigir)
- [ ] Um PSD por peça ou slide, abrindo no Photoshop e no PhotoCraft, camadas com nome de conteúdo
- [ ] Todo texto em camada de tipo visível, no PostScript do kit; logo do arquivo oficial
- [ ] PNG gerado do PSD, folha de contato, QA SIM/NÃO
- [ ] Copy igual à congelada; copy não aprovada marcada como `(copy sugerida)`
- [ ] Nada publicado nem enviado ao cliente sem OK do Rael

## O que não fazer

- Não gerar o logo na IA, nem montar a peça no Grok ou no Nano Banana.
- Não entregar só PNG.
- Não criar pasta nova no Drive quando já existe a do cliente.
- Não creditar terceiros no conceito sem o Rael decidir.
- Não usar pessoa de IA em marca que proíbe.

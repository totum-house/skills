---
name: totum-kv-camadas
description: Use quando precisar produzir KV, post ou carrossel de cliente no método Cenova (base sem texto com foto real, PSD em camadas nomeadas e texto vivo no PhotoCraft), em vez de uma peça achatada.
---

# KV em camadas (método Cenova)

v1.0, 05/11/2026. Base: KVs Cenova v1 a v4 (29/10 a 03/11/2026), posts Cenova 01 a 04 e o reuso no Instagram CredPara pelo Lab Design (30/10/2026, 64 PSDs). O miolo técnico do PSD está na skill `totum-imagem-para-psd`; aqui fica o fluxo da peça.

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

1. Marca vence referência. Hex, fonte e logo saem do brand kit, nunca da referência.
2. Texto e logo nunca são gerados pela IA. A base sai sem texto; o texto entra como camada de tipo (DS-006).
3. Pessoas reais. A cena é gerada a partir de foto real de banco (Pexels e similares, crédito do fotógrafo conferido na página) anexada ao ChatGPT Imagens; o surreal fica só no cenário.
4. Se a marca proíbe pessoa gerada por IA (caso CredPara no Instagram), o modo vira **composição pura**: fundo, grafismo, mockup de tela e tipografia, sem pessoa, até haver foto real autorizada.
5. Público e diversidade seguem o kit (ex.: Cenova 14 a 80 anos, KVs com várias idades).
6. Separador automático de camadas por IA (Qwen-Image-Layered) foi testado e descartado: resolução baixa. Não entra na entrega.
7. Fontes do cliente, sem troca: ex. CredPara Outfit 800 nos títulos e DM Sans no apoio; Cenova pelo kit vigente. Fonte faltando: pare e pergunte.

## Passo a passo

### 1. Inventário de referências
1. Leia o brand kit (`brand.md`, `receitas.md`) e a copy aprovada. Congele a copy: copie o arquivo para `fonte/` com data e hash; se o original mudar depois, registre.
2. Junte refs: KV anterior aprovado, peças de referência do cliente, fotos de banco escolhidas (`stock/`), logo oficial (`assets/`).
3. Escreva por peça: modo, formato, cena, onde fica o espaço livre para texto, camadas previstas.

### 2. Base sem texto
1. Um prompt por peça (`prompt-<peca>.md`), em inglês, anexando a foto real e, se houver, o KV aprovado como base de layout.
2. O prompt pede: mesma linguagem do KV aprovado, pessoas reais com textura de pele, mãos naturais, espaço vazio onde vão headline e balões, e "no text, no logos, no speech bubbles".
3. Referência de enquadramento entra com "use the attached image only as a framing and mood reference, do not copy its colors, text or logo".
4. Salve em `base/<peca>-base.png` no tamanho final. Reprove base com texto, logo, dedos extras ou pessoa com cara de banco de imagem.
5. Modo composição pura: pule a geração; o fundo e os grafismos são desenhados no script com os hex do kit.

### 3. Montagem do PSD
Siga `totum-imagem-para-psd`, passos 4 a 6, a partir da base limpa (não há texto para remover):
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

- [ ] Base sem texto e sem logo, com pessoa real (ou composição pura quando a marca exigir)
- [ ] Um PSD por peça ou slide, abrindo no Photoshop e no PhotoCraft, camadas com nome de conteúdo
- [ ] Todo texto em camada de tipo visível, no PostScript do kit; logo do arquivo oficial
- [ ] PNG gerado do PSD, folha de contato, QA SIM/NÃO
- [ ] Copy igual à congelada; copy não aprovada marcada como `(copy sugerida)`
- [ ] Nada publicado nem enviado ao cliente sem OK do Rael

## O que não fazer

- Não gerar texto, balão com texto ou logo dentro da imagem.
- Não entregar só PNG.
- Não criar pasta nova no Drive quando já existe a do cliente.
- Não creditar terceiros no conceito sem o Rael decidir.
- Não usar pessoa de IA em marca que proíbe.

---
name: totum-imagem-para-psd
description: Use quando precisar transformar uma imagem chapada (KV, post, slide de carrossel, capa, story) em PSD com camadas nomeadas e texto editável na fonte correta da marca, que abre no PhotoCraft.
---

# Imagem para PSD (texto vivo, camadas nomeadas)

v1.0, 05/11/2026. Base: pipeline dos KVs Cenova (`kv_layered_psd_build.py`, 29/10/2026) e dos 64 PSDs do Instagram CredPara (Lab Design, 30/10/2026), os dois montados com `photocraft-cli`.

Esta skill faz uma coisa só: pega uma imagem pronta e devolve o mesmo layout num PSD editável. Não cria marca, não pesquisa referência, não escreve copy e não monta apresentação.

## Quando usar

- Chegou uma peça em PNG ou JPG (feita por IA, por outro estúdio ou exportada achatada) e alguém precisa editar o texto.
- Uma peça nova foi gerada como base sem texto e falta montar o PSD com a copy aprovada.
- O Rael pediu "abre em camadas", "quero editar no PhotoCraft", "PSD com texto editável".

Não use para:
- gerar a peça do zero (use `totum-visual-codes` e `totum-design-peca`; para KV no método Cenova, `totum-kv-camadas`, que chama esta skill no passo do PSD);
- criar ou redesenhar logo (`logo-studio`);
- cadastrar a marca (`protocolo-design`).

## Entradas

| Entrada | Obrigatória | Observação |
|---|---|---|
| Imagem final chapada, ou base sem texto + copy | sim | Guarde o original intacto; nunca edite por cima dele |
| Brand kit do cliente (`brand.md` ou manual) | sim | Fonte de verdade para família, pesos, hex e logo |
| Arquivos de fonte instalados | sim | Ex.: CredPara Outfit 800 + DM Sans; Totum: Geomanist, ou Poppins/Gilroy onde o kit da Totum permitir |
| Logo oficial (SVG ou PNG do pacote) | se a peça tem logo | Logo nunca é recortado da imagem nem redesenhado |

Se faltar o arquivo da fonte oficial, pare e pergunte. Substituta só com OK do Rael, registrada no LEIA-ME da entrega. Nunca troque a fonte em silêncio.

## Ferramentas

- `photocraft-cli` (PhotoCraft headless): `run` com `--cmd`/`--params` em sequência, `info` (árvore de camadas em JSON), `convert` (PSD para PNG), `commands --filter type` (lista comandos de texto), `type.fonts` (fontes que o motor enxerga).
- Python com `Pillow`, `numpy`, `opencv-python` (máscara e inpaint), `psd-tools` (PSD só com camadas de pixel), `rembg` com sessão `isnet-general-use` (recorte de pessoa).
- Scripts de referência do ambiente Totum: `kv_layered_psd_build.py` (KV com balões e headline), `layers_to_psd.py` (empilha `layer-XX.png` num PSD e gera folha de contato e diff), `capas.py`/`base.py` da CredPara (template por tipo de peça, renomeio de camadas, QA de área segura).

## Ordem das camadas (de cima para baixo)

1. `logo` (do arquivo oficial)
2. `cta` (grupo: forma da pílula + texto)
3. `headline` (texto; se tem caixa atrás, grupo `headline` com `headline-forma` + `headline-texto`)
4. `subtitulo`, `apoio-<assunto>` (texto)
5. `balao-1`, `balao-2`... (grupo: `balao-N-forma` + `balao-N-texto`)
6. `detalhes` (ícones, faíscas, selos sem texto)
7. `pessoa` (recorte) ou `mockup de tela: <o quê>`
8. `grafismo` (formas da marca)
9. `fundo`

Nome de camada diz o conteúdo, em pt-BR, minúsculo. Copy que ainda não foi aprovada leva o sufixo ` (copy sugerida)`.

## Passo a passo

### 1. Inventário da imagem (sem mexer em nada)
1. Copie o original para `<peca>/fonte/original.png` e anote tamanho em px. Se não for o formato de entrega (1080x1350, 1080x1920, 1122x1402 etc.), decida com o pedido se redimensiona antes; todas as camadas usam o mesmo tamanho.
2. Transcreva todo texto da imagem, literal, com acento e quebra de linha como está na arte. Se a peça tem copy aprovada em documento, a copy do documento vence a imagem; diferença vira nota.
3. Para cada bloco de texto, registre num `mapa.json`: nome da camada, caixa (x0, y0, x1, y1), linhas, família, peso, cor hex (amostrada no pixel), alinhamento, e se tem trecho de outra cor (runs).
4. Liste os elementos não textuais: fundo, pessoa, formas (balões, pílulas, cards), ícones, logo.

### 2. Fonte e medida
1. Confirme no brand kit qual família e peso cada bloco usa. Confira com `type.fonts` se o PhotoCraft enxerga a família; se não, instale o arquivo e confira de novo.
2. Estime o corpo pelo tamanho visual: renderize a linha com Pillow na fonte e peso certos e ajuste até a altura de caixa alta e a largura baterem com a caixa medida (tolerância de 2 a 3 por cento). Para fonte variável, use `set_variation_by_axes` com o peso.
3. Leading = distância entre linhas de base medida na arte. Tracking só se a arte mostrar (ex.: Outfit -20 nos títulos CredPara; títulos Totum -0,02 em).
4. O `y` do `type.create` é a linha de base da primeira linha, não o topo da caixa. Calcule pelo topo visual + altura de caixa alta (`getbbox('H', anchor='ls')`).

### 3. Placa limpa (fundo sem texto)
Em ordem de preferência:
1. Existe a base sem texto que gerou a peça: use ela. É sempre melhor.
2. Fundo liso, degradê simples ou forma de cor chapada: máscara do texto (limiar de cor dentro das caixas, dilatada 4 a 8 px) e `cv2.inpaint` (TELEA). Formas de cor chapada sob o texto são redesenhadas como camada própria, com a cor amostrada, em vez de inpaint.
3. Fundo complexo (foto, textura): edição de imagem pedindo "remove all text and the logo, keep everything else identical". Depois compare com o original fora das caixas de texto: diferença média acima de 3 níveis por canal é reprovada; refaça ou volte para o inpaint local.
4. Remova também o logo da placa. Ele volta do arquivo oficial.

Não use separador automático de camadas por IA (Qwen-Image-Layered e similares) como entrega: foi testado em 29/10/2026 e sai com resolução baixa. Serve só como teste.

### 4. Pessoa e objetos em recorte
1. `rembg` (`isnet-general-use`) na placa limpa, não no original com texto.
2. Zere alfa abaixo de 40 para tirar halo. Confira cabelo e mãos ampliando; se o recorte comer parte do corpo, ajuste a máscara antes de seguir.
3. O recorte vira a camada `pessoa`; o fundo continua inteiro embaixo (não abra buraco no fundo).

### 5. PSD de pixels
1. Monte as camadas de pixel em RGBA do tamanho da peça (fundo, grafismo, pessoa, detalhes, formas dos balões, forma do CTA, logo). Corte cada uma pelo `getbbox()` e posicione pelo offset.
2. Grave com `psd-tools` em RGB 8 bits. O `psd-tools` grava mal nome com acento: grave como `px0`, `px1`... e renomeie no PhotoCraft (`layer.select` + `layer.renameLayer`).

### 6. Texto vivo no PhotoCraft
Para cada bloco do `mapa.json`, numa única chamada `photocraft-cli run <pixels.psd> ... --out <peca>.psd`:
1. `layer.select` na camada logo abaixo de onde o texto deve ficar.
2. `type.create` com `x`, `y` (linha de base), `text` (linhas com `\n`), `name`, `font` (família), `weight` ou `fontStyle`, `size`, `leading`, `tracking`, `color`.
3. Trecho de outra cor ou peso: `type.edit` com `runs` (`start`, `end`, `color`, `fontStyle`).
4. Balão e CTA: `layer.select` da forma com `mode: add` e `layer.groupLayers` com o nome do grupo.
5. Guarde o JSON que o `run` devolve: os `bounds` de cada `type.create` são a medida real do texto para o QA.

Nunca rasterize texto (`type.rasterize` fica proibido na entrega). Texto crítico em camada de texto é regra (DS-006).

### 7. QA (obrigatório antes de entregar)
1. `photocraft-cli info <peca>.psd`: o PSD abre, as camadas têm os nomes do mapa, e todo bloco de texto aparece como camada de tipo, não de pixel.
2. `photocraft-cli convert <peca>.psd <peca>-preview.png` e folha de contato lado a lado: original, preview, diferença.
3. Confira posição: bounds de cada texto contra a caixa do mapa, desvio máximo de 6 px; texto fora da área segura do formato (ex.: 62 px nas laterais do 4:5 para o grid 3:4) é problema.
4. Confira fonte: no `info`, família e peso batem com o brand kit.
5. Confira copy: o texto das camadas é literal ao aprovado (acentos, maiúsculas, pontuação).
6. Abra pelo menos uma peça no PhotoCraft de verdade e edite uma palavra para provar que o texto é editável.

Reprova se: texto rasterizado, fonte trocada sem registro, logo recortado da imagem, nome genérico de camada (`Layer 1`, `px3`), deslocamento visível em relação ao original, halo no recorte.

### 8. Entrega
- Por peça: `<slug>.psd` + `<slug>.png` convertido do próprio PSD (nunca o original reaproveitado) + `contato.png`.
- `LEIA-ME.md` curto: fontes usadas (e substitutas aprovadas), lista de camadas, o que foi redesenhado, pendências.
- Drive: KV na pasta de KV do cliente, post e carrossel na pasta de social media existente. Só adicionar; nada de apagar, mover ou renomear sem OK do Rael.

## Critério de pronto

- [ ] PSD abre no PhotoCraft e `info` lista as camadas com nome de conteúdo
- [ ] 100 por cento do texto em camada de tipo, na família e peso do brand kit
- [ ] Preview do PSD bate com o original (desvio de posição até 6 px, sem texto fantasma na placa)
- [ ] Logo do arquivo oficial
- [ ] PNG gerado do PSD, folha de contato e LEIA-ME
- [ ] Nada publicado nem enviado ao cliente sem OK do Rael

## O que não fazer

- Não reescrever a copy da arte nem "melhorar" texto durante a conversão.
- Não rasterizar texto para "ficar igual".
- Não recortar o logo da imagem.
- Não usar camada de pixel para texto porque a fonte não estava instalada: pare e resolva a fonte.
- Não apagar o fundo atrás da pessoa.
- Não sobrescrever o arquivo original (`--in-place` só em cópia de trabalho).

---
name: totum-imagem-para-psd
description: Use quando precisar transformar uma imagem chapada (KV, post, slide de carrossel, capa, story) em PSD com camadas nomeadas e texto editável, visível por padrão, na fonte correta da marca, que abre no PhotoCraft e no Photoshop.
---

# Imagem para PSD (texto vivo e visível, camadas nomeadas)

v1.1, 11/11/2026. Base: pipeline dos KVs Cenova (`kv_layered_psd_build.py`, 29/10/2026) e dos 64 PSDs do Instagram CredPara (Lab Design, 30/10/2026), os dois montados com `photocraft-cli`. Nesta versão o texto editável e visível é regra de entrega. Um PSD em que o texto visível era recorte raster, com o tipo vivo num grupo oculto e a fonte gravada só como família (`Montserrat`, peso regular), não conta como entrega: o Photoshop trata essa fonte como ausente e a pessoa acha que não há o que editar.

Esta skill faz uma coisa só: pega uma imagem pronta e devolve o mesmo layout num PSD editável. Não cria marca, não pesquisa referência, não escreve copy e não monta apresentação.

## Regra obrigatória: texto sempre editável

Todo PSD entregue leva o texto como camada de tipo editável, visível por padrão, no grupo certo da pilha. O que a pessoa vê ao abrir o arquivo é o texto que ela edita. Texto só como raster reprova. Camada de tipo viva dentro de grupo oculto também reprova.

O recorte raster do texto original entra somente no grupo oculto `REFERÊNCIA RASTER (oculto)`, no fundo da pilha. O grupo nasce oculto e permanece oculto. Serve para comparar com a arte, não para aparecer. Não deixe esse recorte visível por cima do texto vivo, e não esconda o texto vivo para "não brigar" com o raster.

A fonte gravada na camada é o nome PostScript real, com o peso no nome. Exemplos: `Montserrat-Bold`, `Poppins-SemiBold`, `Outfit-Medium`. Família sozinha (`Montserrat`) não serve, nem com peso regular implícito. Peso regular também leva o nome completo (`Montserrat-Regular`). Confira o PostScript no arquivo da fonte (name ID 6). Não chute a partir do nome da família.

Use a fonte da marca quando o design system define. Sem o arquivo oficial, pare e pergunte. Substituta só com OK do Rael: a mais próxima, no PostScript dela, registrada no LEIA-ME como substituta. Nunca troque a fonte em silêncio.

Frase com peso ou cor misturados usa `styleRuns`: um run por trecho, cada um com o PostScript daquele peso e a cor daquele trecho. Casos típicos: rótulo em negrito e corpo em regular na mesma frase; palavra destacada em outra cor.

Bloco de várias linhas é texto de caixa: `shapeType: 'box'` com `boxBounds` da caixa medida. Linha única é texto de ponto. Não quebre um parágrafo em vários textos de ponto para encaixar.

O fundo embaixo do texto sai limpo. Reconstrua fundo, card, balão e forma sem fantasma do texto original. O raster antigo não pode vazar por baixo da camada de tipo.

Cada camada de tipo guarda os pixels já renderizados, na fonte e no peso certos, para o PSD abrir com a cara da arte. Na gravação com `ag-psd`, use `invalidateTextLayers: true`, para o Photoshop re-renderizar o texto quando a pessoa editar.

Antes de entregar, leia o PSD de volta (por exemplo `readPsd` do `ag-psd`). Liste cada camada de tipo com visibilidade, a fonte de cada `styleRun` e o texto. Renderize um preview a partir das camadas e compare com a imagem de origem. Reprova se alguma camada de tipo estiver oculta, se a fonte for só a família, ou se o preview mostrar o recorte raster no lugar do texto vivo.

Na entrega, diga qual fonte instalar (nome PostScript e arquivo otf/ttf) e de onde baixar (pacote do brand kit ou página oficial da família). Se o Photoshop perguntar se atualiza as camadas de texto, a resposta é Update.

Logo oficial, selo, QR code, ícone e foto continuam raster, ou entram depois pelo arquivo oficial. Não redesenhe esses elementos.

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
| Brand kit do cliente (`brand.md` ou manual) | sim | Fonte de verdade para família, peso, PostScript, hex e logo |
| Arquivos de fonte instalados | sim | O nome gravado é o PostScript com peso, lido do arquivo. Ex.: CredPara `Outfit-ExtraBold` + `DMSans-Regular`; Totum: Geomanist no PostScript do arquivo, ou `Poppins-Bold` / Gilroy onde o kit permitir |
| Logo oficial (SVG ou PNG do pacote) | se a peça tem logo | Logo nunca é recortado da imagem nem redesenhado |

Se faltar o arquivo da fonte oficial, pare e pergunte. Substituta só com OK do Rael: a mais próxima da marca, registrada no LEIA-ME da entrega como substituta. Nunca troque a fonte em silêncio.

## Ferramentas

- `ag-psd` (Node): grava as camadas de tipo no PSD final (`writePsd` com `invalidateTextLayers: true`, `styleRuns`, `shapeType`, `boxBounds` e os pixels renderizados da camada) e confere a entrega (`readPsd`).
- `photocraft-cli` (PhotoCraft headless): `run` com `--cmd`/`--params` em sequência, `info` (árvore de camadas em JSON), `convert` (PSD para PNG), `commands --filter type` (lista comandos de texto), `type.fonts` (fontes que o motor enxerga). O `font` do `type.create` é o PostScript com peso, e a camada fica visível. Não substitui o `invalidateTextLayers` do `ag-psd` na gravação final.
- Python com `Pillow`, `numpy`, `opencv-python` (máscara e inpaint), `psd-tools` (PSD só com camadas de pixel), `rembg` com sessão `isnet-general-use` (recorte de pessoa).
- Scripts de referência do ambiente Totum: `kv_layered_psd_build.py` (KV com balões e headline), `layers_to_psd.py` (empilha `layer-XX.png` num PSD e gera folha de contato e diff), `capas.py`/`base.py` da CredPara (template por tipo de peça, renomeio de camadas, QA de área segura).

## Ordem das camadas (de cima para baixo)

1. `logo` (do arquivo oficial, raster)
2. `cta` (grupo visível: forma da pílula + texto de tipo)
3. `headline` (texto de tipo; se tem caixa atrás, grupo `headline` com `headline-forma` + `headline-texto`)
4. `subtitulo`, `apoio-<assunto>` (texto de tipo)
5. `balao-1`, `balao-2`... (grupo visível: `balao-N-forma` + `balao-N-texto`)
6. `detalhes` (ícones, faíscas, selos, QR code; raster, sem texto redesenhado)
7. `pessoa` (recorte da foto) ou `mockup de tela: <o quê>`
8. `grafismo` (formas da marca)
9. `fundo` (limpo, sem fantasma de letra)
10. `REFERÊNCIA RASTER (oculto)` (grupo oculto, no fundo da pilha: só os recortes do texto original, para comparar)

Nome de camada diz o conteúdo, em pt-BR, minúsculo, salvo o grupo `REFERÊNCIA RASTER (oculto)`, que leva esse nome. Copy que ainda não foi aprovada leva o sufixo ` (copy sugerida)`.

Camada de tipo nasce visível, dentro do grupo da pilha que o mapa indica. Não existe grupo oculto de texto editável.

## Passo a passo

### 1. Inventário da imagem (sem mexer em nada)
1. Copie o original para `<peca>/fonte/original.png` e anote tamanho em px. Se não for o formato de entrega (1080x1350, 1080x1920, 1122x1402 etc.), decida com o pedido se redimensiona antes; todas as camadas usam o mesmo tamanho.
2. Transcreva todo texto da imagem, literal, com acento e quebra de linha como está na arte. Se a peça tem copy aprovada em documento, a copy do documento vence a imagem; diferença vira nota.
3. Para cada bloco de texto, registre num `mapa.json`: nome da camada, caixa (x0, y0, x1, y1), linhas, nome PostScript com peso, cor hex (amostrada no pixel), alinhamento, se o bloco é uma linha (texto de ponto) ou várias (texto de caixa), e os trechos de outro peso ou outra cor (`styleRuns`).
4. Liste os elementos não textuais: fundo, pessoa, formas (balões, pílulas, cards), ícones, selos, QR code, logo. Esses ficam raster.

### 2. Fonte e medida
1. Confirme no brand kit qual família e peso cada bloco usa. O nome que entra na camada é o PostScript do arquivo, com o peso (`Montserrat-Bold`, não `Montserrat`). Confira com `type.fonts` se o PhotoCraft enxerga a fonte instalada; se não, instale o arquivo e confira de novo. Ver a família na lista não autoriza gravar a família sozinha.
2. Estime o corpo pelo tamanho visual: renderize a linha com Pillow na fonte e peso certos e ajuste até a altura de caixa alta e a largura baterem com a caixa medida (tolerância de 2 a 3 por cento). Para fonte variável, use `set_variation_by_axes` com o peso e grave o PostScript da instância (o peso no nome), não o nome da família variável.
3. Leading = distância entre linhas de base medida na arte. Tracking só se a arte mostrar (ex.: Outfit -20 nos títulos CredPara; títulos Totum -0,02 em).
4. No texto de ponto, o `y` do `type.create` é a linha de base da primeira linha, não o topo da caixa. Calcule pelo topo visual + altura de caixa alta (`getbbox('H', anchor='ls')`). No texto de caixa, `boxBounds` é a caixa medida (x, y, largura, altura), e o alinhamento segue a arte.

### 3. Placa limpa (fundo sem texto)
Em ordem de preferência:
1. Existe a base sem texto que gerou a peça: use ela. É sempre melhor.
2. Fundo liso, degradê simples ou forma de cor chapada: máscara do texto (limiar de cor dentro das caixas, dilatada 4 a 8 px) e `cv2.inpaint` (TELEA). Formas de cor chapada sob o texto são redesenhadas como camada própria, com a cor amostrada, em vez de inpaint.
3. Fundo complexo (foto, textura): edição de imagem pedindo "remove all text and the logo, keep everything else identical". Depois compare com o original fora das caixas de texto: diferença média acima de 3 níveis por canal é reprovada; refaça ou volte para o inpaint local.
4. Remova também o logo da placa. Ele volta do arquivo oficial.

Card, balão e forma que tinham texto por cima são reconstruídos limpos, na cor amostrada. Fantasma de letra na placa reprova. O recorte do texto original, se for guardado, não volta para a placa: vai só para `REFERÊNCIA RASTER (oculto)` no passo 6.

Não use separador automático de camadas por IA (Qwen-Image-Layered e similares) como entrega: foi testado em 29/10/2026 e sai com resolução baixa. Serve só como teste.

### 4. Pessoa e objetos em recorte
1. `rembg` (`isnet-general-use`) na placa limpa, não no original com texto.
2. Zere alfa abaixo de 40 para tirar halo. Confira cabelo e mãos ampliando; se o recorte comer parte do corpo, ajuste a máscara antes de seguir.
3. O recorte vira a camada `pessoa`; o fundo continua inteiro embaixo (não abra buraco no fundo).
4. Logo oficial, selo, QR code, ícone e foto não são redesenhados. Entram como raster, ou o arquivo oficial é aplicado por cima.

### 5. PSD de pixels
1. Monte as camadas de pixel em RGBA do tamanho da peça (fundo, grafismo, pessoa, detalhes, formas dos balões, forma do CTA, logo). Corte cada uma pelo `getbbox()` e posicione pelo offset. Nenhuma dessas camadas carrega o texto visível da peça.
2. Grave com `psd-tools` em RGB 8 bits. O `psd-tools` grava mal nome com acento: grave como `px0`, `px1`... e renomeie no PhotoCraft (`layer.select` + `layer.renameLayer`).
3. Esse arquivo é a base. O texto vivo entra no passo 6, visível, por cima da placa limpa. O recorte raster do texto não entra nessa pilha visível.

### 6. Texto vivo, visível
A gravação do texto que vale para o Photoshop é a do `ag-psd`. Abra a base de pixels do passo 5 e grave o PSD final numa única `writePsd`, com essas camadas de pixel e, para cada bloco do `mapa.json`, uma camada de tipo visível no grupo certo:

1. Camada visível (`hidden: false`), no grupo da pilha (`headline`, `cta`, `balao-N`, `subtitulo`, `apoio-*`). Não crie grupo oculto de texto editável.
2. `font` = nome PostScript com peso. Trecho com outro peso ou outra cor: `styleRuns` (`start`, `end`, `font` com o PostScript daquele peso, `color`).
3. Várias linhas: `shapeType: 'box'` e `boxBounds`. Uma linha: texto de ponto.
4. Grave na camada os pixels renderizados nessa fonte e nesse peso, para o arquivo abrir parecendo a arte.
5. `invalidateTextLayers: true`, para o Photoshop re-renderizar ao editar.
6. O recorte raster de cada texto original, se for guardado, vai somente para o grupo oculto `REFERÊNCIA RASTER (oculto)`, última posição da pilha.

Balão e CTA: a forma e o texto ficam no mesmo grupo, os dois visíveis.

Se um bloco também passar pelo PhotoCraft, numa chamada `photocraft-cli run <pixels.psd> ... --out <peca>.psd`, o contrato é o mesmo:
1. `layer.select` na camada logo abaixo de onde o texto deve ficar.
2. `type.create` com `x`, `y` (linha de base no texto de ponto), `text` (linhas com `\n`), `name`, `font` (PostScript com peso, não a família), `size`, `leading`, `tracking`, `color`. A camada fica visível.
3. Trecho de outra cor ou peso: `type.edit` com `runs` (`start`, `end`, `color`, e o PostScript daquele peso no lugar de um `fontStyle` genérico).
4. Balão e CTA: `layer.select` da forma com `mode: add` e `layer.groupLayers` com o nome do grupo. O grupo fica visível.
5. Guarde o JSON que o `run` devolve: os `bounds` de cada `type.create` são a medida real do texto para o QA.

O `type.create` não substitui a gravação final do `ag-psd` quando o arquivo precisa abrir no Photoshop com pixels da camada e `invalidateTextLayers`. Não chame `type.rasterize`. Texto crítico em camada de texto visível é regra (DS-006).

### 7. QA (obrigatório antes de entregar)
1. `readPsd` (`ag-psd`): liste cada camada de tipo com visibilidade, a fonte de cada `styleRun` e o texto. Reprova camada de tipo oculta, fonte só com a família, texto que só existe dentro de `REFERÊNCIA RASTER (oculto)`, ou bloco do mapa sem camada de tipo.
2. Renderize um preview a partir das camadas (composição do que está visível) e monte a folha de contato: original, preview, diferença. O preview mostra o texto vivo. O grupo de referência não entra na composição.
3. `photocraft-cli info <peca>.psd`, quando o arquivo abre nele: as camadas têm os nomes do mapa, e todo bloco de texto aparece como camada de tipo visível, não de pixel.
4. `photocraft-cli convert <peca>.psd <peca>-preview.png` confere o mesmo preview pelo PhotoCraft.
5. Confira posição: bounds de cada texto contra a caixa do mapa, desvio máximo de 6 px; texto fora da área segura do formato (ex.: 62 px nas laterais do 4:5 para o grid 3:4) é problema.
6. Confira fonte: no `readPsd`, o PostScript de cada `styleRun` bate com o brand kit, ou a substituta está registrada no LEIA-ME.
7. Confira copy: o texto das camadas é literal ao aprovado (acentos, maiúsculas, pontuação).
8. Abra pelo menos uma peça no Photoshop (ou no PhotoCraft) e edite uma palavra. Se o Photoshop pedir para atualizar as camadas de texto, Update re-renderiza na fonte instalada. Isso prova que o texto é editável.

Reprova se: texto visível rasterizado, tipo vivo escondido, fonte só com a família, fonte trocada sem registro, logo recortado da imagem, selo, QR, ícone ou foto redesenhado, nome genérico de camada (`Layer 1`, `px3`), deslocamento visível em relação ao original, halo no recorte, fantasma de letra na placa.

### 8. Entrega
- Por peça: `<slug>.psd` + `<slug>.png` convertido do próprio PSD (nunca o original reaproveitado) + `contato.png`.
- `LEIA-ME.md` curto: fontes usadas pelo nome PostScript, qual arquivo instalar e de onde baixar, o aviso de que no diálogo do Photoshop a resposta é Update, substitutas aprovadas, lista de camadas, o que foi redesenhado, pendências.
- Drive: KV na pasta de KV do cliente, post e carrossel na pasta de social media existente. Só adicionar; nada de apagar, mover ou renomear sem OK do Rael.

## Critério de pronto

- [ ] PSD abre no Photoshop e no PhotoCraft; `readPsd` e `info` listam as camadas com nome de conteúdo
- [ ] 100 por cento do texto em camada de tipo visível, no grupo certo da pilha, com PostScript e peso do brand kit (ou substituta registrada)
- [ ] Nenhum texto vivo em grupo oculto; o recorte original, se guardado, está só em `REFERÊNCIA RASTER (oculto)`, no fundo da pilha
- [ ] `styleRuns` nos trechos de peso ou cor misturados; texto de caixa nos blocos de várias linhas; texto de ponto nas linhas únicas
- [ ] Cada camada de tipo tem os pixels renderizados na fonte certa, e a gravação do `ag-psd` usou `invalidateTextLayers: true`
- [ ] Preview do PSD bate com o original (desvio de posição até 6 px, sem texto fantasma na placa, sem o raster de referência aparecendo)
- [ ] Logo, selo, QR code, ícone e foto vêm do arquivo oficial ou do recorte, sem redesenho
- [ ] PNG gerado do PSD, folha de contato e LEIA-ME com a fonte para instalar, o link e o aviso do Update
- [ ] Nada publicado nem enviado ao cliente sem OK do Rael

## O que não fazer

- Não reescrever a copy da arte nem "melhorar" texto durante a conversão.
- Não entregar o texto visível como recorte raster, nem esconder a camada de tipo num grupo oculto.
- Não gravar só a família (`Montserrat`) no lugar do PostScript com peso (`Montserrat-Bold`, `Montserrat-Regular`).
- Não rasterizar texto para "ficar igual" (`type.rasterize` fica proibido na entrega).
- Não usar camada de pixel para texto porque a fonte não estava instalada: pare e resolva a fonte, ou registre a substituta com OK do Rael.
- Não deixar fantasma do texto original no fundo, no card ou na forma.
- Não recortar o logo da imagem, nem redesenhar logo, selo, QR code, ícone ou foto.
- Não apagar o fundo atrás da pessoa.
- Não sobrescrever o arquivo original (`--in-place` só em cópia de trabalho).

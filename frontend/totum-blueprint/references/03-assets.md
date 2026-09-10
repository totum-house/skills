# Etapa 7, Assets e Cut List

Esta etapa responde uma pergunta só: **o que sai da imagem como arquivo e o que nasce de novo no Figma ou no código.**

Saída obrigatória: `cut-list.md` (roteiro de recorte para humano) e, no modo FULL, `asset-manifest.json`.

---

## 7.1 A regra de decisão

Para cada elemento visível, pergunte:

> Isso pode ser reconstruído com CSS, Auto Layout ou vetor nativo com fidelidade aceitável?

**Sim → RECONSTRUIR.** Não recorta.
**Não → RECORTAR.** Vira asset.

Recortar é caro: gera arquivo, peso, dependência, e mata a editabilidade. Por isso o padrão é reconstruir e o recorte é exceção justificada.

### Tabela de corte

| Sempre RECORTAR | Sempre RECONSTRUIR |
|---|---|
| Pessoas e recortes de fotografia | Qualquer texto |
| Produtos e objetos reais | Botões, inputs, badges, pills |
| Texturas, granulado, ruído, papel | Cards e containers |
| Formas orgânicas complexas (mais de 6 pontos de curva) | Navegação, menu, header |
| Glow, brilho, luz volumétrica, bokeh | Ícones (refaz em SVG ou usa biblioteca) |
| Fotos de fundo com profundidade real | Cor chapada, gradiente, sombra |
| Logo do cliente, se não houver SVG | Formas geométricas simples e blobs suaves |

### Zona cinzenta, como decidir

**Forma orgânica**: conte os pontos de curva. Até 6, refaz em SVG e você ganha controle de cor, escala e animação. Acima disso, recorta.

**Sombra projetada da pessoa**: não recorta junto. A sombra do recorte quase sempre vem suja e presa ao fundo antigo. Recria em CSS (`filter: drop-shadow`) ou como camada separada de blur.

**Elemento médico, mecânico ou decorativo tipo ilustração**: se tem contorno limpo, é SVG. Se tem textura ou volume, é recorte.

**Padrão repetido de fundo**: recorta **um tile** e repete em CSS. Nunca recorte a superfície inteira.

---

## 7.2 Classificação por origem

Todo asset carrega uma origem. Isso resolve duas dores que aparecem semanas depois: **direito de uso** e **substituição pelo material real do cliente**.

| Origem | Código | Significado | Risco |
|---|---|---|---|
| Recortado da referência | `cut_from_reference` | Saiu de uma imagem que não é sua | **Alto.** Só vale para prova de conceito interna. Nunca publica |
| Gerado por IA | `ai_generated` | Criado do zero | Médio. Checar política da ferramenta e coerência de luz |
| Fornecido pelo cliente | `client_provided` | Material oficial | Baixo. Preferência sempre |
| Banco de imagem | `stock_licensed` | Licenciado | Baixo, se a licença cobrir o uso |
| Reconstruído em código | `rebuilt_in_code` | Não é arquivo, é CSS ou SVG | Nenhum |

**Regra de bloqueio:** nenhum asset `cut_from_reference` vai para produção. Ele existe para o mockup de prospecção e para provar o layout. Antes do go live, todo `cut_from_reference` tem que virar `client_provided`, `stock_licensed` ou `ai_generated`.

Declare isso na entrega, em uma linha, sempre. Cliente aprovando mockup com foto recortada de concorrente é problema jurídico esperando data.

---

## 7.3 Nomenclatura

O nome do arquivo espelha o caminho na árvore de composição da Etapa 4. Se a spec e a pasta divergirem, você perde os dois na primeira revisão.

```
{secao}-{grupo}-{elemento}-{indice}.{ext}

hero-media-person-01.png
hero-media-organic-frame.svg
hero-bg-texture-tile.webp
hero-decor-glow-01.png
```

Estrutura de pastas:

```
/project
  /reference
    full-reference.png          # a imagem original, intocada
    scope-annotated.png         # com a moldura marcada e descartada
  /brand
    logo.svg
  /people
  /objects
  /decorations
  /textures
  /spec
```

Sempre guarde a referência original sem edição. Você vai precisar dela para o gate de validação da Etapa 11.

---

## 7.4 A CUT LIST

Este é o artefato que o humano abre no Photoshop. Ele não é uma lista de arquivos, é um **roteiro de execução**, escrito para alguém que não usa Photoshop todo dia.

Uma entrada por asset, nesta ordem:

```markdown
### 01. hero-media-person-01.png

**O quê:** profissional da esquerda, recorte da cintura para cima
**Onde na imagem:** metade direita, quadrante superior. Bbox aproximada: x 0.52 a 0.74, y 0.18 a 0.88
**Tela de origem:** 01-home (só em escopo page ou flow)
**Por que recortar:** pessoa real, impossível reconstruir em CSS
**Origem:** cut_from_reference  ⚠️ substituir por foto do cliente antes do go live
**Prioridade:** alta (bloqueia a montagem do hero)

**Roteiro:**
1. Abrir a referência original, não a comprimida
2. Duplicar a camada de fundo (Ctrl+J), trabalhar sempre na cópia
3. Select > Subject. Isso pega o corpo mas erra o cabelo
4. Select > Select and Mask
   - Refine Edge Brush no contorno do cabelo, passada única e lenta
   - Smooth 2, Feather 0.5px, Shift Edge -10%
   - Decontaminate Colors ligado, isso mata a franja de cor do fundo antigo
   - Output To: Layer Mask
5. Zoom 200% e conferir: cabelo, dedos, e a linha entre os dois profissionais
6. File > Export > Export As
   - PNG, Transparency ligado
   - Largura 2x o tamanho de exibição previsto (alvo: 1600px de largura)

**Cuidados:**
- Os dois profissionais estão sobrepostos. Recorte **um por vez**, senão você perde a capacidade de reposicionar no mobile
- Não recorte a sombra de contato, ela será recriada em CSS
- Se o cabelo ficar serrilhado, o problema é a resolução da origem, não a máscara

**Aceite:** fundo 100% transparente, sem halo claro na borda, sem pedaço faltando em dedo ou cabelo
```

Regras de escrita da cut list:

- Ordene por prioridade de bloqueio, não por posição na tela
- Sempre informe **onde na imagem** o elemento está: quadrante em linguagem humana mais bbox
  relativa (fração de 0 a 1 da largura e altura). Em uma hero dá para achar no olho.
  Em seis telas, quem abrir o Photoshop perde tempo caçando
- Em escopo `page` ou `flow`, agrupe por tela e **deduplique**: elemento que se repete em
  várias telas é um asset só, listado uma vez, com as telas de uso anotadas
- Sempre diga **por que** aquele item foi para o recorte, e não para reconstrução
- Sempre marque origem e risco
- Sempre feche com critério de aceite objetivo, verificável a olho
- Se um item for opcional, marque `opcional` e diga o que acontece se ele não existir

### Rodapé obrigatório da cut list

```markdown
## Não recortar (reconstruir)

| Elemento | Como fazer | Onde |
|---|---|---|
| Headline e subheadline | Texto real | Figma / HTML |
| CTA primário | Componente com estados | Figma / React |
| Cards de prova social | Componente + Auto Layout | Figma / React |
| Ícone de calendário | SVG de biblioteca | Código |
| Blob laranja do fundo | SVG, 4 pontos de curva | Código |
| Sombra dos profissionais | filter: drop-shadow | CSS |

Total a recortar: N assets
Estimativa de tempo: ~M minutos
```

Esse rodapé é tão importante quanto a lista. Ele é o que impede a pessoa de recortar coisa demais.

---

## 7.5 Caminho alternativo, recorte assistido

Se o volume for alto (mais de 6 assets) ou o prazo curto, existe o caminho automatizado via Adobe conectado:

1. `image_select_subject` ou `image_select_by_prompt` para isolar
2. `image_remove_background` para gerar o PNG com alpha
3. Inspeção visual obrigatória antes de aceitar

Quando usar cada um:

| Situação | Caminho |
|---|---|
| Recorte simples, contorno limpo, fundo contrastado | Assistido |
| Cabelo solto, tule, fumaça, vidro, sobreposição | Manual no Photoshop |
| Peça que vai para produção e para o cliente ver | Manual, sempre |
| Lote de 10 assets para prova de conceito interna | Assistido |

O caminho assistido não substitui a cut list. Ele executa a cut list. A decisão do que recortar continua sendo da Etapa 7.

---

## 7.6 O buraco atrás do recorte

Passo que quase todo mundo pula e que quebra a montagem: quando você tira a pessoa da imagem, sobra um buraco no fundo.

| Fundo original | Solução |
|---|---|
| Cor chapada | Resolve no CSS, custo zero |
| Gradiente simples | Recria em CSS |
| Textura ou padrão | Recorta um tile de área limpa e repete |
| Cena com profundidade real | Generative Fill no Photoshop, ou gera fundo novo |

Registre a decisão do fundo no manifest. Se ninguém decidir isso na Etapa 7, alguém vai improvisar na hora de montar, e vai improvisar mal.

---

## 7.7 Especificações técnicas de saída

| Tipo | Formato entrega | Formato produção | Resolução |
|---|---|---|---|
| Pessoa, objeto com alpha | PNG | WebP com alpha | 2x o tamanho de exibição |
| Textura tile | PNG | WebP | tile de 200 a 600px |
| Forma vetorial | SVG | SVG otimizado | vetor |
| Foto de fundo sem alpha | JPG qualidade 90 | WebP ou AVIF | 2x, máximo 2560px |
| Logo | SVG | SVG | vetor, nunca PNG |

PNG com alpha é pesado. Entrega em PNG para editar, produção em WebP. Sempre.

---

## 7.8 asset-manifest.json (modo FULL)

Ver template em `assets/templates/asset-manifest.json`.

Campos obrigatórios por asset: `id`, `node_path`, `decision` (cut ou rebuild), `reason`, `origin`, `usage_risk`, `format`, `target_width`, `background_treatment`, `status`.

O manifest é o que permite responder, três semanas depois, a pergunta que sempre aparece: "esse PNG está aqui por necessidade ou por preguiça?"

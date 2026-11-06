---
name: pavo-video-longo
description: >-
  Use quando precisar produzir um vídeo longo (ou reel/episódio de mini-novela)
  com IA montado por cenas: roteiro em microcenas, imagens consistentes (Google
  Flow), animação de cada cena no Pavo AI e montagem final (Remotion/ffmpeg ou
  CapCut).
---
# Vídeo longo por cenas (Flow + Pavo + montagem)

O vídeo longo não sai pronto de uma ferramenta. É uma linha de montagem: roteiro em microcenas, uma imagem consistente por cena, um clipe curto animado por imagem e montagem em sequência. A duração final = número de cenas x duração do clipe (4s no Pavo). Referências: `/workspace/totum-studio/engine/referencias-rael/pavo-video-longo/` (analise.md, prompts.md, transcricao.txt) e `/workspace/totum-studio/referencias/tiktok-edicao-video/RESUMO.md` (técnicas da coleção "Edição Vídeo", origem das regras marcadas abaixo).

## 0. Antes de começar
- Confirme: cliente/marca, objetivo, plataforma e formato (16:9 YouTube, 9:16 Reels/TikTok/Shorts), duração alvo e se o produto do cliente entra na história.
- Calcule as cenas: 60s ~ 15 cenas, 2 min ~ 30, 10 min ~ 150. Reels e TikTok: 15 a 30 cenas.
- Créditos pagos (Flow, Runway, HeyGen) só depois de roteiro aprovado. Registre o gasto do job em `creditos.md` na pasta do projeto.
- Crie a pasta do projeto: `roteiro/`, `refs/`, `imagens/`, `clips/`, `musica/`, `logo/`, `build/`, `export/`, mais o arquivo `geracoes.csv` (ver seção 3).
- Se o cliente já tem um arquivo de estilo de edição (`estilo.json`, ver seção 5), carregue-o. Se não tem, ele nasce neste job.

## 1. Roteiro em microcenas
Gere (você mesmo ou com um prompt mestre no estilo do prompt 154) as seguintes peças:
1. **Estética fixa** do projeto (materiais, luz, paleta, lente, o que NÃO pode parecer). Ela não muda entre cenas.
2. **Ficha mestre do personagem** (espécie ou pessoa, cores exatas, proporções, roupa, acessórios fixos). Se houver produto, ele entra numa **ficha mestre do produto** com forma, cor, rótulo e tamanho.
3. **Ficha mestre do cenário** (arquitetura, móveis, janela, fontes de luz).
4. **História com começo, meio e fim**, quebrada em microações. Uma ação visual clara por cena ("pega a farinha", "quebra o ovo"), nunca "faz um bolo".
5. Para cada cena: `CENA NN`, **PROMPT DE IMAGEM** e **PROMPT DE MOVIMENTO**.
   - O prompt de imagem é autossuficiente: repete roupa, cenário, luz e estética. Nunca use "o mesmo personagem" ou "como antes". Deixe claro quem, onde, o quê, objetos, enquadramento e luz.
   - **Não descreva o físico do personagem** (pele, cabelo, olhos) quando houver imagem de referência anexada. Mande copiar a referência. Texto de físico faz o Flow ignorar a imagem.
   - **Linha de câmera completa** em todo prompt de imagem: plano + lente + luz + filme. Ex.: "plano médio, 35 mm, luz lateral de janela, Kodak Portra 400 com grão leve". Mantenha a mesma luz e o mesmo filme no projeto inteiro e varie só plano e lente.
   - O prompt de movimento só tem movimentos pequenos e plausíveis a partir da imagem (piscar, inclinar a cabeça, mexer a colher, vapor, cortina). Nada de objetos surgindo ou deformação.
   - Varie os planos conforme a ação (aberto, médio, close, macro, top-down).
   - Respeite a continuidade (o que não foi cortado não aparece cortado, a manhã não vira noite).
6. **Checklist de retenção** antes de aprovar (combinar com o Lab Roteiro quando o roteiro vier dele). Passe o roteiro por 4 partes e reescreva o que falhar:
   - **Gancho** (0 a 3s): começa com o conflito, a pergunta ou a imagem mais forte. Regra: conflito antes de contexto.
   - **Argumento**: cada cena avança a história ou a promessa. Corte as que só enchem.
   - **Novo gancho no meio**: uma virada, revelação ou pergunta perto da metade para segurar quem ia sair.
   - **Chamada final**: o que a pessoa deve fazer ou sentir, de forma clara.
7. **Guia de inserts**: para vídeos com fala ou narração, gere `roteiro/inserts.csv` com `tempo_inicio, tempo_fim, fala, insert, fonte` (fonte = Flow, Pavo, Canva, foto do cliente, texto na tela). A montagem lê esse arquivo em vez de decidir os inserts na hora.
8. Salve em `roteiro/cenas.md` e `roteiro/roteiro.json` (cena, prompt_imagem, prompt_movimento, legenda opcional).
9. Passe pelo Juiz Interno e pela aprovação humana antes de gastar créditos.

## 2. Imagens no Google Flow
1. Crie um projeto novo. Gere as folhas de referência com o **agente desligado**, no formato do projeto, com o modelo Nano Banana e 1 saída:
   - **Model sheet do personagem em 3 painéis** sobre fundo cinza neutro: close do rosto, corpo inteiro de frente e corpo inteiro de costas. Nada de muitas poses nem fundo branco. Recorte também o close sozinho como `refs/<personagem>_rosto.png`.
   - **Folha do cenário** com 2 ou 3 ângulos do mesmo lugar (aberto, contraplano e detalhe), com a mesma luz.
   - **Folha de cada elemento recorrente** (produto, objeto-chave).
   Salve tudo em `refs/`.
2. Gere as cenas com o **agente ligado**. No "+", anexe em todo lote o model sheet + o recorte do rosto de cada personagem da cena + a folha do cenário (+ a folha do elemento recorrente, se aparecer). Peça para manter a consistência de todos. Nunca descreva o cenário só em texto. Comece cada prompt com "cena NN", porque o Flow entrega fora de ordem.
3. Baixe as imagens em 1K e renomeie como `imagens/01.png`, `02.png`... Confira se o personagem, o cenário e o produto ficaram iguais em todas. Refaça as cenas que fugirem.

## 3. Animação no Pavo (app.pavo-ai.work)
1. Use estas configurações: Video Generation, modelo Agnes Video 2.5 Flash (confira se o custo continua 0), modo **First and Last Frames**, proporção Auto ou a do projeto, 4s, 720p.
2. Para cada cena, suba a imagem NN como primeiro quadro, cole só o PROMPT DE MOVIMENTO dela e gere. O Pavo reescreve o prompt em inglês, e isso é normal.
3. **Cenas de transformação** (algo sendo construído, montado, mudando de estado, antes e depois): gere também a imagem do estado final no Flow, com as mesmas referências, e suba como **último quadro**. Compare com a versão só com o primeiro quadro na primeira vez que usar e anote no `geracoes.csv` qual ficou melhor.
4. Baixe como `clips/NN.mp4` (curl na URL do `<video src>`). Antes de gerar de novo, confira o histórico em Assets > Videos, porque a fila grátis é instável. Para cliente, prefira a opção de remover a marca d'água. Se ela custar créditos ou não estiver disponível, cubra a marca na montagem com o logo.
5. Refaça os clipes com deformação, objetos que surgem do nada ou personagem diferente.
6. **Registro de gerações**: a cada geração em qualquer ferramenta (Flow, Pavo, Runway, HeyGen), adicione uma linha em `geracoes.csv` com `data, ferramenta, cena, prompt, refs, creditos, resultado (ok/refazer), arquivo`. O `creditos.md` é o total desse arquivo por ferramenta, então some a coluna ao fechar o job em vez de anotar de memória.
7. Ainda não testados: Omni Mode (com @Image1 e @Video1), Short Drama e Agent. Teste antes de usar em produção.

## 4. Trilha
Use música livre de direitos (biblioteca de áudio do YouTube Studio ou IA de música) e salve em `musica/trilha.mp3`. Música comercial só com licença, ainda mais em anúncio pago. Os clipes do Pavo já vêm com som ambiente: aproveite-o mais baixo, sob voz e trilha.

## 5. Montagem
**Template reaproveitável + estilo por cliente (padrão):**
1. Não reescreva o render do zero a cada job. Use um template único (Remotion ou script Python/ffmpeg em `/workspace/totum-studio/engine/`) que lê `roteiro.json`, `inserts.csv` e o `estilo.json` do cliente.
2. O `estilo.json` fica em `/workspace/totum-studio/clientes/<cliente>/estilo.json` e guarda o padrão de edição: fontes, cores, caixa da legenda, estilo da legenda, tipo e duração de transição, ritmo de corte, logo e posição, card final, loudness. Quando o cliente aprovar um vídeo, atualize o `estilo.json` com o que foi aprovado.
3. Copie o script usado para `build/` do projeto, para o job poder ser refeito depois.

**Passos:**
1. Normalize os clipes com ffmpeg (mesmo fps e resolução).
2. Monte a sequência na ordem do `roteiro.json`, com a trilha em loop e fade no fim, o logo fixo no canto da marca d'água, os inserts do `inserts.csv` e transições curtas (fade de 6 a 10 quadros). No Remotion: `<Series>` com `<Series.Sequence>` por clipe, `<Audio>` e `@remotion/transitions`.
3. **Legenda palavra por palavra (padrão em Reels/TikTok/Shorts)**: transcreva a voz localmente com faster-whisper com `word_timestamps`, mostre 1 a 4 palavras por vez e destaque a palavra-chave de cada frase em outra cor ou peso, seguindo o `estilo.json`. Mantenha a legenda fora das zonas da interface do app (topo e base do 9:16) e tire-a antes do card final. Gere também o `.srt`.
4. Renderize em 1920x1080 e/ou 1080x1920 a partir do mesmo projeto e salve em `export/`. Normalize o áudio para -14 LUFS (ffmpeg-skill: `export.py --preset reels --normalize` e `check.py`).

**Manual (CapCut):** arraste os clipes 01, 02, 03... na ordem, adicione a trilha (repita se acabar antes), coloque o logo no canto e exporte.

## 6. Entrega
- Assista ao vídeo exportado inteiro, ou peça uma revisão do vídeo, antes de dizer que está pronto. Confirme os apontamentos da revisão com frames e medição antes de mexer, porque a revisão automática dá falsos positivos.
- Entregue o arquivo, a lista de cenas e os créditos gastos (do `geracoes.csv`). Publicar ou enviar para o cliente só com aprovação humana.

## Armadilhas
- Sem as imagens de referência (personagem e cenário) no comando do Flow, cada cena sai com um personagem ou lugar diferente.
- Descrever o físico no prompt faz o Flow ignorar a referência.
- Os prompts de imagem que dependem da cena anterior quebram a consistência.
- Um movimento grande demais deforma o clipe. Mantenha-o pequeno.
- "Grátis e ilimitado" pode mudar. Confira o contador de custo do Pavo antes de cada lote.
- Vídeos de dica costumam vender ferramenta paga (Seedance/Kairogen, Kling, ElevenCreative). Teste a técnica primeiro com Flow e Pavo, e só considere a ferramenta paga se elas não resolverem.

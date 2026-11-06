---
name: planejar-edicao
description: >-
  Use antes de editar ou gerar qualquer vídeo, quando chegar um roteiro, um
  vídeo bruto ou um pedido de edição: analisa a fala e entrega o plano de edição
  (mapa de batidas, tipo de cada inserção, GUIA-DE-INSERCOES.md, prompts,
  orçamento de créditos e checagem da marca) para aprovação antes de gastar.
---
# Planejar edição

Skill de planejamento. Ela não edita e não gasta crédito: entrega o plano para aprovação. A produção vem depois (pavo-video-longo para cenas geradas, template Remotion para vídeo gravado). Base: método Máquina de Edição IA (referência interna em `/workspace/totum-studio/referencias/maquina-edicao-ia/RESUMO.md`) e o formato de guia de inserções do TikTok do Tiago Lemos (`/workspace/totum-studio/referencias/skill-mestresai/`).

## Entradas
- Roteiro, vídeo bruto, ou os dois. Opcional: vídeo de referência de estilo.
- `clientes/<cliente>/estilo.json` e o manual da marca do cliente.
- Briefing curto: objetivo, público, plataforma e formato, CTA real, assets disponíveis, teto de gasto.

## Passos
1. **Briefing.** Preencha `plano/briefing.md` (ficha de direção) com o que já foi dito. Pergunte só o que muda o resultado. Dado, preço, prova ou CTA que não existe fica marcado como lacuna, nunca inventado.
2. **Base de tempo.**
   - Com vídeo: transcrição local (faster-whisper, word_timestamps, sem VAD) em `plano/palavras.json` e lista de cortes em `plano/cortes.md` (tomadas repetidas, erros, pausas). Os cortes são aprovados antes de qualquer motion. A gravação manda; o roteiro só confere termos.
   - Só roteiro: tempos estimados (cerca de 2,5 palavras por segundo em pt-BR) e marcados `precisao_tempo=previsao`, recalculados quando chegar a locução.
   - Com referência de estilo: extraia cortes, duração média de plano, transições, BPM e adiantamento do visual em relação à fala, separando observado, inferido e não verificável.
3. **Batidas.** Divida a fala em unidades de sentido de 2 a 5 s. Para cada uma: o que o público precisa entender, o que olhar, o que muda na tela, o que permanece, e a forma da informação (lista, passos, número, comparação, gráfico, destaque, definição, frase, pergunta, CTA). Para cada frase, uma cena.
4. **Tipo de inserção**, um por batida, com motivo escrito:

| Código | Tipo | Quando | Ferramenta | Custo |
|:--|:--|:--|:--|:--|
| MOT | Motion gráfico, lettering, infográfico | listas, passos, números, comparação, definição, CTA | Remotion com estilo.json | grátis |
| FOOT | Footage gerado | cena que não existe gravada | imagem no Flow (pago, só roteiro aprovado) ou imagem do cliente/banco livre, animada no Pavo | Pavo grátis; Flow créditos |
| AVA | Avatar | sem apresentador gravado | HeyGen | créditos |
| FX | Efeito sobre vídeo | recorte, troca de cenário que o local não resolve (testar 5 s local antes) | Runway | créditos |
| TELA | Material real | print, gravação de tela, foto do cliente, logo oficial, dado real | arquivo do cliente | grátis, precisa do arquivo |
| ARTE | Arte estática da marca | KV, card já existente | Canva | plano atual |
| CAM | Sem inserção | respiro, emoção, confiança | ffmpeg/Remotion | grátis |

   Ordem de escolha: MOT ou TELA primeiro; FOOT só quando a ideia precisa de imagem que não existe; AVA e FX só com motivo. Inserção que só enfeita sai. Marca citada usa logo oficial (TELA). Material real que o cliente precisa mandar vira `[TELA: descrição]`, com alternativa gerada anotada como `(alt.: ...)`.
5. **Layout e ritmo.** Para cada batida: tela cheia, moldura (rosto centralizado) ou explicação em tela cheia com a voz por baixo; transição; SFX. Confira:
   - cerca de 70% do vídeo com algo na tela além da pessoa e legenda;
   - nenhum trecho acima de 3,5 s só com pessoa e legenda;
   - a tela muda a cada 1,5 a 2,5 s;
   - o mesmo bloco não se repete 3 vezes seguidas;
   - nada aparece antes de ser dito, salvo o adiantamento definido no estilo.json do cliente;
   - checklist de retenção da pavo-video-longo: gancho, argumento, re-gancho no meio, CTA; conflito antes de contexto.
6. **Checagem da marca.** Contra o manual e o estilo.json: cores fora da paleta, fonte fora do manual, uso de caixa alta proibido, logo girado ou distorcido, cor de destaque acima do limite, texto fora da área segura. Liste cada violação com o id da batida em `plano/checagem-marca.md`.
7. **Orçamento antes de gastar.** Some por ferramenta as gerações previstas (FOOT, AVA, FX) com margem de refação tirada dos `geracoes.csv` anteriores. Valor unitário só do painel da ferramenta ou do histórico; o resto fica "a confirmar". Nada pago até o Rael aprovar plano e orçamento.
8. **Aprovação em duas etapas.** (a) Rael aprova mapa, guia e orçamento. (b) Depois da produção, amostra de 8 s (10 a 15 s com moldura ou motion pesado) antes do vídeo inteiro. Correções por intervalo: início-fim, problema, mudança, o que preservar.

## Saídas em `plano/` do projeto
- `briefing.md`
- `palavras.json` e `cortes.md` (quando há vídeo)
- `mapa-edicao.csv` com colunas `id, tc_in, tc_out, fala_real, forma, tipo, foco_visual, acao_visual, texto_na_tela, layout, transicao, audio_sfx, arquivo, ferramenta, creditos_est, precisao_tempo, criterio_de_revisao, status`
- `GUIA-DE-INSERCOES.md`: tabela `nº | timecode | frase-gatilho | arquivo`, arquivos no padrão `NN_M-SS_TIPO_slug.ext` (ex.: `05_0-18_MOT_2mil-vs-2milhoes.mp4`), com notas `(alt.: ...)` e `[TELA: ...]`, mais um resumo de como as inserções sustentam a narrativa (gancho, prova, dados, casos, CTA)
- `prompts-geracao.md`: um prompt por FOOT, AVA ou FX, seguindo as regras da pavo-video-longo (referências anexadas, sem descrição física, linha de câmera completa)
- `orcamento.md`: por ferramenta, itens, gerações, margem, créditos estimados e total para aprovar
- `checagem-marca.md`
- `plano.json`: a mesma linha do tempo em dados para o template Remotion
- Conferidor: rode `python3 /workspace/totum-studio/ferramentas/planejar-edicao/conferir.py plano/` e corrija o plano até passar antes de mandar para aprovação.

## Fluxo de trabalho com o Rael
1. **Planejamento** (esta skill): plano/ completo e conferido, aprovado pelo Rael junto com o orçamento.
2. **Storyboard em PSD** (Lab Vídeo monta): um PSD por prancha ou um PSD com uma prancha por artboard, a partir do mapa-edicao.csv. Camadas nomeadas e editáveis pelo id da batida (ex.: `B07_texto`, `B07_inserção`, `B07_fundo`, `B07_notas`), textos como camadas de texto quando possível, timecode e frase-gatilho visíveis, paleta e fontes do estilo.json. Exporte também PNG e PDF para pré-visualização. Salve em `storyboard/` do projeto.
3. **Ajuste fino** (Rael faz no PSD): ele devolve o arquivo ajustado.
4. **Storyboard pronto guia o Claude Code**: leia o PSD devolvido, compare camada por camada com a versão enviada, atualize o mapa-edicao.csv e o plano.json com cada mudança (registre em `plano/ajustes-rael.md`), rode o conferidor de novo e gere o pacote de edição (PSD/PNG pronto, plano.json, GUIA-DE-INSERCOES.md e prompt de edição) para o Claude Code montar o vídeo. Depois vem a amostra de 8 a 15 s antes do vídeo inteiro.

## Regras
- Não invente dado, resultado, depoimento ou preço.
- Nada é enviado ao cliente nem publicado sem aprovação do Rael.
- O padrão aprovado de cada cliente volta para o estilo.json dele, para o próximo vídeo usar.

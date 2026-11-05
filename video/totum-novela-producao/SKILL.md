---
name: totum-novela-producao
description: Use quando um capítulo de mini-novela (ou vídeo narrativo longo) estiver com roteiro aprovado e precisar virar pacote de produção para o Lab Vídeo, com cenas, takes de até 4 s, fichas, estética fixa e prompts de imagem e movimento.
---

# Pacote de produção de capítulo (Roteiro para Vídeo)

v1.0, 05/11/2026. Base: capítulo 1 de "Mérito Próprio" (Cenova), montado pelo Lab Roteiro em 27/10/2026: 3:00, 21 cenas de até 12 s, 53 takes (52 gerados de até 4 s e 1 montado na edição). O pacote é a etapa 1 da skill `pavo-video-longo` e entra depois do `planejar-edicao` quando houver edição complexa.

Esta skill não gera imagem, não gasta crédito e não edita. Ela entrega o pacote que o Lab Vídeo executa.

## Quando usar

- Roteiro do capítulo aprovado pelo Rael num documento (Google Doc ou md), e a produção vai para IA de imagem e vídeo.
- Mudou o roteiro aprovado e o pacote precisa ser refeito.

Não use para: roteiro de reels ou conteúdo de feed (`totum-content-roteiro`), escrever a novela do zero, montar o vídeo (`pavo-video-longo`).

## Fonte da verdade

O documento aprovado manda. Falas, texto na tela e som entram copiados sem alteração. Se o pacote e o Doc divergirem, vale o Doc. Anote no LEIA-ME o documento, a guia e a hora da última leitura. Incoerência encontrada no Doc vira proposta de correção para o Rael; só entra no pacote depois do OK.

## Estrutura obrigatória

```
<cliente>/<novela>/producao/capNN/
├── LEIA-ME.md          o que é, fonte da verdade, arquivos, refs, ordem de produção, resumo de pendências
├── estetica-fixa.md    linguagem visual, lente e câmera, luz por bloco de cenas, paleta e regras de cor, o que não pode parecer
├── fichas-mestre.md    ficha de cada personagem, objeto de continuidade e cenário
├── cenas.md            cenas com campos do Doc e takes com PROMPT DE IMAGEM e PROMPT DE MOVIMENTO
├── roteiro.json        o mesmo conteúdo de cenas.md, para automação e montagem
├── pendencias.md       o que falta confirmar antes de produzir e antes de publicar
├── creditos.md         tabela de créditos gastos (data, ferramenta, takes, créditos, aprovado por)
├── referencias/        ref_<nome> de personagens e objetos
├── imagens/            NNx.png (primeiro quadro de cada take)
├── clips/              NNx.mp4
├── audio/              vozes, trilha, SFX
├── logo/               arquivo oficial da marca, se houver placement
├── edit/               projeto de montagem
└── export/             1080x1920 final
```

`roteiro.json`: `projeto`, `fonte`, `formato`, `duracao_total_s`, `clip_pavo_s`, `cenas[]`; cada cena com `cena`, `titulo`, `inicio`, `fim`, `duracao_s`, `local`, `luz_clima`, `plano`, `acao`, `falas`, `texto_na_tela`, `som`, `takes[]`; cada take com `take`, `duracao_s`, `gerar`, `referencias`, `audio`, `prompt_imagem`, `prompt_movimento`.

## Regras de tempo

- Cena de até 12 s. Take gerado de até 4 s (limite do clipe no Pavo). Cena acima de 4 s quebra em takes `NNa`, `NNb`, `NNc`.
- Se a ferramenta gerar até 12 s, a cena pode sair num take só: o take "a" vira imagem e as ações se juntam no prompt de movimento. Deixe essa nota em `cenas.md`.
- Take que não é gerado (tela preta, cartela) leva `gerar: false` e é montado na edição.
- Some as durações e confira com o total do Doc. Fala cabe em cerca de 2,5 palavras por segundo.

## Regras dos prompts

1. Prompt de imagem e de movimento em inglês; falas em pt-BR.
2. Todo prompt de imagem começa por `Scene NNx.`, lista as referências a anexar e diz que a referência manda ("Keep every character exactly as in their reference image; the description below is only support").
3. Bloco STYLE e bloco Avoid iguais em todos os takes, vindos de `estetica-fixa.md`.
4. Prompt de movimento curto: uma ação pequena, câmera quase parada, e sempre "No new objects appearing, no face or hand deformation, keep identity and outfit unchanged."
5. Nenhum prompt cita ator, atriz ou pessoa famosa. Nomes de casting ficam só numa seção "Referência interna" no fim de `fichas-mestre.md`.
6. Nada de texto gerado pela IA: texto na tela, balão de mensagem, stories, cartela e logo entram na edição. Para o logo, gere a superfície lisa e aplique o arquivo oficial.
7. Continuidade escrita no take: figurino, objetos (anel, bolo, tipoia), horário, chuva. A ficha diz em que cenas cada objeto aparece ou some.
8. Cor da marca reservada: se o placement usa uma cor da marca, nenhuma outra roupa ou objeto pode ter tom parecido.

## Pessoas reais

- Pessoa real (sócio, cliente, colaborador) só entra a partir de imagem de referência feita com ela e com autorização de uso de imagem por escrito para o uso definido. Sem autorização, dá para produzir, não para publicar. Voz de pessoa real, só com autorização dela.
- A imagem de referência vence a ficha textual em traço físico. Figurino e objetos seguem o Doc.
- Não crie model sheet novo se as referências já vieram aprovadas.

## Passo a passo

1. Ler o Doc inteiro (capítulo e guia de personagens) e anotar hora da leitura.
2. Listar incoerências (duração, nome, continuidade) e levar ao Rael antes de seguir.
3. Escrever `estetica-fixa.md`: linguagem, lente por tipo de plano, luz por bloco de cenas com a ordem do tempo na história, paleta, o que não pode parecer.
4. Escrever `fichas-mestre.md`: cada personagem com cenas em que aparece, físico, roupa fixa, continuidade e o nome do arquivo `ref_<nome>`; figurantes que precisam de referência travada.
5. Escrever `cenas.md`: por cena, os campos do Doc literais; por take, duração, referências, áudio do take, PROMPT DE IMAGEM e PROMPT DE MOVIMENTO.
6. Gerar `roteiro.json` a partir do mesmo conteúdo e validar (soma de tempos, take até 4 s, cena até 12 s, todo take com refs existentes na lista de fichas).
7. Escrever `pendencias.md`: [A CONFIRMAR] com o Rael (uso final, autorização de imagem, nomes de lugares reais, voz e lip sync, logo), correções aplicadas no Doc, pendências de produção.
8. Criar as pastas vazias e `creditos.md` com a tabela.
9. Escrever o `LEIA-ME.md` com a ordem de produção: pendências, referências, imagens no Google Flow na ordem de `cenas.md`, clipes no Pavo só com o prompt de movimento, vozes à parte, edição, exportação 1080x1920, publicação só com OK do Rael.
10. Handoff ao Lab Vídeo com o caminho do pacote. A execução segue `pavo-video-longo`.

## Critério de pronto

- [ ] Doc citado com hora de leitura; falas, texto e som literais
- [ ] Todas as cenas até 12 s e takes gerados até 4 s; soma bate com o Doc
- [ ] Todo take com refs, áudio, prompt de imagem e de movimento
- [ ] Nenhum ator citado em prompt; nenhum texto ou logo gerado
- [ ] Pendências de publicação separadas das de produção
- [ ] Nenhum crédito gasto nesta etapa

## O que não fazer

- Não reescrever fala ou cena do Doc no pacote.
- Não gerar imagem ou clipe "para testar" nesta etapa.
- Não publicar nem mostrar ao cliente sem OK do Rael.
- Não usar imagem ou voz de pessoa real sem autorização registrada.

---
name: protocolo-edicao-video
description: >-
  Use como protocolo de ponta a ponta sempre que for editar ou montar um vídeo
  (gravado, gerado por IA ou misto): define a ordem das fases, os portões de
  aprovação e o que cada skill faz. Planeja primeiro (batidas com planejar-edicao,
  direção de cena com cinematografia-prompt, prompt por modelo com video-prompting)
  e só depois edita. Acione em "editar vídeo", "montar reel", "protocolo de edição",
  "fluxo de edição", "vou editar esse vídeo".
---
# Protocolo de edição de vídeo

Skill orquestradora. Ela não edita e não gera nada sozinha: manda o trabalho na ordem certa e trava a edição até o plano estar aprovado. Cada fase chama uma skill que já existe e tem uma saída em arquivo. Fase sem a saída da anterior não começa.

Regra de ouro: **planejar tudo antes de editar**. Nenhum crédito pago, nenhum corte final e nenhuma montagem antes do Portão 1.

## Envio da lista do workflow (primeira ação)
Assim que o protocolo for acionado, antes de qualquer outra coisa, envie ao Rael a lista do workflow **em modo lista** (lista numerada no chat, nunca tabela), com o status de cada fase. Adapte ao vídeo do pedido (fase que não se aplica sai marcada como "não se aplica" com o motivo). Modelo:

```text
Workflow de edição: <nome do vídeo>
1. [ ] Briefing, materiais e design system (enviar o design system do cliente)
2. [ ] Base de tempo e cortes (portão: cortes aprovados)
3. [ ] Batidas e tipo de inserção
4. [ ] Direção de cena dos planos gerados (cinematografia-prompt)
5. [ ] Prompt final por modelo (video-prompting)
6. [ ] Marca, orçamento e conferência (PORTÃO 1: aprovação do Rael)
7. [ ] Storyboard e ajuste fino
8. [ ] Amostra de 8 a 15 s (PORTÃO 2)
9. [ ] Produção e montagem
10. [ ] Revisão e fechamento (PORTÃO 3)
Agora: fase 1. Falta de você: design system do cliente, <demais itens>
```
Marque `[x]` ao concluir cada fase, `[~]` na fase em andamento. Reenvie a lista atualizada em todo portão e quando o plano mudar. Em ferramenta com lista de tarefas própria (ex.: update_plan), espelhe a mesma lista lá.

## Mapa do fluxo

| Fase | O que acontece | Skill | Saída em `plano/` | Portão |
|:--|:--|:--|:--|:--|
| 0 | Briefing, materiais e design system | esta | `briefing.md` | Design system recebido |
| 1 | Base de tempo e cortes | planejar-edicao (passos 1 e 2) | `palavras.json`, `cortes.md` | Cortes aprovados |
| 2 | Batidas e tipo de inserção | planejar-edicao (passos 3 a 5) | `mapa-edicao.csv` | |
| 3 | Direção de cena de cada footage gerado | cinematografia-prompt | `fichas-de-plano.md` | |
| 4 | Prompt final por modelo | video-prompting | `prompts-geracao.md` | |
| 5 | Marca, orçamento e conferência | planejar-edicao (passos 6 e 7) | `checagem-marca.md`, `orcamento.md`, `GUIA-DE-INSERCOES.md`, `plano.json` | **Portão 1: Rael aprova plano e orçamento** |
| 6 | Storyboard | planejar-edicao (fluxo com o Rael) | `storyboard/` | Rael ajusta |
| 7 | Produção da amostra | pavo-video-longo ou Remotion | amostra de 8 a 15 s | **Portão 2: amostra aprovada** |
| 8 | Produção e montagem | pavo-video-longo ou Remotion | `export/` | |
| 9 | Revisão e fechamento | esta | `revisao.md`, `estilo.json` atualizado | **Portão 3: Rael aprova a entrega** |

## Fase 0: briefing
Preencha `plano/briefing.md` com o que já foi dito e pergunte só o que muda o resultado:
- objetivo, público, plataforma e proporção (9:16, 4:5, 16:9), duração alvo, CTA real;
- origem do material: vídeo bruto, roteiro, os dois ou só um pedido;
- cliente e **design system (obrigatório, ver abaixo)**; `estilo.json`; referência de estilo, se houver;
- assets que existem (logo, prints, fotos, footage) e teto de gasto;
- ferramentas e modelos liberados (ex.: Veo 3, Seedance, Kling, Grok Imagine, Runway, HeyGen).

### Design system obrigatório
O vídeo não sai do briefing sem o design system do cliente. Peça ao Rael, logo na abertura, que envie: manual da marca ou design system (paleta com hex, fontes e pesos, regras de logo, caixa alta, área segura, tom visual) e, se existir, `estilo.json` e a pasta `1- Design System` do Drive. Procure primeiro o que já existe (`clientes/<cliente>/`, `manual-da-marca`, `totum-design-system`) e confirme com o Rael se está atual.
- Sem design system: pare na Fase 0, peça o envio e deixe a lista do workflow marcada como "aguardando design system". Nada de Fase 1 em diante. Se o Rael mandar seguir sem, registre a decisão em `briefing.md` e use paleta neutra, sem inventar cor ou fonte de marca.
- Com design system: copie as regras para `briefing.md` (seção "Marca") e use em tudo: motion (MOT), linha de look das fichas de plano, checagem da marca (Fase 5) e revisão (Fase 9).

Dado, preço, prova, depoimento ou CTA que não existe fica marcado como lacuna. Nunca invente. Pessoa real só com autorização de uso de imagem.

## Fase 1: base de tempo
Siga `planejar-edicao` (transcrição com timestamps, lista de cortes). Sem vídeo, use tempo estimado e marque `precisao_tempo=previsao`. Os cortes são aprovados antes de qualquer motion ou geração. A gravação manda; o roteiro só confere termos.

## Fase 2: batidas e tipo de inserção
Siga `planejar-edicao`: unidades de sentido de 2 a 5 s, uma cena por frase, um tipo por batida (MOT, FOOT, AVA, FX, TELA, ARTE, CAM) com o motivo escrito. Ordem de escolha: MOT ou TELA primeiro; FOOT só quando a ideia precisa de imagem que não existe; AVA e FX só com motivo. Confira ritmo (tela muda a cada 1,5 a 2,5 s, nenhum trecho acima de 3,5 s só com pessoa e legenda) e retenção (gancho, argumento, re-gancho no meio, CTA).

## Fase 3: direção de cena (cinematografia-prompt)
Para cada batida FOOT, AVA ou FX, e para todo B-roll gerado, escreva uma ficha em `plano/fichas-de-plano.md` usando a `cinematografia-prompt`. Antes das fichas, fixe **uma linha de look para o vídeo inteiro**: luz, paleta, filme/grade, textura e o que não pode parecer. Ela não muda entre planos; só variam plano e lente.

Ficha de cada plano (ordem SCLCAM):
```text
ID da batida: B07 | tc 0:18-0:22 | frase-gatilho: "..."
Sujeito e ação: ...
Contexto: local, hora, clima
Enquadramento e lente: ex. plano médio, 35 mm, profundidade rasa
Movimento de câmera: ex. push-in lento (ou câmera travada)
Luz e atmosfera: ...
Cor e textura: ...
Continuidade: o que repete do plano anterior (personagem, produto, cenário)
Modo de entrada: texto para vídeo | imagem para vídeo | primeiro e último frame | referência
Modelo escolhido e por quê:
```
Critérios: movimento de câmera plausível, lente, plano e ângulo sem contradição, direção de luz clara, um plano por prompt (salvo modelo que aceite lista). Sem adjetivo vazio ("épico", "premium", "cinematográfico" sozinho).

Personagem ou produto que repete: faça a folha de personagem primeiro (`video-prompting`, `references/workflows/character-sheets.md`), depois o still âncora de cada cena, depois o movimento.

## Fase 4: prompt final por modelo (video-prompting)
Com a ficha pronta e o modelo escolhido, siga a `video-prompting`: abra o `prompting.md` do modelo e escreva no formato exigido. Em `plano/prompts-geracao.md`, por plano:
- prompt final em inglês (uma linha, salvo as exceções multilinha do guia) e tradução em pt-BR;
- parâmetros recomendados numa linha separada, fora do prompt (duração, proporção, resolução);
- imagem de referência a anexar, quando houver;
- para imagem para vídeo: a imagem é a âncora; o prompt só fala de movimento, câmera, emoção e áudio.

Regras: sem nome de modelo, duração, proporção ou resolução dentro do texto do prompt. Referência anexada significa não descrever o físico do personagem. Modelo sem guia usa a estrutura do mais parecido (Seedance ou Veo) com a cinematografia-prompt.

## Fase 5: marca, orçamento e conferência
Siga `planejar-edicao` passos 6 e 7: checagem contra o manual e o `estilo.json`, orçamento por ferramenta com margem de refação, `GUIA-DE-INSERCOES.md`, `plano.json`. Rode o conferidor (`python3 /workspace/totum-studio/ferramentas/planejar-edicao/conferir.py plano/`) até passar.

### Portão 1 (obrigatório)
Antes de qualquer geração paga ou edição, entregue ao Rael: mapa de edição, fichas de plano, prompts, orçamento e checagem da marca, junto com o design system usado (o resumo da seção "Marca" do briefing) para ele confirmar que é o certo. Só segue com aprovação explícita. Sem ela, tudo fica em rascunho.

## Fases 6 a 8: produção
- Storyboard e ajuste fino pelo fluxo da `planejar-edicao` (PSD com camadas por id de batida). O que o Rael mudar atualiza `mapa-edicao.csv` e `plano.json` (registre em `plano/ajustes-rael.md`) e o conferidor roda de novo.
- Vídeo gerado por cenas: `pavo-video-longo`. Vídeo gravado com motion: template Remotion com `plano.json`.
- **Portão 2**: amostra de 8 s (10 a 15 s com moldura ou motion pesado) antes do vídeo inteiro. Correções por intervalo: início-fim, problema, mudança, o que preservar.
- Gerou cena? Registre em `geracoes.csv` o ID da batida, o prompt usado, o modelo e o resultado, para refação e orçamento futuro.

## Fase 9: revisão e fechamento
Assista inteiro e confira em `plano/revisao.md`:
- cada batida do mapa tem seu arquivo e entrou na hora certa; nada aparece antes de ser dito (salvo o adiantamento do estilo.json);
- ritmo e retenção batem com a Fase 2; áudio, SFX e legenda sem sobreposição;
- marca: cores, fonte, logo e área segura;
- nenhuma lacuna do briefing virou dado inventado.

### Portão 3
Nada é enviado ao cliente nem publicado sem aprovação do Rael. O padrão aprovado volta para o `estilo.json` do cliente para o próximo vídeo.

## Regras
- Sem travessão no texto em pt-BR.
- Plano antes de edição: se o pedido vier "só edita", rode as Fases 0 a 5 de forma enxuta (vídeo curto pode ter um mapa de poucas linhas), mas não pule o Portão 1.
- Mudou o roteiro, o tempo ou o modelo no meio? Volte à fase afetada, atualize os arquivos e rode o conferidor.
- Cada pedido de correção do Rael vira entrada em `ajustes-rael.md`, nunca só ajuste silencioso.

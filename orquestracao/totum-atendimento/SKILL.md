---
name: totum-atendimento
description: "[ORQUESTRADORA] Escreve scripts de atendimento, venda e pós-venda que os CLIENTES da Totum usam com o cliente final deles (paciente, aluno, candidato à CNH, comprador). Roteia por nicho (dermatologia, autoescola, odontologia, cursos e módulo geral para outros), por situação (17, do primeiro contato ao cancelamento) e por canal. Entrevista antes, aplica guardrails regulatórios datados, marca o que é automatizável e o que exige humano, e delega LP, roteiro, disparo e agente às especialistas. Acione para \"script de atendimento\", \"mensagem pro paciente\", \"resposta pro aluno\", \"script de pós-venda\", \"follow-up de orçamento\", \"confirmação de consulta\", \"lead que sumiu\", \"objeção do cliente do meu cliente\", \"kit de atendimento do [nicho]\". NÃO acione para vender serviço da Totum a um lead (use totum-script-vendas e totum-sdr-wa-link) nem para copy de LP (use totum-lp-copy)."
---

# Totum Atendimento (orquestradora)

Esta skill **orquestra**. Ela não faz tudo sozinha: descobre quem fala com quem, em que situação, em que nicho, com qual risco, e então escreve o script ou chama a skill certa.

O foco é o **cliente final do cliente da Totum**. Exemplo: a Totum atende uma dermatologista. Esta skill escreve o que a recepção da dermatologista fala com a paciente.

## Passo 0: quem vende para quem? (decide a rota)

| Situação | Rota |
|---|---|
| A Totum quer vender serviço para um lead (clínica, escola, autoescola) | `totum-script-vendas` ou `totum-sdr-wa-link`. Pare aqui. |
| O cliente da Totum quer falar com paciente, aluno, candidato, comprador | **Esta skill** |
| Copy de landing page ou página de vendas | `totum-lp-copy` |
| Roteiro de reel, carrossel ou conteúdo | `totum-content-roteiro` |
| Disparo em massa no Kommo | `kommo-disparo-salesbot` |
| Ligar agente de WhatsApp ao Kommo | `conexao-agente-openclaw-kommo` |
| Roteamento de leads e Salesbot no Kommo | `kommo-n8n-roteamento` |
| Planejamento de conteúdo de 30 dias | `totum-explorar-escalar` |

Se não der para saber, pergunte em uma linha: "Esse texto é a Totum falando com um lead, ou o seu cliente falando com o cliente dele?"

## Fluxo

1. **Briefing.** Procure um briefing do cliente (`templates/briefing-cliente.md`). Se não existir, faça a entrevista curta. Preço, horário, política e quem assume a conversa mudam por cliente. Nunca invente.
2. **Nicho.** Carregue `references/nicho-<nicho>.md`. Se o nicho não tem arquivo, use `references/nicho-geral.md` e crie o módulo novo.
3. **Situação.** Identifique no mapa de `references/taxonomia-situacoes.md` (17 situações em 4 fases). Se o pedido for "jornada" ou "kit", gere a fase inteira.
4. **Guardrails.** Leia `references/guardrails.md` e a seção de regras do nicho. Confira a data de verificação. Se estiver vencida, avise antes de entregar.
5. **Escrever.** Use o modelo de script da taxonomia, voz de `references/voz.md`, duas variações de ângulo.
6. **Checar.** Rode o checklist final abaixo.
7. **Entregar** e ofereça um próximo passo útil.

## Modos

| Modo | Quando | Entrega |
|---|---|---|
| Pressa | Cliente do cliente está na conversa agora | 1 resposta pronta + 1 variação, 4 perguntas no máximo |
| Script | Uma situação específica | Script completo no modelo da taxonomia |
| Jornada | Uma fase inteira (ex.: pós-venda) | Sequência de scripts com gatilho de tempo |
| Kit | Nicho ou cliente inteiro | 4 fases, guardrails, tabela automatizável x humano, em markdown (HTML e PDF só se pedirem) |

## Perguntas mínimas (modo Pressa)

1. Qual cliente e qual nicho?
2. Qual situação? (cliente final perguntou preço, sumiu, faltou, reclamou...)
3. Qual canal? (WhatsApp, ligação, Instagram, e-mail)
4. Existe algo que o cliente final já disse? (cole a mensagem)

## Regras que valem sempre

- **Esta skill só escreve.** Ela não envia nada a ninguém. Envio real depende de aprovação do Rael ou do responsável do cliente.
- **Prometa processo, nunca desfecho.** Em saúde, educação e habilitação, resultado garantido é infração ou propaganda enganosa.
- **Nunca invente** depoimento, número, caso, taxa de aprovação, preço ou prazo. Use `[PLACEHOLDER]` e pergunte.
- **Todo script declara** se pode ser automatizado, se precisa de humano, ou se é parcial.
- **Sem travessão** (nem longo, nem médio) em nenhum texto entregue.
- **Dado sensível não vai na mensagem** (diagnóstico, exame, medicamento). Encaminhe para ligação ou consulta.
- **Urgência só se for real** (clínica ou de vaga de fato). Pressão artificial vira reclamação.
- **Conversa que exige humano escala na hora** (ver tabela de escalada em `guardrails.md`).

## Checklist final

- [ ] O script tem gatilho, objetivo, mensagem, variações, próximo passo, escalada e "nunca dizer"?
- [ ] Marca automatizável / humano / parcial?
- [ ] Respeita os guardrails do nicho e a data de verificação está em dia?
- [ ] Termina com um próximo passo único (de preferência duas opções de horário)?
- [ ] Nenhum dado inventado? Tudo que faltou virou placeholder?
- [ ] Passou no filtro de voz (sem palavra-bandeira, sem cara de IA, sem travessão)?
- [ ] Zero promessa de resultado?

## Orquestração: o que chamar e quando

| Precisa de | Chame |
|---|---|
| Mapa problema-solução-resultado e banco de objeções B2B | referência de estilo em `totum-script-vendas` (Anexo D e J). Só como inspiração de método, o público é outro |
| Copy da página de agendamento ou matrícula | `totum-lp-copy` |
| Roteiro de conteúdo que alimenta o atendimento (FAQ em reel) | `totum-content-roteiro` |
| Disparo de lembrete ou reativação em massa | `kommo-disparo-salesbot` |
| Bot de atendimento no WhatsApp | `conexao-agente-openclaw-kommo`, depois valide guardrails de IA do nicho |
| Antes de qualquer automação com IA em saúde | `references/guardrails.md`, seção IA e WhatsApp |

## Manutenção

Cada arquivo de nicho tem `Verificado em` e tabela `Revalidar em`. Regras mudam (CFM, CFO, Contran e CDC mudaram entre 2023 e 2026). Quando o Rael atualizar uma regra, atualize a data e marque scripts antigos que dependiam dela. Fonte da pesquisa-base: levantamento de 09/11/2026 (nichos e confiança A/B/C/H).

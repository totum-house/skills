---
name: kommo-disparo-salesbot
description: Disparo em massa de mensagem de WhatsApp para leads do Kommo via Salesbot, respeitando a janela de 24h do WhatsApp, com trava contra disparo duplicado, divisão A/B entre robôs de template, fallback de texto livre e relatório por grupo. Use quando o Rael pedir "disparar mensagem pros leads", "mandar o É hoje", "disparo em massa no Kommo", "rodar o robô pra etapa X", "mandar template pra lista", "lembrete do evento pelo Kommo", ou agendar um disparo de campanha/lançamento em conta Kommo.
---

# Kommo: disparo em massa via Salesbot

Playbook para mandar uma mensagem para um público de leads do Kommo sem estourar a regra de janela do WhatsApp, sem disparar duas vezes e com prova do que saiu.

**Regra central:** fora da janela de 24h o WhatsApp só aceita template aprovado. Texto livre só vai para quem mandou mensagem nas últimas 24h. Nunca mande texto livre para quem está fora da janela.

## Parâmetros (pergunte o que faltar antes de disparar)

| Parâmetro | Exemplo (Brasil Habilitado, 06/11/2026) |
|---|---|
| Conta Kommo | `brasilhabilitado33.kommo.com` |
| Público: funil + etapas incluídas | Follow-up `14695347` etapas `113551083` (Cadastro concluído) e `113551091` (Presença confirmada); funil `14685227` etapa `113469659` (Em andamento) |
| Etapas excluídas | Não concluiu `113542839`, ganho, perdido |
| Robôs de template (A/B) | `10122` (template `6624`), `10124` (template `6626`) |
| Robô de template reserva | `10130` (template `6652`) |
| Robô de texto livre (janela) | `10132` |
| Horário do disparo | 09h30 America/Sao_Paulo |
| Arquivo de registro | `claude/<cliente>-disparo-<AAAA-MM-DD>.md` |

## Acesso

Use o navegador interno com a sessão do Kommo já logada (aba da conta; se não houver, abrir `https://<conta>.kommo.com/leads/pipeline/<funil>/`). As chamadas de API rodam via `fetch` na própria aba, com a sessão do usuário. Resposta 401 significa sessão expirada: avise o Rael na hora para relogar e não tente contornar.

## Passo a passo

1. **Trava anti-duplicidade (sempre primeiro).** Liste as tarefas agendadas e confira se outra tarefa do mesmo disparo já rodou. Confira as estatísticas de lançamento dos robôs envolvidos e os eventos de mensagem enviada desde 5 minutos antes do horário previsto. Se já houve disparo em massa hoje para esse público, não dispare: só reporte o que saiu.
2. **Templates.** `GET /api/v4/chats/templates?with=reviews` e veja o status de aprovação de cada template dos robôs A/B e do reserva.
3. **Público.** Puxe os leads das etapas incluídas (`GET /api/v4/leads?filter[statuses][0][pipeline_id]=..&filter[statuses][0][status_id]=..`, paginando com `limit=250`). Remova duplicados e qualquer lead das etapas excluídas.
4. **Janela de 24h.** `GET /api/v4/events?filter[type]=incoming_chat_message&filter[created_at][from]=<agora-24h>` paginado. Lead do público com mensagem recebida nesse intervalo = grupo JANELA. O resto = grupo FORA.
5. **Grupo JANELA:** robô de texto livre.
6. **Grupo FORA, por ordem de preferência:**
   - os dois templates A/B aprovados: embaralhe a lista e divida metade para cada robô;
   - só um aprovado: todos nele;
   - nenhum A/B aprovado mas o reserva aprovado: robô reserva;
   - nada aprovado: avise o Rael e recheque a cada 10 min até o limite combinado; passado o limite, dispare só o grupo JANELA e diga claramente que o alcance ficou limitado.
7. **Disparo.** `POST /api/v2/salesbot/run` em lotes de 100, corpo `[{"bot_id": <id>, "entity_id": <lead_id>, "entity_type": 2}]`. Guarde a resposta de cada lote.
8. **Conferência.** Depois de alguns minutos, confira os eventos de mensagem enviada e as estatísticas dos robôs.
9. **Relatório.** Para o Rael: total do público, quantos em JANELA e em FORA, quantos foram por robô, falhas por lote. Grave o mesmo no arquivo de registro.

## Não fazer

- Não disparar sem passar pela trava do passo 1, mesmo que o horário já tenha passado.
- Não mover lead de etapa durante o disparo.
- Não reaproveitar lista de público de outro dia: sempre puxe na hora.
- Não criar nem editar robô ou template sem aprovação explícita do Rael.

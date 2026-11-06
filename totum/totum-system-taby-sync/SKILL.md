---
name: totum-system-taby-sync
description: Sincroniza as tarefas abertas do Israel (Rael) no Totum System para o Taby no Mac dele, em sentido único (Totum System para Taby), e entrega um resumo de prioridades do dia. Use quando o Rael pedir "sincronizar tarefas com o Taby", "revisar minhas tarefas do Totum System", "o que tenho pra hoje", "atualizar o Taby", ou em rotina agendada de revisão de tarefas.
---

# Totum System para Taby

Sentido único: **Totum System -> Taby**. Nunca escreva, altere ou apague nada no Totum System. Nunca apague tarefa do Taby.

## Requisitos

- Mac do Rael ligado com o app do Claude aberto.
- Script `~/Library/Application Support/totum-taby/fetch_israel.py`, que lê a chave da API no Keychain (serviço `totum-system-api`). Nunca peça, leia ou exponha a chave.
- Servidor MCP local `taby` (ferramentas `tasks_query`, `tasks_create`, `tasks_update`, `tasks_complete`).

## Passo a passo

1. **Ler o Totum System (somente leitura).** Pela ferramenta de AppleScript do Mac:
   `do shell script "/usr/bin/python3 \"$HOME/Library/Application Support/totum-taby/fetch_israel.py\""`
   Saída: `{"open": [{id, title, status, priority, task_type, due_date, description}], "closed_ids": [...]}`. Se falhar, relate o erro exato e pare.
2. **Ler o Taby.** `tasks_query` com `statuses ["open"]`, `limit 100`. Considere só as tarefas que têm na descrição a linha `totum_id: <uuid>`. Ignore as outras.
3. **Sincronizar.**
   - Aberta no Totum sem par no Taby: `tasks_create` com `title` igual ao do Totum; `dueAt = {localDate: due_date, localTime: "09:00", timeZone: "America/Sao_Paulo"}` (omita sem `due_date`); `description = "Prioridade: <priority> | Tipo: <task_type> | Status Totum: <status>\ntotum_id: <id>"`. Copie o id exatamente.
   - No Taby com `totum_id` em `closed_ids` ou ausente de `open`: `tasks_complete`.
   - Título ou `due_date` mudou no Totum: `tasks_update`, preservando a linha `totum_id`.
   - Taby indisponível ("Server taby unavailable" ou 401): não contorne. Avise que o Taby provavelmente reiniciou e trocou o token, e que o Rael precisa mandar URL e token novos para atualizar o `claude_desktop_config.json`.
4. **Resumo curto** (via SendUserMessage em execução agendada):
   - o que mudou na rodada (criadas, concluídas, atualizadas), ou uma linha dizendo que nada mudou;
   - total aberto, atrasadas, que vencem hoje e amanhã;
   - as 3 prioridades do momento: primeiro urgente/alta atrasadas, depois o que vence hoje.

"Hoje" é a data local de America/Sao_Paulo no momento da execução.

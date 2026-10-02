---
name: totum-n8n
description: "Regras da Totum para qualquer trabalho no n8n da Totum (n8n.grupototum.com): criar, editar, publicar, auditar ou depurar workflows, principalmente Kommo. Ler antes das skills n8n oficiais."
---

# Totum n8n: regras da casa

Esta skill é a camada Totum por cima do plugin oficial `n8n-skills` (n8n-io). Ela NÃO substitui as skills oficiais. Ordem de leitura em qualquer tarefa n8n:

1. Esta skill (regras e contexto Totum).
2. `using-n8n-skills-official` e as skills oficiais que ela indicar.
3. Skills Totum específicas, se o caso pedir: `totum-to-n8n-json` (Mapa de Microdecisões) e `kommo-n8n-oauth-troubleshoot` (erro de credencial Kommo).

Se uma regra daqui conflitar com a skill oficial, vale a regra daqui para segurança e operação, e vale a skill oficial para sintaxe e configuração de nós.

## Ambiente

- Instância: `https://n8n.grupototum.com`. MCP em `https://n8n.grupototum.com/mcp-server/http` (401 sem login é normal).
- Produção roda na VPS Nova (Hostinger, 2.24.206.161, panel.grupototum.cloud). O IP 187.127.4.140 é servidor antigo abandonado: ignorar.
- Deploy e serviços novos só pelo Coolify. Não usar PM2 manual, não criar painel paralelo, não usar Docker Compose + Caddy por fora (ignorar skills de self-hosting de pacotes da comunidade).
- Em qualquer URL interna, config ou HTTP Request apontando para a própria VPS: usar `127.0.0.1`, nunca `localhost` (bug recorrente de IPv6).
- Postgres local (127.0.0.1:5434) e Supabase self-hosted (supa.grupototum.com) são bancos diferentes. Não misturar nem migrar sem decisão explícita do Rael.
- O vault em `/home/totum/.pepper/` é do Sentinela. Não ler nem editar. Pedir a credencial necessária.
- Cada workflow precisa de "Available in MCP" ligado para ser lido pelo MCP. Se `get_workflow_details` falhar por acesso, pedir ao Rael para ligar essa opção; não tentar contornar.

## Segurança operacional (não negociável)

1. **Ler antes de mexer.** Sempre `get_workflow_details` do workflow e confirmar credenciais com `list_credentials` antes de qualquer alteração.
2. **Backup antes de editar.** Antes de `update_workflow` em workflow existente, garantir cópia: criar `BACKUP AAAA-MM-DD | <nome original>` inativo, ou confirmar que `get_workflow_history` guarda o estado atual. Registrar o `versionId` anterior na resposta.
3. **Validar antes de salvar e publicar.** `validate_workflow` antes de criar ou atualizar; `get_workflow_details` depois para conferir `connections`. Só publicar com OK do Rael.
4. **Workflow ativo é produção.** Nunca publicar, despublicar, ativar ou executar workflow com gatilho de produção sem confirmação explícita. Depois de publicar, acompanhar as execuções seguintes (`search_workflow_executions`) por alguns minutos.
5. **Nada destrutivo sem confirmação:** arquivar, apagar, sobrescrever, `rm -rf`, `docker system prune`, `git push --force`.
6. **Segredos só no sistema de credenciais do n8n.** Nunca em campo de texto, expressão, Code node, sticky note ou chat. Nunca repetir um token que apareça na conversa; avisar que ele pode ter sido exposto.
7. **Nunca simular execução.** Se a ferramenta não suporta a operação, dizer isso e parar.
8. **Config de produção fora do n8n** (openclaw.json e afins): backup com timestamp, editar em arquivo temporário, `jq empty` para validar, só então sobrescrever, e monitorar logs depois do restart.

## Kommo (padrões Totum)

- Community node: `n8n-nodes-kommo`. Preferir credencial **Kommo Long Lived Token API**. Erro de OAuth: usar `kommo-n8n-oauth-troubleshoot`.
- Auditoria é **somente GET**: nenhum create, update, delete, mover lead, mensagem ou Salesbot. Incluir `readOnly: true` e `mutationPerformed: false` no relatório e checar isso na revisão.
- Workflows de correção começam em **DRY RUN** e com `PRODUCAO BLOQUEADA` no nome até o Rael liberar.
- Paginação: a API v4 devolve no máximo 250 por página. HTTP Request com `page=1` fixo é incompleto; usar paginação do HTTP Request ou `Return All` do node Kommo, e checar `_links.next` no final.
- Filtros `created_at` e `updated_at` juntos funcionam como E: pegam só o que foi criado E atualizado no período. Deixar isso explícito ou usar um só.
- Com mais de um gatilho (manual e agendado), os dois precisam alimentar os mesmos nós. Senão cada execução cobre dados diferentes.
- Cliente Autoescola Popular (populargvcrm): a Júlia é o número de entrada do tráfego pago; nunca redistribuir lead só por mudança de pipeline ou etapa sem checar o responsável atual.

## Convenções

- Nomes: `<Cliente> | <Função> | <Estado>`, ex.: `Kommo Pop | Roteador Central | DRY RUN`. Backups: `BACKUP AAAA-MM-DD | <nome>`.
- Descrição do workflow explica o porquê e o que ele NÃO pode fazer.
- Relatório de auditoria precisa de saída real (Data Table, planilha, e-mail ou webhook interno). Resultado que só existe no log de execução se perde.
- Workflow em produção precisa de Error Workflow configurado (ver `n8n-error-handling-official`).

## Entrega

Ao terminar, responder em português direto, sem travessão, com: o que foi lido, o que mudou (IDs e versionId antes e depois), o que foi validado, o que ficou pendente de decisão do Rael, e uma sugestão de próximo passo.
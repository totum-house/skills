---
name: kommo-n8n-roteamento
description: Conecta Kommo ao n8n, audita a conta em modo somente leitura, monta o Roteador Central (DRY RUN antes de mutar), corrige Salesbot e automações de pipeline e ativa com testes e rollback. Usar para "auditar Kommo", "roteamento de leads", "lead redistribuído", "responsável errado", "Roteador Central", "Salesbot", "round-robin", "espelho vendedor", "duplicatas no Kommo" ou qualquer workflow n8n que leia ou altere leads Kommo.
---

# Kommo + n8n: conexão, auditoria e roteamento seguro

Playbook para levar uma conta Kommo do diagnóstico até um roteador de leads em produção, sem dupla distribuição e sem perder dono de lead.

**Regra central:** `responsible_user_id` é a fonte formal da verdade. O campo personalizado Vendedor é só espelho/fallback e nunca prova, sozinho, que um lead não tem dono.

## Antes de começar

1. Ler a skill `totum-n8n` (ambiente, backup, validação, confirmação antes de publicar).
2. Usar as skills oficiais `n8n-*-official` para montar e validar os workflows.
3. Credencial com erro de OAuth: skill `kommo-n8n-oauth-troubleshoot` (detalhes em `references/OAUTH-BUG.md`).
4. Ler `references/MAPA-NODE-KOMMO.md` para decidir entre node comunitário e HTTP Request.
5. Se existir perfil do cliente em `references/perfis/`, ler antes da Fase 0. Se não existir, criar um a partir de `references/perfis/_modelo.md` ao final da Fase 1.
6. Detalhes de API oficial, ponte MCP do n8n, deduplicação e arquitetura OpenWA/OpenClaw: `references/IMPLEMENTACAO-INTERNA.md`.

## Regras de segurança

- Backup/export antes de qualquer mutação.
- Nunca expor tokens, senhas, chaves ou dados sensíveis no chat, logs ou arquivos.
- Começar em modo somente leitura / DRY RUN. Workflows novos nascem inativos.
- Nunca rodar ao mesmo tempo o round-robin nativo da Kommo e o roteamento mutável do n8n.
- Nada de alteração em massa sem lista de candidatos, critérios de segurança e rollback.
- Não trocar o responsável quando existir exatamente um `responsible_user_id` formal ativo.
- Múltiplos responsáveis, divergências e mapeamentos ambíguos vão para revisão humana.
- Proteger leads ganhos, perdidos, contrato, suporte, alunos e pós-venda (lista exata no perfil do cliente).
- Salvar configuração não é prova. Reler o estado real e testar.

## Fase 0: delimitar o ambiente

Registrar: subdomínio Kommo, conta e usuário autenticado, URL do n8n, workflows existentes (IDs e estado), Salesbots e pipelines envolvidos, canais e números de entrada, objetivo e limites autorizados para mutação.

Confirmar acesso autenticado de verdade (`GET /api/v4/account` ou node Kommo → Account → Get info). Sem acesso, parar e informar o bloqueio. Nunca inventar resultado.

## Fase 1: preparar a Kommo

1. Exportar os Salesbots envolvidos.
2. Registrar pipelines, etapas, status e automações.
3. Listar usuários ativos e seus IDs.
4. Identificar o campo Vendedor: entidade, tipo e opções oficiais (`enum_id`).
5. Definir status e pipelines protegidos.
6. Documentar canais/números e o dono de cada um, sem inferir.
7. Fotografar o estado anterior com data, IDs e arquivos de backup.

Saída: export do Salesbot, automações registradas, usuários e IDs, campo Vendedor e `enum_id`, backup restaurável, perfil do cliente criado ou atualizado.

## Fase 2: preparar o n8n

Workflows separados, cada um com nome no padrão `<Cliente> | <Função> | <Estado>`:

1. **Auditoria** (somente leitura).
2. **Roteador Central | DRY RUN** (decide, não muta).
3. **Correção segura** (só aplica mudanças aprovadas, com lista de IDs).
4. **Roteador de produção** (eventos reais, regras idempotentes).

Credenciais só no gerenciador do n8n. Preferir Kommo Long Lived Token API. Para o que o node não cobre, HTTP Request com credencial Header Auth de nome claro (`Kommo - <Cliente> - Header`).

Checklist de conexão: leitura de usuários, contatos, leads e pipelines funcionando; paginação verificada (`_links.next`); nenhum segredo na saída.

## Fase 3: construir a auditoria

Coletar, **paginar até o fim** e normalizar: leads, contatos, responsáveis formais, usuários ativos, pipelines e etapas, campo Vendedor, status e tags relevantes, origem/canal.

Cuidados que já causaram erro:
- Todos os gatilhos (manual e agendado) precisam alimentar os mesmos nós.
- `created_at` + `updated_at` juntos filtram com E. Usar só um, ou deixar explícito.
- Endpoint com `page=1` fixo é amostra, não auditoria.
- O relatório precisa de destino real (Data Table, planilha ou arquivo). Log de execução não é destino.

Para cada lead calcular: responsável formal válido, quantidade de responsáveis, Vendedor atual, correspondência responsável x Vendedor, pipeline/etapa, proteção aplicável, ação recomendada.

Classificações mínimas:

| Classe | Significado |
|---|---|
| `CORRECT` | Um dono formal ativo e Vendedor coerente |
| `SAFE_SELLER_MIRROR` | Um dono formal ativo, Vendedor vazio ou divergente com mapeamento inequívoco |
| `CONFLICT_REVIEW` | Divergência relevante ou múltiplos responsáveis |
| `PROTECTED_PRESERVE` | Status ou pipeline protegido |
| `UNMAPPED_USER` | Responsável sem correspondência no mapa de usuários/Vendedor |
| `NO_FORMAL_OWNER` | Sem `responsible_user_id` válido |

Relatório sem credenciais, com `readOnly: true`, `mutationPerformed: false`, totais reais e amostras só quando permitido.

## Fase 4: Roteador Central

Webhook recebe, quando disponível: telefone normalizado, número receptor, conversa, `messageId` (chave idempotente), contato e lead.

Processamento obrigatório:
1. normalizar telefone (DDI 55, 10 ou 11 dígitos);
2. localizar o contato;
3. buscar todos os leads relacionados em todos os pipelines relevantes;
4. ler `responsible_user_id`;
5. confirmar se o responsável está ativo;
6. checar proteção por pipeline/status/etapa;
7. consultar o mapa de canal direto só se não houver dono formal;
8. retornar uma decisão única e auditável;
9. bloquear reprocessamento do mesmo `messageId` (Data Table, ver `n8n-data-tables-official`).

### Decisões

| Decisão | Quando | Ação |
|---|---|---|
| `PRESERVE_FORMAL_OWNER` | Exatamente um dono formal ativo | Preservar dono, pipeline e etapa. Sem round-robin. Espelhar Vendedor só se vazio e inequívoco |
| `PROTECTED_PRESERVE` | Ganho, perdido, contrato, suporte, aluno, pós-venda | Não alterar nada, não distribuir |
| `CONFLICT_REVIEW` | Múltiplos responsáveis ou divergência | Não corrigir, não distribuir, registrar exceção |
| `ASSIGN_DIRECT_CHANNEL_OWNER` | Sem dono formal e canal direto mapeado | Atribuir dono do canal, depois pipeline/etapa, espelhar Vendedor |
| `NEW_DISTRIBUTION_CANDIDATE` | Sem dono, sem proteção, sem canal inequívoco | Distribuir uma vez, gravar dono antes de mover pipeline, espelhar Vendedor, registrar chave idempotente |
| `REVIEW_SELLER_FALLBACK` | Informação insuficiente | Não redistribuir, enviar para revisão |

No DRY RUN, a decisão é só registrada. A mutação (node Kommo → Leads → Update) fica atrás de uma chave explícita (`DRY_RUN=false`) que só o Rael libera.

## Fase 5: corrigir o Salesbot

Backup e reescrita para:

```text
talk.status = opened
→ webhook do Roteador Central
→ aguardar decisão
→ preservar, proteger, revisar ou distribuir
```

Remover qualquer regra que trate Vendedor vazio como ausência de dono. Desativar round-robin concorrente. Nenhuma troca de responsável ou pipeline antes da decisão. Se o Salesbot não consegue ler `responsible_user_id`, a decisão fica no n8n. Publicar e reler a versão publicada.

## Fase 6: automações dos pipelines

Em cada pipeline de vendedor: remover redistribuição disparada só por entrada ou mudança de etapa; parar de inferir dono pelo pipeline; manter só o espelhamento do dono formal em Vendedor; preservar conflitos; proteger status sensíveis. Centralizar o mapa `responsible_user_id → pipeline + etapa` no n8n.

## Fase 7: ativação controlada

Ordem: backup → auditoria DRY RUN → teste do roteador sem mutação → desligar round-robin antigo → publicar Salesbot protegido → publicar automações corrigidas → confirmar ausência de segunda distribuição → ligar mutações do n8n (com OK do Rael) → testes controlados → monitoramento e rollback.

## Fase 8: testes obrigatórios

Registrar antes e depois (`responsible_user_id`, pipeline, etapa, Vendedor, número de atribuições, classificação, idempotência, logs sem segredo) para:

1. cliente com dono volta pelo número de entrada;
2. cliente com dono responde a novo anúncio;
3. lead novo pelo número de entrada;
4. lead sem dono fala pelo canal direto de um vendedor;
5. lead com dono fala com outro vendedor;
6. múltiplos responsáveis / conflito;
7. lead protegido (pós-venda, ganho, perdido, contrato, suporte);
8. mesma mensagem reenviada.

Nomes de números e vendedores vêm do perfil do cliente.

## Fase 9: rollback

Manter: export original e publicado do Salesbot, JSON dos workflows antes e depois (ou `versionId`), relatório de mutações, lista de IDs alterados, procedimento para desligar o roteador mutável e restaurar Salesbot e automações.

Se aparecer dupla atribuição, troca indevida de dono ou protegido movido:
1. desligar o roteador mutável;
2. preservar o estado para investigação;
3. restaurar só com lista de alterações conhecida;
4. rodar auditoria em DRY RUN de novo;
5. nunca corrigir em massa no escuro.

## Relatório final

1. acesso e escopo verificados;
2. backups e IDs;
3. workflows criados/alterados e estado;
4. Salesbot publicado e mudanças;
5. pipelines e automações alterados;
6. totais da auditoria por classificação;
7. tabela dos 8 testes;
8. mutações efetivas;
9. evidência de ausência de dupla distribuição;
10. rollback;
11. riscos e pendências.

Nunca dizer "concluído" só porque um workflow foi criado, um arquivo exportado ou um DRY RUN executado. Conclusão exige publicação, testes e verificação direta no ambiente real.

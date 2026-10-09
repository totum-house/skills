# Mapa: node comunitário Kommo x HTTP Request

Node: `n8n-nodes-kommo` (autor yatolstoy), instalado na instância Totum. Levantado pela tela do node em 16/09/2026: 22 ações.

## O que o node faz

| Recurso | Ações | Risco |
|---|---|---|
| Account | Get account info | Leitura |
| Companies | Get list, Create, Update | Create/Update mutam |
| Contacts | Get list, Create, Update | Create/Update mutam |
| Leads | Get list, Create, Update | **Update troca `responsible_user_id`, pipeline e etapa** |
| Lists (catálogos) | Get lists, Get elements, Add lists, Add elements, Edit lists, Edit elements | Add/Edit mutam |
| Notes | Get list, Create, Update | Create/Update mutam |
| Tasks | Get list, Create, Update | Create/Update mutam |

Não existe ação de apagar. Isso reduz risco, mas não torna o node seguro: Update é a mutação mais sensível do roteamento.

Credenciais: preferir **Kommo Long Lived Token API**. A OAuth2 do node tem bug conhecido (ver `OAUTH-BUG.md`).

## O que o node NÃO faz (usar HTTP Request)

Base: `https://<subdominio>.kommo.com/api/v4`. Credencial Header Auth com nome claro. Confirmar cada endpoint na documentação oficial antes de usar em produção.

| Necessidade | Endpoint (API v4) |
|---|---|
| Pipelines e etapas | `GET /leads/pipelines` |
| Usuários | `GET /users` |
| Campos personalizados (definição e `enum_id`) | `GET /leads/custom_fields`, `GET /contacts/custom_fields` |
| Eventos (histórico de troca de dono/etapa) | `GET /events` com `filter[created_at][from]` e `filter[type]` |
| Fontes | `GET /sources` |
| Webhooks | `GET /webhooks` |
| Tags | `GET /leads/tags`, `GET /contacts/tags` |
| Leads não classificados | `GET /leads/unsorted` |
| Salesbot, chats | Só métodos oficialmente documentados. Não usar endpoints internos da interface |

## Paginação

- `limit` máximo 250.
- Seguir `_links.next.href` até acabar. Usar a paginação do próprio HTTP Request (ver `n8n-loops-official`), nunca `page=1` fixo.
- No node, usar `Return All`.
- Respeitar limite de requisições da Kommo (poucas por segundo): usar lotes com espera em volumes grandes.

## Pontos a testar antes de confiar

- **Busca de lead/contato por telefone:** o node tem filtro `query` em leads e contatos. Confirmar em teste real se a busca encontra telefone em formatos diferentes (com e sem 55, com e sem 9). Se não encontrar, usar `GET /contacts?query=<telefone>` e normalizar dos dois lados.
- **Contatos vinculados ao lead:** confirmar se o Get list de leads traz `_embedded.contacts` (parâmetro `with=contacts` na API).
- **Filtro de datas:** `created_at` e `updated_at` juntos funcionam como E.

# Protocolo do Barramento — Referência para Superchat Totum

Use este arquivo apenas quando o sistema inbox/outbox Totum estiver ativo no contexto do chat.

## Estrutura do Correio

Cada agente tem:
- `_MENSAGENS/<ID>/inbox.md` — mensagens recebidas
- `_MENSAGENS/<ID>/outbox.md` — mensagens enviadas
- `_MENSAGENS/log.md` — registro central append-only

## Agentes do Sistema

| Emoji | Agente | ID |
|-------|--------|----|
| 🧠 | Arquiteto (Maestro) | ARQUITETO |
| 🪶 | Engenheiro de Prompt | ENGENHEIRO_PROMPT |
| 🔍 | Pesquisador | PESQUISADOR |
| 🔄 | Tradutor | TRADUTOR |
| ✍️ | Copywriter | COPYWRITER |
| 💬 | SDR | SDR |
| 🖼️ | Preview | PREVIEW |
| ⚙️ | Operações | OPERACOES |
| 🔌 | Infraestrutura | INFRA |
| 💡 | Ideias | IDEIAS |

## Envelope Padrão

```
### MSG-<REMETENTE>-AAAAMMDD-HHMM | AAAA-MM-DD HH:MM
DE: <ID>
PARA: <ID>
ASSUNTO: <uma linha>
PRIORIDADE: alta | media | baixa
STATUS: novo
RESPONDE-A: <ID da MSG ou —>
---
<corpo>
---
```

## Regra de Envio (sempre 3 arquivos)

1. Anexar no fim de `_MENSAGENS/<DESTINO>/inbox.md`
2. Anexar no fim de `_MENSAGENS/<REMETENTE>/outbox.md`
3. Anexar no fim de `_MENSAGENS/log.md`

## Handoff via Correio

Quando o Superchat gera um handoff com o correio ativo, o envelope vai sempre para o **ARQUITETO** como destinatário padrão, com cópia no outbox do agente atual e no log. O assunto padrão é `Handoff — continuidade de chat | [tema]`.

---
name: totum-to-n8n-json
description: Converte um Mapa de Microdecisões Totum (anúncio, carrossel, conteúdo, análise) em um workflow JSON importável no n8n, com checkpoints humanos como nós Form e loops de "refazer". Use quando o usuário pedir "gerar JSON do n8n", "montar o workflow no n8n", "transformar o mapa de microdecisões em fluxo", ou mencionar n8n + agente de design Totum.
versao: 1.0
data: 2026-06-20
status: rascunho
---

# Skill: Totum → n8n JSON

Gera workflows n8n a partir de um **Mapa de Microdecisões** (formato `Mapa_Microdecisoes_*.md`). Cada linha do mapa vira um nó; cada checkpoint ⏸️ vira uma parada humana.

## Regra de tradução (microdecisão → nó n8n)

| Tipo de microdecisão | Quem | Nó n8n | Observação |
|:--|:--|:--|:--|
| Entrada de briefing (cliente, mensagem, objetivo) | 👤 | `formTrigger` | 1 só, no início; cada campo = um field |
| Carregar config do cliente | ⚙️ | `set` (ou `httpRequest`/`readFile`) | injeta DS, paleta, KV |
| Passo de IA (sweep, direção, copy) | 🤖 | `@n8n/n8n-nodes-langchain.chainLlm` ou `agent` | placeholder `noOp` no esqueleto, troca depois |
| **Checkpoint** (aprovar/escolher/refazer) | ⏸️ 👤 | `form` (page) + `if` | Form mostra a proposta; If roteia "Refazer" de volta |
| Regra automática (contraste, ≤10% acidente) | ⚙️ | `if` ou validação no `code` | bloqueante = If que barra; alerta = Set flag |
| Montagem do output final | ⚙️ | `code` | concatena JSON canônico + prompt do motor |
| Exportar | 👤 | `form` (completion) | entrega prompt/JSON ao operador |

## Padrão do Checkpoint (o coração do sistema)

Todo ⏸️ segue este trio:

```
[🤖 nó de IA] → [⏸️ Form: mostra proposta + dropdown Aprovar/Refazer] → [IF Refazer?]
                                                                          ├─ true  → volta ao nó de IA
                                                                          └─ false → segue adiante
```

Isso entrega o "dar play por etapa e mandar refazer" sem refazer tudo.

## Convenções

- **Nome do nó:** prefixe com o símbolo do decisor — `👤`, `🤖`, `⚙️`, `⏸️` — pra leitura visual no canvas.
- **Sticky Notes** (`n8n-nodes-base.stickyNote`) documentam cada Estágio (A–E).
- **typeVersion:** use valores estáveis; se o import reclamar, reabra o nó e o n8n recria com a versão da instância.
- **Placeholders de IA:** entregue como `noOp` nomeado. O operador troca por `AI Agent`/`Basic LLM Chain` com as credenciais dele. Isso garante import limpo.
- **Credenciais:** nunca embutir. O operador conecta OpenAI/HTTP na instância.

## Esqueleto mínimo (estrutura do arquivo)

```json
{
  "name": "...",
  "nodes": [ /* formTrigger, set, noOp(IA), form(checkpoint), if(redo), code, form(export), stickyNotes */ ],
  "connections": { /* sequência + loops de refazer */ },
  "settings": { "executionOrder": "v1" },
  "pinData": {},
  "meta": {}
}
```

## Checklist de geração

- [ ] 1 `formTrigger` cobrindo todas as entradas 👤 do Estágio A/B
- [ ] cada ⏸️ do mapa virou `form` + `if`
- [ ] pelo menos 1 loop de "Refazer" wired como template
- [ ] regras ⚙️ bloqueantes viraram `if` que barra
- [ ] nó `code` final montando o prompt do motor escolhido
- [ ] `form` de exportação no fim
- [ ] sticky notes por estágio
- [ ] nenhuma credencial embutida

## Limitações conhecidas (FATO)

- JSON na mão é sensível a versão de nó; nós de IA e Form podem precisar de reconfiguração rápida pós-import.
- Loops de refazer com Form exigem teste na instância (comportamento de wait/resume varia por versão do n8n).

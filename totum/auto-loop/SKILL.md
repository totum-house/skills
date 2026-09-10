---
name: auto-loop
description: Executor de loops autônomos do Totum OS (loop engineering). Use SEMPRE que o usuário quiser montar, rodar ou versionar um loop autônomo — "auto-loop", "montar um loop", "loop autônomo", "automatizar tarefa recorrente", "loop engineering", "self-guided", "o agente se dispara sozinho", ou quando pedir para transformar uma rotina recorrente e verificável em execução automática. NÃO usar para pedido único, tarefa que exige julgamento humano a cada passo, ou quando não há critério objetivo de sucesso — nesses casos use orquestrar-totum ou execução manual. Esta skill é dona só do CICLO DE VIDA do loop; a descoberta de skills é delegada à orquestrar-totum.
---

# auto-loop — Executor de Loops Autônomos

Você opera o **último degrau** da escada (prompt → context → harness → loop). Sua função é rodar um loop **auto-disparado, auto-verificado e reversível** — não descobrir skills (isso é da `orquestrar-totum`).

Fonte canônica das regras: `Alexandria/LOOP_ENGINEERING.md`. Em conflito, o protocolo vence.

---

## Passo 0 — Gate Anti-Slop (OBRIGATÓRIO, antes de tudo)

Responda **sim a todas**. Qualquer "não" → **aborte o loop** e diga por quê:

- [ ] **Recorrência** — vai acontecer de novo? (uma vez ≠ loop)
- [ ] **Verificabilidade** — existe critério objetivo que um subagente checa?
- [ ] **ROI de token** — rodar o loop custa menos que o trabalho manual poupado?
- [ ] **Reversibilidade** — as ações são 🟢/🟡, ou há gate humano nas 🟠/🔴?
- [ ] **Minimalismo (ponytail)** — já não existe skill/loop que faça isso? Dá com menos?

> Sem os 5, não é loop. Volte para `orquestrar-totum` (harness) ou execução manual.

---

## Passo 1 — Delegar descoberta à orquestrar-totum

Não reimplemente roteamento. Acione a **Fase -1 da `orquestrar-totum`** para mapear intenções → skills. Traga de volta: skills a usar, sequência, gates.

---

## Passo 2 — Montar os 6 ingredientes

Declare explicitamente cada um antes de rodar. Faltou um → o loop é frágil, pare.

1. **Automation** — como dispara? (scheduled task / cron / webhook n8n)
2. **Worktree** — isolamento? (`git worktree` / branch por tarefa)
3. **Skills** — quais? (vindas do Passo 1)
4. **Connectors** — quais dados/sistemas? (MCP: Supabase, GitHub, Meta, Kommo)
5. **Subagents** — quem verifica o resultado?
6. **State** — onde grava memória entre execuções? (`CLAUDE.md` / `totum-state.md` / Alexandria)

---

## Passo 3 — Executar dentro da Matriz de Autonomia

Para cada ação, classifique e obedeça:

- 🟢 **Segue sozinho** — ler, testar, formatar, lint, buscar dados.
- 🟡 **Só informa** — branch, rascunho, PR sem merge, variação.
- 🟠 **Precisa aprovar** — merge em produção, deploy, gasto acima do teto, mudança de schema. → **pausa e chama humano**.
- 🔴 **Nunca sozinho** — apagar banco, migrar produção direto, DNS, RLS/Auth/Storage, expor chave. → **bloqueado sempre**.

---

## Passo 4 — Verificar (subagente)

Antes de fechar uma iteração, um subagente confere o resultado contra o critério do Passo 0. Falhou → corrige ou reporta; não avance com output quebrado.

---

## Passo 5 — Gravar state e decidir

Grave o que mudou no state. Então:

- Critério atingido → **encerra** e reporta.
- Ainda não → **repete** do Passo 2 (ou 3, se ingredientes iguais).
- Ação 🟠/🔴 pendente → **pausa** e devolve ao humano com o diff.

---

## Escolha de modelo por horizonte

- Trivial/curto → Haiku/Sonnet (loop nele é desperdício).
- Longo/dias/multi-etapa/auto-verificável → **Claude Fable 5**.

---

## Encerramento (sempre)

```
## ✅ auto-loop — Resumo
Loop: [nome]
Disparo: [automation]
Iterações: [N]
Ações 🟢/🟡 executadas: [...]
Pendências 🟠/🔴 p/ humano: [...]
State gravado em: [caminho]
Próxima ação sugerida: [1 linha]
```

Regra final: todo loop deve ser reusável no upixel/BuildOps sem reconstrução.

---
name: "agent-criator"
description: "Checklist completo para criar agentes Totum OS padronizados — identidade, memória, validação, tools, integração."
---

# Agent Criator — Skill de Criação Padronizada de Agentes Totum OS

## Quando usar
Sempre que for criar um agente novo no Totum OS. Sem exceção.  
Também usar para auditar agentes existentes que possam estar incompletos.

---

## FASE 1 — Definição (antes de criar qualquer arquivo)

Responda estas perguntas antes de começar:

```
1. Qual o nome/persona do agente? (ex: Amanda, Jarvis, Kleber)
2. Qual o agentId técnico? (slug lowercase, sem espaço: amanda, jarvis, paulo)
3. Qual o domínio exclusivo? (o que SÓ esse agente faz)
4. Qual o trigger de delegação no AGENTS.md da Pepper?
5. Quem é o "não faça isso" do agente? (o que está fora do escopo)
6. Qual a referência cultural/canônica? (ex: Jarvis = Iron Man, Saul = Better Call Saul)
```

Se alguma resposta estiver vaga, resolva antes de criar os arquivos.

---

## FASE 2 — Estrutura de arquivos obrigatória

Criar estes arquivos em `/root/.openclaw/workspace-<agentId>/`:

### 2.1 IDENTITY.md
```markdown
# IDENTITY.md

- **Name:** <Nome completo>
- **Nickname:** <Como chamar>
- **Function:** <1 linha clara>
- **Creature:** <referência cultural>
- **Vibe:** <3 adjetivos>
- **Emoji:** <emoji característico>
```

### 2.2 SOUL.md
Estrutura obrigatória (nesta ordem):

```markdown
# SOUL.md — <Nome> (<Cargo>)

## Quem sou
[1 parágrafo. Quem é, o que faz, referência canônica se houver]

## Domínio e responsabilidades
[Lista do que é território deste agente]

## Stack / Ferramentas sob responsabilidade
[Tecnologias, serviços, sistemas que este agente conhece e opera]

## Como entrego pra Pepper
[Formato de output: estrutura, tamanho, flags obrigatórias]

## Como entrego direto pra Rael
[Tom e formato quando fala diretamente com o usuário]

## Protocolo de Validação (OBRIGATÓRIO — copiar exato abaixo)
[Ver seção 2.3]

## Anti-patterns
[O que NUNCA fazer — lista com ❌]

## Separação de responsabilidades (vs outros agentes)
[Tabela: Eu | Outro agente — evita sobreposição]

## Tom de voz
[Exemplos de ❌ e ✅]

## Memória (save-on-output)
[Quando usar memory_put e memory_search — ver seção 2.4]
```

### 2.3 Protocolo de Validação (copiar no SOUL.md de TODO agente)

Para agentes de código/infra (Kleber, Jarvis):
```
## Protocolo de Validação (obrigatório antes de toda entrega)

V1: [Critério técnico específico do domínio]
V2: Atende EXATAMENTE o pedido? (não "em parte", não "quase")
V3: Tem efeito colateral não declarado?
V4: Tem anti-pattern do SOUL.md?
V5: Se destrutivo: tem .bak e rollback declarado?

Resultado:
- Todos ✅ → entrega com [✅ VALIDATED]
- Algum ❌ → refaz. Até 3 tentativas.
- Na 3ª sem PASS → entrega com [⚠️ NEEDS_REVIEW] + lista o que falhou
```

Para agentes de conteúdo/processo (Tigrinha, Amanda, Saul, Juliana, Hermione):
```
## Protocolo de Validação (obrigatório antes de toda entrega)

V1: O output atende EXATAMENTE o pedido? (não "em parte")
V2: Tom e voz estão corretos para o canal/persona?
V3: Tem informação inventada ou não verificada?
V4: Tem anti-pattern do SOUL.md?
V5: Juiz Interno P1 e P2 passaram?

Resultado:
- Todos ✅ → entrega com [✅ VALIDATED]
- Algum ❌ → refaz. Até 3 tentativas.
- Na 3ª sem PASS → entrega com [⚠️ NEEDS_REVIEW] + lista o que falhou
```

### 2.4 Bloco de Memória (copiar no SOUL.md de TODO agente)
```markdown
## Memória (save-on-output)

Tenho acesso ao tool `memory_put` e `memory_search` via MCP `memory-v2`.

**Quando usar `memory_put` ao final da entrega:**
- Quando resolvo problema validado pelo Rael → salvo como `pattern`
- Quando identifico anti-pattern que falhou → salvo como `lesson`
- Quando Rael confirma preferência de abordagem → salvo como `preference`
- Quando Pepper sinaliza "lembra disso" → salvo obrigatoriamente

**Parâmetros padrão:**
- `agent_id`: `<agentId>`
- `user_id`: `rael`
- `visibility`: `agent_private` para padrões técnicos / `private_user` para preferências do Rael
- `importance`: [5-8 para domínios não-críticos / 6-9 para infra]
- `confidence`: 0.9 para soluções validadas, 0.65 para inferidas

**Quando usar `memory_search` no início do task:**
- Quando a task envolve área que pode ter histórico de decisão

**Não salvo:** outputs temporários, variantes descartadas, logs de debug.
```

### 2.5 MEMORY.md
```markdown
# MEMORY.md — <Nome>

Memória persistente. Lido no boot.

## Decisões de domínio
[Decisões D-XXX relevantes para este agente]

## Padrões validados
[O que funcionou — patterns confirmados por Rael]

## Anti-patterns confirmados
[O que não funciona — lessons do passado]
```

### 2.6 AGENTS.md
Usar o template padrão do OpenClaw. Adicionar no final:

```markdown
## graphify
[Bloco padrão se agente lida com código]

## Spec Kit
[Bloco padrão se agente cria ou planeja código]
```

### 2.7 TOOLS.md
```markdown
# TOOLS.md — <Nome>

## Acesso a sistemas
[Lista de sistemas, URLs, credenciais de referência]

## Skills instaladas
[Skills disponíveis para este agente]

## Restrições de acesso
[O que este agente NÃO pode acessar]
```

---

## FASE 3 — Configuração no OpenClaw

### 3.1 Registrar no gateway
Verificar se o agentId está configurado em `/root/.openclaw/agents/<agentId>/`.

### 3.2 Atualizar AGENTS.md da Pepper
Adicionar nova linha na tabela de delegação:
```
| `<agentId>` | **<Nome> — <Cargo>** | <Domínio> | <Quando usar> |
```

Adicionar no bloco de roteamento:
```
- <Domínio do agente> → `<agentId>`
```

### 3.3 Atualizar SOUL.md da Pepper
Espelhar a regra de roteamento no bloco de delegação.

---

## FASE 4 — Ferramentas obrigatórias

Instalar/verificar em TODOS os agentes novos:

### 4.1 TencentDB Memory (memória hierárquica L0→L3)
- Verificar se está ativo no slot `plugins.slots.memory` do gateway
- Adicionar bloco de memória no SOUL.md (seção 2.4)

### 4.2 Graphify (apenas agentes que lidam com código/docs)
```bash
# Verificar se graphify está instalado
graphify --version

# Gerar grafo no workspace do agente
cd /root/.openclaw/workspace-<agentId>/<repo>
graphify .

# Adicionar bloco no AGENTS.md do agente
```
Bloco padrão para AGENTS.md:
```markdown
## graphify
This project has a knowledge graph at graphify-out/.
- For codebase questions: `graphify query "<question>"`
- For relationships: `graphify path "<A>" "<B>"`
- For focused concepts: `graphify explain "<concept>"`
- After modifying code: `graphify update .`
```

### 4.3 Spec Kit (apenas agentes que criam/planejam código)
```bash
export PATH="$HOME/.local/bin:$PATH"
specify init /root/.openclaw/workspace-<agentId>/<repo> --integration claude --force
```
Adicionar bloco no AGENTS.md:
```markdown
## Spec Kit
Antes de implementar qualquer feature nova:
1. /speckit-specify — especificação
2. /speckit-clarify — eliminar ambiguidade
3. /speckit-plan — arquitetura
4. /speckit-tasks — tarefas ordenadas
5. /speckit-implement — execução
Regra: nunca começar código sem spec.
```

---

## FASE 5 — Verificação final (checklist de entrega)

Antes de declarar o agente pronto:

```
[ ] IDENTITY.md criado com todos os campos
[ ] SOUL.md criado com: quem sou, domínio, stack, como entrego, protocolo de validação, anti-patterns, separação de responsabilidades, tom, memória
[ ] MEMORY.md criado
[ ] AGENTS.md do agente configurado
[ ] TOOLS.md criado
[ ] Tabela de delegação da Pepper atualizada (AGENTS.md + SOUL.md)
[ ] TencentDB: bloco de memória no SOUL.md
[ ] Graphify: instalado e grafo gerado (se domínio técnico)
[ ] Spec Kit: inicializado nos repos (se agente cria código)
[ ] Protocolo de validação no SOUL.md
[ ] Teste: enviar task simples pro agente e verificar formato de resposta
```

---

## Notas de manutenção

Esta skill deve ser atualizada toda vez que um novo padrão for adotado no Totum OS.
Responsável: Pepper (agentId `main`).
Última revisão: 2026-07-13.

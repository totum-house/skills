---
name: totum-buildops-orchestrator
description: >-
  Forja (ex-BuildOps): regras de construção, adequação, correção, teste e
  manutenção de projetos digitais da Totum (LP, LP Express, site, sistema,
  automação n8n/Kommo). Diz qual POP-014 se aplica, qual gate de qualidade
  rodar pelo tamanho da mudança (P/M/G), o que é obrigatório por tipo de
  projeto, as no-fly zones e quem aprova. Use SEMPRE ao começar ou retomar
  trabalho técnico de cliente ou interno da Totum: "forja", "buildops",
  "adequar sistema", "adequação", "criar LP", "LP express", "site novo",
  "sistema novo", "corrigir bug em produção", "manutenção", "qual POP",
  "qual gate", "posso fazer merge", "pode subir?". NÃO usar para conteúdo,
  social media, tráfego ou POPs departamentais (fora do escopo da Forja).
version: 1.1.0
author: Rael + Claude (revisão Forja 2026-11-06)
license: MIT
metadata:
  hermes:
    tags: [totum, forja, buildops, pop-014, adr, sla, quality-gate]
    related_skills: [dev-totum, verificar-totum, revisao-totum, soul-totum, karpathy-guidelines, totum-blueprint, totum-lp-copy, go-live, zion-lab-pop-sites, kommo-n8n-roteamento, n8n-workflow-automation, auto-loop, superchat-totum]
---

# Forja Totum (v1.1)

A Forja é o jeito Totum de construir e manter projetos digitais. Ela se apoia
em três peças: **ADR** (por que decidimos), **POP-014 A a E** (como fazer) e
**SLA** (quando e com que qualidade). Task sem SLA é task incompleta.

Esta skill **não executa código**. Ela diz qual regra vale. A execução é da
`dev-totum` (pipeline com dois portões) e a checagem final é da
`verificar-totum`.

> Fonte de verdade das normas: pasta BuildOps no Google Drive (`docs/decisoes-arquiteturais.md`,
> `docs/principios-buildops.md`, `POP-014-A..E`). Se esta skill e o ADR divergirem,
> **o ADR vence** e esta skill precisa ser corrigida.

---

## 0. Decisões vigentes do Rael (2026-11-06)

Valem acima de qualquer texto antigo de POP ou playbook.

| Tema | Decisão |
|---|---|
| Nome | O sistema se chama **Forja** (D-033). "BuildOps" é nome antigo. |
| Supabase em **adequação** | **Respeitar o que já existe.** Projeto em Cloud continua em Cloud, projeto self-hosted continua self-hosted. Migrar não faz parte de adequação; se for necessário, vira projeto separado aprovado pelo Rael. |
| Supabase em projeto novo | Padrão a confirmar com o Rael (D-016 diz Cloud, princípio 2 diz self-hosted). Até lá, perguntar antes de criar. |
| Dados pessoais e IA | **Pode enviar dados pessoais a modelos via API** quando a tarefa precisar. Depois do uso: apagar dados de teste, exports e logs com dado pessoal, e rotacionar qualquer chave ou token que tenha sido exposto. Credencial nunca vai em prompt (isso continua proibido). |
| Substituto de decisão | **Kleber** decide quando o Rael estiver indisponível. |
| Ferramenta de tasks | **Totum System** (projeto interno) é a ferramenta oficial. Toda task técnica (issue, PR, spec) carrega o ID da task do Totum System. |
| Pagamento | **Sinal antes de começar** + **aprovação do visual** como marco. Backend e integrações só começam depois do visual aprovado (Visual-First, D-033). |
| Escopo | A Forja cobre só os POP-014 A a E. POPs departamentais (comercial, tráfego, ADM etc.) ficam fora desta skill. |
| LP Express | Produto separado, com fluxo próprio (seção 4). |

---

## 1. Qual POP-014 abre

| Situação | POP | Tag |
|---|---|---|
| Projeto novo (LP, site, sistema, automação nova) | POP-014-A Construir | `[construir]` |
| Melhorar, refatorar ou adequar algo que já existe, sem ser bug | POP-014-B Adequar | `[adequar]` |
| Algo quebrou ou está errado em produção ou homologação | POP-014-C Corrigir | `[corrigir]` |
| Validar antes de merge, deploy ou release | POP-014-D Testar | `[testar]` |
| Rotina: backup, custo, atualização, segurança recorrente | POP-014-E Manter | `[manter]` |

Ambíguo? Uma pergunta ao usuário: "é novo, fix, adequação, teste ou manutenção?"

---

## 2. Tamanho da mudança e gate (P/M/G)

O tamanho sai do **Passo 0 da `dev-totum`**. A Forja só traduz:

| dev-totum | Forja |
|---|---|
| trivial ou pequeno | **P** |
| padrão | **M** |
| grande | **G** |

**Sobe para G sempre** que tocar: schema ou migration, RLS, auth, Storage,
dinheiro, integração externa nova, credencial, infra (Coolify, DNS, Traefik),
ou estimativa acima de 5 dias. **G nunca é rebaixado.**

Regras de classificação:
- Na dúvida entre P e M, vale **M**.
- Mudanças da mesma task na mesma área, dentro de 7 dias, **somam linhas** (proibido fatiar uma mudança grande em vários P).
- Declare o tamanho em uma linha antes de começar: `Forja: [adequar] tamanho M (3 arquivos, sem área sensível).`

### Matriz de gates

| Gate | P | M | G |
|---|---|---|---|
| PR (nunca push direto em main), build, lint, typecheck, secret scan | sim | sim | sim |
| Semgrep padrão | sim | sim | sim |
| Auditoria de dependências (bloqueia crítico e alto) | não | sim | sim |
| Teste de regressão em bug de lógica | sim | sim | sim |
| Teste antes do código em área sensível (D-027: dinheiro, schema, auth, integração) | n/a | se tocar área sensível | sim |
| Cobertura numérica | não | não | só nos módulos sensíveis, com catraca (não pode cair) |
| Preview (Vercel ou Coolify) + screenshot por rota nova no PR (D-033) | recomendado | sim | sim |
| Lighthouse CI com limites D-029 (Performance ≥ 90, LCP < 2,5 s, CLS < 0,1, TBT < 200 ms), com tags de produção ligadas, mediana de 3 rodadas | em entrega web | em entrega web | em entrega web |
| Spec (D-025) | não | 1 página | Spec Kit completo |
| Revisão humana | autor humano: merge automático com CI verde. Autor agente: Rael ou Kleber conferem em até 24h úteis | Rael ou Kleber | Kleber e Rael (+ Sentinela se RLS, auth ou credencial) |
| Rollback declarado no PR | não | recomendado | sim |
| Migration testada numa cópia do backup antes de produção | n/a | n/a | sim, se houver migration |
| Smoke test pós-deploy + observação (Sentry, uptime) | recomendado | 30 min | 60 min |

Fora do pipeline (não exigir): canário por % de tráfego, blue-green, cobertura
de 80% global, revisão de arquitetura por IA como gate, Kimi Claw, Datadog,
Elastic Stack. Revisão por IA (Claude Code Action) é **consultiva**.

Serviços da VPS em Docker Compose (n8n, Chatwoot etc.) não têm rolling update
no Coolify: deploy em janela combinada, com backup verificado e rollback declarado.

---

## 3. No-fly zones

Valem para gente e para agente. O que dá para automatizar vira branch
protection, permissão negada ou hook; o texto só lembra.

| Zona | Regra |
|---|---|
| Produção | Nada de push direto em main. Sempre branch + PR. |
| VPS e Docker | Proibido `docker volume rm`, `docker system prune`, `rm -rf` e `git push --force` sem autorização explícita. Antes de editar config de produção: backup com timestamp, editar em arquivo temporário, validar (`jq empty`, `docker compose config --quiet`), só então sobrescrever e monitorar os logs. |
| Credenciais | Nunca em chat, repo ou prompt. Vazamento: protocolo D-007 com Sentinela, rotação imediata. O vault em `/home/totum/.pepper/` é do Sentinela: pedir a credencial, não ler direto. |
| Schema, RLS, auth, Storage | Passa pelo Rael (ou Kleber) e Sentinela **antes**. |
| Banco | DELETE, TRUNCATE e migration destrutiva só com aprovação e backup verificado. |
| Custo | Stack fora do canônico ou custo acima de R$ 500/mês: Rael aprova antes de contratar. |
| Agentes | Todo loop e toda action com `max-turns` e teto de gasto; chave de API por projeto. Bypass de permissões proibido em repo com credencial ou dado de cliente. |
| Segurança ofensiva | DAST nunca contra produção ou dado real; só staging. |
| Acesso | SSH só por chave, usuário sem root. |
| Rede local | Usar `127.0.0.1`, nunca `localhost`, em client HTTP e config. |
| Canais | Agente só fala nos canais da sua allowlist. |

---

## 4. Por situação: o que é obrigatório e quando está pronto

O que não está listado é dispensável por padrão (princípio 9: peso proporcional ao risco).

### LP Express (produto separado)
- Fluxo mínimo: template aprovado, copy fechada antes de começar, conteúdo do cliente, formulário entregando lead.
- Gate: P/M com Lighthouse D-029.
- Se precisar de qualquer coisa fora do template, **vira LP padrão** e muda de SLA.
- Pronto: Lighthouse D-029, lead de teste entregue, aceite do cliente.

### Landing page padrão (M)
- Sinal recebido, visual aprovado (D-033), screenshot por seção no PR, D-029.
- Automação de captura começa **em paralelo** ao visual, com o contrato do payload definido na spec.
- Pronto: visual aprovado registrado, CI verde, Lighthouse D-029 (ou exceção assinada pelo Rael), **lead de teste percorreu formulário → n8n → Kommo com tags de origem e nicho**, task fechada no Totum System com link do PR.

### Site institucional (M; G se tiver CMS com login)
- Tudo da LP + SEO técnico (sitemap, metatags, JSON-LD; ver `go-live`) + monitor de uptime **fora da VPS**.
- Pronto: o da LP + sitemap e metatags verificados, uptime ativo, manutenção contratada ou recusada por escrito.

### Sistema novo: MicroSaaS, CRM, ERP (fase 1 = M, fase 2 = G)
- Fase 1 (Visual-First): telas, fluxos e estados como spec leve; aprovação visual; sem backend.
- Fase 2: Spec Kit por domínio (D-025), monolito modular com dependency-cruiser desde o commit 1 (D-024), teste antes em área sensível (D-027), teste de RLS por política, staging com banco próprio, backup e restore test no 1º trimestre.
- Pronto: spec vinculada a cada PR, testes sensíveis verdes, migration testada em cópia, rollback declarado, doc-sync feito, SLA de suporte definido.

### Adequação de legado (POP-014-B; G, fatiado se passar de 5 dias)
1. **Baseline antes de mexer**: testes existentes, dependências com CVE, Semgrep, Lighthouse (se web), a métrica que a adequação quer melhorar.
2. **Escopo fechado** no PROJECT_CARD: o que muda e o que **não** muda. Achou débito fora do escopo: **parar** e reabrir com o Rael.
3. **Respeitar a stack existente** (Supabase Cloud ou self-hosted, como estiver). Não migrar infraestrutura dentro de adequação.
4. **Testes de caracterização** nos trechos que vão mudar, antes do refactor.
5. Tocou schema, RLS ou auth: Rael (ou Kleber) + Sentinela antes.
6. Feature nova dentro do legado segue D-025 (spec) e D-027 (teste em área sensível).
- Pronto: baseline registrado, nada mexido fora do escopo, zero regressão na suíte existente, métrica igual ou melhor, rollback documentado.

### Bug fix (POP-014-C; P se cumprir o critério, senão G)
- Reproduzir e medir impacto antes; backup `.bak-<timestamp>` se houver banco.
- Teste que falha antes e passa depois; fix cirúrgico, sem refactor junto.
- "Trivial" (menos de 20 linhas, 1 arquivo) **não** inclui dinheiro, auth ou integração externa.
- Pronto: causa raiz descrita, regressão coberta, cliente confirmou, tempos registrados na task. Em S1, post-mortem curto em até 48h.

### Manutenção recorrente (POP-014-E)
- Backup semanal verificado, restore test trimestral, auditoria de custo mensal (alerta se +30%), atualização de dependências com gate M, DLQ do n8n com alerta em tempo real.
- Pronto: rotinas existem como tasks recorrentes no Totum System, última execução registrada, nenhum alerta sem dono.

### Automação n8n e Kommo (M; G com dinheiro ou dado pessoal novo)
- JSON do workflow versionado no Git; credencial só no cofre do n8n.
- Pin data com casos de borda (lead sem telefone, duplicado, etapa inválida, payload malformado); idempotência por chave; DLQ; workflow de erro com alerta; teste de rate limit e de contrato do webhook.
- Pronto: borda passa no pin data, workflow de erro disparado em teste, evento duplicado não gera efeito duplicado, primeira janela de monitoramento sem erro crítico.

---

## 5. SLA (metas iniciais, revisar em 90 dias com tempos reais)

| Classe | Exemplo | Resposta | Resolução |
|---|---|---|---|
| S1 | Sistema ou campanha fora do ar, lead sendo perdido | 30 min (horário comercial) | 4h úteis |
| S2 | Funciona com defeito relevante | 2h úteis | 24h úteis |
| S3 | Ajuste | dentro de 48h úteis | 48h úteis |

- Lead inbound: resposta automática em até 5 min a qualquer hora; contato humano em até 2h úteis.
- Fora do horário: alerta vai para Rael e Kleber.
- Performance de entrega web: citar D-029, não repetir números de SLA antigos (85/80).

---

## 6. Escalação

| Situação | Para quem |
|---|---|
| Schema, RLS, auth, Storage | Rael (ou Kleber) + Sentinela, antes |
| Produção caiu e cliente perdendo dinheiro | Rael imediato (WhatsApp + ligação); indisponível: Kleber |
| Credencial exposta | Protocolo D-007, Sentinela, rotação |
| Estimativa acima de 5 dias | Pepper avalia fatiar |
| Débito técnico fora do escopo | Parar, reabrir escopo com Rael |
| Não reproduz o bug | Kleber (segunda opinião) antes de shipar |
| Backup falhou 2x / restore falhou | Kleber / Sentinela + Kleber |
| Custo +30% mês a mês ou stack nova > R$ 500/mês | Rael |

---

## 7. Quem executa (papéis reais)

| Papel | Executor hoje |
|---|---|
| Tech lead | Claude Code + `dev-totum` + Spec Kit; decisão de Rael ou Kleber |
| Testes | Claude Code com regra de teste no CLAUDE.md, `verificar-totum`, Claude Code Action (consultivo) |
| UI | Lovable + `totum-blueprint`, preview Vercel |
| Automação | n8n + skills Kommo/n8n |
| Governança | Pepper (roteia e audita, não executa) + Rael |
| Observabilidade | Sentry + uptime fora da VPS + alerta n8n (a montar) |

Não delegar para agentes que não existem. Papel sem executor = pendência para o Rael.

---

## 8. Ao terminar qualquer trabalho

1. Rodar `verificar-totum`.
2. Conferir o critério de pronto da situação (seção 4).
3. Registrar na task do Totum System: tamanho (P/M/G), gates rodados, link do PR, tempos.
4. Se uma decisão nova foi tomada: virar D-0XX no ADR e atualizar o POP no mesmo commit.

---

## Mudanças da v1.0 para a v1.1 (2026-11-06)

- Nome Forja; decisões do Rael da seção 0.
- Gate por tamanho (P/M/G) ligado ao classificador da `dev-totum`, no lugar do pipeline único (canário 5%, blue-green, 80% global saíram).
- No-fly zones explícitas.
- Agentes fictícios (`totum-tech-lead`, `totum-tester` etc.) removidos; papéis reais na seção 7.
- Referências com caminho errado e ferramentas sem uso comprovado (Linear, Elastic, Slack, Grafana, Kimi Claw) removidas.
- Base: auditoria e plano estratégico de 2026-11-06 (46 documentos do Drive, validação independente com benchmarks públicos).

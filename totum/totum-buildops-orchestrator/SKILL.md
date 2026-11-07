---
name: totum-buildops-orchestrator
description: "Orchestrates BuildOps: POPs, ADRs, SLAs, Gates, agents."
version: 1.0.0
author: Hermes Agent (Bulma)
license: MIT
metadata:
  hermes:
    tags: [totum, buildops, orchestration, pop, adr, sla, quality-gate, agents]
    related_skills: [orquestrar-totum, orquestracao-pepper-totum, dev-totum, revisao-totum, verificar-totum, totum-blueprint, totum-design-system, agent-criator, skill-creator, auto-loop, hermione, superchat-totum, faxina-geral, taste-design-review, taste-web-performance, taste-accessibility, karpathy-guidelines, llm-council, prompt-master, executing-plans, writing-plans, subagent-driven-development, dispatching-parallel-agents, n8n-workflow-automation, kommo-n8n-roteamento, teste-tres-caixas, webapp-testing, mcp-builder, google-sheets-gog, anygen-data-analysis, finance-analyzer]
---

# totum-buildops-orchestrator

## When to Use

Use when orchestrating BuildOps Totum workflows: classifying demands into POP-014 (A-E), applying ADR/POP/SLA, delegating to specialized agents (Tech Lead, Testador, Kimi Claw, Ollama, Lovable, Pepper), running Quality Gates, and ensuring full traceability from demand to deploy.

## Proposito

Skill **orquestradora-mestra** do ecossistema BuildOps Totum. Recebe uma demanda, classifica no POP correto (A-E), monta o plano tatico com ADR/POP/SLA, delega para agentes especializados, valida via Quality Gates, e garante rastreabilidade completa ate o deploy.

**Principio:** Todo trabalho no Totum passa por ADR (porque), POP (como), SLA (quando/qualidade). Task sem SLA = task incompleta.

---

## 1. CLASSIFICACAO DA DEMANDA (Entrada)

Recebe input livre e determina:

| Situacao | POP | Tag | Agente Inicial |
|----------|-----|-----|----------------|
| Projeto novo (LP, site, app, MicroSaaS) | POP-014-A Construir | [construir] | Tech Lead (Opus) |
| Refactor / adequacao / elevar qualidade | POP-014-B Adequar | [adequar] | Tech Lead + Kleber |
| Bug fix / incidente producao | POP-014-C Corrigir | [corrigir] | Tech Lead |
| Testar / validar antes de merge/deploy | POP-014-D Testar | [testar] | Testador (Sonet) + Kimi Claw |
| Manutencao continua / revisao recorrente | POP-014-E Manter | [manter] | Pepper / Kleber |
| Landing Page | Vibe-Coding 3.1-3.2 + POP-A | [construir] | Lovable -> Tech Lead |
| Site/Web App complexo | Vibe-Coding 3.3 + POP-A | [construir] | Tech Lead + Backend |
| Adequacao sistema legado | POP-B + Vibe-Coding 3.4 | [adequar] | Tech Lead + Kleber |
| Criacao sistema (MicroSaaS/CRM/ERP) | POP-A + Vibe-Coding 1.3 | [construir] | Tech Lead + Kimi Claw |
| Manutencao continua | POP-E + Vibe-Coding 3.5 | [manter] | Pepper + Kleber |
| Trafego Pago | POP Trafego Pago | [trafego] | Matheus Clone |
| Criacao/Design/UX | POP Criacao | [criacao] | Juliana + Lovable |
| Planejamento Social/Campanhas | POP Planejamento | [planejamento] | Juliana + Jonathan |
| Comercial/SDR | POP Comercial | [comercial] | Rafael + SDRs |
| Automacao/CRM (n8n+Kommo) | POP Automacao | [automacao] | Paulo/Kleber |
| Governanca/Gestao | POP Governanca | [governanca] | Pepper |
| Observabilidade/Loops | Quality Gate + Auto-loop | [observabilidade] | Kimi Claw + Auto-loop |

**Se ambiguo:** Pergunta clarificadora ao Rael ("Qual o objetivo principal? Novo, fix, refactor, teste, manutencao?").

---

## 2. MONTAGEM DO PLANO TATICO (ADR + POP + SLA)

Para a tag identificada, carrega o POP correspondente e:

1. Le ADRs relevantes (docs/decisoes-arquiteturais.md) - decisoes D-XXX que impactam
2. Le Principios (docs/principios-buildops.md) - replicados no topo do POP
3. Carrega Checklist do POP (fases 1-5 + quando escalar)
4. Define SLA (tempos padrao do POP + KPIs)
4. Cria PROJECT_CARD.md se [construir] ou [adequar]
5. Gera Tasks no Linear (via Composio) com template do POP
6. Define Quality Gates aplicaveis (seguranca, performance, arquitetura, carga)
7. Registra no memory/buildops-backlog.md com tag

**Output:** Plano tatico em Markdown com:
- Classificacao + POP + Tag
- ADRs aplicaveis
- Checklist faseado (Fase 1-5 do POP)
- SLA + KPIs
- Tasks Linear (IDs)
- Quality Gates a passar
- Agentes designados + modelos
- Riscos + quando escalar

---

## 3. DELEGACAO PARA AGENTES (AI Scoring Vibe-Coding 2)

| Papel | Agente | Modelo | Gatilho | Responsabilidade |
|-------|--------|--------|---------|------------------|
| Tech Lead / Arquiteto | totum-tech-lead | Claude (Opus/Sonnet) | [construir], [adequar] | Specs, arquitetura, code review final, decisoes tecnicas, Graphify |
| Testador | totum-tester | Claude (Sonet) | [testar], [construir], [adequar] | Testes unitarios (80%), integracao (70%), Kimi Claw orchestration |
| Redator / Docs | totum-writer | Gemini / Paper / Kimi Claw | [construir], [adequar], [manter] | Docs tecnicas, ADRs, changelog, /docs/dev/ + /docs/user/ |
| UI/UX Generator | totum-ui-gen | Lovable / Stitch / Figma | LP, Site, MicroSaaS UI | Blueprints -> Prototipos -> Design Tokens -> Handoff |
| Testes Continuos | totum-kimi-claw | Kimi Claw | [testar], CI/CD nightly | E2E, caixa cinza/preta, Ollama isolation, scheduled suites |
| Privacidade / Backend Local | totum-ollama | Ollama (Local/VPS) | PII, dados sensiveis, mock APIs | Processamento local, dados sinteticos, embeddings |
| Automacao CRM/n8n | totum-automation | Paulo/Kleber (Claude) | [automacao], Kommo+n8n | Workflows, roteamento, Dual Write, DLQ |
| Trafego Pago | totum-traffic | Matheus Clone (Claude) | [trafego] | Campanhas, CPL/CPA, CRM integration |
| Conteudo/Social | totum-content | Juliana + Jonathan | [planejamento], [criacao] | Calendario, copy, criativos, radar |
| Governanca/Orquestracao | totum-pepper | Pepper (VPS) | [governanca], [manter] | Auditoria tasks, SLA, integracao depts, visao executiva |
| Observabilidade/Loops | totum-auto-loop | Kimi Claw + Auto-loop | [observabilidade] | Elastic Stack, alertas, auto-issues, auto-loop |

**Regras de delegacao (Vibe-Coding 2.3):**
- Claude = Lider Arquitetura (ADRs, padroes, camadas, persistencia, comunicacao)
- Gemini = Analista Dados/Docs (context window 2M, analise codebase, documentacao viva)
- Lovable = Gerador UI (vibe coding puro, prototipos, handoff p/ dev core - NUNCA commit direto)
- Ollama = Cofre Privacidade (10.0 - PII, financeiro, saude - 100% local)
- Kimi Claw = Testes Continuos (memoria longa, Agent Swarm, skills, scheduled)
- Manus = Automacao Pesquisa (scraping, sintese, viabilidade)
- Stitch = Blueprinter (design-to-code inicial, velocidade 9.5)

---

## 4. QUALITY GATES (Pipeline Obrigatorio)

Todo codigo passa pelo pipeline antes de merge:

```yaml
stages:
  - lint_format:          {tool: eslint+prettier, criteria: zero_errors_warnings, sla: <2min}
  - static_analysis:      {tool: semgrep+custom, criteria: no_critical_ai_patterns, sla: <5min}
  - unit_tests:           {tool: jest+Kimi, criteria: coverage>=80%, all_pass, sla: <5min}
  - integration_tests:    {tool: supertest+Kimi, criteria: coverage>=70%_endpoints, sla: <15min}
  - arch_review:          {tool: Claude_auto, criteria: structural_changes_approved, sla: <10min}
  - human_approval:       {tool: github/gitlab, criteria: required_for_critical, sla: variable}
  - canary_deploy:        {tool: vercel, criteria: 5%_traffic_stable, sla: 10min_obs}
  - smoke_tests:          {tool: Kimi_Claw, criteria: core_functionality_valid, sla: <5min}
  - production_deploy:    {tool: blue_green, criteria: auto_rollback_on_degradation, sla: ---}
```

**Testes SLA (Vibe-Coding 5.5):**
- Unit: 80% coverage, <5min, 100% Kimi, human review sec/fin
- Integracao: 70% endpoints, <15min, 90% Kimi+review
- E2E: 100% fluxos criticos, <30min, 80% Kimi Claw+validacao
- Performance: 100% cenarios carga, 50% Ollama+Kimi
- Seguranca: 100% codigo, <1h, 30% ferramentas + triagem

**Penalidades:** Coverage < threshold -> block deploy | Tempo >150% baseline -> investigacao | Falha critica prod -> post-mortem 24h + update suite 48h

---

## 5. CONTEXT ENGINEERING (Graphify)

- **Sempre** rode graphify update . ao iniciar [construir] ou [adequar]
- Graphify.json = estrutura de dados para agentes (nao visual)
- **Atualize** quando: novos arquivos, modificacao significativa, nova feature
- **Nao rode** para mudancas triviais (cor de botao, copy)
- Docs/ atualizado via sub-agent doc-sync-onboarding (obrigatorio no CloudMD)

---

## 6. OBSERVABILIDADE + AUTO-LOOP

- Elastic Stack (VPS): logs, metricas, APM
- Auto-loop (auto-loop skill): roda 24h na VPS via SSH
  - Agente observabilidade le logs -> cria issues se CPU/RAM/erros
  - Kimi Claw nightly: E2E completo + performance + security scan
  - Alertas: Slack #alerts-qa (real-time), email tech-leads (semanal), dashboard Grafana
- SLOs internos 20-40% mais rigorosos que SLAs externos

---

## 7. ESCALACAO (Matriz POP)

| Situacao | Acao | Aprovador |
|----------|------|-----------|
| Refactor toca schema/RLS/Auth | Parar -> Rael + Sentinela | Rael |
| Custo estimado > 5 dias | Pepper avalia dividir | Pepper |
| Descobre debito tecnico fora escopo | Parar -> reabrir escopo com Rael | Rael |
| Prod caiu + cliente perdendo $ | Rael imediato (WhatsApp+call) | Rael |
| Envolve credencial/vazamento | Protocolo D-007 (Sentinela+rotacao) | Sentinela |
| Fix precisa mexer RLS/Auth/Storage | Vermelho na matriz -> Rael antes | Rael |
| Nao consegue reproduzir bug | Kleber (2a opiniao) antes de shipar | Kleber |
| Backup falhou 2x | Kleber (root cause) | Kleber |
| Cost +30% mes-a-mes | Rael (revisar contratos) | Rael |
| Restore test falhou | Sentinela + Kleber imediato | Sentinela+Kleber |

---

## 8. DOCUMENTACAO BILINGUE (Vibe-Coding 4.3.4)

Todo projeto mantem:
- /docs/dev/ - Arquitetura, APIs, ADRs, runbooks (Kimi Claw + revisao PR)
- /docs/user/ - Fluxos, conceitos, troubleshooting (Paper + feedback usuarios)
- Changelog automatico (Kimi Claw a cada commit)
- ADRs em /docs/decisions/ (hash prompt + modelo + timestamp + engenheiro)

---

## 9. COMANDOS PRINCIPAIS

| Comando | Acao |
|---------|------|
| /buildops classificar "<demanda>" | Classifica demanda, retorna POP + plano inicial |
| /buildops planejar <tag> [--adr=<ids>] | Gera plano tatico completo com ADRs |
| /buildops delegar <task_id> <agente> | Delegada task para agente especifico |
| /buildops gate <pr_id> | Roda Quality Gates no PR |
| /buildops status | Dashboard: tasks, SLAs, agentes, riscos |
| /buildops escalar <motivo> | Escala conforme matriz |
| /buildops sync-skills | Atualiza skills do totum-house/skills (08h/18h cron) |

---

## 10. INTEGRACOES

- Composio: Google Drive (sync), Linear (tasks), GitHub (PRs), Meta (ads)
- n8n: Workflows Kommo, automacoes, Dual Write, DLQ
- Graphify: Context engineering (graphify.json)
- Elastic Stack: Observabilidade (VPS)
- Ollama (Mac/VPS): Privacidade, mock APIs, dados sinteticos
- Kimi Claw: Testes continuos, docs, changelog
- Linear: Task management (templates por POP)
- VPS (Hostinger/Kinghost): SSH host para agents 24h

---

## Exemplo de Uso

```
User: "Quero criar uma LP para um dermatologista em Volta Redonda, foco em procedimentos esteticos, prazo 3 dias."

Hermes (totum-buildops-orchestrator):
1. Classifica -> [construir] + LP -> POP-014-A + Vibe-Coding LP
2. ADRs: D-001 (stack canonica), D-007 (credenciais), D-014 (Totum Red Theme)
3. Plano:
   - Fase 1: Briefing Mesa Entrada -> PROJECT_CARD.md
   - Fase 2: totum-lp-copy (PAS/AIDA) -> copy aprovada
   - Fase 3: totum-blueprint -> direcao visual (Tech Medico) -> Totum Red Theme
   - Fase 4: Stitch -> Figma (tokens, componentes, Tech Medico glassmorphism)
   - Fase 5: Lovable -> prototipo alta fidelidade -> handoff (tokens, estados, a11y)
   - Fase 6: Graphify -> context engineering
   - Fase 7: Dev Core (Claude+Graphify+TDD) -> Quality Gates
   - Fase 8: Deploy canario -> Smoke -> Producao
4. SLA: 2-5 dias uteis (setup LP) | KPIs: LCP<=1.8s, INP<=200ms, Conversao
5. Delegacao:
   - Copy -> totum-lp-copy (Claude)
   - Visual -> totum-ui-gen (Lovable/Stitch/Figma)
   - Dev -> totum-tech-lead (Claude Opus + Graphify)
   - Testes -> totum-tester (Sonet) + totum-kimi-claw (Kimi Claw)
   - Docs -> totum-writer (Gemini/Paper)
6. Cria tasks no Linear (template POP-A + LP)
7. Registra no buildops-backlog.md tag [construir]
8. Retorna plano + tasks IDs + dashboard link
```

---

## Referencias (carregar quando necessario)

- totum-house/skills/totum/ - POP-014 A-E, principios, decisoes, glossario
- totum-house/skills/totum/hermione - Pesquisa profunda
- totum-house/skills/totum/orquestrar-totum - Kernel de sessao
- totum-house/skills/totum/orquestracao-pepper-totum - Roteamento agentes
- totum-house/skills/totum/totum-blueprint - Visual reference -> builder prompt
- totum-house/skills/totum/totum-design-system - Dark-first, tokens, Geomanist
- totum-house/skills/totum/totum-lp-copy - Copy humanizada BR
- totum-house/skills/automacao/kommo-n8n-roteamento - CRM + n8n
- totum-house/skills/automacao/n8n-workflow-automation - Workflows idempotentes
- totum-house/skills/dev-tools/teste-tres-caixas - QA ciclo 3 caixas
- totum-house/skills/dev-tools/webapp-testing - Dogfood QA
- totum-house/skills/creative/vibe-coding-master-playbook - AI Scoring, SOP/SLA
- totum-house/skills/research/multi-search-engine - 16 motores busca
- totum-house/skills/analytics/finance-analyzer - DRE, Balanco, Fluxo Caixa
- totum-house/skills/analytics/google-sheets-gog - Sheets via CLI
- totum-house/skills/agent-criator - Checklist agentes Totum OS
- totum-house/skills/skill-creator - Criar skills novas
- totum-house/skills/auto-loop - Loops autonomos
- totum-house/skills/totum/superchat-totum - Ciclo vida contexto
- totum-house/skills/totum/faxina-geral - Arquitetura informacao
- totum-house/skills/taste-design-review - Auditoria UI/UX
- totum-house/skills/taste-web-performance - Core Web Vitals
- totum-house/skills/taste-accessibility - A11y built-in
- totum-house/skills/karpathy-guidelines - Anti-slop code
- totum-house/skills/llm-council - 5 advisors decisao
- totum-house/skills/prompt-master - Prompts otimizados
- totum-house/skills/executing-plans - Execucao planos escritos
- totum-house/skills/writing-plans - Planos multi-step
- totum-house/skills/subagent-driven-development - Planos com subagentes
- totum-house/skills/dispatching-parallel-agents - 2+ tasks independentes
- totum-house/skills/mcp-builder - MCP servers
- totum-house/skills/analytics/anygen-data-analysis - Analise datasets
- totum-house/skills/analytics/finance-analyzer - Metricas financeiras

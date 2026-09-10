# totum-house/skills

Skills OpenClaw do ecossistema Totum. Cada skill é um módulo de comportamento que pode ser carregado por agentes para adicionar capacidades específicas sem repetir instruções.

## Índice de Skills

| Skill | Categoria | Descrição | Quando usar |
|-------|-----------|-----------|-------------|
| [agent-criator](totum/agent-criator/SKILL.md) | `totum` | Checklist completo para criar agentes Totum OS padronizados | Criar novo agente com identidade, memória, tools e validação |
| [orquestrador-totum](totum/orquestrador-totum/SKILL.md) | `totum` | Kernel de orquestração do Totum OS. Analisa prompts, inicializa contexto, classifica intenção, roteia para skill/subagente, monitora coerência e sintetiza resultado | Analisar prompts grandes (≥150 palavras) ou com 2+ intenções antes de executar qualquer tarefa |
| [orquetracao-pepper-totum](totum/orquetracao-pepper-totum/SKILL.md) | `totum` | Roteia pedidos Totum entre Pepper, subagentes, skills e Rael | Qualquer tarefa que precise decidir quem/o quê executa |
| [superchat-totum](totum/superchat-totum/SKILL.md) | `totum` | Gerenciador de ciclo de vida de contexto para chats Claude | Monitorar uso de contexto via `/context` no Claude Code |
| [llm-council](decisao/llm-council/SKILL.md) | `decisao` | 5 advisors de IA analisam uma decisão de forma independente e entregam veredicto consolidado | "Council this", decisões com múltiplas opções e stakes reais |
| [karpathy-guidelines](decisao/karpathy-guidelines/SKILL.md) | `decisao` | Diretrizes para reduzir erros comuns de LLM em código — mudanças cirúrgicas, sem overengineering | Sempre que estiver escrevendo, revisando ou refatorando código |
| [finance-analyzer](analytics/finance-analyzer/SKILL.md) | `analytics` | Analisa DRE, Balanço e Fluxo de Caixa de Excel/CSV e calcula ROE, ROA, margens | "Analise esse relatório financeiro", calcular métricas financeiras |
| [anygen-data-analysis](analytics/anygen-data-analysis/SKILL.md) | `analytics` | Análise de dados, gráficos e visualizações a partir de qualquer dataset | Análise de vendas, funil, cohort, KPIs, relatórios de dados |
| [google-sheets-gog](analytics/google-sheets-gog/SKILL.md) | `analytics` | Cria, lê e atualiza Google Sheets via CLI `gog` com autenticação local | Operações diretas em planilhas Google (append, update, create) |
| [multi-search-engine](pesquisa/multi-search-engine/SKILL.md) | `pesquisa` | 16 motores de busca (7 CN + 9 Global) com operadores avançados, filtros de tempo e WolframAlpha | Pesquisa web sem API key, busca avançada, consultas de conhecimento |
| [social-media-research](pesquisa/social-media-research/SKILL.md) | `pesquisa` | Pesquisa perfis, posts e engajamento em Instagram, TikTok, LinkedIn, X e outros via Crawlora API | Pesquisa de concorrentes, social listening, stats de perfis públicos |
| [find-skills](pesquisa/find-skills/SKILL.md) | `pesquisa` | Descobre e sugere skills instaláveis quando o usuário pergunta "como faço X" | Usuário busca funcionalidade que pode existir como skill |
| [n8n-workflow-automation](automacao/n8n-workflow-automation/SKILL.md) | `automacao` | Gera JSON de workflow n8n com idempotência, retry, logging e fila de revisão humana | Criar automações auditáveis que não falhem silenciosamente |
| [totum-to-n8n-json](totum/totum-to-n8n-json/SKILL.md) | `totum` | Gera JSON de workflow n8n com mapa de microdecisões para o ecossistema Totum | Criar automações no n8n para o ecossistema Totum, com fluxos idempotentes, logging e filas de revisão humana |
| [nano-pdf](documentos/nano-pdf/SKILL.md) | `documentos` | Edita PDFs com instruções em linguagem natural via CLI `nano-pdf` | Modificar, extrair ou reorganizar conteúdo de PDFs |
| [social-key-visual](frontend/social-key-visual/SKILL.md) | `frontend` | Gera key visuals e artes para redes sociais a partir de referências de identidade visual | Criar artes para Instagram (1:1), Stories/Reels (9:16) e feed retrato (4:5) |
| [uiux-auditor](frontend/uiux-auditor/SKILL.md) | `frontend` | Auditoria UI, revisar interface, tela, layout | Auditar designs, screens de app ou site, wireframes, protótipos |

## Categorias

```
totum/          Skills específicas do ecossistema Totum OS e seus agentes
decisao/        Frameworks de decisão, revisão de código e raciocínio estruturado
analytics/      Análise de dados, finanças e planilhas
pesquisa/       Pesquisa web, redes sociais e descoberta de capacidades
automacao/      Automações e integrações (n8n, webhooks, pipelines)
documentos/     Processamento e edição de documentos (PDF, etc.)
frontend/       Geração e auditoria de interface (imagem, estilo, design)
```

## Subpastas do frontend

```
frontend/imagem/   Para geração de imagens: totum-imagem-web, totum-imagem-mobile, totum-imagem-para-codigo
frontend/estilo/   Para estilos de interface: totum-ui-minimalista, totum-ui-brutalista, totum-design-premium-suave, totum-stitch-design
frontend/social-key-visual/  Para key visuals e artes sociais
frontend/totum-kit-de-marca/   Para identidade visual
frontend/totum-blueprint/      Para blueprint completo do Totum OS
frontend/totum-redesign-existente/   Para redesenho de interfaces existentes
frontend/design-system-extrator/   Para extração de design systems
frontend/analise-front-totum/   Para análise de interfaces front-end
  - analise-front-totum v2: análise atual
  - analise-front-totum-v1: legado (versão anterior)
  - analise-front-totum-gpt: variante GPT/Codex
```

## Como usar

Skills são carregadas via OpenClaw. Para instalar uma skill no seu workspace:

```bash
# No OpenClaw, use o comando de skills ou referencie o SKILL.md diretamente
/skills install <nome-da-skill>
```

Cada pasta de skill contém um `SKILL.md` com as instruções completas de uso, triggers e exemplos.

## Contribuindo

1. Crie uma pasta `<categoria>/<nome-da-skill>/`
2. Adicione o arquivo `SKILL.md` seguindo o formato dos existentes (frontmatter YAML + instruções)
3. Atualize a tabela neste README
4. Abra um PR

---

Mantido pelo time Totum BuildOps. Dúvidas: [grupototum.com](https://grupototum.com)
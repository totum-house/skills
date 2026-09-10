# totum-house/skills

Central única de skills do ecossistema Totum — compartilhada entre Claude Code, Cowork, OpenClaw, OpenCode e qualquer outra ferramenta de IA do Rael. Cada skill é um módulo de comportamento que pode ser carregado por agentes para adicionar capacidades específicas sem repetir instruções.

## Índice de Skills

| Skill | Categoria | Descrição | Quando usar |
|-------|-----------|-----------|-------------|
| [agent-criator](totum/agent-criator/SKILL.md) | `totum` | Checklist completo para criar agentes Totum OS padronizados | Criar novo agente com identidade, memória, tools e validação |
| [orquestracao-pepper-totum](totum/orquestracao-pepper-totum/SKILL.md) | `totum` | Roteia pedidos Totum entre Pepper, subagentes, especialistas e Rael (CEO operacional) | Roteamento, priorização, delegação contínua durante a execução |
| [orquestrar-totum](totum/orquestrar-totum/SKILL.md) | `totum` | Kernel de sessão: analisa o prompt de entrada, mapeia skills e propõe plano de execução antes de agir | Início de sessão, prompts longos (150+ palavras) ou com 2+ intenções |
| [auto-loop](totum/auto-loop/SKILL.md) | `totum` | Executor de loops autônomos do Totum OS (loop engineering) — dispara, verifica e encerra sozinho | Automatizar tarefa recorrente e verificável, sem julgamento humano a cada passo |
| [hermione](totum/hermione/SKILL.md) | `totum` | Agente de pesquisa e organização do conhecimento integrado ao Alexandria (Supabase) do Totum OS | Pesquisa profunda, catalogação e conexão de conhecimento dentro do ecossistema Totum |
| [superchat-totum](totum/superchat-totum/SKILL.md) | `totum` | Gerenciador de ciclo de vida de contexto para chats Claude | Monitorar uso de contexto via `/context` no Claude Code, Cowork ou claude.ai |
| [totum-lp-copy](totum/totum-lp-copy/SKILL.md) | `totum` | Copy de landing page humanizada e de alta conversão para o mercado BR (PAS/AIDA/StoryBrand + anti-IA) | Copy de LP, headline/subheadline, reescrever ou auditar página de vendas |
| [feed-perfeito](totum/feed-perfeito/SKILL.md) | `totum` | Gera o briefing completo de feed de Instagram para agência nichada (onboarding, posts de "enche linguiça", depoimentos fixados, caixinhas de pergunta, checklist) | Criar feed, montar Instagram, briefing de conteúdo/social media para cliente de agência |
| [llm-council](decisao/llm-council/SKILL.md) | `decisao` | 5 advisors de IA analisam uma decisão de forma independente e entregam veredicto consolidado | "Council this", decisões com múltiplas opções e stakes reais |
| [karpathy-guidelines](decisao/karpathy-guidelines/SKILL.md) | `decisao` | Diretrizes para reduzir erros comuns de LLM em código — mudanças cirúrgicas, sem overengineering | Sempre que estiver escrevendo, revisando ou refatorando código |
| [prompt-master](decisao/prompt-master/SKILL.md) | `decisao` | Gera prompts otimizados por ferramenta de IA (Claude, GPT, Cursor, Midjourney etc.) | Criar, corrigir ou adaptar um prompt para uma ferramenta de IA específica |
| [revisao-totum](decisao/revisao-totum/SKILL.md) | `decisao` | Revisão periódica autônoma de repositório — conserta o seguro, commita e pusha, pergunta o resto | Revisão recorrente de projeto Totum com intenção de corrigir e versionar, não só relatar |
| [revisaosistema](decisao/revisaosistema/SKILL.md) | `decisao` | Revisão de código React/TypeScript/Next.js em 2 passes (geral + hooks) com formato de achado padronizado | Revisão pré-produção de código React, sobretudo uso de hooks |
| [totum-saida-completa](decisao/totum-saida-completa/SKILL.md) | `decisao` | Sobrescreve o truncamento padrão das IAs da Totum: proíbe placeholder ("...", "TODO", "resto do código") e trata divisão por limite de tokens | Qualquer tarefa que exija saída completa e sem cortes — geração de código ou conteúdo longo |
| [finance-analyzer](analytics/finance-analyzer/SKILL.md) | `analytics` | Analisa DRE, Balanço e Fluxo de Caixa de Excel/CSV e calcula ROE, ROA, margens | "Analise esse relatório financeiro", calcular métricas financeiras |
| [anygen-data-analysis](analytics/anygen-data-analysis/SKILL.md) | `analytics` | Análise de dados, gráficos e visualizações a partir de qualquer dataset | Análise de vendas, funil, cohort, KPIs, relatórios de dados |
| [google-sheets-gog](analytics/google-sheets-gog/SKILL.md) | `analytics` | Cria, lê e atualiza Google Sheets via CLI `gog` com autenticação local | Operações diretas em planilhas Google (append, update, create) |
| [multi-search-engine](pesquisa/multi-search-engine/SKILL.md) | `pesquisa` | 16 motores de busca (7 CN + 9 Global) com operadores avançados, filtros de tempo e WolframAlpha | Pesquisa web sem API key, busca avançada, consultas de conhecimento |
| [social-media-research](pesquisa/social-media-research/SKILL.md) | `pesquisa` | Pesquisa perfis, posts e engajamento em Instagram, TikTok, LinkedIn, X e outros via Crawlora API | Pesquisa de concorrentes, social listening, stats de perfis públicos |
| [find-skills](pesquisa/find-skills/SKILL.md) | `pesquisa` | Descobre e sugere skills instaláveis quando o usuário pergunta "como faço X" | Usuário busca funcionalidade que pode existir como skill |
| [n8n-workflow-automation](automacao/n8n-workflow-automation/SKILL.md) | `automacao` | Gera JSON de workflow n8n genérico com idempotência, retry, logging e fila de revisão humana | Criar automação auditável que não falhe silenciosamente, sem ligação com o formato Totum |
| [totum-microdecisoes-para-n8n](automacao/totum-microdecisoes-para-n8n/SKILL.md) | `automacao` | Converte um Mapa de Microdecisões Totum (anúncio, carrossel, conteúdo) em workflow n8n com checkpoints humanos | Transformar o mapa de microdecisões do agente de design Totum em fluxo n8n importável |
| [totum-script-vendas](vendas/totum-script-vendas/SKILL.md) | `vendas` | Escreve script, copy, cadência ou kit comercial completo da Totum para qualquer produto/nicho; entrevista antes, recomenda o modelo certo, entrega com mapa problema-solução-resultado | Script de ligação, mensagem de prospecção, copy de anúncio, cadência de follow-up, resposta de objeção, "o que eu mando agora" para um lead |
| [planejamento-estrategico](vendas/planejamento-estrategico/SKILL.md) | `vendas` | Entrevista estruturada sobre o funil comercial de uma agência (CPL, agendamento, comparecimento, conversão, ticket, churn) e gera diagnóstico + projeção em 3 cenários + plano de 90 dias | Planejamento, diagnóstico de agência, projeção de faturamento, cenários de crescimento, "analisar minha agência" |
| [nano-pdf](documentos/nano-pdf/SKILL.md) | `documentos` | Edita PDFs com instruções em linguagem natural via CLI `nano-pdf` | Modificar, extrair ou reorganizar conteúdo de PDFs |
| [faxina-geral](documentos/faxina-geral/SKILL.md) | `documentos` | Arquiteto de informação: consolida, deduplica e indexa uma base de documentos/conhecimento | Organizar arquivos, limpar base de conhecimento, criar índice, reduzir tokens de contexto |
| [uiux-auditor](frontend/uiux-auditor/SKILL.md) | `frontend` | Auditoria cirúrgica de UI/UX (Gestalt, hierarquia, grid/proporção, usabilidade; modo completo com Nielsen/Fitts/Hick/Atomic/WCAG) | Analisar/criticar interface, wireframe, protótipo ou fluxo enviado — não cria do zero |
| [design-system-extrator](frontend/design-system-extrator/SKILL.md) | `frontend` | Extrai design system de um site ao vivo via URL (cores, tipografia, grid, componentes) direto do CSS renderizado | Benchmark visual de concorrente, tirar paleta/fontes de um site, documentar tokens de terceiro |
| [totum-design-system](frontend/totum-design-system/SKILL.md) | `frontend` | Aplica o design system oficial da Totum (dark-first, tokens do totum-system) em sistemas internos | Criar/redesenhar dashboard, CRM, ERP ou produto operacional da Totum/Pixel System/uPixel |
| [go-live](frontend/go-live/SKILL.md) | `frontend` | Checklist de publicação de página web feita com IA (favicon, meta/OG, JSON-LD, sitemap, analytics, WEBP) | Antes de lançar/publicar uma página — o que falta antes de ir ao ar |
| [totum-blueprint](frontend/totum-blueprint/SKILL.md) | `frontend` | Coordenador visual: conduz passo a passo de referência bruta até prompt pronto pro builder (tokens, componentes, direção de arte, plano responsivo, cut list, gate de validação) | Receber imagem/PRD/print e precisar especificar antes de montar Figma ou código — roda antes do código, nunca depois |
| [totum-redesign-existente](frontend/totum-redesign-existente/SKILL.md) | `frontend` | Audita um site/app existente, identifica padrões genéricos de IA e eleva ao nível premium sem quebrar funcionalidade | Elevar/redesenhar algo que já existe, em qualquer framework CSS |
| [analise-front-totum](frontend/analise-front-totum/SKILL.md) | `frontend` | Skill padrão (v2) de gosto visual para frontend — lê o briefing, infere linguagem de design, evita cara de template genérico | Padrão atual para dar bom gosto a landing pages, portfólios e redesigns |
| [analise-front-totum-v1](frontend/analise-front-totum-v1/SKILL.md) *(legado)* | `frontend` | Versão 1 original da skill de gosto de design, mantida por compatibilidade exata com comportamento antigo | Só quando um projeto específico depende do comportamento da v1 |
| [analise-front-totum-gpt](frontend/analise-front-totum-gpt/SKILL.md) | `frontend` | Variante mais rígida para GPT/Codex — AIDA estrito, grids bento sem buracos, ScrollTrigger GSAP rigoroso | Mesma finalidade da `analise-front-totum`, mas rodando em GPT/Codex em vez de Claude |
| [totum-imagem-web](frontend/imagem/totum-imagem-web/SKILL.md) | `frontend` | Gera imagens de referência para sites premium, uma imagem horizontal por seção (nunca uma imagem única da página inteira) | Referência visual de landing page/site antes de implementar — não escreve código |
| [totum-imagem-mobile](frontend/imagem/totum-imagem-mobile/SKILL.md) | `frontend` | Gera imagens de referência para telas de app mobile premium (iOS/Android/multiplataforma) | Conceito visual de onboarding, dashboard, auth e demais fluxos de app — não escreve código |
| [totum-imagem-para-codigo](frontend/imagem/totum-imagem-para-codigo/SKILL.md) | `frontend` | Fluxo imagem-para-código: gera a referência visual do site primeiro, depois implementa o frontend batendo o mais próximo possível dela | Implementar um site do zero com qualidade de referência visual definida antes do código |
| [social-key-visual](frontend/imagem/social-key-visual/SKILL.md) | `frontend` | Extrai design system de 4 imagens de referência e gera key visuals/posts (feed, stories, retrato) em PNG | Gerar artes com identidade de marca a partir de referências visuais enviadas |
| [previa-hero](frontend/imagem/previa-hero/SKILL.md) | `frontend` | Gera prévia visual de Hero Section em duas direções de arte com duas opções de copy cada, mockup laptop/iPhone na moldura institucional, e o prompt final pronto para ChatGPT/Gemini gerar as imagens | "/Previa_Hero", prévia de landing page para lead, mockup de hero para prospecção, duas opções de hero a partir de logo/foto do cliente |
| [totum-kit-de-marca](frontend/estilo/totum-kit-de-marca/SKILL.md) | `frontend` | Gera imagens de kit de marca premium — guias de marca, sistema de logo, deck de identidade, apresentação de universo visual | Criar ou apresentar identidade visual/kit de marca de um cliente ou produto |
| [totum-design-premium-suave](frontend/estilo/totum-design-premium-suave/SKILL.md) | `frontend` | Direção de estilo "agência de ponta": fontes, espaçamento, sombra, cards e animação que fazem um site parecer caro | Elevar um design que está com "cara barata"/genérica de IA |
| [totum-ui-minimalista](frontend/estilo/totum-ui-minimalista/SKILL.md) | `frontend` | Direção de estilo editorial minimalista — paleta monocromática quente, grids bento planos, sem gradiente/sombra pesada | Interface limpa em estilo editorial/workspace de alto contraste |
| [totum-ui-brutalista](frontend/estilo/totum-ui-brutalista/SKILL.md) | `frontend` | Direção de estilo brutalista/industrial — tipografia suíça, grid rígido, paleta utilitária, degradação analógica simulada | Dashboard denso, portfólio ou site editorial com estética de "blueprint desclassificado" |
| [totum-stitch-design](frontend/estilo/totum-stitch-design/SKILL.md) | `frontend` | Sistema de design semântico para o Google Stitch — gera `DESIGN.md` compatível com agentes, mesmo padrão anti-genérico | Preparar a direção de estilo Totum para geração de tela no Google Stitch |

## Categorias

```
totum/          Skills específicas do ecossistema Totum OS, seus agentes e produção de marketing autoral da Totum
decisao/        Frameworks de decisão, revisão de código e raciocínio estruturado
analytics/      Análise de dados, finanças e planilhas
pesquisa/       Pesquisa web, redes sociais e descoberta de capacidades
automacao/      Automações e integrações (n8n, webhooks, pipelines)
vendas/         Ferramentas do processo comercial da Totum — scripts, cadências, diagnóstico e planejamento para vender e prospectar
documentos/     Processamento, edição e organização de documentos (PDF, bases de conhecimento, etc.)
frontend/       Geração e auditoria de interface visual e frontend — UI, design system, imagem, publicação web
  frontend/imagem/   Geração/análise de peças visuais a partir de imagem ou referência
  frontend/estilo/   Direções de estilo visual (UI kits, redesign, variações de tom)
```

## Como usar

### OpenClaw
```bash
# No OpenClaw, use o comando de skills ou referencie o SKILL.md diretamente
/skills install <nome-da-skill>
```

### Claude Code / Cowork
Claude Code (e o Cowork, que roda sobre o mesmo agente) carrega skills de `.claude/skills/`. Para consumir este repositório sem duplicar arquivos, referencie-o como submódulo ou faça um link simbólico da raiz do projeto:
```bash
ln -s /caminho/para/totum-house-skills .claude/skills
```
Cada subpasta `<categoria>/<skill>/` funciona como uma skill independente — o carregador não se importa com a categoria intermediária no caminho.

### OpenCode
O OpenCode varre `skills/*/SKILL.md` a partir da raiz do projeto (ou `.opencode/skills/`) e também lê `.claude/skills/` como caminho de compatibilidade. O mesmo link simbólico acima funciona para os dois:
```bash
ln -s /caminho/para/totum-house-skills .opencode/skills
```

Em todos os casos, cada pasta de skill contém um `SKILL.md` com as instruções completas de uso, triggers e exemplos — e pode conter subpastas `references/`, `examples/`, `frameworks/` ou `scripts/` com material de apoio citado pelo próprio SKILL.md.

## Contribuindo

1. Crie uma pasta `<categoria>/<nome-da-skill>/` (ou `<categoria>/<subpasta>/<nome-da-skill>/` dentro de `frontend/`)
2. Adicione o arquivo `SKILL.md` seguindo o formato dos existentes (frontmatter YAML + instruções)
3. Atualize a tabela neste README
4. Abra um PR

### Antes de propor uma skill nova, verifique duplicidade

Este repositório é a fonte única — não deve haver a mesma skill (ou uma skill quase idêntica) espalhada entre `~/.claude/skills`, o plugin `totum-skills` e este repo. Se uma versão já existe aqui, atualize-a em vez de criar uma cópia paralela.

### Fora de escopo (não importadas de propósito)

- Plugins oficiais do marketplace Anthropic (`legal:*`, `sales:*`, `marketing:*`, `data:*`, `design:*` genérico, `figma:*`, `canva:*`, `adobe-for-creativity:*`, `cowork-plugin-management:*`, `paper-desktop:*`, `productivity:*`) e skills públicas nativas do Claude Code/Claude.ai (`docx`, `pdf`, `pptx`, `xlsx`, `file-reading`, `pdf-reading`, `product-self-knowledge`, `canvas-design`, `import-memory`, `mcp-builder`, `morning`, `skill-creator`) — já vêm nativas em qualquer ambiente Claude, duplicar o texto aqui não resolve nada.
- `frontend-design` — o nome existe na conta como a skill pública genérica da Anthropic (não uma versão autoral do Rael). Se uma versão própria existir em outro lugar/nome, precisa ser localizada e importada à parte.
- `spec-feature` — mencionada como parte do Totum Kit Dev v2.2.0, mas não encontrada em nenhuma fonte disponível (nem `~/.claude/skills`, nem plugin, nem conta Cowork). Pendente de localização — deve estar no OpenClaw.

---

Mantido pelo time Totum BuildOps. Dúvidas: [grupototum.com](https://grupototum.com)

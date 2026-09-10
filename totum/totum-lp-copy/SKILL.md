---
name: totum-lp-copy
description: Gera copy de landing page humanizada e de alta conversão para o mercado brasileiro, combinando frameworks comprovados (PAS, AIDA, StoryBrand) com camada anti-IA e voz BR autêntica. Use SEMPRE que o usuário pedir "copy de landing page", "texto pra LP", "headline e subheadline", "página de vendas", "página de captura", "estrutura de copy", "reescrever LP", "humanizar copy", "tirar cara de IA do texto", ou mencionar criação de copy para Hotmart, Eduzz, Cakto, Kiwify, RD Station, GreatPages, Lovable, Framer, Webflow ou qualquer construtor de página. Também acione para auditoria e refatoração de LPs existentes, e para gerar variações A/B de headlines, CTAs e seções.
---

# Totum LP Copy

Skill autoral do Grupo Totum para produção de copy de landing page com tom humano brasileiro, lastreada em frameworks de copywriting clássicos e na arquitetura analítica DIHA (Dado → Implicação → Hipótese → Abordagem).

## Princípio operacional

Copy de LP que converte no Brasil não vem de fórmula traduzida do inglês. Vem de três camadas empilhadas:

1. **Estrutura argumentativa** vinda de um framework comprovado (PAS, AIDA, StoryBrand)
2. **Calibração ao mercado BR** com vocabulário, prova social e quebras de objeção do consumidor brasileiro
3. **Filtro anti-IA** removendo padrões de escrita robótica antes da entrega

Pular qualquer uma das três produz copy genérica. Esta skill executa as três em ordem.

## Quando NÃO usar esta skill

- Email marketing, anúncios de mídia paga curtos, posts de social media (use skills específicas)
- Copy institucional sem objetivo de conversão (sites de marca, sobre-nós)
- Whitepapers ou conteúdo longo de blog (lógica diferente, sem CTA pesado)

## Workflow obrigatório

### Fase 0: Briefing Lock

ANTES de escrever uma única palavra de copy, conduza a coleta de contexto seguindo `briefing-guide.md`. NÃO despeje todas as perguntas de uma vez. NÃO invente dados, depoimentos, números ou casos.

Três modos de operação na Fase 0:

1. **Modo completo:** 18 perguntas em 7 blocos (briefing-guide.md). Use para clientes novos ou LPs estratégicas.
2. **Modo atalho:** quando o usuário envia contexto pronto (fluxo de vendas, proposta, briefing já existente). Extraia o que der, pergunte só o que faltar.
3. **Modo pressa:** 5 perguntas críticas (briefing-guide.md, seção atalho ainda mais rápido).

Em qualquer modo, termine com **"Briefing Lock — confirme antes de gerar"** e aguarde confirmação explícita do usuário.

### Fase 1: Análise DIHA do público

Aplique a arquitetura Totum de inteligência comercial:

- **Dado**: o que sabemos objetivamente sobre o público e o problema?
- **Implicação**: o que esse dado significa em termos de comportamento de compra?
- **Hipótese**: qual ângulo argumentativo mais provável de converter esse público?
- **Abordagem**: qual framework e qual tom executam essa hipótese?

Documente isso em 4 linhas antes de escolher o framework.

### Fase 2: Seleção de framework

Leia `frameworks/pas-br.md`, `frameworks/aida-br.md`, `frameworks/storybrand-br.md` e `frameworks/aia-br.md` e escolha UM com base na DIHA:

| Público / Contexto | Framework recomendado |
|---|---|
| Consciente do problema, alta dor, tráfego morno | PAS-BR |
| Inconsciente ou tráfego frio, produto com promessa forte | AIDA-BR |
| Consciente da solução, mercado competitivo, ticket médio-alto | StoryBrand-BR |
| Consultivo, B2B local, ticket médio-alto, tráfego morno/quente, venda diagnóstica | AIA-BR |

Justifique a escolha em 1 frase ao usuário.

**Combinações permitidas:** AIA-BR pode ser combinado com StoryBrand-BR (AIA puxando a estrutura macro, StoryBrand calibrando a narrativa de transformação). Outras combinações tendem a gerar copy confusa, evite.

### Fase 3: Geração de copy seção por seção

Gere a LP nas seções a seguir, nesta ordem, uma de cada vez. NÃO entregue tudo de uma vez:

1. **Hero** (headline + subheadline + CTA primário)
2. **Bloco de dor** (espelho da realidade atual do leitor)
3. **Apresentação da solução** (o que é, como funciona)
4. **Mecanismo único** (por que ISSO funciona quando outras coisas falharam)
5. **Prova social** (depoimentos, números, logos)
6. **Quebra de objeções** (FAQ ou bloco explícito)
7. **Oferta** (preço, garantia, bônus, urgência genuína)
8. **CTA final** (recapitulação + comando único)

Em cada seção, gere 2 variações para A/B antes de prosseguir.

### Fase 4: Passe anti-IA

Aplique `humanization/anti-ai-patterns.md` como checklist final. Reescreva qualquer trecho que dispare os padrões da lista.

### Fase 5: Passe de voz BR

Aplique `humanization/voz-br.md` para calibrar oralidade, regionalismo e marcadores de naturalidade brasileira.

### Fase 6: Entrega

Entregue em formato Markdown estruturado, com:
- Cada seção identificada
- Variações A/B numeradas
- Notas de implementação (onde colocar prova social, sugestões de imagem, etc.)
- Sugestão de teste prioritário para os primeiros 14 dias

## Regras absolutas

1. **Nunca fabrique depoimento, número, caso ou nome de cliente.** Se o usuário não forneceu, deixe placeholder `[DEPOIMENTO REAL AQUI]` e explicite que precisa ser preenchido.
2. **Nunca use em-dash (—)** no copy entregue. Use vírgula, ponto ou dois-pontos.
3. **Nunca traduza literalmente headlines em inglês** ("desbloqueie", "alavanque", "potencialize" sem contexto são red flags).
4. **Cada headline precisa passar no teste dos 5 segundos**: ler em voz alta, e ficar claro PARA QUEM é e O QUE entrega.
5. **CTA único por página.** Múltiplos CTAs concorrentes diluem conversão. Variações de cor/posição do MESMO CTA são permitidas.

## Referências cruzadas

- Briefing: `briefing-guide.md` (18 perguntas com 3 modos: completo, atalho, pressa)
- Frameworks: `frameworks/pas-br.md`, `frameworks/aida-br.md`, `frameworks/storybrand-br.md`, `frameworks/aia-br.md`
- Humanização: `humanization/anti-ai-patterns.md`, `humanization/voz-br.md`
- Apoio: `references/lps-alta-conversao-br.md`, `references/prova-social-br.md`
- Exemplo aplicado: `examples/template-secoes-lp.md`

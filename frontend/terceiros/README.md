# frontend/terceiros

Skills de design de interface feitas por terceiros, copiadas para cá com licença e nota de origem. Ficam separadas das skills Totum para não misturar autoria e para poderem ser instaladas à parte (plugin `totum-design-terceiros`).

Origem: post do @RoundtableSpace no X ("10 repositórios para deixar o Claude Code e o Codex melhores em design"), recebido em 2026-10-27. Só entrou aqui o que é skill de verdade e tem licença que permite redistribuir. Bibliotecas de componentes e itens sem licença ficaram no catálogo [`../referencias/`](../referencias/README.md).

Regras desta pasta:

- Conteúdo original do autor, sem edição. Cada pasta tem `LICENSE` (cópia da licença do upstream) e `FONTE.md` (link, commit fixado, data).
- Para atualizar, copie de novo a partir do upstream e troque o commit no `FONTE.md`.
- A direção visual da Totum continua vindo de `brand/`, `frontend/analise-front-totum` e `frontend/totum-design-system`. Estas skills são apoio, não substituem o padrão da casa. Em projeto de cliente que já tem marca, a marca do cliente manda.

## Skills

| Skill | Origem | Licença | O que faz | Quando a Totum usa |
|---|---|---|---|---|
| [design-taste](design-taste/SKILL.md) | madebymustafa/design-taste | MIT | Núcleo do pacote: lê o briefing e escolhe uma direção de design de propósito, evitando a cara de template de IA | Início de qualquer landing ou site novo, antes de codar |
| [taste-landing-page](taste-landing-page/SKILL.md) | madebymustafa/design-taste | MIT | Estrutura e ritmo de landing page | LPs de cliente (ex.: CredPara) |
| [taste-typography](taste-typography/SKILL.md) | madebymustafa/design-taste | MIT | Escolha e escala tipográfica | Definir fontes e hierarquia |
| [taste-color](taste-color/SKILL.md) | madebymustafa/design-taste | MIT | Paleta e uso de cor | Montar ou revisar paleta |
| [taste-motion](taste-motion/SKILL.md) | madebymustafa/design-taste | MIT | Animação de interface com critério | Microinterações e entradas de seção |
| [taste-gsap](taste-gsap/SKILL.md) | madebymustafa/design-taste | MIT | Animação com GSAP e ScrollTrigger | Sites com scroll animado |
| [taste-design-system](taste-design-system/SKILL.md) | madebymustafa/design-taste | MIT | Tokens e componentes consistentes | Criar design system de cliente |
| [taste-brand-identity](taste-brand-identity/SKILL.md) | madebymustafa/design-taste | MIT | Traduzir marca em interface | Cliente novo sem guia visual |
| [taste-ux-copy](taste-ux-copy/SKILL.md) | madebymustafa/design-taste | MIT | Microcopy de interface | Botões, formulários, estados vazios (adaptar para pt-BR) |
| [taste-accessibility](taste-accessibility/SKILL.md) | madebymustafa/design-taste | MIT | Acessibilidade aplicada | Checagem antes de publicar |
| [taste-web-performance](taste-web-performance/SKILL.md) | madebymustafa/design-taste | MIT | Performance de front | Junto com o `go-live` |
| [taste-code-craft](taste-code-craft/SKILL.md) | madebymustafa/design-taste | MIT | Qualidade do código de UI | Durante a implementação |
| [taste-code-review](taste-code-review/SKILL.md) | madebymustafa/design-taste | MIT | Revisão de código de UI | Revisão antes de entregar |
| [taste-design-review](taste-design-review/SKILL.md) | madebymustafa/design-taste | MIT | Crítica visual de uma tela | Segunda opinião ao lado do `uiux-auditor` |
| [cinematic-motion](cinematic-motion/SKILL.md) | madebymustafa/design-taste | MIT | Gênero visual: movimento cinematográfico | Lançamentos e páginas de impacto |
| [corporate-trust](corporate-trust/SKILL.md) | madebymustafa/design-taste | MIT | Gênero visual: corporativo que passa confiança | Financeiro, crédito, saúde, jurídico |
| [quiet-luxury](quiet-luxury/SKILL.md) | madebymustafa/design-taste | MIT | Gênero visual: luxo discreto | Marcas premium |
| [editorial-minimal](editorial-minimal/SKILL.md) | madebymustafa/design-taste | MIT | Gênero visual: editorial minimalista | Conteúdo, portfólio |
| [japanese-minimal](japanese-minimal/SKILL.md) | madebymustafa/design-taste | MIT | Gênero visual: minimalismo japonês | Marcas de estética limpa |
| [dark-tech](dark-tech/SKILL.md) | madebymustafa/design-taste | MIT | Gênero visual: tech escuro | SaaS, IA, produtos Totum |
| [playful-color](playful-color/SKILL.md) | madebymustafa/design-taste | MIT | Gênero visual: colorido e divertido | Varejo, infantil, eventos |
| [neo-brutalism](neo-brutalism/SKILL.md) | madebymustafa/design-taste | MIT | Gênero visual: neobrutalismo | Marcas jovens e ousadas |
| [brutalist-industrial](brutalist-industrial/SKILL.md) | madebymustafa/design-taste | MIT | Gênero visual: brutalista industrial | Alternativa ao `totum-ui-brutalista` |
| [retro-print](retro-print/SKILL.md) | madebymustafa/design-taste | MIT | Gênero visual: retrô de impressão | Marcas com pegada vintage |
| [better-design](better-design/SKILL.md) | marvkr/better-design | MIT | Fluxo de trabalho que usa o MCP Better Design (31 design systems, tokens, princípios de UI, regras WCAG, revisão) | Só funciona com o MCP Better Design conectado (gera chave grátis no setup). Sem o MCP, a skill para e avisa |
| [superdesign](superdesign/SKILL.md) | superdesigndev/superdesign-skill | MIT | Gera e itera UI, apresentações e gráficos no canvas do superdesign.dev via `npx @superdesign/cli` | Explorar variações visuais rápido. Usa conta e créditos do superdesign.dev, então só com script aprovado |

## O que não entrou como skill (e por quê)

- `superdesigndev/superdesign`: é a extensão de IDE antiga (AGPL v3 com partes sob licença comercial) e não é mais mantida. O próprio README aponta para `superdesigndev/superdesign-skill`, que é a versão que está aqui.
- `.agents/skills/animate-text` dentro do better-design: é cópia de `pixel-point/animate-text`, que não declara licença. Não foi copiada.
- Bibliotecas de componentes do mesmo post: ver [`../referencias/README.md`](../referencias/README.md).

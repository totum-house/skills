# frontend/referencias

Catálogo de bibliotecas e ferramentas de design que não são skills (ou não podem ser copiadas). Aqui só ficam links e a avaliação. Nenhum código de terceiro foi copiado para esta pasta, com exceção dos exemplos de DESIGN.md em [`design-md/exemplos/`](design-md/exemplos/), que têm licença MIT.

- Skills de terceiros copiadas: [`../terceiros/`](../terceiros/README.md)
- Fontes de DESIGN.md (sites): [`design-md/`](design-md/README.md)

Dados verificados em 2026-10-27 pela API do GitHub. Estrelas arredondadas, datas no horário de Brasília.

## Bibliotecas de componentes, efeitos e animação (post do @RoundtableSpace)

| Item | Estrelas | Último push | Licença | O que é | Quando a Totum usa |
|---|---|---|---|---|---|
| [ui-layouts/uilayouts](https://github.com/ui-layouts/uilayouts) (o link `ui-layouts/ui-layouts` redireciona para cá) | 3,8 mil | 2026-08-23 | MIT | Biblioteca de componentes React, Tailwind e Motion com blocos prontos, efeitos e ferramentas de design ([ui-layouts.com](https://www.ui-layouts.com)) | Montar landing de cliente rápido com blocos criativos. Uma das mais úteis para LP |
| [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | 6,8 mil | 2026-09-28 | MIT | Kit de componentes animados com Motion e Tailwind, instalável via shadcn ([motion-primitives.com](https://motion-primitives.com)) | Microanimação em LP e dashboard sem escrever do zero. Uma das mais úteis para LP |
| [paper-design/shaders](https://github.com/paper-design/shaders) | 3,8 mil | 2026-10-27 | Apache 2.0 | Shaders de canvas sem dependência (mesh gradient, dot orbit etc.), npm `@paper-design/shaders-react` ([shaders.paper.design](https://shaders.paper.design)) | Fundo animado de hero. Versão 0.0.x, fixar a versão no `package.json` |
| [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | 5,1 mil | 2026-10-03 | MIT + Commons Clause | 35 componentes de canvas (fluido, shader, 3D em WebGL ou WebGPU) sobre HTML real, para React, Vue, Svelte e vanilla ([canvasui.dev](https://canvasui.dev)) | Hero de impacto. Commons Clause proíbe vender o componente em si; usar dentro do site do cliente é ok, revender como produto não |
| [Hyperiux-Immersion-Labs/hyperiux-components](https://github.com/Hyperiux-Immersion-Labs/hyperiux-components) (o link do post, `Hyperiux-Immersive/Hyperiux`, não existe; este é o repo real) | 100 | 2026-10-26 | CLI e MCP em MIT, efeitos grátis em MPL 2.0, efeitos Pro proprietários | Hyperiux Vault: 170+ efeitos de animação para Next.js (80+ grátis), instalados por `npx hyperiux add` com conta grátis | Efeitos imersivos em site institucional. Pro é pago, não assinar sem OK |
| [ui-layouts/cursify](https://github.com/ui-layouts/cursify) | 2,1 mil | 2026-03-31 | Sem licença | Animações de cursor para React e Next.js | Só como inspiração. Sem licença não dá para copiar código |
| [akaieuan/trickle-UI-kit](https://github.com/akaieuan/trickle-UI-kit) (o link do post, `akaieuan/trickle`, não existe; este é o repo real) | 50 | 2026-07-26 | MIT (demos em CC0) | 47 animações de texto em CSS puro para React, via registry shadcn ([tricklekit.dev](https://tricklekit.dev)) | Títulos animados leves, sem JavaScript no cliente |
| [marvkr/better-design](https://github.com/marvkr/better-design) | 540 | 2026-10-25 | MIT | MCP server com 31 design systems de marcas conhecidas, tokens, princípios de UI e regras WCAG, mais registry shadcn | A skill foi copiada para `../terceiros/better-design`. O MCP precisa ser instalado à parte |
| [madebymustafa/design-taste](https://github.com/madebymustafa/design-taste) | 200 | 2026-08-14 | MIT | 24 skills de gosto visual com demos antes e depois | Copiadas para `../terceiros/` |
| [superdesigndev/superdesign](https://github.com/superdesigndev/superdesign) | 7,5 mil | 2026-06-29 | AGPL v3 e partes comerciais | Extensão de IDE antiga, sem manutenção. O produto atual é o web app [superdesign.dev](https://www.superdesign.dev) e a skill [superdesigndev/superdesign-skill](https://github.com/superdesigndev/superdesign-skill) (MIT, 900 estrelas) | Skill copiada para `../terceiros/superdesign` |

## Sugestão de uso

Para LP de cliente, a combinação que mais rende: `design-taste` (direção) + `ui-layouts` ou `motion-primitives` (blocos) + um DESIGN.md de referência (ver `design-md/`). Shaders e canvas ficam para hero de impacto, com cuidado com performance no celular.

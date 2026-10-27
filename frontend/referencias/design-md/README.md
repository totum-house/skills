# DESIGN.md: fontes e exemplos

DESIGN.md é um arquivo Markdown que descreve o design system de um site (cores, tipografia, espaçamento, componentes, regras de uso) num formato que agente de IA lê bem. O padrão aberto é o [google-labs-code/design.md](https://github.com/google-labs-code/design.md) (Apache 2.0, 28 mil estrelas), usado também pelo Google Stitch. Na casa, a `frontend/estilo/totum-stitch-design` já gera DESIGN.md no padrão Totum, e a `frontend/design-system-extrator` extrai tokens de um site ao vivo.

Origem: post do @studio_yebisu no X, recebido em 2026-10-27. Sites abertos e verificados em 2026-10-27.

## Sites

| Site | O que oferece | Custo e licença | Quando a Totum usa |
|---|---|---|---|
| [styles.refero.design](https://styles.refero.design) | Biblioteca com 2.000+ estilos de sites reais, cada um com print, cores, tipografia, espaçamento e um DESIGN.md para Cursor, Claude Code, Codex, v0 ou Lovable | Navegação aberta. Licença dos arquivos não informada, preço do acesso completo não verificado | Achar direção visual para cliente e comparar estilos lado a lado |
| [designmd.me](https://designmd.me) | Cola uma URL e gera o DESIGN.md do site, com prévia em HTML e importação para o Figma. Também faz remix de design system | Por créditos (4 por spec, 8 multipágina), começa sem cartão. Gerador fechado | Extrair o design de um concorrente ou referência quando a `design-system-extrator` não der conta |
| [open-design.ai](https://open-design.ai) | OpenDesign: workspace de design com agente, alternativa aberta ao Claude Design. Faz protótipo, landing, dashboard, slides e vídeo HTML usando o seu próprio agente. Design systems ficam em `design-systems/<slug>/` com `DESIGN.md` e `tokens.css` | Código aberto em [nexu-io/open-design](https://github.com/nexu-io/open-design) (Apache 2.0, 104 mil estrelas). Tem planos pagos no site | Avaliar como alternativa de ferramenta de design para o Lab Design |
| [designmd.supply](https://designmd.supply) | Coleção de DESIGN.md gerados de marcas conhecidas (Apple, Stripe, Visa, PayPal, Coinbase, Linear, Notion e dezenas de outras), separados por setor. Gera para qualquer domínio | Grátis. Gerador aberto em [context-dot-dev/designmd-supply](https://github.com/context-dot-dev/designmd-supply) (MIT), usa APIs da Context.dev e o Vercel AI Gateway | Referência de marca por setor, por exemplo financeiro para a CredPara |
| [getdesign.md](https://getdesign.md) | Coleção de 550+ análises de design system de sites populares, no padrão do Google, com CLI `getdesign` | Grátis para a coleção pública. Conteúdo vem de [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT, 124 mil estrelas). Tem itens Pro e templates pagos | Fonte principal de exemplos. Dois deles estão em [`exemplos/`](exemplos/) |
| [aura.build](https://www.aura.build/design-systems) | Construtor de landing page com IA (exporta HTML e Figma) com galeria de DESIGN.md e gerador a partir de site ou template | Galeria pública grátis. Construtor tem plano pago. Licença dos arquivos não informada | Inspiração de LP e DESIGN.md pronto para colar no prompt |
| [neuform.ai](https://neuform.ai) | Gera landing pages em HTML, templates de remix e DESIGN.md reutilizável. Parece do mesmo ecossistema do Aura (os DESIGN.md do Aura citam templates da Neuform) | Biblioteca grátis para navegar. Gerar exige teste de 3 dias. Planos de US$ 12,50 a US$ 50 por mês (anual) | Só se o Lab Design quiser um gerador de LP. Não assinar sem OK |
| [design-md.hyperbrowser.ai](https://design-md.hyperbrowser.ai) | HyperDesign: cola uma URL e recebe o DESIGN.md no padrão do Google, a partir de print e CSS calculado num navegador real | App grátis, mas usa chaves próprias da Hyperbrowser e de um modelo pago. Código em [hyperbrowserai/hyperbrowser-app-examples](https://github.com/hyperbrowserai/hyperbrowser-app-examples) (README diz MIT, repo sem licença declarada) | Extração pontual. Custa centavos por site em API, então só com script aprovado |
| [typeui.sh](https://www.typeui.sh) | TypeUI: CLI aberto e registro de 48 "design skills" (pasta com SKILL.md e DESIGN.md). `npx typeui.sh pull <estilo>` instala no Cursor ou no Claude, `npx typeui.sh generate` cria uma nova | Grátis. Catálogo em [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) (MIT, 3,4 mil estrelas) | Estilos prontos para testar. Boa referência de estrutura de DESIGN.md |

Observação: typeui.sh e designmd.supply bloquearam a leitura automática (proteção da Vercel). As descrições deles vêm das páginas indexadas e dos repositórios no GitHub.

## Exemplos incluídos

Em [`exemplos/`](exemplos/), copiados de VoltAgent/awesome-design-md (MIT) no commit fixado do `exemplos/FONTE.md`. Escolhidos por serem do setor financeiro, útil para a CredPara:

- [`nerdwallet/DESIGN.md`](exemplos/nerdwallet/DESIGN.md): comparador de finanças pessoais
- [`mercury/DESIGN.md`](exemplos/mercury/DESIGN.md): banco digital para empresas

Esses arquivos descrevem a identidade visual de outras empresas. Servem para estudar estrutura, proporção e tom. Não use a identidade de outra marca num cliente: troque cores, fontes e logo pelos do cliente.

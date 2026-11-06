# Jev (TypeSafe): referências para agentes rápidos

Origem: post do @tranmautritam no X, recebido em 2026-10-27, com 10 repositórios em volta do Jev. Tudo verificado em 2026-10-27 (API do GitHub e documentação da Vercel). Nenhum modelo foi chamado e nenhum crédito foi gasto. Datas no horário de Brasília.

## O que é o Jev (confirmado)

O Jev existe. É o "System One model" da TypeSafe AI: em vez de escrever texto, ele recebe um estado (texto, JSON e, em modo experimental, imagem) mais perguntas tipadas e devolve probabilidades para cada resposta (escolha, nota ou sim e não). Serve para classificar, rotear, pontuar e verificar dentro de código, em centenas de milissegundos. Não gera prosa.

- No Vercel AI Gateway o ID é `typesafe-ai/jev` (versão fixa `typesafe-ai/jev-1.14.0`, disponível desde 2026-10-15). Preço listado: US$ 0,042 por 1 milhão de tokens de entrada, janela de 32 mil tokens. Fontes: [página do modelo](https://vercel.com/ai-gateway/models/jev), [docs de Decision](https://vercel.com/docs/ai-gateway/modalities/decision), [API TypeSafe no Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe).
- Chamada pelo AI SDK com `experimental_decide`, pela rota `POST https://ai-gateway.vercel.sh/v1/evaluate`, ou direto na TypeSafe (`https://api.typesafe.ai/v1/systemone`, ID `jev-latest`). Documentação: [docs.typesafe.ai](https://docs.typesafe.ai).
- O post acerta no essencial. Dois links estavam errados (ver tabela).

## Onde isso serve para a Totum

- Triagem e roteamento de lead no n8n e no Kommo: "esse lead quer simulação, renegociação ou é curioso?", com probabilidade e limite definido no fluxo. Custo de fração de centavo por decisão.
- Portão de automação: decidir se uma resposta do agente pode ir ao cliente ou precisa de revisão humana.
- Agente de navegador rápido (preencher formulário, checar site) usando o Jev para escolher o clique e um modelo de texto só quando precisa digitar.

Nada disso foi testado ainda. Qualquer teste usa chave paga (Gateway ou TypeSafe), então só com script aprovado pelo Rael.

## Repositórios

| Repositório | Estrelas | Último push | Licença | O que é de verdade | Para a Totum |
|---|---|---|---|---|---|
| [browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast) | 23,7 mil | 2026-09-29 | MIT | Agente de navegador em Python da Browser Use: o Jev escolhe a ação e o elemento numa tabela indexada da página, um LLM pequeno só escreve texto. Demo: Zurique para Londres no Google Flights em 7,1 s | Relevante. Base para agente de navegador barato e rápido |
| [TheoLeeCJ/SemIf-OpenJev](https://github.com/TheoLeeCJ/SemIf-OpenJev) (o link `TheoLeeCJ/openjev` redireciona para cá) | 4,9 mil | 2026-09-23 | MIT | SemIf, antes OpenJev: reproduz a interface do Jev com modelos abertos rodando em GPU caseira (3090) e demo em WebGPU no navegador. Projeto independente, sem ligação com a TypeSafe | Interessante para rodar decisões sem custo de API, mas exige GPU. Só estudo por enquanto |
| [vinnylarouge/jevlike](https://github.com/vinnylarouge/jevlike) | 1,4 mil | 2026-09-16 | MIT | Código para treinar um modelo pequeno no estilo Jev (escolhe entre opções num passe só), com demos de Doom e xadrez | Pesquisa. Não é ferramenta pronta |
| [awlevin/typesafe-computer-use](https://github.com/awlevin/typesafe-computer-use) | 1,3 mil | 2026-09-29 | MIT | Computer use no macOS (Windows experimental) por cerca de US$ 0,0002 por passo: lê a tela com OCR, o Jev escolhe a próxima ação, um modelo de texto só entra quando precisa escrever | Relevante se um dia rodarmos automação de desktop num Mac |
| [devagrawal09/jev-review](https://github.com/devagrawal09/jev-review) | 690 | 2026-09-16 | MIT | Revisão de código em etapas (diff ou base inteira) com painel local, usando o Jev para cada julgamento | Médio. Pode complementar a `revisao-totum` |
| [gargpratyush/jev-router](https://github.com/gargpratyush/jev-router) | 630 | 2026-09-19 | MIT | CLI que abre o Claude Code ou o Codex e usa o Jev para mandar cada pedido ao modelo rápido ou ao forte. Traz a skill `jev-explain`, que só roda o comando `jev-explain` da própria CLI | Médio. Pode economizar uso do Claude Code. A skill não foi copiada porque só funciona com a CLI instalada |
| [droidrun/mobile-jev](https://github.com/droidrun/mobile-jev) | 455 | 2026-09-17 | MIT | Agente para celular Android real via API da Mobilerun, com estúdio em React e CLI. Demo: pedido no Uber em 21 s e 9 ações. Precisa de chave da Mobilerun e da TypeSafe | Baixo agora. Útil se for automatizar app no celular |
| [Anil-matcha/awesome-jev-by-typesafe](https://github.com/Anil-matcha/awesome-jev-by-typesafe) | 2 | 2026-10-13 | MIT | Lista comunitária (não oficial) de casos de uso, padrões, prompts e código inicial para o Jev | Leitura para ideias de uso. Pouco adotada |
| [jarrodwatts/jev-trader](https://github.com/jarrodwatts/jev-trader) | 3,1 mil | 2026-10-13 | MIT | Robô de trade de cripto (MON-USDC na Monad) que pede ao Jev comprar ou vender a cada bloco | Não relevante. Robô de trade, não usar |
| `vlad-terin/jev-browser` | | | | Não encontrado no GitHub | Não incluído. Existem outros com nome parecido: [jkudish/jev-browser](https://github.com/jkudish/jev-browser), [Ying-Kai-Liao/jev-browser](https://github.com/Ying-Kai-Liao/jev-browser) e [wy-coliney/jev-browser-use](https://github.com/wy-coliney/jev-browser-use), não avaliados |

Nenhum destes repositórios virou skill aqui: são ferramentas e código, não skills de agente, e todos dependem de chave paga para funcionar.

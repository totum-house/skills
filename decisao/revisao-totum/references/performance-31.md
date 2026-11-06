# Checklist de performance: 31 correções (Rev 7)

Fonte: vídeo do TikTok @afcodehub, "Seu app feito com IA está lento? Peça estas 31 correções ao Claude Code" (1min47). O prompt da tela começa assim: "Claude, não quero que meu app feito com IA fique lento e perca usuários. Então, por favor".

Bucket indicado conforme a Regra de Ouro da revisao-totum. 🟢 é auto-fix quando o ajuste for local e claro. 🟡 vai para as perguntas. N/A é quando não se aplica ao stack.

| # | Correção | Bucket padrão |
|:--|:--|:--|
| 1 | Telas de carregamento skeleton | 🟢 |
| 2 | Imagens em WebP ou AVIF | 🟢 (assets do repo) |
| 3 | Evitar chamadas duplicadas à API | 🟢 (dedupe com React Query, mesma queryKey) |
| 4 | Debounce na busca e no autocomplete | 🟢 |
| 5 | Paginar resultados da API | 🟡 se mudar contrato da API, 🟢 se só a tela |
| 6 | Arquivos estáticos por CDN | 🟡 (infra) |
| 7 | Tarefas lentas em fila em segundo plano | 🟡 (arquitetura) |
| 8 | Corrigir consultas N+1 | 🟢 se fix local claro |
| 9 | Compressão Brotli ou GZIP | 🟡 (config de deploy) |
| 10 | Redis como cache dos dados mais acessados | 🟡 (infra) |
| 11 | Remover dependências não usadas | 🟢 |
| 12 | Timeout nas chamadas a APIs externas | 🟢 com valor conservador, 🟡 se mudar comportamento visível |
| 13 | Transmitir respostas de IA token por token | 🟡 (mudança de comportamento) |
| 14 | Atualização otimista da interface | 🟡 (comportamento) |
| 15 | Lazy load de imagens abaixo da dobra | 🟢 |
| 16 | Requisições independentes em paralelo | 🟢 |
| 17 | Índices no banco para consultas frequentes | 🟡 (migration) |
| 18 | Rastrear requisições lentas com OpenTelemetry | 🟡 (infra) |
| 19 | Servidores perto do banco | 🟡 (infra, só reportar) |
| 20 | Renderizar no servidor ou no build | 🟡 ou N/A em SPA Vite |
| 21 | Scripts de terceiros depois da página | 🟢 |
| 22 | Dividir o JavaScript por página (code splitting) | 🟢 com React.lazy por rota, respeitando a trava de diff |
| 23 | Virtualizar listas longas | 🟢 se lista isolada, 🟡 se mexer em drag and drop |
| 24 | Selecionar só as colunas necessárias | 🟢 quando o componente usa poucas colunas |
| 25 | Reutilizar conexões com o banco (pool) | 🟡 (infra) |
| 26 | Evitar renderizações desnecessárias | 🟢 (memo, useMemo, useCallback onde houver evidência) |
| 27 | Cache do navegador para estáticos | 🟡 (headers de deploy) |
| 28 | Distribuir tráfego entre instâncias | 🟡 (infra, só reportar) |
| 29 | Hospedar fontes e limitar pesos | 🟢 |
| 30 | Monitorar velocidade real (RUM, Web Vitals) | 🟡 (nova dependência ou serviço) |
| 31 | Testar em celular e rede lenta | 🟢 (medir com Lighthouse mobile e throttling, só relatar) |

Medição obrigatória: antes e depois de cada grupo, registrar tamanho do bundle (`vite build`), Lighthouse mobile da tela mais pesada e tempo das 3 consultas mais lentas. Sem número, não conta como melhoria.

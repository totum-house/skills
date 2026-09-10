---
name: revisao-totum
description: >-
  Revisão periódica autônoma de repositórios. Varre o projeto, conserta sozinho
  o que é claramente crítico e seguro, commita e pusha com trava de segurança,
  relata o que fez, e só então pergunta o que depende de decisão. Inclui
  checklist de engenharia avançada: padrões de backend (CQRS, idempotência, DLQ,
  rate limiting), arquitetura e CI/CD, aprovação de código gerado por IA (4
  testes obrigatórios: carga, cobertura ≥85%, complexidade ciclomática,
  dependências), e gestão de dependências entre módulos. Use SEMPRE que o usuário
  pedir "revisão periódica", "revisar o repo/projeto", "rodar a revisão",
  "revisao-totum", "clean up antes de subir", "auditar e consertar o que der",
  "passar o pente fino no código", "revisar e commitar o que for seguro", ou
  mencionar revisão recorrente de um projeto Totum. Acione também quando o usuário
  pedir auditoria de segurança/performance/arquitetura de um repo COM intenção de
  corrigir e versionar, não só relatar. Requer um agente com acesso real ao
  sistema (Claude Code, Cline, Cursor, Codex CLI).
---

# Revisão Totum — Revisão Periódica Autônoma

Você é webmaster e tech lead com 20 anos de estrada, rodando uma revisão recorrente em um repositório existente. Você é o último guardião antes do deploy. Tem acesso real ao sistema (ler arquivos, editar, terminal, git).

Esta skill existe para resolver uma tensão específica: o operador quer que você aja sozinho no que é claro e seguro, mas não quer que você quebre nada nem tome decisões de negócio sem ele. Todo o desenho abaixo serve a esse equilíbrio.

## Objetivo (uma única execução)

1. Varrer o projeto.
2. Corrigir sozinho o que é claramente crítico e seguro.
3. Corrigir sozinho o que é obviamente quebrado e seguro.
4. Commitar e pushar com trava de segurança.
5. Relatar o que foi feito.
6. Só então perguntar o que depende de decisão, e executar o restante em modo hands-off.

## ⚖️ Regra de Ouro (decide tudo)

Auto-corrigir **não** é decidido por gravidade. É decidido por: **CLARO + REVERSÍVEL + sem mudar comportamento ou regra de negócio.**

Esse é o ponto que a maioria erra. Um achado pode ser crítico (ex: política de RLS frouxa) e mesmo assim ir para a fila de PERGUNTAR, porque corrigir errado quebra acesso a dados em produção. Severidade alta com risco de correção alto = pergunta. Não confunda urgência com permissão.

## 🪣 Os três buckets

Classifique cada achado em um destes. Na dúvida entre 🟢 e 🟡, escolha 🟡. O custo de perguntar é baixo; o custo de um push errado é alto.

**🟢 AUTO-FIX SEGURO** — conserta agora, sem perguntar:
- lint, format, ordenação de imports, dead code, variáveis e código não usados
- dependências não utilizadas removidas (sem alterar versão das demais)
- estados de loading, erro e vazio faltando, com correção óbvia
- secret hardcoded movido para `.env` + referência no código (NÃO rotacione a chave; isso é 🟡)
- `.env` adicionado ao `.gitignore`; arquivo sensível removido do tracking
- alt text, labels de acessibilidade triviais, links internos quebrados
- N+1 óbvio com fix local claro; índice faltando óbvio em coluna de filtro ou join
- `try/catch` ausente em I/O, com mensagem amigável ao usuário
- typos, `console.log` esquecido, comentários de debug

**🔴 CRÍTICO E SEGURO** — conserta agora, prioridade máxima (mesmos critérios de segurança do 🟢):
- rota sem HTTPS forçado quando o resto do app já força
- output dinâmico não escapado, com fix local equivalente (XSS trivial)
- query sem prepared statement com substituição direta e equivalente

**🟡 PERGUNTAR** — nunca auto-fix; vai para a Fase 4:
- schema ou migrations de banco
- políticas RLS, auth, permissão, RBAC
- upgrade MAJOR de dependência
- qualquer coisa em pagamento ou financeiro
- deleção de arquivo ou dado
- rotação de secrets
- infra, CI/CD, Terraform, configs de deploy
- mudança de comportamento, regra de negócio, ou copy público
- qualquer coisa ambígua ou irreversível

## 🚧 Trava de orçamento de diff (segurança extra)

Mesmo que um fix seja 🟢, se ele sozinho tocar **mais de ~10 arquivos** ou **mais de ~400 linhas**, escale para 🟡. Um fix "óbvio" que vira refactor gigante não é mais óbvio. Reporte como pendência em vez de aplicar.

## 🔎 Escopo de varredura (cobertura completa)

Use os quatro domínios para não deixar buraco. Reporte só onde houver achado real, não item por item.

- **Segurança**: HTTPS/HSTS, senhas (Argon2id/bcrypt), injeção (SQL/XSS/CSRF/command), RLS, upload, secrets, RBAC, rate limiting.
- **Performance e escalabilidade**: índices, N+1, cache (front e back), assets, bundle, latência de queries, connection pool, load test.
- **Arquitetura e código**: separação de responsabilidades, hooks/efeitos, tipos, DRY, estado, tratamento de erro e UX (loading/erro/vazio), dependências circulares entre módulos.
- **Qualidade e manutenção**: testes (cobertura ≥85%, carga, complexidade ciclomática), clareza do código, auditoria de dependências, logs sem PII, backup/disaster recovery.
- **Processo e CI/CD**: branches protegidas, pipelines de build/test/deploy, ambientes isolados (dev/staging/prod), git flow respeitado.

---

## 🏗️ Checklist de Arquitetura e Processo (Rev 1)

Verifique antes de aprovar qualquer entrega significativa:

**Git Flow:**
- [ ] Branch de feature separada de `main`/`develop`; PRs com revisão antes de merge
- [ ] Commits com mensagem descritiva (conventional commits: `feat:`, `fix:`, `chore:`, etc.)
- [ ] Nenhum commit direto em `main` sem PR

**Ambientes:**
- [ ] Separação clara dev / staging / prod (configs, bancos, URLs distintos)
- [ ] Variáveis de ambiente por ambiente (`.env.development`, `.env.production`)
- [ ] Nenhum dado de produção acessível no ambiente de desenvolvimento

**CI/CD:**
- [ ] Pipeline automatizada: build → lint → testes → deploy (nessa ordem)
- [ ] Deploy em staging antes de produção
- [ ] Rollback documentado: como reverter um deploy com problema?

**Documentação de Arquitetura:**
- [ ] Existe `docs/arquitetura.md` ou equivalente no projeto?
- [ ] Diagrama de dependências entre módulos atualizado (Mermaid ou equivalente)?
- [ ] Tabela legível de dependências (qual módulo depende de qual)?
- Se não existe: reporte como pendência 🟡 (criar docs não é auto-fix)

---

## ⚙️ Padrões Avançados de Backend (Rev 2 + Rev 5)

Cheque estes padrões quando o projeto tiver backend com filas, eventos ou alta concorrência:

**Idempotência:**
- Operações críticas (pagamento, envio de e-mail, criação de registro) têm chave de idempotência?
- Re-execução da mesma operação produz o mesmo resultado sem duplicata?

**Race Condition:**
- Operações concorrentes no mesmo recurso usam lock, transaction ou UPSERT atômico?
- Atualização de saldo/quantidade usa `UPDATE ... WHERE` com condição, não read-then-write?

**CQRS (quando aplicável):**
- Leituras e escritas estão separadas? Queries de leitura não passam pela camada de comando?
- Eventos de domínio estão claros e nomeados (ex: `OrderPlaced`, `PaymentConfirmed`)?

**Outbox Pattern (para eventos assíncronos):**
- Eventos são gravados na mesma transação que o dado (outbox table)?
- Existe worker que processa o outbox e garante entrega ao broker?

**DLQ — Dead Letter Queue:**
- Filas de mensagem têm DLQ configurada?
- Mensagens na DLQ são monitoradas e têm processo de reprocessamento?

**Poison Message:**
- Mensagem que falha repetidamente vai para DLQ (não entra em loop infinito)?
- Existe limite de retentativas configurado?

**Rate Limiting:**
- Endpoints públicos ou de autenticação têm rate limit?
- Rate limit diferenciado por IP/usuário/plano?

**Timeout:**
- Chamadas a APIs externas têm timeout explícito definido?
- Timeout de banco de dados configurado (não ficar esperando indefinidamente)?

**Connection Pool:**
- Pool de conexões com banco configurado (não abre nova conexão por request)?
- Tamanho do pool adequado à carga esperada?

**Load Test:**
- Foi testado o comportamento sob carga (req/s esperado em pico)?
- Foram identificados gargalos antes de ir para produção?

**Blue-Green Deploy (quando aplicável):**
- Deploy sem downtime: duas versões paralelas, troca de tráfego gradual?

**Server-Sent Events / WebSocket:**
- Conexões longas têm timeout/heartbeat configurado?
- Cleanup de conexões mortas implementado?

---

## 🤖 Aprovação de Código Gerado por IA (Rev 4 + Rev 6)

**Os 4 testes obrigatórios antes de aprovar código gerado por IA:**

### 1. Teste de Carga
- O código aguenta o volume real de requests por segundo esperado?
- Rode um teste de carga básico (ex: `k6`, `artillery`, `ab`) antes de aprovar
- Se não há ferramenta disponível: documente como pendência 🟡

### 2. Cobertura de Testes ≥ 85%
- Verifique a cobertura atual: `npm run test:coverage` ou equivalente
- Abaixo de 85%: reporte como pendência 🟡 com lista dos arquivos descobertos
- A IA tende a gerar código sem testes — verifique sempre

### 3. Complexidade Ciclomática
- Funções com complexidade ciclomática alta (>10) são candidatas a refatoração
- Use ferramentas como `complexity-report`, ESLint com `complexity` rule, ou análise manual
- Código complexo gerado por IA é frequentemente sinal de prompt mal estruturado — reporte como 🟡

### 4. Estrutura de Dependências entre Módulos
- Existem dependências circulares? (A depende de B que depende de A)
- Algum módulo depende de "tudo"? (módulo god que importa de toda a base)
- Se sim: reporte como 🟡 — dependências circulares nunca são auto-fix
- Ferramenta: `madge`, `dependency-cruiser`, ou verificação manual de imports

**Regra geral para código de IA:** Se o código passou nos 4 testes → pode entrar no bucket 🟢/🔴. Se falhou em qualquer um → vai para 🟡, sempre.

---

## 🧭 Fluxo sequencial

Execute na ordem. Imprima `✅ [o que foi feito]` após cada passo concreto, para o operador acompanhar sem te interromper.

**Fase 0 — Recon (somente leitura, zero escrita)**
- Detecte: stack, gerenciador de pacotes, comando de build, comando de teste/lint, uso de BaaS (Supabase/Firebase), branch atual, existência de remote.
- Se build ou teste não forem detectáveis, pergunte UMA vez aqui (conta no limite de perguntas) ou assuma o padrão do stack e declare a suposição em voz alta.
- Saída: mapa de 1 tela com stack, comandos, branch e política de push.

**Fase 1 — Triage**
- Varra os quatro domínios + checklist de arquitetura/processo + padrões de backend.
- Classifique cada achado em 🔴 / 🟢 / 🟡 pela Regra de Ouro e pela trava de diff.
- Saída: tabela com colunas Achado | Domínio | Bucket | Fix proposto | Risco.

**Fase 2 — Execução autônoma**
- Aplique 🔴 primeiro, depois 🟢. Nunca toque na lista 🟡.
- Rode build + lint + testes após cada grupo lógico. Se quebrar, reverta aquele grupo e mova o item para 🟡 com nota explicando.
- Commits atômicos no padrão conventional commits (`fix:`, `chore:`, `perf:`, `refactor:`). Um commit por grupo coerente, mensagem descrevendo o porquê.

**Fase 3 — Commit/Push + Relatório**
- Gate de pré-push: só pusha se build E testes estiverem verdes.
- Push para branch de revisão `chore/revisao-AAAAMMDD`. NUNCA em main/master direto. NUNCA `--force`. Sem remote configurado: faça só commit local e avise.
- Emita o relatório no formato abaixo.

**Fase 4 — Perguntas → Hands-off**
- Junte TODA a fila 🟡 em um único bloco de perguntas numeradas. Cada pergunta traz: contexto, opções, e a SUA recomendação padrão.
- Espere uma única rodada de respostas.
- Depois execute tudo de uma vez em modo hands-off (corrige, testa, commita, pusha respeitando o gate verde), sem novas perguntas, exceto diante de um blocker real e irreversível. Emita o relatório final ao terminar.

## 🛑 Stop conditions (pare e pergunte antes de)

Deletar arquivo ou dado; mudar schema; mexer em RLS/auth/pagamento; upgrade major; push em main; `--force`; qualquer ação irreversível. Diante de qualquer uma, pare e pergunte mesmo que pareça óbvio.

## 📝 Formato do relatório

Use exatamente esta estrutura:

```
# Revisão Totum — [projeto] — [data]

## ✅ Feito sem perguntar (🔴 / 🟢)
| # | Achado | Fix aplicado | Commit | Evidência (build/teste) |

## 🟡 Pendências que dependem de você
[perguntas numeradas, cada uma com contexto + opções + recomendação]

## 📦 Estado do repo
Branch | Commits | Push status | Build/Testes

## 🏁 Go/No-Go
- [ ] Críticos seguros resolvidos
- [ ] Build e testes verdes
- [ ] Nada da lista 🟡 foi tocado sem autorização
- [ ] 4 testes IA aprovados (carga, cobertura, complexidade, dependências)
- [ ] Checklist de arquitetura e processo conferido
```

## Notas de execução

- Só mude o que foi pedido. Não refatore além do escopo, não adicione features, abstrações ou arquivos novos.
- Não invente comandos nem caminhos. Confirme antes de assumir.
- Esta skill controla um agente com acesso real ao sistema. Os buckets e as stop conditions são a sua cerca. Respeite-os mesmo sob pressão de "só dessa vez".

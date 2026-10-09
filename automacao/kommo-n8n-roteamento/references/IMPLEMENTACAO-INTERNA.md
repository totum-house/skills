# Implementação Kommo interna (API, ponte n8n, duplicatas, OpenClaw)

Conteúdo interno da Totum, vindo da versão 1.1 da `implementacao-kommo-gratuita`. **Não distribuir.** A versão pública da isca fica só com configuração pela interface.

## Tipos de entrega (sempre separar)

- configuração simples pela interface;
- auditoria somente leitura;
- automação n8n;
- correção operacional com mutação de dados;
- ações destrutivas ou irreversíveis.

Não prometer aumento de vendas. Declarar o que foi configurado, testado, bloqueado ou não confirmado.

## Pré-requisitos

1. Confirmar conta Kommo e subdomínio.
2. Confirmar o workspace n8n correto.
3. Confirmar que a credencial acessa a conta esperada com `GET /api/v4/account`.
4. Backup antes de editar workflows existentes.
5. Workflows novos inativos e em modo somente leitura.
6. Nunca pedir ou registrar senha, cookie, código OAuth ou token no chat.

## API oficial Kommo

Usar só endpoints da referência oficial. Inventário possível: conta; leads, contatos, empresas e vínculos; pipelines e etapas; usuários, funções e assinantes; campos personalizados e grupos; eventos, notas, tags e webhooks; fontes; Salesbots e métodos documentados; conversas e chats quando o escopo permitir.

A documentação oficial diz que métodos não descritos (inclusive descobertos por engenharia reversa) não são suportados. Não depender de endpoints internos da interface.

## n8n: MCP x API REST

No Cowork/Claude, o conector N8N (MCP oficial da instância) já cria, valida, testa, publica e executa workflows. Esta seção vale para agentes que usam a ponte MCP local (Hermes).

- A ponte local pode ser somente leitura. Para handoff completo precisa expor `create_workflow`, `update_workflow`, `execute_workflow` e ativação/desativação controladas.
- A ponte atual usa MCP SDK 1.x. Fixar `mcp>=1.0.0,<2.0.0`. Erro `Connection closed` com `mcp.server.fastmcp` costuma ser MCP 2.x instalado numa ponte 1.x: reinstalar com Python 3.10+ e MCP 1.x, validar com `py_compile` e `hermes mcp test n8n`.
- A API REST do n8n exige **API Key própria** no header `X-N8N-API-KEY`. O token do endpoint MCP HTTP não substitui essa chave.
- Validar com `GET https://n8n.grupototum.com/api/v1/workflows`. Sucesso real é HTTP 200; MCP conectado não prova que a API REST está autorizada.
- No campo de host de produção, usar só o host real. Nada de `@url:`, crases ou endereço local padrão. Para chamadas internas na própria VPS, `127.0.0.1`, nunca `localhost`.

## Ciclo de criação de workflows

1. listar workflows;
2. identificar ID, nome e status;
3. backup;
4. criar ou atualizar versão inativa;
5. testar manualmente;
6. revisar execução e falhas;
7. ativar só com aprovação explícita.

Auditoria inicial:

```text
Manual Trigger (e agendamento ligado aos MESMOS nós)
→ validar conta
→ pipelines e etapas
→ usuários e funções
→ fontes e campos
→ Salesbots e webhooks
→ leads, contatos e eventos com paginação
→ normalização de telefones e IDs
→ cruzamento de canal, responsável, pipeline e etapa
→ relatório de conflitos salvo em destino real
```

A primeira versão não altera leads, responsáveis, etapas, pipelines, contatos ou mensagens.

## Investigar encaminhamento errado

Para um número de triagem:

```text
nova conversa
→ localizar contato/lead por telefone
→ existe responsável válido?
   → sim: preservar
   → não: distribuir dentro da equipe correta
→ não redistribuir por mudança de pipeline ou etapa
```

Comparar estado antes e depois pelos eventos. Investigar: gatilho de nova conversa, criação de lead, movimentação de etapa, troca de responsável, mudança de pipeline, Round Robin, campos usados como condição, fallback para usuário padrão, loops e reentrada, webhooks e integrações externas, caixa de entrada e permissões compartilhadas.

Duplicata fragmenta histórico, mas sozinha não explica um vendedor ver a conversa de outro. Separar propriedade do lead, visibilidade da conversa e origem do canal.

## Arquitetura OpenWA / OpenClaw / Kommo

```text
WhatsApp/OpenWA
→ webhook/bridge
→ agente OpenClaw
→ MCP Kommo
→ busca por telefone
→ lead existente ou novo
→ pipeline e etapa
```

Tratar o canal externo como origem e a Kommo como espelho só quando isso estiver confirmado. Auditar automações nativas, bridge, MCP, coexistência do WhatsApp e workflows n8n. Validar ACK imediato, idempotência, normalização de telefone, timeout, retry e eventos duplicados. Instalação do MCP Kommo próprio: skill `conexao-agente-openclaw-kommo`.

## Duplicatas

Detectar por telefone normalizado, depois ID externo e e-mail. Classificar grupos por confiança. Exportar antes de qualquer merge e registrar: ID mestre, IDs absorvidos, responsável, pipeline e etapa, origem/campanha, tarefas, histórico, operador e horário.

Sem merge global sem backup, escolha de registro mestre e piloto. Trabalhar em lotes e revisar à mão registros ganhos, agendados, em negociação ou pós-venda.

## Critério de conclusão

1. conta e credencial confirmadas;
2. workflow criado/editado com ID verificável;
3. backup antes da edição;
4. execução com resultado real;
5. dados cruzados e relatório salvo;
6. alterações testadas no escopo autorizado;
7. limitações e itens não confirmados declarados.

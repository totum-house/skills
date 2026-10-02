---
name: conexao-agente-openclaw-kommo
description: "Conecta um agente OpenClaw a um CRM Kommo: WhatsApp por coexistência mais MCP para o agente ler e escrever no CRM. Use ao ligar um agente novo a uma conta Kommo ou ao consertar uma ponte quebrada."
---

# Conexão Agente OpenClaw + Kommo

Procedimento validado em produção para colocar um agente de IA do OpenClaw atendendo leads no WhatsApp, com as conversas espelhadas no Kommo para a equipe humana gerenciar.

## O princípio que define tudo

**O OpenWA é o canal. O Kommo é o espelho.**

O agente precisa de ferramentas via MCP. O OpenWA expõe MCP, o Kommo não. Por isso o número vive no OpenWA e o Kommo recebe cópia da conversa. Inverter isso (tentar fazer o Kommo ser o canal que chama a IA) é o erro que custa dias.

```
Lead no WhatsApp
      ↓
   OpenWA (instância própria)      ← canal único
      ↓
   Agente OpenClaw + MCP           ← cérebro com ferramentas
      ↓ responde ao lead
      ↓
      └→ coexistência sincroniza → conversa aparece no Kommo
                                          ↓
                                 equipe gerencia o lead

   Agente ──(MCP do Kommo)──→ consulta/cria/move lead no CRM
```

Uma conexão de WhatsApp só. Sem duplicidade de sessão, sem duplicata de conversa no inbox.

## Caminhos mortos: não gaste tempo neles de novo

| Caminho | Por que não serve |
|---|---|
| Salesbot com widget customizado | O botão "Gerar chave secreta" está quebrado na plataforma (zero requisições de rede ao clicar, confirmado por inspeção). Widget novo também não aparece no editor do Salesbot sem manifest declarando `salesbot_designer`. Já ticketado com o suporte. |
| Canal customizado amojo (Chats API) | Funciona, mas é desnecessário quando há coexistência: o espelho já vem de graça. Registrar canal exige chamado no suporte com 1 a 3 dias úteis de fila. Só vale como plano B se a coexistência não estiver disponível. |
| Agente de IA nativo do Kommo | Não aceita apontar o cérebro para endpoint externo. É a IA da Kommo consumindo créditos deles. A única ponte para lógica própria é "Start bot" (Salesbot), que está quebrado. |
| Templates pagos de n8n para Kommo | Usam webhook de entrada e HTTP Request na saída, batendo na amojo. Ou seja: você paga e ainda precisa do canal registrado. Não resolvem o gargalo. |
| Nodes da comunidade do Kommo no n8n | Cobrem só `/api/v4` (leads, contatos, empresas). Zero suporte a chats e conversas. Não conseguem injetar mensagem em conversa. |
| Migrar o número da Cloud API para Baileys | Destrutivo e desnecessário. A coexistência resolve sem tirar o número de lugar nenhum. |

## Parte 1: canal de WhatsApp por coexistência

A coexistência permite o **mesmo número** no app WhatsApp Business **e** na Cloud API ao mesmo tempo, com mensagens novas sincronizando nas duas direções. Isso é o que torna o desenho possível sem tocar na conexão que o cliente já tem.

Requisitos: app WhatsApp Business 2.24.17 ou superior, portfólio de negócios no Facebook, conta Kommo com acesso à Cloud API.

Passos:

1. Instalar o app WhatsApp Business num aparelho dedicado, com o número do agente
2. Ativar a coexistência (não remove o número da Cloud API, adiciona o app por cima)
3. Vincular o OpenWA como dispositivo companion, por QR code
4. Habilitar a conta do canal no `openclaw.json` (`channels.whatsapp.accounts.<nome>.enabled`)

O que NÃO muda: o número continua o mesmo, a conexão da Cloud API continua ativa, e a equipe continua vendo tudo no Kommo do jeito que já usava.

O que sincroniza: só mensagens novas. Histórico antigo não vem (a importação pega no máximo conversas ativas dos últimos 30 dias).

Antes de prometer prazo ao cliente, confirme que o acesso ao número está disponível. Ele costuma ser o único item do caminho crítico, e normalmente está com outra pessoa.

## Parte 2: MCP do Kommo

Implementação de referência funcionando: `/root/kommo-mcp` na VPS. Node 22, transporte `streamable-http`, mesmo padrão do MCP do OpenWA.

### Decisões de design que importam

**Domínio `.kommo.com`, nunca `.amocrm.ru`.** Implementações públicas que circulam por aí fixam o domínio russo no client e quebram silenciosamente em conta brasileira. Confira isso antes de reaproveitar qualquer código de terceiro.

**Normalizar telefone brasileiro é obrigatório.** O WhatsApp entrega `5533997091738`, mas o CRM pode ter salvo como `(33) 9709-1738`, sem o 55, ou sem o 9 do celular. Sem gerar variantes de busca, o agente não acha o lead e cria duplicata a cada conversa. Gere e teste: com e sem código de país, com e sem o 9 de celular, e os últimos 8 dígitos.

**Rate limit de 7 requisições por segundo**, que é o teto da API v4. Enfileire com intervalo mínimo, e garanta que uma falha não trave a fila inteira.

**Escopo enxuto de tools.** Nove tools cobrem o trabalho real de um agente de atendimento. Espelhar a API inteira só polui o contexto do agente e aumenta a chance de ele fazer besteira:

| Tool | Papel |
|---|---|
| `kommo_buscar_por_telefone` | primeira coisa quando chega mensagem |
| `kommo_ver_lead` | detalhes, etapa, valor, contatos |
| `kommo_pipelines` | descobrir IDs de funil e etapa |
| `kommo_criar_lead` | lead e contato numa operação (`/leads/complex`) |
| `kommo_mover_etapa` | avançar no funil |
| `kommo_atualizar_lead` | nome e valor |
| `kommo_adicionar_nota` | contexto para o time humano |
| `kommo_criar_tarefa` | passar o bastão para uma pessoa |
| `kommo_whoami` | confirmar em qual conta está operando |

Nas descrições das tools de escrita, deixe explícito que a ação é visível para a equipe comercial e afeta relatórios. Isso reduz muito o uso indevido.

**Bind em `127.0.0.1`.** O acesso vem do OpenClaw na mesma máquina. Autentique por header (`x-api-key`) com comparação em tempo constante, e não suba o servidor sem a chave definida.

### Token do Kommo

Na conta Kommo: Configurações → Central de integrações → botão **"+ CRIAR INTEGRAÇÃO"** no canto superior direito. Preencher nome, descrição e link de redirecionamento (campo obrigatório, não é usado de fato), marcar acesso total ou os escopos de Leads, Contatos e Tarefas. Depois de salvar, abrir a integração e ir na aba **"Chaves e escopos"**, onde fica o **token de longa duração**.

Desses valores, o MCP usa **somente o token de longa duração**. Chave secreta e código de autorização são do fluxo OAuth e não são necessários.

Nunca peça nem aceite o token colado no chat. Use:

```bash
read -s -p "Cole o token do Kommo e de Enter: " T && \
  sed -i "s|^KOMMO_TOKEN=.*|KOMMO_TOKEN=$T|" /root/kommo-mcp/.env && \
  unset T && echo "" && echo "token gravado"
```

Gere a chave do próprio MCP dentro do servidor, para ela nunca transitar: `echo "MCP_API_KEY=kmcp_$(openssl rand -hex 32)" >> .env`

Valide com um smoke test somente leitura antes de seguir. Ele deve confirmar a credencial, listar os funis com IDs e achar um contato por telefone.

## Parte 3: registrar no OpenClaw sem derrubar quem está atendendo

Use os comandos nativos, não edite o `openclaw.json` na mão. `openclaw mcp add` faz probe do servidor antes de salvar, então não grava config quebrada.

```bash
# 1. backup timestamped, sempre
F=/root/.openclaw/openclaw.json
cp "$F" "$F.bak-$(date +%Y%m%d-%H%M%S)-pre-kommo-mcp"
jq empty "$F"

# 2. add com probe
KEY=$(grep '^MCP_API_KEY=' /root/kommo-mcp/.env | cut -d= -f2)
openclaw mcp add kommo \
  --url http://127.0.0.1:2786/mcp \
  --transport streamable-http \
  --header "x-api-key=$KEY" \
  --connect-timeout 15 --timeout 45 \
  --include "kommo_whoami,kommo_pipelines,kommo_buscar_por_telefone,kommo_ver_lead,kommo_criar_lead,kommo_mover_etapa,kommo_atualizar_lead,kommo_adicionar_nota,kommo_criar_tarefa"

# 3. validar e aplicar SEM restart
jq empty "$F"
openclaw mcp reload
openclaw mcp probe
```

`openclaw mcp reload` descarta o cache de runtime e os agentes pegam a config nova no próximo turno. **Nunca reinicie `openclaw-gateway` ou `openclaw-node` para aplicar config de MCP**: eles servem todos os agentes da instância, e provavelmente algum está atendendo cliente real naquele instante.

Depois de aplicar, confirme: `openclaw mcp probe` deve listar o servidor com a contagem de tools, todos os serviços seguem `active`, e o log não tem erro novo.

## Checklist de validação

- [ ] `curl http://127.0.0.1:<porta>/health` responde
- [ ] requisição sem `x-api-key` devolve 401
- [ ] `initialize` e `tools/list` respondem pelo protocolo MCP
- [ ] uma chamada real de tool traz dado verdadeiro do CRM
- [ ] busca por telefone acha contato existente usando número em formato diferente do salvo
- [ ] `openclaw mcp probe` lista o servidor com a contagem certa de tools
- [ ] gateway, node e demais serviços continuam `active`, sem erro no log
- [ ] o agente usa a ferramenta num turno real (só confirma quando chega mensagem de verdade)

Não declare pronto antes do último item.

## Armadilhas que já custaram caro

**A interface do Kommo não colabora com automação de browser.** Cliques em áreas de configuração erram o alvo e atingem elementos vizinhos. Já causou desinstalação acidental de uma integração de WhatsApp em produção, com números reais de vendedores conectados. Navegue e leia à vontade, mas **qualquer clique na área de integrações instaladas deve ser feito pela pessoa**, não por automação. Se um modal não abrir depois de duas tentativas, pare e peça para a pessoa clicar.

**Confirme por onde o número está conectado antes de planejar.** Um número na Cloud API tem classificação de qualidade e nome de exibição no Business Manager. Um número em conexão não oficial não tem. Isso muda completamente o que dá para fazer com ele.

**Verifique o `bind` dos serviços.** É comum encontrar serviços internos escutando em `0.0.0.0` sem necessidade. Prefira `127.0.0.1` e confira o firewall para portas que precisam ficar expostas.

**Credenciais que passaram por chat estão queimadas.** Se acontecer, o combinado é seguir com elas até funcionar e depois gerar novas, descartando as antigas.

**Prova empírica vence documentação.** Vários pontos desse desenho não estão documentados (companion device com coexistência ativa, sincronização de mensagem enviada por companion). Testar numa conta interna antes de planejar em cima de suposição economiza dias.
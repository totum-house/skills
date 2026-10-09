# Erro OAuth2 do Kommo no n8n (community node n8n-nodes-kommo): causa raiz e correção

**Confirmado em 13/09/2026** no n8n self-hosted da VPS Nova (container `totum-n8n`, n8n 2.33.5, community node `n8n-nodes-kommo` v0.0.16, path `/home/node/.n8n/nodes`).

## Sintoma

Ao criar a credencial "Kommo OAuth2 API" no n8n e clicar em "Connect":
- A tela de consentimento da Kommo aparece normalmente (subdomínio, integração e conta corretos).
- Depois de clicar "Allow", o callback do n8n falha com `Error: HTTP status 400 / Failed to connect` ou, em tentativas subsequentes com popup/aba antiga ainda aberta, `Error: The OAuth callback state is invalid!`.
- Client ID, Client Secret, Subdomain e Redirect URL conferidos byte a byte (copiar/colar, não digitação manual): todos corretos.
- Variáveis de ambiente do container conferidas e corretas (`WEBHOOK_URL=https://n8n.grupototum.com/`, `N8N_PROTOCOL=https`, `N8N_HOST` certo): não é o bug clássico de `SERVICE_FQDN`/`SERVICE_URL` do Coolify.
- n8n estar "6 versões atrás" (alertado pela própria UI) **não é a causa**: o bug está no código do node, não no core do n8n.

## Causa raiz

Arquivo `dist/credentials/kommoOAuth2Api.credentials.js` do pacote `n8n-nodes-kommo` fixa (campo `hidden`, não editável na UI):

```js
{ displayName: 'Authentication', name: 'authentication', type: 'hidden', default: 'header' }
```

Isso força o n8n a mandar `client_id` e `client_secret` só via header `Authorization: Basic ...` na troca do `code` por `access_token`. O endpoint da Kommo (`https://{subdomain}.kommo.com/oauth2/access_token`) exige `client_id`, `client_secret`, `grant_type`, `code` e `redirect_uri` **no corpo (body)** da requisição: client_id/secret apenas no header não bastam, e a Kommo devolve HTTP 400 ("Incorrect data was transmitted").

Conferido no branch `main` do repositório do node no GitHub em 13/09/2026: o bug ainda está presente (não foi corrigido upstream até essa data).

## Correções possíveis (ordem de recomendação)

1. **Usar a credencial "Kommo Long Lived Token API" do mesmo node, em vez de OAuth2.** Sem popup, sem callback, sem esse bug: o node só manda `Authorization: Bearer <token>` direto. Gerar o token em Kommo → Integração → "Chaves e escopos" → "Gerar token de longa duração" (validade configurável, até 5 anos). Colar em "Long term API key" na credencial do n8n. **Esta foi a correção aplicada e testada com sucesso.**
2. **Patch manual no arquivo do node**, trocando `default: 'header'` por `default: 'body'` em `kommoOAuth2Api.credentials.js`, seguido de restart do container. Funciona, mas vive no volume `n8n_data`: se o pacote for reinstalado/atualizado, o patch some e o bug volta. Exige lembrar de reaplicar.
3. **HTTP Request node + credencial genérica "OAuth2 API"** com Authentication = Body (é o caminho oficial que a própria Kommo documenta para n8n Cloud). Não usa o node comunitário do Kommo, então perde as operações prontas (Get account info, etc.): só serve se for reescrever a integração via requisições HTTP cruas.

## Passo a passo da correção 1 (Long Lived Token), testada e funcionando

1. Em Kommo → Configurações → integração alvo → aba "Chaves e escopos" → "Gerar token de longa duração", escolher validade e confirmar.
2. Copiar o token (botão de copiar ao lado do campo: nunca digitar manualmente, o token é um JWT longo).
3. No n8n, criar credencial do tipo **Kommo Long Lived Token API** (não confundir com "Kommo OAuth2 API").
4. Preencher "Subdomain" (só o subdomínio, sem `.kommo.com`) e colar o token em "Long term API key".
5. Salvar: o n8n testa a conexão automaticamente contra `GET /api/v4/account`. "Connection tested successfully" confirma.
6. Testar com um node Kommo → Resource "Account" → Operation "Get info" → Execute step. Deve retornar os dados da conta (id, name, subdomain, country, currency) com sucesso.

## Armadilhas que custam tempo (automação de browser / uso geral)

- **Popup de OAuth só abre com clique real do usuário**: clique sintético de automação de browser é bloqueado por segurança. Se o popup de erro ficar aberto, ele trava qualquer `navigate` em outras abas do mesmo contexto até ser fechado manualmente.
- O erro "OAuth callback state is invalid" costuma aparecer quando sobra uma tentativa/popup antigo aberto enquanto se mexe em outra aba: não é lentidão do usuário nem problema de configuração, só refazer o fluxo do zero com o popup antigo fechado.
- No campo "URL de redirecionamento" da Kommo, atalhos de teclado (`cmd+a`, `Backspace`, `Home`, `End`) podem não responder de forma confiável via automação; setar o valor diretamente ou usar triple-click + digitar costuma funcionar. O botão "Salvar" pode parecer não fazer nada se o valor não mudou em relação ao que já estava persistido (é um no-op silencioso, não um bug).
- Nunca colar token/secret/authorization code em texto de chat: eles dão acesso total à API da conta. O caminho seguro é copiar e colar direto no campo do navegador (ou, em automação headless, ler o clipboard só dentro do próprio contexto de página via script, sem nunca expor o valor em texto).

## Contexto do caso original

- Conta: Autoescola Popular, subdomínio `populargvcrm`.
- Integração Kommo: "N8N Popular", ID `902a99ce-5615-4d08-a4dd-6e9252469b01`.
- Credencial final no n8n: "Kommo - Popular - Auditoria" (tipo Long Lived Token API).
- Workflow de teste: "Kommo Pop" (`/workflow/2tQbzooIn0h50S9f`).

---
name: "kommo-n8n-oauth-troubleshoot"
description: "Diagnostica e resolve falha de conexão Kommo no n8n (community node n8n-nodes-kommo) — erro OAuth2 HTTP 400 ou \"state invalid\", e configuração via Long Lived Token"
---

# Troubleshoot Kommo no n8n (n8n-nodes-kommo)

Use esta skill sempre que o usuário mencionar erro ao conectar Kommo no n8n, falha de OAuth2 pro Kommo (`HTTP status 400`, `The OAuth callback state is invalid`), ou pedir para configurar/testar uma credencial Kommo no n8n usando o community node `n8n-nodes-kommo`.

## Causa raiz conhecida (confirmada em 13/09/2026, node v0.0.16)

A credencial "Kommo OAuth2 API" desse node fixa `authentication: 'header'` no arquivo `dist/credentials/kommoOAuth2Api.credentials.js` (campo hidden, não editável na UI). Isso faz o n8n mandar `client_id`/`client_secret` só via header `Authorization: Basic` na troca do `code` por `access_token`. O endpoint da Kommo (`https://{subdomain}.kommo.com/oauth2/access_token`) exige esses dados **no body**, e devolve HTTP 400 ("Incorrect data was transmitted") quando faltam lá.

Esse bug está no branch `main` do repositório do node no GitHub (yatolstoy/n8n-nodes-kommo) — não é config errada do usuário, não é versão desatualizada do n8n, não é redirect URL errada. Antes de aceitar qualquer uma dessas explicações, confira Client ID/Secret/Redirect URL por copiar-e-colar (nunca digitação manual) e as env vars do container (`WEBHOOK_URL`, `N8N_PROTOCOL`, `N8N_HOST`) — se todas baterem e o erro persistir, é este bug.

"The OAuth callback state is invalid" especificamente costuma aparecer quando sobra um popup ou aba de tentativa anterior aberto enquanto se navega em outro lugar — não é o usuário demorando para clicar, é só repetir o fluxo Connect → Allow do zero com tudo fechado.

## Correção recomendada: Kommo Long Lived Token API

Em vez de depurar ou patchear o OAuth2, troque o tipo de credencial:

1. No Kommo: Configurações → integração alvo → aba "Chaves e escopos" → "Gerar token de longa duração" (definir validade, até 5 anos) → copiar o token pelo ícone de copiar (nunca digitar manualmente, é um JWT longo).
2. No n8n: criar credencial do tipo **Kommo Long Lived Token API** (não confundir com "Kommo OAuth2 API", que é a que tem o bug).
3. Preencher "Subdomain" (só o subdomínio, sem `.kommo.com") e colar o token em "Long term API key".
4. Salvar — o n8n testa automaticamente contra `GET /api/v4/account`. "Connection tested successfully" confirma que está certo.
5. Testar com um node Kommo → Resource "Account" → Operation "Get info" → Execute step, e conferir que os dados da conta batem com o esperado (id, name, subdomain, country, currency).

## Alternativas (se Long Lived Token não servir para o caso)

- **Patch manual**: trocar `default: 'header'` por `'body'` em `kommoOAuth2Api.credentials.js` dentro do container e reiniciar. Funciona, mas fica no volume `n8n_data` e some se o pacote for reinstalado/atualizado — documentar isso em algum runbook se for essa a rota escolhida.
- **HTTP Request node + credencial genérica "OAuth2 API"** com Authentication = Body: é o caminho oficial que a Kommo documenta para n8n Cloud, mas perde as operações prontas do node Kommo (Get account info, etc.) — só compensa se for reescrever a integração via requisições HTTP cruas.

## Segurança: nunca deixe token/secret passar por texto de chat

Token de longa duração, Client Secret e código de autorização dão acesso total à API da conta Kommo. Nunca peça para o usuário colar esses valores no chat, e nunca os repita de volta. Se precisar preencher um campo com um desses valores durante automação de navegador:

- Prefira que o próprio usuário copie e cole diretamente no campo (ele tem acesso direto ao navegador compartilhado).
- Se for necessário automatizar, leia o clipboard e preencha o campo com um script rodando dentro do contexto da própria página (ex.: `navigator.clipboard.readText()` + set direto no input), retornando só um booleano de sucesso — nunca o valor em si — para o resultado da chamada.
- Se o valor aparecer colado na mensagem do usuário por engano, avise que é sensível, não o repita, e trate como potencialmente exposto (sugerir regenerar depois).

## Armadilhas de automação de navegador (Claude in Chrome / browser pane)

- Popup de OAuth só abre com clique real do usuário — clique sintético é bloqueado. Um popup de erro deixado aberto trava `navigate` em outras abas do mesmo contexto até ser fechado manualmente (às vezes só o usuário consegue fechar esse tipo de popup).
- Campos de texto customizados (como "URL de redirecionamento" no Kommo) podem não responder a atalhos de teclado (`cmd+a`, `Backspace`) via automação; usar `form_input` (set direto de valor) ou triple-click + digitar costuma resolver.
- Um botão "Salvar" pode parecer não fazer nada se o valor não mudou em relação ao que já estava persistido — é um no-op silencioso, não um bug ou falha de clique.
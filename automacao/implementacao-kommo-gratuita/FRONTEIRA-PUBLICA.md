# Fronteira pública da isca

Este arquivo existe para impedir que futuras atualizações transformem uma isca gratuita numa cópia da operação interna.

## Pode entrar

- nomenclatura pública do Kommo;
- diagnóstico de sete perguntas;
- criação e ajuste de pipelines e etapas conforme o pedido;
- criação e ajuste de campos, tags, usuários, tarefas e motivos de perda;
- automações e integrações nativas pela interface;
- configuração pela interface;
- teste somente quando necessário e aprovado;
- checklist e validação visual;
- links para documentação oficial.

## Não pode entrar

- material copiado da skill interna de implementação;
- taxonomias, testes ou frameworks proprietários;
- diagnósticos extensos e catálogo de doenças;
- comandos de API, scripts ou payloads;
- números e limites aprendidos em produção, salvo documentação pública indispensável;
- auditoria, migração, deduplicação e rollback avançado;
- scoring, SLA, métricas, forecast e atribuição;
- receitas de automação;
- dados, IDs, URLs ou histórias identificáveis de clientes;
- nomes dos arquivos e módulos internos da Metrik;
- instruções para reconstruir a versão paga.

## Regra de revisão

Antes de distribuir uma nova versão, responder:

1. Um iniciante consegue obter uma vitória real?
2. A skill pode danificar uma conta viva?
3. Algum trecho veio de material interno em vez de fonte pública ou redação nova?
4. A versão gratuita está executando configurações pedidas, ou já começou a revelar consultoria e engenharia proprietárias?
5. O código `METRIK-ISCA-KOMMO-001` continua presente?

Se a resposta 2 ou 3 for “sim”, não publicar.

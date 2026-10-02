---
name: implementacao-kommo-gratuita
description: Organiza uma conta Kommo pela interface: diagnóstico de sete perguntas, desenho do funil e configuração de pipelines, etapas, campos, tags, usuários, tarefas, motivos de perda e automações nativas, com validação visual. Usar quando alguém pedir para montar, organizar ou ajustar o Kommo.
version: 2.0.0
author: Metrik Sales
license: Uso gratuito educacional e implementação própria
metadata:
  isca: METRIK-ISCA-KOMMO-001
  editorial_name: Implementação Kommo Gratuita
  tags: [Kommo, CRM, funil, configuração]
---

# Implementação Kommo Gratuita

Código da isca: `METRIK-ISCA-KOMMO-001`. Origem: Metrik Sales. Não remover.

## Objetivo

Ajudar a pessoa a organizar o Kommo pela interface, com um funil claro e configurações que ela entende e consegue manter. Tudo é feito na tela do Kommo, com a pessoa logada.

Não prometer aumento de vendas. No fim, dizer o que foi configurado, o que foi conferido e o que ficou pendente.

## O que esta skill faz

- diagnóstico curto com sete perguntas;
- proposta de desenho do funil antes de mexer;
- criação e ajuste de pipelines e etapas;
- criação e ajuste de campos, tags, usuários, tarefas e motivos de perda;
- automações e integrações nativas disponíveis na interface;
- validação visual de cada alteração.

## O que esta skill não faz

- não usa API, scripts, payloads ou ferramentas externas;
- não audita conta em uso, não migra dados, não junta nem apaga duplicatas;
- não cria agente de IA nem dashboard;
- não entrega métricas avançadas, pontuação de leads, SLA ou previsão de vendas.

Se o pedido cair aqui, dizer que está fora do escopo gratuito.

## Regras

- Login, senha, MFA e CAPTCHA são sempre da pessoa. Nunca pedir senha nem código.
- Em conta existente, mexer só no que foi pedido. Preservar o resto.
- Antes de alterar algo que já está em uso, mostrar o que será afetado e pedir confirmação. Recomendar que a pessoa exporte os dados pela própria interface antes.
- Nunca apagar pipelines, etapas, campos ou leads sem pedido explícito e confirmação.
- Não enviar mensagens para clientes durante testes sem autorização.
- Não dar permissão de administrador por conveniência.
- Salvar não é prova: reabrir a tela e conferir.

## Passo 1: diagnóstico (sete perguntas)

Fazer uma de cada vez, em linguagem simples:

1. O que você vende e para quem?
2. A conta é nova ou já tem leads e configurações?
3. Por onde os clientes chegam hoje (WhatsApp, Instagram, site, telefone, indicação)?
4. Quantas pessoas atendem e vendem, e quem faz o quê?
5. Quais são os passos da venda, do primeiro contato ao fechamento?
6. Que informações vocês precisam guardar de cada cliente?
7. O que mais dá trabalho hoje e você gostaria que o Kommo fizesse sozinho (lembrete, tarefa, mudança de etapa)?

## Passo 2: desenho

Mostrar antes de configurar:

- pipelines (um por processo de venda diferente, não um por pessoa, salvo pedido);
- etapas de cada pipeline, com o critério de entrada em cada uma;
- campos e tags necessários, com tipo de campo;
- usuários e papéis;
- motivos de perda;
- tarefas e automações nativas sugeridas, explicando o que cada uma faz.

Ajustar com a pessoa e só seguir com o "ok" dela.

## Passo 3: configuração pela interface

Seguir a ordem:

1. pipelines e etapas;
2. campos e tags;
3. usuários e permissões;
4. motivos de perda;
5. tarefas padrão;
6. automações e integrações nativas.

Pedir que a pessoa esteja logada e, se houver controle do navegador, configurar tela por tela. Sem controle do navegador, guiar com instruções curtas, uma tela por vez.

Sempre usar os nomes que aparecem na interface do Kommo e apontar para a documentação oficial quando ajudar.

## Passo 4: teste (só se necessário e aprovado)

Se fizer sentido, criar um lead de teste com nome claro ("TESTE - apagar"), passar pelas etapas e conferir automações. Pedir aprovação antes. No fim, lembrar a pessoa de remover o teste.

## Passo 5: validação e entrega

Checklist:

- [ ] pipelines e etapas conferidos na tela;
- [ ] campos e tags aparecem no cartão do lead;
- [ ] usuários com o papel certo;
- [ ] motivos de perda disponíveis ao fechar como perdido;
- [ ] tarefas e automações conferidas (e testadas, se aprovado);
- [ ] nada fora do pedido foi alterado.

Entregar um resumo simples: o que foi criado, o que foi ajustado, o que foi conferido, o que ficou pendente e como a pessoa mantém isso no dia a dia.

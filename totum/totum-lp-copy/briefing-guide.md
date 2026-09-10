# Briefing Guide (Guia interativo de coleta de contexto)

Roteiro de perguntas que a skill faz ao usuário ANTES de gerar qualquer copy. Cada pergunta tem propósito claro. Faça uma por vez ou em blocos pequenos. Nunca despeje tudo de uma vez.

## Regra de ouro

Se o usuário pular uma pergunta crítica, NÃO assuma resposta. Peça novamente, explicando por que aquela informação é necessária. Briefing furado gera copy genérica.

## Sequência das perguntas

### Bloco 1: O que está sendo vendido

**P1.** Em uma frase, o que essa LP precisa vender? (produto, serviço, captação de lead, agendamento, outro)

**P2.** Qual a promessa central? Complete: "Depois de comprar isso, o cliente vai conseguir _____."

**P3.** Qual a oferta concreta? (preço, condições, garantia, prazo de entrega, bônus se houver)

### Bloco 2: Quem compra

**P4.** Descreva o público em uma frase: profissão/cargo, faixa etária aproximada, contexto (B2B, B2C, local, nacional).

**P5.** Em que nível de consciência esse público está hoje sobre o problema que você resolve?
- (a) Inconsciente: nem sabe que tem o problema
- (b) Consciente do problema: sente a dor mas não procura solução
- (c) Consciente da solução: procura, comparando opções
- (d) Consciente do produto: já conhece sua marca, decidindo

**P6.** Qual o registro de voz que esse público usa pra FALAR sobre o problema?
- (a) Conversa direta (gírias, oralidade, WhatsApp)
- (b) Profissional próximo (sem gíria pesada, sem formalismo)
- (c) Executivo (formal, técnico, vocabulário corporativo)

### Bloco 3: A dor

**P7.** Qual a dor #1 que esse público sente HOJE? (não dor abstrata, dor concreta, com cenário específico)

Exemplo bom: "Toda segunda-feira ele abre a planilha de vendas e percebe que perdeu 3 leads da semana passada por falta de follow-up"

Exemplo ruim: "Falta de organização comercial"

**P8.** Quais as TOP 3 objeções que travam a compra desse público?
1. _____
2. _____
3. _____

### Bloco 4: A prova

**P9.** Que prova concreta você tem? Liste o que está em mãos AGORA (não o que seria bom ter):
- Depoimentos em vídeo: quantos?
- Depoimentos em texto: quantos?
- Cases com número específico (X virou Y em Z dias): quantos?
- Logos de clientes conhecidos: quantos?
- Reviews de plataforma terceira (Google, Reclame Aqui): quantos?
- Números agregados (X clientes atendidos, Y faturamento gerado): quais?

⚠️ Se a resposta for "nenhum", a skill avisa: "Sem prova, qualquer framework vira promessa vazia. Recomendamos colher pelo menos 3 depoimentos antes de subir a LP."

### Bloco 5: A ação desejada

**P10.** Qual a UMA ação que essa LP precisa gerar?
- (a) Cadastro/captura de lead
- (b) Compra direta
- (c) Agendamento de reunião
- (d) Início de teste grátis
- (e) Mensagem no WhatsApp
- (f) Outro: _____

**P11.** Tem urgência GENUÍNA aplicável? (vagas limitadas reais, prazo de oferta verdadeiro, sazonalidade real)
- Sim: qual?
- Não

⚠️ Se não houver urgência genuína, a skill avisa: "Vamos evitar urgência fake. Brasileiro detecta na hora e queima a credibilidade."

### Bloco 6: Contexto técnico

**P12.** Onde essa LP vai morar? (site próprio, Hotmart, RD Station, GreatPages, Framer, Webflow, outro)

**P13.** A LP vai receber tráfego de onde principalmente?
- (a) Anúncio Meta (frio)
- (b) Anúncio Google (intenção)
- (c) Email marketing (lista quente)
- (d) WhatsApp (contato direto)
- (e) Indicação orgânica (boca a boca)
- (f) Outro: _____

**P14.** Existe algum diferencial competitivo único que ninguém mais no seu mercado tem? (NÃO confundir com "qualidade", "atendimento bom", "preço justo" — isso todo mundo diz. Diferencial real é algo que SÓ você faz)

### Bloco 7: Calibragem fina (opcional, melhora muito)

**P15.** Existem 2 ou 3 LPs (suas ou de concorrentes) que você considera referência boa? Por quê?

**P16.** Existem 2 ou 3 LPs que você considera ruins? Por quê?

**P17.** Tem alguma palavra ou expressão que você NÃO quer ver na sua LP? (palavras-bandeira do mercado, jargão saturado, termos da concorrência)

**P18.** Existe alguma history específica da empresa que merece estar na LP? (como começou, por que criou esse serviço, momento de virada)

## Quando o usuário responde tudo

Antes de gerar a copy, devolva o briefing consolidado em formato estruturado, com a marca **"Briefing Lock — confirme antes de gerar"**. Use este template:

```
🔒 BRIEFING LOCK

PRODUTO/SERVIÇO: [P1]
PROMESSA CENTRAL: [P2]
OFERTA: [P3]
PÚBLICO: [P4]
NÍVEL DE CONSCIÊNCIA: [P5]
REGISTRO DE VOZ: [P6]
DOR PRINCIPAL: [P7]
OBJEÇÕES: [P8]
PROVA DISPONÍVEL: [P9]
CTA OBJETIVO: [P10]
URGÊNCIA GENUÍNA: [P11]
PLATAFORMA: [P12]
FONTE DE TRÁFEGO: [P13]
DIFERENCIAL ÚNICO: [P14]
REFERÊNCIAS BOAS: [P15]
REFERÊNCIAS RUINS: [P16]
PALAVRAS BANIDAS: [P17]
HISTÓRIA RELEVANTE: [P18]

ARQUITETURA DIHA:
Dado: _____
Implicação: _____
Hipótese: _____
Abordagem: _____ (framework escolhido + justificativa em 1 frase)

Confirma? Posso prosseguir pra geração?
```

Aguarde "sim/confirma/pode prosseguir" antes de gerar uma única palavra de copy.

## Atalho rápido (quando o usuário já manda contexto pronto)

Se o usuário enviar um bloco grande de contexto (proposta, transcrição, fluxo de vendas, briefing já estruturado), NÃO peça as 18 perguntas. Em vez disso:

1. Extraia o que conseguir mapear no template acima
2. Identifique os 3-5 itens que ficaram em branco
3. Pergunte SÓ esses, em uma mensagem só
4. Faça o Briefing Lock após resposta

Isso respeita o tempo do usuário e mostra que a skill leu o que ele mandou.

## Atalho ainda mais rápido (modo "tô com pressa")

Se o usuário disser "tô com pressa" ou "responde rápido", reduza para as 5 perguntas críticas:

1. O que vende, em uma frase
2. Pra quem vende, em uma frase
3. Qual a dor principal, com cenário concreto
4. Que prova você tem em mãos AGORA
5. Qual a ação única da LP

Faz o Briefing Lock só com essas 5 e segue.

## Erro mais comum no briefing

Usuário responde a P2 (promessa central) com FEATURE no lugar de TRANSFORMAÇÃO.

Errado: "É um software de CRM com automação"
Certo: "Depois de comprar, o cliente para de perder lead por falta de follow-up"

Se a resposta vier em formato de feature, refaça a pergunta com exemplo: "Não me diga O QUE é. Me diga O QUE MUDA na vida do cliente depois que ele compra."

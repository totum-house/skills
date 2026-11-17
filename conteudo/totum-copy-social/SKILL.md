---
name: totum-copy-social
description: >-
  Use quando precisar escrever legenda, gancho, CTA, bio, destaque, caixinha de
  stories ou adaptar a mesma peça para Instagram, TikTok e YouTube Shorts de um
  cliente do Totum Lab, com tom da marca e sem publicar. Não serve para roteiro
  de vídeo (totum-content-roteiro), calendário (totum-content-calendario) nem
  copy de LP (totum-lp-copy).
---
# Copy social por plataforma

v1.0, 06/11/2026. Base: checklist operacional do Lab Social (estratégia Feed Perfeito adaptada à casa), planos editoriais reais de clientes e regras comuns do Totum Lab. Esta skill escreve texto de social. Não publica, não agenda e não envia ao cliente.

## Quando usar

- Legenda de post, carrossel ou reels
- Gancho curto (capa, primeiras linhas, texto na tela)
- CTA, bio, destaques, caixinha de stories, resposta de DM de caixinha
- Adaptar a mesma peça para Instagram, TikTok e YouTube Shorts

Não use para:
- roteiro completo de vídeo ou carrossel slide a slide com fala (`totum-content-roteiro`)
- grade do mês (`totum-content-calendario`)
- sprint Explorar e Escalar (`totum-explorar-escalar`)
- copy de landing page (`totum-lp-copy`)
- peça visual (`totum-visual-codes` + `totum-design-peca` ou `totum-kv-camadas`)

## Entradas obrigatórias

Antes de escrever, confira:

| Entrada | Se faltar |
|---|---|
| Cliente e plataforma(s) | Pergunte |
| Tipo de peça (estático, carrossel, reels, story, bio, destaque) | Pergunte |
| Objetivo (alcance, conversa, prova, educação, oferta) | Pergunte |
| Tom de voz e bloqueios da marca (o que não pode dizer em público) | Leia o brand kit / livro de regras; se não houver, marque `[A CONFIRMAR]` |
| Fatos e números autorizados | Só entra o que tiver fonte; senão `[A CONFIRMAR]` |
| Copy ou roteiro já aprovado da peça (se existir) | Congela e não inventa slide novo |

Nunca invente depoimento, taxa, preço, região, número de clientes, CNPJ ou resultado. Sem fonte, escreve `[A CONFIRMAR]`.

## Regras de casa (texto)

1. pt-BR. Sem travessão (nem longo nem médio). Vírgula, ponto ou dois pontos.
2. Sem emoji, a menos que o brand kit do cliente peça ou o Rael autorize na peça.
3. Sem cara de IA: nada de "desbloqueie", "potencialize", "jornada", triplet oco, "não é só X, é Y" em série.
4. Marca vence tendência. Se a referência viral usa emoji, hashtag de cidade ou CTA público sensível, adapte ao kit.
5. Um CTA por peça, tirado da lista aprovada do cliente. Se a lista não existir, proponha 2 opções e marque `(copy sugerida)`.
6. Em nicho sensível (crédito, saúde, jurídico): nada de "comenta aqui" pedindo dado pessoal em público; prefira Direct, link na bio ou palavra neutra já aprovada.
7. Nada publicado, agendado ou enviado ao cliente sem OK explícito do Rael.

## Fluxo

### 1. Contexto em 5 linhas

Antes do texto, declare:

1. Cliente e plataforma
2. Tipo de peça e objetivo
3. Pilar editorial (se a pauta trouxe)
4. Fonte dos fatos usados
5. Bloqueios ativos (o que não pode aparecer)

Se faltar fato crítico, pare e liste o que está `[A CONFIRMAR]`. Não complete com chute.

### 2. Escolha o molde

| Peça | Molde |
|---|---|
| Legenda de reels / post | Gancho em 1 linha → corpo curto → CTA único |
| Carrossel | Legenda que completa os slides (não repete o slide 1 inteiro) + CTA |
| Bio | Especialização + prova conferível + CTA, até o limite da plataforma |
| Destaque | Nome curto + 1 frase do que o visitante encontra ali |
| Caixinha de stories | Pergunta respondível em poucas palavras + convite a responder |
| Resposta de DM (após caixinha) | Agradece → 1 pergunta de contexto → sem pitch na primeira resposta |

### 3. Escreva a versão principal (Instagram como padrão)

Entregue sempre:

1. **Gancho** (até ~8 palavras se for capa / texto na tela; 1 linha se for abertura de legenda)
2. **Corpo** da legenda
3. **CTA** único
4. **Hashtags** só se o kit liberar (quantidade e tipo). Sem liberação, seção vazia com nota "hashtags bloqueadas até OK"
5. **Texto na tela** (se for reels ou estático com tipografia), separado da legenda, fiel à copy aprovada

Dê **2 variações** (A recomendada, B ângulo diferente), não sinônimos.

### 4. Adapte por plataforma

A partir da versão Instagram, gere as outras só se pedidas:

| Plataforma | O que muda |
|---|---|
| Instagram feed / reels | Legenda pode ser um pouco mais longa; CTA para Direct ou link na bio |
| TikTok | Mais curto, primeiro segundo mais agressivo, menos institucional; hashtags só se liberadas |
| YouTube Shorts | Título curto + descrição; hashtags no fim da descrição se liberadas |
| Stories | Frases mínimas; caixinha com pergunta concreta |

Não reescreva o fato. Só ritmo, comprimento e CTA nativo da plataforma.

### 5. QA antes de mostrar

- [ ] Nenhum travessão
- [ ] Nenhum número ou prova sem fonte
- [ ] CTA único e alinhado ao objetivo
- [ ] Bloqueios da marca respeitados
- [ ] Variações A e B com ângulo real diferente
- [ ] Marcado `(copy sugerida)` se ainda não houve aprovação de pauta ou de fatos
- [ ] Nenhuma instrução de publicar ou agendar

### 6. Portão de aprovação

Mostre o pacote completo (contexto + A/B + adaptações) e pare.

- Para ir ao Lab Design / Editor: diga que a copy está pronta para arte ou gravação **depois** do OK do Rael.
- Para Notion, Drive do cliente, agendamento ou publicação: só com OK explícito do Rael, um canal por vez.

## Saída padrão

```
Contexto: ...
Fontes: ...
Bloqueios: ...

Variante A (recomendada)
Gancho: ...
Legenda: ...
CTA: ...
Texto na tela: ...
Hashtags: ...

Variante B
...

Adaptações: TikTok / Shorts / Stories (se pedidas)
Pendências: [A CONFIRMAR] ...
Próximo passo sugerido: aguardar OK do Rael / mandar ao Lab Design / etc.
```

## O que não fazer

- Não publicar, agendar nem mandar mensagem ao cliente
- Não inventar prova social, taxa, região ou depoimento
- Não encher de hashtag genérica
- Não transformar legenda em roteiro de vídeo
- Não copiar texto de concorrente; extrair só estrutura, se houver referência

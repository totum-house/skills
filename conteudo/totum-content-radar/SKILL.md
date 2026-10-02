---
name: "totum-content-radar"
description: "Mede desempenho de postagens em dois modos: posts próprios viram diagnóstico e decisão de corte, posts de terceiros viram candidatos a outlier para a pauta. Rodado pela Tigrinha de forma recorrente."
---

# Radar (G1 coleta + G6 leitura)

Medir post próprio e medir post de terceiro é a mesma operação. Muda só o que se faz com o resultado.

| Modo | Entrada | Saída |
| --- | --- | --- |
| **Interno** | Posts do cliente | Diagnóstico e decisão de matar, manter ou escalar |
| **Externo** | Perfis de referência | Candidatos a outlier, com fórmula extraída |

---

## O que precisa ser coletado, nos dois modos

| Campo | Obrigatório |
| --- | --- |
| Link do post | Sim |
| Views | Sim |
| Média de views do perfil | Sim, é ela que define outlier |
| Data | Sim |
| Retenção aos 3 segundos | Só no modo interno |
| Views de não seguidores | Só no modo interno |
| Conversas geradas | Só no modo interno |
| Transcrição | Sim no modo externo |

**A média do perfil é o campo que mais gente esquece e é o mais importante.** Sem ela não dá para dizer se um vídeo performou ou se o perfil é só grande.

## Divisão de trabalho, seja explícito sobre isso

| Tarefa | Quem |
| --- | --- |
| Abrir perfil, medir média, achar o post fora da curva | Tigrinha ou humano |
| Baixar o vídeo e transcrever | Tigrinha, ou Claude se o arquivo chegar em disco |
| Extrair a fórmula em 4 blocos | Claude |
| Diagnosticar curva de retenção | Claude |
| Decidir o que corta | Humano, com a recomendação pronta |

Claude não acessa Instagram nem TikTok logado. Se pedirem análise só com um link, diga isso e peça os dados.

---

## Modo externo: caça de outlier

**Rotina semanal**, 3 a 5 perfis de referência fixos: 2 do mesmo nicho, 1 de fora do país, 2 de agência ou concorrente.

1. Calcule a média de views dos últimos 10 posts do perfil
2. Marque o que estiver **acima de 3x a média**
3. Descarte se o perfil for grande e o post for só o mais visto: ali performou a fama, não a estrutura
4. Transcreva os 3 melhores
5. Extraia a fórmula em 4 blocos: gancho, dados e argumentos, re-hook, fechamento e CTA
6. Entregue o esqueleto com campos vazios

**Saída:** ficha por outlier com perfil, métrica que o qualifica, tipo de gancho, esqueleto e veredito de replicar, adaptar ou descartar.

---

## Modo interno: leitura de desempenho

**Três números por peça**, só esses: retenção aos 3s, percentual de views de não seguidores, conversas iniciadas. Curtida e alcance total não entram na decisão.

### Diagnóstico pela curva

| Curva | Causa | Correção |
| --- | --- | --- |
| Despenca nos 3 primeiros segundos | Gancho fraco | Dizer o resultado antes da explicação, trocar contexto por conflito |
| Cai no meio aos poucos | Enrolou | Mini gancho a cada 8 segundos |
| Cai no meio de uma vez | Resolveu rápido demais | Explicar por que importa antes de entregar a solução |
| Só cai no fim | CTA desconectado | Integrar o CTA no último movimento da fala |
| Quase reta | Vencedor | Double down |

### Cortes, aplicados sem discussão

- Retenção aos 3s abaixo de **25%**: o formato sai
- Menos de **40%** de views de não seguidores: o assunto sai
- **Zero conversa em 10 peças** do mesmo formato: o formato sai, mesmo que dê view

O último critério separa operação de negócio de perfil de creator. Formato que entretém e não gera conversa é custo. Aplique mesmo quando for o vídeo mais visto do mês, e diga isso com todas as letras.

### Trava de engate

Se uma peça passar de **3x a média do perfil**: pausar a fila por 24 horas, responder todos os comentários, considerar impulsionamento. Publicar por cima de um vídeo que está distribuindo é competir consigo mesmo.

### Double down

1. Isole o que funcionou: gancho, tema ou formato. Quase sempre é o gancho
2. Refaça trocando **uma variável por vez**
3. Rode 3 a 5 variações antes de considerar esgotado
4. Registre a estrutura no banco como vencedor próprio, que realimenta a pauta

---

## Relatório semanal

1. Tabela com uma linha por peça, os três números e o veredito
2. O padrão: o que os vencedores têm em comum, o que os perdedores têm em comum
3. No máximo três decisões, escritas como ação e não como observação
4. Outliers externos novos da semana
5. Acumulado de conversas do mês contra a meta

**Se o mês fechar com muito alcance e poucas conversas**, o problema não é volume de produção: é oferta, público ou nicho. Recomende voltar ao Briefing em vez de produzir mais.

## Tom

Direto e sem consolo. Semana ruim é semana ruim, com a causa mais provável apontada. Nunca recomende "continuar testando" sem definir o que muda no próximo teste.
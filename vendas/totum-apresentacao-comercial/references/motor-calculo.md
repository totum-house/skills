# Motor de cálculo

## Parâmetros padrão da Totum

| Parâmetro | Valor | Observação |
|---|---|---|
| CPL de referência | R$ 5 | Praça local, dor de alta identificação. Ajuste para cima em B2B ou ticket alto |
| Penalidade do mês 1 | +30% no CPL | Fase de aprendizado do algoritmo |
| Sazonalidade dezembro | +10% no CPM | Concorrência de varejo |
| Lead que engaja em conversa | 60% | Cai para 35 a 40% sem resposta imediata |
| Conversa que vira agendamento | 40% | |
| Comparecimento | 70% | |
| Fechamento de quem comparece | 45% | Confirme com o lead, é o número mais controlável dele |
| **Taxa ponta a ponta** | **7,56%** | 0,60 × 0,40 × 0,70 × 0,45 |
| Ganho com agente de IA | taxa vai a 9 ou 10% | Vem do salto na etapa de conversa |

Estes são pontos de partida. Se o lead tiver dado histórico próprio, o dado dele
sempre ganha do benchmark. Diga no modal qual dos dois você usou.

## Sequência

```
leads          = verba / CPL
conversas      = leads × 0,60
agendamentos   = conversas × 0,40
comparecimentos= agendamentos × 0,70
clientes       = comparecimentos × 0,45
receita        = clientes × ticket
CPA            = verba / clientes
ROAS midia     = receita / verba
ROAS total     = receita / (verba + fee Totum)
```

## Teto de capacidade, o passo que quase todo mundo esquece

```
capacidade teorica  = jornada diaria × dias uteis
capacidade real     = capacidade teorica × 0,70
                      (deslocamento, remarcacao, falta, intervalo)
clientes por unidade = capacidade real / consumo medio por cliente
teto de faturamento  = clientes por unidade × ticket × numero de unidades
```

**Sempre compare o resultado do funil com o teto de capacidade.**

Se o funil entrega mais que a capacidade, o gargalo não é mídia. Escreva isso com todas
as letras no slide de gargalos e no modal do funil. Gerar demanda que não pode ser
atendida produz fila, desistência e avaliação negativa, e o cliente vai culpar a agência.

Traduza a capacidade em dinheiro: "cada unidade adicional destrava R$ X por mês".
Essa frase transforma uma limitação em decisão de investimento do lead.

## Três cenários

Os cenários variam por **capacidade**, não por verba. Verba é consequência.

| Cenário | Estrutura | Verba | Taxa |
|---|---|---|---|
| Conservador | capacidade atual, sem mudança | fixa | sem melhoria |
| Moderado | +1 unidade de capacidade | escalando conforme ROAS | com agente de IA |
| Agressivo | +2 unidades, ou modelo de rede | escalando | com IA e canais paralelos |

Trave cada mês pelo menor entre o resultado do funil e o teto de capacidade.
Se o cenário conservador estabiliza cedo, isso é o argumento, não um defeito da projeção.

## Regras de honestidade

- Toda projeção leva rodapé de premissas e o que pode derrubá-la
- Cenário agressivo é potencial de mercado, nunca promessa de entrega
- Variável não confirmada aparece nomeada como hipótese, com o impacto de errar
- Nunca esconda o efeito do fee da Totum: mostre ROAS de mídia e ROAS total

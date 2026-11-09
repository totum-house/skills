# Nicho geral (qualquer outro nicho)

Use quando o cliente não é dermatologia, autoescola, odontologia nem curso. O objetivo é montar um módulo novo (`nicho-<nome>.md`) em 6 passos, sem inventar regra.

## Passo 1: classifique o arquétipo

| Arquétipo | Exemplos | O que pesa mais |
|---|---|---|
| Saúde regulada | fisioterapia, nutrição, psicologia, estética, veterinária | Norma do conselho, dado sensível, promessa de resultado |
| Educação | idiomas, reforço, escola, faculdade | Promessa de resultado, CDC art. 49, retenção, inadimplência |
| Serviço local recorrente | academia, pet, salão, barbearia, lavanderia | Frequência, recuperação de cliente, agenda cheia |
| Ticket alto, decisão única | imobiliária, advocacia, arquitetura, reforma, seguros | Qualificação, tempo de decisão, confiança, norma da categoria |
| Varejo e alimentação | loja, restaurante, bar, delivery | Preço, estoque, horário, recompra |
| B2B local | contabilidade, indústria pequena, representação | Decisor, ciclo longo, proposta, renovação |

## Passo 2: levante as 8 perguntas do nicho

1. Existe conselho ou norma de publicidade e de atendimento? Qual?
2. Quem decide a compra? Quem paga? Quem usa?
3. Qual o ciclo de decisão (minutos, dias, meses)?
4. O que o cliente final mais teme?
5. Qual a objeção mais comum?
6. O que gera recorrência ou indicação?
7. O que não pode ser dito de jeito nenhum?
8. O que pode ser automatizado e o que exige humano?

Se o cliente não souber, marque como **[H] a validar** e pergunte.

## Passo 3: mini-pesquisa (se houver internet)

- Busque a norma vigente de publicidade do conselho ou órgão do nicho (e ano da última alteração).
- Busque 2 ou 3 guias de atendimento do nicho e use só como **mapa de situações** (confiança [C]).
- Busque reclamações públicas (Reclame Aqui, Procon) para achar o que dá errado.
- Registre cada achado com confiança [A], [B], [C] ou [H] e data.
- Descarte fontes que contradigam o texto oficial.

## Passo 4: escolha as situações que mais importam

Da taxonomia de 17, marque as que pesam no nicho. Regra prática: priorize preço (3), falta (6), orçamento (8), objeção (9), cancelamento (14) e humano (17), que são as mais mal cobertas pelo mercado.

## Passo 5: escreva os guardrails do nicho

Três listas curtas:
- **Pode:** o que a norma ou o bom senso permite.
- **Nunca:** promessa, preço proibido, dado sensível, urgência falsa.
- **Escala para humano:** quando e para quem.

## Passo 6: salve como módulo

Crie `references/nicho-<nome>.md` com o mesmo formato dos outros: `Verificado em`, regras com confiança, situações específicas, 3 a 5 modelos de script e tabela `Revalidar`. Atualize a lista em `SKILL.md`, se houver.

## Pontos de atenção por arquétipo (ponto de partida, validar)

- **Saúde regulada:** vale a lógica de dermatologia e odontologia. Prometa processo, não desfecho. Cada conselho tem norma própria. Fisioterapia, por exemplo, é tratada na `totum-script-vendas` (Anexo E, COFFITO 532/2021); confirme a vigência antes de usar.
- **Advocacia:** a publicidade da categoria é regulada pela OAB. Não localizei o texto vigente nesta rodada [H]. Pesquisar antes de escrever qualquer script.
- **Educação:** reaproveite `nicho-cursos.md` (CDC art. 49, curso livre, retenção).
- **Imobiliária e ticket alto:** o desafio é qualificar rápido e manter follow-up longo sem pressão.
- **Serviço local recorrente:** foco em confirmação, falta, reativação e indicação.

## Regras que não mudam

- Esta skill escreve, não envia.
- Nada de dado, depoimento ou promessa inventados.
- Em dúvida sobre norma, avise e mande validar.

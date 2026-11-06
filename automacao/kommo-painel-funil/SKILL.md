---
name: kommo-painel-funil
description: Conta os leads por etapa dos funis de uma conta Kommo e publica o retrato num painel (artifact do tipo Dashboard), com renomeação de etapas, histórico de atualização e reagendamento em ciclo. Use quando o Rael pedir "painel do funil", "quantos leads em cada etapa", "atualizar o painel do Kommo", "acompanhar confirmados", "retrato do funil pro grupo", ou quiser acompanhar um lançamento/evento pelo Kommo em tempo quase real.
---

# Kommo: painel de funil por etapa

Gera e mantém um painel com a contagem de leads por etapa, para o Rael e o cliente acompanharem um lançamento sem abrir o Kommo.

## Parâmetros

| Parâmetro | Exemplo (Brasil Habilitado) |
|---|---|
| Conta Kommo | `brasilhabilitado33.kommo.com` |
| Funis | todos os funis ativos da conta |
| Renomear etapas | `Incoming leads` -> `Etapa de leads de entrada`; `113543679` -> `Presença confirmada (antiga)`; `113469663` -> `cadastro concluido (antiga)` |
| Painel | artifact do tipo Dashboard, dataset `etapas` |
| Intervalo | 30 min, pausa das 22h às 7h, até a data final do evento |
| Alerta | só em falha nova ou salto grande (ex.: +50 na etapa-chave) |

## Passo a passo

1. **Acesso.** Navegador interno, aba da conta Kommo logada. 401 = sessão expirada: avise o Rael uma vez e não repita o aviso nos ciclos seguintes até ele relogar.
2. **Contagem.** `GET /api/v4/leads/pipelines` para pegar funis e etapas. Para cada etapa, conte os leads (`GET /api/v4/leads?filter[statuses][0][pipeline_id]=..&filter[statuses][0][status_id]=..&limit=250`, paginando). Aplique as renomeações. Campo de atualização com data e hora em pt-BR.
3. **Gravação.** Monte o JSON (`funil`, `etapa`, `etapa_id`, `quantidade`, `atualizado_em`), faça upload do arquivo como asset do artifact e atualize o dataset (`source.url`, `updated.at`) usando o `if_version` atual do dataset.
4. **Comparação.** Compare com o último retrato. Avise o Rael só se houver falha nova ou salto acima do limite combinado.
5. **Ciclo.** Se for acompanhamento contínuo, agende a próxima rodada para dentro de 30 min nesta mesma conversa, respeitando a pausa noturna e a data final. Registre no texto do agendamento o último número da etapa-chave, para a próxima rodada comparar.

## Não fazer

- Não mover lead, não editar etapa, não alterar nada no Kommo: esta skill é somente leitura no Kommo.
- Não criar painel novo a cada rodada: atualize sempre o mesmo dataset.

# Perfil do cliente: Autoescola Popular (Kommo Pop)

Estado em 16/09/2026. Reconfirmar IDs e estados com o MCP antes de agir.

## Conta
- Subdomínio Kommo: `populargvcrm` (workspace Autoescola Popular)
- Account ID: 34959616
- Credencial node Kommo: "Kommo - Popular - Auditoria" (Long Lived Token API)
- Credencial HTTP: "Header Auth account" (nome genérico, confirmar que é da Popular e renomear para `Kommo - Popular - Header`)
- Integração Kommo: "N8N Popular"

## Workflows n8n (n8n.grupototum.com)
| Nome | ID | Estado em 16/09 | Observação |
|---|---|---|---|
| Kommo Pop — Auditoria Completa | 2tQbzooIn0h50S9f | Ativo, agendado 03h | Agendamento não aciona os nós HTTP; manual não aciona Tarefas; rascunho perdeu "03h" |
| Kommo Pop \| Roteador Central \| PRODUCAO BLOQUEADA | 38L1LiOD8SyfDpQD | Ativo | DRY RUN; sem acesso MCP |
| BACKUP 2026-09-16 \| Kommo Pop \| Roteador Central DRY RUN | IjrweTxa5AdUqZhA | Inativo | Backup |
| Kommo Pop — Roteador Central (DRY RUN) | cjsKRrNltNbpiQAU | Ativo | Versão anterior? Confirmar se ainda deve estar ativo |
| Kommo Pop — Correção de Leads (DRY RUN) | VSRyx2yzJnThA10U | Inativo | |
| Kommo Pop — Espelho Vendedor (CORREÇÃO AUTORIZADA) | Frbol75x0nFR8nr5 | Inativo | Muta dados |

Dois roteadores DRY RUN ativos ao mesmo tempo: confirmar se é intencional.

## Pipelines
| Pipeline | ID | Papel |
|---|---|---|
| Júlia Pop | 11685256 | Entrada (tráfego pago) |
| Heloisa Pop | 12746088 | Triagem |
| Érika | 11685903 | Vendedor |
| Débora | 11685891 | Vendedor |
| Rai Miranda | 11685895 | Vendedor |
| Rebeca Costa | 11685899 | Vendedor |
| Kathleen Moreira | 14267540 | Vendedor |
| Follow-up | 11728431 | Acompanhamento |
| Pós-Venda/Alunos | 13003472 | **Protegido** |

## Regras do cliente
- O número principal da Júlia recebe o tráfego pago. Para cada evento nesse número, checar o responsável existente; nunca redistribuir lead só por mudança de pipeline ou etapa.
- Hoje, leads entram em Júlia Pop e são movidos (espera de 5 min) para a sub-pipeline do vendedor responsável via gatilho "Alterar etapa lead"; o robô "Vendedor responsável" dispara na etapa de entrada. Essa é a automação a revisar na Fase 6.
- JSONs dos Salesbots: Google Drive da Totum, "9-Automação Popular > Automações Popular > Jsons Bots" (inclui "Orçamento Whatsapp Julia.json").

## Números da auditoria de 16/09 (03h, parcial)
- Leads 2.256, contatos 2.276, tarefas abertas 1.708 (1.683 vencidas; 1.033 do user 13604887).
- 108 grupos de telefone duplicado.
- Usuários, pipelines, campos, eventos: 0 (nós HTTP não rodaram no agendamento).

## Nomes para os 8 testes
- Número de entrada: Júlia
- Vendedores: Érika, Débora, Rai, Rebeca, Kathleen
- Protegido: Pós-Venda/Alunos

## Pendências
- Mapa `user_id → enum_id Vendedor → pipeline`: preencher a partir de `GET /users` e `GET /leads/custom_fields`.
- Dono de cada canal direto de vendedor: não documentado.

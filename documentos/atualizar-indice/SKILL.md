---
name: atualizar-indice
description: Atualiza o índice geral (00_INDICE_GERAL.md) de uma pasta de conhecimento, mantendo-o fiel à estrutura real de pastas e arquivos, aplicando só mudanças estruturais objetivas e deixando mudanças semânticas como sugestão pendente. Use quando o Rael pedir "atualizar o índice", "atualiza o 00_INDICE_GERAL", "índice do The Office", "mapear a pasta de novo", ou em rotina agendada de manutenção de índice de pasta do Cowork.
---

# Atualizar índice geral da pasta

Mantém `00_INDICE_GERAL.md` como mapa de navegação da pasta, sem reescrever documentos.

## Procedimento

1. **Varredura** da estrutura atual: pastas e arquivos novos relevantes, removidos, renomeados ou movidos, índices internos novos, mudanças de organização, áreas que mudaram muito de tamanho ou finalidade.
2. **Comparar** com o conteúdo atual de `00_INDICE_GERAL.md`.
3. **Atualizar só quando houver diferença real** de estrutura, classificação ou finalidade.
4. **Regras que sempre valem:**
   - nunca criar arquivo ou pasta com "V2";
   - não editar conteúdo de repositórios de código nem nada dentro de `.git/`;
   - não remover nem fundir históricos, handoffs ou documentos cronológicos;
   - ignorar caches, temporários, `.DS_Store`, `node_modules`, `.git` e semelhantes;
   - preservar índices internos existentes e seus caminhos;
   - não reescrever documentos só para atualizar o índice.
5. **Para cada área principal:** nome exato da pasta, descrição curta e factual, principais subpastas ou projetos, caminho do índice próprio quando existir.
6. **Metadados:** `ultima-atualizacao` (quando o conteúdo do índice mudou de fato), `ultima-varredura` (verificação mais recente), `total-areas`.
7. **Validar antes de salvar:** todos os caminhos citados existem; nenhuma área importante omitida; índices internos apontados existem; `total-areas` confere; nenhuma descrição afirma o que a estrutura não confirma; nenhum arquivo de código ou histórico foi alterado.
8. **Changelog:** registrar só mudanças estruturais relevantes, sem deixar o índice longo.

## Critério de decisão

- **Aplicar sozinho:** mudanças estruturais objetivas (criação, remoção, renomeação, movimentação de pastas).
- **Só sugerir:** mudanças semânticas (redefinir finalidade de área, fundir documentos, reorganizar históricos, apagar informação relevante). Preserve o índice e informe a sugestão pendente.
- **Nada mudou:** não mexa no conteúdo; só atualize `ultima-varredura` se o campo existir.

## Resposta final

Se o índice foi alterado; mudanças encontradas; mudanças aplicadas; pendências de aprovação; se a validação final passou.

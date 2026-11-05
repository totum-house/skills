---
name: teste-tres-caixas
description: >-
  Use para rodar um ciclo de QA em um app web com repositório (caixa branca,
  cinza e preta), em modo só leitura, e entregar um relatório único com achados
  por severidade e sugestão de correção.
---
# Teste em três caixas (QA só leitura)

## Regras
- Só leitura: não alterar código, não fazer commit, push, PR ou deploy, não criar, editar, mover ou apagar dados no app, não enviar mensagens a terceiros.
- Nunca imprimir senhas, chaves ou tokens; nunca abrir .env de produção.
- Ações de teste permitidas no app: navegar, buscar, abrir telas, exportar arquivos, iniciar uma conexão só para observar o erro (sem concluir integrações).

## Entrada
- Repositório e URL do app, conta de teste (via login salvo), roteiro do ciclo com valores esperados.

## Passos
1. Caixa branca: clonar o repo em pasta temporária, mapear estrutura, rotas, dependências (versões, lockfile, vulnerabilidades com o auditor do gerenciador), configuração e variáveis de ambiente esperadas (só nomes), checar build e lint e testes existentes sem alterar arquivos, e ler a lógica de cada fluxo do roteiro.
2. Caixa cinza: para cada fluxo, prever pelo código o comportamento esperado (consultas, filtros, limites, mensagens de erro) e listar o que conferir na tela.
3. Caixa preta: no navegador, executar o roteiro como usuário, medir tempos aproximados de carga, guardar prints e arquivos exportados, registrar erros de tela e divergências.
4. Cruzar: confrontar o observado com o previsto e com os valores esperados do roteiro.

## Saída
Relatório único com: resumo, ambiente e data, uma seção por caixa (branca, cinza, preta), tabela de achados com id, fluxo, descrição, evidência, severidade (crítica, alta, média, baixa) e sugestão de correção, e itens não testados com motivo.

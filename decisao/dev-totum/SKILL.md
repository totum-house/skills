---
name: dev-totum
description: >-
  Pipeline de desenvolvimento com portão duplo e classificador de tamanho:
  dimensiona a cerimônia pelo raio de explosão, delega cada fase à skill certa,
  e trava em dois pontos (depois do plano, antes do commit). Use SEMPRE que for
  escrever código de verdade num repositório Totum: nova feature, corrigir bug,
  mudar comportamento existente, refatorar, ou levantar MVP a partir de spec.
  Acione quando o usuário disser "implementa", "cria a feature", "conserta esse
  bug", "refatora isso", "monta o MVP", "muda o comportamento de", "dev-totum",
  ou entregar um documento de spec para virar código. NÃO usar para pergunta
  conceitual, leitura de código sem alteração, ou ajuste de uma linha óbvia.
license: MIT
---

# Dev Totum

Pipeline único para as cinco operações de desenvolvimento. A regra central:
**cerimônia acompanha raio de explosão**. A maioria dos erros de agente em
código vem de aplicar processo pesado em mudança trivial, ou processo nenhum
em mudança que derruba produção.

Carregue `soul-totum` antes se a sessão ainda não carregou, e mantenha
`guia-code` valendo o tempo todo.

## As cinco operações

| Operação | Quando | Primeiro movimento |
|---|---|---|
| **feature** | a capacidade não existe ainda | pesquisar e planejar uma fatia vertical |
| **ajuste** | funciona, mas o comportamento desejado é outro | alterar o comportamento **e os testes dele** |
| **defeito** | está quebrado, saída errada, erro, regressão | reproduzir como teste que falha, depois consertar |
| **refino** | comportamento igual, estrutura melhor | reestruturar mantendo os testes verdes |
| **mvp** | levantar do zero a partir de spec ou design | ler o doc, extrair escopo, fatiar |

Se estiver em dúvida entre **ajuste** e **feature**: se o usuário consegue
apontar a tela ou função que já faz aquilo, é ajuste.

## Passo 0: classificar tamanho (sempre roda)

Pontue nos três sinais e **pegue o maior nível que qualquer sinal alcançar**.
Declare o resultado em uma linha para o usuário poder derrubar sua avaliação.

| Nível | Arquivos | Dependência ou contrato novo | Ambiguidade de design | Fases |
|---|---|---|---|---|
| trivial | 1, poucas linhas | nenhuma | nenhuma, a mudança é óbvia | 4 → 5 → 6 |
| pequeno | 1 arquivo / 1 função | nenhuma | clara depois de ler o código | (2 leve) → 4 → 5 → 6 |
| padrão | 2 a 5 arquivos | talvez um módulo interno novo | uma escolha real a fazer | 1 → 2 → 4 → 5 → 6 |
| grande | muitos, transversal | dep externa, API pública, ou spec | várias perguntas em aberto | 1 → 2 → 3 → 4 → 5 → 6 |

**Desempate:** qualquer coisa que toque um gatilho de segurança (lista abaixo),
uma API pública, ou banco de dados em produção é **no mínimo padrão**,
independente da contagem de arquivos.

Exemplo de declaração: `Tamanho: padrão (3 arquivos, decisão de cache a tomar).
Rodando pesquisa, plano, TDD, review, commit.`

## As fases

Cada fase **delega**. Não faça o trabalho da fase inline.

- **1. Pesquisa e reuso.** Antes de escrever código novo, procurar
  implementação pronta e confiável: docs oficiais da lib, repositório de
  referência, registry do pacote. Adotar solução provada vence inventar.
  Delegue pesquisa densa para `hermione`.
- **2. Plano.** Produza uma lista de tarefas em fatias verticais finas, cada
  uma entregando algo verificável. → **PORTÃO 1.**
- **3. Esqueleto.** Só em **mvp**: levantar a primeira fatia ponta a ponta.
- **4. Implementação.** Uma tarefa por vez. Para **defeito**, o teste que
  reproduz vem antes do conserto, sempre. Vermelho → verde → limpar.
- **5. Review.** Rodar `revisao-totum` no diff. Se tocou gatilho de segurança,
  o passo de segurança é obrigatório, não opcional.
- **6. Commit.** Conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`),
  um por bloco lógico. → **PORTÃO 2.**

Rodar `verificar-totum` antes de declarar qualquer coisa pronta.

## Os dois portões

Este pipeline é **travado, não autônomo**. Entre os portões, flui sem parar.

1. **PORTÃO 1, depois do plano.** Apresentar a lista de tarefas. Não escrever
   código de implementação antes do usuário aprovar.
2. **PORTÃO 2, antes do commit.** Apresentar resumo do diff e as mensagens
   propostas. Não commitar antes da confirmação.

Exceção única: em nível **trivial** os dois portões viram um só, no fim.

Se o usuário disser explicitamente "manda ver sem me perguntar", troque os
portões por um relatório no fim, e registre no relatório que os portões foram
dispensados a pedido.

## Gatilho de segurança

Puxe revisão de segurança quando o diff tocar qualquer um destes:
autenticação, autorização, RLS ou permissão, entrada de usuário, query de
banco, caminho de sistema de arquivos, chamada de API externa, criptografia,
segredo ou credencial, upload de arquivo, webhook público.

No contexto Totum, acrescente: qualquer coisa que leia ou escreva no vault do
Sentinela, qualquer mudança em config de produção do OpenClaw, e qualquer
alteração de policy no Supabase.

## Artefatos de passagem

O pipeline não carrega estado escondido. O plano **é** a passagem de bastão:

- A lista de tarefas do passo 2 dirige o loop de implementação.
- Trabalho grande também gera doc em `docs/` do próprio repo.
- Achado CRÍTICO ou ALTO do review precisa estar resolvido antes do portão 2.

## Verificação desta skill

- O nível de tamanho foi declarado em voz alta e bateu com o trabalho real.
- Portão 1 e portão 2 foram honrados, ou a dispensa foi registrada.
- Revisão de segurança rodou se, e somente se, um gatilho foi tocado.
- Commits são convencionais e escopados a uma mudança lógica cada.
- Comportamento novo ou alterado tem teste cobrindo.

---

*Estrutura de pipeline com classificador de tamanho e portão duplo derivada da
família orch-* do projeto ECC (affaan-m/ecc, MIT), adaptada ao stack e às
regras de casa do Grupo Totum.*

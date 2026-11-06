---
name: totum-calendario-notion
description: >-
  Use quando for montar ou refazer o planejamento de social media de um cliente
  no Notion no molde oficial da casa (CENTRAL DE CONTEÚDOS / CLIENTES / INFO /
  EDITORIAIS), com database de calendário, convenção de nomes das peças e
  template de corpo. Acione ao ouvir "faça igual à referência", "calendário
  editorial no Notion", "planejamento social no Notion" ou ao entregar a grade
  do mês para a equipe/cliente.
---

# Calendário Notion (molde Totum)

v1.0, 06/11/2026. Transforma uma grade de peças (temas, datas, formatos, legendas)
na estrutura de Notion que a social media da Totum entrega para a equipe e para o cliente.
Calibrado na referência enviada pelo Rael em 23/10/2026 e aplicado no calendário Totum nov/2026.

Não decide o que falar nem o ritmo do mês. Para isso use `totum-content-calendario`
(grade lógica) ou `totum-explorar-escalar` (sprint de crescimento). Esta skill só
monta o **formato de entrega no Notion**.

## Relação com outras skills

| Skill | Papel |
|---|---|
| `totum-content-calendario` | Decide dia, ordem e táticas a partir de temas aprovados. |
| `totum-explorar-escalar` | Plano de 30 dias explore/exploit. |
| `totum-auditoria-instagram` / `feed-perfeito` | Diagnóstico e briefing de feed; o resultado pode virar linhas neste calendário. |
| `totum-content-roteiro` | Roteiro de uma peça; o texto vai no corpo da linha do Notion. |

## Premissas

1. Nada é publicado, postado ou enviado ao cliente sem OK do Rael.
2. Não invente depoimento, número, CNPJ, telefone ou prova social.
3. Copy da casa: sem travessão e sem emoji (mesmo que a referência antiga use emoji).
4. Só adicione páginas e linhas. Não apague o histórico de meses anteriores.
5. Escreva em pt-BR, direto.

## Hierarquia

```
CENTRAL DE CONTEÚDOS                 (página do teamspace)
└── CLIENTES                         (database inline, view Galeria)
    └── <NOME DO CLIENTE EM CAIXA ALTA>
        ├── ▸ INFO                   (toggle H2) → subpágina BACKLOG
        ├── ▸ GUIA DE STORIES        (opcional)
        ├── ▸ CAMPANHAS              (opcional)
        ├── ▸ GRAVAÇÃO dd/mm         (opcional)
        └── ▸ EDITORIAIS             (toggle H2)
              └── Calendário Editorial <Mês>/<aa>
```

Cada "Calendário Editorial <Mês>/<aa>" tem capa do cliente (sem ícone) e um
database inline com o nome do cliente. O mês novo é um duplicado do mês anterior:
o database carrega peças antigas e a view Calendar abre no mês corrente. Sem filtro por mês.

## Database CLIENTES

| Propriedade | Tipo | Uso |
|---|---|---|
| Name | title | Nome do cliente em CAIXA ALTA |
| Tags | multi_select | Só quando fizer sentido (ex.: Ecossistema) |

View: Galeria, card list, capa = capa da página, ordenada por Name.

## Database do calendário (dentro da página do mês)

Nome do database = nome do cliente em caixa normal.

| Propriedade | Tipo | Opções |
|---|---|---|
| Name | title | Convenção abaixo |
| Date | date | Só data, sem horário |
| Tags | multi_select (1 valor) | A Fazer (gray), Postado (green), Pendente (yellow), Gravar (red) |

View única: Calendar view por Date, ordenada por Date crescente.

Significado das Tags:
- A Fazer: planejada, arte/legenda por produzir
- Gravar: depende de gravação do cliente
- Pendente: aguarda aprovação ou material
- Postado: publicado

## Convenção de Name

- Carrossel: `(Carrossel) <frase do slide 1>`
- Post estático: a própria headline, sem prefixo
- Reels: `Reels`, `Reels Trend`, `Reels <tema>` ou `Reels <pessoa>: <tema>`
- Depoimento: `Prova Social`, `Depoimento` ou `Depoimento em vídeo`
- Especiais: `(Caixinha de perguntas) <pergunta>`; data comemorativa `dd/mm Nome`; quadro recorrente `#Nome <tema>`

## Corpo da peça

Texto corrido, sem títulos, sem tabelas, sem checklist de aprovação.
Aprovação é pela Tag, não pelo corpo. Linguagem de briefing para designer/editor.

**Carrossel**
```
SLIDE 02
<texto>
SLIDE 03
<texto>
...
(CTA do último slide)
---
Legenda:
<parágrafos>
```
O SLIDE 01 é o título (Name). Não repetir.

**Post estático**
```
<texto de apoio da arte>
---
Legenda:
<parágrafos>
```

**Reels**
```
Referência: <link>          (se trend)
Formato: <nota>             (opcional)
"<fala 1>"
(Texto na tela: X | tempo)  (quando houver)
"<fala 2>"
(nota de gravação)
---
Legenda:
<parágrafos>
```

**Prova social:** só nota entre parênteses e, se houver, a legenda.

Multiplataforma (padrão Totum): depois da legenda do Instagram, blocos
`Legenda TikTok:` e `YouTube Shorts:` (Título, Descrição, Hashtags) no mesmo estilo.
Metadados de estratégia (pilar, objetivo, plataformas) ficam numa tabela no BACKLOG, não na peça.

## Checklist — cliente novo ou mês novo

1. Em CLIENTES, criar (ou achar) a linha com o nome em CAIXA ALTA.
2. No corpo: toggle INFO + subpágina BACKLOG; toggle EDITORIAIS.
3. Criar (ou duplicar) "Calendário Editorial <Mês>/<aa>" com capa e database inline.
4. Uma linha por peça: Name pela convenção, Date, Tag inicial (A Fazer ou Gravar).
5. Preencher o corpo pelo template.
6. No BACKLOG: links de Drive, tabela de metadados se precisar, pendências.
7. Mostrar o link da página do mês ao Rael. Nada vai ao cliente sem OK dele.

## O que não fazer

- Não inventar estrutura paralela (feed view, propriedades Formato/Ordem) — isso é exceção de um cliente antigo, não o padrão.
- Não misturar pauta estratégica dentro do corpo da peça.
- Não apagar meses anteriores ao criar o mês novo; duplicar.
- Não publicar nem mudar Tag para Postado sem confirmação de publicação real.

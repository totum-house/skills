# Formato de planejamento de social media no Notion (molde Totum)

Fonte: referência enviada pelo Rael em 23/10/2026
(https://app.notion.com/p/2e21afff87a381d1b63fca8ee5e61234?v=2e21afff87a381838724000c3090243f).
Ela fica num workspace do Notion diferente do conectado aqui ("Totum Labs"), então foi lida pela
versão pública da página (só leitura). Clientes estudados: Autoescola Popular, Autoescola Pontual,
Derma, BR Tur, Dra. Gabriele Vilela, Josélia Sahtler, Cláudia Fisioterapeuta, Upixel, We Move On Demand.
Itens lidos por dentro: mais de 30 (Popular set/26, Derma set e out/26, BR Tur set e out/26).

## 1. Hierarquia

```
CENTRAL DE CONTEÚDOS                      (página de teamspace)
└── CLIENTES                              (database inline, view Galeria)
    └── <NOME DO CLIENTE EM CAIXA ALTA>   (1 linha = 1 cliente, é uma página)
        ├── ▸ INFO          (toggle heading H2)
        │     └── BACKLOG   (subpágina: links de Drive e menções)
        ├── ▸ GUIA DE STORIES (opcional, toggle H2) └── GUIA DE STORIES | <campanha>
        ├── ▸ CAMPANHAS     (opcional, toggle H2)   └── <MÊS> | <CAMPANHA>
        ├── ▸ GRAVAÇÃO dd/mm (opcional, toggle H2)  └── MATERIAL
        └── ▸ EDITORIAIS    (toggle H2)
              ├── Calendário Editorial Maio/26
              ├── Calendário Editorial Junho/26
              └── ...           (1 subpágina por mês, em ordem cronológica)
```

Cada "Calendário Editorial <Mês>/<aa>" tem:
- capa (cover) com foto/arte do cliente (ex.: capa-derma.jpg, pop.jpg), sem ícone;
- um database inline com o nome do cliente (ex.: "Autoescola Popular", "Derma", "Br Tur");
- nada mais (às vezes um parágrafo vazio no fim).

Na prática o mês novo é um duplicado do mês anterior: o database do mês novo carrega as peças
dos meses anteriores e o calendário abre no mês corrente. Não há filtro por mês na view.

## 2. Database CLIENTES

| Propriedade | Tipo | Opções |
|---|---|---|
| Name | title | nome do cliente em caixa alta (ex.: AUTOESCOLA POPULAR, BR TUR, DERMA) |
| Tags | multi_select | Ecossistema (green). Só a Cláudia Fisioterapeuta usa hoje |

View: Galeria (gallery), card layout "list", capa = capa da página, tamanho pequeno,
ícone da página visível, abre em center peek, ordenada por Name crescente. Só o título aparece no card.
Há 2 template pages vazias no database.

## 3. Database do calendário (1 por cliente, dentro da página do mês)

Nome do database: nome do cliente em caixa normal (ex.: "Autoescola Popular").

| Propriedade | Tipo | Opções e cores |
|---|---|---|
| Name | title | nome da peça (ver convenção abaixo) |
| Date | date | só data, sem horário |
| Tags | multi_select (usada como status, 1 valor por peça) | A Fazer (gray), Postado (green), Pendente (yellow), Gravar (red; em Derma e Dra. Gabriele está brown) |

Observações:
- BR Tur não tem a opção Gravar. Popular usa "A Fazer" com F maiúsculo; os outros "A fazer".
- Exceção: Cláudia Fisioterapeuta usa outro desenho (database "Conteúdos:", view feed, propriedades
  Formato multi_select [Estático purple, Carrossel orange, Vídeo green] e Ordem number). Não é o padrão.

View: uma só, "Calendar view" (calendar), calendário pela Date, ordenada por Date crescente.
Nenhuma propriedade extra no card além do título. Sem filtro.

Significado prático das Tags:
- A Fazer: peça planejada, arte ou legenda por produzir.
- Gravar: vídeo que depende de gravação do cliente.
- Pendente: aguardando algo (aprovação ou material).
- Postado: publicado.

## 4. Convenção de nome das peças (Name)

- Carrossel: `(Carrossel) <frase do slide 1>`. Ex.: "(Carrossel) 3 verdades que ninguém te conta sobre o medo de dirigir".
- Post estático: a própria headline da arte, sem prefixo. Ex.: "Desacelere. Seu bem maior é a vida".
- Reels: `Reels`, `Reels Trend`, `Reels <tema>` ou `Reels <pessoa>: <tema>`. Ex.: "Reels Josélia: Medo de dirigir".
- Depoimento: `Prova Social` ou `Depoimento` ou `Depoimento em vídeo` (repetido quantas vezes precisar).
- Formatos especiais entre parênteses: `(Caixinha de perguntas) <pergunta>`; datas comemorativas com a data: `09/08 Dia dos Pais`; quadros recorrentes com hashtag: `#POPCast <tema>`.

## 5. Corpo de cada peça (template)

Texto corrido em parágrafos simples, sem títulos, sem tabelas, sem checklist de aprovação.
Linguagem direta, de briefing para o designer ou editor, sem metadados (pilar, objetivo,
plataforma não aparecem). A aprovação é feita pela Tag, não no corpo.

Carrossel:
```
SLIDE 02
<texto do slide>          (cada slide = 1 parágrafo, "SLIDE NN" + quebra de linha + texto)
SLIDE 03
...
SLIDE NN
<CTA do último slide>
(nota de produção entre parênteses, se houver)
---                       (divider)
Legenda:
<parágrafos da legenda, um por bloco>
```
O SLIDE 01 normalmente não é repetido: é o título da peça. Às vezes aparece uma linha de
contexto antes dos slides (ex.: "Versão Dermato").

Post estático:
```
<texto de apoio da arte: subtítulo, selo, telefone, CTA da arte>
---
Legenda:
<parágrafos>
```

Reels:
```
Referência: <link do Reels de referência>        (quando é trend)
Formato: <tela verde, etc.>                       (opcional)
Roteiro:                                          (opcional; às vezes as falas vêm direto)
“<fala 1>”                                        (cada fala entre aspas curvas, 1 bloco por fala)
“<fala 2>”
(nota de gravação entre parênteses, ex.: "(Se possível, gravar com o Dr. Thiago)")
---
Legenda:
<parágrafos>
```

Prova Social: só uma nota entre parênteses, ex.: "(Vídeo depoimento de aprovado)" ou "(Depoimentos)",
e às vezes a legenda.

Peças ainda não roteirizadas: instrução curta em texto (ex.: "Dermato na Farmácia / Versão: corpo. /
Indique produtos para: ...") ou só a referência.

Estilo das legendas na referência: 2 a 5 parágrafos curtos, dor ou situação concreta no início,
solução do cliente no meio, CTA no fim (comenta PALAVRA, link na bio, telefone). Usa 1 emoji no fim.
Não usa hashtags.

## 6. BACKLOG (dentro de INFO)

Lista simples de links: pastas do Drive de entregas e fotos (ex.: "Entregas Popular/Pontual",
"Fotos Novas Carro Automático + CNH do Brasil") e menções a outras páginas.

## 7. Como aplicar a um cliente novo (checklist)

1. Em CLIENTES, criar a linha com o nome em caixa alta.
2. No corpo: toggle H2 "INFO" com a subpágina BACKLOG; toggle H2 "EDITORIAIS" com a subpágina
   "Calendário Editorial <Mês>/<aa>". Outros toggles (CAMPANHAS, GUIA DE STORIES, GRAVAÇÃO) só se houver.
3. Na página do mês: capa do cliente e database inline com o nome do cliente,
   propriedades Name, Date, Tags (A Fazer gray, Postado green, Pendente yellow, Gravar red), view "Calendar view" por Date.
4. Uma linha por peça, nome pela convenção da seção 4, Date sem horário, Tag "A Fazer" (ou "Gravar" para vídeo do cliente).
5. Corpo pelo template da seção 5.
6. No mês seguinte: duplicar a página do mês e renomear.

## 8. Adaptações da casa Totum (quando o cliente pedir, ou para a própria Totum)

- Regra da casa: sem travessão e sem emoji na copy, mesmo que a referência use emoji.
- Multiplataforma: depois da legenda do Instagram, blocos "Legenda TikTok:" e "YouTube Shorts:"
  (Título, Descrição, Hashtags) no mesmo estilo "Rótulo:".
- Roteiro com texto de tela: cada fala “...” seguida de quebra de linha e "(Texto na tela: X | tempo)".
- Notas internas (ganchos alternativos, pendências de aprovação, CTA de peça não roteirizada) vão
  entre parênteses, como as notas de gravação da referência.
- Metadados de estratégia (pilar, objetivo, plataformas, CTA) ficam numa tabela no BACKLOG, não nas peças.

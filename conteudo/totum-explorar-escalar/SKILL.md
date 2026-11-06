---
name: "totum-explorar-escalar"
description: "Monta um sprint de conteúdo de 30 dias para um cliente no método Explorar e Escalar (explore/exploit): testa formatos, escala o vencedor e transforma virais em carrossel. Pergunta o cliente, levanta o contexto que já existe, faz até 15 perguntas só sobre lacunas e entrega o planejamento com temas, argumentos e esqueletos de roteiro em tópicos, separando o que o agente faz do que o humano faz. Use quando pedirem \"explorar e escalar\", \"sprint de 30 dias\", \"plano de crescimento no Instagram/TikTok\", \"estratégia dos 100 mil seguidores\", \"testar formatos e escalar\" ou planejamento de crescimento acelerado de perfil para um cliente."
---

# Explorar e Escalar (sprint de 30 dias)

Você conduz o planejamento de um sprint de conteúdo de 30 dias para um cliente da Totum. O método vem da teoria de decisão (dilema exploração e exploração, ou *explore/exploit*): primeiro gasta volume para descobrir o que funciona, depois concentra tudo no que venceu.

| Fase | Dias | Nome | O que acontece |
| --- | --- | --- | --- |
| 1 | 1 a 10 | Explorar | Volume alto, dois formatos de vídeo em rodízio (tela dividida e dualidade) mais carrosséis |
| 2 | 11 a 20 | Escalar | Só o formato vencedor. Dentro dele, testa tipo de gancho e timer na tela |
| 3 | 21 a 30 | Potencializar | Assuntos vencedores em novos ângulos e virais convertidos em carrossel |

Os conceitos, com o grau de evidência de cada um, estão em `references/conceitos.md`. Leia antes de montar o plano.

---

## Três regras que não se quebram

**1. Não presumir nada.** Tudo o que entra no plano tem origem marcada:

| Etiqueta | Significa |
| --- | --- |
| `[cliente]` | O cliente ou o Rael disse, ou está num arquivo/memória dele |
| `[dado: fonte]` | Veio de pesquisa, com o link ou o nome do arquivo |
| `[hipótese]` | Raciocínio sem dado direto. Precisa virar teste ou ser confirmado |
| `[A CONFIRMAR]` | Faltou informação. Nunca preencha com chute |

Número de cliente, resultado, preço, depoimento ou nome de pessoa só entra com `[cliente]`. Se não tem, escreve `[A CONFIRMAR]`.

**2. Não escrever roteiro.** A saída por peça é **tema, argumento e esqueleto em tópicos curtos** (até 8 palavras por tópico). Nada de fala pronta, teleprompter ou legenda final. Se pedirem roteiro, ofereça a `totum-content-roteiro` como próximo passo separado, só se o humano pedir.

**3. Toda etapa diz quem faz.** Agente (Claude ou Tigrinha) e Humano, em colunas separadas. Quando uma etapa depende de acesso que o agente não tem, pare e diga, em vez de entregar análise baseada em suposição.

O que o agente **não** acessa: Instagram e TikTok logados (busca interna, insights, média de views), Google Meu Negócio sem conector, DMs e comentários do cliente. Isso é Tigrinha ou humano.

---

## Fechamento de toda etapa

Ao terminar **qualquer** etapa abaixo, sempre:

1. Diga em até 2 linhas o que saiu
2. Dê 1 ou 2 sugestões proativas concretas (o que melhoraria o resultado ou adiantaria a próxima fase)
3. Pergunte se quer seguir para a próxima etapa, nomeando qual é. Use `AskUserQuestion` quando existir, com a próxima etapa como primeira opção

Nunca avance de etapa sem essa confirmação, exceto em sessão agendada sem ninguém olhando: aí siga, e registre no topo do plano a leitura que foi feita.

---

## Etapa 1. Qual cliente

Pergunte para qual cliente é o sprint. Só isso. Não comece pesquisa antes da resposta.

## Etapa 2. Levantar o contexto que já existe

Procure em todas as fontes disponíveis na sessão, nesta ordem, e anote o que achou em cada uma:

| Fonte | Como | Quem |
| --- | --- | --- |
| Memória | `memory_list` e ler o arquivo do cliente (aliases contam) | Agente |
| Projeto claude.ai | `project_search` pelo nome do cliente | Agente |
| Pastas conectadas | Buscar pasta ou arquivos com o nome do cliente (briefing, calendários, copy, relatórios) | Agente |
| Repositórios | Se houver repo do cliente ou `clientes-totum` acessível | Agente |
| Site e LP | Leitura direta | Agente |
| Perfil público | Bio, número de posts, últimos temas, via web ou `social-media-research` | Agente |
| Anúncios ativos do cliente e concorrentes | Meta Ad Library | Agente |
| Média de views, retenção, insights | Exige perfil logado | Tigrinha ou humano |

Entregue um **Mapa de contexto** curto:

- O que já sei, cada item com etiqueta e fonte
- O que falta, em lista
- Contradições entre fontes, se houver (ex.: cidade diferente no site e na bio)

Se faltar o básico do perfil (bio confusa, link quebrado, sem destaque), avise que publicar 90 peças num perfil confuso desperdiça o sprint e ofereça a `totum-content-setup` antes.

## Etapa 3. Perguntas, no máximo 15

Pergunte **só o que o Mapa de contexto não respondeu**. Use o banco em `references/perguntas.md`, que está em ordem de prioridade. Se o contexto já cobre uma pergunta, pule.

- No máximo 15 perguntas no total, em blocos de até 4 (`AskUserQuestion` aceita 4 por vez)
- As 5 perguntas marcadas como obrigatórias no banco precisam de resposta antes do plano. Se o humano não souber, registre `[A CONFIRMAR]` e diga o que isso enfraquece no plano
- Resposta vaga não vira dado. "O público é todo mundo" vira `[A CONFIRMAR]` e uma sugestão de como descobrir

## Etapa 4. Pesquisa dos 30 temas

Os 30 temas precisam ter **evidência de demanda**, não intuição. Cada tema entra com pelo menos uma prova.

| Origem da prova | Quem coleta |
| --- | --- |
| Sugestões da busca do TikTok e do Instagram (prints do autocompletar) | Humano ou Tigrinha. O agente não acessa o app |
| Perguntas que o cliente mais recebe em DM, WhatsApp e comentários | Humano |
| Buscas do Google: autocompletar, "as pessoas também perguntam" | Agente |
| Outliers de concorrentes (post acima de 3x a média do perfil) | `totum-content-radar` modo externo, coleta pela Tigrinha |
| Fóruns, Reclame Aqui, grupos, comentários públicos do nicho | Agente |

Peça os prints logo no início da etapa, porque é a coleta mais lenta. Enquanto eles não chegam, o agente faz a parte dele.

**Saída:** tabela com 30 temas, cada um com prova de demanda, pilar (dor, prova, mecanismo, bastidor, como na `totum-content-calendario`), e se ele se presta a tela dividida, dualidade ou os dois. Temas sem prova ficam numa lista separada de reserva, marcados `[hipótese]`.

O humano aprova, corta ou troca temas antes da Etapa 5.

## Etapa 5. Montar o planejamento

### 5.1 Métrica que decide o vencedor, definida antes de postar

Escolha pela meta que o cliente deu na Etapa 3:

| Meta do cliente | Métrica principal | Métricas de apoio |
| --- | --- | --- |
| Crescer audiência | Seguidores ganhos por post | % de views de não seguidores, compartilhamentos |
| Gerar cliente | Conversas iniciadas por post (o critério da `totum-content-radar`) | Seguidores ganhos, salvamentos |

Curtida e alcance total não decidem nada.

**Regra de decisão:** compara a **mediana** de cada formato, nunca o melhor post. Vence o formato com mediana pelo menos 20% maior, com no mínimo 10 peças por formato. Se a diferença for menor que 20%, é empate: escala os dois na fase 2 e diz isso. Um viral isolado não decide formato, ele vai para a fase 3.

Os cortes da `totum-content-radar` continuam valendo por cima: retenção aos 3s abaixo de 25% derruba o formato, e a trava de engate (post acima de 3x a média pausa a fila por 24h) vale em qualquer fase.

### 5.2 Volume, calibrado pela capacidade real

Referência do método: 3 vídeos e 2 carrosséis por dia. O que os dados dizem sobre volume está em `references/conceitos.md`.

Use a capacidade que o humano informou (quantos vídeos consegue gravar e editar por semana). Se for menor que o volume de referência, reduza e diga o custo. Nunca planeje um volume que a produção não sustenta: qualidade caindo na segunda semana contamina o teste.

Quando houver conflito com os padrões da `totum-content-calendario` (ela sugere 3 a 4 peças por dia e 2 formatos vencedores), os parâmetros deste sprint prevalecem durante os 30 dias. Diga isso no plano.

### 5.3 O desenho das três fases

**Fase 1, Explorar (dias 1 a 10)**
- Vídeos divididos meio a meio entre tela dividida e dualidade, alternando no dia
- Carrosséis com os temas de pilar mecanismo e prova
- Tipo de gancho em rodízio, só para leitura direcional (amostra pequena para decidir gancho aqui)
- Nada de mudar formato no meio. Dez dias inteiros ou o dado não serve

**Fase 2, Escalar (dias 11 a 20)**
- Só o formato vencedor (ou os dois, se deu empate)
- Variável testada: tipo de gancho. Concentre nos 3 que a fase 1 apontou, com o ranking de referência como ponto de partida
- Timer na tela em metade dos vídeos acima de 30 segundos, para medir retenção com e sem. Mude uma variável por vez
- Temas: os que tiveram melhor desempenho primeiro, depois temas novos da lista

**Fase 3, Potencializar (dias 21 a 30)**
- Os 5 a 10 melhores vídeos viram carrossel (mesmo tema, argumento reorganizado card a card)
- Assuntos vencedores voltam em novos ângulos: trocar uma variável (gancho, exemplo, público) por vez
- Stories passam a puxar a oferta em cima dos temas que mais engajaram

**Papel de cada formato, em todas as fases:** Reels para alcançar quem não segue, carrossel para interação e salvamento, stories para vender para quem já segue. A sequência diária de stories segue a `totum-content-calendario`.

### 5.4 A ficha de cada peça

Use os esqueletos de `references/esqueletos.md`. Cada peça sai assim, e só assim:

```
Dia X | Formato | Pilar | Gancho (tipo)
Tema: [uma linha]
Argumento: [a tese em uma frase, com etiqueta de origem]
Esqueleto:
- tópico curto
- tópico curto
- ...
Prova necessária: [o que o humano precisa trazer, ou nenhuma]
```

Fase 1 sai completa (todas as peças dos 10 dias). Fases 2 e 3 saem como **estrutura e regras**, com os temas candidatos, porque dependem do resultado da leitura do dia 10 e do dia 20. Não invente as peças das fases 2 e 3 antes do dado.

### 5.5 Quadro Agente x Humano

Monte para o sprint inteiro, a partir do modelo:

| Etapa | Agente (Claude ou Tigrinha) | Humano | Quando |
| --- | --- | --- | --- |
| Temas e esqueletos | Pesquisa, ficha de cada peça | Aprovar e cortar | Antes do dia 1 |
| Gravação e edição | Lista de gravação por bloco e dia | Gravar e editar. Rosto e voz não se terceirizam | Blocos semanais |
| Carrosséis | Texto card a card e arte (Canva, `social-key-visual`) | Aprovar | 2 dias antes da postagem |
| Agendamento | Grade (`totum-content-calendario`) e agendamento (Postiz) | Postar à mão o que o agendador falhar | Diário |
| Comentários e DMs | Rascunho de respostas | Responder na primeira hora | Diário |
| Coleta de métricas | Tigrinha coleta, se tiver acesso | Exportar insights, se não tiver | Dias 10, 20 e 30 |
| Leitura e decisão | `totum-content-radar` lê e recomenda | Decide | Dias 10, 20 e 30 |

Ajuste o quadro ao que existe de fato no cliente (tem editor? tem Tigrinha rodando nele? tem Postiz conectado?). O que não existe vira gargalo listado.

## Etapa 6. Entregar o plano

Salve como página HTML na pasta do cliente, usando `assets/plano-template.html` como base. Nome do arquivo: `Explorar-Escalar-<cliente>-<data-inicio>.html`. Se não houver pasta do cliente, pergunte onde salvar.

A página contém, nesta ordem:

1. Resumo em 3 linhas: meta, métrica que decide, volume
2. Mapa de contexto com as etiquetas
3. Os 30 temas com prova de demanda
4. Fase 1 completa, dia a dia, com as fichas
5. Fases 2 e 3 como estrutura e regras
6. Quadro Agente x Humano
7. Lista de gravação da primeira semana
8. Riscos e lacunas: tudo o que ficou `[A CONFIRMAR]` ou `[hipótese]`, e o que cada um enfraquece
9. Datas das leituras (dia 10, 20 e 30)

Antes de entregar, confira:
- Nenhum número ou nome de cliente sem etiqueta `[cliente]`
- Nenhuma peça com fala pronta no lugar de tópicos
- Toda etapa tem dono humano ou agente
- O volume bate com a capacidade informada

## Etapa 7. Leituras nos dias 10 e 20

Quando o humano voltar com as métricas, rode a `totum-content-radar` modo interno, aplique a regra de decisão da seção 5.1 e então gere as fichas da fase seguinte. Atualize o mesmo arquivo HTML, com a leitura registrada e datada.

Na leitura do dia 30, entregue: o que venceu (formato, gancho, timer, temas), o que foi cortado, e a recomendação para o mês seguinte. Se o mês fechar com muito alcance e pouca conversa, o problema é oferta, público ou nicho, não volume. Diga isso.

---

## Nunca

- Prometer número de seguidores. "100 mil em 30 dias" é discurso de vídeo, não meta planejável
- Escrever roteiro, fala pronta ou legenda final
- Preencher lacuna com suposição
- Decidir formato pelo melhor post em vez da mediana
- Mudar formato no meio da fase 1
- Copiar ou só reagir a vídeo de terceiro sem opinião própria: o Instagram reduz alcance de conteúdo não original
- Usar travessão (o caractere de traço longo) em qualquer texto entregue

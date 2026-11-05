---
name: totum-auditoria-instagram
description: Use quando um cliente já tem perfil de Instagram com posts antigos e precisa de diagnóstico do grid, bio e destaques, decisão post a post (reaproveitar, adaptar, arquivar) e plano do feed novo com 3 fixados antes de produzir as artes.
---

# Auditoria de Instagram existente + plano de feed novo

v1.0, 05/11/2026. Base: piloto CredPara (@credpara, 30/10/2026, Lab Social com orquestração do Lab Design): 20 posts lidos, perfil parado havia 4 meses, bio, link e destaques vazios, tabela post a post, leitura de 14 pins do Pinterest, plano com 3 fixados e handoff ao design.

## Relação com o Feed Perfeito

`feed-perfeito` monta o briefing de um feed novo (enche linguiça, fixados, caixinhas). Esta skill vem antes dele quando o perfil já existe: audita o que está no ar, decide o destino de cada post e só então aplica o método do Feed Perfeito ao plano novo. Não repita aqui o briefing do Feed Perfeito; chame a skill para a parte de lançamento.

## Quando usar

- Cliente novo com Instagram antigo, sobretudo depois de entrega de marca nova.
- Perfil parado, incoerente com a marca, ou com promessas que a marca ou o setor proíbem.

Não use para: perfil do zero (`feed-perfeito` direto), calendário do mês (`totum-content-calendario`), arte das peças (`totum-kv-camadas` ou `totum-design-peca`).

## Regras de leitura

1. Só visualização. Não seguir, curtir, comentar, arquivar nem apagar nada no perfil do cliente.
2. Toda afirmação aponta para a fonte: screenshot em `screens/` ou URL lida com data.
3. Monte antes uma `base-fatos.md`: o que a marca aprovada diz (brand kit, manual) e o que o site diz, com URL. O que não estiver lá não existe até o cliente confirmar (taxa, telefone, CNPJ, depoimento, número de atendimentos).
4. Hipótese é marcada como hipótese. Leitura de risco jurídico ou regulatório é leitura, não parecer.
5. Comentário real não vira depoimento sem autorização. Serve como sinal das palavras do público.

## Passo a passo

### 1. Coleta
1. Screenshots: topo do perfil, grid completo em partes, 3 a 5 posts abertos com legenda e comentários, pasta de referências (Pinterest ou outra) se o cliente mandou.
2. Anote nome, bio, link, categoria, destaques, avatar, números (posts, seguidores, seguindo).

### 2. Diagnóstico (`analise.md`, seção 1)
1. O que está vazio (bio, link, categoria, destaques).
2. Frequência: datas, picos, silêncio desde o último post.
3. Formatos: imagem, carrossel, reels, stories fixados.
4. Visual: molde, fontes, cores, logo usado (antigo ou novo), pessoas com cara de IA, rótulo "AI content".
5. Engajamento: curtidas e comentários por post, média, taxa aproximada sobre seguidores; comentários ocultos por spam.
6. Coerência com a marca nova: tabela "ponto da marca / perfil atual".

### 3. Riscos (seção 2)
Promessas proibidas pela marca ou pelo próprio site, informação contraditória entre posts, prova social fraca ou não independente, CTA para canal que não funciona, duplicados, perfil parado.

### 4. Post a post (seção 3)
Tabela com uma linha por post: número, data, título da arte, curtidas e comentários, sugestão para o post (arquivar, manter), destino do tema (reaproveitar, adaptar, descartar), motivo.
- Recomende **arquivar, não apagar**: preserva histórico e pode voltar.
- Dê uma prioridade mínima (os posts com promessa proibida e os duplicados) caso o Rael não queira arquivar tudo.
- "Reaproveitar" e "adaptar" se referem ao tema, que volta em peça nova.

### 5. Temas que voltam (seção 4)
Agrupe os temas aproveitáveis, escreva o ângulo novo no tom da marca e um título de exemplo. Liste os descartados.

### 6. Referências (seção 6)
Para cada referência do cliente: o que é, e se combina, combina em parte ou conflita com o kit. Onde a referência e o kit discordam, segue o kit até o Rael decidir.

### 7. Recomendações (seção 7)
Transição do grid, vitrine antes do primeiro post (avatar, bio, link, destaques), primeiro post de reapresentação, troca de CTA, formatos novos, ritmo constante e realista.

### 8. Plano novo (`plano-conteudo.md` e `fixados.md`)
1. Linha editorial em pilares com proporção, ligados à promessa da marca.
2. Bio em 2 ou 3 opções dentro de 150 caracteres, com uma recomendada.
3. Destaques: nome, conteúdo e capa.
4. Lançamento pelo `feed-perfeito`: volume primeiro, fixados por último; ordem de publicação e grid visto junto (xadrez de fundos, série sem numeração aparente).
5. **3 fixados** com objetivo diferente cada (ex.: confiabilidade, produto, prova ou conversa), texto slide a slide em `fixados.md`, ordem de fixar (o mais recente aparece à esquerda).
6. Seção "Bloqueado até o Rael confirmar" com tudo que depende de dado não confirmado.

### 9. Handoff ao design
Mande ao Lab Design o caminho de `analise.md`, `plano-conteudo.md`, `fixados.md` e `base-fatos.md`. O design congela a copy com hash antes de produzir e segue `totum-kv-camadas`.

## Saída

```
<cliente>/<data>-instagram/
├── analise.md
├── base-fatos.md
├── plano-conteudo.md
├── fixados.md
├── screens/
└── site/        cópia do texto das páginas lidas
```

## Critério de pronto

- [ ] Todo post antigo na tabela, com destino do post e do tema
- [ ] Riscos com fonte; hipóteses marcadas
- [ ] Bio, destaques e 3 fixados propostos
- [ ] Bloqueios listados para o Rael
- [ ] Nada feito no perfil do cliente; nada enviado ao cliente

## O que não fazer

- Não arquivar, apagar ou publicar nada.
- Não inventar dado de contato, taxa, número ou depoimento.
- Não usar comentário de seguidor como depoimento.
- Não copiar a referência do Pinterest por cima do kit.

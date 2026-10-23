---
name: protocolo-design
description: >-
  Use para cadastrar, corrigir ou atualizar o design system de um cliente (ou de
  uma submarca) do Totum Lab a partir de logo, Key Visuals, peças modelo e
  referências, com análise do material e entrevista com o Rael; termina com o
  livro de regras preenchido e KVs de prova. Não serve para produzir peças do
  dia a dia (use totum-design-peca).
---
# Protocolo Design

v0.2, 23/10/2026. Monta o livro de regras de uma marca a partir do material dela e de uma entrevista curta. Depois disso, totum-visual-codes e totum-design-peca passam a funcionar para essa marca.

## Modos

- **Cadastrar**: marca nova, sem livro de regras.
- **Atualizar ou corrigir**: marca com livro existente. Comece lendo o livro, liste o que está provisório, conflitante ou em "A decidir", e trabalhe só nisso. Nunca apague uma regra sem registrar o motivo no histórico.
- **Submarca**: herda o livro da marca mãe e documenta apenas as diferenças (tom, paleta de acento, tipografia, códigos visuais permitidos e proibidos). O que não for redefinido continua valendo da mãe.

## Onde fica cada coisa

- Ficha do cliente: Notion, Totum Lab > Design > Clientes (campos, "A decidir" e link do Drive).
- Livro local: `clientes/<slug>/brand-kit/` com `brand.md`, `receitas.md`, `logo/`, `referencias/`, `personagens/`. Submarca: `clientes/<slug-mae>/submarcas/<slug>/brand-kit/`.
- Arquivos do cliente: pasta "Clientes" do Drive. Siga a lógica dela (1- Logo, 2- Redes Sociais, 3- Ads, 5- Fotos e Elementos/Referencias/Brand Kit). Só adicione arquivos. Não renomeie, mova nem apague nada existente; proponha reorganização ao Rael antes.

## Fluxo

### 1. Inventário (sem perguntar nada ainda)
Junte tudo o que já existe: o livro atual, a ficha no Notion, a pasta do Drive e o que o Rael mandar na conversa. Classifique cada arquivo como logo, KV, peça modelo, referência de terceiro, anti-referência ou material de apoio, e marque o status: aprovado, em avaliação ou rejeitado. Mostre o inventário em uma tabela curta.

### 2. Análise do material
- **Paleta**: hex medido por script nos arquivos originais (logo vetorial ou PNG), nunca estimado olhando. Nas peças, meça a proporção de uso de cada cor para definir a cor dominante, a de apoio e o acento.
- **Tipografia**: use o nome do arquivo de fonte ou os metadados do PDF/SVG quando houver. Pela imagem, dê só o nome provável e marque como "a confirmar".
- **Logo**: versões, área de respiro, fundo mínimo de contraste, usos proibidos.
- **Linguagem visual**: grid e margens, tratamento de foto, grafismos e elementos recorrentes, nível de texto por peça, iluminação, materialidade. Traduza para códigos de totum-visual-codes e proponha códigos próprios do cliente quando um elemento se repetir.
- **Padrões que funcionam**: o que as peças aprovadas têm em comum e o que as rejeitadas têm de diferente.
- **Conflitos**: material que se contradiz, por exemplo identidade antiga contra identidade nova. Liste com a evidência e a data de cada lado.

### 2b. Pesquisa de referências
Quando o material do cliente for pouco para algum tema ou formato, pesquise por cliente + tema (setor, público, datas, ofertas) no Designi (designi.com.br) e no Pinterest, as duas contas logadas no navegador. Monte um painel com 6 a 12 prévias, cada uma com o link e o que ela ensina (composição, luz, grafismo, tipografia). O Rael aprova ou corta na entrevista. Designi: 2 downloads por dia, re-download conta; baixe o PSD só quando precisar das camadas (fontes, grafismos) e confira antes se já está no Drive. Nunca curtir, salvar, seguir ou comentar.

### 3. Entrevista
Conversa, não formulário. Faça no máximo 5 perguntas por rodada, sempre começando pelos conflitos e pelo que trava a produção. Para cada pergunta, traga a sua recomendação, para o Rael só confirmar ou corrigir. Pergunte apenas o que o material não responde:
- qual identidade vale, quando houver conflito;
- qual é o KV principal e qual é a ideia central da marca;
- público, praça, tom de voz e promessa que pode ou não pode ser feita;
- o que a marca nunca faz (cores, temas, estilos, concorrentes a evitar);
- nome exato e arquivo das fontes;
- quem aprova as peças e o teto de texto por peça.
Registre cada resposta assim que ela chegar. Se o Rael parar no meio, o protocolo continua de onde parou.

### 4. Livro de regras (rascunho)
Escreva o `brand.md` nesta ordem: identidade (o que a marca é em 2 linhas), paleta com hex e hierarquia, tipografia, logo e usos, linguagem visual, códigos visuais do cliente, nunca, aprovador, histórico. Escreva o `receitas.md` com 2 a 4 receitas-base (anúncio, post, carrossel, story) no formato de totum-visual-codes. Separe o que foi confirmado do que é provisório.

### 5. KVs de prova
Gere de 2 a 3 KVs novos com totum-design-peca, cada um testando uma receita-base, com as referências aprovadas anexadas e o logo oficial aplicado por cima (nunca gerado). Apresente cada um com a receita que usou e o que ele está testando.

### 6. Correção e calibragem
O Rael corrige. Converta cada correção em regra: ajuste de código, novo "nunca", troca de referência. KV aprovado vira referência; KV reprovado vira anti-referência com o motivo. Repita até aprovar ao menos um KV por receita-base, ou até o Rael encerrar.

### 7. Publicação
- Atualize a ficha no Notion: status "Ativo" ou "Provisório", resumo da paleta e das fontes, receitas, e "A decidir" com o que restou.
- Salve logo, referências e KVs aprovados na pasta do Drive, respeitando a lógica dela.
- Inclua no histórico do `brand.md` a data, o que mudou e quem decidiu.
- Avise o Rael em uma linha o que ficou pronto e o que ficou pendente.

## Regras

- O logo nunca é gerado nem redesenhado.
- Nenhum hex, fonte ou regra é inventado: o que não foi medido nem confirmado fica como "a confirmar".
- Referências de terceiros valem pela composição, pela luz e pelo clima, nunca pela paleta, pelo logo ou pelo texto.
- Nada vai para o cliente nem é publicado sem a aprovação do Rael.
- Escreva em pt-BR, direto, sem travessão e sem emoji.

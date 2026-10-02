---
name: totum-apresentacao-comercial
description: >
  Gera a apresentação comercial da Totum em slides HTML interativos, no design system da marca,
  a partir de um diagnóstico real do negócio do lead. Estrutura SPIN organizada em Problema,
  Solução e Resultado, com pouco texto no slide e todo o aprofundamento em janelas modais.
  Inclui auditoria técnica automática do site do lead, pesquisa de mercado da praça,
  motor de cálculo de funil, projeção em três cenários e escada de ofertas do catálogo Totum.
  Acione SEMPRE que o usuário pedir "apresentação comercial", "slides para a reunião",
  "montar a apresentação do lead", "deck de vendas", "apresentação do planejamento",
  "/totum-apresentacao-comercial", ou enviar um site, Instagram ou nome de empresa pedindo
  material para apresentar numa reunião de venda. Também acione quando o usuário já tiver
  rodado a skill planejamento-estrategico e quiser transformar o resultado em slides.
  NÃO acione para proposta comercial em PDF, contrato, relatório de performance de cliente
  ativo, ou planejamento sem intenção de apresentar.
---

# Apresentação Comercial Totum

Você é o estrategista comercial da Totum montando o material que vai para a mesa de
uma reunião de venda. O entregável é um arquivo HTML único, autocontido, que roda em
tela cheia no navegador.

**Regra de ouro do formato: o slide não é o documento.** O slide carrega a afirmação.
O modal carrega a prova. Se um slide precisa de parágrafo para ser entendido, ele está errado.

---

## Dependências

| Item | Obrigatório | O que acontece sem ele |
|---|---|---|
| `references/template-base.html` | Sim | Não existe layout, aborte |
| `assets/capa.jpg` e `assets/sobre-bg.jpg` | Sim | Slides 1 e 3 quebram |
| `references/catalogo-totum.md` | Sim | Não há o que ofertar nos slides de plano |
| `references/motor-calculo.md` | Sim | Números inventados, nunca faça isso |
| Skill `uiux-auditor` | Recomendada | Use o checklist do Passo 7 como substituto |
| Acesso à internet | Recomendada | Pule a auditoria técnica e a pesquisa de praça, e avise o usuário |

---

## Fluxo de 8 passos

Nunca pule passos. Nunca gere o HTML antes do passo 7.

### Passo 1 · Entrevista

Leia `references/entrevista.md` e conduza. Não faça as 20 perguntas de uma vez,
agrupe em blocos e mostre que você já pesquisou antes de perguntar.

Se o usuário já rodou `planejamento-estrategico` para este lead nesta conversa,
reaproveite tudo e pergunte apenas o que faltar.

**Nunca invente resposta.** Se um dado não veio, marque como hipótese explícita e
escreva isso no modal correspondente. Honestidade sobre premissa é o que separa
diagnóstico de chute.

### Passo 2 · Auditoria técnica do site do lead

Sempre que houver site, rode. Este é o ativo de autoridade mais forte da reunião inteira:
dado real, verificável, específico daquele negócio.

Leia `references/auditoria-tecnica.md` para o procedimento e o script.

Colete no mínimo: presença do Pixel do Meta, presença de GA e GTM, contagem de H1,
meta description, compressão, número de scripts e CSS bloqueantes, schema.org, tempo
de resposta.

Nunca apresente esse achado nos primeiros slides. Ele pertence ao card **Processo**
do slide de diagnóstico, e é a carta de autoridade. Gastar cedo desperdiça.

### Passo 3 · Pesquisa da praça e do mercado

Busque na web, em ordem de prioridade:

1. População da cidade e da região metropolitana
2. Dados setoriais relevantes ao nicho (frota, número de empresas, maior empregador)
3. Eventos e feiras do setor naquela região
4. Mudanças regulatórias recentes que afetem o negócio
5. Sazonalidade conhecida

Traduza cada dado em **canal de aquisição não explorado**. Número solto não vende.
"1,7 milhão de habitantes na região" não diz nada. "Você está anunciando para 700 mil
pessoas dentro de um mercado de 1,7 milhão a 30 minutos daqui" vende.

Meta: 8 a 10 oportunidades, cada uma com um "como ativar" concreto.

### Passo 4 · Motor de cálculo

Leia `references/motor-calculo.md` e execute. Não improvise aritmética de funil.

Saídas obrigatórias:
- Funil completo com CPL da Totum
- Custo por aquisição e retorno sobre a mídia
- **Teto de capacidade operacional do lead** e o que cada unidade de capacidade destrava
- Três cenários mês a mês até o fim do horizonte

**A regra mais importante deste passo:** identifique qual é o gargalo real. Em quase todo
negócio de serviço local com CPL baixo, o limite não é lead, é capacidade de atendimento.
Descobrir isso e dizer na cara é o que transforma a apresentação em consultoria.

### Passo 5 · Diagnóstico das 4 verticais

Posicionamento, Conteúdo, Produto, Processo. Nota de 1 a 5 em cada, média no scorebar
com estrelas.

Cada nota precisa de justificativa concreta no modal, ancorada em algo que você viu.
"Conteúdo nota 2" sem dizer que o blog parou em fevereiro de 2024 é opinião.

Se a média ficar baixa, enquadre no modal do scorebar: o que está fraco é barato de
consertar, o que está caro de construir já existe. Diagnóstico duro sem saída é ofensa,
diagnóstico duro com caminho é consultoria.

### Passo 6 · Escada de ofertas

Leia `references/catalogo-totum.md`.

Regras:
- Três planos: **Essencial**, **Básico**, **Avançado**
- O do meio recebe o gradiente e é o ponto de partida recomendado
- Nunca liste quantidade de criativos, escreva apenas "Criativos"
- Sempre "dashboard exclusivo na nossa plataforma de clientes"
- Cabeçalho do slide reforça: o compromisso é o resultado, os planos definem o nível de
  resultado e em quanto tempo ele chega
- Cada plano fecha com investimento mínimo em anúncios e horizonte de resultado
- Amostra grátis do Agente de IA no plano do meio, enquadrada como teste com o lead e o
  número do próprio cliente, nunca como cortesia

Os complementares que você sugerir precisam sair do diagnóstico, não do catálogo.
Site sem H1 e sem description puxa SEO. Base parada puxa automação. Sem CRM puxa CRM.
Oferta que responde a um problema que você acabou de provar converte. Menu de serviços não.

### Passo 7 · Auditoria de UI/UX (obrigatória, antes de entregar)

Chame a skill `uiux-auditor` em modo COMPLETA sobre a estrutura gerada.

Se ela não estiver disponível no ambiente, rode este checklist mínimo e diga ao usuário
que rodou o substituto:

- [ ] Nenhum grid com `min-height` fixo somado a `justify-content: space-between`
      (é o que cria card alto e vazio ao mesmo tempo)
- [ ] Espaço ocioso por slide calculado e reportado
- [ ] Contraste de todo texto sobre card acima de 4,5:1
- [ ] Nenhuma informação transmitida só por número ou só por cor
- [ ] Ênfase única no plano recomendado, sem marcador triplo
- [ ] Camadas de informação diferentes separadas por respiro ou divisória
- [ ] O deck fecha com resumo e chamada para ação, nunca com lista de features
- [ ] Todo `data-m` tem modal e todo modal tem `data-m`

Corrija tudo que for estrutural antes de entregar. Reporte ao usuário o que foi corrigido,
com número quando possível.

### Passo 8 · Geração e entrega

1. Carregue `references/template-base.html`
2. Substitua `__IMG_CAPA__` e `__IMG_SOBRE_BG__` pelas imagens de `assets/` em base64,
   redimensionadas para 1600x900, JPEG qualidade 82
3. Substitua todo o conteúdo de slides e modais
4. Valide: contagem de slides, órfãos de modal, ausência de travessão longo
5. Salve em `/mnt/user-data/outputs/` e apresente com `present_files`

Termine a resposta em chat com:
- O que mudou nos números em relação ao esperado, se algo mudou
- Os achados da auditoria técnica do site
- As perguntas que ficaram sem resposta e precisam ir ao lead
- Duas ou três sugestões de condução da reunião

---

## Estrutura fixa dos 12 slides

| # | Slide | Eixo SPIN | Fonte |
|---|---|---|---|
| 1 | Capa | — | `assets/capa.jpg`, só cidade e data |
| 2 | Título e subtítulo | — | Nome do lead + "Diagnóstico e plano de crescimento" |
| 3 | Sobre a Totum | Credibilidade | `assets/sobre-bg.jpg` + texto fixo |
| 4 | Mercado da praça | **S · Situação** | Passo 3, 4 números + 10 cards |
| 5 | Diagnóstico | **P · Problema** | Passo 5, scorebar + 4 verticais |
| 6 | Funil | **I · Implicação** | Passo 4, funil + 3 indicadores |
| 7 | Cenários | **N · Necessidade** | Passo 4, gráfico de barras |
| 8 | Gargalos | **P · Problema** | Passo 4 e 5, 3 cards |
| 9 | Plano 90 dias | **Solução** | 3 sprints + 3 frentes paralelas |
| 10 | Planos | **Solução** | Passo 6 |
| 11 | O que vem junto | **Resultado** | 6 entregas, benefício do cliente apenas |
| 12 | Fechamento | **Resultado + CTA** | 5 resumos + card de ação |

O slide 11 fala só do que o cliente ganha. Custo interno, margem, esforço da agência
e reaproveitamento de ativo **nunca aparecem**, nem no modal.

---

## Design system

Leia `references/design-system.md` antes de escrever qualquer CSS.

Nunca troque a paleta. Nunca aumente a densidade de texto do slide.
Nunca use travessão longo em nenhum texto gerado.

---

## Erros que matam a apresentação

1. **Texto demais no slide.** Se cabe no modal, vai para o modal.
2. **Número sem premissa.** Toda projeção precisa dizer no modal em que se apoia e o que a derruba.
3. **Diagnóstico sem saída.** Apontar problema sem caminho vira crítica, não consultoria.
4. **Vender capacidade que o lead não tem.** Se ele não consegue atender 40 clientes, prometer
   40 clientes é preparar o cancelamento do terceiro mês.
5. **Gastar a carta de autoridade cedo.** O achado técnico mais forte pertence ao slide de
   diagnóstico, não à abertura.
6. **Cenário agressivo apresentado como promessa.** Ele é potencial de mercado e depende de
   decisões do lead. Diga isso no modal, com essas palavras.

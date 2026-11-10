# Protocolo de Ads

**Versão:** 1.2
**Status:** aprovado
**Aprovado em:** 10/11/2026

Fluxo de anúncio e de peça visual pedida pelo quadro Pedidos de Ads ou pela conversa. Vale para briefing, design system, referência, copy aprovada, visual codes, teste de uma variação, lote, adaptação de formatos, aprovação peça por peça e PSD só das peças que precisam de ajuste.

O molde do prompt, as 7 regras, as ideias por âncora e o QA rápido continuam na skill `totum-design-peca`. Onde essa skill ainda disser "Pedidos de peças", leia "Pedidos de Ads".

Não publique, não envie mensagem, não crie rotina, não gaste crédito pago e não altere produção sem aprovação explícita no chat.

## Quem aprova

A aprovação é interna, da equipe Totum. O cliente não aprova as peças. Um pedido de alteração vindo do cliente entra como pedido novo ou como Correção.

## Entrada pelo quadro

O quadro é Pedidos de Ads, na área de Design, em visão kanban agrupada por Status.

Campos: Peça, Cliente, Formato, Objetivo e CTA, Pauta/ideia, Texto da peça, Referência (arquivos), Modo da referência (Refazer ou Fazer de acordo), Receita (opcional), Variações, Prazo, Arquivo, PSD, Correção, Status, Peça mãe e Variações e adaptações.

O pedido nasce no quadro e a equipe avisa no chat. Uma rotina também pode disparar o trabalho. Só comece o que estiver em **Pra fazer**.

Status:

- **Pedido:** rascunho sendo preenchido. Não mexa.
- **Pra fazer:** pedido completo. Leia os campos e pergunte só o que faltar.
- **Gerando:** em produção.
- **Teste:** uma variação foi entregue e aguarda aprovação.
- **Revisar:** a peça foi entregue para aprovação.
- **Ajustar:** leia a Correção e refaça só o que foi pedido.
- **Aprovado.**

## Peça mãe

Cada card é uma peça. A peça de teste aprovada no formato base é a peça mãe.

Cada variação do lote e cada adaptação de formato vira um card próprio. O agente cria esses cards e liga cada um à peça mãe pelo campo **Peça mãe**. A equipe não preenche esse campo. Ela aprova ou pede ajuste em cada card.

O título do card segue `<Campanha> v<N> <formato>`, por exemplo `<Campanha> v2 feed` ou `<Campanha> v1 story`.

O card filho herda da peça mãe o cliente, a copy e a receita. O eixo que mudou fica anotado no card.

## Onde gerar

A geração é no ChatGPT Imagens, na sessão já aberta no navegador do agente. Cada cliente tem um chat por tipo de peça.

1. **Um chat por tipo de peça.** O nome segue `<Cliente> <Tipo> -<N>`, em que N é o número do chat. Use o nome do cliente exatamente como está no banco Clientes. Cada chat cobre um tipo só. Os tipos são:
   - `Ads`, anúncio pago. Exemplo: `<Cliente> Ads -1`.
   - `Posts`, post orgânico. Exemplo: `Cliente Exemplo Posts -1`.
   - `Carrossel`, carrossel. Exemplo: `Cliente Exemplo Carrossel -1`.
   - `KV <Campanha>`, key visual de uma campanha. Exemplo: `Cliente Exemplo KV Black Friday -1`.
   Se a conta tiver Projetos, crie o projeto `<Cliente>`, coloque o design system nas instruções do projeto e mantenha os chats de cada tipo dentro dele.
2. **Abertura do chat.** A primeira mensagem leva o design system completo: `kit-chatgpt.md` e `brand.md`, com paleta em HEX, fontes, regras de logo, tom de voz e proibições. Anexe o PNG oficial do logo só como referência de área, com a instrução de nunca o redesenhar. Peça uma confirmação das regras em uma linha antes do primeiro prompt de peça.
3. **Mensagens seguintes.** Cada mensagem leva só o prompt montado com a receita de visual codes e as referências do pedido. O design system não volta a cada peça.
4. **Quando abrir o chat `-<N+1>`.** Abra o próximo quando acontecer o primeiro destes casos: o chat erra cor, fonte, texto ou acentuação duas vezes seguidas; o chat ignora uma regra do design system; o chat passa de cerca de 20 peças geradas. O chat novo recomeça pela abertura do passo 2 e inclui um resumo curto das receitas aprovadas até ali. O chat antigo permanece como histórico.
5. **Registro.** No `receitas.md` do cliente, numa seção "Chats ChatGPT", anote o nome de cada chat, o endereço, a data e o motivo da troca. Em cada peça, registre em qual chat ela foi gerada.
6. Se o pedido pedir outro motor, como o Nano Banana, avise antes de usar. Não diga que gerou imagem quando entregou só o prompt.

## Fluxo obrigatório

Siga na ordem, sem pular etapas. Num pedido pela conversa, faça todas as perguntas que faltarem de uma vez, numa mensagem só.

1. **Briefing de 1 minuto.** Objetivo, público, oferta, ação ou CTA, praça e formatos. Sem oferta e CTA claros, não gere.
2. **Design system do cliente.** Use o design system ou o livro de regras (paleta, fontes, logo, restrições) em `1- Design System` e confira o banco Clientes. Se não existir, rode `manual-da-marca` ou `protocolo-design` antes. Mostre em uma linha o que herdou.
3. **Referência.** De 1 a 4 referências, com o modo definido. Em Refazer, mantenha a peça e varie. Em Fazer de acordo, use a referência só como direção. A marca vence a referência. PSDs recentes do cliente valem como parâmetro de layout e hierarquia.
4. **Copy aprovada.** Feche headline, apoio e CTA por escrito antes de gerar. Avise se a headline passar de 8 palavras ou o CTA de 5. Não invente preço, desconto, prazo nem benefício.
5. **Visual codes.** Rode `totum-visual-codes` e mostre RECEITA / POR QUE / PENDÊNCIAS. Se houver pendência, pare e pergunte.
6. **Teste de uma variação, no formato base.** O formato base é o feed 4:5, salvo pedido diferente. Gere uma única peça no chat do cliente e entregue com o prompt e a receita. Avalie no checklist e diga com franqueza o que está fraco. Mova o card para Teste e só siga depois da aprovação ou do pedido de ajuste.
7. **Lote.** Gere as demais variações no formato base, mudando um eixo por vez (composição, hierarquia, enquadramento ou direção), para o teste no Meta ficar legível. Cada variação vira um card filho em Revisar, criado e ligado pelo agente. Rode o checklist em cada uma. A aprovação é peça por peça.
8. **Adaptação de formatos.** Só depois da aprovação no formato base, adapte cada peça aprovada para os outros formatos pedidos (story 9:16, reels, quadrado e os demais do pedido). Mantenha a receita, a copy e a hierarquia, e reorganize só o layout para as margens seguras do formato. Não reinvente a peça. Cada adaptação vira um card filho, criado e ligado pelo agente, e também passa por aprovação.
9. **PSD só quando precisar.** Faça PSD apenas das peças aprovadas que precisam de ajuste fino, com `totum-imagem-para-psd`, camadas nomeadas e texto editável. Não faça PSD de tudo por padrão.
10. **Nomear e registrar.** O nome do arquivo leva cliente, campanha, variação, formato e códigos principais, no formato `<cliente>-campanha-v1-story-data_focus-bold`. Registre a receita e o chat de cada peça no `receitas.md` do cliente e no campo Receita.

## Texto e logo

- O padrão é gerar a cena sem texto e sem logo. Texto e logo entram depois, em camada, com a fonte e o logo oficiais.
- A exceção é copy curta, de até cerca de 4 linhas: pode ser gerada no motor com `/literal_copy`, desde que o teste da etapa 6 mostre o texto exato e a acentuação certa. Registre qual método foi usado.
- Logo e selos nunca são gerados. Reserve uma área limpa (`/logo_safezone`) e aplique o original depois. Use só o espaço necessário, cerca de 25% da peça, no canto definido pelo livro de regras.

## Checklist do teste, do lote e das adaptações

- O texto é idêntico à copy aprovada, com acentuação certa e nada inventado.
- Logo e selo não foram redesenhados, e a área reservada tem o tamanho certo.
- Há um único foco dominante, e a oferta é entendida em 3 segundos no celular.
- Paleta e fonte seguem o design system. Nada sai da marca.
- A direção de arte da receita aparece de fato. `/bold_brutalist`, por exemplo, pede blocos e contraste duro.
- As margens seguras do formato são respeitadas e nada essencial foi cortado.
- A proporção do arquivo está correta para o formato.
- Numa adaptação, a peça é reconhecível como a mesma da peça mãe.

## Previsto para a v2

Ainda não implementado: trazer o resultado do Meta de volta para o fluxo, por peça (identificador do anúncio, CTR e CPA), para cruzar com a receita e ver quais códigos vendem melhor em cada cliente.

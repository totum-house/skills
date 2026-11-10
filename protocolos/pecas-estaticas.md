# Protocolo de Peças estáticas

**Versão:** 1.3
**Status:** aprovado
**Aprovado em:** 10/11/2026

Fluxo de qualquer peça estática de cliente: Ads, Posts, Carrossel e KV de campanha. O pedido chega pelo quadro Pedidos de Ads ou pela conversa. O caminho é o mesmo: briefing, design system, referência, copy, visual codes, teste, produção, adaptação, PSD e registro. O que muda por tipo está na tabela abaixo.

O molde do prompt, as 7 regras, as ideias por âncora e o QA rápido continuam na skill `totum-design-peca`. Onde essa skill ainda disser "Pedidos de peças", leia "Pedidos de Ads".

Não publique, não envie mensagem, não crie rotina, não gaste crédito pago e não altere produção sem aprovação explícita no chat.

O nome anterior deste protocolo era Ads. Quem chegar por esse nome encontra o atalho em [ads.md](ads.md).

## Um fluxo para toda peça estática

O processo é o mesmo para Ads, Posts, Carrossel e KV de campanha. A receita de visual codes é o que separa os tipos: cada um tem a sua, e uma receita de Ads não serve para Post.

| Tipo | Visual codes de partida | Lote | Formato base | Copy na arte | Observação |
|---|---|---|---|---|---|
| **Ads** | `/meta_ad` mais códigos de conversão (`/data_focus`, `/urgency` e outros) | Sim: variações mudando um eixo por vez, para o teste no Meta ser legível | Feed 4:5 | Headline de até 8 palavras e CTA de até 5 | Oferta e CTA claros são obrigatórios |
| **Posts** | Códigos editoriais e de marca do feed do cliente, sem `/meta_ad` | Não, por padrão: uma peça por pauta, com variação só se pedida | Feed 4:5 | Curta; o texto principal vai na legenda, que é da equipe de social | Precisa conversar com o grid do feed |
| **Carrossel** | Códigos editoriais com regra de sequência | Não: a unidade é a sequência | Feed 4:5 por slide | Por slide, curta | Capa, miolo e CTA final. O teste é a capa mais 1 slide de miolo. Os slides precisam ser consistentes entre si |
| **KV `<Campanha>`** | Códigos de identidade da campanha | Não: o KV é a peça mãe da campanha | O que o pedido disser (em geral o maior ou o mais usado) | Título da campanha | Depois de aprovado, vira referência obrigatória das peças da campanha. As adaptações são desdobramentos |

Se o pedido não deixar o tipo claro, pergunte. Se aparecer um tipo novo, use o mais próximo da tabela e avise.

## Quem aprova

A aprovação é interna, da equipe Totum. O cliente não aprova as peças. Um pedido de alteração vindo do cliente entra como pedido novo ou como Correção.

## Entrada pelo quadro

O quadro é Pedidos de Ads, na área de Design, em visão kanban agrupada por Status. Enquanto não houver quadro próprio para os outros tipos, Posts, Carrossel e KV entram pela conversa ou pelo mesmo quadro, com o tipo indicado.

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
2. **Abertura do chat.** A primeira mensagem leva o design system completo: `kit-chatgpt.md` e `brand.md`, com paleta em HEX, fontes, regras de logo, tom de voz e proibições, mais as regras do tipo na tabela acima. Anexe o PNG oficial do logo só como referência de área, com a instrução de nunca o redesenhar. Peça uma confirmação das regras em uma linha antes do primeiro prompt de peça.
3. **Mensagens seguintes.** Cada mensagem leva só o prompt montado com a receita de visual codes e as referências do pedido. O design system não volta a cada peça.
4. **Quando abrir o chat `-<N+1>`.** Abra o próximo quando acontecer o primeiro destes casos: o chat erra cor, fonte, texto ou acentuação duas vezes seguidas; o chat ignora uma regra do design system; o chat passa de cerca de 20 peças geradas. O chat novo recomeça pela abertura do passo 2 e inclui um resumo curto das receitas aprovadas até ali. O chat antigo permanece como histórico.
5. **Registro.** No `receitas.md` do cliente, numa seção "Chats ChatGPT", anote o nome de cada chat, o endereço, a data e o motivo da troca. Em cada peça, registre em qual chat ela foi gerada.
6. Se o pedido pedir outro motor, como o Nano Banana, avise antes de usar. Não diga que gerou imagem quando entregou só o prompt.

## Fluxo obrigatório

Siga na ordem, sem pular etapas. Vale para todos os tipos. Num pedido pela conversa, faça todas as perguntas que faltarem de uma vez, numa mensagem só.

1. **Briefing de 1 minuto.** Tipo, objetivo, público, mensagem ou oferta, CTA quando houver, praça e formatos. Em Ads, sem oferta e CTA claros, não gere.
2. **Design system do cliente.** Use o design system ou o livro de regras (paleta, fontes, logo, restrições) em `1- Design System` e confira o banco Clientes. Se não existir, rode `manual-da-marca` ou `protocolo-design` antes. Mostre em uma linha o que herdou.
3. **Referência.** De 1 a 4 referências, com o modo definido. Em Refazer, mantenha a peça e varie. Em Fazer de acordo, use a referência só como direção. A marca vence a referência. PSDs recentes do cliente valem como parâmetro de layout e hierarquia. Peça de campanha segue o KV aprovado dela.
4. **Copy aprovada.** Feche por escrito o texto que vai na arte antes de gerar, no limite do tipo (tabela acima). Não invente preço, desconto, prazo nem benefício.
5. **Visual codes.** Rode `totum-visual-codes` partindo dos códigos do tipo (tabela acima) e mostre RECEITA / POR QUE / PENDÊNCIAS. Se houver pendência, pare e pergunte.
6. **Teste no formato base.** Gere uma única peça no chat do cliente e do tipo. No Carrossel, a peça de teste é a capa mais 1 slide de miolo. Entregue com o prompt e a receita. Avalie no checklist e diga com franqueza o que está fraco. Mova o card para Teste e só siga depois da aprovação ou do pedido de ajuste.
7. **Produção.** Em Ads, gere as demais variações no formato base, mudando um eixo por vez (composição, hierarquia, enquadramento ou direção). No Carrossel, gere os slides restantes com a mesma receita. Em Posts e KV, só há variação se o pedido pedir. Cada peça nova vira um card filho em Revisar, criado e ligado pelo agente. Rode o checklist em cada uma. A aprovação é peça por peça.
8. **Adaptação de formatos.** Só depois da aprovação no formato base, adapte cada peça aprovada para os outros formatos pedidos (story 9:16, reels, quadrado e os demais do pedido). Mantenha a receita, a copy e a hierarquia, e reorganize só o layout para as margens seguras do formato. Não reinvente a peça. Cada adaptação vira um card filho, criado e ligado pelo agente, e também passa por aprovação.
9. **PSD só quando precisar.** Faça PSD apenas das peças aprovadas que precisam de ajuste fino, com `totum-imagem-para-psd`, camadas nomeadas e texto editável. Não faça PSD de tudo por padrão.
10. **Nomear e registrar.** O nome do arquivo leva cliente, tipo, campanha ou pauta, variação, formato e códigos principais, no formato `<cliente>-ads-campanha-v1-story-data_focus-bold`. Registre a receita e o chat de cada peça no `receitas.md` do cliente, separados por tipo, e no campo Receita.

## Texto e logo

- O padrão é gerar a cena sem texto e sem logo. Texto e logo entram depois, em camada, com a fonte e o logo oficiais.
- A exceção é copy curta, de até cerca de 4 linhas: pode ser gerada no motor com `/literal_copy`, desde que o teste da etapa 6 mostre o texto exato e a acentuação certa. Registre qual método foi usado.
- Logo e selos nunca são gerados. Reserve uma área limpa (`/logo_safezone`) e aplique o original depois. Use só o espaço necessário, cerca de 25% da peça, no canto definido pelo livro de regras.

## Checklist do teste, da produção e das adaptações

- O texto é idêntico à copy aprovada, com acentuação certa e nada inventado.
- Logo e selo não foram redesenhados, e a área reservada tem o tamanho certo.
- Há um único foco dominante, e a mensagem é entendida em 3 segundos no celular.
- Paleta e fonte seguem o design system. Nada sai da marca.
- A direção de arte da receita aparece de fato. `/bold_brutalist`, por exemplo, pede blocos e contraste duro.
- As regras do tipo foram seguidas: em Ads, a oferta e o CTA; em Posts, a coerência com o feed; no Carrossel, a sequência e a consistência entre os slides; no KV, a identidade da campanha.
- As margens seguras do formato são respeitadas e nada essencial foi cortado.
- A proporção do arquivo está correta para o formato.
- Numa adaptação, a peça é reconhecível como a mesma da peça mãe.

## Previsto para a v2

Ainda não implementado: trazer o resultado do Meta de volta para o fluxo, por peça de Ads (identificador do anúncio, CTR e CPA), para cruzar com a receita e ver quais códigos vendem melhor em cada cliente.

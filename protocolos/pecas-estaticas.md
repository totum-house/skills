# Protocolo de Peças estáticas

**Versão:** 1.4
**Status:** aprovado
**Aprovado em:** 10/11/2026
**Changelog 12/11/2026:** motor e prompt da direção de Felipe. A peça monta no ChatGPT Images with thinking; a receita colada tem 3 a 4 códigos.

Fluxo de qualquer peça estática de cliente: Ads, Posts, Carrossel e KV de campanha. O pedido chega pelo quadro Pedidos de Ads ou pela conversa. O caminho é o mesmo: briefing, design system, referência, copy, visual codes, teste, produção, adaptação, PSD e registro. O que muda por tipo está na tabela abaixo.

O molde do prompt, as 7 regras, as ideias por âncora e o QA rápido continuam na skill `totum-design-peca`. Onde essa skill ainda disser "Pedidos de peças", leia "Pedidos de Ads".

Não publique, não envie mensagem, não crie rotina, não gaste crédito pago e não altere produção sem aprovação explícita no chat.

O nome anterior deste protocolo era Ads. Quem chegar por esse nome encontra o atalho em [ads.md](ads.md).

## Um fluxo para toda peça estática

O processo é o mesmo para Ads, Posts, Carrossel e KV de campanha. A receita de visual codes é o que separa os tipos: cada um tem a sua, e uma receita de Ads não serve para Post.

| Tipo | Visual codes no prompt | Lote | Formato base | Copy na arte | Observação |
|---|---|---|---|---|---|
| **Ads** | uma emoção (`/urgency` ou `/confidence`), `/literal_copy`, `/brand_lock` | Sim: variações mudando um eixo por vez, para o teste no Meta ser legível | Feed 4:5 | Headline de até 8 palavras e CTA de até 5 | Oferta e CTA claros são obrigatórios |
| **Posts** | uma emoção do feed, `/literal_copy`, `/brand_lock` | Não, por padrão: uma peça por pauta, com variação só se pedida | Feed 4:5 | Curta; o texto principal vai na legenda, que é da equipe de social | Precisa conversar com o grid do feed. Sem CTA, escreva `sem CTA` |
| **Carrossel** | uma emoção, `/literal_copy`, `/brand_lock`. Sem `/carousel` | Não: a unidade é a sequência | Feed 4:5 por slide | Por slide, curta, literal | Capa, miolo e CTA final. O teste é a capa mais 1 slide de miolo. A referência segura a continuidade |
| **KV `<Campanha>`** | uma emoção, `/literal_copy`, `/brand_lock` | Não: o KV é a peça mãe da campanha | O que o pedido disser (em geral o maior ou o mais usado) | Título da campanha | Depois de aprovado, vira referência obrigatória das peças da campanha. As adaptações são desdobramentos |

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

A peça (layout, texto em pt-BR, logo e grafismos) monta no ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6), na sessão já aberta no navegador do agente. GPT-6 Astra (no chat, GPT-6 Pro) só em peça difícil ou quando Images with thinking falhar duas vezes. Uma mensagem Pro custa cerca de 5x (50 contra 10 créditos no Business) e a geração drena a cota de 3 a 5 vezes mais rápido. Grok Imagens e Nano Banana só para foto sem texto (personagem, cena): no teste inventaram CTA, completaram conteúdo errado e ignoraram o logo. Ideogram 4.0 e Recraft V4 são teste lado a lado, não o padrão. Cada cliente tem um chat por tipo de peça.

1. **Um chat por tipo de peça.** O nome segue `<Cliente> <Tipo> -<N>`, em que N é o número do chat. Use o nome do cliente exatamente como está no banco Clientes. Cada chat cobre um tipo só. Os tipos são:
   - `Ads`, anúncio pago. Exemplo: `<Cliente> Ads -1`.
   - `Posts`, post orgânico. Exemplo: `Cliente Exemplo Posts -1`.
   - `Carrossel`, carrossel. Exemplo: `Cliente Exemplo Carrossel -1`.
   - `KV <Campanha>`, key visual de uma campanha. Exemplo: `Cliente Exemplo KV Black Friday -1`.
   Se a conta tiver Projetos, crie o projeto `<Cliente>`, coloque o design system nas instruções do projeto e mantenha os chats de cada tipo dentro dele.
2. **Abertura do chat.** A primeira mensagem leva o link do design system (`kit-chatgpt.md` e `brand.md`), os negativos da marca e o logo oficial anexado, com 1 ou 2 grafismos. Não cole um mapa de layout. Peça uma confirmação em uma linha antes do primeiro prompt de peça.
3. **Mensagens seguintes.** Cada mensagem leva o prompt curto de `totum-design-peca` e os anexos da peça: referência boa e/ou KV, logo oficial e 1 ou 2 grafismos. Não dite o layout e não proíba elemento que está na referência.
4. **Quando abrir o chat `-<N+1>`.** Abra o próximo quando acontecer o primeiro destes casos: o chat erra cor, fonte, texto ou acentuação duas vezes seguidas; o chat ignora uma regra do design system; o chat passa de cerca de 20 peças geradas. O chat novo recomeça pela abertura do passo 2 e inclui um resumo curto das receitas aprovadas até ali. O chat antigo permanece como histórico.
5. **Registro.** No `receitas.md` do cliente, numa seção "Chats ChatGPT", anote o nome de cada chat, o endereço, a data e o motivo da troca. Em cada peça, registre em qual chat ela foi gerada.
6. Foto sem texto, se a peça precisar, sai no Grok Imagens ou no Nano Banana e entra como anexo. Não use esses motores para montar a peça. Não diga que gerou imagem quando entregou só o prompt.

## Fluxo obrigatório

Siga na ordem, sem pular etapas. Vale para todos os tipos. Num pedido pela conversa, faça todas as perguntas que faltarem de uma vez, numa mensagem só.

1. **Briefing de 1 minuto.** Tipo, objetivo, público, mensagem ou oferta, CTA quando houver, praça e formatos. Em Ads, sem oferta e CTA claros, não gere.
2. **Design system do cliente.** Use o design system ou o livro de regras (paleta, fontes, logo, restrições) em `1- Design System` e confira o banco Clientes. Se não existir, rode `manual-da-marca` ou `protocolo-design` antes. Mostre em uma linha o que herdou.
3. **Referência.** Uma referência boa e/ou o KV, o logo oficial e 1 ou 2 grafismos. Em Refazer, mantenha a peça e varie. Em Fazer de acordo, a referência manda: não dite layout e não proíba elemento que está nela. Cor e tipo ficam em `/brand_lock`. Peça de campanha segue o KV aprovado dela.
4. **Copy aprovada.** Feche por escrito o texto que vai na arte antes de gerar, no limite do tipo (tabela acima). Não invente preço, desconto, prazo nem benefício.
5. **Visual codes.** Rode `totum-visual-codes`. No prompt colado: uma emoção, `/literal_copy`, `/brand_lock` e `/logo_safezone` só se o logo não estiver anexado. Sem código de layout. Mostre RECEITA / POR QUE / PENDÊNCIAS. Se houver pendência, pare e pergunte.
6. **Teste no formato base.** Gere uma única peça no chat do cliente e do tipo. No Carrossel, a peça de teste é a capa mais 1 slide de miolo. Entregue com o prompt e a receita. Avalie no checklist e diga com franqueza o que está fraco. Mova o card para Teste e só siga depois da aprovação ou do pedido de ajuste.
7. **Produção.** Em Ads, gere as demais variações no formato base, mudando um eixo por vez (composição, hierarquia, enquadramento ou direção). No Carrossel, gere os slides restantes com a mesma receita. Em Posts e KV, só há variação se o pedido pedir. Cada peça nova vira um card filho em Revisar, criado e ligado pelo agente. Rode o checklist em cada uma. A aprovação é peça por peça.
8. **Adaptação de formatos.** Só depois da aprovação no formato base, adapte cada peça aprovada para os outros formatos pedidos (story 9:16, reels, quadrado e os demais do pedido). Mantenha a receita, a copy e a hierarquia, e reorganize só o layout para as margens seguras do formato. Não reinvente a peça. Cada adaptação vira um card filho, criado e ligado pelo agente, e também passa por aprovação.
9. **PSD só quando precisar.** Cada peça vai ao chat para aprovação antes do PSD ou dos slides finais. Faça PSD apenas das peças aprovadas que precisam de ajuste fino, ou quando o logo distorceu e o arquivo oficial entra no PSD, com `totum-imagem-para-psd`, camadas nomeadas e texto editável. Não faça PSD de tudo por padrão.
10. **Nomear e registrar.** O nome do arquivo leva cliente, tipo, campanha ou pauta, variação, formato e códigos principais, no formato `<cliente>-ads-campanha-v1-story-data_focus-bold`. Registre a receita e o chat de cada peça no `receitas.md` do cliente, separados por tipo, e no campo Receita.

## Texto e logo

- O texto da peça entra literal no ChatGPT, com `/literal_copy`, acentos e pontuação. Sem CTA, escreva `sem CTA`. Lista fechada: os itens exatos, para o motor não completar outros.
- O logo oficial nunca é gerado pela IA. Anexe o arquivo. Com logo anexado, a linha é `Use o logo e os grafismos anexados.` `/logo_safezone` só quando o arquivo não estiver anexado.
- Se o motor distorcer o logo, aplique o arquivo no PSD, depois da aprovação no chat.

## Checklist do teste, da produção e das adaptações

- O texto é idêntico à copy aprovada, com acentuação certa e nada inventado.
- O logo é o arquivo oficial. Se distorceu, a peça não segue até o arquivo entrar no PSD.
- Há um único foco dominante, e a mensagem é entendida em 3 segundos no celular.
- Paleta e fonte seguem o design system. Nada sai da marca.
- A emoção da receita aparece. Cor e tipo são da marca.
- As regras do tipo foram seguidas: em Ads, a oferta e o CTA; em Posts, a coerência com o feed; no Carrossel, a sequência e a consistência entre os slides; no KV, a identidade da campanha.
- As margens seguras do formato são respeitadas e nada essencial foi cortado.
- A proporção do arquivo está correta para o formato.
- Numa adaptação, a peça é reconhecível como a mesma da peça mãe.

## Previsto para a v2

Ainda não implementado: trazer o resultado do Meta de volta para o fluxo, por peça de Ads (identificador do anúncio, CTR e CPA), para cruzar com a receita e ver quais códigos vendem melhor em cada cliente.

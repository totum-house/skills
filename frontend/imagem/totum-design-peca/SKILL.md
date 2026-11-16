---
name: totum-design-peca
description: >-
  Use para criar peça visual de cliente do Totum Lab (anúncio Meta, post,
  carrossel, story, capa, KV), montando a peça no ChatGPT com Images with
  thinking (GPT-6, ChatGPT Images 2.6) ou entregando o prompt curto nesse
  molde; sempre depois de totum-visual-codes. Não serve para copy de LP,
  roteiro ou edição de vídeo.
---
# Totum Design Peça

v0.5, 12/11/2026. Changelog: motor e molde de prompt alinhados à direção de Felipe (Grupo Totum). A peça sai no ChatGPT Images with thinking; o prompt colado fica curto e segue a referência. Base: v0.4, 23/10/2026, skill totum-prompt-peca (testes de agosto de 2026), Prompt Compiler e QA Rápido do Visual-Codes-MVP, Design System Totum v1.1, regra DS-006 e o teste uPixel de 23/10/2026. Material de apoio: `apoio/logica-de-design/` (nesta pasta).

Notion (Clientes e Pedidos de peças) e o brand kit em `/workspace/totum-lab/design/clientes/<slug>/brand-kit/` são fontes externas a esta skill. Não estão neste repositório.

## Regra que organiza tudo

O prompt colado é curto e não dá direção prática além da referência. Verificação vem depois, no QA e na aprovação do chat, nunca dentro do prompt.

## Entrada

- Pedido individual na conversa, ou
- Lote: linhas do banco Pedidos de peças (Notion, Totum Lab > Design) ou uma planilha/CSV com cliente, formato, pauta, texto, receita opcional e prazo. Pegue os pedidos com status Pedido, mude para Gerando, e ao terminar para Revisar com o arquivo ou prompt anexado. Pedidos em Ajustar: leia a coluna Correção, refaça só o que foi pedido, volte para Revisar.

## Motor

Monte a peça (layout, texto em pt-BR, logo e grafismos) no ChatGPT, em Images with thinking (GPT-6, ChatGPT Images 2.6), no lote inteiro.

- GPT-6 Astra (no chat aparece como GPT-6 Pro) só em peça difícil ou quando Images with thinking falhar duas vezes. Uma mensagem Pro custa cerca de 5x os créditos de uma mensagem normal do GPT-6 (50 contra 10 no Business), e a geração de imagem drena a cota de 3 a 5 vezes mais rápido.
- Grok Imagens e Nano Banana só para foto sem texto (personagem, cena), nunca para montar a peça. No teste inventaram CTA, completaram conteúdo errado e ignoraram o logo.
- Ideogram 4.0 e Recraft V4 são teste lado a lado, não o padrão.
- O logo oficial nunca é gerado pela IA. Anexe o arquivo. Se o motor distorcer, aplique no PSD.
- Nunca diga que gerou imagem quando entregou só prompt.

## Fluxo

1. Livro de regras do cliente (Notion > Clientes, depois `/workspace/totum-lab/design/clientes/<slug>/brand-kit/brand.md`). Mostre em uma linha o que herdou.
2. Perguntas, só em pedido individual e só as que faltam: tipo de peça; objetivo e ação (em anúncio de mensagem o botão é nativo); texto pronto (avise se H1 > 8 palavras, CTA > 5); anexos; foto do ambiente real existe? Em lote, não pergunte: decida, registre a suposição no pedido.
3. Ideia criativa por âncora: 3 ideias (da pessoa, da referência, do negócio), desenháveis e do mundo do cliente. Individual: recomende uma e espere. Lote: escolha a melhor e registre as outras duas.
4. Receita: de totum-visual-codes. No prompt colado ficam 3 a 4 códigos, sem estruturais.
5. Anexos de toda geração: uma referência boa e/ou o KV, o logo oficial e 1 ou 2 grafismos da marca.
   - Faltou referência para o tema? Pesquise por cliente + tema (setor, data, oferta) no Designi (designi.com.br, conta logada no navegador) e no Pinterest (conta do Gmail da Totum no navegador). Use as prévias como referência; registre o link de cada uma. Designi tem 2 downloads por dia (re-download conta): baixe o PSD só quando precisar das camadas, e antes procure se o arquivo já está no Drive. Nunca curtir, salvar, seguir ou comentar.
6. Foto de personagem ou cena, sem texto, pode sair antes no Grok Imagens ou no Nano Banana e entrar como anexo. A peça em si sai no ChatGPT, no molde abaixo. Não dite o layout e não proíba elemento que está na referência. Se o logo distorcer, aplique o arquivo oficial no PSD. Se a fonte oficial não estiver instalada nessa hora, pare e avise; não substitua sem registrar.
7. Mande cada peça ao chat para aprovação antes do PSD ou dos slides finais. QA rápido, entrega e registro em `receitas.md`.

## As 7 regras

Valem no QA, não no prompt colado. A referência já cobre layout.

- R1 Legibilidade ativa: todo bloco de texto pousa sobre superfície que garanta leitura.
- R2 Encapsulamento: um recurso visual cerca ou aponta para o bloco mais importante. Um só.
- R3 Logo não é gerado: anexe o arquivo oficial. Se distorcer, aplique no PSD. A paleta sai do logo: dominante domina, acento em área pequena.
- R4 Ambiente não se inventa: com foto real, preservar arquitetura; sem foto, fundo de textura ou cor da paleta, ou externo genérico sem ponto reconhecível.
- R5 Duas fontes em contraste, nunca mais de duas.
- R6 Hierarquia por salto: entre H1 e H2, salto em pelo menos dois de tamanho, peso e cor.
- R7 Um destaque no H1, um só.

## Molde do prompt

```text
Objetivo: <o que a peça precisa fazer a pessoa sentir ou fazer, e a oferta se houver>
Design system da <Marca>: <link do design system da marca>
Referência anexada. Faça de acordo com a referência.
<opcional: uma linha do que gostamos na referência, ou uma ideia de foto>
Texto dos slides: <S1 (capa): ...> <S2: ...> ... (copy literal, cada slide)
Visual Codes:
/<emoção>: uma linha
/literal_copy: o texto aparece exatamente como foi escrito, com acentos e pontuação.
/brand_lock: só as cores e a tipografia da marca.
<"/logo_safezone" só se o logo NÃO estiver anexado; se estiver, a linha "Use o logo e os grafismos anexados.">
Negativos: <lista curta: negativos da marca, texto inventado ou ilegível, CTA inventado, logo gerado pela IA>
<ajustes manuais, por exemplo personagens>
```

- O bloco Visual Codes continua obrigatório no prompt colado (regra de 12/11/2026), com 3 a 4 códigos. Caem `/carousel`, `/visual_continuity`, `/type_hierarchy` e os códigos de layout: a referência já cobre.
- Sem CTA, escreva `sem CTA`. Lista fechada (por exemplo 5 itens): escreva os itens exatos, para o motor não completar outros.
- Não dite o layout e não proíba elemento que está na referência.

## QA rápido (SIM ou NÃO, fora do prompt)

1. Mensagem entendida em até 3 segundos no celular?
2. Uma única ideia visual dominante?
3. Parece do cliente sem depender só do logo?
4. Copy literal, legível, sem erro de acento, sem CTA inventado?
5. Pessoa, produto e ambiente respeitam os anexos?
6. A emoção da receita aparece no resultado?
7. O logo é o arquivo oficial, sem distorção? Se distorceu, o PSD recebe o arquivo.

Falhou: troque só o que o problema pede (a linha da emoção, a copy ou o anexo) e gere de novo. Duas falhas no Images with thinking: aí sim GPT-6 Astra. Registre resultado, o que mudou, motivo e próxima troca.

## Entrega

- Cada peça vai ao chat para aprovação antes do PSD ou dos slides finais.
- Arquivo: `DD-MM-cliente-primeiras-4-palavras-da-headline[-objetivo-001].png`, salvo na pasta de peças geradas do cliente seguindo a lógica da pasta Clientes do Drive.
- Prompt acima de 4.000 caracteres vai em `.md`.
- Nada vai para cliente nem é publicado sem aprovação do Rael.
- Peça aprovada vira referência candidata; reprovada vira anti-referência com motivo.

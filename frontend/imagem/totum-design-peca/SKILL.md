---
name: totum-design-peca
description: >-
  Use para criar peça visual de cliente do Totum Lab (anúncio Meta, post,
  carrossel, story, capa, KV), gerando a imagem direto ou entregando prompt
  pronto para Nano Banana ou ChatGPT Imagens; sempre depois de
  totum-visual-codes. Não serve para copy de LP, roteiro ou edição de vídeo.
---
# Totum Design Peça

v0.4, 23/10/2026. Base: skill totum-prompt-peca (testes de agosto de 2026), Prompt Compiler e QA Rápido do Visual-Codes-MVP, Design System Totum v1.1, regra DS-006 ("composição híbrida, nenhum texto crítico rasterizado") e o teste uPixel de 23/10/2026. Material de apoio: `apoio/logica-de-design/` (nesta pasta).

Notion (Clientes e Pedidos de peças) e o brand kit em `/workspace/totum-lab/design/clientes/<slug>/brand-kit/` são fontes externas a esta skill. Não estão neste repositório.

## Regra que organiza tudo

Prompt longo com checklist degrada o resultado. Alvo: 35 a 50 linhas. Verificação vem depois, no QA, nunca dentro do prompt.

## Entrada

- Pedido individual na conversa, ou
- Lote: linhas do banco Pedidos de peças (Notion, Totum Lab > Design) ou uma planilha/CSV com cliente, formato, pauta, texto, receita opcional e prazo. Pegue os pedidos com status Pedido, mude para Gerando, e ao terminar para Revisar com o arquivo ou prompt anexado. Pedidos em Ajustar: leia a coluna Correção, refaça só o que foi pedido, volte para Revisar.

## Saídas (escolha pelo pedido; padrão: imagem)

- **Imagem**: gere a cena, aplique texto e logo, entregue PNG.
- **Prompt Nano Banana** (Google Flow ou Gemini): prompt no molde abaixo + lista das 2 a 4 referências para anexar, em inglês ou pt-BR conforme o motor responder melhor; texto em pt-BR sempre literal entre aspas.
- **Prompt ChatGPT Imagens**: mesmo molde, em prosa direta, com instrução explícita de anexar as referências e de reproduzir o texto exato com acentuação.
Nunca diga que gerou imagem quando entregou só prompt.

## Fluxo

1. Livro de regras do cliente (Notion > Clientes, depois `/workspace/totum-lab/design/clientes/<slug>/brand-kit/brand.md`). Mostre em uma linha o que herdou.
2. Perguntas, só em pedido individual e só as que faltam: tipo de peça; objetivo e ação (em anúncio de mensagem o botão é nativo); texto pronto (avise se H1 > 8 palavras, CTA > 5); anexos; foto do ambiente real existe? Em lote, não pergunte: decida, registre a suposição no pedido.
3. Ideia criativa por âncora: 3 ideias (da pessoa, da referência, do negócio), desenháveis e do mundo do cliente. Individual: recomende uma e espere. Lote: escolha a melhor e registre as outras duas.
4. Receita: de totum-visual-codes.
5. Referências: anexe 2 a 4 imagens aprovadas do cliente ao motor. Sem referência a peça se afasta da marca.
   - Faltou referência para o tema? Pesquise por cliente + tema (setor, data, oferta) no Designi (designi.com.br, conta logada no navegador) e no Pinterest (conta do Gmail da Totum no navegador). Use as prévias como referência de composição, luz e clima; registre o link de cada uma. Designi tem 2 downloads por dia (re-download conta): baixe o PSD só quando precisar das camadas, e antes procure se o arquivo já está no Drive. Nunca curtir, salvar, seguir ou comentar.
6. Gere a cena sem texto e sem logo (padrão). Depois aplique texto e logo em camada determinística (Pillow/SVG, Remotion, Canva ou Figma) com a fonte oficial e o logo oficial. Se a fonte oficial não estiver instalada, pare e avise; não substitua sem registrar.
   - Exceção: texto curto gerado no motor quando o livro de regras do cliente disser que o teste provou fidelidade. O logo nunca é gerado.
7. QA rápido, entrega e registro em `receitas.md`.

## As 7 regras

- R1 Legibilidade ativa: todo bloco de texto pousa sobre superfície que garanta leitura.
- R2 Encapsulamento: um recurso visual cerca ou aponta para o bloco mais importante. Um só.
- R3 Logo não é gerado: reservar área limpa (~8%) no canto do livro de regras. A paleta sai do logo: dominante domina, acento em área pequena.
- R4 Ambiente não se inventa: com foto real, preservar arquitetura; sem foto, fundo de textura ou cor da paleta, ou externo genérico sem ponto reconhecível.
- R5 Duas fontes em contraste, nunca mais de duas.
- R6 Hierarquia por salto: entre H1 e H2, salto em pelo menos dois de tamanho, peso e cor.
- R7 Um destaque no H1, um só.

No modo cena sem texto, R1, R2, R5, R6 e R7 viram instrução de espaço no prompt e regra da composição por cima.

## Molde do prompt

```text
[PAPEL]
Você é diretor de arte de <tipo de peça> para <cliente>.
<anúncio interrompe o scroll | post se integra ao feed | carrossel tem costura entre slides>
Persegue: entendimento em 3 segundos no celular, uma ideia visual dominante.
Recusa: centralização sem propósito, template, stock genérico, duas metáforas.

[TAREFA]
<canal, praça, objetivo, ação>
<público em duas linhas, com o que não pode aparecer>

[MARCA] (/brand_lock)
<paleta com hierarquia e materiais>

[IDEIA VISUAL]
<uma frase concreta>

[COMPOSIÇÃO E DIREÇÃO]
<expansões dos códigos>

[PESSOA, PRODUTO OU AMBIENTE]
<expansões de fotografia; /identity_lock com pessoa real; R4>

[EMOÇÃO E NARRATIVA]
<expansões, sem repetir a ideia visual>

[ESPAÇO PARA TEXTO E LOGO]
Cena sem nenhum texto, letra, número ou logo.
Área calma de <25 a 40%> em <posição> para o texto (R1).
Área limpa de ~8% em <canto> para o logo (R3).
<elemento que encapsula o H1> (R2).

[FORMATO]
<proporção e pixels; no 9:16 a interface cobre 14% do topo e 20% da base>

[REFERÊNCIAS]
Ref 1..n: usar só <luz | materialidade | composição | personagem>. Não copiar texto, logo nem paleta de outra marca.

[EVITAR]
<negativos universais> + <proibido do livro de regras> + <anti-referências>
```

Se o texto for gerado junto, troque [ESPAÇO PARA TEXTO E LOGO] por [TEXTO] com H1, H2, tópicos e CTA literais, R1, R2, R5, R6, R7, "reproduza exato, com acentuação", texto em 20 a 35% do quadro (respeite o teto do cliente), sem emoji.

## Composição por cima

- Fonte oficial, logo oficial sem recolorir ou distorcer, copy literal com acento conferido.
- Teste de leitura em miniatura de 100 px.
- Exportar PNG e guardar o editável ou o script.

## QA rápido (SIM ou NÃO, fora do prompt)

1. Mensagem entendida em até 3 segundos no celular?
2. Uma única ideia visual dominante?
3. Parece do cliente sem depender só do logo?
4. Copy literal, legível, sem erro de acento?
5. Pessoa, produto e ambiente respeitam os anexos?
6. O código principal da receita aparece no resultado?
7. Logo: área limpa respeitada ou logo oficial aplicado idêntico?

Falhou: troque só o código ligado ao problema e gere de novo. Registre resultado, código responsável, motivo e próxima troca.

## Entrega

- Arquivo: `DD-MM-cliente-primeiras-4-palavras-da-headline[-objetivo-001].png`, salvo na pasta de peças geradas do cliente seguindo a lógica da pasta Clientes do Drive.
- Prompt acima de 4.000 caracteres vai em `.md`.
- Nada vai para cliente nem é publicado sem aprovação do Rael.
- Peça aprovada vira referência candidata; reprovada vira anti-referência com motivo.

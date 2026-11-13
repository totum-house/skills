# Protocolo de Design System

**Versão:** referência
**Status:** modelo de referência
**Nota 12/11/2026:** receitas em 3 a 4 códigos. O `kit-chatgpt.md` guarda link, negativos e a regra do logo. O prompt de cada peça é o molde curto de `totum-design-peca`, sem mapa de layout.

Descreve como preencher a pasta `1- Design System` de um cliente. A árvore do cliente, inclusive o que fica fora do template, está em [pastas-de-cliente.md](pastas-de-cliente.md). A reorganização em massa e a raiz seguem aquele protocolo, que ainda é rascunho pendente de aprovação.

Numa entrega de um cliente, com aprovação explícita no chat, crie ou complete `1- Design System` e mova só o que foi aprovado. Nada é apagado.

Este protocolo não serve para gerar anúncio, post ou KV do dia a dia (`totum-visual-codes` e `totum-design-peca`) nem para inventar ou redesenhar logo (`logo-studio`, só com aprovação explícita).

## Quando acionar outra skill

| Situação | Skill |
|---|---|
| Marca ainda sem livro interno, material bruto, conflito ou entrevista | `protocolo-design` |
| Produzir o pacote comercial: logo em vários formatos, regras com figuras, apresentação, mockups, manual em PDF, HTML e kit para o ChatGPT | `manual-da-marca` |
| Marca já documentada e falta fechar o kit que alimenta a produção de peças | `totum-kit-producao` |
| A identidade vive num site (URL ou HTML exportado) e falta extrair tokens | `design-system-extrator` |
| KVs ou posts a partir de 4 imagens de referência | `social-key-visual` |
| Boards ou pranchas visuais de identidade | `totum-kit-de-marca` |

Se o pacote comercial ou o kit de produção já existirem, reorganize e complete lacunas. Não gere de novo.

## Premissas

1. Cor, fonte e logo não se inventam. HEX se mede no arquivo oficial (vetor ou PNG). Fonte só entra com nome confirmado no arquivo, no PDF, no SVG ou pelo aprovador. O logo nunca é gerado, redesenhado ou digitado: só o arquivo oficial, aplicado como imagem.
2. O que faltar (cor, fonte, versão de logo, dado de contato, decisão de uso) vai para `08-pendencias.md`, marcado como pendente. Em peça e copy, use campo entre colchetes, por exemplo `[WHATSAPP OFICIAL]`.
3. Nada muda no Drive sem aprovação explícita no chat. Depois do ok, só mover ou adicionar. Duplicata e material antigo vão para `_legado/`, na pasta do cliente, fora do template.
4. Credencial não fica no Drive. Se aparecer arquivo de credencial, não abra, não copie o conteúdo e não o traga para o design system. Avise a equipe: o destino é um gerenciador de senhas. Não reproduza segredo em `08-pendencias.md`.
5. Nada vai ao cliente nem é publicado sem aprovação da equipe Totum no chat.
6. Escreva em pt-BR, direto, sem travessão e sem emoji.

## 1. Entrada

Antes de produzir, monte um inventário e um plano. Só gere arquivo depois do ok do plano.

Pedir à equipe, se ainda não estiver no material:

- arquivo-fonte do logo (AI, SVG ou equivalente) e o PNG oficial aprovado;
- versões que existem e quais são as do dia a dia (horizontal, vertical, símbolo, positiva, negativa, mono);
- nomes oficiais das fontes, arquivos e licença;
- paleta documentada, se houver (do contrário, medir no logo);
- posicionamento real: o que a marca é, para quem é, a promessa e o que nunca promete;
- dados oficiais: escrita da marca, WhatsApp, Instagram, endereço, razão social, CNPJ, quem assina;
- referências e peças aprovadas, e o que está só como candidato;
- quem aprova internamente.

No Drive, até o ok, só leitura. Classifique o que já existe: logo, regras, fontes, manual, apresentação, HTML, kit de produção, KVs, material antigo. Não abra arquivo de credencial.

No Notion, consulte o banco Clientes, base `<id-da-base>`. Na página do cliente, recolha o caminho da pasta, paleta, fontes, status, "A decidir" e o que já estiver documentado. Contradição entre Notion e Drive entra no inventário, sem escolher um lado sozinho.

Mostre numa tabela curta: o que já existe, o que falta, o que vai para pendências e o plano de montagem. Pergunte só o que o material não responde.

## 2. Árvore

Filhos diretos de `1- Design System`, nem um a mais:

```
<cliente>/
├── 1- Design System/
│   ├── 00-posicionamento/
│   ├── 01-logo/
│   │   ├── SVG/
│   │   ├── EPS/
│   │   ├── PDF/
│   │   ├── PNG-com-fundo/
│   │   ├── PNG-transparente/
│   │   └── LEIA-ME.txt
│   ├── 02-regras/
│   ├── 03-fontes/
│   ├── 04-apresentacao/
│   ├── 05-mockups/
│   ├── 06-manual/
│   ├── 07-design-system/
│   │   ├── fontes/
│   │   ├── marca/
│   │   ├── <slug>-design-system-vX.Y.html
│   │   └── kit-chatgpt.md
│   ├── Kit de producao/
│   │   ├── AAAA-MM-DD-brand.md
│   │   ├── AAAA-MM-DD-receitas.md
│   │   ├── AAAA-MM-DD-referencias-LEIA-ME.md
│   │   └── referencias/
│   │       ├── aprovados/
│   │       └── candidatos/
│   ├── 08-pendencias.md
│   └── LEIA-ME.md
├── Automações/
├── Governança/
├── _legado/
└── 4- Site/
```

`Automações/`, `Governança/`, `_legado/` e `4- Site/` ficam na pasta do cliente, fora do template. Este protocolo não preenche o processo de `Automações/` nem o de `Governança/`. A pasta de site se chama `4- Site`.

Persona, PUV e documentos do mesmo tipo vão para `00-posicionamento/`.

Scripts de build e QA, se existirem, ficam fora do Drive e não entram no `LEIA-ME.md` como se fossem pasta do pacote.

Pasta do cliente que já exista e não faça parte desta árvore permanece no lugar, salvo movimentação aprovada para dentro de `1- Design System` ou para `_legado/`.

### O que vai em cada pasta

| Pasta | Conteúdo |
|---|---|
| 00-posicionamento | `posicionamento.md` e, se houver, PDF ou HTML. Persona, PUV e equivalentes entram aqui. Só material real: o que a marca é, para quem, promessa e o que nunca promete. Sem arquétipo inventado. |
| 01-logo | Pacote oficial nos cinco formatos abaixo, mais `LEIA-ME.txt` com ordem de preferência, uso de cada versão e formato por canal. Opcional: `contato-pacote.png`. |
| 02-regras | `regras.md`, `paleta.csv` (nome, HEX, RGB, CMYK, Pantone, token, papel) e figuras em `img/`: área de proteção, tamanho mínimo, versões e fundos, 6 a 8 usos incorretos, paleta, tipografia. |
| 03-fontes | Uma subpasta por família, arquivos oficiais, `OFL.txt` ou comprovante de licença, e `LEIA-ME.md` (papel, pesos, o que a licença permite). Fonte comercial sem licença: substituta OFL explícita, registrada nas pendências. |
| 04-apresentacao | PDF 16:9, 16 a 20 páginas; `paginas/` com as lâminas soltas. Opcional: `contato-apresentacao.png`. |
| 05-mockups | 4 a 8 aplicações (`mockup-<suporte>.png`). Logo vetorial aplicado por cima, nunca gerado. Se a cena for ilustração de algo que ainda não existe, a legenda deixa isso explícito. |
| 06-manual | PDF A4, 8 a 10 páginas (capa, versões, proteção e mínimo, paleta, tipografia, usos incorretos, aplicações, contato do time). Campo em branco se faltar dado. Opcional: `paginas/` e `contato-manual.png`. |
| 07-design-system | Só a versão vigente do HTML, `kit-chatgpt.md`, cópia das fontes em `fontes/` e cópia dos SVGs oficiais em `marca/`. O HTML usa imagem, nunca texto no lugar do logo. |
| Kit de producao | Livro e receitas com prefixo de data, mais referências separadas em aprovados e candidatos. |
| _legado | Fora do template, na pasta do cliente. Versões anteriores do HTML, logos superados, manuais antigos, duplicatas. |

A apresentação e o manual seguem o roteiro de `manual-da-marca`. Se essa skill já tiver gerado os PDFs, mova para as pastas certas.

### Nomenclatura

- `slug`: nome do cliente em minúsculas, sem acento, com hífen. No texto genérico, use `<cliente>`.
- Logo, mesmo nome-base em todos os formatos: `<slug>-logo-<versao>.svg` (e `.eps`, `.pdf`).
- PNG transparente: `<slug>-logo-<versao>-1000px.png` e `-3000px.png`.
- PNG com fundo: `<slug>-logo-<versao>-fundo-<cor>-1000px.png` e `-3000px.png`. A cor do fundo entra no nome, por exemplo `branco` ou a cor oficial escura.
- HTML: `<slug>-design-system-vX.Y.html`.
- Kit: `AAAA-MM-DD-brand.md`, `AAAA-MM-DD-receitas.md`, `AAAA-MM-DD-referencias-LEIA-ME.md`.

### Formatos de logo exigidos

Cada versão oficial sai nos cinco formatos:

1. **SVG.** Site, sistemas e apps.
2. **EPS.** Gráfica e programas de design antigos.
3. **PDF.** Formato preferido de impressão (placa, fachada, brinde).
4. **PNG com fundo.** 1000 px e 3000 px de largura. Fundo branco ou fundo escuro oficial da marca.
5. **PNG transparente.** 1000 px e 3000 px. Apresentações, documentos e sistemas que não aceitam SVG.

Canais: gráfica pede PDF (EPS se a gráfica pedir); site pede SVG; redes e WhatsApp pedem PNG com fundo (3000 px para post e capa, 1000 px para o resto); apresentações pedem PNG transparente de 3000 px.

Versões mínimas do pacote: horizontal-positiva, horizontal-negativa, vertical-positiva, vertical-negativa (se a marca tiver vertical), simbolo-cor. Mono, cinza e só o nome entram quando o material oficial tiver. Versão de baixo contraste fica no pacote só como restrita, com aviso no LEIA-ME, ou sai do uso do dia a dia se a equipe decidir. Evite dezenas de combinações sem pedido.

Ordem de preferência padrão, ajustada ao que a marca tiver:

1. horizontal-positiva, uso principal, fundo claro.
2. horizontal-negativa, mesmo desenho, fundo escuro.
3. vertical positiva e negativa, espaço mais alto que largo.
4. simbolo-cor, avatar, ícone, favicon, espaço pequeno.
5. só o nome, quando o símbolo já aparece na mesma peça.
6. mono e cinza, uma cor, bordado, carimbo, impressão em preto.

## 3. Modelos de LEIA-ME.md e 08-pendencias.md

Preencha os campos entre colchetes. Apague a linha se o item não existir. Não descreva pasta que não está no Drive.

### LEIA-ME.md

```markdown
# [Cliente] · design system

Atualizado em [AAAA-MM-DD]. Status: [rascunho interno / aguardando aprovação / vigente].
Pasta no Drive: <caminho-da-pasta>
Notion: página do cliente na base <id-da-base>

| Pasta | Conteúdo |
|---|---|
| 00-posicionamento | [o que tem, ou "vazio, ver 08-pendencias"] |
| 01-logo | [N versões em SVG, EPS, PDF e PNG; ver 01-logo/LEIA-ME.txt] |
| 02-regras | [regras.md, paleta.csv, figuras] |
| 03-fontes | [famílias, licença] |
| 04-apresentacao | [<slug>-apresentacao-marca.pdf, N páginas 16:9] |
| 05-mockups | [lista curta dos mockups] |
| 06-manual | [<slug>-manual-marca.pdf, N páginas A4] |
| 07-design-system | [<slug>-design-system-vX.Y.html, kit-chatgpt.md] |
| Kit de producao | [data do brand.md e das receitas] |
| 08-pendencias.md | [dados e decisões que faltam] |

Versão vigente do HTML: v[X.Y]. Versões anteriores estão em `_legado/`, na pasta do cliente, fora deste template.
O logo nas peças e no HTML é sempre o arquivo oficial de `01-logo/SVG` (cópia em `07-design-system/marca/`).
```

### 08-pendencias.md

```markdown
# [Cliente] · pendências do design system

Atualizado em [AAAA-MM-DD].

## 1. Dados reais que faltam (não inventar)

| Dado | Onde vai | Situação |
|---|---|---|
| Razão social | | Pendente / confirmado em [data] |
| CNPJ | | |
| WhatsApp oficial | | |
| Instagram oficial | | |
| Endereço | | |
| Nome e cargo de quem assina | | |
| Contato do time de marca | | |

## 2. Identidade incompleta

- [ ] Logo fonte oficial (formato e local)
- [ ] Versões que faltam ou estão restritas
- [ ] Paleta: HEX medido; CMYK/Pantone [medidos / aproximados / pendentes]
- [ ] Fontes oficiais e licença
- [ ] Área de proteção e tamanho mínimo [do material / proposta da equipe, a confirmar]

## 3. Decisões da equipe Totum

- [decisão aberta, opção recomendada, o que está valendo provisoriamente]

## 4. Material antigo ou duplicado

- [o que foi para `_legado/`, na pasta do cliente]
- [se houver credencial fora do lugar: registrar só que existe e que o destino é o gerenciador de senhas; sem segredo e sem trazer o arquivo para cá]

## 5. Envio

Nada sobe no Drive nem vai ao cliente sem aprovação no chat.
```

## 4. Roteiro do HTML e versionamento

Arquivo: `07-design-system/<slug>-design-system-vX.Y.html`. Página única, índice fixo no desktop, exemplos vivos quando fizer sentido, clique no HEX copia a cor, botão copia o bloco de tokens. Tema claro e escuro. Fontes oficiais via font-face em `fontes/` (serviço de fontes na web só se a licença permitir). Contrastes conferidos no padrão WCAG. Combinação que reprovar entra como proibida ou restrita, com a razão medida.

Só a versão vigente fica em `07-design-system/`. Ao publicar uma nova, mova o HTML anterior para `_legado/`, na pasta do cliente. Incremente Y para ajuste de token, copy ou correção. Incremente X quando mudar identidade (logo, paleta, família tipográfica ou estrutura das seções). A seção inicial do HTML lista o que mudou nesta versão.

Seções, nesta ordem. Omita a que o material não sustentar e registre a lacuna nas pendências:

1. **Novidades.** O que mudou nesta versão.
2. **Marca.** Versões do logo (arquivo em `marca/`), uso restrito, use assim / não faça, área de proteção (medida-base de um elemento estável do símbolo), ordem de preferência, fundos e tamanho mínimo (px e mm).
3. **Cores.** Amostras com HEX clicável; papel de cada cor; proporção de uso, se medida; tabela de impressão (HEX, RGB, CMYK, Pantone; marque o que for aproximado); tabela de contraste; cores semânticas de interface (ok, atenção, erro, informação), só se existirem no material.
4. **Tipografia.** Famílias, papéis (título / texto), pesos, licença, arquivos, escala oficial. Não digite o nome da marca como se fosse o logo.
5. **Espaço e forma.** Base 4 px; escala `space-1` a `space-9` (4, 8, 12, 16, 24, 32, 48, 64, 96), salvo outra escala já documentada; raios (`sm`, `md`, `lg`, `xl`, `pill`); sombras; grafismo proprietário, se houver, com a regra de uso.
6. **Componentes.** Só os que a marca realmente usa (botões no claro e no escuro, chips, formulário, cards, tabela, aviso de rodapé). Um botão principal por tela. Se não houver produto digital, troque por aplicações curtas e registre a escolha.
7. **Padrões de página.** Se houver site ou landing: ordem das seções, largura máxima, ritmo, o que é assinatura de layout.
8. **Voz e copy.** Tom, faça / não faça, CTAs aprovados, proibições. Sem inventar oferta, depoimento ou dado de contato.
9. **Tokens CSS.** Bloco copiável (`<slug>-tokens.css`) com cores de marca e de superfície, tipografia, `space-*`, raios, sombras, ângulo de grafismo se houver, e overrides de tema escuro.

Escala tipográfica de partida. Estes números só organizam o HTML. Não substituem a fonte oficial, e entram ajustados aos valores confirmados da marca:

- Display: até 56 px / 1.04 / peso de título
- H2: até 34 px / 1.1
- H3: 20 px / 1.3
- Número: cerca de 46 px, tabular
- Corpo: 16 px / 1.55
- Pequeno: 13.5 px
- Rótulo: 11.5 px, caixa alta se a marca usar

Tokens mínimos no bloco copiável: cores (marca, superfície, texto, linha, estados), `--font-display`, `--font-body`, `--fs-display`, `--fs-h2`, `--fs-h3`, `--fs-body`, `--fs-small`, `--fs-label`, `--space-1` a `--space-9`, `--r-sm`, `--r-md`, `--r-lg`, `--r-xl`, `--r-pill`, `--shadow-panel`, `--shadow-btn`.

## 5. Kit de producao e kit-chatgpt.md

Acione `totum-kit-producao` para fechar o kit. Espelhe o resultado nesta pasta, com prefixo de data. As duas camadas ficam separadas: o pacote 00 a 07 e o manual são a entrega de marca; o kit é o que a equipe usa para produzir peça.

**brand.md** cabe numa leitura só: identidade; paleta com HEX e hierarquia (RGB, CMYK e Pantone se a entrega tiver); tipografia; logo e usos; linguagem visual; tom de voz e proibidos de copy; códigos visuais do cliente (só entram na biblioteca com aprovação); seção Nunca; A decidir; hierarquia de fontes do material; aprovador; histórico. Separe o que é confirmado, o que é proposta da equipe e o que está a confirmar. Antes de sobrescrever um `brand.md` vigente, guarde cópia em `_legado/` ou backup datado.

**receitas.md:** 2 a 4 receitas-base (feed 4:5, carrossel, story 9:16, anúncio) no formato enxuto de `totum-visual-codes`: emoção, `/literal_copy`, `/brand_lock` e `/logo_safezone` só sem o arquivo do logo. Sem código de layout. Cada uma traz RECEITA, POR QUE e o que evitar. Diário curto de peças, se houver histórico. O protocolo de peças estáticas pede também a seção "Chats ChatGPT".

**referencias:** `aprovados/` é o que já vale para produzir; `candidatos/` aguarda aprovação. O LEIA-ME data, origem e status. As duas pastas não se misturam. Referência de terceiro vale por composição, luz e clima, nunca por paleta, logo ou texto.

**kit-chatgpt.md** (em `07-design-system/`): prompt mestre para colar no projeto da IA, mais a orientação de anexar o PNG oficial de `01-logo/PNG-transparente` (e a prancha da paleta, se houver). Estrutura:

1. Marca: ideia, promessa, público, personalidade. Só o confirmado.
2. Tom de voz: faça, proibido, CTAs aprovados, grafia do nome.
3. Cores: só as oficiais, HEX exato, regras de contraste.
4. Tipografia: famílias, pesos, papéis.
5. Grafismo, se houver, com limite de uso.
6. Logotipo: nunca desenhar, imitar ou digitar o logo. Anexe o arquivo oficial. Sem anexo, `/logo_safezone`. Se o motor distorcer, aplique o arquivo no PSD.
7. Fotografia: o que pode e o que evitar. Sem inventar pessoa, loja ou ambiente que não existam. Foto sem texto fica no Grok Imagens ou no Nano Banana.
8. A peça monta no ChatGPT, Images with thinking. O prompt de cada peça não dita layout: a referência cobre. Cor e tipo ficam em `/brand_lock`.
9. Formatos: feed 4:5 (1080×1350), 1:1 se precisar, story 9:16 (zona segura), anúncio. O formato não vira aula de layout no prompt.
10. Como trabalhar: copy literal fechada antes de gerar. Sem CTA, escreva `sem CTA`. Lista fechada, itens exatos. Cada peça volta ao chat para aprovação antes do PSD ou dos slides finais. Nunca inventar dado de contato.
11. Checklist de entrega.

## 6. Checklist de qualidade

- [ ] Inventário e plano aprovados antes de produzir ou de mover arquivo
- [ ] `1- Design System` com os onze itens do template; nenhuma pasta listada no LEIA-ME está vazia sem nota nas pendências
- [ ] Logo só do vetor oficial; mesmas versões nos cinco formatos; nomes padronizados; QA visual contra o PNG oficial
- [ ] `01-logo/LEIA-ME.txt` com ordem de preferência, restrições e formato por canal
- [ ] Paleta medida; CMYK e Pantone marcados se aproximados; contraste medido
- [ ] Fontes com licença ou substituta OFL documentada
- [ ] Posicionamento só com fonte real, inclusive Persona e PUV quando existirem
- [ ] Apresentação de 16 a 20 páginas em 16:9 e manual de 8 a 10 páginas em A4, se esta entrega os incluir
- [ ] Mockups com logo aplicado, não gerado
- [ ] HTML vigente em vX.Y, seções sustentadas pelo material, tokens copiáveis, logo via imagem; versões antigas em `_legado/`
- [ ] `kit-chatgpt.md`, `brand.md` e `receitas.md` preenchidos com o que foi confirmado
- [ ] Tudo o que faltou está em `08-pendencias.md`; nenhum hex, fonte, logo ou dado de contato foi inventado
- [ ] Drive: nada movido ou criado sem ok; nada apagado; credencial intocada

## 7. Drive, aprovação e credenciais

1. Trabalho local ou rascunho primeiro. Mostre o pacote e o `08-pendencias.md`.
2. Com o ok, crie a árvore, adicione arquivos novos e mova o que foi aprovado para `1- Design System` ou para `_legado/`. Confira a contagem.
3. Se uma pasta antiga ficar só com arquivo de sistema (`.DS_Store`, `._*`, `desktop.ini`), ela permanece. A remoção desses arquivos e de pastas vazias é a rodada posterior do protocolo de pastas, depois da lista aprovada.
4. Atualize a página do cliente no banco Clientes (`<id-da-base>`) só com o que foi verificado: caminho da pasta, versão vigente do HTML, status e "A decidir".
5. Avise em poucas linhas o que ficou pronto e o que ficou pendente.

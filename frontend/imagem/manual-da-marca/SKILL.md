---
name: Manual da Marca
description: >-
  Use para montar a entrega completa de marca de um cliente (pacote de logo,
  regras de uso, posicionamento, apresentação, mockups, manual em PDF e design
  system HTML com kit para ChatGPT), a partir de uma identidade já existente
  ou recém-aprovada. Não serve para cadastrar só o brand kit interno de produção
  (use protocolo-design) nem para gerar peça do dia a dia (use totum-design-peca).
---
# Manual da Marca

v1.0, 05/11/2026. Padrão Totum de entrega de identidade visual para o cliente, calibrado na entrega da CredPara (29/10/2026) e no estudo da entrega da Cenova. Objetivo: organizar, documentar e apresentar a marca de forma usável, sem inventar o que o material não diz.

## Quando usar

- O cliente já tem logo e identidade aprovados (ou quase), e falta o pacote de entrega.
- O Rael pede "manual da marca", "entrega de marca", "apresentação de identidade", "pacote de logo" ou "padrão CredPara".
- Você precisa transformar uma marca existente em material apresentável + usável (manual, regras, DS, mockups).

Não use para:
- cadastrar só o livro interno de produção (`protocolo-design`);
- gerar anúncio, post ou KV (`totum-visual-codes` + `totum-design-peca`);
- redesenhar ou inventar logo (`logo-studio`, e só com OK explícito).

## Relação com outras skills

| Skill | Papel |
|---|---|
| `protocolo-design` | Livro interno (`brand.md`, `receitas.md`) para o Lab produzir peças. Roda em paralelo ou antes. |
| `totum-visual-codes` / `totum-design-peca` | Peças do dia a dia depois que a marca está documentada. |
| `totum-kit-de-marca` | Geração de imagens de kit/deck. Pode ajudar em boards, mas o Manual da Marca é o pacote completo. |

## Premissas

1. O logo nunca é gerado nem redesenhado. Exporta do arquivo original (`.vectorcraft`, AI, SVG fonte) ou, se o Rael autorizar, vetoriza o PNG oficial sem reinventar a geometria.
2. Nenhum hex, fonte, CNPJ, telefone, endereço ou depoimento é inventado. O que faltar fica marcado como pendência.
3. Nada sobe no Drive, vai para o cliente ou é publicado sem o OK do Rael.
4. Só adicione arquivos na pasta do cliente. Não renomeie, mova nem apague o que já existe; liste duplicatas e proponha.
5. Escreva em pt-BR, direto, sem travessão e sem emoji.

## Estrutura da entrega

Pasta local: `clientes/<slug>/entrega-marca/`

```
entrega-marca/
├── LEIA-ME.md
├── 00-posicionamento/     posicionamento.md (+ PDF/HTML se houver)
├── 01-logo/               versões em SVG, EPS, PDF, PNG (+ LEIA-ME)
├── 02-regras/             área de proteção, mínimo, usos incorretos, paleta, tipografia
├── 03-fontes/             arquivos + licenças (OFL ou comprovante)
├── 04-apresentacao/       PDF 16:9, 16 a 20 páginas (+ páginas soltas)
├── 05-mockups/            4 a 8 aplicações com logo vetorial aplicado por cima
├── 06-manual/             PDF A4, 8 a 10 páginas (manual de uso)
├── 07-design-system/      HTML interativo + kit-chatgpt.md + fonts/
├── 08-pendencias.md
└── fonte/                 scripts de build e QA (não sobem no Drive)
```

No Drive do cliente, sobe numa pasta datada do tipo `Entrega de marca AAAA-MM-DD`, dentro da pasta que o Rael indicar (em geral sob `1-Logo` ou equivalente). Scripts de `fonte/` ficam de fora.

## Fluxo (ordem cronológica)

### 1. Inventário e plano (sem produzir ainda)

Abra a pasta do Drive e o material local só em leitura. Classifique o que já existe:

- **Essencial:** logo nos 4 formatos, versões principais (horizontal, símbolo, vertical/selo se houver), positivo/negativo/mono, paleta HEX/RGB/CMYK/Pantone, tipografia com licença, área de proteção, tamanho mínimo, usos incorretos, contraste, tom de voz.
- **Para cativar:** narrativa até a revelação, conceito do símbolo, revelação em tela cheia, páginas de cor com significado, mockups finais, HTML interativo.
- **Dispensável:** páginas que repetem a mesma ideia, combinações excessivas de cor do logo, mockups em TIFF gigantes, lixo de sistema.

Mostre ao Rael: o que já existe, o que falta, o plano em 8 passos (abaixo) e as perguntas que só ele responde (logo aprovado? fontes oficiais? entra posicionamento? tamanho da apresentação?). Só comece a produzir depois do OK do plano.

### 2. Brand kit local e duplicatas

Atualize `clientes/<slug>/brand-kit/` (`brand.md`, `receitas.md`, `logo/`, `referencias/`) com o que for confirmado. Liste duplicatas e pastas confusas no Drive em `duplicatas-drive.md`, sem mexer nelas.

### 3. Pacote de logo

1. Localize o arquivo fonte (`.vectorcraft`, AI, SVG). Preferência: exportar do fonte, não redesenhar.
2. Exporte as versões necessárias (em geral 4 a 6; evite dezenas de combinações).
3. Gere SVG, EPS, PDF e PNG (com e sem fundo) a partir do vetor. PNG antigo não entra no pacote novo.
4. Compare cada versão com o PNG oficial (QA visual/script). Diferença aceitável: serrilhado de borda.
5. Resolva com o Rael: espaçamento do nome, versões que faltam no fonte (ex.: negativa), versões de baixo contraste (marcar como restritas ou tirar do pacote).
6. Escreva o LEIA-ME: qual versão usar em cada caso, nomes padronizados, o que fica de fora.

### 4. Regras de uso

Documente, com figuras quando ajudar:

- área de proteção (medida-base de um elemento estável do logo, ex. altura do chip/símbolo);
- tamanho mínimo por versão (px e mm);
- fundos permitidos e contraste (meça; se WCAG reprovar, marque);
- 6 a 8 usos incorretos (esticar, girar, mudar cor fora da paleta, sombra gratuita, fundo que some, redesenhar);
- paleta com HEX, RGB, CMYK e Pantone (Pantone aproximado quando não houver match);
- tipografia: papéis (título/texto), pesos, o que não usar;
- tom de voz curto: "fale assim / não assim".

O que for proposta do Lab (não veio do estúdio nem do cliente) fica marcado como proposta, para o Rael confirmar.

### 5. Posicionamento

Bloco curto (1 a 3 páginas), só com material real: reunião, briefing, site, entrevista. Inclui o que a marca é, para quem é, a promessa e o que nunca promete. Sem arquétipo inventado e sem Golden Circle de enchimento.

### 6. Apresentação (16 a 20 páginas, 16:9)

Roteiro enxuto (aprovar o roteiro antes de desenhar, se o Rael pedir):

1. Capa
2. O desafio / o contexto
3. A ideia (frase do conceito)
4. O símbolo explicado
5. Revelação em tela cheia (1 a 4 fundos)
6. Versões do logo
7. Paleta (uma página)
8. Tipografia
9. Tom de voz
10. Regras rápidas (proteção, mínimo, usos incorretos)
11. Aplicações / mockups (2 a 4 páginas)
12. Encerramento + contato da Totum (sem inventar dados)

Não copie o volume de 64 páginas da Cenova. O logo aparece depois de justificado, mas sem dezenas de páginas de estratégia repetida.

### 7. Mockups

1. Gere cenas limpas (produto ou ambiente sem logo e sem texto da marca), ou use fotos reais autorizadas.
2. Aplique o logo vetorial por cima. O logo nunca é gerado pela IA.
3. Em tecido escuro, use a versão mono clara (bordado). Em porcelana e superfícies brilhantes, integre o logo ao material (sem cara de adesivo solto).
4. Entregue 4 a 8 mockups. Escolha 4 a 6 para a apresentação; o resto fica de reserva.
5. Se a cena for ilustração de algo que ainda não existe (loja futura, projeção), a legenda deixa isso explícito.

### 8. Manual em PDF (8 a 10 páginas, A4)

Manual de uso para imprimir ou mandar ao cliente: capa, versões, proteção e mínimo, paleta, tipografia, usos incorretos, aplicações, contato do time (campo a preencher se faltar dado). Sem narrativa longa.

### 9. Design system HTML + kit ChatGPT

- HTML interativo com seções: identidade, logo, cores (clique copia HEX), tipografia, regras, tom de voz, tokens (CSS/JSON se fizer sentido), exemplos.
- `kit-chatgpt.md`: prompt mestre e restrições para gerar cena sem logo/texto; o logo entra depois, aplicado do pacote.
- Fontes oficiais com licença na pasta `fonts/`. Se a fonte comercial não estiver licenciada, use substituta OFL explícita e registre a troca.

### 10. Pendências, aprovação e Drive

Preencha `08-pendencias.md` com:

- dados reais que faltam (razão social, CNPJ, WhatsApp, Instagram, endereço, assinatura);
- decisões do Rael (versões restritas, Pantone, tamanhos mínimos);
- peças antigas que ainda usam PNG/fonte errados e ficam para depois.

Mostre o pacote completo. Depois do OK, suba só os arquivos de entrega (sem `fonte/`) na pasta datada do Drive. Confira a contagem local × Drive. Avise em uma linha o que ficou pronto e o que ficou pendente.

## Checklist rápido de aceite

- [ ] Logo só do vetor oficial; QA contra PNG oficial
- [ ] LEIA-ME de versões
- [ ] Regras com proteção, mínimo e usos incorretos
- [ ] Paleta medida; Pantone marcado se aproximado
- [ ] Fontes com licença ou substituta OFL documentada
- [ ] Posicionamento só com fonte real
- [ ] Apresentação 16–20 p. e manual 8–10 p.
- [ ] Mockups com logo aplicado, não gerado
- [ ] DS HTML + kit ChatGPT
- [ ] Pendências listadas; Drive só após OK; nada enviado ao cliente sem OK

## Preço de referência (para o Rael cobrar)

Faixas sugeridas pela pesquisa de mercado usada na CredPara (atualizar se o Rael pedir nova pesquisa):

1. **Essencial:** logo com poucas versões, paleta, tipografia, regras básicas, guia curto, 2 mockups.
2. **Completo (padrão deste skill):** posicionamento curto, apresentação ~20 p., manual ~10 p., 6–8 mockups, tom de voz.
3. **Completo + sistema:** acrescenta DS HTML, kit para IA e modelos de post.

Não invente valores na conversa com o cliente. Se o Rael pedir preço, rode pesquisa atualizada ou use a faixa que ele definir.

## Histórico

- v1.0 (05/11/2026): extraído do processo CredPara (Lab Design) e do estudo da entrega Cenova, para virar o padrão Totum de entrega de marca.

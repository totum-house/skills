---
name: video-prompting
description: >-
  Use para escrever ou refinar prompt para um modelo de vídeo específico (Veo 3,
  Seedance 2.0 e 2.5, Wan 2.2, Wan Animate 2, LTX-2, LTX-2.3, LTX-2.5, MiniMax
  H3, Ovi), em texto para vídeo, imagem para vídeo ou por referência, ou para
  criar folha de personagem e manter o mesmo rosto entre cenas.
---
# Video prompting

Origem: `square-zero-labs/video-prompting-skill@video-prompting` (Apache 2.0), adaptada para o Totum Lab. Os guias por modelo em `references/` ficam em inglês, como no original. Para direção de câmera, luz e cor, use junto com `cinematografia-prompt`. Gerar em ferramenta paga só com OK do Rael.

Transforma a intenção em:
- um prompt de vídeo no formato exigido pelo modelo, ou
- um prompt de imagem para folha de personagem, que depois sustenta a consistência em imagem para vídeo.

## Índice de modelos
- Ovi: `references/models/ovi/prompting.md`
- Veo 3 / 3.1: `references/models/veo3/prompting.md`
- Wan 2.2: `references/models/wan22/prompting.md`
- Wan Animate 2: `references/models/wan-animate-2/prompting.md`
- Seedance 2.0: `references/models/seedance2/prompting.md`
- Seedance 2.5: `references/models/seedance2-5/prompting.md`
- MiniMax H3: `references/models/minimax-h3/prompting.md`
- LTX-2: `references/models/ltx2/prompting.md`
- LTX-2.3: `references/models/ltx2-3/prompting.md`
- LTX-2.5: `references/models/ltx2-5/prompting.md`

Fluxo de folha de personagem: `references/workflows/character-sheets.md`.
Modelo sem guia (Kling, Grok Imagine, Sora, Runway): use a estrutura do guia mais parecido (Seedance ou Veo) e a `cinematografia-prompt`; se for virar uso frequente, crie `references/models/<modelo>/prompting.md` e adicione aqui.

## Regras globais
- Não colocar nome ou versão do modelo, duração, proporção, resolução ou nomes de parâmetros no texto do prompt, a menos que o esquema do modelo exija tempo (ex.: timestamps do MiniMax H3).
- Duração serve só para planejar quantas ações cabem.
- Parâmetros, quando pedidos, vão fora do prompt numa linha "Parâmetros recomendados".
- Imagem para vídeo: a imagem é a âncora visual. Não descreva a imagem em detalhe; foque em movimento, câmera, emoção e áudio.

## Fluxo
1. Rotear: prompt de vídeo ou folha de personagem? Se for os dois, nesta ordem: folha de personagem, still de cena (frame âncora), prompt de vídeo.
2. Identificar modelo e modo de entrada (texto para vídeo, imagem para vídeo, primeiro e último frame, referência, edição, extensão). Sem modelo definido, recomende um e siga. Pergunte só o mínimo que o guia exige (duração efetiva, estado final da cena). Recomende a menor duração que comporta a ação.
   - MiniMax H3: distinguir T2VA, I2VA, FL2VA, L2VA e referência completa.
   - Seedance 2.5: distinguir texto, imagem, referência, edição e extensão.
   - LTX-2.3: padrão de 10 s como configuração externa.
   - LTX-2.5: distinguir plano único, multi-plano nativo, diálogo em formato roteiro, Dub-It e edição IC-LoRA.
3. Abrir o `prompting.md` do modelo (ou o guia de folha de personagem) e seguir o formato à risca.
4. Redigir. Antes de entregar, remover menções a modelo, duração, proporção e configurações, exceto tempo exigido pelo esquema.
5. Entregar:
   - Por padrão, só o prompt final em inglês, numa linha, mais a tradução em pt-BR para revisão.
   - Exceções multilinha: MiniMax H3 (campos e ordem obrigatórios), Seedance 2.5 em planos complexos com timeline, LTX-2.5 com diálogo em formato roteiro.
   - Se pedirem opções: 2 ou 3 variantes completas e independentes.
   - Fluxo completo de consistência: depois da folha de personagem, entregue o prompt do primeiro still de cena e o prompt do plano de imagem para vídeo.

## Regras da casa
- Sem travessão no texto em pt-BR.
- Peça de cliente segue o design system e o roteiro aprovado; não inventar dado de cliente.
- Pessoas reais (cliente, pastor, sócio) só com autorização de uso de imagem.

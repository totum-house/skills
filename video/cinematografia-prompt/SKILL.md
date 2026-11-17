---
name: cinematografia-prompt
description: >-
  Use para escrever prompt de imagem ou vídeo com direção de cinema (footage,
  cena, plano de comercial, B-roll): enquadramento, ângulo, lente, movimento de
  câmera, iluminação, color grade, textura de filme e blocking. Combine com
  video-prompting quando o prompt for para um modelo específico (Veo, Seedance,
  Kling, Grok Imagine).
---
# Cinematografia para prompt (footage)

Origem: `fal-ai-community/skills@cinematography` (licença MIT, fal.ai), adaptada para o Totum Lab. Removido o fluxo do gerador pago genmedia/fal: aqui a skill entrega a direção de cena e o prompt pronto. Gerar no ChatGPT Imagens, Nano Banana, Grok Imagine ou outro que a casa já usa; qualquer gerador pago só com OK do Rael.

Use quando o pedido precisa de direção de cinema de verdade, não um "deixa cinematográfico" genérico. Consulte conforme a necessidade:
- `references/shot-language.md` (planos, ângulos, movimentos)
- `references/lighting-lens-color.md` (luz, lente, cor, textura)
- `references/examples.md` (padrões de prompt)

Escreva direção visual concreta. Evite adjetivos vazios de prestígio ("épico", "premium", "cinematográfico" sozinho) e nunca use travessão.

## O que levantar (só o que muda o plano)
- Sujeito e ação.
- Mídia: still, vídeo, imagem para vídeo, edição, frame de storyboard.
- Gênero e clima.
- Enquadramento: close, médio, aberto, zenital, POV, perfil, câmera travada.
- Movimento (vídeo): push-in, dolly, travelling, câmera na mão, grua, drone.
- Lente: grande angular, normal, tele, macro; profundidade de campo rasa ou ampla.
- Luz: natural, prática, estúdio, noir, high key, low key, contraluz.
- Saída: proporção (9:16, 4:5, 16:9), duração, primeiro e último frame.
- Modelo preferido, se houver.

## Ordem de montagem do prompt (SCLCAM)
1. Sujeito: quem ou o que está no quadro.
2. Contexto: local, hora, clima, momento da história.
3. Lente e enquadramento: distância, ângulo, sensação de focal, profundidade de campo.
4. Movimento de câmera: só em vídeo ou se quiser motion blur.
5. Atmosfera: névoa, chuva, luzes práticas, reflexos, textura.
6. Clima e cor: paleta, contraste, grade, exposição.
7. Controles de saída: proporção, duração, continuidade do primeiro frame.

Estrutura:
```text
[sujeito] em [contexto], enquadrado como [plano e ângulo], [lente], [iluminação], [movimento se vídeo], [color grade], [textura], [duração ou proporção], [restrições de continuidade]
```
Os modelos respondem melhor em inglês: escreva o prompt final em inglês e mande a tradução em pt-BR junto para o Rael revisar.

## Roteamento de modelo (referência)
- Still realista: ChatGPT Imagens. Still estilizado: ChatGPT Imagens ou Nano Banana.
- Vídeo de maior qualidade e linguagem de câmera complexa: Seedance 2.0/2.5 ou Kling.
- Movimento a partir de um frame forte: imagem para vídeo.
- Vídeo rápido ou barato: Grok Imagine.
- Sequência com história: roteiro aprovado (Lab Roteiro) e esta skill como linguagem de plano.
- Continuidade de personagem ou produto: folha de personagem (video-prompting) primeiro, depois esta skill.
- Formato específico do modelo: carregue `video-prompting`.

## Critério de qualidade (antes de entregar)
- Movimento de câmera fisicamente plausível para a cena.
- Lente, tamanho de plano e ângulo não se contradizem.
- Direção da luz clara e consistente.
- Color grade apoia o clima sem achatar o detalhe do sujeito.
- Prompt de vídeo descreve um plano só, salvo se o modelo aceitar lista de planos.
- Peça de cliente segue o design system dele (protocolo-design, totum-visual-codes) e não inventa dado.

Se o resultado ficar genérico, ganhe especificidade em câmera, blocking, luz e ambiente antes de somar adjetivos.

# Etapa 8, Responsividade

Reduzir o desktop não é responsividade. Cada breakpoint é uma decisão de composição.

Defina para cada breakpoint:
grid, ordem dos elementos, escala da headline, comportamento da imagem,
o que some, como a prova social se transforma, o que acontece com o menu, o CTA.

```yaml
responsive:
  desktop:
    breakpoint: 1280
    layout: split
    content_span: 5
    media_span: 7
  tablet:
    breakpoint: 768
    layout: split-condensed
    headline_scale: 0.76
    decorations: reduced
  mobile:
    breakpoint: 390
    layout: stacked
    order: [header, content, media, social-proof]
    headline_scale: 0.62
    navigation: collapsed
    social_proof: horizontal-scroll
    hidden: [decorative-pattern, glow]
    media_treatment: crop-to-faces
```

## Decisões que precisam de nome explícito

**Ordem no mobile.** Media antes ou depois da copy muda a taxa de conversão. Escolha e justifique.

**Corte da imagem no mobile.** Uma foto de dois profissionais lado a lado em 390px vira duas cabeças minúsculas. Opções: cortar em um só, empilhar, ou recortar nos rostos. Decida na spec, não na hora de montar.

**Prova social.** Três cards sobrepostos no desktop não cabem no mobile. Vira scroll horizontal, stack, ou some. Se sumir, some com qual justificativa.

**Altura da hero no mobile.** Defina se ocupa viewport inteiro ou se o conteúdo seguinte precisa aparecer. Recomendação: sempre deixe um resquício da próxima seção visível.

Tudo aqui é `inferred`. Toda linha desta etapa vai para open-questions.

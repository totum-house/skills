# Etapas 5 e 6, Tokens e Componentes

## Etapa 5, Tokens em DTCG

Use o padrão W3C Design Tokens (`$value` / `$type`). Custo zero e te dá interoperabilidade
direta com Figma Variables, Tokens Studio e Style Dictionary. Não invente formato próprio.

```json
{
  "color": {
    "brand-primary": {
      "$value": "#E31E24",
      "$type": "color",
      "$extensions": { "hds.confidence": "estimated", "hds.source": "vision" }
    }
  },
  "dimension": {
    "container-max": {
      "$value": "1240px",
      "$type": "dimension",
      "$extensions": { "hds.confidence": "estimated", "hds.anchor": "proportional" }
    }
  }
}
```

Todo token carrega `hds.confidence`. Sem isso, o valor vira verdade sem ter sido medido.

### O que extrair

Cor: primária, secundária, texto (3 níveis), fundo, borda, estado.
Ranqueie por área ocupada na imagem, não por o que parece mais bonito.

Tipografia: família (ou classificação, tipo "sans geométrica" quando não der para identificar),
escala, peso, line-height, letter-spacing.

Espaçamento: derive uma unidade base (4 ou 8) e expresse tudo como múltiplo.
Se a imagem não fecha em múltiplo limpo, a unidade está errada, teste outra.

Forma: raio de borda, sombra, opacidade, blur.

### Regra da âncora

Nunca declare px absoluto sem âncora. Ordem de preferência da âncora:
1. largura de container informada pelo cliente
2. export de Figma
3. screenshot em viewport conhecido
4. nenhuma, então tudo vira proporção

## Etapa 6, Componentes

Cada componente importante ganha spec própria, com estados e limites.

```yaml
primary_cta:
  label: "Agendar avaliação"
  icon: calendar
  icon_position: left
  height_ratio: 0.042
  height_px_at_1240: 52
  padding_x: 24
  radius_token: radius.button
  bg_token: color.brand-primary
  states: [default, hover, focus, disabled, loading]
  confidence: estimated
```

O que a imagem nunca mostra e você tem que decidir (e listar em open-questions):
estados de hover e foco, comportamento de loading, limite de caracteres,
truncamento, estado vazio, o que acontece com texto longo em outro idioma.

Para texto, sempre declare limite:

```yaml
headline:
  content: "Recuperação de verdade exige mais que uma especialidade só"
  emphasized: "de verdade"
  max_lines_desktop: 4
  max_lines_mobile: 5
  max_chars: 68
  role: primary-message
```

Sem `max_chars`, o cliente troca a headline por uma 40% maior e quebra o layout.

## Etapa 6b, interaction_spec

Bloco obrigatório no modo FULL. Imagem estática não mostra comportamento, então **tudo aqui
é `inferred` por definição** e tudo aqui vai para `open-questions.md`.

Sem este bloco, quem gera o código (Lovable, v0, Claude Code, Kimi) inventa. E inventa
diferente a cada rodada, o que quebra a consistência entre telas.

```yaml
interaction_spec:
  defaults:
    transition_duration: 200ms
    easing: cubic-bezier(0.4, 0, 0.2, 1)
    focus_ring: 2px solid color.brand-primary, offset 2px
    reduced_motion: respeitar prefers-reduced-motion, cortar transform e parallax

  primary_cta:
    hover: brightness 0.92, elevação sobe um nível
    active: scale 0.98
    focus_visible: focus_ring
    disabled: opacity 0.5, cursor not-allowed
    loading: spinner substitui o ícone, largura travada para não pular

  nav_link:
    hover: underline cresce da esquerda, 200ms
    active_page: peso 600, sem underline

  proof_card:
    hover: elevação sobe um nível, translateY -2px
    click: none (não é interativo, é informativo)

  media:
    entrance: fade e translateY 16px, 400ms, uma vez, ao entrar na viewport
    parallax: none

  scroll:
    reveal: seções entram com fade curto, sem stagger longo
    sticky_header: após 80px, fundo sólido, altura reduz 20%
```

### Regras de decisão

Na dúvida, **conservador**. Transição de 200ms e hover discreto nunca estragam uma peça.
Animação inventada estraga.

Nunca infira: modal, drawer, carrossel automático, som, vídeo em autoplay, scroll hijacking.
Se a imagem sugere um desses, isso vira pergunta, não spec.

Sempre declare: estado de foco visível (é acessibilidade, não enfeite), comportamento com
`prefers-reduced-motion`, e o que acontece no toque, já que hover não existe em mobile.

Todo item deste bloco entra em `open-questions.md` no formato:
"Assumido X. Impacto se errar: baixo. Confirmar com o cliente."

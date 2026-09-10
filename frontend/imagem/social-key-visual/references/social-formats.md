# Formatos de Redes Sociais — Referência Técnica

## Dimensões por formato

| Formato | Dimensão | Proporção | Uso |
|---|---|---|---|
| Feed quadrado | 1080×1080px | 1:1 | Instagram feed, carrossel |
| Retrato feed | 1080×1350px | 4:5 | Instagram feed vertical (maior alcance) |
| Stories / Reels | 1080×1920px | 9:16 | Stories, Reels, TikTok |
| Feed paisagem | 1080×566px | 1.91:1 | Twitter/X, LinkedIn |

## Zonas de segurança (safe zones)

### Stories 9:16 (1080×1920)
- Zona segura vertical: 250px do topo e 250px da base (área de interação da UI)
- Zona útil central: 1080×1420px
- Margem lateral segura: 96px de cada lado

### Feed quadrado 1:1 (1080×1080)
- Margem segura: 72px em todos os lados
- Zona útil: 936×936px

### Feed retrato 4:5 (1080×1350)
- Margem segura: 72px em todos os lados
- Zona útil: 936×1206px

## Peso tipográfico mínimo para legibilidade mobile

| Elemento | Tamanho mínimo | Recomendado |
|---|---|---|
| Corpo de texto | 28px | 32-36px |
| Subtítulo | 36px | 42-48px |
| Título | 56px | 72-120px |
| Destaque / Display | 80px | 100-180px |
| Label pequeno | 22px | 26px |

## Contraste mínimo (WCAG AA)
- Texto normal sobre fundo: 4.5:1
- Texto grande (18px+): 3:1
- Ferramenta de checagem rápida: multiplicar diferença de luminosidade

## Paleta típica de layouts para social

### Layout tipo A — "Hero Text"
- 70% background sólido ou gradiente suave
- 20% tipografia grande (título como elemento visual)
- 10% detalhes (linha, ícone, logo, CTA)

### Layout tipo B — "Split"
- Metade superior: imagem ou cor de impacto
- Metade inferior: zona de texto estruturada
- Divisor: linha fina ou mudança de cor

### Layout tipo C — "Full Bleed"
- Imagem ou cor ocupa 100% do canvas
- Texto sobreposto com garantia de contraste
- Overlay de cor semitransparente quando necessário

### Layout tipo D — "Card"
- Background externo (cor suave ou escura)
- Card interno com sombra sutil ou borda
- Conteúdo dentro do card com respiro generoso

## Anatomia de um post eficaz

```
┌─────────────────────────┐
│  [elemento de impacto]  │  ← primeiros 3 segundos
│                         │
│  TÍTULO PRINCIPAL       │  ← mensagem central
│  subtítulo ou apoio     │
│                         │
│  corpo (se necessário)  │  ← contexto adicional
│                         │
│  [CTA ou logo]          │  ← ação ou identidade
└─────────────────────────┘
```

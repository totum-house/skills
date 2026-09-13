---
name: brand-totum
description: >
  Identidade visual completa da Totum. Carregue antes de gerar qualquer UI, anúncio, peça de conteúdo
  ou artefato visual. Define tokens de cor, tipografia, glassmorphism, gradientes, glows, motion e
  padrões proibidos. Use quando o usuário pede "crie uma tela Totum", "no estilo da Totum",
  "componente para o Totum OS", "siga a identidade visual da Totum" ou quando qualquer agente
  precisar produzir output visual alinhado à marca. Padrão de uso: REFERENCE → BRAND_SKILL → Agent → Studio output.
metadata:
  version: 1.0.0
  updated: 2026-09-13
  source: Totum OS design tokens + preferências Rael
---

# Brand Totum — Identidade Visual Canônica

Você é o design lead da Totum. Antes de gerar qualquer UI, anúncio ou peça visual, leia este documento completo e siga sem desvios. Este é o contrato visual da marca.

---

## 1. Tokens de Cor (fonte canônica: Totum OS `tokens.css`)

### Base & Superfícies
```
--bg:                #0e0918   ← fundo OLED principal (roxo-grafite escuro)
--background:        #0e0918
--surface:           #1b1728   ← cards e painéis
--surface-elevated:  #1f192a   ← modais, dropdowns
--surface-hover:     #272333
--card:              #1b1728
--cool-graphite:     #191422   ← variante grafite fria
```

### Acento Principal — Vermelho Totum
```
--primary / --accent:      #da2128
--brand-red-bright:        #e3433e
--brand-red-vibrant:       #da2128
--brand-red-light:         #ef9a9a
--accent-soft:             rgba(218, 33, 40, 0.125)
--accent-muted:            rgba(218, 33, 40, 0.10)
```

### Azul Profundo (acento secundário, UIs tech/data)
```
--secondary:         #077ac7
--info:              #077ac7
--info-soft:         rgba(7, 122, 199, 0.125)
```
> Use azul quando o contexto for dashboard/CRM/data (uPixel, BuildOps, Alexandria).
> Use vermelho quando o contexto for marketing, LP, Totum OS, branding.

### Roxo (acento terciário, IA/automação)
```
--tertiary:              #6b21ef
--brand-purple-bright:   #a06ff6
--type-command:          #BF5AF2
```

### Bordas
```
--border:           #1f192a
--border-strong:    #272333
--border-hairline:  rgba(255, 255, 255, 0.10)   ← hairline glassmorphism
--border-brand:     rgba(218, 33, 40, 0.30)     ← borda luminosa vermelha
border-blue-glow:   rgba(7, 122, 199, 0.30)     ← borda luminosa azul (não em token, use inline)
```

### Texto
```
--text-primary:    #ffffff
--text-secondary:  #9ca3af
--text-muted:      #9ca3af
--white-soft:      #d1cece
```

### Sombras & Glows
```
--shadow-ambient:       0 1px 2px rgba(8,8,8,.2), 0 4px 4px rgba(8,8,8,.08)
--shadow-inset-highlight: inset 0 1px 1px rgba(255,255,255,.19), inset 0 6px 12px rgba(255,255,255,.12)
--shadow-brand-halo:    0 7px 80px -12px #da2128   ← glow vermelho ambiente
--shadow-blue-halo:     0 7px 80px -12px #077ac7   ← glow azul ambiente
--shadow-card-inset:    inset 0 0 0 1px rgba(255,255,255,.10), inset 0 1px 0 0 rgba(255,255,255,.10)
```

---

## 2. Tipografia

**Fonte principal:** `Geomanist` (primária) → fallback `Outfit` → `ui-sans-serif`
**Fonte mono:** `ui-monospace, Menlo, Monaco, Consolas`

```css
--font-heading: 'Geomanist', 'Outfit', ui-sans-serif, system-ui, sans-serif;
--font-body:    'Geomanist', 'Outfit', ui-sans-serif, system-ui, sans-serif;
--font-strong:  'Geomanist Book', 'Geomanist', 'Outfit', ui-sans-serif, system-ui, sans-serif;
```

### Escala de tamanhos
```
Display hero:      72px  (mobile: 40px)   line-height: 100%
Display large:     54px  (mobile: 36px)
Section heading:   48px  (mobile: 32px)   line-height: 1.1
Subheading large:  38px  (mobile: 28px)
Subheading:        32px  (mobile: 24px)   line-height: 1.2
Body large:        20px
Body:              16px                   line-height: 1.5
Caption:           14px                   line-height: 1.4
Caption small:     12px
```

**Letter-spacing:** títulos `−0.02em` (tight), corpo `0em`

---

## 3. Glassmorphism — Padrão de Execução

O estilo visual da Totum é **dark glassmorphism**: camadas de vidro sobre fundo OLED, com luz que vaza pelas bordas. Não é frosted glass genérico — é hardware premium de alto contraste.

### Card glassmorphism canônico (Tailwind)
```jsx
<div className="
  relative
  bg-white/[0.04]
  backdrop-blur-xl
  border border-white/10
  rounded-2xl
  shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]
  overflow-hidden
">
  {/* Borda luminosa de topo */}
  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  {children}
</div>
```

### Variantes de borda luminosa
```css
/* Vermelha (brand) */
border: 1px solid rgba(218, 33, 40, 0.30);
box-shadow: 0 0 20px -4px rgba(218, 33, 40, 0.25);

/* Azul (data/tech) */
border: 1px solid rgba(7, 122, 199, 0.30);
box-shadow: 0 0 20px -4px rgba(7, 122, 199, 0.25);

/* Branca sutil (neutral) */
border: 1px solid rgba(255, 255, 255, 0.10);
```

### Blur levels
```
backdrop-blur-sm   → menus, tooltips leves
backdrop-blur-xl   → cards principais
backdrop-blur-2xl  → modais, hero elements, overlays
backdrop-blur-3xl  → foco máximo (use com moderação)
```

---

## 4. Gradientes & Background Mesh

### Fundo com mesh gradient (padrão para hero sections)
```css
background: #0e0918;
background-image:
  radial-gradient(ellipse 80% 50% at 50% -20%, rgba(218,33,40,0.15) 0%, transparent 60%),
  radial-gradient(ellipse 60% 40% at 80% 80%, rgba(7,122,199,0.10) 0%, transparent 50%),
  radial-gradient(ellipse 50% 30% at 10% 60%, rgba(107,33,239,0.08) 0%, transparent 50%);
```

### Gradiente de acento (botões, CTAs)
```css
/* Vermelho Totum */
background: linear-gradient(135deg, #da2128 0%, #e3433e 100%);

/* Azul Totum */
background: linear-gradient(135deg, #077ac7 0%, #0ea5e9 100%);

/* Glassmorphism button */
background: rgba(218, 33, 40, 0.15);
border: 1px solid rgba(218, 33, 40, 0.40);
backdrop-filter: blur(8px);
```

### Glow ambiente (elementos em destaque)
```css
/* Vermelho brand */
box-shadow:
  0 0 40px -8px rgba(218, 33, 40, 0.40),
  0 7px 80px -12px rgba(218, 33, 40, 0.25);

/* Azul tech */
box-shadow:
  0 0 40px -8px rgba(7, 122, 199, 0.35),
  0 7px 80px -12px rgba(7, 122, 199, 0.20);
```

---

## 5. Raios de Borda (Border Radius)

```
--radius-sm:   6px    → badges, tags, inputs pequenos
--radius-md:   8px    → botões, campos de formulário
--radius-lg:   16px   → cards normais
--radius-xl:   24px   → cards grandes, modais
--radius-full: 9999px → pills, avatars, dots
```

**Nested border radius (Double-Bezel):** quando um card tem outer radius `24px`, o inner container usa `calc(24px - 6px) = 18px`. Nunca o mesmo radius em camadas aninhadas.

---

## 6. Micro-animações & Motion

### Princípio: motion como feedback, não decoração
- Uma transição orquestrada por página bate 10 micro-animações espalhadas.
- Hover e focus: `transition: all 150ms ease-out`
- Entradas de modal/sheet: `150ms ease-out` para abrir, `100ms ease-in` para fechar
- Contadores, números: `300ms ease-out` com spring leve

### Padrões aprovados (Tailwind)
```jsx
/* Hover em card */
className="transition-all duration-150 ease-out hover:scale-[1.01] hover:shadow-brand-glow"

/* Hover em botão primário */
className="transition-all duration-150 ease-out hover:brightness-110 hover:shadow-[0_0_20px_-4px_rgba(218,33,40,0.5)]"

/* Entrada fade+slide */
className="animate-in fade-in slide-in-from-bottom-2 duration-300"

/* Skeleton pulse */
className="animate-pulse bg-white/5 rounded-lg"
```

### Padrões proibidos
```
❌ transitions com delay > 200ms em interações hover
❌ bounce ou elastic em elementos funcionais (só em ilustrações/empty states)
❌ spin animations em ícones funcionais
❌ parallax pesado em mobile
❌ `animation-iteration-count: infinite` fora de loading states
```

---

## 7. Espaçamento

```
--space-xs:  4px
--space-sm:  8px
--space-md:  16px
--space-lg:  24px
--space-xl:  32px
--space-2xl: 48px
```

**Regra de seção:** mínimo `py-16` (64px) entre seções de conteúdo em desktop. Mobile: `py-10` (40px).

---

## 8. Referências de Qualidade

Antes de finalizar qualquer output visual, cheque contra estas referências:

| Referência | O que estudar |
|------------|---------------|
| **Apple** (apple.com) | Uso de espaço negativo, tipografia em movimento, hierarquia de produto |
| **Stripe** (stripe.com/br) | Cards com gradiente sutil, copy técnico mas humanizado, confiança visual |
| **Linear** (linear.app) | Dark mode perfeito, glassmorphism sem exagero, velocidade percebida |
| **Vercel** (vercel.com) | Contraste extremo light/dark, noise texture, motion econômico |
| **Raycast** (raycast.com) | Blur + glassmorphism real, paleta monocromática com acento único, shortcuts visíveis |

**Pergunta-filtro antes de publicar:** "Isso poderia ser confundido com uma landing page genérica de IA?" → Se sim, revise.

---

## 9. Padrões Proibidos (Anti-patterns)

```
❌ Inter como fonte heading (use Geomanist/Outfit)
❌ Fundo branco ou creme em produtos digitais Totum (dark-first)
❌ Bordas cinza sólidas opacas (use border-white/10 ou border-brand)
❌ Sombra drop-shadow genérica rgba(0,0,0,0.3)
❌ Ícones thick-stroke FontAwesome/Material (use Phosphor Light ou Lucide com stroke-width 1.5)
❌ Grid Bootstrap simétrico 3 colunas sem whitespace
❌ Badge/pill com fundo sólido sem blur ou borda
❌ Gradiente "AI padrão": cream background + terracota (#D97757) — é cor do Claude, não da Totum
❌ Headline com apenas 1 palavra em destaque colorida (visual de template)
❌ ALL CAPS em labels regulares (só em elementos de status muito específicos)
```

---

## 10. Padrão de Uso (amirmushich pattern)

```
[REFERENCE] → [BRAND_SKILL.md] → [Agent] → [Studio output]
```

1. **REFERENCE**: Colete referências visuais do contexto do projeto (screenshots, URLs, briefs)
2. **BRAND_SKILL**: Carregue este documento — ele é o filtro de qualidade
3. **Agent**: O agente aplica as referências dentro dos tokens Totum (não substitui os tokens pelas referências)
4. **Studio output**: Resultado final alinhado à marca e único para o projeto

**Regra crítica:** Referências externas (Apple, Stripe, etc.) informam a *qualidade* e o *approach*, mas nunca substituem os tokens da Totum. Um botão CTA sempre usa `#da2128`, mesmo que a referência coletada use outra cor.

---

## 11. Checklist de Validação Visual

Antes de entregar qualquer output visual, confirme:

```
[ ] Usa Geomanist / Outfit — não Inter ou Roboto
[ ] Fundo é escuro (#0e0918 ou derivado) — nunca branco
[ ] Cards têm backdrop-blur + border-white/10
[ ] Acento primário é vermelho Totum (#da2128) ou azul (#077ac7) conforme contexto
[ ] Glows são sutis — não ultrapassam opacity 0.4
[ ] Border radius seguindo a escala (6/8/16/24px)
[ ] Motion < 200ms para interações, < 400ms para entradas de tela
[ ] Nenhum padrão proibido da seção 9
[ ] Passa o filtro: "não parece LP genérica de IA"
```

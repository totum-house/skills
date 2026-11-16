---
name: image
description: "When the user wants to create, generate, edit, or optimize images for marketing — blog heroes, social graphics, product mockups, profile banners, listing visuals, or brand assets. Also use when the user mentions 'AI image generation,' 'generate an image,' 'create a graphic,' 'product mockup,' 'hero image,' 'social media graphic,' 'banner image,' 'cover photo,' 'profile banner,' 'listing screenshot,' 'Flux,' 'Flux Kontext,' 'Midjourney,' 'DALL-E,' 'GPT Image,' 'ChatGPT Images,' 'Ideogram,' 'Gemini image,' 'Nano Banana,' 'Recraft,' 'Stable Diffusion,' 'Canva,' 'Figma,' 'image optimization,' 'compress images,' 'WebP,' or 'OG image.' Use this for general-purpose marketing image creation and optimization. For paid ad image creative and platform-specific ad specs, see ad-creative. For video production, see video."
metadata:
  version: 2.1.0
---

# Image

v2.1.0, 12/11/2026. Changelog: peça com texto monta no ChatGPT Images with thinking; Grok e Nano Banana ficam na foto sem texto.

You are an expert visual content producer who helps create marketing images using AI generation models, design tools, and optimization best practices. Your goal is to help users produce professional visual assets efficiently — from blog heroes and social graphics to product mockups and profile banners.

## Padrão Totum (12/11/2026)

Monte a peça (layout, texto em pt-BR, logo e grafismos) no ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6), no lote inteiro. GPT-6 Astra (no chat, GPT-6 Pro) só em peça difícil ou depois de duas falhas. Uma mensagem Pro custa cerca de 5x os créditos de uma mensagem normal do GPT-6 (50 contra 10 no Business), e a geração de imagem drena a cota de 3 a 5 vezes mais rápido. Grok Imagens e Nano Banana só para foto sem texto (personagem, cena): no teste inventaram CTA, completaram conteúdo errado e ignoraram o logo. Ideogram 4.0 e Recraft V4 são teste lado a lado, não o padrão. O logo oficial nunca é gerado pela IA. Anexe o arquivo. Se distorcer, aplique no PSD.

Anexe referência boa e/ou KV, o logo oficial e 1 ou 2 grafismos. Não dite o layout e não proíba elemento que está na referência. Sem CTA, escreva `sem CTA`. Lista fechada: os itens exatos. Cada peça vai ao chat para aprovação antes do PSD ou dos slides finais.

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
Negativos: <negativos da marca, texto inventado ou ilegível, CTA inventado, logo gerado pela IA>
<ajustes manuais, por exemplo personagens>
```

O bloco Visual Codes continua obrigatório no prompt colado, com 3 a 4 códigos. Sem `/carousel`, `/visual_continuity`, `/type_hierarchy` nem código de layout. A tabela de modelos abaixo é referência de teste, não a escolha padrão da peça.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather this context (ask if not provided):

### 1. Image Goal
- What type of image? (Blog hero, social graphic, product mockup, banner, brand asset, OG image)
- What platform or placement? (Website, social, directory listing, app store, email)
- What dimensions do you need?

### 2. Production Approach
- Do you have existing brand assets? (Logo, colors, fonts, style guide)
- Do you need photorealistic or illustrative style?
- Is this a one-off or a template for repeated use?

### 3. Technical Context
- Do you have API keys for any image tools? (Gemini, Replicate/Flux, Ideogram)
- Budget constraints? (Some tools charge per image)
- Do you need the image optimized for web performance?

---

## Choosing Your Approach

Pick the right tool for the job:

| Approach | Best For | Tools | When to Use |
|----------|----------|-------|-------------|
| **AI Generation** | Original images from text prompts | ChatGPT Images with thinking for pieces with text; Grok or Nano Banana only for photos with no text | Blog heroes, social graphics, lifestyle scenes |
| **AI Editing** | Modify existing images | Gemini, Flux Flex | Background removal, style changes, variations |
| **Design Tools** | Templated, brand-consistent assets | Canva, Figma | Profile banners, social templates, presentations |
| **Screenshot + Overlay** | Product UI showcases | Browser screenshot + code overlay | Product mockups, feature announcements |
| **Stock Photography** | Generic business/lifestyle scenes | Unsplash, Pexels | When speed matters more than uniqueness |

---

## AI Image Generation

Generate original images from text prompts. The fastest way to create unique marketing visuals.

### Model Comparison

| Model | Best For | Text in Images | API | Cost |
|-------|----------|:-:|-----|------|
| **Gemini Image** (Google, "Nano Banana" / Nano Banana Pro) | Foto sem texto (personagem, cena). Não monta peça com texto, CTA ou logo | Só sem texto | [Gemini API](https://ai.google.dev/gemini-api/docs/image-generation) | Check [pricing](https://ai.google.dev/gemini-api/docs/pricing) |
| **Flux** (Black Forest Labs — Pro 1.1, Kontext, Dev, Schnell) | Photorealism, brand consistency, batch; Kontext for in-image editing | Limited | [BFL API](https://docs.bfl.ai/), Replicate, fal.ai | Check [pricing](https://docs.bfl.ai/quick_start/pricing) |
| **Ideogram 4.0** | Teste lado a lado, não o padrão da peça | Forte em texto | [Ideogram API](https://developer.ideogram.ai/) | Check [pricing](https://about.ideogram.ai/api-pricing) |
| **ChatGPT Images 2.6 / GPT-6, Images with thinking** (OpenAI) | Padrão Totum para montar a peça com texto, logo e grafismos | Padrão | ChatGPT, modo Images with thinking | Crédito da mensagem GPT-6; Pro (Astra) só na exceção |
| **Midjourney v7** | Artistic, high-aesthetic, art-directed visuals | Improved | No official API; Discord + Web | Subscription-based |
| **Recraft V4** | Teste lado a lado, não o padrão da peça | Ilustração e vetor | [Recraft API](https://www.recraft.ai/docs) | Per-credit |
| **Stable Diffusion 3.5 / SDXL** | Self-hosted, customizable, fine-tunable | Varies | Open source | Free (GPU costs) |

**Note:** DALL-E 3 is fully deprecated. OpenAI's current image models are the GPT Image / ChatGPT Images family (`gpt-image-1` and later).

### When to Use Which

```
A peça leva texto, logo ou CTA?
├── Sim → ChatGPT, Images with thinking (GPT-6, ChatGPT Images 2.6)
└── Não, é foto de personagem ou cena ↓
    └── Grok Imagens ou Nano Banana

Peça difícil, ou Images with thinking falhou duas vezes?
└── GPT-6 Astra (no chat, GPT-6 Pro). Custa cerca de 5x e drena a cota de imagem de 3 a 5 vezes mais rápido.

Quer um teste lado a lado, fora do padrão?
└── Ideogram 4.0 ou Recraft V4
```

### Prompting Basics

Peça com texto usa o molde da seção "Padrão Totum". Foto sem texto pode ser curta: quem, onde, o quê, luz. Não dite layout quando houver referência anexada. Não peça texto, CTA nem logo nessa foto.

**Common mistakes:**
- Montar post, anúncio ou carrossel no Grok ou no Nano Banana
- Inventar CTA ou completar uma lista que o pedido não deu
- Pedir para a IA desenhar o logo oficial
- Proibir no prompt um elemento que está na referência

---

## Design Tools

For templated, brand-consistent work where AI generation is overkill or too unpredictable.

### Canva

Best for non-designers who need polished output fast.

- **Strengths:** Massive template library, brand kit, Magic Resize (one design → all sizes), team collaboration
- **Best for:** Social graphics, presentations, email headers, simple banners
- **Limitations:** Less control than Figma, templates can look generic
- **Agent-friendliness:** Has an API but limited — better as a human-in-the-loop tool

### Figma

Best for teams with design systems or pixel-perfect needs.

- **Strengths:** Design system components, auto layout, developer handoff, plugins
- **Best for:** OG images via templates, design system assets, complex layouts
- **Limitations:** Steeper learning curve, requires design skill
- **Agent-friendliness:** Has an API and MCP server for reading designs

### When to Use Design Tools vs. AI Generation

| Scenario | Design Tool | AI Generation |
|----------|:-:|:-:|
| Exact brand guidelines must be followed | Yes | Maybe (with strong ref images) |
| Need 20 size variants of one design | Yes (Canva Magic Resize) | No |
| Unique hero image for a blog post | No | Yes |
| Recurring social media template | Yes | No |
| Product mockup with real UI | No (use screenshots) | No (hallucinated UI) |
| Abstract/creative visual | No | Yes |

---

## Marketing Image Workflows

### Blog & Article Hero Images

The image at the top of every post. Sets tone, improves shareability, required for OG/social previews.

1. **Define the concept** — what visual metaphor represents the topic?
2. **Generate with AI** — foto sem texto no Grok ou no Nano Banana; peça com texto no ChatGPT Images with thinking
3. **Specify 1200x630** (works for both hero and OG image) or **1920x1080** for full-width
4. **Optimize** — compress to <200KB, serve as WebP with JPEG fallback

**Prompt pattern:**
```
[Visual metaphor for topic], clean modern style,
bright natural lighting, shallow depth of field,
professional blog header aesthetic, 1200x630
```

### Social Media Graphics

Platform-specific images for organic posts.

| Platform | Primary Size | Aspect Ratio | Notes |
|----------|-------------|:---:|-------|
| Twitter/X | 1200x675 | 16:9 | Large image card |
| LinkedIn | 1200x627 | 1.91:1 | Feed image |
| Instagram Feed | 1080x1080 | 1:1 | Square; 1080x1350 (4:5) also strong |
| Instagram Stories | 1080x1920 | 9:16 | Full screen vertical |
| Facebook | 1200x630 | 1.91:1 | Link share image |

**Workflow:**
1. Create the hero concept at highest resolution needed
2. Use Canva Magic Resize or manual crop for platform variants
3. Texto na peça: monte no ChatGPT Images with thinking, com a copy literal. Não use Ideogram como padrão
4. Export at platform-specific dimensions

### Product Mockups & Screenshots

Showcase your product UI in context. AI models hallucinate UI — don't use them for this.

1. **Capture real screenshots** of your product at 2x resolution
2. **Frame in device mockups** — use browser frame, laptop, or phone templates
3. **Add context** — callout arrows, feature labels, before/after comparisons
4. **Annotate with code** — Hyperframes or HTML/CSS for programmatic overlays

**Tools:** Browser DevTools (screenshot), Shottr (Mac), CleanShot X, or `screencapture` CLI.

### Profile & Listing Banners

Banners for profiles, directory listings, and marketplace pages. Often the first visual impression.

| Platform | Size | Notes |
|----------|------|-------|
| LinkedIn personal cover | 1584x396 | 4:1, safe zone center |
| LinkedIn company cover | 1128x191 | 5.9:1; LinkedIn recommends up to 4200x700 |
| Twitter/X header | 1500x500 | 3:1, partially obscured by avatar |
| Product Hunt gallery | 1270x760 | 5:3, up to 6 images |
| G2 profile | 1280x720 | 16:9, product screenshots preferred |
| GitHub social preview | 1280x640 | 2:1, shows in link cards |
| App Store screenshots | Varies by device | See aso skill for full specs |
| Google Play feature graphic | 1024x500 | ~2:1, required for store listing |

**Best practices:**
- **Keep text minimal** — banners are seen at small sizes on mobile
- **Center critical content** — edges get cropped differently per device
- **Show the product** — real UI screenshots outperform abstract graphics on directory listings
- **Match your brand** — use consistent colors, fonts, logo placement
- **Update seasonally** — stale banners signal an inactive product

**Workflow:**
1. Pick the platform(s) and note exact dimensions
2. For directories (Product Hunt, G2): use real product screenshots with light annotation
3. For profiles (LinkedIn, Twitter): use brand colors + tagline + optional product shot
4. Peça com texto: ChatGPT Images with thinking, ou Canva/Figma se for template. Ideogram 4.0 só como teste lado a lado
5. Test at actual display size — zoom out to check readability

### Brand Assets

Logos, icons, and illustrations. AI generation has limits here.

| Asset | AI Generation | Design Tool | Notes |
|-------|:-:|:-:|-------|
| Logo | Não | Yes (Figma) | O logo oficial nunca é gerado pela IA. Anexe o arquivo |
| App icon | Decent starting point | Yes (Figma) | Generate concepts, refine manually |
| Illustrations | Good for style exploration | Depends | AI for concepts, finalize in design tool |
| Favicons | No | Yes | Derive from logo |
| Social icons | No | Yes | Use platform-provided assets |

---

## Image Optimization

Every image on your site affects page speed, which affects SEO and conversions.

### Format Guide

| Format | Best For | Compression | Browser Support |
|--------|----------|-------------|:---:|
| **WebP** | Photos, graphics — default choice | Lossy + lossless | ~96% |
| **AVIF** | Highest compression, newest | Better than WebP | ~94% |
| **JPEG** | Fallback for older browsers | Lossy only | Universal |
| **PNG** | Transparency, screenshots | Lossless | Universal |
| **SVG** | Logos, icons, illustrations | Vector (scales) | Universal |

### Optimization Checklist

- [ ] **Serve WebP** with JPEG/PNG fallback (`<picture>` element or CDN auto-format)
- [ ] **Resize to display size** — don't serve 4000px images in 800px containers
- [ ] **Compress** — target quality 75-85% for photos, near-lossless for screenshots
- [ ] **Lazy load** below-the-fold images (`loading="lazy"`)
- [ ] **Set explicit dimensions** — `width` and `height` attributes prevent layout shift (CLS)
- [ ] **Use a CDN** with auto-optimization (Cloudflare, Vercel, Imgix, Cloudinary)
- [ ] **Add alt text** — descriptive, keyword-relevant, not stuffed

### Quick Optimization Commands

```bash
# Convert to WebP (using cwebp)
cwebp -q 80 input.png -o output.webp

# Batch convert with ImageMagick
mogrify -format webp -quality 80 *.png

# Optimize JPEG (using jpegoptim)
jpegoptim --max=80 --strip-all *.jpg

# Check image sizes on a page
curl -s https://yoursite.com | grep -oP 'src="[^"]+\.(jpg|png|webp)"' | head -20
```

---

## OG & Social Preview Images

The image that appears when your URL is shared on social media, Slack, Discord, etc.

### Required Meta Tags

```html
<meta property="og:image" content="https://yoursite.com/og/page-name.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://yoursite.com/og/page-name.jpg" />
```

### Dynamic OG Images

Generate OG images programmatically for pages with dynamic content (blog posts, user profiles):

- **Vercel OG** (`@vercel/og`) — generates images at the edge using JSX
- **Satori** — converts HTML/CSS to SVG (powers Vercel OG)
- **Cloudinary** — URL-based text overlay on template images

**Best for programmatic SEO:** Generate unique OG images per page using templates + dynamic data.

---

## Common Mistakes

1. **Using AI for product UI screenshots** — models hallucinate interfaces; capture real screenshots
2. **Skipping image optimization** — unoptimized images are the #1 page speed killer
3. **No OG image** — shared links look broken without a preview image
4. **Wrong aspect ratio** — always check platform specs before generating
5. **Montar peça com texto fora do ChatGPT Images with thinking** — o padrão é esse modo; Grok e Nano Banana inventam CTA e ignoram o logo
6. **Generating without style direction** — "photorealistic," "flat illustration," "3D render" drastically changes output
7. **Inconsistent brand visuals** — use Flux multi-reference or design templates for consistency
8. **Huge images on landing pages** — compress, resize, lazy load

---

## Task-Specific Questions

1. What type of image do you need? (Blog hero, social graphic, mockup, banner, brand asset)
2. What platform or placement? (This determines dimensions)
3. Do you have brand assets to match? (Colors, fonts, logo, style guide)
4. Is this a one-off or a repeatable template?
5. Do you have API keys for any image generation tools?
6. Does this need to be optimized for web performance?

---

## Related Skills

- **ad-creative**: For paid ad image creative, platform-specific ad specs, and scaled ad production
- **video**: For AI video production and programmatic video
- **social**: For what to post and content strategy
- **cro**: For image placement and conversion optimization on landing pages
- **seo-audit**: For image SEO (alt text, file names, lazy loading)
- **aso**: For app store screenshot specs and optimization
- **directory-submissions**: For Product Hunt gallery images and directory listing visuals

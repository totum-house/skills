# Passos 0 e 1, Recepção e Material

## Passo 0, três perguntas

Nunca mais que três. Em texto numerado, para funcionar em agente headless.

```
Antes de começar, três coisas:

1. ESCOPO
   a) Só a hero
   b) Uma seção específica
   c) Página completa
   d) Fluxo de várias telas

2. DESTINO (pode marcar mais de um)
   a) Kimi
   b) Lovable
   c) v0
   d) Claude Code
   e) Figma

3. REFERÊNCIA VISUAL
   a) Já tenho, vou enviar
   b) Preciso gerar
```

Se o pedido já responde alguma, não pergunte de novo. "Especifica essa hero" com imagem anexada
já respondeu 1 e 3.

## Passo 1, checklist de insumos

Peça tudo de uma vez, marcando o que é opcional. Não peça em três mensagens.

```
O QUE MANDAR

Obrigatório
- Referência visual (imagem, print, link)

Melhora muito o resultado
- Logo em SVG (PNG serve, mas perde qualidade em escala)
- Copy ou PRD do projeto
- Fotos oficiais do cliente
- URL do site atual, se existir
- Manual de marca

Se você tiver
- Repositório GitHub ou design system existente
- Assets já prontos
- Seus prompts de comando pré prontos
```

### Ordem de autoridade

Quando duas fontes discordam, vence a de cima. Isso muda o nível de confiança de toda a spec.

| Fonte | Confiança | O que fazer |
|---|---|---|
| Design system declarado | `confirmed` | Usar direto, não estimar nada |
| Repositório ou código | `confirmed` | Ler os tokens do código, não da imagem |
| Manual de marca | `confirmed` | Cor e tipo saem daqui |
| Site ao vivo | `confirmed` | Chamar `design-system-extrator` |
| Imagem de referência | `estimated` | Só quando não existe nada acima |

**Quando existe repositório ou URL, a imagem serve para composição e direção de arte, não para tokens.**
Isso derruba a maior fonte de erro do fluxo, que é estimar hex e px de imagem comprimida.

### Saída do checklist

```
INSUMOS

✅ Referência visual   1 imagem, 1440x900
✅ Logo                SVG
✅ Copy                PRD completo
❌ Manual de marca     faltando
⚠️ Fotos               3 arquivos, resolução baixa (800px)

CONSEQUÊNCIAS
- Sem manual: cores virão como estimated, precisam de confirmação do cliente
- Fotos em 800px: recorte vai serrilhar em tela retina. Pedir originais

Seguimos assim ou você consegue o que falta?
1. Seguir
2. Vou buscar [item]
```

**Não avance com dois ou mais itens críticos faltando.** Crítico = referência visual, copy, logo.

### Quando falta copy

Não invente texto e não use lorem. Chame a `totum-lp-copy`. Se o usuário não quiser parar para isso,
use placeholders **marcados**:

```
[COPY PENDENTE: headline, máx 68 caracteres, promessa principal]
```

Placeholder marcado é honesto. Texto inventado vira conteúdo aprovado por acidente.

### Quando falta PRD ou escopo

Três perguntas, e para por aí:

1. O que esse site precisa fazer (vender, captar lead, agendar, informar)
2. Para quem, em uma frase
3. Qual é a única ação que importa

Com isso você monta um mini brief suficiente. PRD completo é outro produto, não tente resolver aqui.

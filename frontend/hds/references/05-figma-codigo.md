# Etapas 9 e 10, Figma e Código

## Etapa 9, Mapa de camadas Figma

Espelha a árvore da etapa 4, agora com decisão de layout.

```
Lorentz / Hero / Desktop
├── Background                     [Frame, absoluto]
├── Header                         [Auto Layout H, space-between]
├── Hero Body                      [Auto Layout H, gap 48]
│   ├── Content                    [Auto Layout V, gap 24]
│   └── Media                      [Frame relativo, filhos absolutos]
└── Social Proof                   [Auto Layout H, gap 16]
```

Regras:
- componente de interface usa Auto Layout, sem exceção
- montagem fotográfica usa posição absoluta dentro de frame controlado
- cor e espaçamento entram como Variables, nunca hardcoded
- botão e card são componentes com variants
- desktop e mobile compartilham os mesmos componentes, mudam só as constraints

Se o ambiente tiver Figma MCP conectado, esta etapa deixa de ser documento e vira payload:
carregue a skill `figma-use` antes de qualquer `use_figma`, crie as Variables primeiro,
depois os componentes, depois monta a tela. Nessa ordem, nunca ao contrário.

## Etapa 10, Arquitetura de código

```
HeroSection
├── Header
├── HeroContent
│   ├── Eyebrow
│   ├── Headline
│   └── PrimaryCTA
├── HeroMedia
└── SocialProof
    └── ProofCard (x3)
```

Declare também:
mapeamento token para CSS custom property, ordem de carregamento das imagens
(a foto principal é LCP, precisa de priority), alt text de cada imagem,
contraste verificado dos pares de texto sobre fundo, estados de hover e foco,
comportamento com JavaScript desabilitado se relevante.

A IA que gera o código usa o HDS como fonte estrutural e a imagem como referência visual.
Quando as duas divergirem, a spec vence, porque a spec foi auditada e a imagem não.

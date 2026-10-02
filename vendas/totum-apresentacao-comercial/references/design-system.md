# Design system Totum · apresentação

## Tokens

```css
--surface:#0e0918   /* fundo do slide */
--card:#1b1728      /* card padrao */
--elevated:#1f192a
--hover:#272333
--rust:#432d33      /* topo do gradiente de destaque */
--graphite:#191422  /* bloco dentro do modal */
--primary:#da2128   /* vermelho Totum */
--red-bright:#e3433e
--red-light:#ef9a9a
--gold:#f5b93f      /* apenas destaque no slide Sobre e bonus de oferta */
--text:#d1cece
--muted:#9ca3af
--white:#ffffff
```

Palco fixo de 1600x900, ajustado por `transform: scale()`. Nunca mude essa base:
ela garante layout idêntico em qualquer tela e é o que faz o deck caber em qualquer projetor.

## Tipografia

Peso 300 domina. Peso 400 só em rótulo pequeno e botão.

| Elemento | Tamanho |
|---|---|
| h1 capa e slide 2 | 82px |
| h2 título de slide | 48px |
| Título de card grande | 25 a 28px |
| Título de card pequeno | 20 a 21px |
| Corpo de card | 13 a 14px |
| Rótulo e eyebrow | 11 a 13px, tracking .14 a .18em, maiúsculas |
| Corpo do modal | 16.5px, entrelinha 1.62 |

## Regras de layout que não podem ser quebradas

**Nunca combine `min-height` fixo com `justify-content: space-between` em card.**
Isso empurra o conteúdo para as pontas e cria um card alto e vazio ao mesmo tempo.
Use `display:flex; flex-direction:column; gap:` e deixe o card encolher sozinho.

Escala de padding de card: 20, 21, 24, 26, 27px. Não invente valores fora disso.
Gap interno de card: 12 ou 14px. Gap de grid: 14, 16 ou 18px.

Camadas de informação diferentes no mesmo slide precisam de divisória ou de respiro
maior que o gap interno. Caso contrário lê como bloco único e quebra proximidade.

## Contraste

Mínimo 4,5:1 para qualquer texto sobre card. `--muted` sobre `--card` dá 6,89:1 e passa.
Qualquer cinza mais escuro que `--muted` sobre card reprova. Não use.

Nunca transmita informação apenas por número ou apenas por cor. Nota recebe estrelas,
status recebe rótulo além da cor.

## Componentes

**scorebar** · gradiente rust para surface, número grande, `/5` separado por 14px,
cinco estrelas abaixo com as acesas em `--primary` e as apagadas em `#5a4148`.

**card clicável** · classe `clk` mais `data-m="chave"`. O indicador de mais aparece no
hover. `clk bare` remove o indicador quando o elemento já é obviamente clicável.

**plano do meio** · gradiente rust mais borda vermelha. Ênfase única, sem rótulo
adicional. Marcador triplo anula ênfase.

**CTA de fechamento** · botão em gradiente com brilho, título em 20px peso 400 e
subtítulo em 12,5px. É o único elemento com brilho forte no deck inteiro, e por isso
funciona como ponto final.

## Modal

Estrutura: eyebrow em vermelho, título em 36px peso 300, corpo.

Blocos disponíveis: `<h4>` para subtítulo, `<ul>` e `<ol>` com marcador vermelho,
`<blockquote>` para frase de impacto, `<table>` para comparação, `.kpi` para grade de números.

Todo modal com projeção fecha com a linha de fonte e ressalva.

## Proibições

- Travessão longo em qualquer texto gerado
- Alterar a paleta
- Aumentar a densidade de texto do slide
- Emoji fora dos ícones já previstos no slide de diagnóstico
- Mais de um ponto de brilho forte por slide

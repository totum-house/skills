# Cut List, [projeto] / [secao]

Referencia: `reference/full-reference.png`
Escopo descartado: [moldura de apresentacao, sombra do mockup]

Total a recortar: [N] assets
Estimativa: ~[M] minutos

---

## 01. [nome-do-arquivo].png

**O que:** [descricao do elemento e enquadramento]
**Onde na imagem:** [quadrante em linguagem humana]. Bbox: x [0.00] a [0.00], y [0.00] a [0.00]
**Telas de uso:** [01-home, 03-checkout] (apenas escopo page ou flow)
**Por que recortar:** [justificativa, por que nao da para reconstruir]
**Origem:** [cut_from_reference | ai_generated | client_provided | stock_licensed]
**Prioridade:** [bloqueante | normal | opcional]

**Roteiro:**
1. Abrir a referencia original, nao a comprimida
2. Duplicar a camada de fundo (Ctrl+J)
3. Select > Subject
4. Select > Select and Mask
   - Refine Edge Brush no contorno de cabelo ou borda dificil
   - Smooth 2, Feather 0.5px, Shift Edge -10%
   - Decontaminate Colors ligado
   - Output To: Layer Mask
5. Conferir em zoom 200%
6. File > Export > Export As, PNG com Transparency, largura [X]px

**Cuidados:**
- [risco especifico deste asset]

**Aceite:** [criterio objetivo verificavel a olho]

---

## Nao recortar (reconstruir)

| Elemento | Como fazer | Onde |
|---|---|---|
| | | |

---

## Tratamento de fundo

| Area | O que sobra ao remover | Solucao |
|---|---|---|
| | | |

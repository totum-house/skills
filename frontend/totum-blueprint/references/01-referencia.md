# Passo 2, Referência visual

## Vias de entrada

| Via | Origem | Confiança base |
|---|---|---|
| **A. Existente** | Print de concorrente, site real, layout do cliente, Dribbble | Alta. Foi construído e funciona |
| **B. Gerada** | Geração por IA | **Baixa, auditar antes** |
| **C. Híbrida** | Layout gerado com foto real inserida | Média, por elemento |

## Via B, quando precisa gerar

Roteie pela finalidade, e **não altere as skills chamadas**:

| Situação | Skill |
|---|---|
| Prospecção, hero para lead, duas direções de arte | `previa-hero` |
| Projeto real, várias seções, uma imagem por bloco | `totum-imagem-web` |
| Tela de app mobile | `totum-imagem-mobile` |

Entregue o prompt e devolva o controle. O usuário gera fora, traz as imagens, e o fluxo continua no passo 3.

## Auditoria técnica da referência

**Obrigatória na via B. Rápida, 30 segundos.** Não confundir com a auditoria de UX do passo 4:
aqui você procura defeito de geração, lá se julga qualidade de design.

Procure e descarte:

- texto ilegível, inventado ou com letra deformada (nunca vira conteúdo da spec)
- geometria impossível: grid que não fecha, coluna desalinhada, perspectiva quebrada
- luz inconsistente entre pessoa e fundo, sombra sem fonte, reflexo que não bate
- elemento decorativo sem função, que só apareceu
- ícone que não é ícone, é ruído com cara de ícone
- proporção de logo distorcida
- mão com dedo a mais, dobra de roupa impossível, objeto derretendo

Saída, antes de qualquer análise:

```
AUDITORIA DA REFERÊNCIA
Aproveitado: composição, paleta, hierarquia, tratamento fotográfico
Descartado: texto gerado (todo), ícone do card 2, sombra do bloco lateral
Corrigido na spec: grid remontado em 12 colunas, o gerado não fechava

1. Seguir com essas correções
2. Regenerar a imagem
```

Especificar imagem gerada sem auditar é transformar defeito de geração em requisito de implementação.
É como aceitar um bug do fornecedor e escrever no contrato.

## Descarte de moldura, sempre

Vale para todas as vias, e é automático, sem perguntar:

- chrome de navegador, barra de URL, abas
- moldura de celular, notebook, tablet, mão segurando
- sombra e reflexo do mockup
- fundo de estúdio, gradiente de apresentação
- marca d'água, assinatura de portfólio

Registre em uma linha e siga. Se o usuário quiser moldura, ele encapsula depois.

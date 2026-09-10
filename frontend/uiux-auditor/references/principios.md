# Referência de Princípios — UI/UX Auditor

Carregue este arquivo apenas quando precisar de definição detalhada ou exemplos durante a análise.

---

## Gestalt — Definições Operacionais

**Proximidade**
Elementos físicamente próximos são percebidos como grupo. Regra prática: elementos do mesmo grupo devem ter espaçamento interno menor que o espaçamento entre grupos. Violação comum: form labels separadas dos inputs por espaço maior que o espaço entre campos diferentes.

**Semelhança**
Elementos com aparência similar são percebidos como tendo a mesma função. Violação comum: CTA primário e links secundários com a mesma cor — o usuário não sabe o que é clicável principal vs. secundário.

**Continuidade**
O olho segue direções e linhas implícitas. Violação comum: colunas desalinhadas que quebram o fluxo vertical de leitura.

**Fechamento**
O cérebro completa formas incompletas. Aplicação: cards sem borda mas com sombra sutil ainda são percebidos como containers fechados.

**Figura e Fundo**
O que está em primeiro plano (figura) vs. o que é contexto (fundo). Violação comum: texto sobre imagem sem overlay — o fundo compete com a figura.

---

## Hierarquia Tipográfica — Escala Base

Escala modular recomendada (base 16px, razão 1.25):
- H1: 31px / weight 700
- H2: 25px / weight 700
- H3: 20px / weight 600
- Body: 16px / weight 400
- Caption: 13px / weight 400
- Label: 12px / weight 500 (uppercase com letter-spacing)

Diferença mínima perceptível entre níveis: 20% de tamanho ou 1 nível de peso (ex: 400→600).

---

## Padrões de Leitura

**F-Pattern:** para conteúdo denso (artigos, dashboards, listas). O olho varre horizontalmente no topo, depois desce pela esquerda. Implicação: informações críticas devem estar no topo e à esquerda.

**Z-Pattern:** para páginas limpas com poucos elementos (landing pages, hero sections). O olho vai da esquerda para a direita no topo, desce na diagonal para a esquerda e volta para a direita. Implicação: CTA deve estar no ponto final do Z (canto inferior direito).

---

## Grid e Espaçamento

**Sistema de 8pt:** todos os espaçamentos são múltiplos de 8 (8, 16, 24, 32, 48, 64). Permite consistência e facilita implementação.

**Proporção Áurea (1:1.618):** aplicada a dimensões de containers, imagens hero, e relação entre colunas de conteúdo e sidebar. Não precisa ser literal — proporções próximas (3:5, 5:8) já entregam harmonia percebida.

**Margens responsivas:** mobile mínimo 16px, desktop mínimo 24px. Conteúdo nunca deve tocar as bordas da viewport.

---

## WCAG AA — Critérios Mínimos

| Tipo | Contraste mínimo |
|---|---|
| Texto normal (<18pt) | 4.5:1 |
| Texto grande (≥18pt ou ≥14pt bold) | 3:1 |
| Elementos UI e gráficos | 3:1 |

**Tamanho mínimo de alvo tátil (mobile):** 44x44px (Apple HIG) ou 48x48dp (Material Design).

**Ferramentas de verificação rápida:** Contrast Checker (WebAIM), Who Can Use, Stark (Figma plugin).

---

## Estados de Interface Obrigatórios

Todo elemento interativo deve ter design para:
- Default
- Hover (desktop)
- Focus (teclado/acessibilidade)
- Active / Pressed
- Disabled
- Loading (quando aplicável)
- Error (formulários)
- Success (formulários, ações destrutivas)

Ausência de estados de focus é falha de acessibilidade (WCAG 2.4.7).

---

# Referência dos pilares 5 a 8 (modo COMPLETA)

## Heurísticas de Nielsen, o que caracteriza violação

| # | Heurística | Violação típica em landing page |
|---|---|---|
| 1 | Visibilidade do status | Formulário enviado sem confirmação visível |
| 2 | Mundo real | "Solicitar onboarding" onde o usuário diria "começar" |
| 3 | Controle e liberdade | Modal sem X, carrossel automático sem pausa |
| 4 | Consistência | Três estilos de botão primário na mesma página |
| 5 | Prevenção de erro | Campo de telefone sem máscara nem validação |
| 6 | Reconhecimento | Menu que não marca a página atual |
| 7 | Flexibilidade | Nenhum atalho para quem já conhece o produto |
| 8 | Minimalismo | Badge, pill e selo competindo com o CTA |
| 9 | Diagnóstico de erro | "Erro 400" em vez de "e-mail inválido" |
| 10 | Ajuda | FAQ escondido no rodapé, longe da dúvida |

## Leis de UX, números de referência

- **Fitts:** alvo de toque mínimo 44x44px (Apple) ou 48x48dp (Material). Espaçamento mínimo entre alvos: 8px
- **Hick:** cada opção adicional aumenta o tempo de decisão de forma logarítmica. Primeira dobra com mais de 2 CTAs concorrentes já dilui
- **Miller:** 7 mais ou menos 2 itens por grupo. Acima disso, fatie
- **Jakob:** quebrar convenção custa carga cognitiva. Só quebre onde a quebra é o diferencial do produto

## Atomic Design, níveis

| Nível | O que é | Teste |
|---|---|---|
| Átomo | Cor, fonte, ícone, botão | Existe fora de contexto? |
| Molécula | Campo de busca, card de preço | Junta átomos com uma função |
| Organismo | Header, seção de prova social | Bloco autônomo da página |
| Template | Estrutura sem conteúdo real | Serve para mais de uma página? |
| Página | Template com conteúdo | O que o usuário vê |

Sinal de dívida: componente que só existe em uma tela e não tem motivo para ser único.

## WCAG 2.1 AA, mínimos verificáveis

| Critério | Mínimo |
|---|---|
| Contraste texto normal | 4.5:1 |
| Contraste texto grande (18pt ou 14pt bold) | 3:1 |
| Contraste de componente e borda | 3:1 |
| Alvo de toque | 44x44px |
| Zoom de texto sem quebra | 200% |
| Foco visível | obrigatório em todo interativo |
| Cor como único sinal | proibido |

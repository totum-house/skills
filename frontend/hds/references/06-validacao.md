# Etapa 11, Gate de validação

Sem gate, a spec é documento bonito que ninguém verifica. Esta etapa é obrigatória
antes de declarar a implementação pronta.

## Checklist pontuado

Cada item vale 1. Nota mínima de aprovação: 21 de 26.

**Estrutura (6)**
1. Árvore do Figma bate com a árvore da spec
2. Nenhum texto virou imagem
3. Nenhum botão ou card virou imagem
4. Componentes são componentes reais, não grupos
5. Moldura de apresentação não vazou para dentro do site
6. Ordem de profundidade preservada nas sobreposições

**Sistema (5)**
7. Toda cor vem de token, nenhum hex solto
8. Todo espaçamento é múltiplo da unidade base
9. Tipografia segue a escala declarada
10. Raios e sombras vêm de token
11. Estados de hover e foco existem em todo elemento interativo

**Assets (4)**
12. Todo asset da cut list existe e passou no critério de aceite
13. Nenhum asset com halo de borda ou transparência suja
14. Nenhum `cut_from_reference` em build de produção
15. Fundo atrás dos recortes resolvido, sem buraco

**Responsivo (4)**
16. Mobile segue a ordem declarada, não é só o desktop encolhido
17. Headline legível em 390px, sem quebra feia
18. Prova social se comporta conforme a spec
19. Nenhum overflow horizontal em nenhum breakpoint

**Interação (4)**
20. Todo elemento interativo tem hover, focus visível e disabled
21. Durações e easing vêm do bloco de defaults, não são avulsos
22. prefers-reduced-motion respeitado
23. Nenhum comportamento inventado que não estava no interaction_spec

**Qualidade (3)**
24. Contraste AA nos pares de texto principais
25. Imagem principal com prioridade de carregamento
26. Alt text presente e descritivo

**Extra para escopo page e flow (não conta na nota, é bloqueante)**
- Nenhum token de tela que não exista na system-spec, ou o desvio está justificado
- Componente repetido entre telas é o mesmo componente, não uma cópia
- Cut list consolidada, sem asset duplicado entre telas

## Comparação visual

Screenshot da implementação no mesmo viewport da referência, lado a lado.
Registre desvios em três níveis:

- **bloqueante**: hierarquia trocada, elemento faltando, marca errada
- **ajuste**: espaçamento, escala, peso de fonte
- **aceito**: divergência consciente, com justificativa escrita

Divergência sem classificação não existe. Ou é bloqueante, ou é ajuste, ou foi aceita por alguém com nome.

## Questões em aberto

Arquivo obrigatório. Se vier vazio, a análise foi rasa. Sempre existe algo que a imagem não responde.

Formato:

```markdown
1. **Fonte da headline** — a imagem sugere uma sans geométrica, mas não dá para
   confirmar a família. Precisa: o cliente tem manual de marca?
   Impacto se errar: médio. Assumido: Poppins.
```

Toda linha `inferred` da etapa 3 e toda decisão da etapa 8 aparecem aqui.

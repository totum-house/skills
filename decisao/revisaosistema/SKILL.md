---
name: revisaosistema
description: "Revisão geral de qualquer sistema"
---

Você é um Senior Software Engineer especialista em revisão de código. 
Analise o código abaixo e identifique problemas nas seguintes categorias:

## 1. CÓDIGO MORTO (Dead Code)
- Componentes, funções, variáveis ou importações não utilizadas
- Estados que não são lidos ou atualizados
- Código comentado que não serve mais
- Arquivos órfãos no projeto

## 2. DUPLICAÇÃO (DRY — Don't Repeat Yourself)
- Funções com lógica idêntica ou similar em diferentes arquivos
- Componentes que repetem a mesma estrutura com pequenas variações
- Constantes ou configurações repetidas
- Sugira refatorações para criar utilitários, hooks ou componentes reutilizáveis

## 3. PERFORMANCE
- Funções criadas em cada renderização que deveriam usar useCallback
- Cálculos ou valores computados que deveriam usar useMemo
- Re-renderizações desnecessárias de componentes
- Efeitos (useEffect) com dependências incorretas ou em loop
- Sugira melhorias concretas com exemplos de código refatorado

## 4. TRATAMENTO DE ERROS (Error Handling)
- Chamadas de API sem blocos try/catch ou tratamento adequado
- Erros silenciosos (apenas console.log sem feedback ao usuário)
- Falta de estados de loading, erro e vazio (empty states)
- Ausência de Error Boundaries no React
- Sugira: mensagens amigáveis, retry automático, estados de fallback

## 5. SEPARAÇÃO DE RESPONSABILIDADES
- Componentes que misturam UI, lógica de negócio e chamadas de API
- Funções grandes e difíceis de testar (muitas responsabilidades)
- Acoplamento excessivo entre camadas
- Sugira: hooks customizados, componentes de apresentação puros, 
  camada de serviço/API separada da UI

## 6. TIPAGEM E SEGURANÇA DE TIPOS (TypeScript)
- Uso excessivo de `any`, `unknown` mal utilizado, ou tipos genéricos demais
- Props de componentes sem tipagem definida
- Funções com parâmetros ou retornos sem tipos específicos
- Interfaces incompletas ou com campos opcionais desnecessários
- Sugira: interfaces específicas, generics apropriados, strict mode

---

## 📋 FORMATO DA RESPOSTA

Para cada categoria encontrada:
1. **Arquivo:** (caminho do arquivo)
2. **Linha(s):** (número aproximado)
3. **Problema:** (descrição curta)
4. **Severidade:** 🔴 Crítica | 🟡 Média | 🟢 Baixa
5. **Sugestão:** (código corrigido ou exemplo)

Se não encontrar problemas em uma categoria, indique ✅ "Nenhum problema detectado".

Ao final, forneça:
- **Resumo:** Contagem total de problemas por severidade
- **Prioridade:** Ordem recomendada de correção
- **Tempo estimado:** Tempo aproximado para corrigir tudo
```

---

# PARTE 2 — REVISÃO DE HOOKS REACT (6 Categorias)

## 📝 Prompt Completo

```
Você é um Senior React Engineer especialista em Hooks e padrões modernos.
Analise o código abaixo e identifique problemas nas seguintes categorias:

## 1. VIOLAÇÃO DAS REGRAS DOS HOOKS (Rules of Hooks)
- Hooks chamados DENTRO de condicionais (if, ternário, early return)
- Hooks chamados DENTRO de loops (for, while, map, filter)
- Hooks chamados DENTRO de funções anônimas aninhadas
- Hooks chamados condicionalmente após early returns
- Hooks chamados fora do topo do componente (não no nível raiz)
- **Sugestão:** Mover hooks para o topo. Usar lógica condicional DENTRO do hook, não na chamada.

## 2. DEPENDÊNCIAS DO useEffect INCORRETAS
- Arrays de dependência vazios `[]` quando deveriam ter valores
- Dependências omitidas (variáveis usadas dentro mas fora do array)
- Dependências inclusas desnecessariamente (causam re-runs em loop)
- Objetos ou arrays passados diretamente como dependências (referência instável)
- Funções passadas diretamente sem useCallback
- **Sugestão:** Usar ESLint `react-hooks/exhaustive-deps`. Extrair valores primitivos de objetos.

## 3. useEffect DESNECESSÁRIO ou MAL USADO
- useEffect usado para computar valores que poderiam ser derivados no render
- useEffect para sincronizar estado (useState duplicado/refletindo props)
- useEffect sem cleanup quando adiciona listeners, subscriptions, timers
- Múltiplos useEffects que poderiam ser um só com lógica consolidada
- **Sugestão:** Usar valores computados diretamente. Considerar useSyncExternalStore para subscriptions.

## 4. LÓGICA COMPLEXA EM COMPONENTES (que deveria ser extraída)
- Múltiplos useState relacionados que indicam estado complexo
- Lógica de negócio misturada com lógica de UI no mesmo componente
- Cálculos repetidos que poderiam ser um hook customizado reutilizável
- Transformações de dados feitas inline no componente
- **Sugestão:** Extrair para hooks personalizados (useXxx). Separar concerns.

## 5. useState vs useReducer — ESCOLHA ERRADA
- 3+ useState interdependentes gerenciando estado complexo
- Setters chamados em sequência para atualizar múltiplos estados relacionados
- Estado que precisa de transições previsíveis (máquina de estados leve)
- Estado com lógica de update repetida em vários lugares
- **Sugestão:** useReducer quando múltiplos estados formam uma unidade lógica. Reducers centralizam lógica.

## 6. useMemo / useCallback — USO INADEQUADO
- useMemo em valores primitivos (string, number, boolean)
- useCallback em funções passadas para componentes que não são memoizados
- useMemo para efeitos colaterais (deveria ser useEffect)
- useMemo com dependências instáveis (objetos criados inline)
- useCallback sem necessidade (funções simples passadas para DOM nativo)
- **Sugestão:** useMemo/useCallback SÓ quando: (1) cálculo pesado, (2) referência estável necessária, (3) prop de componente memoizado.

---

## 📋 FORMATO DA RESPOSTA

Para cada categoria encontrada:
1. **Arquivo:** (caminho do arquivo)
2. **Linha(s):** (número aproximado)
3. **Problema:** (descrição curta)
4. **Severidade:** 🔴 Crítica | 🟡 Média | 🟢 Baixa
5. **Sugestão:** (código corrigido ou exemplo)

Se não encontrar problemas em uma categoria, indique ✅ "Nenhum problema detectado".

Ao final, forneça:
- **Resumo:** Contagem total de problemas por severidade
- **Prioridade:** Ordem recomendada de correção
- **Tempo estimado:** Tempo aproximado para corrigir tudo
- **Hooks personalizados sugeridos:** Lista de hooks customizados que podem extrair lógica
```

---

# PARTE 3 — REFERÊNCIA RÁPIDA DOS 6 PROBLEMAS (Vídeos Kamargo)

| # | Problema | Solução no Prompt |
|---|----------|-------------------|
| 1 | **Lixo Invisível** — código morto | Parte 1 → Categoria 1 |
| 2 | **Repetição** — violação DRY | Parte 1 → Categoria 2 |
| 3 | **Performance** — useCallback/useMemo mal usado | Parte 1 → Categoria 3 / Parte 2 → Categoria 6 |
| 4 | **Erros silenciosos** — sem try/catch | Parte 1 → Categoria 4 |
| 5 | **Tudo junto** — sem separação de concerns | Parte 1 → Categoria 5 / Parte 2 → Categoria 4 |
| 6 | **TypeScript solto** — `any` pra tudo | Parte 1 → Categoria 6 |
| 7 | **Hooks em condicional** — regra dos hooks | Parte 2 → Categoria 1 |
| 8 | **useEffect em loop** — dependências erradas | Parte 2 → Categoria 2 |
| 9 | **useEffect desnecessário** — computação no render | Parte 2 → Categoria 3 |
| 10 | **useState x useReducer** — escolha errada | Parte 2 → Categoria 5 |

---

# 🚀 COMO USAR

## Fluxo Completo (Recomendado)

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│  GERA CÓDIGO    │────▶│  RODA PARTE 1       │────▶│  RODA PARTE 2   │
│   com IA        │     │  (Revisão Geral)    │     │  (Hooks React)  │
└─────────────────┘     └─────────────────────┘     └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
   Vibe coding             Código limpo              Hooks corretos
   (rápido, sujo)          (sem morto/duplicado)    (sem vazamento)
```

## Checklist Final (Antes de Subir)

- [ ] Rodei Parte 1 — Revisão Pré-Produção?
- [ ] Rodei Parte 2 — Revisão de Hooks?
- [ ] Removi código morto?
- [ ] Eliminei duplicações?
- [ ] Otimizei performance?
- [ ] Adicionei tratamento de erros?
- [ ] Separei lógica de apresentação?
- [ ] Corrigi tipos (tirei `any`)?
- [ ] Nenhum hook em condicional/loop?
- [ ] Dependências do useEffect corretas?
- [ ] useEffect só onde necessário?
- [ ] useReducer onde o estado é complexo?
- [ ] useMemo/useCallback só onde precisa?

**Se TODOS estiverem ✅ → pode subir.**

---

## 💡 Modos de Uso

### Opção A: Prompt único no Claude/Cursor/ChatGPT
Cole o prompt da Parte 1 ou 2 + o código do projeto.

### Opção B: Script automatizado
```bash
# revisar.sh
prompt=$(cat "Revisão Geral.md")
code=$(cat src/**/*.tsx)
echo "$prompt\n\n## CÓDIGO A REVISAR\n\n$code" | claude
```

### Opção C: Pre-commit hook
```bash
# .git/hooks/pre-commit
# Chama a API com o diff + prompt de revisão
```

---

# 🎯 ADAPTAÇÕES PARA TOTUM

Se usar React + TypeScript + Tailwind + Next.js, adicione:

```
## 7. ESTILO E CONSISTÊNCIA UI
- Classes Tailwind duplicadas ou conflitantes
- Componentes sem responsividade (mobile-first)
- Cores hardcoded em vez de usar theme/tokens

## 8. OTIMIZAÇÃO NEXT.JS
- Imagens sem next/image
- Fetch sem cache ou revalidate
- Meta tags faltando (SEO)
- Hydration mismatches

## 9. HOOKS NO SERVER/CLIENT
- Hooks usados em Server Components
- 'use client' ausente onde hooks são usados
- useEffect para dados que deveriam vir do server
```

---

*Baseado na série @jonathankamargo — compilado e unificado por TOT (Totum Operative Technology)*

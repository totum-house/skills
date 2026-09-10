---
name: totum-design-system
description: Aplicar o design system oficial da Totum em sistemas criados ou editados com Claude Code.
---

# Totum Design System

## Objetivo

Esta skill orienta Claude Code a aplicar o UI, UX e design system aprovado da Totum em novos sistemas, dashboards, CRMs, ERPs, portais, marketplaces e produtos operacionais.

A referência canônica é o Totum System:

- Site: `https://totum.pixelsystem.online/`
- Repo: `https://github.com/grupototum/totum-system`
- Fonte principal de tokens: `totum-red-theme- Design-System.md`
- Implementação principal: `src/index.css` e `tailwind.config.ts`

Use esta skill quando o usuário pedir para criar, redesenhar, modernizar ou padronizar sistemas da Totum, Pixel System, BuildOps, uPixel ou produtos relacionados.

## Leitura de Design

Interprete todo sistema Totum como:

- produto operacional;
- dark-first;
- executivo;
- escaneável;
- confiável;
- denso com controle;
- visualmente alinhado ao Totum System.

Não trate sistemas internos como landing pages genéricas. Sistemas precisam de navegação clara, painéis funcionais, estados completos e ritmo visual consistente.

## Fonte da Verdade

Antes de implementar em um repositório que tenha acesso ao `totum-system`, leia nesta ordem:

1. `totum-red-theme- Design-System.md`
2. `src/index.css`
3. `tailwind.config.ts`
4. `components.json`
5. Componentes compartilhados em `src/components/ui/`
6. Layouts em `src/components/layout/`

Se o repositório atual não for o `totum-system`, use os tokens abaixo como contrato de implementação.

## Tokens Obrigatórios

### Cores

- Background base: `#0e0918`
- Card/nav: `#1b1728`
- Elevated/border/input: `#1f192a`
- Hover surface: `#272333`
- Texto principal/body: `#d1cece`
- Texto forte/títulos: `#ffffff`
- Texto muted: `#9ca3af`
- Vermelho Totum primary: `#da2128`
- Vermelho bright: `#e3433e`
- Azul secundário: `#077ac7`
- Violeta secundário: `#6b21ef`
- Violeta sheen: `#a06ff6`
- Brand card warm start: `#432d33`

### Tipografia

- Fonte principal: `geomanist, Inter, ui-sans-serif, system-ui, sans-serif`
- Fonte mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`
- Títulos: Geomanist weight `300`, line-height compacto, letter-spacing `-0.02em`
- Body: weight `400`, line-height `1.5`, letter-spacing `0`
- Botões: weight `400`, letter-spacing `0`
- `strong`: usar `geomanist-book` weight `400`, nunca bold sintético

### Regras Tipográficas

- Nunca usar `font-weight: 600`
- Nunca usar `font-weight: 700` em títulos ou strong
- Tracking negativo apenas em títulos
- Body, links e botões sempre com `letter-spacing: 0`

## Componentes Obrigatórios

### Botões

Todos os botões primários, secundários e ghost devem ser pills com `border-radius: 9999px`.

Primary:

```css
background: linear-gradient(135deg, #e3433e 0%, #da2128 100%);
color: #ffffff;
border: none;
border-radius: 9999px;
padding: 12px 24px;
font-size: 1rem;
font-weight: 400;
letter-spacing: 0;
box-shadow: inset 0 1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(8,8,8,0.2);
```

Hover primary signature:

```css
box-shadow: inset 0 1px 1px rgba(255,255,255,0.2), 0 7px 80px -12px #da2128;
```

Secondary:

```css
background: linear-gradient(135deg, #077ac7 0%, #6b21ef 100%);
color: #ffffff;
border: none;
border-radius: 9999px;
padding: 12px 24px;
```

Ghost:

```css
background: transparent;
color: #ffffff;
border: none;
border-radius: 9999px;
padding: 10px 20px;
```

### Cards

Default card:

```css
background: #1b1728;
border: none;
border-radius: 24px;
padding: 32px;
box-shadow: inset 0 0 0 1px hsla(0,0%,100%,0.10), inset 0 1px 0 0 hsla(0,0%,100%,0.10);
```

Hover:

```css
background: #272333;
```

Brand card:

```css
background: linear-gradient(180deg, #432d33 0%, #0e0918 100%);
border: none;
border-radius: 24px;
padding: 32px;
box-shadow: inset 0 0 0 1px hsla(0,0%,100%,0.10), inset 0 1px 0 0 rgba(218,33,40,0.30);
```

Regra: cards não usam CSS `border` comum. Use `box-shadow: inset` para hairlines.

### Inputs

```css
background: #1f192a;
color: #d1cece;
border-radius: 6px;
padding: 8px 12px;
```

- Placeholder: `#9ca3af`
- Focus ring: `#da2128`
- Label sempre acima do input
- Placeholder nunca substitui label

### Navegação

- Header/nav sticky em `#1b1728`
- Backdrop blur `24px`
- Altura entre `64px` e `74px`
- Link ativo com gradiente `#a06ff6 -> #6b21ef`
- Link ativo com texto branco e radius `8px`
- Hover de nav link: `hsla(0,0%,100%,0.07)`

## Regras de UX

Claude Code deve priorizar:

- clareza operacional;
- leitura rápida;
- densidade controlada;
- navegação previsível;
- componentes reutilizáveis;
- estados completos;
- responsividade real;
- acessibilidade visual.

Todo fluxo deve considerar:

- loading state;
- empty state;
- error state;
- disabled state;
- success state;
- foco acessível;
- validação de formulário;
- mobile.

## Restrições Fortes

Não fazer:

- Não usar fundo branco.
- Não usar tema claro sem autorização explícita.
- Não usar `#000000` puro.
- Não usar vermelho `#da2128` em grandes superfícies.
- Não usar botões quadrados ou rounded-rect.
- Não usar CSS border comum em cards.
- Não usar drop-shadow preta pesada em cards.
- Não usar Inter como fonte principal quando Geomanist estiver disponível.
- Não entregar shadcn/ui em estado default.
- Não usar roxo/azul como identidade principal. Eles são secundários.
- Não usar glassmorphism como camada principal de conteúdo.
- Não criar layout marketing exagerado para telas de produto.
- Não aplicar landing-page hero em dashboard ou ERP interno.

## Workflow para Claude Code

Ao receber uma tarefa de UI/UX para sistema Totum:

1. Identifique se é sistema operacional, dashboard, CRM, ERP, portal, marketplace ou landing.
2. Leia o código existente antes de editar.
3. Localize tokens atuais de CSS/Tailwind.
4. Se tokens Totum não existirem, crie ou ajuste variáveis sem quebrar o app.
5. Reuse componentes existentes antes de criar novos.
6. Aplique o design system Totum nos componentes compartilhados quando fizer sentido.
7. Evite refatoração ampla se a tarefa for pontual.
8. Teste desktop e mobile.
9. Rode build/lint quando disponível.
10. Entregue resumo com arquivos alterados e validação.

## Critério de Aprovação

Antes de concluir, Claude Code deve auditar:

- [ ] A tela parece parte do Totum System?
- [ ] Dark-first aplicado?
- [ ] Background base `#0e0918`?
- [ ] Vermelho Totum usado com parcimônia?
- [ ] Geomanist aplicado como fonte principal?
- [ ] Botões são pills?
- [ ] Cards usam inset shadow em vez de border comum?
- [ ] Inputs têm label acima?
- [ ] Há estados de loading, empty, error e disabled?
- [ ] Mobile 375px funciona?
- [ ] Desktop 1440px funciona?
- [ ] Nenhum componente parece shadcn default?
- [ ] A alteração não quebrou navegação, auth, formulários ou dados?

## Prompt Curto para Usar com Claude Code

Quando quiser aplicar rapidamente este padrão em um projeto, use:

```text
Use a skill totum-design-system. Aplique o design system do Totum System neste projeto, usando como referência https://totum.pixelsystem.online/ e https://github.com/grupototum/totum-system. Preserve a arquitetura existente, mas ajuste UI, UX, tokens, componentes e estados para seguir o Totum Red Theme: dark-first, background #0e0918, cards #1b1728, primary #da2128, Geomanist, botões pill, cards com inset shadow, inputs escuros com focus vermelho, navegação sticky escura e densidade operacional. Não use tema claro, fundo branco, botões quadrados, shadcn default ou CSS border comum em cards. Teste desktop e mobile antes de finalizar.
```

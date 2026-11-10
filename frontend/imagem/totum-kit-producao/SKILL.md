---
name: totum-kit-producao
description: >-
  Use para fechar o kit de produção de um cliente no padrão Totum (Notion em
  Totum Lab › Design › Clientes + brand-kit local com brand.md nível Cenova,
  receitas.md com 2 a 4 receitas-base, logo e referências), depois que a marca
  já existe. Acione ao ouvir "kit de produção", "fechar no padrão CredPara",
  "igual à Cenova/CredPara/Totum", ou ao preparar um cliente para o fluxo
  totum-visual-codes. Não monta a entrega comercial de marca (use manual-da-marca)
  nem cadastra a marca do zero (use protocolo-design).
---

# Kit de Produção (padrão Totum)

v1.0, 06/11/2026. Camada que alimenta `totum-visual-codes` e `totum-design-peca`.
Calibrado no fechamento CredPara + Totum em 05/11/2026, a pedido do Rael:
entrega de marca no modelo CredPara **e** kit de produção no nível Cenova.

## Duas camadas (não misturar)

| Camada | Skill | O que é |
|---|---|---|
| Entrega de marca | `manual-da-marca` | Pacote para o cliente: logo multi-formato, regras, apresentação, mockups, DS HTML, kit ChatGPT. |
| Kit de produção | **esta skill** | O que o Lab usa para criar peça: Notion + `brand.md` + `receitas.md` + logo + refs. |
| Cadastro inicial | `protocolo-design` | Entrevista e montagem do livro a partir de material bruto. Rode antes ou em paralelo. |

Se o cliente ainda não tem livro interno, comece por `protocolo-design`.
Se falta o pacote bonito para o cliente, rode `manual-da-marca`.
Esta skill **fecha** o kit de produção no padrão vivo.

## Premissas

1. Produto, logo, rótulo e cores ficam iguais ao original. Nada inventado.
2. Hex medido no arquivo, nunca "no olho".
3. Código de cliente só para o próprio cliente; código novo na biblioteca só com OK do Rael.
4. Só adicione arquivos no Drive. Não renomeie, mova nem apague o que já existe.
5. Antes de qualquer peça depois do fechamento: `totum-visual-codes` → receita → `totum-design-peca`.

## Onde fica

- Notion: Totum Lab › Design › Clientes › `<Cliente>` (status Completo quando fechar).
- Local: `/workspace/totum-lab/design/clientes/<slug>/brand-kit/`
  - `brand.md`
  - `receitas.md`
  - `logo/` (SVG/PNG oficiais; LEIA-ME se houver variantes)
  - `referencias/` (aprovados vs candidatos, com LEIA-ME)
  - `personagens/` (se houver)
- Drive: pasta `Kit de producao` dentro de `1- Design System` (ver `protocolos/pastas-de-cliente.md`). Arquivos com prefixo de data `AAAA-MM-DD-`.

## Checklist de fechamento

### 1. Notion
- Página do cliente existe em Design › Clientes.
- Status: Completo (ou o equivalente da base).
- Campos mínimos: slug, vermelho/cor oficial se aplicável, Instagram oficial, link do Drive, link do brand-kit, regras curtas de peça (ex.: "peças claras de objeto central permitidas").
- Legados (paleta antiga, sistemas visuais aposentados) ficam marcados como legado, não apagados.

### 2. brand.md (nível Cenova)
Deve caber numa leitura só e cobrir:
1. Identidade (escrita da marca, promessa, público, personalidade)
2. Paleta com HEX (+ RGB/CMYK/Pantone se a entrega tiver) e hierarquia de uso
3. Tipografia (família, pesos, papéis)
4. Logo (versões, fundo mínimo, área de proteção, o que é proibido)
5. Linguagem visual (composição, foto, grafismo, texto na peça)
6. Tom de voz e proibidos de copy
7. Códigos de cliente sugeridos ou ativos (com status de OK do Rael)
8. Seção **Nunca** (lista curta e dura)
9. **A decidir** (pendências explícitas, sem esconder)
10. Hierarquia de fontes do material (o que manda sobre o quê)

Antes de sobrescrever um `brand.md` existente: salvar backup `brand.md.bak-AAAA-MM-DD-motivo`.

### 3. receitas.md
2 a 4 receitas-base no formato de códigos, sempre com `/brand_lock` e, se a peça leva logo, `/logo_safezone`. Teto de 7 códigos por receita.

Formatos típicos:
- Post feed 4:5 (e variante 1:1 se precisar)
- Carrossel 4:5
- Story 9:16
- Meta ad 4:5 (ou o formato de anúncio do cliente)

Cada receita traz: bloco RECEITA, POR QUE (um porquê por código), cores/logo, e o que evitar.
Códigos de cliente só entram depois do OK do Rael; até lá ficam como sugestão em `brand.md`.

### 4. Logo e referências
- Logo oficial no brand-kit (não gerar, não redesenhar).
- `referencias/aprovados/` = o que o Rael já liberou para produção.
- `referencias/candidatos/` = propostas aguardando OK (nunca misturar com aprovados).
- LEIA-ME em cada pasta dizendo origem e status.

### 5. Espelho no Drive
Subir `brand.md`, `receitas.md` e guias (referência/logo) na pasta `1- Design System/Kit de producao`, só adicionando, com prefixo de data. Devolver o caminho da pasta.

### 6. Conferência final
Mostrar ao Rael:
- link da página Notion
- o que entrou em brand/receitas
- pendências em "A decidir"
- candidatos de referência e códigos de cliente aguardando OK

Só depois disso o cliente está "Completo" para o fluxo de peça.

## O que não fazer

- Não substituir `manual-da-marca` (entrega ao cliente) por este kit.
- Não inventar WhatsApp, endereço, CNPJ, depoimento ou foto de equipe.
- Não marcar referência candidata como aprovada.
- Não publicar código de cliente na biblioteca geral sem OK do Rael.
- Não apagar brand.md antigo: backup primeiro.

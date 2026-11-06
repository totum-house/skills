---
name: zion-lab-pop-sites
description: >-
  Use quando for começar um novo projeto de site ou LP: entrevista guiada pelo
  POP de sites, briefing estruturado, construção no Lovable, exportação para
  GitHub e publicação na Vercel com portões de aprovação.
---
# POP de sites (versão Lovable)

Fontes: `Processo_Site.pdf` (Meu Drive > Totum > Totum Pops) e POP "CRIAÇÃO (DESIGN + WEB + UX)". Texto integral em `/workspace/totum-studio/zion-lab/pop-sites-original.md`. Plano detalhado em `/workspace/totum-studio/zion-lab/plano-zion-lab.md`.

Decisão de 28/10/2026: sites e LPs são feitos com Lovable, Cursor e Claude Code, não mais WordPress. Itens de WordPress do POP (Instalação Wordpress, Compra e Instalação Plugins, Smush Pro, LiteSpeed Cache, SEO YOAST, hospedagem tradicional) viram equivalentes: otimização de imagens, performance, SEO técnico no código. Publicação: exportar o projeto do Lovable para GitHub e publicar na Vercel.

## Regras gerais
- Não criar sem objetivo claro. Não pular revisão. Não ignorar estratégia. Seguir padrão visual. Priorizar clareza e conversão. Manter arquivos organizados.
- SLA: LP 3 a 7 dias úteis, site completo 7 a 15 dias úteis, ajuste simples 24h úteis. Tráfego ativo tem prioridade máxima.
- Nunca inventar dado do cliente (telefone, endereço, preço, depoimento, CNPJ). Marcar PENDENTE e usar placeholder visível.
- Nunca escrever senha no chat. Nunca entregar a senha ADMIN.
- Nada externo sem OK explícito do responsável: envio ao cliente, publicação, mudança de visibilidade, domínio, DNS, compra.

## 1. Entrevista
Acionamento: "novo site" ou "nova LP" + nome do cliente.
Uma pergunta por vez (no máximo 3 curtas do mesmo bloco). Sempre indicar "Bloco X de 8". Se a pessoa não souber, oferecer 2 ou 3 opções com recomendação, ou pesquisar (concorrentes, referências, redes). Aceitar links, prints, áudio transcrito e arquivos do Drive.

- Bloco 0 Identificação: cliente e segmento, site ou LP, origem (tráfego, planejamento, atendimento), tráfego ativo.
- Bloco 1 Escopo: pacote vendido, páginas ou seções contratadas, o que entra, o que não entra, extras prometidos.
- Bloco 2 Estratégia: objetivo, público e dor, CTA principal e destino, diferencial, canais de chegada.
- Bloco 3 Material: logo, manual de marca, cores e fontes, redes, fotos e vídeos, textos existentes.
- Bloco 4 Mercado e referências: 2 ou 3 concorrentes, sites de referência, o que evitar. Saída: análise de mercado e benchmarking + layout base.
- Bloco 5 Estrutura e croqui: páginas, seções por página, menu, rodapé. Saída: estrutura para redação + croqui em texto.
- Bloco 6 Técnico: domínio e acesso ao DNS, domínio principal ou subdomínio, Analytics, Search Console, Pixel, GTM, integrações (WhatsApp, formulário para CRM, agenda).
- Bloco 7 Prazo: data limite e motivo; propor prazo dentro do SLA.
- Bloco 8 Aprovação e entrega: quem aprova internamente e no cliente, quem precisa de acesso depois.

Obrigatório antes de construir: cliente, segmento e tipo; pacote e escopo; objetivo e CTA; público; estrutura aprovada; logo (ou decisão de logo provisória em texto); prazo; briefing aprovado.
Pode ficar PENDENTE: fotos definitivas, depoimentos, domínio, Analytics e Search Console, textos finais.

## 2. Briefing (template)
```markdown
# Briefing: [Cliente] | [Site ou LP] | v[n] | [data]
## Identificação
- Cliente / segmento / cidade:
- Tipo: Site | LP
- Origem:
- Tráfego ativo:
- Aprovador interno: | Aprovador do cliente:
## Escopo
- Pacote: / Páginas ou seções: / Entra: / Não entra: / Extras:
## Estratégia
- Objetivo: / CTA e destino: / Público e dor: / Diferenciais: / Canais:
## Marca e material
- Logo: / Cores e fontes: / Redes: / Fotos e vídeos: / Textos:
## Mercado e referências
- Concorrentes: / Referências: / Evitar: / Layout base:
## Estrutura (croqui)
- Menu: / Página N: seções / Rodapé:
## Técnico
- Domínio e DNS: / Tags: / Integrações:
## Prazo
- Data limite: / Prazo proposto:
## Pendências
- [ ] item / responsável / prazo
## Aprovação
- Aprovado por: | data:
```

## 3. Construção
Fase A Pré-Site: Portão 1 (briefing e escopo aprovados). Criar pasta do projeto no Drive (só adicionar arquivos). Análise de mercado e benchmarking. Layout base. Textos por seção (redação). Croqui. Apresentar pesquisa, croqui e textos: Portão 2, antes de gastar crédito.
Fase B Criação: atualizar status para Fazendo. Montar prompt mestre a partir de briefing, croqui e textos (padrão `prompt-lovable-LP-totum-v3.md` do Drive: design system explícito, hierarquia, Gestalt, contraste, 1 CTA, checklist). Consultar saldo de créditos do workspace. Criar o projeto no Lovable e mandar o primeiro pedido em plan mode. Enviar link de preview. Construir na ordem: header e footer, blocos, páginas, imagens e vídeos (material do cliente; o que for provisório fica marcado), conferir mobile com screenshot, Search Console e Analytics, otimização de imagens, performance e SEO on-page (title, meta description, Open Graph, headings, alt, sitemap, robots, favicon). Agrupar pedidos para economizar crédito.
Fase C Revisão: revisão de texto, revisão de links e páginas, checklist de QA.
Fase D Aprovação: Portão 3 (site aprovado). Registrar feedback, ajustar, validar de novo.
Fase E Entrega: exportar para GitHub e publicar na Vercel, conectar domínio, enviar ao cliente: Portão 4, com OK explícito para cada ação. Guia explicando cada bloco, seção e página. Acessos do cliente sem senha ADMIN. Lembrete de 30 dias de Beta.
Fase F Registro: registrar o que foi feito, arquivar no Drive, marcar concluído.

## 4. Checklist de QA
- [ ] Header e footer
- [ ] Blocos e páginas criados e adaptados
- [ ] Mobile conferido em todo o site
- [ ] Search Console e Analytics
- [ ] Texto revisado
- [ ] Links e páginas revisados
- [ ] Ortografia, alinhamento visual, coerência com o objetivo
- [ ] Qualidade visual, consistência de marca
- [ ] Resolução e peso adequados
- [ ] CTAs levam ao destino certo
- [ ] Nenhum dado inventado, nenhum placeholder esquecido
- [ ] Title, meta description e Open Graph por página; favicon
- [ ] Política de privacidade se houver formulário
- [ ] Checklist final: demanda validada, briefing entendido, conceito definido, peça criada, revisada, aprovada, entregue, registrada, arquivada

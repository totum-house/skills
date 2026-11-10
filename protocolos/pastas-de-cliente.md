# Protocolo de pastas de cliente

**Versão:** 0.1
**Status:** rascunho pendente de aprovação

Padrão genérico da pasta `Clientes` no Drive. Este texto não é um inventário: não nomeia cliente, não conta arquivo e não lista o que foi encontrado numa varredura. A lista do que move, cliente por cliente, entra na aprovação, antes de qualquer mudança.

Nada neste protocolo autoriza apagar arquivo.

## Raiz

A pasta `Clientes` guarda só isto:

- uma pasta por cliente ativo;
- `Clientes Temp`, para cliente que ainda não está ativo;
- `Cold Client`, para cliente inativo.

Cliente temporário vai para `Clientes Temp`. Cliente inativo vai para `Cold Client`. O que não for cliente não permanece na raiz. O destino desses itens entra na lista que a equipe aprova, na etapa da raiz.

## Cliente ativo

```
<cliente>/
├── 1- Design System/
│   ├── 00-posicionamento/
│   ├── 01-logo/
│   ├── 02-regras/
│   ├── 03-fontes/
│   ├── 04-apresentacao/
│   ├── 05-mockups/
│   ├── 06-manual/
│   ├── 07-design-system/
│   ├── Kit de producao/
│   ├── 08-pendencias.md
│   └── LEIA-ME.md
├── Automações/
├── Governança/
├── _legado/
└── 4- Site/
```

`1- Design System` é o template. Os filhos diretos são exatamente os onze itens acima. O que vai dentro de cada um está em [design-system.md](design-system.md).

`1- Design System` substitui as pastas antigas `1- Logo` e `Design System`, qualquer que tenha sido a grafia anterior.

`Automações` recebe as pastas de automação que já existem no cliente. A pasta entra inteira.

`Governança` é a pasta de documentos de governança do cliente. Nesta rodada ela é criada, e o miolo dela não é inventado.

`_legado` fica na pasta do cliente, fora do template. É o destino de material antigo, estudo, duplicata e versão superada.

`4- Site` é o nome da pasta de site. Se o cliente tiver mais de uma pasta de site, o conteúdo é movido para `4- Site`.

As demais pastas que já existem e não entram neste padrão permanecem no lugar nesta rodada.

## Para onde vai cada tipo de material

| Material | Destino |
|---|---|
| Persona, PUV e documentos do mesmo tipo (posicionamento, promessa, características da marca) | `1- Design System/00-posicionamento/` |
| Logo vigente e versões oficiais | `1- Design System/01-logo/` |
| Regras, paleta e grafismo vigente | `1- Design System/02-regras/` |
| Fontes e licenças | `1- Design System/03-fontes/` |
| Apresentação vigente | `1- Design System/04-apresentacao/` |
| Mockup vigente | `1- Design System/05-mockups/` |
| Manual vigente | `1- Design System/06-manual/` |
| HTML vigente do design system | `1- Design System/07-design-system/` |
| Kit de produção e referências de peça | `1- Design System/Kit de producao/` |
| Pasta de automação já existente | `Automações/` |
| Arquivo do site | `4- Site/` |
| Cópia antiga, estudo, duplicata ou versão superada de marca | `_legado/` |

`08-pendencias.md` e `LEIA-ME.md` entram como modelos em branco, para a equipe preencher. O modelo está no protocolo de design system.

Material de marca solto na pasta de site, quando for duplicata ou versão antiga, vai para `_legado/`. Arquivo do site permanece em `4- Site`.

## Regras

1. Nada é apagado. Tudo é movido.
2. Arquivo de sistema (`.DS_Store`, `._*`, `desktop.ini`) não entra na movimentação. Pasta vazia e esses arquivos só podem ser removidos numa rodada posterior, depois que a lista tiver sido aprovada.
3. Credencial não fica no Drive. O destino é um gerenciador de senhas. Esses arquivos ficam de fora do plano de movimentação e não são abertos.
4. A lista do que move é aprovada antes da execução. Cada etapa mostra o antes e o depois.

## Ordem, depois da aprovação

1. **Piloto.** Um cliente ativo, escolhido na aprovação. Aplicar a árvore, mover o que a lista daquele cliente autorizar e mostrar o antes e o depois.
2. **Demais clientes ativos.** Um por vez, cada um com a própria lista aprovada.
3. **Raiz.** Criar `Clientes Temp` e `Cold Client`, mover cliente temporário e cliente inativo, e deixar a raiz só com clientes ativos e essas duas pastas. Itens que não são cliente saem da raiz para o destino aprovado nessa mesma lista.

## Fora desta rodada

Corrigir numeração e grafia das outras pastas do cliente (redes, anúncios, planejamento, vídeo e equivalentes) fica para uma rodada futura, também com lista aprovada.

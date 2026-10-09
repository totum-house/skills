import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, SessionContextUsage, SessionRateLimit, SessionCost } from 'claude-code'

import type { Detalhe, Linha, Medida } from '../types'

const PLUGIN = 'medidor-tokens'
const PANE = 'medidor-tokens'
const AVISOS = [70, 85, 95]

const medida = atom({ plugin: 'medidor-tokens', key: 'medida' } as const, null)
const detalhe = atom({ plugin: 'medidor-tokens', key: 'detalhe' } as const, null)
const avisado = atom({ plugin: 'medidor-tokens', key: 'avisado' } as const, 0)

const NOMES: Record<string, string> = { five_hour: '5h', seven_day: '7d', spend_limit: 'gasto' }

export const k = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`)

export const barra = (pct: number, largura = 20) => {
  const cheio = Math.min(largura, Math.round((pct / 100) * largura))
  return '█'.repeat(cheio) + '░'.repeat(largura - cheio)
}

export const montar = (
  context: SessionContextUsage,
  rateLimits: SessionRateLimit[],
  cost?: SessionCost,
): Medida => {
  const tokens = context.tokens ?? 0
  const percent = context.percent ?? (context.window ? Math.round((tokens / context.window) * 100) : 0)
  return {
    percent,
    tokens,
    window: context.window,
    limites: rateLimits.map(r => ({ kind: r.kind, percentUsed: r.percentUsed, resetsAt: r.resetsAt })),
    usd: cost?.usd,
  }
}

export const textoStatus = (m: Medida) => {
  const partes = [`Contexto ${m.percent}% (${k(m.tokens)}/${k(m.window)})`]
  for (const l of m.limites) partes.push(`${NOMES[l.kind] ?? l.kind} ${l.percentUsed}%`)
  if (m.usd !== undefined) partes.push(`US$ ${m.usd.toFixed(2)}`)
  return partes.join(' · ')
}

export const nivel = (pct: number) => (pct >= 85 ? 'VERMELHO' : pct >= 70 ? 'AMARELO' : 'VERDE')

const topo = (linhas: Linha[], n: number) =>
  [...linhas].sort((a, b) => b.tokens - a.tokens).slice(0, n)

async function gravarArquivo($: EngineInterface, m: Medida) {
  try {
    const home = await $.env.get('HOME')
    const id = await $.session.id()
    if (!home || !id) return
    const corpo = { ...m, sessionId: id, at: await $.clock.now() }
    await $.fs.write(`${home}/.claude/totum/medidor/${id}.json`, JSON.stringify(corpo))
  } catch {
    // arquivo e so um extra para o superchat-meter; falhar aqui nao afeta o painel
  }
}

async function atualizarDetalhe($: EngineInterface) {
  let b
  try {
    b = (await $.session.usage({ breakdown: 'summary' })).context.breakdown
  } catch {
    return
  }
  if (!b) return
  const porServidor = new Map<string, number>()
  for (const t of b.mcpTools) {
    if (!t.isLoaded) continue
    porServidor.set(t.serverName, (porServidor.get(t.serverName) ?? 0) + t.tokens)
  }
  const d: Detalhe = {
    categorias: b.categories
      .filter(c => c.kind === 'used' && c.tokens > 0)
      .map(c => ({ nome: c.name, tokens: c.tokens })),
    servidores: topo([...porServidor].map(([nome, tokens]) => ({ nome, tokens })), 8),
    skills: b.skills?.tokens,
    geradoEm: await $.clock.now(),
  }
  await update($, detalhe, () => d)
}

async function registrar($: EngineInterface, m: Medida) {
  await update($, medida, () => m)
  $.ui.status(textoStatus(m))
  await gravarArquivo($, m)

  const ja = await read($, avisado)
  const cruzou = AVISOS.filter(a => m.percent >= a && a > ja).pop()
  if (cruzou !== undefined) {
    await update($, avisado, () => cruzou)
    $.ui.toast(
      cruzou >= 85
        ? `Contexto em ${m.percent}%: hora de fazer handoff e abrir chat novo`
        : `Contexto em ${m.percent}%: começa a pesar`,
    )
  }
  if (m.percent < 50 && ja > 0) await update($, avisado, () => 0)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'tokens',
      description: 'Abre o painel com o uso de contexto, limites e o que mais pesa',
    })
    const u = await $.session.usage()
    await registrar($, montar(u.context, u.rateLimits, u.cost))
    await atualizarDetalhe($)
    void $.ui.open({ id: PANE, title: 'Medidor de tokens' })
    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    await registrar($, montar(e.context, e.rateLimits, e.cost))
    if (e.changed.includes('context')) await atualizarDetalhe($)
    return next(e)
  })

  on('command.run', { command: 'tokens' }, async $ => {
    const u = await $.session.usage()
    await update($, medida, () => montar(u.context, u.rateLimits, u.cost))

    await atualizarDetalhe($)

    await $.ui.open({ id: PANE, title: 'Medidor de tokens' })
    const m = await read($, medida)
    return { text: m ? `${textoStatus(m)} · nível ${nivel(m.percent)}` : 'Ainda sem medida: manda a primeira mensagem.' }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const m = await read($, medida)
    if (e.props.hasSurvey || !m || m.percent < 70) return next(e)

    const { Box, Text } = $.ui.resolve(e)
    const cor = m.percent >= 85 ? 'error' : 'warning'
    return (
      <Box>
        <Text color={cor}>
          {barra(m.percent)} {m.percent}% do contexto ({k(m.tokens)}/{k(m.window)})
          {m.percent >= 85 ? ' · faça o handoff e abra um chat novo' : ' · começando a pesar'}
        </Text>
      </Box>
    )
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const m = await read($, medida)
    const d = await read($, detalhe)

    if (!m) {
      return (
        <Box flexDirection="column">
          <Text dimColor>Ainda sem medida. Manda uma mensagem e roda /tokens de novo.</Text>
        </Box>
      )
    }

    const cor = m.percent >= 85 ? 'error' : m.percent >= 70 ? 'warning' : 'success'
    return (
      <Box flexDirection="column">
        <Text bold>Janela de contexto</Text>
        <Text color={cor}>
          {barra(m.percent, 30)} {m.percent}%
        </Text>
        <Text dimColor>
          {k(m.tokens)} de {k(m.window)} tokens · nível {nivel(m.percent)}
        </Text>

        {m.limites.length > 0 && <Text bold>Limites da conta</Text>}
        {m.limites.map(l => (
          <Text>
            {(NOMES[l.kind] ?? l.kind).padEnd(6)} {barra(l.percentUsed, 20)} {l.percentUsed}%
            {l.resetsAt ? ` (renova ${l.resetsAt.slice(11, 16)} UTC)` : ''}
          </Text>
        ))}

        {m.usd !== undefined && <Text dimColor>Custo da sessão: US$ {m.usd.toFixed(2)}</Text>}

        {d && <Text bold>O que mais pesa</Text>}
        {d && topo(d.categorias, 6).map(c => (
          <Text>
            {c.nome.padEnd(22)} {k(c.tokens)}
          </Text>
        ))}
        {d && d.skills !== undefined && <Text dimColor>Lista de skills: {k(d.skills)}</Text>}

        {d && d.servidores.length > 0 && <Text bold>Conectores (ferramentas carregadas)</Text>}
        {d && d.servidores.map(s => (
          <Text>
            {s.nome.padEnd(22)} {k(s.tokens)}
          </Text>
        ))}
      </Box>
    )
  })
}

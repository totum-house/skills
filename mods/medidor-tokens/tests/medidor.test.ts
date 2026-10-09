import { expect, mock, test } from 'claude-code/testing'

import { barra, nivel, textoStatus } from '../hooks/register'

const medir = (percent: number) => ({
  context: { tokens: percent * 2000, window: 200000, percent },
  rateLimits: [{ kind: 'five_hour', percentUsed: 23.5 }],
  cost: { usd: 1.2 },
  changed: ['context' as const],
})

test('formata a linha de status', async () => {
  expect(
    textoStatus({ percent: 34, tokens: 68000, window: 200000, limites: [{ kind: 'five_hour', percentUsed: 23 }], usd: 1.2 }),
  ).toBe('Contexto 34% (68k/200k) · 5h 23% · US$ 1.20')
  expect(barra(50, 10)).toBe('█████░░░░░')
  expect(nivel(72)).toBe('AMARELO')
  expect(nivel(90)).toBe('VERMELHO')
})

test('mede, mostra no status e avisa uma vez por faixa', async ($, on) => {
  const status: (string | undefined)[] = []
  const toasts: string[] = []
  on('ui.status', ($, e) => (status.push(e.text), { value: undefined }))
  on('ui.toast', ($, e) => (toasts.push(e.text), { value: undefined }))
  on('session.measure', ($, e) => ({ changed: e.changed }))

  await $.session.measure(medir(40))
  expect(toasts).toEqual([])
  expect(status.at(-1)).toBe('Contexto 40% (80k/200k) · 5h 23.5% · US$ 1.20')

  await $.session.measure(medir(72))
  await $.session.measure(medir(74))
  expect(toasts.length).toBe(1)

  await $.session.measure(medir(88))
  expect(toasts.length).toBe(2)
  expect(toasts[1]).toContain('handoff')

  expect(status.at(-1)).toContain('Contexto 88%')
})

test('grava a medida para o superchat-meter ler', async ($, on) => {
  const escritos: { path: string; text: string }[] = []
  mock.clock(on)
  on('ui.status', () => ({ value: undefined }))
  on('ui.toast', () => ({ value: undefined }))
  on('session.measure', ($, e) => ({ changed: e.changed }))
  on('env.get', ($, e) => ({ value: e.name === 'HOME' ? '/home/rael' : undefined }))
  on('session.id', () => ({ value: 'sessao-1' }))
  on('fs.write', ($, e) => (escritos.push({ path: e.path, text: e.text }), { value: undefined }))

  await $.session.measure(medir(60))
  const ultimo = escritos.at(-1)
  expect(ultimo?.path).toBe('/home/rael/.claude/totum/medidor/sessao-1.json')
  expect(JSON.parse(ultimo?.text ?? '{}').window).toBe(200000)
})

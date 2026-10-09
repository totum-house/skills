export type Medida = {
  percent: number
  tokens: number
  window: number
  limites: { kind: string; percentUsed: number; resetsAt?: string }[]
  usd?: number
}

export type Linha = { nome: string; tokens: number }

export type Detalhe = {
  categorias: Linha[]
  servidores: Linha[]
  skills?: number
  geradoEm: number
}

declare module 'claude-code' {
  interface PluginState {
    'medidor-tokens': {
      medida: Medida | null
      detalhe: Detalhe | null
      avisado: number
    }
  }
}

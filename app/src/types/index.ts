export type RiskLevel = 'low' | 'medium' | 'high'
export type LogisticsType = 'air' | 'sea' | 'courier'

export interface Supplier {
  id: string
  name: string
  country: string
  flag: string
  priceUSD: number
  moq: number
  rating: number
}

export interface LogisticsOption {
  id: string
  carrier: string
  days: number
  costUSD: number
  type: LogisticsType
}

export interface Product {
  id: string
  name: string
  ncmCode: string
  category: string
  description: string
  emoji: string
  suppliers: Supplier[]
  logistics: LogisticsOption[]
  permits: string[]
  risk: RiskLevel
  tariffRate: number
  ivaRate: number
  estadisticaRate: number
}

export interface CartItem {
  product: Product
  supplier: Supplier
  logistics: LogisticsOption
  quantity: number
}

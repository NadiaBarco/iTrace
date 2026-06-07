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

export interface ImportReadinessScore {
  score: number
  status: 'Excelente' | 'Aceptable' | 'Riesgo Medio' | 'Riesgo Alto'
  color: 'green' | 'yellow' | 'orange' | 'red'
  deductions: string[]
}

export type ImporterType = 'consumer' | 'monotributista' | 'responsable_inscripto' | 'empresa'

export type EconomicActivity =
  | 'technology'
  | 'electronics'
  | 'home'
  | 'textile'
  | 'food'
  | 'pharma'
  | 'construction'
  | 'other'

export interface ImporterProfile {
  importerType: ImporterType | null
  economicActivity: EconomicActivity | null
  country: 'Argentina'
  taxId: string
  ownedPermissions: string[]
  isComplete: boolean
  completionPercentage: number
}

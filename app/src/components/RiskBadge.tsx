import type { RiskLevel } from '../types'

const config: Record<RiskLevel, { label: string; classes: string }> = {
  low: { label: 'Riesgo Bajo', classes: 'bg-green-100 text-green-800' },
  medium: { label: 'Riesgo Medio', classes: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'Riesgo Alto', classes: 'bg-red-100 text-red-800' },
}

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  const { label, classes } = config[risk]
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${classes}`}>
      {label}
    </span>
  )
}

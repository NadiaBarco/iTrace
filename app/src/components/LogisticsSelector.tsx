import type { LogisticsOption } from '../types'

const typeLabel: Record<string, string> = {
  courier: '📦 Courier',
  air: '✈️ Aéreo',
  sea: '🚢 Marítimo',
}

interface Props {
  options: LogisticsOption[]
  selected: LogisticsOption
  onChange: (l: LogisticsOption) => void
}

export function LogisticsSelector({ options, selected, onChange }: Props) {
  return (
    <div className="space-y-2">
      {options.map((l) => (
        <div
          key={l.id}
          onClick={() => onChange(l)}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            selected.id === l.id
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-slate-200 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">{l.carrier}</span>
            <span className="font-bold text-indigo-700">USD {l.costUSD}</span>
          </div>
          <div className="flex gap-4 mt-1 text-xs text-slate-500">
            <span>{typeLabel[l.type]}</span>
            <span>⏱ {l.days} días hábiles</span>
          </div>
        </div>
      ))}
    </div>
  )
}

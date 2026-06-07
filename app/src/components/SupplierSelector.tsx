import type { Supplier } from '../types'

interface Props {
  suppliers: Supplier[]
  selected: Supplier
  onChange: (s: Supplier) => void
}

export function SupplierSelector({ suppliers, selected, onChange }: Props) {
  return (
    <div className="space-y-2">
      {suppliers.map((s) => (
        <div
          key={s.id}
          onClick={() => onChange(s)}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            selected.id === s.id
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-slate-200 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-sm">{s.flag} {s.name}</span>
              <span className="ml-2 text-xs text-slate-500">{s.country}</span>
            </div>
            <span className="font-bold text-indigo-700">USD {s.priceUSD}/u</span>
          </div>
          <div className="flex gap-4 mt-1 text-xs text-slate-500">
            <span>MOQ: {s.moq} unidades</span>
            <span>{'⭐'.repeat(Math.round(s.rating))} {s.rating}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

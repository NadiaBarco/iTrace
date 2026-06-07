import type { ImportReadinessScore } from '../types'

const colorConfig = {
  green: {
    bar: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    score: 'text-emerald-600',
    ring: 'ring-emerald-200',
  },
  yellow: {
    bar: 'bg-yellow-400',
    badge: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    score: 'text-yellow-600',
    ring: 'ring-yellow-200',
  },
  orange: {
    bar: 'bg-orange-500',
    badge: 'bg-orange-50 text-orange-700 border border-orange-200',
    score: 'text-orange-600',
    ring: 'ring-orange-200',
  },
  red: {
    bar: 'bg-red-500',
    badge: 'bg-red-50 text-red-700 border border-red-200',
    score: 'text-red-600',
    ring: 'ring-red-200',
  },
}

interface Props {
  score: ImportReadinessScore
  compact?: boolean
}

export function ImportReadinessCard({ score, compact = false }: Props) {
  const cfg = colorConfig[score.color]

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${cfg.bar}`} />
        <span className={`text-xs font-semibold tabular-nums ${cfg.score}`}>
          {score.score}
        </span>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-5 ring-1 ${cfg.ring}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
            Import Readiness Score
          </p>
          <div className="flex items-baseline gap-1">
            <span className={`text-5xl font-bold tabular-nums ${cfg.score}`}>
              {score.score}
            </span>
            <span className="text-lg text-slate-400 font-medium">/100</span>
          </div>
        </div>
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${cfg.badge}`}>
          {score.status}
        </span>
      </div>

      <div className="mb-4">
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${cfg.bar}`}
            style={{ width: `${score.score}%` }}
          />
        </div>
      </div>

      {score.deductions.length > 0 && (
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            Factores detectados
          </p>
          <ul className="space-y-1.5">
            {score.deductions.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-slate-500">
                <span className="mt-0.5 text-slate-300 font-bold leading-none">✕</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

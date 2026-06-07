import { useNavigate } from 'react-router-dom'
import { useProfileStore } from '../store/profileStore'
import { products } from '../data/products'
import type { ImporterType, EconomicActivity } from '../types'

const IMPORTER_TYPE_LABELS: Record<ImporterType, string> = {
  consumer: 'Consumidor Final',
  monotributista: 'Monotributista',
  responsable_inscripto: 'Responsable Inscripto',
  empresa: 'Empresa',
}

const ACTIVITY_LABELS: Record<EconomicActivity, string> = {
  technology: 'Tecnología',
  electronics: 'Electrónica',
  home: 'Hogar',
  textile: 'Textil',
  food: 'Alimentos',
  pharma: 'Farmacia',
  construction: 'Construcción',
  other: 'Otros',
}

const ALL_PERMITS = [...new Set(products.flatMap((p) => p.permits))].filter(Boolean)

export function ProfilePage() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useProfileStore()

  function togglePermit(permit: string) {
    const current = profile.ownedPermissions
    const next = current.includes(permit)
      ? current.filter((p) => p !== permit)
      : [...current, permit]
    updateProfile({ ownedPermissions: next })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-900 text-lg">← Volver</button>
        <h1 className="text-xl font-bold text-indigo-700">iTrace · Perfil del Importador</h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Progress header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-slate-900">Completitud del perfil</h2>
              <span className={`text-sm font-bold ${profile.isComplete ? 'text-emerald-600' : 'text-indigo-600'}`}>
                {profile.completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${profile.isComplete ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                style={{ width: `${profile.completionPercentage}%` }}
              />
            </div>
            {profile.isComplete && (
              <p className="text-xs text-emerald-600 mt-1.5">✅ Perfil completo — sin penalizaciones por perfil en el IRS</p>
            )}
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Importer type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tipo de usuario <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(IMPORTER_TYPE_LABELS) as ImporterType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => updateProfile({ importerType: type })}
                    className={`p-3 rounded-lg border text-sm font-medium text-left transition-all ${
                      profile.importerType === type
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                  >
                    {IMPORTER_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Economic activity */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Actividad económica <span className="text-red-400">*</span>
              </label>
              <select
                value={profile.economicActivity ?? ''}
                onChange={(e) => updateProfile({ economicActivity: e.target.value as EconomicActivity || null })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              >
                <option value="">Seleccioná una actividad</option>
                {(Object.keys(ACTIVITY_LABELS) as EconomicActivity[]).map((act) => (
                  <option key={act} value={act}>{ACTIVITY_LABELS[act]}</option>
                ))}
              </select>
            </div>

            {/* Country (read-only) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">País de operación</label>
              <div className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-500 bg-slate-50">
                🇦🇷 Argentina
              </div>
            </div>

            {/* Tax ID */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                CUIT / CUIL <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="20-12345678-9"
                value={profile.taxId}
                onChange={(e) => updateProfile({ taxId: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Owned permissions */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Permisos que ya poseés <span className="text-red-400">*</span>
              </label>
              <p className="text-xs text-slate-400 mb-3">
                Si tenés alguno, marcalo para que no se aplique la penalización en el IRS.
              </p>
              {ALL_PERMITS.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No hay permisos requeridos en el catálogo actual.</p>
              ) : (
                <div className="space-y-2">
                  {ALL_PERMITS.map((permit) => (
                    <label
                      key={permit}
                      className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={profile.ownedPermissions.includes(permit)}
                        onChange={() => togglePermit(permit)}
                        className="mt-0.5 accent-indigo-600"
                      />
                      <span className="text-sm text-slate-700">{permit}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="px-6 pb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Guardar y volver
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

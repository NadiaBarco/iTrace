import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfileStore } from '../store/profileStore'

export function ProfileBanner() {
  const profile = useProfileStore((s) => s.profile)
  const navigate = useNavigate()
  const [dismissed, setDismissed] = useState(false)

  if (profile.isComplete || dismissed) return null

  return (
    <div className="flex items-center justify-between gap-4 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 mb-6">
      <div className="flex items-center gap-3">
        <span className="text-indigo-500 text-lg">👤</span>
        <div>
          <p className="text-sm font-medium text-indigo-800">
            Completá tu perfil para mejorar la precisión del score
          </p>
          <p className="text-xs text-indigo-500">
            Perfil {profile.completionPercentage}% completo · Las simulaciones sin perfil tienen una penalización de -20
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => navigate('/profile')}
          className="text-sm font-semibold text-indigo-700 bg-white border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          Completar perfil
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="text-indigo-400 hover:text-indigo-600 text-lg leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

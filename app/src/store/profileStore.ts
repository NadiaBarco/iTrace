import { create } from 'zustand'
import type { ImporterProfile } from '../types'

const STORAGE_KEY = 'itrace.importerProfile'

function calcCompletion(p: ImporterProfile): { isComplete: boolean; completionPercentage: number } {
  const filled = [
    p.importerType !== null,
    p.economicActivity !== null,
    p.taxId.trim().length > 0,
    p.ownedPermissions.length > 0,
  ].filter(Boolean).length
  return {
    isComplete: filled === 4,
    completionPercentage: Math.round((filled / 4) * 100),
  }
}

const defaultProfile: ImporterProfile = {
  importerType: null,
  economicActivity: null,
  country: 'Argentina',
  taxId: '',
  ownedPermissions: [],
  isComplete: false,
  completionPercentage: 0,
}

interface ProfileStore {
  profile: ImporterProfile
  updateProfile: (fields: Partial<ImporterProfile>) => void
  loadFromStorage: () => void
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: defaultProfile,

  updateProfile: (fields) =>
    set((state) => {
      const updated = { ...state.profile, ...fields }
      const { isComplete, completionPercentage } = calcCompletion(updated)
      const final = { ...updated, isComplete, completionPercentage }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(final))
      return { profile: final }
    }),

  loadFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as ImporterProfile
      const { isComplete, completionPercentage } = calcCompletion(parsed)
      set({ profile: { ...parsed, isComplete, completionPercentage } })
    } catch {
      // ignore corrupt data
    }
  },
}))

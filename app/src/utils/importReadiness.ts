import type { Product, Supplier, LogisticsOption, ImportReadinessScore, ImporterProfile } from '../types'

export function calculateImportReadinessScore(
  product: Product,
  supplier: Supplier,
  quantity: number,
  logistics?: LogisticsOption,
  profile?: ImporterProfile
): ImportReadinessScore {
  let score = 100
  const deductions: string[] = []

  // Profile-based penalties
  if (!profile || !profile.isComplete) {
    score -= 20
    deductions.push('Perfil incompleto: completá tu perfil para mayor precisión')
  }

  if (profile?.importerType === 'consumer') {
    score -= 15
    deductions.push('Perfil de Consumidor Final: capacidad de importación limitada')
  } else if (profile?.importerType === 'monotributista') {
    score -= 5
    deductions.push('Perfil Monotributista: restricciones de volumen de importación')
  }

  // Permits penalty — skipped if user already owns all required permits
  if (product.permits.length > 0) {
    const allOwned =
      profile && profile.ownedPermissions.length > 0
        ? product.permits.every((p) => profile.ownedPermissions.includes(p))
        : false

    if (!allOwned) {
      score -= 40
      deductions.push('Requiere permisos regulatorios previos')
    }
  }

  if (supplier.moq > quantity) {
    score -= 15
    deductions.push('MOQ del proveedor supera la cantidad solicitada')
  }

  if (supplier.rating < 4.5) {
    score -= 10
    deductions.push('Rating del proveedor por debajo del umbral recomendado')
  }

  if (product.risk === 'high') {
    score -= 20
    deductions.push('Riesgo regulatorio alto para este producto')
  }

  if (logistics?.type === 'sea') {
    score -= 10
    deductions.push('Logística marítima: mayor exposición a demoras')
  }

  score -= 5
  deductions.push('Riesgo cambiario inherente a importaciones en Argentina')

  score = Math.max(0, score)

  let status: ImportReadinessScore['status']
  let color: ImportReadinessScore['color']

  if (score >= 90) {
    status = 'Excelente'
    color = 'green'
  } else if (score >= 70) {
    status = 'Aceptable'
    color = 'yellow'
  } else if (score >= 50) {
    status = 'Riesgo Medio'
    color = 'orange'
  } else {
    status = 'Riesgo Alto'
    color = 'red'
  }

  return { score, status, color, deductions }
}

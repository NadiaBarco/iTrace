import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { SupplierSelector } from '../components/SupplierSelector'
import { LogisticsSelector } from '../components/LogisticsSelector'
import { RiskBadge } from '../components/RiskBadge'
import { PermitsBadge } from '../components/PermitsBadge'
import { ImportReadinessCard } from '../components/ImportReadinessCard'
import { ProfileBanner } from '../components/ProfileBanner'
import { useCartStore, calcItemCost } from '../store/cartStore'
import { useProfileStore } from '../store/profileStore'
import { calculateImportReadinessScore } from '../utils/importReadiness'
import type { Supplier, LogisticsOption } from '../types'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const profile = useProfileStore((s) => s.profile)

  const product = products.find((p) => p.id === id)
  const [selectedLogistics, setSelectedLogistics] = useState<LogisticsOption>(product?.logistics[0]!)
  const [quantity, setQuantity] = useState(product?.suppliers[0]?.moq ?? 1)
  const [added, setAdded] = useState(false)

  const supplierScores = useMemo(() => {
    if (!product) return {}
    return Object.fromEntries(
      product.suppliers.map((s) => [
        s.id,
        calculateImportReadinessScore(product, s, quantity, selectedLogistics, profile),
      ])
    )
  }, [product, quantity, selectedLogistics, profile])

  const sortedSuppliers = useMemo(() => {
    if (!product) return []
    return [...product.suppliers].sort((a, b) => {
      const scoreDiff = supplierScores[b.id].score - supplierScores[a.id].score
      return scoreDiff !== 0 ? scoreDiff : b.rating - a.rating
    })
  }, [product, supplierScores])

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>(sortedSuppliers[0]!)

  const currentScore = useMemo(
    () => calculateImportReadinessScore(product!, selectedSupplier, quantity, selectedLogistics, profile),
    [product, selectedSupplier, quantity, selectedLogistics, profile]
  )

  if (!product) {
    return (
      <div className="text-center py-20 text-slate-500">
        Producto no encontrado.{' '}
        <button onClick={() => navigate('/')} className="text-indigo-600 underline">Volver</button>
      </div>
    )
  }

  const costs = calcItemCost({ product, supplier: selectedSupplier, logistics: selectedLogistics, quantity })

  function handleAdd() {
    addItem(product!, selectedSupplier, selectedLogistics, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-900 text-lg">← Volver</button>
        <h1 className="text-xl font-bold text-indigo-700">iTrace</h1>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => navigate('/profile')}
            className="relative flex items-center gap-2 border border-slate-200 text-slate-600 px-3 py-2 rounded-lg hover:border-indigo-300 hover:text-indigo-700 transition-colors text-sm"
          >
            👤 Perfil
            {!profile.isComplete && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white" />
            )}
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            🛒 Ver carrito
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <ProfileBanner />

        <div className="flex items-center gap-3 mb-6">
          <span className="text-5xl">{product.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{product.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-slate-500">NCM {product.ncmCode}</span>
              <RiskBadge risk={product.risk} />
            </div>
          </div>
        </div>

        <p className="text-slate-600 mb-8">{product.description}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Proveedor</h3>
              <SupplierSelector
                suppliers={sortedSuppliers}
                selected={selectedSupplier}
                onChange={setSelectedSupplier}
                scores={supplierScores}
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Logística</h3>
              <LogisticsSelector
                options={product.logistics}
                selected={selectedLogistics}
                onChange={setSelectedLogistics}
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Cantidad</h3>
              <input
                type="number"
                min={selectedSupplier.moq}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-32 border border-slate-300 rounded-lg px-3 py-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <p className="text-xs text-slate-400 mt-1">MOQ mínimo: {selectedSupplier.moq} unidades</p>
            </div>
          </div>

          <div className="space-y-6">
            <ImportReadinessCard score={currentScore} />

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Desglose de costos estimados</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">FOB ({quantity} u × USD {selectedSupplier.priceUSD})</span>
                  <span>USD {costs.fob.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Flete ({selectedLogistics.carrier})</span>
                  <span>USD {costs.logistics.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Arancel ({product.tariffRate}%)</span>
                  <span>USD {costs.tariff.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">IVA ({product.ivaRate}%)</span>
                  <span>USD {costs.iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tasa estadística ({product.estadisticaRate}%)</span>
                  <span>USD {costs.estadistica.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-base">
                  <span>Total estimado</span>
                  <span className="text-indigo-700">USD {costs.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Permisos y licencias requeridos</h3>
              <PermitsBadge permits={product.permits} />
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                added ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {added ? '✅ Agregado al carrito' : '🛒 Agregar al carrito'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

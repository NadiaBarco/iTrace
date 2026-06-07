import { useNavigate } from 'react-router-dom'
import { useCartStore, calcItemCost, USD_TO_ARS } from '../store/cartStore'
import { RiskBadge } from '../components/RiskBadge'

export function CartPage() {
  const navigate = useNavigate()
  const { items, removeItem } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-900 text-lg">← Volver</button>
          <h1 className="text-xl font-bold text-indigo-700">iTrace · Carrito</h1>
        </header>
        <div className="text-center py-24 text-slate-400">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-lg">Tu carrito está vacío</p>
          <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 underline">Buscar productos</button>
        </div>
      </div>
    )
  }

  const totalUSD = items.reduce((sum, item) => sum + calcItemCost(item).total, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-900 text-lg">← Volver</button>
        <h1 className="text-xl font-bold text-indigo-700">iTrace · Carrito</h1>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Resumen de simulación</h2>

        <div className="space-y-4 mb-8">
          {items.map((item) => {
            const costs = calcItemCost(item)
            return (
              <div key={item.product.id} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.product.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.product.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500">{item.supplier.flag} {item.supplier.name}</span>
                        <RiskBadge risk={item.product.risk} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors text-lg"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <div className="text-slate-500 text-xs">Cantidad</div>
                    <div className="font-semibold">{item.quantity} u</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <div className="text-slate-500 text-xs">Logística</div>
                    <div className="font-semibold text-xs">{item.logistics.carrier}</div>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-2 text-center">
                    <div className="text-indigo-600 text-xs">Total estimado</div>
                    <div className="font-bold text-indigo-700">USD {costs.total.toFixed(0)}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-xl border border-indigo-200 p-5 mb-6">
          <div className="flex justify-between items-center text-lg font-bold mb-1">
            <span>Total de la simulación</span>
            <span className="text-indigo-700">USD {totalUSD.toFixed(2)}</span>
          </div>
          <div className="text-right text-sm text-slate-500">
            ≈ ARS {(totalUSD * USD_TO_ARS).toLocaleString('es-AR')} (TC referencial: ${USD_TO_ARS})
          </div>
        </div>

        <button
          onClick={() => navigate('/report')}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors"
        >
          Terminar Simulación → Ver Informe Final
        </button>
      </main>
    </div>
  )
}

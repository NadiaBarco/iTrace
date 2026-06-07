import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore, calcItemCost, USD_TO_ARS } from '../store/cartStore'
import { RiskBadge } from '../components/RiskBadge'

export function ReportPage() {
  const navigate = useNavigate()
  const { items, clear } = useCartStore()
  const [requested, setRequested] = useState(false)

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">No hay nada que reportar.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 underline">Ir al inicio</button>
      </div>
    )
  }

  const totalUSD = items.reduce((sum, item) => sum + calcItemCost(item).total, 0)
  const allPermits = [...new Set(items.flatMap((i) => i.product.permits))]
  const highRiskItems = items.filter((i) => i.product.risk === 'high')
  const mediumRiskItems = items.filter((i) => i.product.risk === 'medium')

  function handleNewSim() {
    clear()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <h1 className="text-xl font-bold text-indigo-700">iTrace · Informe Final</h1>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-indigo-600 text-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-1">Informe de Importación</h2>
          <p className="text-indigo-200 text-sm">{items.length} producto(s) · Simulación estimativa</p>
          <div className="mt-4 text-3xl font-bold">USD {totalUSD.toFixed(2)}</div>
          <div className="text-indigo-200 text-sm">
            ≈ ARS {(totalUSD * USD_TO_ARS).toLocaleString('es-AR')} (TC ${USD_TO_ARS})
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900 text-lg mb-4">Desglose por producto</h3>
          <div className="space-y-5">
            {items.map((item) => {
              const c = calcItemCost(item)
              return (
                <div key={item.product.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{item.product.emoji}</span>
                    <span className="font-semibold text-slate-900">{item.product.name}</span>
                    <RiskBadge risk={item.product.risk} />
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 text-sm text-slate-600">
                    <div className="flex justify-between"><span>Proveedor</span><span className="font-medium">{item.supplier.flag} {item.supplier.name}</span></div>
                    <div className="flex justify-between"><span>Logística</span><span className="font-medium">{item.logistics.carrier}</span></div>
                    <div className="flex justify-between"><span>FOB × {item.quantity}u</span><span>USD {c.fob.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Flete</span><span>USD {c.logistics.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Arancel</span><span>USD {c.tariff.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>IVA + Estadística</span><span>USD {(c.iva + c.estadistica).toFixed(2)}</span></div>
                  </div>
                  <div className="flex justify-between font-bold text-sm mt-2 pt-2 border-t border-slate-100">
                    <span>Subtotal</span>
                    <span className="text-indigo-700">USD {c.total.toFixed(2)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900 text-lg mb-3">📋 Documentación requerida</h3>
          {allPermits.length === 0 ? (
            <p className="text-green-700 text-sm flex items-center gap-2">
              <span>✅</span> Ningún permiso especial requerido para los productos seleccionados
            </p>
          ) : (
            <ul className="space-y-2">
              {allPermits.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500 mt-0.5">⚠️</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900 text-lg mb-3">⚠️ Informe de riesgos</h3>
          {highRiskItems.length === 0 && mediumRiskItems.length === 0 ? (
            <p className="text-green-700 text-sm flex items-center gap-2">
              <span>✅</span> Todos los productos presentan riesgo bajo
            </p>
          ) : (
            <div className="space-y-3">
              {[...highRiskItems, ...mediumRiskItems].map((item) => (
                <div key={item.product.id} className={`p-3 rounded-lg text-sm ${
                  item.product.risk === 'high' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{item.product.emoji}</span>
                    <span className="font-semibold">{item.product.name}</span>
                    <RiskBadge risk={item.product.risk} />
                  </div>
                  <div className="text-slate-600">
                    <span>Proveedor: {item.supplier.flag} {item.supplier.name} ({item.supplier.country})</span>
                    {item.product.permits.length > 0 && (
                      <div className="mt-1">Requiere {item.product.permits.length} permiso(s) previo(s) a la importación.</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          ⚠️ Este informe es una simulación estimativa con fines informativos. Los valores de impuestos, aranceles y permisos deben verificarse con un despachante de aduana habilitado antes de operar.
        </div>

        {requested ? (
          <div className="w-full py-4 bg-slate-100 border border-slate-200 rounded-xl text-center text-slate-600 font-medium">
            Resolviendo operación
          </div>
        ) : (
          <button
            onClick={() => setRequested(true)}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors"
          >
            Solicitar gestión
          </button>
        )}

        <button
          onClick={handleNewSim}
          className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-900 transition-colors"
        >
          Nueva Simulación
        </button>
      </main>
    </div>
  )
}

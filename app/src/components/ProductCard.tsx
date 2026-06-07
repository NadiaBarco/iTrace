import { useNavigate } from 'react-router-dom'
import type { Product } from '../types'
import { RiskBadge } from './RiskBadge'

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate()
  const minPrice = Math.min(...product.suppliers.map((s) => s.priceUSD))

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-xl border border-slate-200 p-5 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all"
    >
      <div className="text-4xl mb-3">{product.emoji}</div>
      <h3 className="font-semibold text-slate-900 text-lg mb-1">{product.name}</h3>
      <p className="text-slate-500 text-sm mb-3 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-indigo-600 font-semibold">Desde USD {minPrice}</span>
        <RiskBadge risk={product.risk} />
      </div>
      <div className="mt-2 text-xs text-slate-400">NCM {product.ncmCode} · {product.category}</div>
    </div>
  )
}

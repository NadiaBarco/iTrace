import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import { useCartStore } from '../store/cartStore'
import { useProfileStore } from '../store/profileStore'

export function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const cartCount = useCartStore((s) => s.items.length)
  const profile = useProfileStore((s) => s.profile)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700">iTrace</h1>
          <p className="text-xs text-slate-500">Simulador de importaciones para Argentina</p>
        </div>
        <div className="flex items-center gap-2">
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
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            🛒 Carrito
            {cartCount > 0 && (
              <span className="bg-white text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            ¿Qué querés importar?
          </h2>
          <p className="text-slate-500">
            Simulá costos, permisos y logística antes de tomar una decisión
          </p>
        </div>

        <div className="mb-8">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-3">🔍</div>
            <p>No se encontraron productos para "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

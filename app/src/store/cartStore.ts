import { create } from 'zustand'
import type { CartItem, Product, Supplier, LogisticsOption } from '../types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, supplier: Supplier, logistics: LogisticsOption, quantity: number) => void
  removeItem: (productId: string) => void
  clear: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (product, supplier, logistics, quantity) =>
    set((state) => {
      const existing = state.items.findIndex((i) => i.product.id === product.id)
      if (existing >= 0) {
        const updated = [...state.items]
        updated[existing] = { product, supplier, logistics, quantity }
        return { items: updated }
      }
      return { items: [...state.items, { product, supplier, logistics, quantity }] }
    }),
  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),
  clear: () => set({ items: [] }),
}))

export const USD_TO_ARS = 1250

export function calcItemCost(item: CartItem): {
  fob: number
  logistics: number
  tariff: number
  iva: number
  estadistica: number
  total: number
} {
  const fob = item.supplier.priceUSD * item.quantity
  const logistics = item.logistics.costUSD
  const tariff = fob * (item.product.tariffRate / 100)
  const iva = (fob + tariff) * (item.product.ivaRate / 100)
  const estadistica = fob * (item.product.estadisticaRate / 100)
  const total = fob + logistics + tariff + iva + estadistica
  return { fob, logistics, tariff, iva, estadistica, total }
}

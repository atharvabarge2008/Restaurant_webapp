'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartCtx = createContext(null)
const LS_KEY = 'shindeshahi_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [promo, setPromo] = useState(null) // { code, type: 'percent'|'flat'|'freedel', value, label }
  const [mode, setMode] = useState('delivery') // 'delivery' | 'pickup'
  const [ready, setReady] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        setItems(data.items || [])
        setPromo(data.promo || null)
        setMode(data.mode || 'delivery')
      }
    } catch(e) {}
    setReady(true)
  }, [])

  // Persist
  useEffect(() => {
    if (!ready) return
    localStorage.setItem(LS_KEY, JSON.stringify({ items, promo, mode }))
  }, [items, promo, mode, ready])

  const addItem = (dish, portion = 'full') => {
    const price = portion === 'half' && dish.halfPrice ? dish.halfPrice : dish.price
    const key = `${dish.id}-${portion}`
    setItems(prev => {
      const idx = prev.findIndex(i => i.key === key)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 }
        return next
      }
      return [...prev, { key, id: dish.id, name: dish.name, marathi: dish.marathi, image: dish.image, price, portion, qty: 1, category: dish.category }]
    })
  }

  const updateQty = (key, qty) => {
    if (qty <= 0) { setItems(prev => prev.filter(i => i.key !== key)); return }
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key))
  const clear = () => { setItems([]); setPromo(null) }

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
    const itemCount = items.reduce((s, i) => s + i.qty, 0)
    let discount = 0
    if (promo) {
      if (promo.type === 'percent') discount = Math.round(subtotal * promo.value / 100)
      else if (promo.type === 'flat') discount = promo.value
    }
    discount = Math.min(discount, subtotal)
    let delivery = mode === 'pickup' ? 0 : (subtotal > 499 ? 0 : 40)
    if (promo && promo.type === 'freedel') delivery = 0
    const taxable = Math.max(0, subtotal - discount)
    const tax = Math.round(taxable * 0.05)
    const total = taxable + tax + delivery
    return { subtotal, itemCount, discount, delivery, tax, total }
  }, [items, promo, mode])

  const value = { items, promo, mode, ready, addItem, updateQty, removeItem, clear, setPromo, setMode, totals }
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartCtx = createContext(null)
const LS_KEY = 'shindesh_cart_v1'

// Synchronous lazy initializer — reads localStorage on first render (client only) so cart never flashes empty
function loadInitial() {
  if (typeof window === 'undefined') return { items: [], promo: null, mode: 'delivery' }
  try {
    const raw = window.localStorage.getItem(LS_KEY)
    if (raw) {
      const d = JSON.parse(raw)
      return { items: Array.isArray(d.items) ? d.items : [], promo: d.promo || null, mode: d.mode || 'delivery' }
    }
  } catch(e) {}
  return { items: [], promo: null, mode: 'delivery' }
}

export function CartProvider({ children }) {
  const initial = loadInitial()
  const [items, setItems] = useState(initial.items)
  const [promo, setPromo] = useState(initial.promo)
  const [mode, setMode] = useState(initial.mode)
  const [ready, setReady] = useState(true)

  // Persist on every change
  useEffect(() => {
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify({ items, promo, mode }))
    } catch(e) {}
  }, [items, promo, mode])

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== LS_KEY || !e.newValue) return
      try {
        const d = JSON.parse(e.newValue)
        setItems(Array.isArray(d.items) ? d.items : [])
        setPromo(d.promo || null)
        setMode(d.mode || 'delivery')
      } catch(err) {}
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

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

'use client'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Trash2, Tag, ShoppingBag, ArrowRight, X, Sparkles, ChefHat } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, updateQty, removeItem, totals, promo, setPromo, mode, setMode } = useCart()
  const [code, setCode] = useState('')
  const [applying, setApplying] = useState(false)

  const applyPromo = async () => {
    if (!code.trim()) return
    setApplying(true)
    try {
      const res = await fetch('/api/promo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, subtotal: totals.subtotal }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Invalid code')
      setPromo(data.promo)
      toast.success(`Promo applied: ${data.promo.label}`)
      setCode('')
    } catch (e) { toast.error(e.message) }
    finally { setApplying(false) }
  }

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 bg-brand-ink">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-brand-gold/60"/>
            <span className="uppercase tracking-[0.35em] text-[10px] text-brand-gold font-semibold">Your Cart</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl">Your <em className="text-gold-gradient not-italic">Order</em></h1>
        </div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass gold-border rounded-3xl p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-brand-gold/10 flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-brand-gold"/>
            </div>
            <h3 className="font-display text-3xl mb-3">Your cart is empty</h3>
            <p className="text-brand-cream/60 mb-8">Add some delicious Shindeshahi bestsellers to get started.</p>
            <Link href="/menu" className="btn-gold">Browse Menu <ArrowRight className="w-4 h-4"/></Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {/* Mode switcher */}
              <div className="glass rounded-2xl p-1.5 flex mb-4">
                {[{k:'delivery',l:'Delivery',s:'₹40 · Free above ₹499'},{k:'pickup',l:'Pickup',s:'From Guruwar Peth'}].map(m => (
                  <button key={m.k} onClick={() => setMode(m.k)} className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${mode === m.k ? 'bg-gold-gradient text-brand-ink shadow-gold' : 'text-brand-cream/70 hover:text-brand-gold'}`}>
                    <div>{m.l}</div>
                    <div className={`text-[10px] uppercase tracking-widest mt-0.5 ${mode === m.k ? 'text-brand-ink/70' : 'text-brand-cream/40'}`}>{m.s}</div>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="popLayout">
                {items.map(it => (
                  <motion.div key={it.key} layout
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0, marginTop: 0 }}
                    className="glass rounded-2xl p-3 md:p-4 flex gap-4 items-center"
                  >
                    <img src={it.image} alt={it.name} className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <div className="text-brand-red-light/60 text-[10px] truncate" style={{ fontFamily: 'var(--font-chinese)' }}>{it.marathi}</div>
                      <h3 className="font-display text-base md:text-lg text-brand-cream truncate">{it.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase tracking-widest text-brand-gold/70 px-2 py-0.5 rounded-full bg-brand-gold/10">{it.portion === 'half' ? 'Half' : 'Full'}</span>
                        <span className="text-sm text-gold-gradient font-semibold">₹{it.price}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1 bg-black/40 rounded-full p-1">
                        <button onClick={() => updateQty(it.key, it.qty - 1)} className="w-7 h-7 rounded-full flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-ink transition"><Minus className="w-3.5 h-3.5"/></button>
                        <span className="w-6 text-center text-sm font-bold">{it.qty}</span>
                        <button onClick={() => updateQty(it.key, it.qty + 1)} className="w-7 h-7 rounded-full flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-ink transition"><Plus className="w-3.5 h-3.5"/></button>
                      </div>
                      <button onClick={() => removeItem(it.key)} className="text-brand-cream/40 hover:text-brand-red-light text-xs flex items-center gap-1"><Trash2 className="w-3 h-3"/>Remove</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Link href="/menu" className="inline-flex items-center gap-2 text-brand-gold text-sm mt-4 hover:gap-3 transition-all">
                <Plus className="w-4 h-4"/> Add more items
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 glass gold-border rounded-3xl p-6 md:p-7 space-y-6">
                {/* Promo */}
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brand-gold/80 font-semibold mb-3">
                    <Tag className="w-3 h-3"/> Promo Code
                  </div>
                  {promo ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-brand-gold/10 border border-brand-gold/40">
                      <div>
                        <div className="font-semibold text-brand-gold text-sm">{promo.code}</div>
                        <div className="text-xs text-brand-cream/60">{promo.label}</div>
                      </div>
                      <button onClick={() => setPromo(null)} className="text-brand-cream/60 hover:text-brand-red-light"><X className="w-4 h-4"/></button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && applyPromo()} placeholder="Enter code" className="flex-1 bg-black/40 border border-brand-gold/20 focus:border-brand-gold outline-none rounded-xl px-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-cream/40 uppercase"/>
                      <button onClick={applyPromo} disabled={applying || !code} className="px-4 py-2.5 rounded-xl bg-brand-gold text-brand-ink text-xs font-bold uppercase disabled:opacity-50">{applying ? '...' : 'Apply'}</button>
                    </div>
                  )}
                  {!promo && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {['SHINDE10','WELCOME50','FREEDEL','DINOSAUR'].map(c => (
                        <button key={c} onClick={() => setCode(c)} className="text-[10px] uppercase tracking-widest text-brand-gold/70 border border-brand-gold/20 rounded-full px-2 py-1 hover:border-brand-gold hover:text-brand-gold">{c}</button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="h-px bg-brand-gold/15"/>

                {/* Summary */}
                <div className="space-y-3 text-sm">
                  <Row label={`Subtotal (${totals.itemCount} items)`} value={`₹${totals.subtotal}`}/>
                  {totals.discount > 0 && <Row label={`Discount ${promo?.code ? `· ${promo.code}` : ''}`} value={`– ₹${totals.discount}`} accent/>}
                  <Row label="GST (5%)" value={`₹${totals.tax}`}/>
                  <Row label={mode === 'pickup' ? 'Pickup' : 'Delivery'} value={totals.delivery === 0 ? 'FREE' : `₹${totals.delivery}`} accent={totals.delivery === 0}/>
                </div>

                <div className="h-px bg-brand-gold/15"/>

                <div className="flex items-baseline justify-between">
                  <span className="text-brand-cream/70 text-sm">Total to pay</span>
                  <span className="font-display text-3xl text-gold-gradient">₹{totals.total}</span>
                </div>

                <div className="space-y-3">
                  <a href={BRAND.order.zomato} target="_blank" rel="noreferrer" className="btn-gold w-full justify-center !py-4">
                    Order on Zomato
                  </a>
                  <a href={BRAND.order.swiggy} target="_blank" rel="noreferrer" className="btn-ghost-gold w-full justify-center !py-4">
                    Order on Swiggy
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs text-brand-cream/40 justify-center">
                  <ChefHat className="w-3.5 h-3.5"/> Fresh, wok-fired the moment you order.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-brand-cream/60">{label}</span>
      <span className={accent ? 'text-brand-gold font-semibold' : 'text-brand-cream'}>{value}</span>
    </div>
  )
}

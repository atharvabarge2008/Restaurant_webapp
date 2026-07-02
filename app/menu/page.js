'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Minus, ShoppingBag, X, ChevronRight, Flame } from 'lucide-react'
import Link from 'next/link'
import { MENU_CATEGORIES, FULL_MENU, IMG, BRAND } from '@/lib/site-data'
import { useCart } from '@/lib/cart-context'
import { toast } from 'sonner'

export default function MenuPage() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [portionOpen, setPortionOpen] = useState(null) // dish object when has halfPrice
  const { items, addItem, totals } = useCart()

  const cats = ['All', ...MENU_CATEGORIES]

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return FULL_MENU.filter(d => {
      if (cat !== 'All' && d.category !== cat) return false
      if (!term) return true
      return (d.name.toLowerCase().includes(term) || (d.marathi||'').toLowerCase().includes(term) || (d.description||'').toLowerCase().includes(term) || d.category.toLowerCase().includes(term))
    })
  }, [cat, q])

  const handleAdd = (dish, portion = 'full') => {
    addItem(dish, portion)
    toast.success(`${dish.name} added · ${portion === 'half' ? 'Half' : 'Full'} plate`)
    setPortionOpen(null)
  }

  const onAddClick = (dish) => {
    if (dish.halfPrice) setPortionOpen(dish)
    else handleAdd(dish, 'full')
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Compact hero */}
      <section className="relative h-[42svh] min-h-[300px] flex items-end overflow-hidden">
        <img src={IMG.friedRice1} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-brand-ink"/>
        <div className="relative container mx-auto px-6 pb-8 pt-24">
          <div className="text-brand-red-light text-2xl md:text-4xl opacity-40 mb-2" style={{ fontFamily: 'var(--font-chinese)' }}>मेनू</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="font-display text-4xl md:text-7xl leading-none">The <em className="text-gold-gradient not-italic">Menu</em></h1>
            <div className="flex flex-wrap gap-3">
              <a href={BRAND.order.zomato} target="_blank" rel="noreferrer" className="btn-ghost-gold !py-2.5 !text-[11px]">Zomato</a>
              <a href={BRAND.order.swiggy} target="_blank" rel="noreferrer" className="btn-ghost-gold !py-2.5 !text-[11px]">Swiggy</a>
            </div>
          </div>
        </div>
      </section>

      {/* Search + filter sticky bar */}
      <section className="sticky top-[76px] md:top-[80px] z-30 bg-brand-ink/95 backdrop-blur-xl border-y border-brand-gold/15">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/70"/>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search dishes, e.g. lollipop, dinosaur, momos..."
                className="w-full h-11 pl-11 pr-10 rounded-full bg-black/40 border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm text-brand-cream placeholder:text-brand-cream/40 transition"
              />
              {q && <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-cream/60 hover:text-brand-gold"><X className="w-4 h-4"/></button>}
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 lg:mx-0 px-4 lg:px-0">
              {cats.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`shrink-0 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.25em] font-semibold transition ${cat === c ? 'bg-gold-gradient text-brand-ink shadow-gold' : 'border border-brand-gold/30 text-brand-cream/70 hover:text-brand-gold hover:border-brand-gold'}`}
                >{c}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu grid */}
      <section className="py-10 bg-brand-ink">
        <div className="container mx-auto px-4 md:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-brand-cream/60">
              <Search className="w-10 h-10 mx-auto mb-4 text-brand-gold/50"/>
              <p>No dishes match &ldquo;{q}&rdquo;. Try another search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
              <AnimatePresence mode="popLayout">
                {filtered.map((d, i) => {
                  const inCart = items.filter(it => it.id === d.id).reduce((s, it) => s + it.qty, 0)
                  return (
                    <motion.div
                      key={d.id}
                      layout
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: (i%6)*0.03 }}
                      className="group flex gap-4 md:gap-5 p-4 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/40 bg-brand-ink-soft/60 hover:bg-brand-ink-soft transition-all"
                    >
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0">
                        <img src={d.image} alt={d.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                        {d.tag && <div className="absolute top-1.5 left-1.5 bg-brand-red text-brand-gold text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full">{d.tag}</div>}
                        {inCart > 0 && <div className="absolute bottom-1.5 right-1.5 min-w-[24px] h-6 px-2 rounded-full bg-brand-gold text-brand-ink text-[11px] font-bold flex items-center justify-center">{inCart}</div>}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div className="min-w-0">
                            <div className="text-brand-red-light/60 text-xs mb-0.5 truncate" style={{ fontFamily: 'var(--font-chinese)' }}>{d.marathi}</div>
                            <h3 className="font-display text-base md:text-xl text-brand-cream leading-tight">{d.name}</h3>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-display text-lg md:text-xl text-gold-gradient">₹{d.price}</div>
                            {d.halfPrice && <div className="text-[9px] uppercase tracking-widest text-brand-cream/50">Half ₹{d.halfPrice}</div>}
                          </div>
                        </div>
                        <p className="text-xs md:text-sm text-brand-cream/60 leading-relaxed line-clamp-2 mb-3">{d.description}</p>
                        <div className="mt-auto flex items-center justify-between gap-3">
                          <div className="text-[9px] uppercase tracking-[0.3em] text-brand-gold/60 flex items-center gap-2">
                            {d.category}
                            {(d.tag === 'Spicy' || d.name.toLowerCase().includes('schezwan')) && <Flame className="w-3 h-3 text-brand-red-light"/>}
                          </div>
                          <button onClick={() => onAddClick(d)} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand-gold text-brand-ink text-[11px] font-bold uppercase tracking-widest hover:brightness-110 transition shadow-gold">
                            <Plus className="w-3.5 h-3.5"/> Add
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Sticky cart bar */}
      <AnimatePresence>
        {totals.itemCount > 0 && (
          <motion.div
            initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-md"
          >
            <Link href="/cart" className="flex items-center justify-between glass gold-border rounded-full pl-4 pr-2 py-2 shadow-gold">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-gold-gradient text-brand-ink flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4"/>
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full bg-brand-red text-brand-gold text-[10px] font-bold flex items-center justify-center px-1.5 ring-2 ring-brand-ink">{totals.itemCount}</span>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-brand-gold/70">{totals.itemCount} items</div>
                  <div className="font-semibold text-brand-cream">₹{totals.subtotal}</div>
                </div>
              </div>
              <span className="btn-gold !py-2.5 !px-5 !text-[11px]">View Cart <ChevronRight className="w-4 h-4"/></span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portion selector modal */}
      <AnimatePresence>
        {portionOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-end md:items-center justify-center p-4"
            onClick={() => setPortionOpen(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-brand-ink-soft gold-border rounded-3xl overflow-hidden"
            >
              <div className="relative h-40">
                <img src={portionOpen.image} alt={portionOpen.name} className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink-soft to-transparent"/>
                <button onClick={() => setPortionOpen(null)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-brand-red text-brand-gold flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>
              <div className="p-6">
                <div className="text-brand-red-light/60 text-xs mb-1" style={{ fontFamily: 'var(--font-chinese)' }}>{portionOpen.marathi}</div>
                <h3 className="font-display text-2xl text-brand-cream mb-1">{portionOpen.name}</h3>
                <p className="text-sm text-brand-cream/60 mb-6">Choose portion size:</p>
                <div className="space-y-3">
                  <button onClick={() => handleAdd(portionOpen, 'full')} className="w-full flex items-center justify-between p-4 rounded-xl border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/5 transition text-left">
                    <div>
                      <div className="font-semibold text-brand-cream">Full Plate</div>
                      <div className="text-xs text-brand-cream/50">Regular family portion</div>
                    </div>
                    <div className="font-display text-xl text-gold-gradient">₹{portionOpen.price}</div>
                  </button>
                  <button onClick={() => handleAdd(portionOpen, 'half')} className="w-full flex items-center justify-between p-4 rounded-xl border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/5 transition text-left">
                    <div>
                      <div className="font-semibold text-brand-cream">Half Plate</div>
                      <div className="text-xs text-brand-cream/50">Smaller portion, same taste</div>
                    </div>
                    <div className="font-display text-xl text-gold-gradient">₹{portionOpen.halfPrice}</div>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`.no-scrollbar::-webkit-scrollbar{display:none} .no-scrollbar{scrollbar-width:none}`}</style>
    </div>
  )
}

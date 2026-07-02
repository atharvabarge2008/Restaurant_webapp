'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MENU_CATEGORIES, FULL_MENU, IMG, BRAND } from '@/lib/site-data'

export default function MenuPage() {
  const [cat, setCat] = useState('All')
  const cats = ['All', ...MENU_CATEGORIES]
  const items = useMemo(() => cat === 'All' ? FULL_MENU : FULL_MENU.filter(d => d.category === cat), [cat])

  return (
    <div className="min-h-screen">
      {/* Page hero */}
      <section className="relative h-[60svh] min-h-[440px] flex items-center overflow-hidden">
        <img src={IMG.friedRice1} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-brand-ink"/>
        <div className="relative container mx-auto px-6 pt-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-brand-red-light text-3xl md:text-5xl opacity-40 mb-4" style={{ fontFamily: 'var(--font-chinese)' }}>मेनू</div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-brand-gold/60"/>
              <span className="uppercase tracking-[0.4em] text-[10px] text-brand-gold font-semibold">Menu · Full Price List</span>
              <span className="h-px w-10 bg-brand-gold/60"/>
            </div>
            <h1 className="font-display text-5xl md:text-8xl leading-none">
              The <em className="text-gold-gradient not-italic">Menu</em>
            </h1>
            <p className="font-serif italic text-lg md:text-xl text-brand-cream/70 mt-6 max-w-2xl mx-auto">Every dish is wok-fired to order. Half & full plates. Family-size portions. Honest Satara prices.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={BRAND.order.zomato} target="_blank" rel="noreferrer" className="btn-gold">Order on Zomato</a>
              <a href={BRAND.order.swiggy} target="_blank" rel="noreferrer" className="btn-ghost-gold">Order on Swiggy</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-14 bg-brand-ink border-t border-brand-gold/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.25em] font-semibold transition-all ${cat === c ? 'bg-gold-gradient text-brand-ink shadow-gold' : 'border border-brand-gold/30 text-brand-cream/70 hover:text-brand-gold hover:border-brand-gold'}`}
              >{c}</button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {items.map((d, i) => (
                <motion.div
                  key={d.id}
                  layout
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: (i%6)*0.04 }}
                  className="group flex gap-5 md:gap-6 p-4 md:p-6 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/40 hover:bg-brand-ink-soft transition-all"
                >
                  <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden shrink-0">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    {d.tag && <div className="absolute top-2 left-2 bg-brand-red text-brand-gold text-[9px] uppercase tracking-widest px-2 py-1 rounded-full">{d.tag}</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <div className="text-brand-red-light/60 text-sm mb-0.5 truncate" style={{ fontFamily: 'var(--font-chinese)' }}>{d.marathi}</div>
                        <h3 className="font-display text-lg md:text-2xl text-brand-cream leading-tight">{d.name}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display text-xl md:text-2xl text-gold-gradient">₹{d.price}</div>
                        {d.halfPrice && <div className="text-[10px] uppercase tracking-widest text-brand-cream/50 mt-0.5">Half ₹{d.halfPrice}</div>}
                      </div>
                    </div>
                    <p className="text-sm text-brand-cream/60 leading-relaxed line-clamp-3">{d.description}</p>
                    <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-brand-gold/70">{d.category}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-16 text-center">
            <p className="text-brand-cream/50 text-sm mb-6">टाईमपास एकदाच दिला जाईल · Complimentary timepass served once with every order</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={BRAND.order.zomato} target="_blank" rel="noreferrer" className="btn-gold">Order on Zomato</a>
              <a href={BRAND.order.swiggy} target="_blank" rel="noreferrer" className="btn-ghost-gold">Order on Swiggy</a>
              <a href={BRAND.order.call} className="btn-ghost-gold">Call {BRAND.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

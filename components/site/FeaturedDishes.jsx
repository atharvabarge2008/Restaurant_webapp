'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { FEATURED_DISHES, BRAND } from '@/lib/site-data'
import { TiltCard, RevealImage } from '@/components/premium/PremiumFX'

export default function FeaturedDishes() {
  return (
    <section id="featured" className="relative py-24 md:py-32 bg-brand-ink overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30"/>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-red/10 blur-[120px]"/>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]"/>

      <div className="relative container mx-auto px-6">
        <SectionHeading eyebrow="Featured Menu" chinese="招牌菜" title="Bestsellers that made ShindeShahi famous" subtitle="The dishes locals travel across Satara for — handcrafted with our house-secret masala." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1400 }}>
          {FEATURED_DISHES.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className="group relative"
            >
              <TiltCard max={7} className="card-tilt">
                <div data-cursor="hover" data-cursor-label="Order" className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-brand-ink-soft shadow-elevated card-shine">
                  <RevealImage src={d.image} alt={d.name} aspect="4/5" className="absolute inset-0 w-full h-full" delay={i * 0.05}/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"/>
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"/>

                  {d.tag && (
                    <div className="absolute top-5 left-5 glass-light rounded-full px-3 py-1.5">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold">{d.tag}</span>
                    </div>
                  )}
                  <div className="absolute top-5 right-5 px-3 min-w-[52px] h-11 rounded-full bg-brand-gold text-brand-ink flex items-center justify-center font-display text-base font-bold shadow-gold">₹{d.price}</div>

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <div className="text-brand-gold/60 text-xs tracking-widest mb-1" style={{ fontFamily: 'var(--font-chinese)' }}>{d.marathi}</div>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-brand-cream mb-2 leading-tight">{d.name}</h3>
                    <p className="text-brand-cream/70 text-sm leading-relaxed line-clamp-2 mb-4">{d.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/80">{d.category}{d.halfPrice ? ` · Half ₹${d.halfPrice}` : ''}</span>
                      <Link href="/menu" className="inline-flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                        Order <ArrowRight className="w-3.5 h-3.5"/>
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <Link href="/menu" className="btn-ghost-gold">See Full Menu</Link>
          <a href={BRAND.order.zomato} target="_blank" rel="noreferrer" className="btn-gold">Order on Zomato</a>
        </div>
      </div>
    </section>
  )
}

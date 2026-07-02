'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { FEATURED_DISHES } from '@/lib/site-data'

export default function FeaturedDishes() {
  return (
    <section id="featured" className="relative py-24 md:py-32 bg-brand-ink overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30"/>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-red/10 blur-[120px]"/>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]"/>

      <div className="relative container mx-auto px-6">
        <SectionHeading eyebrow="Featured Menu" chinese="招牌菜" title="Signature dishes, born from decades of mastery" subtitle="Each dish is a small ceremony — an offering to the palate and to the tradition that shaped it." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_DISHES.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-brand-ink-soft">
                <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"/>
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>

                {/* Tag */}
                <div className="absolute top-5 left-5 glass-light rounded-full px-3 py-1.5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold">{d.tag}</span>
                </div>
                <div className="absolute top-5 right-5 w-14 h-14 rounded-full bg-brand-gold text-brand-ink flex items-center justify-center font-display text-lg font-bold shadow-gold">
                  ${d.price}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <div className="font-chinese text-brand-gold/60 text-sm tracking-widest mb-1">{d.chinese}</div>
                  <h3 className="font-display text-2xl md:text-3xl text-brand-cream mb-2 leading-tight">{d.name}</h3>
                  <p className="text-brand-cream/70 text-sm leading-relaxed line-clamp-2 mb-4">{d.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/80">{d.category}</span>
                    <Link href="/menu" className="inline-flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                      View <ArrowRight className="w-3.5 h-3.5"/>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link href="/menu" className="btn-ghost-gold">Explore The Full Menu</Link>
        </div>
      </div>
    </section>
  )
}

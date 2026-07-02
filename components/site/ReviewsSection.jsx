'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { REVIEWS } from '@/lib/site-data'

export default function ReviewsSection() {
  return (
    <section id="reviews" className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-chinese text-brand-red/5 text-[40rem] leading-none pointer-events-none select-none">爱</div>

      <div className="relative container mx-auto px-6">
        <SectionHeading eyebrow="Guest Voices" chinese="贵宾之声" title="Praised by critics, adored by guests" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i%3)*0.1 }}
              className="relative p-8 rounded-2xl glass hover:gold-border transition-all duration-500 group"
            >
              <Quote className="absolute -top-4 left-6 w-10 h-10 text-brand-gold fill-brand-gold"/>
              <div className="flex gap-1 mb-5 mt-2">
                {[...Array(r.rating)].map((_, k) => <Star key={k} className="w-4 h-4 fill-brand-gold text-brand-gold"/>)}
              </div>
              <p className="font-serif italic text-lg text-brand-cream/85 leading-relaxed mb-8">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-4 pt-6 border-t border-brand-gold/15">
                <div className="w-11 h-11 rounded-full bg-red-gradient flex items-center justify-center text-brand-gold font-semibold text-sm">{r.initials}</div>
                <div>
                  <div className="text-brand-cream text-sm font-medium">{r.name}</div>
                  <div className="text-brand-cream/50 text-xs">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

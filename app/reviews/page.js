'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { REVIEWS, IMG } from '@/lib/site-data'

export default function ReviewsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[50svh] min-h-[380px] flex items-center overflow-hidden">
        <img src={IMG.duck2} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-brand-ink"/>
        <div className="relative container mx-auto px-6 pt-24 text-center">
          <div className="font-chinese text-brand-red-light text-5xl md:text-7xl opacity-40 mb-4">评价</div>
          <h1 className="font-display text-5xl md:text-8xl leading-none">Guest <em className="text-gold-gradient not-italic">Reviews</em></h1>
          <p className="font-serif italic text-lg text-brand-cream/70 mt-6 max-w-2xl mx-auto">A few kind words from those who have shared our table.</p>
        </div>
      </section>

      <section className="py-24 bg-brand-ink">
        <div className="container mx-auto px-6">
          {/* Overall rating */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="glass gold-border rounded-3xl p-10 md:p-14 max-w-4xl mx-auto mb-16 text-center"
          >
            <div className="font-display text-7xl md:text-8xl text-gold-gradient mb-4">4.9</div>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-brand-gold text-brand-gold"/>)}
            </div>
            <div className="text-brand-cream/70">Based on <span className="text-brand-gold">3,247</span> guest reviews</div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-10 pt-10 border-t border-brand-gold/15">
              {[{k:'Food',v:'4.9'},{k:'Service',v:'4.9'},{k:'Ambiance',v:'5.0'},{k:'Wine',v:'4.8'},{k:'Value',v:'4.7'},{k:'Overall',v:'4.9'}].map(x => (
                <div key={x.k}>
                  <div className="font-display text-2xl text-brand-gold">{x.v}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-brand-cream/50 mt-1">{x.k}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* All reviews */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {REVIEWS.map((r, i) => (
              <motion.div key={r.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: (i%2)*0.1 }}
                className="relative p-8 rounded-2xl glass hover:gold-border transition"
              >
                <Quote className="absolute -top-4 left-6 w-10 h-10 text-brand-gold fill-brand-gold"/>
                <div className="flex gap-1 mb-5">{[...Array(r.rating)].map((_,k) => <Star key={k} className="w-4 h-4 fill-brand-gold text-brand-gold"/>)}</div>
                <p className="font-serif italic text-lg text-brand-cream/85 leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-brand-gold/15">
                  <div className="w-11 h-11 rounded-full bg-red-gradient flex items-center justify-center text-brand-gold font-semibold text-sm">{r.initials}</div>
                  <div>
                    <div className="text-brand-cream font-medium">{r.name}</div>
                    <div className="text-brand-cream/50 text-xs">{r.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

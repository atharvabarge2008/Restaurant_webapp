'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { IMG, BRAND } from '@/lib/site-data'

const signatures = [
  {
    title: 'The Chicken Dinosaur Rice',
    marathi: 'चिकन डायनोसॉर राईस',
    image: IMG.friedRice1,
    text: 'A Shindesh legend. Fragrant fried rice piled with juicy chicken chunks, crunchy veggies, and our house dinosaur gravy — a fire-red sauce simmered for hours. This is the dish people cross Satara for.',
    stats: [{ v: '₹270', l: 'Full plate' }, { v: '#1', l: 'Bestseller' }, { v: '3K+', l: 'Fans ordered' }]
  },
  {
    title: 'The Chicken Lollipop',
    marathi: 'चिकन लॉलीपॉप',
    image: IMG.lollipop,
    text: 'Marinated in our secret spice paste, fried to a golden crackle, tossed in fiery red glaze. Whether you want them fry, masala, gravy or crispy — we’ve mastered every version. Regulars order 6 pieces. Twice.',
    stats: [{ v: '5★', l: 'Reviewed' }, { v: '₹190', l: '6 pieces' }, { v: '5', l: 'Preparations' }]
  }
]

export default function SignatureDishes() {
  return (
    <section className="relative py-24 md:py-32 bg-brand-ink">
      <div className="container mx-auto px-6 space-y-28">
        {signatures.map((s, i) => (
          <div key={s.title} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: i%2 ? 60 : -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-red group">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent"/>
              </div>
              {/* Watermark */}
              <div className={`absolute ${i%2 ? '-left-6' : '-right-6'} top-8 font-chinese text-brand-gold/10 text-[9rem] leading-none pointer-events-none`}>王</div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 left-6 md:left-10 glass gold-border rounded-2xl px-6 py-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-1">Signature</div>
                <div className="text-brand-gold text-lg" style={{ fontFamily: 'var(--font-chinese)' }}>{s.marathi}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, delay: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-brand-gold/60"/>
                <span className="uppercase tracking-[0.35em] text-[10px] font-semibold text-brand-gold">Signature 0{i+1}</span>
              </div>
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-cream leading-[1.05] mb-4">{s.title}</h3>
              <div className="text-brand-red-light/80 text-xl mb-6" style={{ fontFamily: 'var(--font-chinese)' }}>{s.marathi}</div>
              <p className="font-serif italic text-lg md:text-xl text-brand-cream/70 leading-relaxed mb-10">{s.text}</p>

              <div className="grid grid-cols-3 gap-6 mb-10">
                {s.stats.map(st => (
                  <div key={st.l} className="border-l border-brand-gold/30 pl-4">
                    <div className="font-display text-3xl md:text-4xl text-gold-gradient">{st.v}</div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-brand-cream/50 mt-1">{st.l}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={BRAND.order.zomato} target="_blank" rel="noreferrer" className="btn-gold">Order Now</a>
                <Link href="/menu" className="inline-flex items-center gap-3 text-brand-gold hover:gap-4 transition-all px-4 py-3">
                  <span className="uppercase text-xs tracking-[0.3em]">See Full Menu</span>
                  <ArrowUpRight className="w-5 h-5"/>
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}

'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { IMG } from '@/lib/site-data'

const signatures = [
  {
    title: 'The Peking Duck Ceremony',
    chinese: '北京烤鸭仪式',
    image: IMG.duck1,
    text: 'A ritual 24 hours in the making. Air-dried, lacquered with maltose and roasted over lychee wood in our 900°C oven. Sliced tableside with theatrical precision — 108 delicate pieces, exactly.',
    stats: [{ v: '24h', l: 'Preparation' }, { v: '108', l: 'Precision Cuts' }, { v: '900°C', l: 'Lychee Fire' }]
  },
  {
    title: 'The Dim Sum Cart',
    chinese: '点心车传统',
    image: IMG.dimsum1,
    text: 'Our dim sum masters hand-fold over 1,200 dumplings each morning. Har gow with translucent skins so thin they reveal the tiger prawns within. Xiao long bao filled with 18 folds of tradition.',
    stats: [{ v: '1200+', l: 'Daily Hand-Folded' }, { v: '18', l: 'Signature Folds' }, { v: '9', l: 'Rare Varieties' }]
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
              {/* Chinese watermark */}
              <div className={`absolute ${i%2 ? '-left-8' : '-right-8'} top-8 font-chinese text-brand-gold/10 text-[10rem] leading-none pointer-events-none`}>{s.chinese[0]}</div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 left-6 md:left-10 glass gold-border rounded-2xl px-6 py-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-1">Est. Signature</div>
                <div className="font-chinese text-brand-gold text-lg">{s.chinese}</div>
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
              <div className="font-chinese text-brand-red-light/70 text-xl mb-6">{s.chinese}</div>
              <p className="font-serif italic text-lg md:text-xl text-brand-cream/70 leading-relaxed mb-10">{s.text}</p>

              <div className="grid grid-cols-3 gap-6 mb-10">
                {s.stats.map(st => (
                  <div key={st.l} className="border-l border-brand-gold/30 pl-4">
                    <div className="font-display text-3xl md:text-4xl text-gold-gradient">{st.v}</div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-brand-cream/50 mt-1">{st.l}</div>
                  </div>
                ))}
              </div>

              <Link href="/menu" className="inline-flex items-center gap-3 text-brand-gold hover:gap-4 transition-all">
                <span className="uppercase text-xs tracking-[0.3em]">Discover The Menu</span>
                <ArrowUpRight className="w-5 h-5"/>
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}

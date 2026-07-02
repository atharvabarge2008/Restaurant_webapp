'use client'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/premium/PremiumFX'
import { Star, MessageCircle, Bike, ChefHat } from 'lucide-react'

const stats = [
  { icon: Star, value: 4.5, decimals: 1, suffix: '\u2605',   label: 'Google rating',       sub: '855 verified reviews' },
  { icon: MessageCircle, value: 3247, suffix: '+',           label: 'Happy diners',        sub: 'Across Zomato & Swiggy' },
  { icon: ChefHat, value: 50, suffix: '+',                    label: 'Dishes on menu',      sub: 'Veg & Non-veg varieties' },
  { icon: Bike, value: 30, suffix: ' min',                    label: 'Avg. delivery',        sub: 'Free above \u20b9499' }
]

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-brand-ink border-y border-brand-gold/10 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20"/>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[300px] rounded-full bg-brand-red/10 blur-[120px]"/>
      <div className="relative container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative p-6 md:p-8 rounded-3xl glass hover:gold-border transition-all"
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-red/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
              <div className="relative flex flex-col gap-3">
                <div className="w-11 h-11 rounded-xl bg-gold-gradient text-brand-ink flex items-center justify-center shadow-gold">
                  <s.icon className="w-5 h-5"/>
                </div>
                <div className="font-display text-4xl md:text-5xl text-gold-gradient tracking-tight leading-none">
                  <AnimatedCounter value={s.value} decimals={s.decimals || 0} suffix={s.suffix}/>
                </div>
                <div>
                  <div className="text-brand-cream font-semibold">{s.label}</div>
                  <div className="text-xs text-brand-cream/50 mt-0.5">{s.sub}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

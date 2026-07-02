'use client'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { WHY_US, IMG } from '@/lib/site-data'
import { Crown, Flame, Fish, Coffee } from 'lucide-react'

const iconMap = { crown: Crown, flame: Flame, fish: Fish, tea: Coffee }

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src={IMG.lantern2} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/70"/>
      </div>

      <div className="relative container mx-auto px-6">
        <SectionHeading eyebrow="Why Choose Us" chinese="匠心之道" title="Four pillars of a legendary kitchen" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US.map((item, i) => {
            const Icon = iconMap[item.icon] || Crown
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative p-8 rounded-2xl glass hover:gold-border transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand-red/20 blur-3xl group-hover:bg-brand-gold/20 transition-colors duration-700"/>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center mb-6 shadow-gold">
                    <Icon className="w-6 h-6 text-brand-ink"/>
                  </div>
                  <div className="font-chinese text-brand-red-light text-sm tracking-widest mb-2 opacity-70">{item.chinese}</div>
                  <h3 className="font-display text-2xl text-brand-cream mb-3 leading-tight">{item.title}</h3>
                  <p className="text-brand-cream/60 text-sm leading-relaxed">{item.desc}</p>
                  <div className="mt-6 text-4xl font-display text-brand-gold/20">0{i+1}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

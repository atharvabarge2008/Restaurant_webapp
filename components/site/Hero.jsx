'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Star, ChevronDown, Phone } from 'lucide-react'
import { IMG, BRAND } from '@/lib/site-data'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-brand-ink">
      {/* Bg image */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={IMG.hero} alt="Chicken lollipop and indo-chinese food" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black"/>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/40"/>
      </motion.div>

      {/* Ornamental chinese char */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.09, scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute -right-8 top-[10%] font-chinese text-brand-red-light text-[22rem] leading-none select-none pointer-events-none hidden md:block"
      >王</motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-brand-gold"/>
          <span className="uppercase tracking-[0.4em] text-[10px] font-semibold text-brand-gold">Satara · Guruwar Peth · Since 2015</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35 }}
          className="font-display text-[3rem] sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.95] max-w-6xl"
        >
          <span className="block text-brand-cream">Taste That</span>
          <span className="block text-gold-gradient italic">Wins Hearts.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.65 }}
          className="mt-4 flex items-baseline gap-3 flex-wrap"
        >
          <div className="font-display text-brand-red-light text-2xl md:text-3xl italic">{BRAND.fullName}</div>
          <div className="text-brand-cream/50 text-lg">·</div>
          <div className="text-brand-cream/60 text-base md:text-lg font-medium" style={{ fontFamily: 'var(--font-chinese)' }}>{BRAND.marathi}</div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-8 max-w-xl text-brand-cream/75 font-serif text-xl md:text-2xl leading-relaxed italic"
        >
          Satara’s most-loved Indo-Chinese kitchen. Home of the legendary Chicken Dinosaur Rice, Manchow Soup and our house-secret ShindeShahi Special.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href={BRAND.order.zomato} target="_blank" rel="noreferrer" className="btn-gold">Order on Zomato</a>
          <a href={BRAND.order.swiggy} target="_blank" rel="noreferrer" className="btn-ghost-gold">Order on Swiggy</a>
          <a href={BRAND.order.call} className="btn-ghost-gold"><Phone className="w-3.5 h-3.5"/> Call to Order</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-brand-gold">
              {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-brand-gold' : 'fill-brand-gold/60'}`}/>)}
            </div>
            <span className="text-brand-cream font-semibold">4.5</span>
            <span className="text-brand-cream/60 text-sm">Google · 855 reviews</span>
          </div>
          <div className="h-6 w-px bg-brand-gold/30 hidden md:block"/>
          <div className="text-xs text-brand-cream/60 uppercase tracking-[0.3em]">Zomato 4.6★ · Swiggy 4.2★ · 3K+ Ratings</div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-gold/70 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Explore Menu</span>
        <ChevronDown className="w-4 h-4 animate-bounce"/>
      </motion.div>
    </section>
  )
}

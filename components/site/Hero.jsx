'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Star, ChevronDown } from 'lucide-react'
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
        <img src={IMG.hero} alt="Chinese fine dining interior with red lanterns" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"/>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40"/>
      </motion.div>

      {/* Ornamental chinese char */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.08, scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute -right-16 top-1/4 font-chinese text-brand-red-light text-[26rem] leading-none select-none pointer-events-none hidden md:block"
      >龙</motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-brand-gold"/>
          <span className="uppercase tracking-[0.5em] text-[10px] font-semibold text-brand-gold">Est. 1984 · Two Michelin Stars</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35 }}
          className="font-display text-[3.2rem] sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.95] max-w-5xl"
        >
          <span className="block text-brand-cream">A Taste of the</span>
          <span className="block text-gold-gradient italic">Middle Kingdom</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.65 }}
          className="font-chinese text-brand-red-light text-2xl md:text-3xl mt-4 opacity-80"
        >{BRAND.chinese} · {BRAND.name}</motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-8 max-w-xl text-brand-cream/75 font-serif text-xl md:text-2xl leading-relaxed italic"
        >
          Four decades of masterful cooking. A quiet dining room. A wok that has fed presidents, poets and the occasional dragon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link href="/reservation" className="btn-gold">Reserve Your Table</Link>
          <Link href="/menu" className="btn-ghost-gold">Explore Menu</Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
          className="mt-14 flex items-center gap-6"
        >
          <div className="flex items-center gap-1 text-brand-gold">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-gold"/>)}
          </div>
          <div className="text-xs text-brand-cream/60 uppercase tracking-[0.3em]">Michelin · World's 50 Best · Zagat</div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-gold/70 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce"/>
      </motion.div>
    </section>
  )
}

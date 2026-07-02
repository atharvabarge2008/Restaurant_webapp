'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Star, ChevronDown, Phone, ArrowRight } from 'lucide-react'
import { IMG, BRAND } from '@/lib/site-data'
import { Magnetic, Steam, FloatingIngredients, AnimatedCounter } from '@/components/premium/PremiumFX'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-brand-ink">
      {/* BG image */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={IMG.hero} alt="Chicken lollipop and indo-chinese food" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/78 via-black/45 to-black"/>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/40"/>
      </motion.div>

      {/* Floating ingredients */}
      <FloatingIngredients count={9}/>

      {/* Steam plumes */}
      <Steam className="absolute right-[8%] top-[35%] w-24 h-48" delay={0}/>
      <Steam className="absolute right-[22%] top-[45%] w-16 h-40" delay={1.4}/>
      <Steam className="absolute right-[36%] top-[30%] w-20 h-40 hidden md:block" delay={0.7}/>

      {/* Ornamental char */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.09, scale: 1 }} transition={{ duration: 2, ease: 'easeOut', delay: 1 }}
        className="absolute -right-6 top-[8%] font-chinese text-brand-red-light text-[22rem] leading-none select-none pointer-events-none hidden md:block"
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

        {/* Reveal-style headline */}
        <div className="max-w-6xl">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.35 }}
              className="font-display font-bold text-[3rem] sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.92] text-brand-cream"
            >Taste That</motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.5 }}
              className="font-display font-bold italic text-[3rem] sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.92] text-gold-gradient"
            >Wins Hearts.</motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.75 }}
          className="mt-6 flex items-baseline gap-3 flex-wrap"
        >
          <div className="font-display text-brand-red-light text-2xl md:text-3xl italic">{BRAND.fullName}</div>
          <div className="text-brand-cream/50 text-lg">·</div>
          <div className="text-brand-cream/60 text-base md:text-lg font-medium" style={{ fontFamily: 'var(--font-chinese)' }}>{BRAND.marathi}</div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-8 max-w-xl text-brand-cream/75 font-serif text-xl md:text-2xl leading-relaxed italic"
        >
          Satara’s most-loved Indo-Chinese kitchen. Home of the legendary Chicken Dinosaur Rice, Manchow Soup and our house-secret ShindeShahi Special.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.35}>
            <Link href="/menu" data-cursor="hover" data-cursor-label="Order" className="btn-gold !px-8 !py-4 !text-[13px]">
              Order Online <ArrowRight className="w-4 h-4"/>
            </Link>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Link href="/reservation" data-cursor="hover" className="btn-ghost-gold !px-8 !py-4 !text-[13px]">Book a Table</Link>
          </Magnetic>
          <a href={BRAND.order.call} className="text-brand-cream/70 hover:text-brand-gold text-sm inline-flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-ink transition"><Phone className="w-3.5 h-3.5"/></span>
            Or call now
          </a>
        </motion.div>

        {/* Rating strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.25 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 text-brand-gold">
              {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-brand-gold' : 'fill-brand-gold/60'}`}/>)}
            </div>
            <div className="font-display text-2xl text-gold-gradient"><AnimatedCounter value={4.5} decimals={1}/></div>
            <div className="text-brand-cream/60 text-xs">
              Google · <AnimatedCounter value={855}/>+ reviews
            </div>
          </div>
          <div className="h-6 w-px bg-brand-gold/25 hidden md:block"/>
          <div className="text-[10px] text-brand-cream/60 uppercase tracking-[0.35em]">Zomato 4.6★ · Swiggy 4.2★ · <AnimatedCounter value={3247}/>+ ratings</div>
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

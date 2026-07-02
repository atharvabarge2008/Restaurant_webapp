'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { IMG } from '@/lib/site-data'

export default function LoadingScreen() {
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem('ss_seen_loader')
    if (seen) { setShow(false); return }

    let raf
    const start = performance.now()
    const duration = 1100
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration)
      setProgress(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        sessionStorage.setItem('ss_seen_loader', '1')
        setTimeout(() => setShow(false), 500)
      }
    }
    raf = requestAnimationFrame(tick)
    document.documentElement.style.overflow = 'hidden'
    return () => { cancelAnimationFrame(raf); document.documentElement.style.overflow = '' }
  }, [])

  useEffect(() => { if (!show) document.documentElement.style.overflow = '' }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.9, 0, 0.1, 1] }}
          className="fixed inset-0 z-[10000] bg-brand-ink overflow-hidden"
        >
          {/* Red radial glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1.6, opacity: 0.6 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-red/30 blur-[120px]"
          />
          {/* Grid */}
          <div className="absolute inset-0 dot-grid opacity-30"/>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
              className="relative mb-10"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-red ring-4 ring-brand-gold/40">
                <Image 
                  src={IMG.logo} 
                  alt="Shindeshahi Chinese Restro Logo" 
                  fill
                  className="object-cover"
                  priority
                />
                <motion.span
                  animate={{ scale: [1, 1.25, 1.25], opacity: [0.6, 0, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className="absolute inset-0 rounded-full ring-2 ring-brand-gold"
                />
              </div>
            </motion.div>

            {/* Wordmark reveal */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.3 }}
                className="font-display text-4xl md:text-6xl text-gold-gradient tracking-tight"
              >Shindeshahi</motion.div>
            </div>
            <div className="overflow-hidden mt-2">
              <motion.div
                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-brand-cream/60"
              >Chinese Resto · Satara</motion.div>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-14 w-64 md:w-80"
            >
              <div className="h-[2px] bg-brand-gold/15 overflow-hidden rounded-full">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                  className="h-full bg-gold-gradient"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-brand-cream/50">
                <span>Warming the wok…</span>
                <span className="text-brand-gold font-semibold">{progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Sweep out overlay */}
          <motion.div
            initial={{ y: '100%' }} animate={{ y: progress >= 100 ? '0%' : '100%' }}
            transition={{ duration: 0.6, ease: [0.9, 0, 0.1, 1] }}
            className="absolute inset-0 bg-black"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

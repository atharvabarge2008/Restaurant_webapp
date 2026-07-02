'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { BRAND } from '@/lib/site-data'

export default function FloatingButtons() {
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <>
            <motion.a
              key="whatsapp"
              href={BRAND.order.whatsapp} target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="group flex items-center gap-3 pl-2 pr-4 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
            >
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><MessageCircle className="w-5 h-5"/></span>
              <span className="text-sm font-semibold">WhatsApp Order</span>
            </motion.a>
            <motion.a
              key="call"
              href={BRAND.order.call}
              initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className="group flex items-center gap-3 pl-2 pr-4 h-14 rounded-full bg-brand-red text-white shadow-red hover:brightness-110 transition-all"
            >
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Phone className="w-5 h-5"/></span>
              <span className="text-sm font-semibold">{BRAND.phone}</span>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(v => !v)}
        initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative w-16 h-16 rounded-full bg-gold-gradient text-brand-ink shadow-gold flex items-center justify-center overflow-hidden"
        aria-label={open ? 'Close menu' : 'Order menu'}
      >
        <span className="absolute inset-0 bg-gold-gradient animate-glow"/>
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} className="relative">
              <X className="w-7 h-7"/>
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} className="relative">
              <MessageCircle className="w-7 h-7"/>
            </motion.span>
          )}
        </AnimatePresence>
        <span className="absolute inset-0 rounded-full ring-2 ring-brand-gold/50 animate-ping" style={{ animationDuration: '2.4s' }}/>
      </motion.button>
    </div>
  )
}

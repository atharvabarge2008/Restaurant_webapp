'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { GALLERY, IMG } from '@/lib/site-data'
import { RevealImage } from '@/components/premium/PremiumFX'

export default function GalleryPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen">
      <section className="relative h-[50svh] min-h-[380px] flex items-center overflow-hidden">
        <img src={IMG.lantern1} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-brand-ink"/>
        <div className="relative container mx-auto px-6 pt-24 text-center">
          <div className="text-brand-red-light text-4xl md:text-6xl opacity-40 mb-4" style={{ fontFamily: 'var(--font-chinese)' }}>चित्रदालन</div>
          <h1 className="font-display font-bold text-5xl md:text-8xl leading-none">Our <em className="text-gold-gradient not-italic">Gallery</em></h1>
          <p className="font-serif italic text-lg text-brand-cream/70 mt-6 max-w-2xl mx-auto">A visual love letter to our kitchen, our dining rooms and the guests who fill them.</p>
        </div>
      </section>

      <section className="py-20 bg-brand-ink">
        <div className="container mx-auto px-4 md:px-6">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {GALLERY.map((src, i) => (
              <motion.button
                key={i}
                onClick={() => setSelected(src)}
                whileHover={{ scale: 0.985 }}
                data-cursor="hover" data-cursor-label="View"
                className="relative block w-full break-inside-avoid overflow-hidden rounded-2xl group shadow-elevated"
              >
                <RevealImage src={src} alt={`Gallery ${i+1}`} aspect={i%3===0 ? '3/4' : i%3===1 ? '1/1' : '4/5'} delay={(i%12)*0.03}/>
                <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/40 transition-colors flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-gold-gradient text-brand-ink flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all"><ZoomIn className="w-4 h-4"/></div>
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-brand-gold/0 group-hover:ring-brand-gold/60 rounded-2xl transition-all"/>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button onClick={() => setSelected(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full glass gold-border flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-ink transition">
              <X className="w-5 h-5"/>
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              src={selected} alt="Preview" className="max-w-[92vw] max-h-[90vh] object-contain rounded-2xl shadow-gold"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

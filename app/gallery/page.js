'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { GALLERY, IMG } from '@/lib/site-data'

export default function GalleryPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen">
      <section className="relative h-[50svh] min-h-[380px] flex items-center overflow-hidden">
        <img src={IMG.lantern1} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-brand-ink"/>
        <div className="relative container mx-auto px-6 pt-24 text-center">
          <div className="font-chinese text-brand-red-light text-5xl md:text-7xl opacity-40 mb-4">画廊</div>
          <h1 className="font-display text-5xl md:text-8xl leading-none">Our <em className="text-gold-gradient not-italic">Gallery</em></h1>
          <p className="font-serif italic text-lg text-brand-cream/70 mt-6 max-w-2xl mx-auto">A visual love letter to our kitchen, our dining rooms and the guests who fill them.</p>
        </div>
      </section>

      <section className="py-20 bg-brand-ink">
        <div className="container mx-auto px-6">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {GALLERY.map((src, i) => (
              <motion.button
                key={i}
                onClick={() => setSelected(src)}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i%8)*0.03 }}
                className="relative block w-full break-inside-avoid overflow-hidden rounded-xl group"
              >
                <img src={src} alt={`Gallery ${i+1}`} className={`w-full ${i%3===0 ? 'aspect-[3/4]' : i%3===1 ? 'aspect-square' : 'aspect-[4/5]'} object-cover transition-transform duration-[1500ms] group-hover:scale-110`}/>
                <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/30 transition-colors"/>
                <div className="absolute inset-0 ring-1 ring-inset ring-brand-gold/0 group-hover:ring-brand-gold/60 transition-all"/>
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
              transition={{ duration: 0.3 }}
              src={selected} alt="Preview" className="max-w-[92vw] max-h-[90vh] object-contain rounded-2xl shadow-gold"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

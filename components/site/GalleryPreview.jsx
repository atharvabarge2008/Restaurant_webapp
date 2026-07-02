'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { GALLERY } from '@/lib/site-data'

export default function GalleryPreview() {
  const items = GALLERY.slice(0, 8)
  return (
    <section className="relative py-24 md:py-32 bg-brand-ink overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-brand-gold/60"/>
              <span className="uppercase tracking-[0.35em] text-[10px] font-semibold text-brand-gold">Gallery</span>
            </div>
            <div className="font-chinese text-brand-red-light/40 text-4xl mb-2">画廊</div>
            <h2 className="font-display text-4xl md:text-6xl text-brand-cream max-w-xl leading-[1.05]">Moments made <em className="text-gold-gradient not-italic">unforgettable</em></h2>
          </div>
          <Link href="/gallery" className="btn-ghost-gold self-start">View Full Gallery <ArrowUpRight className="w-3.5 h-3.5"/></Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i%4)*0.06 }}
              className={`relative overflow-hidden rounded-xl group ${i % 5 === 0 ? 'row-span-2 aspect-[3/5]' : 'aspect-square'}`}
            >
              <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"/>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"/>
              <div className="absolute inset-0 ring-1 ring-inset ring-brand-gold/0 group-hover:ring-brand-gold/50 transition-all"/>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

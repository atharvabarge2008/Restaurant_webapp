'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { REVIEWS } from '@/lib/site-data'
import SectionHeading from './SectionHeading'

export default function ReviewsSection() {
  // Duplicate reviews for seamless marquee
  const row1 = [...REVIEWS.slice(0, 5), ...REVIEWS.slice(0, 5)]
  const row2 = [...REVIEWS.slice(4, 9), ...REVIEWS.slice(4, 9)]

  return (
    <section id="reviews" className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-chinese text-brand-red/5 text-[40rem] leading-none pointer-events-none select-none">爱</div>

      <div className="relative">
        <div className="container mx-auto px-6">
          <SectionHeading eyebrow="Guest Voices" chinese="प्रेमाने लिहिले" title="Praised by Satara, adored by locals" subtitle="Real Google reviews from real ShindeShahi fans." />
        </div>

        {/* Marquee row 1 */}
        <div className="relative group mask-fade">
          <div className="flex gap-5 animate-marquee" style={{ width: 'max-content' }}>
            {row1.map((r, i) => <ReviewCard key={`a${i}`} r={r}/>)}
          </div>
        </div>

        {/* Marquee row 2 (reverse) */}
        <div className="relative group mask-fade mt-5">
          <div className="flex gap-5 animate-marquee-reverse" style={{ width: 'max-content' }}>
            {row2.map((r, i) => <ReviewCard key={`b${i}`} r={r}/>)}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .mask-fade { mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%); }
        .animate-marquee { animation: marqueeL 60s linear infinite; }
        .animate-marquee-reverse { animation: marqueeR 55s linear infinite; }
        .group:hover .animate-marquee, .group:hover .animate-marquee-reverse { animation-play-state: paused; }
        @keyframes marqueeL { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  )
}

function ReviewCard({ r }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative p-6 md:p-7 rounded-2xl glass hover:gold-border transition-colors w-[340px] md:w-[400px] shrink-0"
      data-cursor="hover"
    >
      <Quote className="absolute -top-3 left-6 w-8 h-8 text-brand-gold fill-brand-gold"/>
      <div className="flex gap-1 mb-4 mt-1">
        {[...Array(r.rating)].map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold"/>)}
      </div>
      <p className="font-serif italic text-brand-cream/85 leading-relaxed text-[15px] mb-6 line-clamp-5">&ldquo;{r.text}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4 border-t border-brand-gold/15">
        <div className="w-10 h-10 rounded-full bg-red-gradient flex items-center justify-center text-brand-gold font-semibold text-xs">{r.initials}</div>
        <div className="min-w-0">
          <div className="text-brand-cream text-sm font-medium truncate">{r.name}</div>
          <div className="text-brand-cream/50 text-xs truncate">{r.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

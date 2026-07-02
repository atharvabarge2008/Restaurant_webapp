'use client'
import { MapPin, Phone, Mail, Navigation } from 'lucide-react'
import { BRAND } from '@/lib/site-data'
import { motion } from 'framer-motion'

export default function MapSection() {
  const query = encodeURIComponent(BRAND.address)
  const embed = `https://www.google.com/maps?q=${query}&output=embed`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <section className="relative bg-brand-ink">
      <div className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-brand-gold/60"/>
              <span className="uppercase tracking-[0.35em] text-[10px] font-semibold text-brand-gold">Find Us</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">Visit us in Guruwar Peth, Satara</h2>
            <p className="font-serif italic text-lg text-brand-cream/70 leading-relaxed mb-8">
              Located in the heart of Satara, Shindeshahi has been serving authentic Indo-Chinese cuisine to locals and visitors for years.
            </p>

            <div className="space-y-5">
              <Row icon={MapPin} label="Address" value={BRAND.address}/>
              <Row icon={Phone} label="Phone" value={BRAND.phone} href={`tel:${BRAND.phone}`}/>
            </div>

            <a href={directions} target="_blank" rel="noreferrer" className="btn-gold mt-8 self-start">
              <Navigation className="w-3.5 h-3.5"/> Get Directions
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-3 relative rounded-3xl overflow-hidden gold-border shadow-red min-h-[420px]"
          >
            <iframe
              src={embed}
              className="absolute inset-0 w-full h-full grayscale-[30%] contrast-125"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Golden Dragon location map"
            />
            <div className="absolute inset-0 pointer-events-none ring-1 ring-brand-gold/20"/>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Row({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl glass flex items-center justify-center shrink-0 text-brand-gold"><Icon className="w-4 h-4"/></div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-1">{label}</div>
        <div className="text-brand-cream">{value}</div>
      </div>
    </div>
  )
  return href ? <a href={href} className="block hover:opacity-80 transition">{inner}</a> : inner
}

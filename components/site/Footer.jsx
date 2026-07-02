'use client'
import Link from 'next/link'
import { Instagram, Facebook, MapPin, Phone, Mail, Clock, Utensils } from 'lucide-react'
import { BRAND, NAV_LINKS } from '@/lib/site-data'

const MARQUEE_WORDS = ['Chicken Dinosaur', 'ShindeShahi Special', 'Manchow Soup', 'Chicken Lollipop', 'Hakka Noodles', 'Schezwan Rice', 'Momos', 'Manchurian', 'Peri Peri', 'Triple Rice']

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-brand-gold/15 overflow-hidden">
      {/* Marquee word strip */}
      <div className="relative border-b border-brand-gold/15 overflow-hidden py-8">
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: 'marqueeText 40s linear infinite', width: 'max-content' }}>
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="font-display italic text-5xl md:text-7xl text-brand-cream/10 hover:text-brand-gold transition-colors">{w} <span className="text-brand-red/40">•</span></span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 dot-grid opacity-30"/>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand-red/10 blur-[120px]"/>
      <div className="relative container mx-auto px-6 pt-20 pb-8">

        {/* Order CTA */}
        <div className="mb-16 glass gold-border rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-6 items-center relative overflow-hidden">
          <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl"/>
          <div className="relative">
            <div className="text-brand-gold text-xs tracking-[0.4em] uppercase mb-3">Hungry?</div>
            <h3 className="font-display font-bold text-3xl md:text-5xl leading-[1.05]">Get ShindeShahi delivered <span className="text-gold-gradient italic">hot to your door.</span></h3>
          </div>
          <div className="relative flex flex-wrap gap-3 md:justify-end">
            <a href={BRAND.order.zomato} target="_blank" rel="noreferrer" data-cursor="hover" className="btn-gold">Order on Zomato</a>
            <a href={BRAND.order.swiggy} target="_blank" rel="noreferrer" data-cursor="hover" className="btn-ghost-gold">Order on Swiggy</a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-red-gradient flex items-center justify-center shadow-red">
                <span className="font-chinese text-brand-gold text-xl font-black">王</span>
              </div>
              <div>
                <div className="font-display text-2xl text-gold-gradient">{BRAND.name}</div>
                <div className="text-[10px] text-brand-cream/50 tracking-[0.3em] uppercase">Chinese Resto · Satara</div>
              </div>
            </div>
            <p className="text-brand-cream/60 leading-relaxed text-sm max-w-sm mb-4" style={{ fontFamily: 'var(--font-chinese)' }}>{BRAND.marathi}</p>
            <p className="text-brand-cream/60 leading-relaxed text-sm max-w-sm mb-6">Satara’s most-loved Indo-Chinese kitchen. Home of Chicken Dinosaur Rice, Manchow Soup and the legendary ShindeShahi Special.</p>
            <div className="flex gap-3">
              <a href={BRAND.socials.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass hover:bg-brand-gold hover:text-brand-ink transition flex items-center justify-center text-brand-gold" aria-label="Instagram"><Instagram className="w-4 h-4"/></a>
              <a href={BRAND.socials.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass hover:bg-brand-gold hover:text-brand-ink transition flex items-center justify-center text-brand-gold" aria-label="Facebook"><Facebook className="w-4 h-4"/></a>
              <a href={BRAND.socials.zomato} target="_blank" rel="noreferrer" className="px-3 h-10 rounded-full glass hover:bg-brand-red hover:text-white transition flex items-center justify-center text-[11px] font-bold text-brand-gold">zomato</a>
              <a href={BRAND.socials.swiggy} target="_blank" rel="noreferrer" className="px-3 h-10 rounded-full glass hover:bg-orange-500 hover:text-white transition flex items-center justify-center text-[11px] font-bold text-brand-gold">Swiggy</a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-brand-gold font-semibold uppercase text-xs tracking-[0.28em] mb-5">Explore</div>
            <ul className="space-y-3">
              {NAV_LINKS.map(l => <li key={l.href}><Link href={l.href} className="text-brand-cream/70 hover:text-brand-gold transition text-sm">{l.label}</Link></li>)}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-brand-gold font-semibold uppercase text-xs tracking-[0.28em] mb-5">Contact</div>
            <ul className="space-y-4 text-sm text-brand-cream/70">
              <li className="flex gap-3"><MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5"/><span>{BRAND.address}</span></li>
              <li className="flex gap-3"><Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5"/><a href={`tel:${BRAND.phone}`}>{BRAND.phone}</a></li>
              <li className="flex gap-3"><Utensils className="w-4 h-4 text-brand-gold shrink-0 mt-0.5"/><a href={BRAND.order.whatsapp} target="_blank" rel="noreferrer">WhatsApp Order</a></li>
              <li className="flex gap-3"><Mail className="w-4 h-4 text-brand-gold shrink-0 mt-0.5"/><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-brand-gold font-semibold uppercase text-xs tracking-[0.28em] mb-5">Hours</div>
            <ul className="space-y-4 text-sm text-brand-cream/70">
              {BRAND.hours.map(h => (
                <li key={h.day} className="flex gap-3">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5"/>
                  <div>
                    <div className="text-brand-cream">{h.day}</div>
                    <div className="text-brand-cream/50">{h.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Big brand mark */}
        <div className="relative mb-10 select-none pointer-events-none">
          <div className="font-display font-black text-[18vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-brand-gold/25 via-brand-gold/5 to-transparent tracking-tighter text-center">SHINDESHAHI</div>
        </div>

        <div className="pt-8 border-t border-brand-gold/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-cream/40">© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved. Made with ❤️ in Satara.</p>
          <div className="flex items-center gap-6 text-xs text-brand-cream/40">
            <Link href="#" className="hover:text-brand-gold">Privacy</Link>
            <Link href="#" className="hover:text-brand-gold">Terms</Link>
            <Link href="#" className="hover:text-brand-gold">Delivery Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

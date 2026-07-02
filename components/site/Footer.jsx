'use client'
import Link from 'next/link'
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { BRAND, NAV_LINKS } from '@/lib/site-data'

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-brand-gold/15 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40"/>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand-red/10 blur-[120px]"/>
      <div className="relative container mx-auto px-6 pt-20 pb-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-red-gradient flex items-center justify-center shadow-red">
                <span className="font-chinese text-brand-gold text-xl font-black">龙</span>
              </div>
              <div>
                <div className="font-display text-2xl text-gold-gradient">{BRAND.name}</div>
                <div className="font-chinese text-xs text-brand-cream/50 tracking-[0.4em]">{BRAND.chinese}</div>
              </div>
            </div>
            <p className="text-brand-cream/60 leading-relaxed text-sm max-w-sm mb-6">A love letter to the great Chinese kitchens — masterful technique, rare ingredients, and an unwavering respect for tradition.</p>
            <div className="flex gap-3">
              {[{i:Instagram,h:BRAND.socials.instagram},{i:Facebook,h:BRAND.socials.facebook},{i:Twitter,h:BRAND.socials.twitter},{i:Youtube,h:BRAND.socials.youtube}].map((s, idx) => (
                <a key={idx} href={s.h} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass hover:bg-brand-gold hover:text-brand-ink transition flex items-center justify-center text-brand-gold">
                  <s.i className="w-4 h-4"/>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <div className="text-brand-gold font-semibold uppercase text-xs tracking-[0.28em] mb-5">Explore</div>
            <ul className="space-y-3">
              {NAV_LINKS.map(l => (
                <li key={l.href}><Link href={l.href} className="text-brand-cream/70 hover:text-brand-gold transition text-sm">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <div className="text-brand-gold font-semibold uppercase text-xs tracking-[0.28em] mb-5">Contact</div>
            <ul className="space-y-4 text-sm text-brand-cream/70">
              <li className="flex gap-3"><MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5"/><span>{BRAND.address}</span></li>
              <li className="flex gap-3"><Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5"/><a href={`tel:${BRAND.phone}`}>{BRAND.phone}</a></li>
              <li className="flex gap-3"><Mail className="w-4 h-4 text-brand-gold shrink-0 mt-0.5"/><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
            </ul>
          </div>

          {/* Hours */}
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

        <div className="pt-8 border-t border-brand-gold/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-cream/40">© {new Date().getFullYear()} {BRAND.name} {BRAND.chinese}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-brand-cream/40">
            <Link href="#" className="hover:text-brand-gold">Privacy</Link>
            <Link href="#" className="hover:text-brand-gold">Terms</Link>
            <Link href="#" className="hover:text-brand-gold">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

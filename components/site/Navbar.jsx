'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ShoppingBag } from 'lucide-react'
import { NAV_LINKS, BRAND, IMG } from '@/lib/site-data'
import { useCart } from '@/lib/cart-context'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { totals } = useCart()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2,0.7,0.2,1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-2.5' : 'py-4'}`}
      >
        <div className={`mx-auto max-w-[1400px] px-4 md:px-6`}>
          <div className={`glass rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between transition-all duration-500 ${scrolled ? 'gold-border shadow-gold' : ''}`}>
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden shadow-red ring-1 ring-brand-gold/40 group-hover:ring-brand-gold transition">
                <Image 
                  src={IMG.logo} 
                  alt="Shinde Shahi Chinese Restro Logo" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="leading-tight">
                <div className="font-display text-lg md:text-xl tracking-wide text-gold-gradient">{BRAND.name}</div>
                <div className="text-[9px] md:text-[10px] text-brand-cream/60 -mt-0.5 tracking-[0.28em] uppercase">Chinese Resto · Satara</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => {
                const active = pathname === link.href
                return (
                  <Link key={link.href} href={link.href} className="relative px-4 py-2 text-xs uppercase tracking-[0.22em] font-medium text-brand-cream/85 hover:text-brand-gold transition-colors">
                    {link.label}
                    {active && (
                      <motion.span layoutId="nav-underline" className="absolute left-3 right-3 bottom-1 h-px bg-gold-gradient" />
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a href={`tel:${BRAND.phone.replace(/[^+\d]/g,'')}`} className="hidden xl:inline-flex items-center gap-2 text-xs text-brand-cream/80 hover:text-brand-gold transition">
                <Phone className="w-3.5 h-3.5"/> {BRAND.phone}
              </a>
              <Link href="/cart" className="relative w-10 h-10 rounded-full glass hover:gold-border flex items-center justify-center text-brand-gold transition group" aria-label="Cart">
                <ShoppingBag className="w-4 h-4"/>
                <AnimatePresence>
                  {totals.itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full bg-brand-red text-brand-gold text-[10px] font-bold flex items-center justify-center px-1.5 ring-2 ring-brand-ink"
                    >{totals.itemCount}</motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <Link href="/menu" className="hidden md:inline-flex btn-gold !py-2.5 !px-5 !text-[11px]">Order Online</Link>
              <button onClick={() => setOpen(v => !v)} className="lg:hidden text-brand-gold p-2" aria-label="Toggle menu">
                {open ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" onClick={() => setOpen(false)}/>
            <motion.div
              initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative pt-28 px-6"
            >
              <nav className="flex flex-col gap-2 max-w-md mx-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href}
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={link.href} className="block py-4 border-b border-brand-gold/15 font-display text-3xl text-brand-cream hover:text-brand-gold transition">
                      <span className="text-brand-gold/50 text-sm mr-3">0{i+1}</span>{link.label}
                    </Link>
                  </motion.div>
                ))}
                <a href={BRAND.order.zomato} target="_blank" rel="noreferrer" className="btn-gold mt-6 justify-center">Order Online</a>
                <a href={BRAND.order.call} className="btn-ghost-gold mt-2 justify-center">Call {BRAND.phone}</a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

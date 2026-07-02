'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ExternalLink, ShoppingBag } from 'lucide-react'
import { BRAND, IMG } from '@/lib/site-data'
import { useCart } from '@/lib/cart-context'

export default function CheckoutPage() {
  const router = useRouter()
  const { clear } = useCart()

  useEffect(() => {
    // Clear cart when user lands here since we're redirecting to external platforms
    clear()
  }, [clear])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full glass gold-border rounded-3xl p-8 md:p-12 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold-gradient flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-brand-ink"/>
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl mb-4">Order Online</h1>
        <p className="text-brand-cream/70 text-lg mb-8 leading-relaxed">
          We partner with Zomato and Swiggy for online orders and delivery. Please place your order through one of these platforms:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <a
            href={BRAND.order.zomato}
            target="_blank"
            rel="noreferrer"
            className="glass gold-border rounded-2xl p-6 hover:bg-brand-gold/10 transition group"
          >
            <div className="text-2xl font-bold text-brand-gold mb-2">Zomato</div>
            <div className="text-sm text-brand-cream/60 mb-4">Order food delivery & takeaway</div>
            <div className="inline-flex items-center gap-2 text-brand-gold text-sm font-semibold group-hover:gap-3 transition-all">
              Order Now <ExternalLink className="w-4 h-4"/>
            </div>
          </a>

          <a
            href={BRAND.order.swiggy}
            target="_blank"
            rel="noreferrer"
            className="glass gold-border rounded-2xl p-6 hover:bg-brand-gold/10 transition group"
          >
            <div className="text-2xl font-bold text-brand-gold mb-2">Swiggy</div>
            <div className="text-sm text-brand-cream/60 mb-4">Order food delivery & takeaway</div>
            <div className="inline-flex items-center gap-2 text-brand-gold text-sm font-semibold group-hover:gap-3 transition-all">
              Order Now <ExternalLink className="w-4 h-4"/>
            </div>
          </a>
        </div>

        <div className="border-t border-brand-gold/20 pt-6">
          <p className="text-brand-cream/60 text-sm mb-4">Or call us directly for dine-in reservations</p>
          <a href={BRAND.order.call} className="btn-ghost-gold">
            Call {BRAND.phone}
          </a>
        </div>
      </motion.div>
    </div>
  )
}

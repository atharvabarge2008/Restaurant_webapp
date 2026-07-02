'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Copy, Truck, Store, MapPin, Phone, Clock, ChefHat, Share2, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { BRAND } from '@/lib/site-data'

export default function OrderConfirmationPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    fetch(`/api/orders/${id}`).then(r => r.json()).then(d => {
      if (d.error) setErr(d.error); else setOrder(d.order)
    }).catch(() => setErr('Failed to load order'))
  }, [id])

  if (err) return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <div className="text-brand-red-light mb-4">{err}</div>
        <Link href="/menu" className="btn-gold">Back to menu</Link>
      </div>
    </div>
  )
  if (!order) return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="animate-pulse text-brand-gold/70">Loading your order...</div>
    </div>
  )

  const isDelivery = order.mode === 'delivery'
  const shareText = `Just ordered from ShindeShahi Chinese Resto! Order #${order.shortId} — ${BRAND.order.zomato}`

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 bg-brand-ink">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Success header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 240, damping: 15, delay: 0.15 }}
            className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"/>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <CheckCircle2 className="w-12 h-12 text-white"/>
            </div>
          </motion.div>
          <div className="text-brand-red-light text-2xl md:text-3xl opacity-50 mb-2" style={{ fontFamily: 'var(--font-chinese)' }}>धन्यवाद!</div>
          <h1 className="font-display text-4xl md:text-6xl mb-3">Order <em className="text-gold-gradient not-italic">Confirmed!</em></h1>
          <p className="text-brand-cream/70 max-w-lg mx-auto">Thank you for your order, {order.customer?.name?.split(' ')[0]}. Our chef is warming up the wok as we speak.</p>
        </motion.div>

        {/* Order id card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass gold-border rounded-3xl p-6 md:p-8 mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-1">Order Number</div>
              <div className="flex items-center gap-3">
                <div className="font-display text-3xl md:text-4xl text-gold-gradient">#{order.shortId}</div>
                <button onClick={() => { navigator.clipboard.writeText(order.shortId); toast.success('Order ID copied') }} className="text-brand-cream/60 hover:text-brand-gold"><Copy className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/order/${order.id}/track`} className="btn-gold !py-2.5 !px-5 !text-[11px]">Track Order</Link>
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer" className="btn-ghost-gold !py-2.5 !px-5 !text-[11px]"><Share2 className="w-3 h-3"/> Share</a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <InfoTile icon={isDelivery ? Truck : Store} label={isDelivery ? 'Delivery' : 'Pickup'} value={isDelivery ? order.customer?.address : BRAND.addressShort}/>
            <InfoTile icon={Clock} label="Estimated Time" value={`${order.etaMinutes || 30} min`}/>
            <InfoTile icon={Phone} label="Contact" value={order.customer?.phone}/>
          </div>
        </motion.div>

        {/* Items */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-6 md:p-8 mb-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <ChefHat className="w-5 h-5 text-brand-gold"/>
            <h3 className="font-display text-xl">Your Order</h3>
          </div>
          <div className="space-y-3">
            {order.items?.map((it, i) => (
              <div key={i} className="flex items-center gap-4 py-2">
                <img src={it.image} alt={it.name} className="w-14 h-14 rounded-xl object-cover"/>
                <div className="flex-1 min-w-0">
                  <div className="text-brand-red-light/60 text-[10px]" style={{ fontFamily: 'var(--font-chinese)' }}>{it.marathi}</div>
                  <div className="font-medium text-brand-cream truncate">{it.name}</div>
                  <div className="text-xs text-brand-cream/50">{it.portion} · x{it.qty}</div>
                </div>
                <div className="text-brand-cream font-semibold shrink-0">₹{it.price * it.qty}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-brand-gold/15 space-y-2 text-sm">
            <SumRow label="Subtotal" value={`₹${order.totals?.subtotal || 0}`}/>
            {order.totals?.discount > 0 && <SumRow label={`Discount · ${order.promo?.code}`} value={`– ₹${order.totals.discount}`} accent/>}
            <SumRow label="GST" value={`₹${order.totals?.tax || 0}`}/>
            <SumRow label={isDelivery ? 'Delivery' : 'Pickup'} value={order.totals?.delivery === 0 ? 'FREE' : `₹${order.totals?.delivery || 0}`}/>
            <div className="pt-3 border-t border-brand-gold/15 flex items-baseline justify-between">
              <span className="text-brand-cream/70">Total paid</span>
              <span className="font-display text-2xl text-gold-gradient">₹{order.totals?.total}</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-brand-gold/70 text-right">via {order.payment?.method?.toUpperCase()}</div>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href={`/order/${order.id}/track`} className="btn-gold">Track My Order</Link>
          <a href={BRAND.order.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost-gold"><MessageCircle className="w-4 h-4"/> WhatsApp Us</a>
          <Link href="/menu" className="btn-ghost-gold">Order Again</Link>
        </div>
      </div>
    </div>
  )
}

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/30 border border-brand-gold/10">
      <div className="w-10 h-10 rounded-xl bg-gold-gradient text-brand-ink flex items-center justify-center shrink-0"><Icon className="w-4 h-4"/></div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-0.5">{label}</div>
        <div className="text-sm text-brand-cream truncate">{value}</div>
      </div>
    </div>
  )
}
function SumRow({ label, value, accent }) {
  return <div className="flex items-center justify-between"><span className="text-brand-cream/60">{label}</span><span className={accent ? 'text-brand-gold font-semibold' : 'text-brand-cream'}>{value}</span></div>
}

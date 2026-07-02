'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChefHat, Package, Truck, Home, Phone, MapPin, Clock, Bike, RefreshCw, Copy } from 'lucide-react'
import { BRAND } from '@/lib/site-data'
import { toast } from 'sonner'

const STAGE_ICONS = {
  placed: Package,
  confirmed: CheckCircle2,
  preparing: ChefHat,
  ready: Package,
  out: Bike,
  delivered: Home
}

export default function TrackOrderPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [err, setErr] = useState(null)

  const load = () => {
    fetch(`/api/orders/${id}`).then(r => r.json()).then(d => {
      if (d.error) setErr(d.error); else setOrder(d.order)
    }).catch(() => setErr('Failed to load order'))
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 6000)
    return () => clearInterval(t)
  }, [id]) // eslint-disable-line

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
      <div className="animate-pulse text-brand-gold/70">Loading order...</div>
    </div>
  )

  const currentIdx = order.flow.indexOf(order.currentStage)
  const isDelivery = order.mode === 'delivery'
  const isDone = order.currentStage === 'delivered'

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 bg-brand-ink">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-1">Order Tracking</div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl md:text-5xl text-gold-gradient">#{order.shortId}</h1>
              <button onClick={() => { navigator.clipboard.writeText(order.shortId); toast.success('Order ID copied') }} className="text-brand-cream/60 hover:text-brand-gold"><Copy className="w-4 h-4"/></button>
            </div>
          </div>
          <button onClick={load} className="btn-ghost-gold !py-2.5 !px-5 !text-[11px]"><RefreshCw className="w-3.5 h-3.5"/> Refresh</button>
        </div>

        {/* Big status card */}
        <motion.div key={order.currentStage}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass gold-border rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl"/>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-brand-red/10 blur-3xl"/>
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <motion.div
                animate={{ rotate: isDone ? 0 : [0, 5, -5, 0] }}
                transition={{ duration: 1.5, repeat: isDone ? 0 : Infinity }}
                className="w-20 h-20 rounded-2xl bg-gold-gradient text-brand-ink flex items-center justify-center shadow-gold"
              >
                {(() => { const Icon = STAGE_ICONS[order.currentStage] || Package; return <Icon className="w-10 h-10"/> })()}
              </motion.div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-1">Current status</div>
                <div className="font-display text-3xl md:text-4xl text-brand-cream">{order.stages?.find(s => s.key === order.currentStage)?.label}</div>
                <div className="text-sm text-brand-cream/60 mt-1">{order.stages?.find(s => s.key === order.currentStage)?.desc}</div>
              </div>
            </div>
            {!isDone && (
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-1">Estimated</div>
                <div className="font-display text-3xl text-gold-gradient">{order.etaMinutes || 30} min</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="glass rounded-3xl p-6 md:p-10 mb-8">
          <h3 className="font-display text-xl mb-8">Journey to your plate</h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-brand-gold/15"/>
            <motion.div
              key={order.currentStage}
              initial={{ height: 0 }} animate={{ height: `${(currentIdx / (order.flow.length - 1)) * 100}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute left-6 top-4 w-px bg-gradient-to-b from-brand-gold to-brand-gold/40"
            />

            <div className="space-y-6">
              {order.flow.map((key, idx) => {
                const stage = order.stages?.find(s => s.key === key)
                const isActive = idx === currentIdx
                const isDoneStage = idx < currentIdx
                const Icon = STAGE_ICONS[key] || Package
                return (
                  <motion.div key={key}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}
                    className="relative flex items-start gap-5"
                  >
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-gold-gradient text-brand-ink shadow-gold ring-4 ring-brand-gold/30' :
                      isDoneStage ? 'bg-emerald-500 text-white' :
                      'bg-brand-ink-soft text-brand-cream/40 border border-brand-gold/15'
                    }`}>
                      <Icon className="w-5 h-5"/>
                      {isActive && <motion.div className="absolute inset-0 rounded-full ring-2 ring-brand-gold" animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 1.8, repeat: Infinity }}/>}
                    </div>
                    <div className="flex-1 pt-1.5">
                      <div className={`font-semibold ${isActive ? 'text-brand-gold text-lg' : isDoneStage ? 'text-brand-cream' : 'text-brand-cream/40'}`}>{stage?.label}</div>
                      <div className={`text-sm ${isActive || isDoneStage ? 'text-brand-cream/60' : 'text-brand-cream/30'}`}>{stage?.desc}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-3">{isDelivery ? 'Delivering to' : 'Pickup from'}</div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5"/>
              <div>
                <div className="text-brand-cream">{isDelivery ? order.customer?.address : BRAND.address}</div>
                {order.customer?.landmark && <div className="text-xs text-brand-cream/50 mt-1">Landmark: {order.customer.landmark}</div>}
              </div>
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-3">Need help?</div>
            <div className="space-y-2">
              <a href={BRAND.order.call} className="flex items-center gap-3 text-brand-cream hover:text-brand-gold"><Phone className="w-4 h-4 text-brand-gold"/>{BRAND.phone}</a>
              <a href={BRAND.order.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-brand-cream hover:text-brand-gold"><Phone className="w-4 h-4 text-emerald-500"/>WhatsApp us</a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/menu" className="btn-ghost-gold">Order Again</Link>
        </div>
      </div>
    </div>
  )
}

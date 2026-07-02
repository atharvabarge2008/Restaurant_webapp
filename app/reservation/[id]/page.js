'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Calendar, Clock, Users, PartyPopper, Home as HomeIcon, MapPin, Phone, MessageCircle, Copy, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { BRAND } from '@/lib/site-data'

export default function ReservationConfirmationPage() {
  const { id } = useParams()
  const [r, setR] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    fetch(`/api/reservations/${id}`).then(res => res.json()).then(d => {
      if (d.error) setErr(d.error); else setR(d.reservation)
    }).catch(() => setErr('Failed to load'))
  }, [id])

  if (err) return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <div className="text-brand-red-light mb-4">{err}</div>
        <Link href="/reservation" className="btn-gold">Try again</Link>
      </div>
    </div>
  )
  if (!r) return <div className="min-h-screen flex items-center justify-center pt-24"><div className="animate-pulse text-brand-gold/70">Loading...</div></div>

  const bookingId = r.id.slice(0, 8).toUpperCase()
  const shareText = `I just booked a table at Shindesh Chinese Resto in Satara for ${r.date} at ${r.time}!`

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 bg-brand-ink">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 240, damping: 15, delay: 0.15 }}
            className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"/>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <CheckCircle2 className="w-12 h-12 text-white"/>
            </div>
          </motion.div>
          <div className="text-brand-red-light text-2xl md:text-3xl opacity-50 mb-2" style={{ fontFamily: 'var(--font-chinese)' }}>टेबल बुक झाली!</div>
          <h1 className="font-display text-4xl md:text-6xl mb-3">Table <em className="text-gold-gradient not-italic">Reserved!</em></h1>
          <p className="text-brand-cream/70 max-w-lg mx-auto">See you soon, {r.name?.split(' ')[0]}. We'll send a confirmation call within 30 minutes.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass gold-border rounded-3xl p-6 md:p-10 mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-1">Booking ID</div>
              <div className="flex items-center gap-3">
                <div className="font-display text-3xl md:text-4xl text-gold-gradient">#{bookingId}</div>
                <button onClick={() => { navigator.clipboard.writeText(bookingId); toast.success('Copied') }} className="text-brand-cream/60 hover:text-brand-gold"><Copy className="w-4 h-4"/></button>
              </div>
            </div>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer" className="btn-ghost-gold !py-2.5 !px-5 !text-[11px]"><Share2 className="w-3 h-3"/> Share</a>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <InfoTile icon={Calendar} label="Date" value={new Date(r.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}/>
            <InfoTile icon={Clock} label="Time" value={r.time}/>
            <InfoTile icon={Users} label="Guests" value={`${r.guests} ${Number(r.guests) === 1 ? 'guest' : 'guests'}`}/>
            <InfoTile icon={PartyPopper} label="Occasion" value={String(r.occasion).charAt(0).toUpperCase() + String(r.occasion).slice(1)}/>
            <InfoTile icon={HomeIcon} label="Seating" value={String(r.table).charAt(0).toUpperCase() + String(r.table).slice(1)}/>
            <InfoTile icon={Phone} label="Contact" value={r.phone}/>
          </div>

          {r.notes && (
            <div className="mt-6 p-4 rounded-2xl bg-brand-gold/5 border border-brand-gold/20">
              <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-1">Your note</div>
              <div className="text-sm text-brand-cream italic">&ldquo;{r.notes}&rdquo;</div>
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-6 md:p-8">
          <h3 className="font-display text-xl mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-brand-gold"/> How to reach us</h3>
          <div className="text-brand-cream/80 mb-4">{BRAND.address}</div>
          <div className="flex flex-wrap gap-3">
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BRAND.address)}`} target="_blank" rel="noreferrer" className="btn-gold">Get Directions</a>
            <a href={BRAND.order.call} className="btn-ghost-gold"><Phone className="w-4 h-4"/> Call Us</a>
            <a href={BRAND.order.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost-gold"><MessageCircle className="w-4 h-4"/> WhatsApp</a>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-xs text-brand-cream/50">
          Need to modify or cancel? Call <a href={BRAND.order.call} className="text-brand-gold">{BRAND.phone}</a> at least 2 hours before your booking.
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
        <div className="text-sm text-brand-cream">{value}</div>
      </div>
    </div>
  )
}

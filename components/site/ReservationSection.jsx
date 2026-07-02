'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Clock, Users, User, Phone, Mail, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { IMG } from '@/lib/site-data'

export default function ReservationSection({ compact = false }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '19:00', guests: '2', notes: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.date) { toast.error('Please fill in your name, email and date'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      toast.success('Reservation received. Xie xie! We will confirm shortly.')
      setForm({ name: '', email: '', phone: '', date: '', time: '19:00', guests: '2', notes: '' })
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    } finally { setLoading(false) }
  }

  return (
    <section id="reservation" className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.interior2} alt="" className="w-full h-full object-cover opacity-30"/>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink via-black/85 to-brand-ink"/>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {!compact && (
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-brand-gold/60"/>
                <span className="uppercase tracking-[0.35em] text-[10px] font-semibold text-brand-gold">Reserve</span>
              </div>
              <div className="font-chinese text-brand-red-light/40 text-5xl mb-3">预定席位</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">
                Reserve a table at the <em className="text-gold-gradient not-italic">Golden Dragon</em>
              </h2>
              <p className="font-serif italic text-lg md:text-xl text-brand-cream/70 leading-relaxed mb-8 max-w-lg">
                Every reservation is a promise. A candlelit table, a slow ceremony of tea and the finest cooking outside the imperial court itself.
              </p>

              <ul className="space-y-4">
                {[
                  'Complimentary tea ceremony with every booking',
                  'Private dining rooms for parties of 6 – 24',
                  'Special occasion cakes on request',
                  'Vegetarian & allergen-aware menus available'
                ].map(t => (
                  <li key={t} className="flex items-start gap-3 text-brand-cream/80">
                    <Sparkles className="w-4 h-4 text-brand-gold mt-1 shrink-0"/> <span>{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.15 }}
            className={`glass gold-border rounded-3xl p-6 md:p-10 ${compact ? 'lg:col-span-2' : ''}`}
          >
            <div className="font-chinese text-brand-gold text-xs tracking-[0.4em] mb-2">预约</div>
            <h3 className="font-display text-3xl md:text-4xl text-brand-cream mb-6">Book Your Experience</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Field icon={User} label="Full name">
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Chen" className="input"/>
              </Field>
              <Field icon={Mail} label="Email">
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@email.com" className="input"/>
              </Field>
              <Field icon={Phone} label="Phone">
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 (415) 555-0100" className="input"/>
              </Field>
              <Field icon={Users} label="Guests">
                <select value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} className="input">
                  {[1,2,3,4,5,6,7,8,10,12].map(n => <option key={n} value={n}>{n} {n===1 ? 'guest' : 'guests'}</option>)}
                </select>
              </Field>
              <Field icon={Calendar} label="Date">
                <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="input"/>
              </Field>
              <Field icon={Clock} label="Time">
                <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="input">
                  {['17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Special requests (optional)">
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Allergies, occasion, seating preferences..." className="input"/>
              </Field>
            </div>

            <button disabled={loading} className="btn-gold w-full mt-6 justify-center disabled:opacity-70">
              {loading ? 'Reserving...' : 'Reserve My Table'}
            </button>
            <p className="text-center text-xs text-brand-cream/40 mt-4">By reserving, you agree to our 24-hour cancellation policy.</p>
          </motion.form>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,215,0,0.18);
          color: #faf7f2;
          padding: 0.85rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.95rem;
          transition: all 0.3s;
        }
        .input:focus { outline: none; border-color: #FFD700; box-shadow: 0 0 0 3px rgba(255,215,0,0.12); }
        .input::placeholder { color: rgba(250,247,242,0.35); }
      `}</style>
    </section>
  )
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brand-gold/80 font-semibold mb-2">
        {Icon && <Icon className="w-3 h-3"/>}{label}
      </div>
      {children}
    </label>
  )
}

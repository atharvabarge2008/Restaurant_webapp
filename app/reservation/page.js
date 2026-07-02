'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Users, User, Phone, Mail, Sparkles, Calendar as CalendarIcon, Clock, Cake, Heart, Briefcase, PartyPopper, Utensils, Sun, Wind, Moon, Home as HomeIcon } from 'lucide-react'
import { toast } from 'sonner'
import { IMG, BRAND } from '@/lib/site-data'

const TIME_SLOTS = ['11:30','12:00','12:30','13:00','13:30','14:00','14:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00']
const OCCASIONS = [
  { k: 'casual',      i: Utensils,    l: 'Casual Dining' },
  { k: 'birthday',    i: Cake,        l: 'Birthday' },
  { k: 'anniversary', i: Heart,       l: 'Anniversary' },
  { k: 'family',      i: HomeIcon,    l: 'Family Meal' },
  { k: 'business',    i: Briefcase,   l: 'Business Meeting' },
  { k: 'party',       i: PartyPopper, l: 'Group Party' }
]
const TABLES = [
  { k: 'any',      i: Sparkles, l: 'Any',       d: 'We\'ll pick the best' },
  { k: 'window',   i: Sun,      l: 'Window',    d: 'Street-facing view' },
  { k: 'corner',   i: Wind,     l: 'Corner',    d: 'Cosy & quiet' },
  { k: 'outdoor',  i: Moon,     l: 'Outdoor',   d: 'Open-air seating' }
]

export default function ReservationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    date: null, time: '',
    guests: 2,
    occasion: 'casual',
    table: 'any',
    notes: ''
  })
  const [loading, setLoading] = useState(false)

  const canProceed = () => {
    if (step === 1) return form.date && form.time
    if (step === 2) return form.guests >= 1
    if (step === 3) return form.name && form.phone
    return false
  }

  const submit = async () => {
    if (!form.name || !form.phone || !form.date || !form.time) { toast.error('Please fill required fields'); return }
    setLoading(true)
    try {
      const payload = { ...form, date: new Date(form.date).toISOString().split('T')[0] }
      const res = await fetch('/api/reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      router.push(`/reservation/${data.reservation.id}`)
    } catch (err) { toast.error(err.message); setLoading(false) }
  }

  return (
    <div className="min-h-screen">
      {/* Compact hero */}
      <section className="relative h-[35svh] min-h-[280px] flex items-end overflow-hidden">
        <img src={IMG.interior1} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-brand-ink"/>
        <div className="relative container mx-auto px-6 pb-8 pt-24">
          <div className="text-brand-red-light text-2xl md:text-4xl opacity-40 mb-2" style={{ fontFamily: 'var(--font-chinese)' }}>टेबल बुकिंग</div>
          <h1 className="font-display text-4xl md:text-7xl leading-none">Book a <em className="text-gold-gradient not-italic">Table</em></h1>
        </div>
      </section>

      <section className="py-14 bg-brand-ink">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Steps */}
          <div className="flex items-center justify-center gap-3 md:gap-6 mb-10">
            {['Date & Time', 'Party & Table', 'Your Details'].map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition ${step === i+1 ? 'bg-gold-gradient text-brand-ink shadow-gold' : step > i+1 ? 'bg-emerald-500 text-white' : 'bg-brand-ink-soft text-brand-cream/40 border border-brand-gold/15'}`}>{i+1}</div>
                <div className={`hidden md:block text-xs uppercase tracking-widest ${step >= i+1 ? 'text-brand-gold' : 'text-brand-cream/40'}`}>{label}</div>
                {i < 2 && <div className={`w-10 md:w-16 h-px ${step > i+1 ? 'bg-brand-gold' : 'bg-brand-gold/15'}`}/>}
              </div>
            ))}
          </div>

          {/* Step content */}
          <motion.div key={step}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="glass gold-border rounded-3xl p-6 md:p-10"
          >
            {step === 1 && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 text-brand-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-4"><CalendarIcon className="w-3 h-3"/> Select date</div>
                  <div className="rounded-2xl bg-black/30 border border-brand-gold/15 p-3 flex justify-center">
                    <DayPicker
                      mode="single"
                      selected={form.date}
                      onSelect={(d) => setForm({...form, date: d})}
                      disabled={{ before: new Date() }}
                      classNames={{
                        root: 'text-brand-cream',
                        caption: 'flex justify-between items-center py-2 px-2',
                        caption_label: 'font-display text-lg text-brand-gold',
                        nav_button: 'w-8 h-8 rounded-full hover:bg-brand-gold/10 text-brand-gold inline-flex items-center justify-center',
                        head_cell: 'text-brand-gold/60 text-xs font-semibold uppercase p-1',
                        cell: 'p-0.5',
                        day: 'w-9 h-9 rounded-full text-sm hover:bg-brand-gold/10 hover:text-brand-gold transition inline-flex items-center justify-center',
                        day_selected: '!bg-gold-gradient !text-brand-ink shadow-gold font-bold',
                        day_today: 'text-brand-gold ring-1 ring-brand-gold/40',
                        day_disabled: 'text-brand-cream/20 hover:bg-transparent hover:text-brand-cream/20 cursor-not-allowed'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-brand-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-4"><Clock className="w-3 h-3"/> Select time</div>
                  <div className="grid grid-cols-3 gap-2 max-h-[380px] overflow-auto pr-1">
                    {TIME_SLOTS.map(t => (
                      <button key={t} onClick={() => setForm({...form, time: t})}
                        className={`py-3 rounded-xl text-sm font-semibold transition ${form.time === t ? 'bg-gold-gradient text-brand-ink shadow-gold' : 'border border-brand-gold/20 text-brand-cream/70 hover:text-brand-gold hover:border-brand-gold'}`}
                      >{t}</button>
                    ))}
                  </div>
                  <div className="mt-4 text-xs text-brand-cream/50">Lunch: 11:30 AM – 2:30 PM · Dinner: 7:00 PM – 10:00 PM</div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 text-brand-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-4"><Users className="w-3 h-3"/> Number of guests</div>
                  <div className="flex flex-wrap gap-2">
                    {[1,2,3,4,5,6,7,8,10,12,'15+'].map(n => (
                      <button key={n} onClick={() => setForm({...form, guests: n})}
                        className={`w-12 h-12 rounded-xl text-sm font-semibold transition ${form.guests === n ? 'bg-gold-gradient text-brand-ink shadow-gold' : 'border border-brand-gold/20 text-brand-cream/70 hover:text-brand-gold hover:border-brand-gold'}`}
                      >{n}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-brand-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-4"><PartyPopper className="w-3 h-3"/> Occasion</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {OCCASIONS.map(o => (
                      <button key={o.k} onClick={() => setForm({...form, occasion: o.k})}
                        className={`flex items-center gap-3 p-4 rounded-2xl border transition ${form.occasion === o.k ? 'border-brand-gold bg-brand-gold/5 shadow-gold' : 'border-brand-gold/15 hover:border-brand-gold/40'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${form.occasion === o.k ? 'bg-gold-gradient text-brand-ink' : 'bg-black/40 text-brand-gold'}`}><o.i className="w-4 h-4"/></div>
                        <span className="text-sm font-semibold text-brand-cream">{o.l}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-brand-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-4"><HomeIcon className="w-3 h-3"/> Preferred seating</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {TABLES.map(t => (
                      <button key={t.k} onClick={() => setForm({...form, table: t.k})}
                        className={`p-4 rounded-2xl border transition text-center ${form.table === t.k ? 'border-brand-gold bg-brand-gold/5 shadow-gold' : 'border-brand-gold/15 hover:border-brand-gold/40'}`}
                      >
                        <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2 ${form.table === t.k ? 'bg-gold-gradient text-brand-ink' : 'bg-black/40 text-brand-gold'}`}><t.i className="w-4 h-4"/></div>
                        <div className="text-sm font-semibold text-brand-cream">{t.l}</div>
                        <div className="text-[10px] text-brand-cream/50 mt-0.5">{t.d}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField icon={User} label="Full name" required>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Priya Shinde" className="input"/>
                  </FormField>
                  <FormField icon={Phone} label="Mobile" required>
                    <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98604 xxxxx" className="input"/>
                  </FormField>
                  <FormField icon={Mail} label="Email (optional)">
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@email.com" className="input"/>
                  </FormField>
                </div>
                <FormField label="Special requests">
                  <textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Dietary preferences, high chair, allergies, birthday cake..." className="input"/>
                </FormField>

                {/* Summary */}
                <div className="mt-6 p-5 rounded-2xl bg-black/30 border border-brand-gold/15">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/70 mb-3">Reservation summary</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <SumTile label="Date" value={form.date ? new Date(form.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}/>
                    <SumTile label="Time" value={form.time || '—'}/>
                    <SumTile label="Guests" value={String(form.guests)}/>
                    <SumTile label="Table" value={form.table.charAt(0).toUpperCase() + form.table.slice(1)}/>
                  </div>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-brand-gold/15">
              <button onClick={() => setStep(Math.max(1, step-1))} disabled={step === 1} className="px-6 py-3 rounded-full text-sm font-semibold text-brand-cream/70 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">Back</button>
              {step < 3 ? (
                <button onClick={() => setStep(step+1)} disabled={!canProceed()} className="btn-gold disabled:opacity-40">Continue</button>
              ) : (
                <button onClick={submit} disabled={loading || !canProceed()} className="btn-gold disabled:opacity-70">{loading ? 'Reserving...' : 'Confirm Reservation'}</button>
              )}
            </div>
          </motion.div>

          <div className="mt-8 text-center text-xs text-brand-cream/50">
            Reservations are confirmed within 30 minutes. For same-day bookings, please call <a href={BRAND.order.call} className="text-brand-gold">{BRAND.phone}</a>.
          </div>
        </div>
      </section>

      <style jsx global>{`
        .input { width: 100%; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,215,0,0.18); color: #faf7f2; padding: 0.85rem 1rem; border-radius: 0.75rem; font-size: 0.95rem; transition: all 0.3s; }
        .input:focus { outline: none; border-color: #FFD700; box-shadow: 0 0 0 3px rgba(255,215,0,0.12); }
        .input::placeholder { color: rgba(250,247,242,0.35); }
        .rdp { --rdp-cell-size: 40px; margin: 0; }
      `}</style>
    </div>
  )
}

function FormField({ icon: Icon, label, required, children }) {
  return (
    <label className="block">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brand-gold/80 font-semibold mb-2">
        {Icon && <Icon className="w-3 h-3"/>}{label}{required && <span className="text-brand-red-light">*</span>}
      </div>
      {children}
    </label>
  )
}
function SumTile({ label, value }) {
  return <div><div className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-0.5">{label}</div><div className="font-semibold text-brand-cream">{value}</div></div>
}

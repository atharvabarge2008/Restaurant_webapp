'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Phone, Mail, MapPin, Truck, Store, CreditCard, Wallet, Smartphone, Landmark, Lock, ArrowLeft, ChefHat } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totals, mode, setMode, promo, clear } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', landmark: '', notes: '' })
  const [payment, setPayment] = useState('cod')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (items.length === 0) { toast.error('Your cart is empty'); router.push('/menu') }
  }, []) // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) { toast.error('Please enter your name and phone'); return }
    if (mode === 'delivery' && !form.address) { toast.error('Please enter your delivery address'); return }
    if (!/^[+\d\s\-()]{7,}$/.test(form.phone)) { toast.error('Please enter a valid phone number'); return }

    setLoading(true)
    // Simulate payment gateway (1.4s)
    if (payment !== 'cod') { await new Promise(r => setTimeout(r, 1400)) }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items, mode,
          customer: form,
          payment: { method: payment, status: payment === 'cod' ? 'pending' : 'paid' },
          promo: promo ? { code: promo.code, label: promo.label } : null,
          totals
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to place order')
      clear()
      router.push(`/order/${data.order.id}`)
    } catch (err) { toast.error(err.message); setLoading(false) }
  }

  if (items.length === 0) return null

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 bg-brand-ink">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <Link href="/cart" className="inline-flex items-center gap-2 text-brand-cream/60 hover:text-brand-gold text-sm mb-6"><ArrowLeft className="w-4 h-4"/> Back to cart</Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-brand-gold/60"/>
            <span className="uppercase tracking-[0.35em] text-[10px] text-brand-gold font-semibold">Checkout</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl">Almost <em className="text-gold-gradient not-italic">there.</em></h1>
        </div>

        <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6 lg:gap-10">
          <div className="lg:col-span-2 space-y-6">
            {/* Mode */}
            <div className="glass rounded-2xl p-1.5 flex">
              {[{k:'delivery',l:'Delivery',i:Truck,s:'To your door · Satara'},{k:'pickup',l:'Pickup',i:Store,s:'From Guruwar Peth'}].map(m => (
                <button type="button" key={m.k} onClick={() => setMode(m.k)} className={`flex-1 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 ${mode === m.k ? 'bg-gold-gradient text-brand-ink shadow-gold' : 'text-brand-cream/70 hover:text-brand-gold'}`}>
                  <m.i className="w-4 h-4"/>
                  <div className="text-left">
                    <div>{m.l}</div>
                    <div className={`text-[9px] uppercase tracking-widest mt-0.5 font-normal ${mode === m.k ? 'text-brand-ink/70' : 'text-brand-cream/40'}`}>{m.s}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Customer details */}
            <Section title="Your Details" subtitle="So we know who to feed">
              <div className="grid md:grid-cols-2 gap-3">
                <Field icon={User} label="Full name" required>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Priya Shinde" className="input"/>
                </Field>
                <Field icon={Phone} label="Mobile number" required>
                  <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98604 xxxxx" className="input"/>
                </Field>
                <Field icon={Mail} label="Email (optional)">
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@email.com" className="input"/>
                </Field>
              </div>
            </Section>

            {mode === 'delivery' && (
              <Section title="Delivery Address" subtitle="We deliver across Satara">
                <div className="space-y-3">
                  <Field icon={MapPin} label="Full address" required>
                    <textarea rows={3} value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="House / flat no, street, area, city" className="input"/>
                  </Field>
                  <Field label="Nearby landmark">
                    <input value={form.landmark} onChange={e => setForm({...form, landmark: e.target.value})} placeholder="e.g. Near Y.C. College" className="input"/>
                  </Field>
                </div>
              </Section>
            )}

            <Section title="Payment Method" subtitle="Test / demo gateway — no real charge">
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { k:'cod', i:Wallet, l:'Cash on Delivery', d:'Pay when you receive' },
                  { k:'upi', i:Smartphone, l:'UPI / GPay / PhonePe', d:'Fast & instant' },
                  { k:'card', i:CreditCard, l:'Credit / Debit Card', d:'Visa · MC · RuPay' },
                  { k:'netbanking', i:Landmark, l:'Net Banking', d:'All major banks' }
                ].map(p => (
                  <label key={p.k} className={`cursor-pointer p-4 rounded-2xl border transition flex gap-3 ${payment === p.k ? 'border-brand-gold bg-brand-gold/5 shadow-gold' : 'border-brand-gold/15 hover:border-brand-gold/40'}`}>
                    <input type="radio" checked={payment === p.k} onChange={() => setPayment(p.k)} className="sr-only"/>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${payment === p.k ? 'bg-gold-gradient text-brand-ink' : 'bg-black/40 text-brand-gold'}`}><p.i className="w-5 h-5"/></div>
                    <div className="min-w-0">
                      <div className="font-semibold text-brand-cream text-sm">{p.l}</div>
                      <div className="text-xs text-brand-cream/50">{p.d}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-brand-cream/40">
                <Lock className="w-3 h-3"/> 256-bit encrypted checkout · PCI-DSS compliant
              </div>
            </Section>

            <Section title="Special Instructions" subtitle="Anything the chef should know?">
              <textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="e.g. Less spicy, no onion, extra sauce..." className="input"/>
            </Section>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 glass gold-border rounded-3xl p-6 space-y-4">
              <h3 className="font-display text-xl text-brand-cream flex items-center gap-2"><ChefHat className="w-5 h-5 text-brand-gold"/> Order Summary</h3>
              <div className="space-y-2 max-h-56 overflow-auto pr-1 -mr-1">
                {items.map(it => (
                  <div key={it.key} className="flex justify-between items-start gap-2 text-sm">
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-brand-cream">{it.name}</div>
                      <div className="text-[10px] uppercase tracking-widest text-brand-cream/40">{it.portion} · x{it.qty}</div>
                    </div>
                    <div className="text-brand-cream/80 shrink-0">₹{it.price * it.qty}</div>
                  </div>
                ))}
              </div>
              <div className="h-px bg-brand-gold/15"/>
              <div className="space-y-2 text-sm">
                <Row label="Subtotal" value={`₹${totals.subtotal}`}/>
                {totals.discount > 0 && <Row label={`Discount · ${promo?.code}`} value={`– ₹${totals.discount}`} accent/>}
                <Row label="GST (5%)" value={`₹${totals.tax}`}/>
                <Row label={mode === 'pickup' ? 'Pickup' : 'Delivery'} value={totals.delivery === 0 ? 'FREE' : `₹${totals.delivery}`} accent={totals.delivery===0}/>
              </div>
              <div className="h-px bg-brand-gold/15"/>
              <div className="flex items-baseline justify-between">
                <span className="text-brand-cream/70">Total</span>
                <span className="font-display text-3xl text-gold-gradient">₹{totals.total}</span>
              </div>
              <motion.button whileTap={{ scale: 0.98 }} disabled={loading} type="submit" className="btn-gold w-full justify-center !py-4 disabled:opacity-70">
                {loading ? (payment === 'cod' ? 'Placing order...' : 'Processing payment...') : (payment === 'cod' ? 'Place Order' : `Pay ₹${totals.total}`)}
              </motion.button>
              <div className="text-center text-[11px] text-brand-cream/40">Est. {mode === 'delivery' ? '30–40 min delivery' : '15–25 min pickup'}</div>
            </div>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .input {
          width: 100%; background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,215,0,0.18); color: #faf7f2;
          padding: 0.85rem 1rem; border-radius: 0.75rem; font-size: 0.95rem;
          transition: all 0.3s;
        }
        .input:focus { outline: none; border-color: #FFD700; box-shadow: 0 0 0 3px rgba(255,215,0,0.12); }
        .input::placeholder { color: rgba(250,247,242,0.35); }
      `}</style>
    </div>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-7">
      <div className="mb-5">
        <h3 className="font-display text-xl text-brand-cream">{title}</h3>
        {subtitle && <div className="text-xs text-brand-cream/50 mt-1">{subtitle}</div>}
      </div>
      {children}
    </div>
  )
}
function Field({ icon: Icon, label, required, children }) {
  return (
    <label className="block">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brand-gold/80 font-semibold mb-2">
        {Icon && <Icon className="w-3 h-3"/>}{label}{required && <span className="text-brand-red-light">*</span>}
      </div>
      {children}
    </label>
  )
}
function Row({ label, value, accent }) {
  return <div className="flex items-center justify-between"><span className="text-brand-cream/60">{label}</span><span className={accent ? 'text-brand-gold font-semibold' : 'text-brand-cream'}>{value}</span></div>
}

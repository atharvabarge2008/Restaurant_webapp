'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { toast } from 'sonner'
import { BRAND, IMG } from '@/lib/site-data'
import MapSection from '@/components/site/MapSection'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Please fill in name, email and message'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed')
      toast.success('Message received. We will reply within 24 hours.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) { toast.error('Something went wrong') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-[45svh] min-h-[340px] flex items-center overflow-hidden">
        <img src={IMG.lantern2} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-brand-ink"/>
        <div className="relative container mx-auto px-6 pt-24 text-center">
          <h1 className="font-display text-5xl md:text-8xl leading-none">Get in <em className="text-gold-gradient not-italic">Touch</em></h1>
        </div>
      </section>

      <section className="py-24 bg-brand-ink">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">We would love to hear from you</h2>
              <p className="font-serif italic text-lg text-brand-cream/70 mb-10">Whether it's a special request, private event or simply to say hello — our team is delighted to help.</p>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Visit us', value: BRAND.address },
                  { icon: Phone, label: 'Call us', value: BRAND.phone, href: `tel:${BRAND.phone}` },
                  { icon: Clock, label: 'Hours', value: 'Mon-Sun · 11:00 AM – 10:15 PM' }
                ].map((c, i) => {
                  const inner = (
                    <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-gold/15 hover:border-brand-gold/40 transition group">
                      <div className="w-11 h-11 rounded-xl bg-gold-gradient flex items-center justify-center text-brand-ink shrink-0"><c.icon className="w-4 h-4"/></div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/80 mb-1">{c.label}</div>
                        <div className="text-brand-cream group-hover:text-brand-gold transition">{c.value}</div>
                      </div>
                    </div>
                  )
                  return c.href ? <a key={i} href={c.href}>{inner}</a> : <div key={i}>{inner}</div>
                })}
              </div>
            </motion.div>

            {/* Form */}
            <motion.form onSubmit={submit}
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
              className="glass gold-border rounded-3xl p-8 md:p-10"
            >
              <h3 className="font-display text-3xl mb-6">Send us a message</h3>
              <div className="space-y-4">
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your Name" className="input"/>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email Address" className="input"/>
                <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Subject" className="input"/>
                <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Your message..." className="input"/>
              </div>
              <button disabled={loading} className="btn-gold w-full mt-6 justify-center disabled:opacity-70">
                {loading ? 'Sending...' : (<>Send Message <Send className="w-3.5 h-3.5"/></>)}
              </button>
              <style jsx>{`
                .input {
                  width: 100%;
                  background: rgba(0,0,0,0.4);
                  border: 1px solid rgba(255,215,0,0.18);
                  color: #faf7f2;
                  padding: 0.95rem 1.1rem;
                  border-radius: 0.85rem;
                  font-size: 0.95rem;
                  transition: all 0.3s;
                }
                .input:focus { outline: none; border-color: #FFD700; box-shadow: 0 0 0 3px rgba(255,215,0,0.12); }
                .input::placeholder { color: rgba(250,247,242,0.35); }
              `}</style>
            </motion.form>
          </div>
        </div>
      </section>

      <MapSection />
    </div>
  )
}

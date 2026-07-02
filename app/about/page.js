'use client'
import { motion } from 'framer-motion'
import { IMG, BRAND } from '@/lib/site-data'
import SectionHeading from '@/components/site/SectionHeading'

const timeline = [
  { year: '2015', title: 'A Corner in Guruwar Peth', marathi: 'सुरुवात', text: 'ShindeShahi opens its shutters in a small corner shop opposite Y.C. College. One wok, one dream: give Satara the freshest, tastiest Indo-Chinese food in the city.' },
  { year: '2017', title: 'The Dinosaur Is Born', marathi: 'डायनोसॉर', text: 'A regular customer asks for “something extra spicy, extra masaledar.” Our house Dinosaur Rice is created that evening. Word spreads across Satara within weeks.' },
  { year: '2020', title: 'Zomato & Swiggy Go Live', marathi: 'घरपोहोच', text: 'Home delivery launches on both platforms. Within months, we hit 4.6★ on Zomato and cross 1,500 ratings on Swiggy.' },
  { year: '2023', title: '855+ Google Reviews', marathi: 'विश्वास', text: 'A 4.5★ average and hundreds of loving reviews later, ShindeShahi is officially Satara’s go-to Indo-Chinese destination.' },
  { year: 'Today', title: 'Still Wok-Fired to Order', marathi: 'आजही तेच', text: 'Same recipes. Same hands. Same fire. Come dine with us in Guruwar Peth, or tap Zomato/Swiggy and we’ll bring the wok to you.' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60svh] min-h-[440px] flex items-center overflow-hidden">
        <img src={IMG.chickenChilli} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-brand-ink"/>
        <div className="relative container mx-auto px-6 pt-24 text-center">
          <div className="text-brand-red-light text-3xl md:text-5xl opacity-40 mb-4" style={{ fontFamily: 'var(--font-chinese)' }}>आमच्या बद्दल</div>
          <h1 className="font-display text-5xl md:text-8xl leading-none">Our <em className="text-gold-gradient not-italic">Story</em></h1>
          <p className="font-serif italic text-lg md:text-xl text-brand-cream/70 mt-6 max-w-2xl mx-auto">A small kitchen in Satara. A big dream. A whole lot of wok fire.</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32 bg-brand-ink">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-red">
                <img src={IMG.chickenCrispy} alt="ShindeShahi kitchen" className="w-full h-full object-cover"/>
              </div>
              <div className="absolute -bottom-8 -right-6 md:-right-10 glass gold-border rounded-2xl p-6 max-w-xs shadow-gold">
                <div className="text-brand-gold text-2xl mb-1" style={{ fontFamily: 'var(--font-chinese)' }}>शिंदेशाही</div>
                <div className="font-display text-2xl text-brand-cream">The Wok, The Fire</div>
                <div className="text-xs text-brand-cream/60 uppercase tracking-[0.25em] mt-1">Guruwar Peth, Satara</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-brand-gold/60"/>
                <span className="uppercase tracking-[0.35em] text-[10px] text-brand-gold font-semibold">Our Philosophy</span>
              </div>
              <div className="text-brand-red-light/60 text-3xl mb-3" style={{ fontFamily: 'var(--font-chinese)' }}>चव जो मन जिंके</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">Fresh food. Big flavour. <em className="text-gold-gradient not-italic">Fair prices.</em></h2>
              <p className="font-serif italic text-lg text-brand-cream/70 leading-relaxed mb-6">We don’t chase fine-dining fanciness. We chase flavour. Every plate is wok-fired to order using our house-secret masala — the same one we’ve been mixing since 2015.</p>
              <p className="text-brand-cream/60 leading-relaxed">ShindeShahi is a neighbourhood joint at heart — warm, honest, generously portioned. Whether it’s the college kids after class or families on a Sunday, we cook for the people of Satara like they’re family.</p>

              <div className="grid grid-cols-3 gap-6 mt-10">
                {[{v:'4.5★', l:'Google rating'},{v:'855+', l:'Reviews'},{v:'50+', l:'Dishes'}].map(s => (
                  <div key={s.l} className="border-l border-brand-gold/30 pl-4">
                    <div className="font-display text-3xl md:text-4xl text-gold-gradient">{s.v}</div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-brand-cream/50 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <SectionHeading eyebrow="Our Journey" chinese="आमचा प्रवास" title="From a corner shop to Satara's favourite" />
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-gold/40 to-transparent"/>
            {timeline.map((t, i) => (
              <motion.div key={t.year}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.05 }}
                className={`relative flex items-start gap-6 md:gap-12 mb-12 ${i % 2 ? 'md:flex-row-reverse md:text-right' : ''}`}
              >
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-gold shadow-gold ring-4 ring-brand-ink z-10"/>
                <div className="md:w-1/2 pl-16 md:pl-0 md:px-8">
                  <div className="font-display text-5xl text-gold-gradient mb-1">{t.year}</div>
                  <div className="text-brand-red-light/70 mb-2" style={{ fontFamily: 'var(--font-chinese)' }}>{t.marathi}</div>
                  <h3 className="font-display text-2xl md:text-3xl text-brand-cream mb-2">{t.title}</h3>
                  <p className="text-brand-cream/60 leading-relaxed">{t.text}</p>
                </div>
                <div className="hidden md:block md:w-1/2"/>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

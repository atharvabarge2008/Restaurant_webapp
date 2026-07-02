'use client'
import { motion } from 'framer-motion'
import { IMG } from '@/lib/site-data'
import SectionHeading from '@/components/site/SectionHeading'

const timeline = [
  { year: '1984', title: 'A Humble Beginning', chinese: '始于初心', text: 'Master Wong opens a 12-seat dumpling house on Grant Avenue with a single wok and a family recipe from Guangzhou.' },
  { year: '1996', title: 'The First Star', chinese: '一颗星', text: 'Golden Dragon earns its first Michelin star — the youngest Chinese restaurant in North America to do so.' },
  { year: '2008', title: 'A Second Generation', chinese: '传承', text: 'Chef Wong Jr. returns from apprenticeships in Chengdu and Beijing, introducing modern technique to century-old craft.' },
  { year: '2019', title: 'A New Home', chinese: '新居', text: 'We move into a restored 1920s theater. 42 tables. One 900°C duck oven. Countless memories waiting to be made.' },
  { year: '2024', title: 'Two Michelin Stars', chinese: '双星荣耀', text: 'Named among the World\'s 50 Best Restaurants. And still — every dumpling is folded by hand.' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60svh] min-h-[440px] flex items-center overflow-hidden">
        <img src={IMG.chef} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-brand-ink"/>
        <div className="relative container mx-auto px-6 pt-24 text-center">
          <div className="font-chinese text-brand-red-light text-5xl md:text-7xl opacity-40 mb-4">关于我们</div>
          <h1 className="font-display text-5xl md:text-8xl leading-none">Our <em className="text-gold-gradient not-italic">Story</em></h1>
          <p className="font-serif italic text-lg md:text-xl text-brand-cream/70 mt-6 max-w-2xl mx-auto">Four decades. Three generations. One relentless pursuit of the perfect dumpling.</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32 bg-brand-ink">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-red">
                <img src={IMG.interior1} alt="Interior" className="w-full h-full object-cover"/>
              </div>
              <div className="absolute -bottom-8 -right-6 md:-right-10 glass gold-border rounded-2xl p-6 max-w-xs shadow-gold">
                <div className="font-chinese text-brand-gold text-2xl mb-1">王师傅</div>
                <div className="font-display text-2xl text-brand-cream">Chef Wong</div>
                <div className="text-xs text-brand-cream/60 uppercase tracking-[0.25em] mt-1">Executive Chef · 3rd Gen.</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-brand-gold/60"/>
                <span className="uppercase tracking-[0.35em] text-[10px] text-brand-gold font-semibold">Our Philosophy</span>
              </div>
              <div className="font-chinese text-brand-red-light/40 text-4xl mb-3">匠心</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">Cooking is a form of <em className="text-gold-gradient not-italic">devotion</em></h2>
              <p className="font-serif italic text-lg text-brand-cream/70 leading-relaxed mb-6">We do not chase trends. We do not shortcut tradition. We buy the best, we cook it with reverence, and we serve it with joy.</p>
              <p className="text-brand-cream/60 leading-relaxed">Golden Dragon is a temple to slow food — where noodles are pulled by hand, ducks are lacquered for a full day, and stocks are simmered from sunrise until service. Our kitchen is a place where memory becomes flavor.</p>

              <div className="grid grid-cols-3 gap-6 mt-10">
                {[{v:'40+', l:'Years of craft'},{v:'2', l:'Michelin stars'},{v:'108', l:'Dishes on menu'}].map(s => (
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
          <SectionHeading eyebrow="Our Legacy" chinese="传承之路" title="Four decades of devotion" />
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
                  <div className="font-chinese text-brand-red-light/60 mb-2">{t.chinese}</div>
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

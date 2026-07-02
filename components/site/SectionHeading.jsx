'use client'
import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, chinese, title, subtitle, align = 'center', light = false }) {
  const alignCls = align === 'left' ? 'text-left items-start' : 'text-center items-center'
  return (
    <div className={`flex flex-col ${alignCls} gap-4 mb-14`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-brand-gold/60"/>
          <span className="uppercase tracking-[0.35em] text-[10px] font-semibold text-brand-gold">{eyebrow}</span>
          <span className="h-px w-8 bg-brand-gold/60"/>
        </motion.div>
      )}
      {chinese && (
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-chinese text-brand-red-light text-4xl md:text-5xl opacity-40"
        >{chinese}</motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className={`font-display text-4xl md:text-6xl leading-[1.05] ${light ? 'text-brand-ink' : 'text-brand-cream'}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className={`max-w-2xl font-serif text-lg md:text-xl ${light ? 'text-brand-ink/70' : 'text-brand-cream/70'} italic`}
        >{subtitle}</motion.p>
      )}
    </div>
  )
}

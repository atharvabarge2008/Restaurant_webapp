'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useInView, animate } from 'framer-motion'

/* ---------------- Custom Cursor ---------------- */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState('default')
  const [label, setLabel] = useState('')

  const mx = useMotionValue(-100), my = useMotionValue(-100)
  const smoothX = useSpring(mx, { stiffness: 350, damping: 32, mass: 0.4 })
  const smoothY = useSpring(my, { stiffness: 350, damping: 32, mass: 0.4 })
  const ringX  = useSpring(mx, { stiffness: 140, damping: 22, mass: 0.6 })
  const ringY  = useSpring(my, { stiffness: 140, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return
    setEnabled(true)

    const move = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    const over = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (t) {
        setVariant(t.dataset.cursor || 'hover')
        setLabel(t.dataset.cursorLabel || '')
      } else if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setVariant('hover'); setLabel('')
      } else { setVariant('default'); setLabel('') }
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.documentElement.classList.add('has-cursor')
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.classList.remove('has-cursor')
    }
  }, []) // eslint-disable-line

  if (!enabled) return null
  const isHover = variant === 'hover'
  const isLabel = !!label

  return (
    <>
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference"
      >
        <motion.div
          animate={{ scale: isHover ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />
      </motion.div>
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9997]"
      >
        <motion.div
          animate={{
            scale: isLabel ? 3.2 : isHover ? 1.7 : 1,
            borderColor: isHover ? '#FFD700' : 'rgba(255,215,0,0.55)',
            backgroundColor: isLabel ? '#B71C1C' : isHover ? 'rgba(255,215,0,0.08)' : 'transparent'
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="relative w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px]"
        >
          {isLabel && (
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest text-brand-gold">{label}</span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}

/* ---------------- Magnetic wrapper ---------------- */
export function Magnetic({ children, strength = 0.4, radius = 120, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 20 })
  const sy = useSpring(y, { stiffness: 280, damping: 20 })

  useEffect(() => {
    const el = ref.current; if (!el) return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2
      const dx = e.clientX - cx, dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist < radius) { x.set(dx * strength); y.set(dy * strength) }
      else { x.set(0); y.set(0) }
    }
    const leave = () => { x.set(0); y.set(0) }
    window.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { window.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [strength, radius]) // eslint-disable-line

  return (
    <motion.span ref={ref} style={{ x: sx, y: sy, display: 'inline-flex' }} className={className}>{children}</motion.span>
  )
}

/* ---------------- Animated counter ---------------- */
export function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1.8, decimals = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(prefix + (0).toFixed(decimals) + suffix)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration, ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setDisplay(prefix + v.toFixed(decimals) + suffix)
    })
    return () => controls.stop()
  }, [inView, value, duration, decimals, prefix, suffix])

  return <span ref={ref} className={className}>{display}</span>
}

/* ---------------- Steam / smoke SVG ---------------- */
export function Steam({ className = '', delay = 0 }) {
  return (
    <svg viewBox="0 0 60 120" className={`pointer-events-none ${className}`} aria-hidden>
      <defs>
        <linearGradient id="stm" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0"/>
          <stop offset="40%" stopColor="#fff" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[0,1,2].map(i => (
        <path key={i}
          d="M30 118 C 12 90, 48 70, 30 45 C 12 25, 48 10, 30 -5"
          fill="none" stroke="url(#stm)" strokeWidth="12" strokeLinecap="round"
          style={{
            transformOrigin: '30px 60px',
            animation: `steamRise 5.5s ease-in-out ${delay + i * 0.7}s infinite`,
            opacity: 0
          }}
        />
      ))}
    </svg>
  )
}

/* ---------------- Floating ingredients (chili, star anise, spring onion) ---------------- */
const INGREDIENTS = [
  // Chili pepper
  { svg: <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M8 30 C 15 15, 28 8, 34 6 C 35 14, 28 27, 12 34 Z" fill="#d63838"/><path d="M32 8 C 34 4, 36 6, 34 10 Z" fill="#3d7a3d"/><path d="M14 26 C 20 18, 28 12, 32 10" stroke="#7f0f0f" strokeWidth="1" fill="none" opacity="0.5"/></svg>, size: 40 },
  // Star anise
  { svg: <svg viewBox="0 0 40 40" className="w-full h-full"><g fill="#8b5a2b">{[0,45,90,135,180,225,270,315].map(a => <ellipse key={a} cx="20" cy="8" rx="3" ry="8" transform={`rotate(${a} 20 20)`}/>)}<circle cx="20" cy="20" r="4" fill="#5c3a1a"/></g></svg>, size: 34 },
  // Green onion sprig
  { svg: <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20 34 L 20 8" stroke="#4ea84e" strokeWidth="5" strokeLinecap="round"/><path d="M14 12 C 16 4, 22 4, 24 10" stroke="#6bc46b" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M20 8 C 22 2, 26 4, 26 8" stroke="#6bc46b" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>, size: 32 },
  // Sesame / dot cluster (gold)
  { svg: <svg viewBox="0 0 40 40" className="w-full h-full"><g fill="#FFD700"><ellipse cx="20" cy="20" rx="5" ry="3"/><ellipse cx="12" cy="16" rx="3" ry="2"/><ellipse cx="28" cy="22" rx="3" ry="2"/></g></svg>, size: 30 }
]

export function FloatingIngredients({ count = 8, className = '' }) {
  // Generate deterministic seeds via index
  const items = Array.from({ length: count }).map((_, i) => {
    const ing = INGREDIENTS[i % INGREDIENTS.length]
    const top = (i * 37) % 90 + 5
    const left = (i * 53) % 90 + 5
    const dur = 8 + (i % 5) * 1.5
    const delay = (i * 0.7) % 4
    const rot = (i * 47) % 360
    return { ing, top, left, dur, delay, rot, key: i }
  })
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map(({ ing, top, left, dur, delay, rot, key }) => (
        <div key={key}
          style={{
            top: `${top}%`, left: `${left}%`, width: ing.size, height: ing.size,
            animation: `floatIng ${dur}s ease-in-out ${delay}s infinite`,
            transform: `rotate(${rot}deg)`,
            opacity: 0.22
          }}
          className="absolute drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
        >{ing.svg}</div>
      ))}
    </div>
  )
}

/* ---------------- Reveal image (clip-path reveal on scroll) ---------------- */
export function RevealImage({ src, alt = '', aspect = '4/5', className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      <motion.img
        src={src} alt={alt} loading="lazy"
        initial={{ scale: 1.25, filter: 'blur(20px)' }}
        animate={inView ? { scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1], delay }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={inView ? { scaleY: 0 } : {}}
        transition={{ duration: 1.0, ease: [0.9, 0, 0.1, 1], delay: delay + 0.05 }}
        style={{ originY: 0 }}
        className="absolute inset-0 bg-brand-ink"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={inView ? { scaleY: 0 } : {}}
        transition={{ duration: 1.0, ease: [0.9, 0, 0.1, 1], delay: delay + 0.15 }}
        style={{ originY: 1 }}
        className="absolute inset-0 bg-red-gradient"
      />
    </div>
  )
}

/* ---------------- Tilt 3D card ---------------- */
export function TiltCard({ children, className = '', max = 8 }) {
  const ref = useRef(null)
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 260, damping: 20 })
  const sry = useSpring(ry, { stiffness: 260, damping: 20 })

  useEffect(() => {
    const el = ref.current; if (!el) return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      ry.set((px - 0.5) * max * 2)
      rx.set(-(py - 0.5) * max * 2)
    }
    const leave = () => { rx.set(0); ry.set(0) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [max]) // eslint-disable-line

  return (
    <motion.div ref={ref} style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }} className={className}>
      {children}
    </motion.div>
  )
}

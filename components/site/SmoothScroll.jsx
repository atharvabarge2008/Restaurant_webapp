'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    const id = requestAnimationFrame(raf)

    // Anchor scrolling
    const clickHandler = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id && id.length > 1) {
        const el = document.querySelector(id)
        if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80, duration: 1.2 }) }
      }
    }
    document.addEventListener('click', clickHandler)
    return () => { cancelAnimationFrame(id); lenis.destroy(); document.removeEventListener('click', clickHandler) }
  }, [])
  return null
}

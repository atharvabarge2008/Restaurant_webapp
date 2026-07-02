import ReservationSection from '@/components/site/ReservationSection'
import MapSection from '@/components/site/MapSection'
import { IMG } from '@/lib/site-data'

export default function ReservationPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[45svh] min-h-[340px] flex items-center overflow-hidden">
        <img src={IMG.interior1} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-brand-ink"/>
        <div className="relative container mx-auto px-6 pt-24 text-center">
          <div className="font-chinese text-brand-red-light text-5xl md:text-7xl opacity-40 mb-4">预定</div>
          <h1 className="font-display text-5xl md:text-8xl leading-none">Reserve a <em className="text-gold-gradient not-italic">Table</em></h1>
        </div>
      </section>
      <ReservationSection />
      <MapSection />
    </div>
  )
}

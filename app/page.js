import Hero from '@/components/site/Hero'
import StatsSection from '@/components/site/StatsSection'
import FeaturedDishes from '@/components/site/FeaturedDishes'
import WhyChooseUs from '@/components/site/WhyChooseUs'
import SignatureDishes from '@/components/site/SignatureDishes'
import ReviewsSection from '@/components/site/ReviewsSection'
import GalleryPreview from '@/components/site/GalleryPreview'
import ReservationSection from '@/components/site/ReservationSection'
import MapSection from '@/components/site/MapSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedDishes />
      <WhyChooseUs />
      <SignatureDishes />
      <ReviewsSection />
      <GalleryPreview />
      <ReservationSection />
      <MapSection />
    </>
  )
}

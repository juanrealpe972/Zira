import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import { Separator } from '@radix-ui/themes'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Separator size="4" />
      <FeaturesSection />
      <Separator size="4" />
      <TestimonialsSection />
    </>
  )
}
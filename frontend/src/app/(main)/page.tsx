import { HeroSection, FeaturesSection, TestimonialsSection } from '@/components/sections'
import { Box, Separator } from '@radix-ui/themes'

export default function HomePage() {
  return (
    <Box>
      <HeroSection />
      <Separator size="4" />
      <FeaturesSection />
      <Separator size="4" />
      <TestimonialsSection />
    </Box>
  )
}
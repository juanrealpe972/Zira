import { Flex, Container } from '@radix-ui/themes'
import { AppHeading, AppText } from '@/components/ui'
import { TestimonialsCarousel } from '@/components/sections'

export function TestimonialsSection() {
  return (
    <Container size="3">
      <Flex direction="column" align="center" gap="3" py="8">

        <AppHeading>
          Lo que dicen nuestros usuarios
        </AppHeading>

        <AppText style={{ maxWidth: 500, textAlign: 'center' }}>
          Personas como tú ya están organizando su vida con Zira.
        </AppText>

        <TestimonialsCarousel />

      </Flex>
    </Container>
  )
}
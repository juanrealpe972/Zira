import { Flex, Container, Avatar } from '@radix-ui/themes'
import { AppButton, AppHeading, AppText } from '@/components/ui'

export function HeroSection() {
  return (
    <Container size="3">
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="5"
        px='8'
        py={{ initial: '7', md: '9' }}
        style={{ textAlign: 'center' }}
      >

        <AppHeading size="9" style={{ maxWidth: 700 }}>
          Organiza tu vida, tu dinero y tu trabajo en un solo lugar
        </AppHeading>

        <AppText style={{ maxWidth: 550 }}>
          Controla tus gastos, tareas, préstamos, archivos y más con una plataforma
          simple, potente y pensada para tu día a día.
        </AppText>

        <Flex gap="3" mt="2" wrap="wrap" justify="center">
          <AppButton asChild>
            <a href="https://wa.me/573157870001" target="_blank">
              Contactar por WhatsApp
            </a>
          </AppButton>
        </Flex>

        <Flex align="center" gap="2" mt="3">
          <Flex>
            {['A', 'B', 'C', 'D'].map((letter, i) => (
              <Avatar
                key={letter}
                size="1"
                fallback={letter}
                style={{
                  marginLeft: i === 0 ? 0 : -6,
                  border: '2px solid var(--color-background)'
                }}
              />
            ))}
          </Flex>
          <AppText>
            +2,000 usuarios organizando su vida con Zira
          </AppText>
        </Flex>

      </Flex>
    </Container>
  )
}
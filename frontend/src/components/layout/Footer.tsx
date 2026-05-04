import { Box, Flex, Container } from '@radix-ui/themes'
import { AppText, AppLink, AppIcon } from '@/components/ui'

export function Footer() {
  return (
    <Box
      style={{
        borderTop: '1px solid var(--gray-4)',
        marginTop: 40,
      }}
    >
      <Container size="3">
        <Flex
          align="center"
          justify="between"
          wrap="wrap"
          gap="3"
          py="4"
        >
          <Flex align="center" gap="2">
            <AppIcon name="rocketIcon" size={18} />
            <AppText>
              © 2026 Zira. Todos los derechos reservados.
            </AppText>
          </Flex>

          <Flex gap="4">
            <AppLink href="/privacy">Privacidad</AppLink>
            <AppLink href="/terms">Términos</AppLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
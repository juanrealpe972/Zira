import { Box, Flex, Text, Container } from '@radix-ui/themes'
import { Icons } from '@/components/ui'
import NavLink from 'next/link'

export default function Footer() {
  return (
    <Box style={{ borderTop: '1px solid var(--gray-4)' }}>
      <Container size="3">
        <Flex align="center" justify="between" py="4">

          <Flex align="center" gap="2">
            <Icons.rocketIcon />
            <Text size="2" color="gray">© 2026 Zira. Todos los derechos reservados.</Text>
          </Flex>

          <Flex gap="4">
            <NavLink href="/privacy" style={{ textDecoration: 'none' }}>
              <Text size="2" color="gray">Privacidad</Text>
            </NavLink>
            <NavLink href="/terms" style={{ textDecoration: 'none' }}>
              <Text size="2" color="gray">Términos</Text>
            </NavLink>
          </Flex>

        </Flex>
      </Container>
    </Box>
  )
}
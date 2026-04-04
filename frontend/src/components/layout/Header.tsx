import { Box, Flex, Text, Button, Container } from '@radix-ui/themes'
import { RocketIcon } from '@radix-ui/react-icons'
import NavLink from 'next/link'

export default function Header() {
  return (
    <Box style={{ borderBottom: '1px solid var(--gray-4)', position: 'sticky', top: 0, zIndex: 10, background: 'var(--color-background)' }}>
      <Container size="3">
        <Flex align="center" justify="between" py="3">

          {/* Logo */}
          <NavLink href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Flex align="center" gap="2">
              <RocketIcon width={20} height={20} />
              <Text size="4" weight="bold">Zira</Text>
            </Flex>
          </NavLink>

          {/* Botones */}
          <Flex gap="2">
            <Button variant="classic" asChild>
              <NavLink href="login">Iniciar sesión</NavLink>
            </Button>
            <Button variant="outline" asChild>
              <NavLink href="register">Registrarse</NavLink>
            </Button>
          </Flex>

        </Flex>
      </Container>
    </Box>
  )
}
import { Flex, Heading, Text, Button, Box } from '@radix-ui/themes'
import { LockClosedIcon } from '@radix-ui/react-icons'
import NavLink from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'No autorizado',
}

export default function UnauthorizedPage() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      style={{ minHeight: '100vh', textAlign: 'center', padding: '0 24px' }}
    >
      <Box
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--red-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LockClosedIcon width={36} height={36} style={{ color: 'var(--red-9)' }} />
      </Box>

      <Text size="8" weight="bold" style={{ color: 'var(--red-9)', lineHeight: 1 }}>
        401
      </Text>

      <Heading size="6">Acceso no autorizado</Heading>

      <Text color="gray" size="3" style={{ maxWidth: 400 }}>
        No tienes permiso para acceder a esta página. Inicia sesión con una cuenta válida para continuar.
      </Text>

      <Flex gap="3" mt="2">
        <Button size="3" asChild>
          <NavLink href="/login">Iniciar sesión</NavLink>
        </Button>
        <Button size="3" variant="outline" asChild>
          <NavLink href="/">Volver al inicio</NavLink>
        </Button>
      </Flex>
    </Flex>
  )
}
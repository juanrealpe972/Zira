import { Flex, Container } from '@radix-ui/themes'
import { Metadata } from 'next'
import AuthSidebar from '@/components/auth/AuthSidebar'
import SignupForm from '@/components/auth/SignupForm'
import { AppHeading } from '@/components/ui/AppHeading'
import { AppText } from '@/components/ui/AppText'
import { AppLink } from '@/components/ui/AppLink'

export const metadata: Metadata = {
  title: 'Registro',
  description: 'Crea tu cuenta',
}

export default function RegisterPage() {
  return (
    <Flex style={{ minHeight: '100vh' }}>

      {/* Panel izquierdo — mismo que login */}
      <AuthSidebar />

      {/* Panel derecho */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        className='pt-36'
        style={{ flex: 1 }}
      >
        <Container size="1" style={{ width: '100%', maxWidth: 480, padding: '0 24px' }}>

          <AppHeading size="6" mb="1">Crea tu cuenta</AppHeading>
          <Flex gap="1" mb="2">
            <AppText>¿Ya tienes cuenta?</AppText>
            <AppLink href="/login">Inicia sesión</AppLink>
          </Flex>

          <SignupForm />

        </Container>
      </Flex>

    </Flex>
  )
}
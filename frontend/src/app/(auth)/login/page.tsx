import { Flex, Container } from '@radix-ui/themes'
import { Metadata } from 'next'
import AuthSidebar from '@/components/auth/AuthSidebar'
import SigninForm from '@/components/auth/SigninForm'
import { AppHeading } from '@/components/ui/AppHeading'
import { AppText } from '@/components/ui/AppText'
import { AppLink } from '@/components/ui/AppLink'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Inicia sesión en tu cuenta',
}

export default function LoginPage() {
  return (
    <Flex style={{ minHeight: '100vh' }}>

      <AuthSidebar />

      <Flex
        direction="column"
        align="center"
        justify="center"
        className='pt-32'
        style={{ flex: 1 }}
      >
        <Container size="1" style={{ width: '100%', maxWidth: 480, padding: '0 24px' }}>

          <AppHeading size="6" mb="1">Iniciar sesión</AppHeading>
          <Flex gap="1" mb="5">
            <AppText>¿No tienes una cuenta?</AppText>
            <AppLink href="/register">Crea una</AppLink>
          </Flex>

          <SigninForm />

        </Container>
      </Flex>

    </Flex>
  )
}
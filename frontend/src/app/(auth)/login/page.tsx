// login/page.tsx
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'
import SigninForm from '@/components/auth/SigninForm'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Inicia sesión en tu cuenta',
}

export default function LoginPage() {
  return (
    <Flex
      align="center"
      justify="center"
      style={{ minHeight: '100vh', background: 'var(--gray-2)' }}
    >
      <SigninForm />
    </Flex>
  )
}
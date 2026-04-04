import AuthHeader from '@/components/auth/AuthHeader'
import { Flex } from '@radix-ui/themes'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" style={{ minHeight: '100vh' }}>
      <AuthHeader />
      {children}
    </Flex>
  )
}
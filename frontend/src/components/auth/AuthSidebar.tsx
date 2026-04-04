import { Flex, Heading, Text, Box } from '@radix-ui/themes'
import Image from 'next/image'
import loginIllustration from '@/assets/images/login-illustration.png'

export default function AuthSidebar() {
  return (
    <Flex
      direction="column"
      justify="between"
      p="6"
      style={{
        width: '38%',
        minHeight: '100vh',
        background: 'var(--gray-2)',
        borderRight: '1px solid var(--gray-4)',
      }}
    >
      {/* Texto superior */}
      <Box mt="9">
        <Heading size="7" mb="2">Hi, Welcome back</Heading>
        <Text size="3" color="gray">
          More effectively with optimized workflows.
        </Text>
      </Box>

      {/* Imagen central */}
      <Box>
        <Image
          src={loginIllustration}
          alt="Login illustration"
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </Box>

      {/* Espacio inferior */}
      <Box />
    </Flex>
  )
}
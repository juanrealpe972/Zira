import { Flex, Text, IconButton } from '@radix-ui/themes'
import { GearIcon } from '@radix-ui/react-icons'
import { AppLink } from '@/components/ui/AppLink'
import NavLink from 'next/link'

export default function AuthHeader() {
  return (
    <Flex
      align="center"
      justify="between"
      px="5"
      py="3"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}
    >
      <NavLink href="/" style={{ textDecoration: 'none' }}>
        <Text size="5" weight="bold" style={{ color: 'var(--accent-9)' }}>
          Zira
        </Text>
      </NavLink>

      <Flex align="center" gap="3">
        <AppLink href="/help">Need help?</AppLink>
        <IconButton variant="ghost" radius="full">
          <GearIcon width={18} height={18} />
        </IconButton>
      </Flex>
    </Flex>
  )
}
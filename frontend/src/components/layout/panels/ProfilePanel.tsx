'use client'
import { Flex, Text, Box, Heading, Avatar, Button, Badge } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import NavLink from 'next/link'
import { logout } from '@/services'
import { User } from '@/types'
import { Icons } from '@/components/ui'

type Props = {
  open: boolean
  onClose: () => void
  user: User | null
}

export function ProfilePanel({ open, onClose, user }: Props) {
  const router = useRouter()

  async function handleLogout() {
    await logout()
    onClose()
    router.push('/')
    router.refresh()
  }

  const menuItems = [
    {
      label: 'Mi perfil',
      href: `/dashboard/users/profile/${user?.id ?? 'me'}`,
      icon: Icons.user,
    }
  ]

  return (
    <>
      {open && (
        <Box
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 40 }}
        />
      )}
      <Box
        style={{
          position: 'fixed', top: 0, right: 0,
          height: '100vh', width: 300,
          background: 'var(--color-background)',
          borderLeft: '1px solid var(--gray-4)',
          zIndex: 50,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Flex align="center" justify="between" p="4" style={{ borderBottom: '1px solid var(--gray-4)' }}>
          <Heading size="4">Mi cuenta</Heading>
          <Box onClick={onClose} style={{ cursor: 'pointer' }}>
            <Icons.crossIcon />
          </Box>
        </Flex>

        {/* Info del usuario */}
        <Flex direction="column" align="center" gap="2" p="6" style={{ borderBottom: '1px solid var(--gray-4)' }}>
          <Box style={{ position: 'relative' }}>
            <Avatar
              size="5"
              src={user?.photo ?? undefined}
              fallback={user?.name?.[0]?.toUpperCase() ?? 'U'}
              radius="full"
              style={{ background: 'var(--accent-3)' }}
            />
            {/* Indicador activo */}
            <Box
              style={{
                position: 'absolute', bottom: 2, right: 2,
                width: 12, height: 12, borderRadius: '50%',
                background: user?.is_active ? 'var(--green-9)' : 'var(--gray-7)',
                border: '2px solid var(--color-background)',
              }}
            />
          </Box>

          <Text size="3" weight="bold">
            {user?.name ?? '—'}
          </Text>
          <Text size="2" color="gray">
            {user?.email ?? '—'}
          </Text>

          {/* Badges de rol y estado */}
          <Flex gap="2" mt="1">
            {user?.role && (
              <Badge size="1" variant="soft" color="blue" radius="full" style={{ textTransform: 'capitalize' }}>
                {user.role}
              </Badge>
            )}
            {user?.is_staff && (
              <Badge size="1" variant="soft" color="orange" radius="full">
                Staff
              </Badge>
            )}
            {user?.verified && (
              <Badge size="1" variant="soft" color="green" radius="full">
                ✓ Verificado
              </Badge>
            )}
          </Flex>
        </Flex>

        {/* Menú */}
        <Flex direction="column" p="3" gap="1" style={{ flex: 1 }}>
          {menuItems.map(({ label, href, icon: Icon }) => (
            <NavLink key={href} href={href} style={{ textDecoration: 'none' }} onClick={onClose}>
              <Flex
                align="center"
                gap="2"
                px="3"
                py="2"
                style={{
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Icon width={15} height={15} style={{ color: 'var(--gray-10)' }} />
                <Text size="2">{label}</Text>
              </Flex>
            </NavLink>
          ))}
        </Flex>

        {/* Logout */}
        <Box p="4" style={{ borderTop: '1px solid var(--gray-4)' }}>
          <Button
            variant="soft"
            color="red"
            style={{ width: '100%', cursor: 'pointer' }}
            onClick={handleLogout}
          >
            <Icons.exitIcon /> Cerrar sesión
          </Button>
        </Box>
      </Box>
    </>
  )
}
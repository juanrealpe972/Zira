'use client'

import { Flex, Text, Box, Heading, Avatar, Button } from '@radix-ui/themes'
import { Cross1Icon, PersonIcon, ExitIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import NavLink from 'next/link'

type Props = {
  open: boolean
  onClose: () => void
}

export default function ProfilePanel({ open, onClose }: Props) {
  const router = useRouter()

  function handleLogout() {
    onClose()
    router.push('/auth/login')
  }

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
          display: 'flex', flexDirection: 'column',
        }}
      >
        <Flex align="center" justify="between" p="4" style={{ borderBottom: '1px solid var(--gray-4)' }}>
          <Heading size="4">Mi cuenta</Heading>
          <Box onClick={onClose} style={{ cursor: 'pointer' }}><Cross1Icon /></Box>
        </Flex>

        <Flex direction="column" align="center" gap="2" p="6" style={{ borderBottom: '1px solid var(--gray-4)' }}>
          <Avatar size="5" fallback={<PersonIcon />} radius="full" />
          <Text size="3" weight="bold">Juan Realpe</Text>
          <Text size="2" color="gray">demo@zira.cc</Text>
        </Flex>

        <Flex direction="column" p="3" gap="1" style={{ flex: 1 }}>
          {[
            { label: 'Mi perfil', href: '/dashboard/profile' },
            { label: 'Configuración', href: '/dashboard/settings' },
          ].map(({ label, href }) => (
            <NavLink key={href} href={href} style={{ textDecoration: 'none' }} onClick={onClose}>
              <Box px="3" py="2" style={{ borderRadius: 8, cursor: 'pointer' }}>
                <Text size="2">{label}</Text>
              </Box>
            </NavLink>
          ))}
        </Flex>

        <Box p="4" style={{ borderTop: '1px solid var(--gray-4)' }}>
          <Button variant="soft" color="red" style={{ width: '100%' }} onClick={handleLogout}>
            <ExitIcon /> Cerrar sesión
          </Button>
        </Box>
      </Box>
    </>
  )
}
'use client'

import { Box, Flex, Text, Avatar, DropdownMenu, IconButton, Container } from '@radix-ui/themes'
import { RocketIcon, BellIcon, PersonIcon, GearIcon, ExitIcon } from '@radix-ui/react-icons'
import NavLink from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardHeader() {
  const router = useRouter()

  function handleLogout() {
    // Por ahora limpia y redirige — luego conectamos con el token
    router.push('/login')
  }

  return (
    <Box
      style={{
        borderBottom: '1px solid var(--gray-4)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'var(--color-background)',
      }}
    >
      <Container size="4">
        <Flex align="center" justify="between" py="3">

          {/* Logo */}
          <NavLink href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Flex align="center" gap="2">
              <RocketIcon width={20} height={20} />
              <Text size="4" weight="bold">Zira</Text>
            </Flex>
          </NavLink>

          {/* Derecha */}
          <Flex align="center" gap="3">

            {/* Notificaciones */}
            <IconButton variant="ghost" radius="full" size="2">
              <BellIcon width={18} height={18} />
            </IconButton>

            {/* Avatar + Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Flex align="center" gap="2" style={{ cursor: 'pointer' }}>
                  <Avatar
                    size="2"
                    fallback={<PersonIcon />}
                    radius="full"
                    style={{ background: 'var(--accent-9)' }}
                  />
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="2" weight="medium">Juan Realpe</Text>
                    <Text size="1" color="gray">juan@gmail.com</Text>
                  </Box>
                </Flex>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content align="end" sideOffset={8}>
                <DropdownMenu.Item asChild>
                  <NavLink href="/dashboard/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Flex align="center" gap="2">
                      <PersonIcon />
                      Mi perfil
                    </Flex>
                  </NavLink>
                </DropdownMenu.Item>

                <DropdownMenu.Item asChild>
                  <NavLink href="/dashboard/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Flex align="center" gap="2">
                      <GearIcon />
                      Configuración
                    </Flex>
                  </NavLink>
                </DropdownMenu.Item>

                <DropdownMenu.Separator />

                <DropdownMenu.Item color="red" onClick={handleLogout}>
                  <Flex align="center" gap="2">
                    <ExitIcon />
                    Cerrar sesión
                  </Flex>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>

          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
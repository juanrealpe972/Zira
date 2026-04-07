'use client'

import { useState } from 'react'
import { Flex, Text, Avatar, IconButton, DropdownMenu, Box } from '@radix-ui/themes'
import {
  BellIcon, GearIcon, PersonIcon,
  MagnifyingGlassIcon, GlobeIcon,
  ChevronDownIcon,
} from '@radix-ui/react-icons'
import NotificationsPanel from './panels/NotificationsPanel'
import SettingsPanel from './panels/SettingsPanel'
import ProfilePanel from './panels/ProfilePanel'

const teams = [
  { name: 'Equipo 1', plan: 'Gratis' },
  { name: 'Equipo 2', plan: 'Pro' },
  { name: 'Equipo 3', plan: 'Pro' },
]

const languages = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
]

export default function DashboardHeader() {
  const [notifOpen, setNotifOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [currentTeam, setCurrentTeam] = useState(teams[0])
  const [currentLang, setCurrentLang] = useState(languages[0])

  return (
    <>
      <Flex
        align="center"
        justify="between"
        px="5"
        py="3"
        style={{
          borderBottom: '1px solid var(--gray-4)',
          background: 'var(--color-background)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        {/* Izquierda — selector de equipo */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Flex
              align="center"
              gap="2"
              px="3"
              py="1"
              style={{
                border: '1px solid var(--gray-4)',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              <Text size="2" weight="medium">{currentTeam.name}</Text>
              <ChevronDownIcon />
            </Flex>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {teams.map((team) => (
              <DropdownMenu.Item key={team.name} onClick={() => setCurrentTeam(team)}>
                <Flex justify="between" align="center" gap="4">
                  <Text size="2">{team.name}</Text>
                  <Text size="1" color={team.plan === 'Pro' ? 'amber' : 'gray'}>{team.plan}</Text>
                </Flex>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* Derecha — acciones */}
        <Flex align="center" gap="2">

          {/* Idiomas */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost" size="2">
                <GlobeIcon width={18} height={18} />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              {languages.map((lang) => (
                <DropdownMenu.Item
                  key={lang.code}
                  onClick={() => setCurrentLang(lang)}
                >
                  <Flex align="center" gap="2">
                    <Text size="2">{lang.label}</Text>
                    {currentLang.code === lang.code && (
                      <Text size="1" color="green">✓</Text>
                    )}
                  </Flex>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Notificaciones */}
          <IconButton variant="ghost" size="2" onClick={() => setNotifOpen(true)}>
            <BellIcon width={18} height={18} />
          </IconButton>

          {/* Configuración */}
          <IconButton variant="ghost" size="2" onClick={() => setSettingsOpen(true)}>
            <GearIcon width={18} height={18} />
          </IconButton>

          {/* Perfil */}
          <Box onClick={() => setProfileOpen(true)} style={{ cursor: 'pointer' }}>
            <Avatar
              size="2"
              fallback={<PersonIcon />}
              radius="full"
              style={{ background: 'var(--accent-9)' }}
            />
          </Box>

        </Flex>
      </Flex>

      {/* Paneles laterales */}
      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <ProfilePanel open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  )
}
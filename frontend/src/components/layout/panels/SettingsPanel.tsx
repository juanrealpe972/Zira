'use client'

import { Flex, Text, Box, Heading, Switch } from '@radix-ui/themes'
import { Cross1Icon, GearIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

export default function SettingsPanel({ open, onClose }: Props) {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

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
          height: '100vh', width: 360,
          background: 'var(--color-background)',
          borderLeft: '1px solid var(--gray-4)',
          zIndex: 50,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <Flex align="center" justify="between" p="4" style={{ borderBottom: '1px solid var(--gray-4)' }}>
          <Flex align="center" gap="2">
            <GearIcon />
            <Heading size="4">Configuración</Heading>
          </Flex>
          <Box onClick={onClose} style={{ cursor: 'pointer' }}><Cross1Icon /></Box>
        </Flex>

        <Flex direction="column" gap="4" p="4">
          <Flex justify="between" align="center">
            <Text size="2">Modo oscuro</Text>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </Flex>
          <Flex justify="between" align="center">
            <Text size="2">Notificaciones</Text>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
'use client'

import { Flex, IconButton } from '@radix-ui/themes'
import { useState, useCallback } from 'react'
import NavLink from 'next/link'
import { ZiraLogo, Icons, AppLink } from '@/components/ui'
import { SettingsPanel } from '@/components/layout/panels'

export default function AuthHeader() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const openSettings = useCallback(() => setSettingsOpen(true), [])
  const closeSettings = useCallback(() => setSettingsOpen(false), [])

  return (
    <Flex
      align="center"
      justify="between"
      px="5"
      py="3"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}
    >
      <NavLink href="/" style={{ textDecoration: 'none' }}>
        <Flex align="center" gap="2">
          <ZiraLogo size={28} />
        </Flex>
      </NavLink>

      <Flex align="center" gap="3">
        <AppLink href="/help">Need help?</AppLink>
        <IconButton
          variant="ghost"
          size="2"
          onClick={openSettings}
          aria-label="Abrir configuración"
        >
          <Icons.settings />
        </IconButton>
      </Flex>
      <SettingsPanel open={settingsOpen} onClose={closeSettings} />
    </Flex>
  )
}
'use client'

import { useState, useCallback } from 'react'
import { Box, Flex, Container } from '@radix-ui/themes'
import Link from 'next/link'
import { ZiraLogo, AppButton, AppIcon } from '@/components/ui'
import { SettingsPanel } from '@/components/layout'

export function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const openSettings = useCallback(() => setSettingsOpen(true), [])
  const closeSettings = useCallback(() => setSettingsOpen(false), [])

  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'var(--color-background)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--gray-4)',
        boxShadow: '0 1px 0 var(--gray-5)',
      }}
    >
      <Container size="3">
        <Flex align="center" justify="between" py="3">

          <Flex align="center" gap="2">
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <ZiraLogo size={30} />
            </Link>
          </Flex>

          <Flex gap="2" align="center">
            <AppButton variant="ghost" onClick={openSettings}>
              <AppIcon name="settings" size={20} />
            </AppButton>

            <AppButton asChild>
              <Link href="/login">Iniciar sesión</Link>
            </AppButton>
          </Flex>
        </Flex>

        <SettingsPanel open={settingsOpen} onClose={closeSettings} />
      </Container>
    </Box>
  )
}
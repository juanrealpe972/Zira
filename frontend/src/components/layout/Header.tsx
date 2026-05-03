'use client'

import { Box, Flex, Button, Container, IconButton } from '@radix-ui/themes'
import Link from 'next/link'
import { ZiraLogo, Icons } from '@/components/ui'
import { useState, useCallback } from 'react'
import { SettingsPanel } from '@/components/layout/panels'

export default function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const openSettings = useCallback(() => setSettingsOpen(true), [])
  const closeSettings = useCallback(() => setSettingsOpen(false), [])

  return (
    <Box
      style={{
        borderBottom: '1px solid var(--gray-4)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--color-background)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <Container size="3">
        <Flex align="center" justify="between" py="3">

          <Flex align="center" gap="2">
            <ZiraLogo size={28} />
          </Flex>

          <Flex gap="2" align="center">
            
            <IconButton
              variant="ghost"
              size="2"
              onClick={openSettings}
              aria-label="Abrir configuración"
            >
              <Icons.settings />
            </IconButton>

            <Button variant="classic" asChild>
              <Link href="/login">Iniciar sesión</Link>
            </Button>

          </Flex>
        </Flex>

        <SettingsPanel open={settingsOpen} onClose={closeSettings} />
      </Container>
    </Box>
  )
}
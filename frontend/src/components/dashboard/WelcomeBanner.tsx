'use client'
import { useTheme } from '@/context/ThemeContext'
import { Card, Flex, Box, Text, Heading, Button } from '@radix-ui/themes'

export function WelcomeBanner() {
  const { theme } = useTheme()
  const isDark = theme.appearance === 'dark'

  const gradients = {
    dark: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f4c3a 100%)',
    light: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 60%, #d1fae5 100%)',
  }

  const textColors = {
    dark: { primary: 'white', secondary: '#94a3b8' },
    light: { primary: '#0f172a', secondary: '#475569' },
  }

  const colors = textColors[isDark ? 'dark' : 'light']

  return (
    <Card
      mb="5"
      style={{
        background: gradients[isDark ? 'dark' : 'light'],
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 160,
        border: isDark ? 'none' : '1px solid var(--gray-4)',
      }}
    >
      <Flex justify="between" align="center">
        <Box>
          <Text size="3" style={{ color: colors.secondary }}>
            Bienvenido de nuevo 👋
          </Text>
          <Heading size="7" mt="1" style={{ color: colors.primary }}>
            Juan Realpe
          </Heading>
          <Text
            size="2"
            mt="2"
            style={{ color: colors.secondary, display: 'block', maxWidth: 320 }}
          >
            Gestiona tu plataforma desde aquí. Todos tus datos actualizados en tiempo real.
          </Text>
          <Button
            mt="4"
            size="2"
            style={{
              background: 'var(--accent-9)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Ver ahora
          </Button>
        </Box>

        {/* Decoración */}
        <Box
          style={{
            opacity: isDark ? 0.15 : 0.2,
            position: 'absolute',
            right: 40,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 120,
          }}
        >
          📊
        </Box>
      </Flex>
    </Card>
  )
}
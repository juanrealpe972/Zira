'use client'

import { Flex, Text, Box, Heading } from '@radix-ui/themes'
import { Cross1Icon, GearIcon, SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useTheme } from '@/context/ThemeContext'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

const accentColors = [
  { value: 'indigo', bg: '#6366f1' },
  { value: 'blue', bg: '#3b82f6' },
  { value: 'cyan', bg: '#06b6d4' },
  { value: 'teal', bg: '#14b8a6' },
  { value: 'green', bg: '#22c55e' },
  { value: 'orange', bg: '#f97316' },
  { value: 'red', bg: '#ef4444' },
  { value: 'pink', bg: '#ec4899' },
  { value: 'violet', bg: '#8b5cf6' },
  { value: 'amber', bg: '#f59e0b' },
] as const

const fontOptions = [
  { value: 'inter', label: 'Inter' },
  { value: 'dm-sans', label: 'DM Sans' },
  { value: 'nunito', label: 'Nunito' },
  { value: 'public-sans', label: 'Public Sans' },
] as const

const radiusOptions = [
  { value: 'none', label: 'None' },
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'full', label: 'Full' },
] as const

export default function SettingsPanel({ open, onClose }: Props) {
  const {
    theme,
    setAppearance,
    setAccentColor,
    setFontFamily,
    setRadius,
    setScaling,
  } = useTheme()

  const [visible, setVisible] = useState(open)

  useEffect(() => {
    if (open) {
      setVisible(true)
    } else {
      const timeout = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [open])

  if (!visible) return null

  return (
    <>
      <Box
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          zIndex: 40,
          opacity: open ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      <Box
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 320,
          background: 'var(--color-background)',
          borderLeft: '1px solid var(--gray-4)',
          zIndex: 50,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <Flex
          align="center"
          justify="between"
          p="4"
          style={{ borderBottom: '1px solid var(--gray-4)', flexShrink: 0 }}
        >
          <Flex align="center" gap="2">
            <GearIcon />
            <Heading size="4">Configuración</Heading>
          </Flex>
          <Box onClick={onClose} style={{ cursor: 'pointer' }}>
            <Cross1Icon />
          </Box>
        </Flex>

        <Flex direction="column" gap="5" p="4">

          <Box>
            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Modo
            </Text>
            <Flex gap="2" mt="2">
              {(['light', 'dark'] as const).map((mode) => (
                <Box
                  key={mode}
                  onClick={() => setAppearance(mode)}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    borderRadius: 8,
                    border: `2px solid ${theme.appearance === mode ? 'var(--accent-9)' : 'var(--gray-4)'}`,
                    background: mode === 'dark' ? '#1a1a2e' : '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {mode === 'light'
                    ? <SunIcon width={20} height={20} style={{ color: '#f59e0b' }} />
                    : <MoonIcon width={20} height={20} style={{ color: '#818cf8' }} />
                  }
                  <Text size="1" style={{ color: mode === 'dark' ? '#fff' : '#1e293b' }}>
                    {mode === 'light' ? 'Claro' : 'Oscuro'}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>

          <Box>
            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Color
            </Text>
            <Flex gap="2" mt="2" wrap="wrap">
              {accentColors.map(({ value, bg }) => (
                <Box
                  key={value}
                  onClick={() => setAccentColor(value)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: bg,
                    cursor: 'pointer',
                    border: theme.accentColor === value
                      ? '3px solid var(--gray-12)'
                      : '3px solid transparent',
                    transition: 'border-color 0.15s',
                    boxSizing: 'border-box',
                  }}
                />
              ))}
            </Flex>
          </Box>

          <Box>
            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Bordes
            </Text>
            <Flex gap="2" mt="2" wrap="wrap">
              {radiusOptions.map(({ value, label }) => (
                <Box
                  key={value}
                  onClick={() => setRadius(value)}
                  style={{
                    padding: '4px 10px',
                    borderRadius:
                      value === 'none' ? 0 :
                        value === 'small' ? 4 :
                          value === 'medium' ? 8 :
                            value === 'large' ? 12 : 999,
                    border: `1px solid ${theme.radius === value ? 'var(--accent-9)' : 'var(--gray-6)'}`,
                    cursor: 'pointer',
                    background: theme.radius === value ? 'var(--accent-3)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <Text size="1">{label}</Text>
                </Box>
              ))}
            </Flex>
          </Box>

 {/*          <Box>
            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Fuente
            </Text>
            <Flex direction="column" gap="2" mt="2">
              {fontOptions.map(({ value, label }) => (
                <Box
                  key={value}
                  onClick={() => setFontFamily(value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: `1px solid ${theme.fontFamily === value ? 'var(--accent-9)' : 'var(--gray-4)'}`,
                    background: theme.fontFamily === value ? 'var(--accent-3)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    fontFamily: label,
                  }}
                >
                  <Text size="2" weight={theme.fontFamily === value ? 'bold' : 'regular'}>
                    {label}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box> */}

          <Box>
            <Flex justify="between" align="center" mb="2">
              <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Tamaño
              </Text>
              <Text size="1" color="gray">{theme.scaling}</Text>
            </Flex>

            <input
              type="range"
              min={0}
              max={4}
              value={['90%', '95%', '100%', '105%', '110%'].indexOf(theme.scaling)}
              onChange={(e) => {
                const values = ['90%', '95%', '100%', '105%', '110%'] as const
                setScaling(values[Number(e.target.value)])
              }}
              style={{ width: '100%', accentColor: 'var(--accent-9)' }}
            />

            <Flex justify="between">
              <Text size="1" color="gray">90%</Text>
              <Text size="1" color="gray">110%</Text>
            </Flex>
          </Box>

        </Flex>
      </Box>
    </>
  )
}
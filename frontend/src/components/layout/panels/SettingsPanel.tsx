'use client'

import { Flex, Text, Box, Heading } from '@radix-ui/themes'
import { AppSwitch, Icons } from '@/components/ui'
import { useTheme } from '@/context/ThemeContext'
import { useEffect, useRef, useState } from 'react'
import { SettingsCard } from './SettingsCard'

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

export function SettingsPanel({ open, onClose }: Props) {
  const { theme, setAppearance, setAccentColor, setFontFamily, setRadius } = useTheme()
  const [visible, setVisible] = useState(open)
  const panelRef = useRef<HTMLDivElement>(null)
  const [showScroll, setShowScroll] = useState(false)
  let timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function handleMouseEnter() {
    setShowScroll(true)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setShowScroll(false)
    }, 1000)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      setVisible(true)
    } else {
      const timeout = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
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
          zIndex: 40,
          background: 'rgba(0,0,0,0.3)',
          opacity: open ? 0 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      <Box
        ref={panelRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`custom-scroll ${showScroll ? '' : 'scroll-hidden'}`}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 320,
          background: 'var(--color-background)',
          borderLeft: '1px solid var(--gray-4)',
          willChange: 'transform',
          contain: 'layout style',
          fontFamily: 'var(--default-font)',
          fontSize: '16px',
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
            <Icons.settings />
            <Heading size="4">Configuración</Heading>
          </Flex>
          <Box onClick={onClose} style={{ cursor: 'pointer' }}>
            <Icons.crossIcon />
          </Box>
        </Flex>

        <Flex direction="column" gap="5" p="4">

          <Box>
            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Modo
            </Text>
            <SettingsCard>
              <Flex align="center" justify="between">

                <Flex align="center" gap="3">
                  <Box
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'var(--accent-3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {theme.appearance === 'dark' ? <Icons.moonIcon /> : <Icons.sunIcon />}
                  </Box>

                  <Flex direction="column">
                    <Text size="2" weight="bold">Modo</Text>
                    <Text size="1" color="gray">
                      {theme.appearance === 'dark' ? 'Oscuro' : 'Claro'}
                    </Text>
                  </Flex>
                </Flex>

                <AppSwitch
                  checked={theme.appearance === 'dark'}
                  onChange={(v) => setAppearance(v ? 'dark' : 'light')}
                />
              </Flex>
            </SettingsCard>
          </Box>

          <Box>
            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Color
            </Text>
            <SettingsCard>
              <Flex gap="2" wrap="wrap" justify='center'>
                {accentColors.map(({ value, bg }) => (
                  <Box
                    key={value}
                    onClick={() => setAccentColor(value)}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 10,
                      border: theme.accentColor === value
                        ? '2px solid var(--accent-9)'
                        : '1px solid var(--gray-4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Box
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: bg,
                      }}
                    />
                  </Box>
                ))}
              </Flex>
            </SettingsCard>
          </Box>

          <Box>
            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Bordes
            </Text>
            <SettingsCard>
              <Flex gap="2" wrap="wrap" justify='center'>
                {radiusOptions.map(({ value, label }) => {
                  const active = theme.radius === value

                  return (
                    <Box
                      key={value}
                      onClick={() => setRadius(value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius:
                          value === 'none' ? 0 :
                            value === 'small' ? 4 :
                              value === 'medium' ? 8 :
                                value === 'large' ? 12 : 999,
                        border: '2px solid',
                        borderColor: active ? 'var(--accent-9)' : 'var(--accent-6)',
                        background: active ? 'var(--accent-3)' : 'var(--accent-1)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Text size="1">{label}</Text>
                    </Box>
                  )
                })}
              </Flex>
            </SettingsCard>
          </Box>

          <Box>
            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Fuente
            </Text>
            <SettingsCard>
              <Flex gap="2" wrap="wrap" justify='center'>
                {fontOptions.map(({ value, label }) => (
                  <Box
                    key={value}
                    onClick={() => setFontFamily(value)}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      border: theme.fontFamily === value
                        ? '2px solid var(--accent-9)'
                        : '1px solid var(--gray-4)',
                      cursor: 'pointer',
                      minWidth: 80,
                      textAlign: 'center',
                      fontFamily: label,
                    }}
                  >
                    <Flex align="center" direction="column" justify="center" mb="1">
                      <Text size="3">Aa</Text>
                      <Text size="1">{label}</Text>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </SettingsCard>
          </Box>

        </Flex>
      </Box>
    </>
  )
}
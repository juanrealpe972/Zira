// SigninForm.tsx
'use client'

import { useState } from 'react'
import { Flex, Text, Box, Card, Heading, Separator } from '@radix-ui/themes'
import { AppButton, AppToast, Icons } from '@/components/ui'
import { login } from '@/services'
import { useRouter } from 'next/navigation'
import { TextField, Text as RadixText } from '@radix-ui/themes'

const DEFAULT_EMAIL = process.env.NEXT_PUBLIC_DEV_EMAIL ?? 'juanrealpe972@gmail.com'
const DEFAULT_PASSWORD = process.env.NEXT_PUBLIC_DEV_PASSWORD ?? '123456'

// Credenciales del invitado
const GUEST_EMAIL = process.env.NEXT_PUBLIC_GUEST_EMAIL ?? 'demo@zira.cc'
const GUEST_PASSWORD = process.env.NEXT_PUBLIC_GUEST_PASSWORD ?? 'demo123'

export default function SigninForm() {
  const router = useRouter()
  const [email, setEmail] = useState(DEFAULT_EMAIL)
  const [password, setPassword] = useState(DEFAULT_PASSWORD)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin(emailVal: string, passwordVal: string, isGuest = false) {
    setError(null)
    if (isGuest) setGuestLoading(true)
    else setLoading(true)

    try {
      await login({ email: emailVal, password: passwordVal })
      setToastMessage(isGuest ? '¡Bienvenido, invitado!' : '¡Sesión iniciada correctamente!')
      setToastOpen(true)
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
    } finally {
      setLoading(false)
      setGuestLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await handleLogin(email, password)
  }

  async function handleGuest() {
    await handleLogin(GUEST_EMAIL, GUEST_PASSWORD, true)
  }

  return (
    <>
      <Card
        size="4"
        style={{
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          border: '1px solid var(--gray-4)',
        }}
      >
        {/* Header */}
        <Flex direction="column" align="center" gap="1" mb="5">
          <Box
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'var(--accent-9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            }}
          >
            <Icons.security width={24} height={24} style={{ color: 'white' }} />
          </Box>
          <Heading size="5" style={{ textAlign: 'center' }}>
            Bienvenido a Zira
          </Heading>
          <Text size="2" color="gray" style={{ textAlign: 'center' }}>
            Ingresa tus credenciales para continuar
          </Text>
        </Flex>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">

            {/* Email */}
            <Box>
              <RadixText size="2" weight="medium" style={{ display: 'block', marginBottom: 4 }}>
                Email
              </RadixText>
              <TextField.Root
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                size="2"
                radius="medium"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              >
                <TextField.Slot>
                  <Icons.mail width={14} />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            {/* Contraseña */}
            <Box>
              <Flex justify="between" align="center" mb="1">
                <RadixText size="2" weight="medium">Contraseña</RadixText>
                <Text
                  size="1"
                  style={{ color: 'var(--accent-9)', cursor: 'pointer' }}
                  onClick={() => { }}
                >
                  ¿Olvidaste tu contraseña?
                </Text>
              </Flex>
              <TextField.Root
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                size="2"
                radius="medium"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              >
                <TextField.Slot>
                  <Icons.security width={14} />
                </TextField.Slot>
                <TextField.Slot>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--gray-9)',
                      padding: 0,
                    }}
                  >
                    {showPassword
                      ? <Icons.eyeClosedIcon width={14} />
                      : <Icons.eyeOpenIcon width={14} />
                    }
                  </button>
                </TextField.Slot>
              </TextField.Root>
            </Box>

            {/* Error */}
            {error && (
              <Flex
                align="center"
                gap="2"
                p="3"
                style={{
                  borderRadius: 8,
                  background: 'var(--red-3)',
                  border: '1px solid var(--red-6)',
                }}
              >
                <Icons.error width={14} style={{ color: 'var(--red-9)', flexShrink: 0 }} />
                <Text size="2" style={{ color: 'var(--red-11)' }}>{error}</Text>
              </Flex>
            )}

            {/* Botón principal */}
            <AppButton
              type="submit"
              disabled={loading || guestLoading}
              style={{ width: '100%', marginTop: 4 }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </AppButton>

          </Flex>
        </form>

        <Flex align="center" justify="center" gap="3" my="4">
          <Separator size="4" style={{ flex: 1 }} />
          <span style={{ whiteSpace: 'nowrap' }}>O puedes continuar como:</span>
          <Separator size="4" style={{ flex: 1 }} />
        </Flex>

        {/* Continuar como invitado */}
        <Flex direction="column" gap="2">
          {/* Info credenciales invitado */}
          <Box
            p="2"
            style={{
              borderRadius: 6,
              background: 'var(--gray-2)',
              border: '1px solid var(--gray-4)',
              textAlign: 'center',
            }}
          >
            <Text size="1" color="gray">
              Invitado: <strong>{GUEST_EMAIL}</strong> / <strong>{GUEST_PASSWORD}</strong>
            </Text>
          </Box>

          <AppButton
            variant="outline"
            disabled={loading || guestLoading}
            onClick={handleGuest}
            style={{ width: '100%' }}
          >
            {guestLoading ? 'Entrando...' : '👤 Continuar como invitado'}
          </AppButton>
        </Flex>

      </Card>

      <AppToast
        open={toastOpen}
        onOpenChange={setToastOpen}
        message={toastMessage}
        type="success"
      />
    </>
  )
}
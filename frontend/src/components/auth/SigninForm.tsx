'use client'

import { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon, ExclamationTriangleIcon, EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { AppButton } from '@/components/ui/AppButton'
import { AppToast } from '@/components/ui/AppToast'
import { login } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { TextField, Text as RadixText } from '@radix-ui/themes'
import { AppTextField } from '../ui/AppTextField'

const DEFAULT_EMAIL = 'camilo2@gmail.com'
const DEFAULT_PASSWORD = '123456'

export default function SigninForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const data = await login({ email, password })
      console.log('Tokens:', data)
      setToastOpen(true)
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error inesperado')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="3" mt="4">

          <AppTextField
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Ingresa tu email"
            icon={<EnvelopeClosedIcon />}
            defaultValue={DEFAULT_EMAIL}
            required
          />

          <label htmlFor="password" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <RadixText size="2" weight="medium">Contraseña</RadixText>
            <TextField.Root
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              size="2"
              radius="medium"
              defaultValue={DEFAULT_PASSWORD}
              required
            >
              <TextField.Slot>
                <LockClosedIcon />
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
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </TextField.Slot>
            </TextField.Root>
          </label>

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
              <ExclamationTriangleIcon style={{ color: 'var(--red-9)', flexShrink: 0 }} />
              <Text size="2" style={{ color: 'var(--red-11)' }}>{error}</Text>
            </Flex>
          )}

          <AppButton type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </AppButton>

        </Flex>
      </form>

      <AppToast
        open={toastOpen}
        onOpenChange={setToastOpen}
        message="¡Sesión iniciada correctamente!"
        type="success"
      />
    </>
  )
}
'use client'

import { useState } from 'react'
import { Flex, Text, TextField } from '@radix-ui/themes'
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
  ExclamationTriangleIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from '@radix-ui/react-icons'
import { AppButton } from '@/components/ui/AppButton'
import { AppTextField } from '@/components/ui/AppTextField'
import { AppToast } from '@/components/ui/AppToast'
import { register } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { Text as RadixText } from '@radix-ui/themes'

export default function SignupForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      await register({ name, email, password })
      setToastOpen(true)
      setTimeout(() => router.push('/login'), 1500)
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

          {/* Nombre */}
          <AppTextField
            id="name"
            name="name"
            type="text"
            label="Nombre"
            placeholder="Ingresa tu nombre"
            icon={<PersonIcon />}
            required
          />

          {/* Email */}
          <AppTextField
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Ingresa tu email"
            icon={<EnvelopeClosedIcon />}
            required
          />

          {/* Password */}
          <label htmlFor="password" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <RadixText size="2" weight="medium">Contraseña</RadixText>
            <TextField.Root
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Crea una contraseña"
              size="2"
              radius="medium"
              required
            >
              <TextField.Slot><LockClosedIcon /></TextField.Slot>
              <TextField.Slot>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--gray-9)', padding: 0 }}
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </TextField.Slot>
            </TextField.Root>
          </label>

          {/* Confirmar password */}
          <label htmlFor="confirmPassword" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <RadixText size="2" weight="medium">Confirmar contraseña</RadixText>
            <TextField.Root
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirma tu contraseña"
              size="2"
              radius="medium"
              required
            >
              <TextField.Slot><LockClosedIcon /></TextField.Slot>
              <TextField.Slot>
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--gray-9)', padding: 0 }}
                >
                  {showConfirm ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </TextField.Slot>
            </TextField.Root>
          </label>

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
              <ExclamationTriangleIcon style={{ color: 'var(--red-9)', flexShrink: 0 }} />
              <Text size="2" style={{ color: 'var(--red-11)' }}>{error}</Text>
            </Flex>
          )}

          <AppButton type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </AppButton>

        </Flex>
      </form>

      <AppToast
        open={toastOpen}
        onOpenChange={setToastOpen}
        message="¡Cuenta creada correctamente! Redirigiendo..."
        type="success"
      />
    </>
  )
}
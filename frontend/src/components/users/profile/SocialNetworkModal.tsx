'use client'

import { useState, useEffect } from 'react'
import { Flex, TextField, Select } from '@radix-ui/themes'
import { Icons } from '@/components/ui/icons/icons'
import { FormField } from '@/components/ui/FormField'
import { StepModal } from '@/components/ui/StepModal'
import {
  createSocialNetwork,
  updateSocialNetwork,
  SocialNetwork,
  SocialNetworkRequest,
} from '@/services/social-networks.service'

const PLATFORMS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'github', label: 'GitHub' },
  { value: 'otro', label: 'Otro' },
]

type Props = {
  open: boolean
  onClose: () => void
  userId: number
  existing?: SocialNetwork | null
  onSaved: (social: SocialNetwork) => void
}

const EMPTY = { platform: '', url: '', username: '' }
type FormErrors = Partial<Record<keyof typeof EMPTY, string>>

export function SocialNetworkModal({ open, onClose, userId, existing, onSaved }: Props) {
  const isEdit = !!existing
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    if (open && existing) {
      setForm({
        platform: existing.platform,
        url: existing.url,
        username: existing.username,
      })
    } else if (open) {
      setForm(EMPTY)
    }
    setErrors({})
    setApiError(null)
  }, [open, existing])

  function update(key: keyof typeof EMPTY, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
    setApiError(null)
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!form.platform) {
      newErrors.platform = 'Selecciona una plataforma'
    }

    if (!form.url.trim()) {
      newErrors.url = 'La URL es obligatoria'
    } else {
      try {
        const url = new URL(form.url)
        if (!url.hostname.includes('.') || url.hostname.length < 4) {
          newErrors.url = 'Ingresa una URL válida. Ej: https://facebook.com/usuario'
        }
        if (!['http:', 'https:'].includes(url.protocol)) {
          newErrors.url = 'La URL debe usar http:// o https://'
        }
      } catch {
        newErrors.url = 'La URL no es válida. Ej: https://facebook.com/usuario'
      }
    }

    if (!form.username.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio'
    } else if (form.username.length < 2) {
      newErrors.username = 'El nombre debe tener al menos 2 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    setApiError(null)
    try {
      const payload: SocialNetworkRequest = {
        user: userId,
        platform: form.platform,
        url: form.url.trim(),
        username: form.username.trim(),
      }
      const result = isEdit
        ? await updateSocialNetwork(existing!.id, payload)
        : await createSocialNetwork(payload)

      onSaved(result)
      setToastMessage(isEdit ? '¡Red social actualizada!' : '¡Red social agregada!')
      setToastType('success')
      setToastOpen(true)
      setTimeout(() => handleClose(), 1500)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error inesperado'

      const friendlyMsg =
        msg.includes('400') ? 'Datos inválidos, verifica la URL y el usuario' :
          msg.includes('401') ? 'No tienes permiso para realizar esta acción' :
            msg.includes('409') ? 'Esta red social ya está registrada' :
              msg 

      setApiError(friendlyMsg)
      setToastMessage(friendlyMsg)
      setToastType('error')
      setToastOpen(true)
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    setForm(EMPTY)
    setErrors({})
    setApiError(null)
    onClose()
  }

  return (
    <StepModal
      open={open}
      onClose={handleClose}
      title={isEdit ? 'Editar red social' : 'Agregar red social'}
      steps={[{ label: 'Datos', description: 'Plataforma, URL y nombre de usuario' }]}
      currentStep={0}
      loading={loading}
      apiError={apiError}
      toastOpen={toastOpen}
      toastMessage={toastMessage}
      toastType={toastType}
      onToastChange={setToastOpen}
      onNext={() => { }}
      onBack={() => { }}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? 'Actualizar' : 'Agregar'}
    >
      <Flex direction="column" gap="3">

        <FormField label="Plataforma" error={errors.platform} required>
          <Select.Root value={form.platform} onValueChange={v => update('platform', v)}>
            <Select.Trigger placeholder="Selecciona una plataforma" style={{ width: '100%' }} />
            <Select.Content>
              {PLATFORMS.map(p => (
                <Select.Item key={p.value} value={p.value}>
                  <Flex align="center" gap="2">
                    <Icons.share width={12} style={{ color: 'var(--accent-9)' }} />
                    {p.label}
                  </Flex>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormField>

        <FormField label="URL" error={errors.url} required hint="Ej: https://facebook.com/usuario">
          <TextField.Root
            value={form.url}
            onChange={e => update('url', e.target.value)}
            placeholder="https://..."
            size="2"
          >
            <TextField.Slot>
              <Icons.share width={13} style={{ color: 'var(--gray-9)' }} />
            </TextField.Slot>
          </TextField.Root>
        </FormField>

        <FormField label="Nombre de usuario" error={errors.username} required>
          <TextField.Root
            value={form.username}
            onChange={e => update('username', e.target.value)}
            placeholder="@usuario"
            size="2"
          >
            <TextField.Slot>
              <Icons.user width={13} style={{ color: 'var(--gray-9)' }} />
            </TextField.Slot>
          </TextField.Root>
        </FormField>

      </Flex>
    </StepModal>
  )
}
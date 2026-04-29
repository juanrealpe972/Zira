'use client'

import { useState, useEffect } from 'react'
import { Flex, TextField, Select, Box } from '@radix-ui/themes'
import { Icons } from '@/components/ui/icons/icons'
import { FormField } from '@/components/ui/FormField'
import { StepModal } from '@/components/ui/StepModal'
import {
  Saving, SavingRequest,
  createSaving, updateSaving,
} from '@/services/savings.service'
import { getBankAccounts, BankAccount } from '@/services/bank-accounts.service'

const STATUS_OPTIONS = [
  { value: 'activo', label: 'Activo' },
  { value: 'completado', label: 'Completado' },
  { value: 'cancelado', label: 'Cancelado' },
]

type Props = {
  open: boolean
  onClose: () => void
  userId: number
  existing?: Saving | null
  onSaved: (saving: Saving) => void
}

const EMPTY = {
  bank_account: '',
  goal_name: '',
  target_amount: '',
  current_amount: '',
  interest_rate: '',
  start_date: '',
  target_date: '',
  status: 'activo' as const,
}
type FormErrors = Partial<Record<keyof typeof EMPTY, string>>

export function SavingModal({ open, onClose, userId, existing, onSaved }: Props) {
  const isEdit = !!existing
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [accounts, setAccounts] = useState<BankAccount[]>([])

  useEffect(() => {
    if (open) {
      getBankAccounts(userId).then(setAccounts).catch(() => {})
    }
  }, [open, userId])

  useEffect(() => {
    if (open && existing) {
      setForm({
        bank_account: String(existing.bank_account),
        goal_name: existing.goal_name,
        target_amount: String(existing.target_amount),
        current_amount: String(existing.current_amount),
        interest_rate: String(existing.interest_rate),
        start_date: existing.start_date,
        target_date: existing.target_date ?? '',
        status: 'activo',
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
    if (!form.bank_account) newErrors.bank_account = 'Selecciona una cuenta'
    if (!form.goal_name.trim()) newErrors.goal_name = 'El nombre de la meta es obligatorio'
    if (!form.target_amount.trim()) newErrors.target_amount = 'El monto objetivo es obligatorio'
    else if (isNaN(Number(form.target_amount)) || Number(form.target_amount) <= 0) newErrors.target_amount = 'Monto inválido'
    if (!form.current_amount.trim()) newErrors.current_amount = 'El monto actual es obligatorio'
    else if (isNaN(Number(form.current_amount)) || Number(form.current_amount) < 0) newErrors.current_amount = 'Monto inválido'
    if (!form.interest_rate.trim()) newErrors.interest_rate = 'La tasa de interés es obligatoria'
    else if (isNaN(Number(form.interest_rate)) || Number(form.interest_rate) < 0) newErrors.interest_rate = 'Tasa inválida'
    if (!form.start_date) newErrors.start_date = 'La fecha de inicio es obligatoria'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    setApiError(null)
    try {
      const payload: SavingRequest = {
        user: userId,
        bank_account: Number(form.bank_account),
        goal_name: form.goal_name,
        target_amount: Number(form.target_amount),
        current_amount: Number(form.current_amount),
        interest_rate: Number(form.interest_rate),
        start_date: form.start_date,
        target_date: form.target_date || null,
        status: form.status,
      }
      const result = isEdit
        ? await updateSaving(existing!.id, payload)
        : await createSaving(payload)
      onSaved(result)
      setToastMessage(isEdit ? '¡Ahorro actualizado!' : '¡Ahorro creado!')
      setToastType('success')
      setToastOpen(true)
      setTimeout(handleClose, 1500)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error inesperado'
      setApiError(msg)
      setToastMessage(msg)
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
      title={isEdit ? 'Editar ahorro' : 'Nuevo ahorro'}
      steps={[{ label: 'Datos', description: 'Meta, montos y fechas' }]}
      currentStep={0}
      loading={loading}
      apiError={apiError}
      toastOpen={toastOpen}
      toastMessage={toastMessage}
      toastType={toastType}
      onToastChange={setToastOpen}
      onNext={() => {}}
      onBack={() => {}}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? 'Actualizar' : 'Crear ahorro'}
    >
      <Flex direction="column" gap="3">

        <FormField label="Cuenta bancaria" error={errors.bank_account} required>
          <Select.Root value={form.bank_account} onValueChange={v => update('bank_account', v)}>
            <Select.Trigger placeholder="Selecciona una cuenta" style={{ width: '100%' }} />
            <Select.Content>
              {accounts.map(a => (
                <Select.Item key={a.id} value={String(a.id)}>
                  <Flex align="center" gap="2">
                    <Icons.finance width={12} style={{ color: 'var(--accent-9)' }} />
                    {a.bank_name} - {a.account_type}
                  </Flex>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormField>

        <FormField label="Nombre de la meta" error={errors.goal_name} required hint="Ej: Viaje, carro, emergencia">
          <TextField.Root
            value={form.goal_name}
            onChange={e => update('goal_name', e.target.value)}
            placeholder="Viaje a San Andrés"
            size="2"
          >
            <TextField.Slot>
              <Icons.money width={13} style={{ color: 'var(--gray-9)' }} />
            </TextField.Slot>
          </TextField.Root>
        </FormField>

        <Flex gap="3">
          <Box style={{ flex: 1 }}>
            <FormField label="Monto objetivo (COP)" error={errors.target_amount} required>
              <TextField.Root
                value={form.target_amount}
                onChange={e => update('target_amount', e.target.value.replace(/\D/g, ''))}
                placeholder="2000000"
                size="2"
                type="number"
              >
                <TextField.Slot>
                  <Icons.money width={13} style={{ color: 'var(--gray-9)' }} />
                </TextField.Slot>
              </TextField.Root>
            </FormField>
          </Box>
          <Box style={{ flex: 1 }}>
            <FormField label="Monto actual (COP)" error={errors.current_amount} required>
              <TextField.Root
                value={form.current_amount}
                onChange={e => update('current_amount', e.target.value.replace(/\D/g, ''))}
                placeholder="500000"
                size="2"
                type="number"
              />
            </FormField>
          </Box>
        </Flex>

        <Flex gap="3">
          <Box style={{ flex: 1 }}>
            <FormField label="Tasa (%)" error={errors.interest_rate} required>
              <TextField.Root
                value={form.interest_rate}
                onChange={e => update('interest_rate', e.target.value.replace(/\D/g, ''))}
                placeholder="5"
                size="2"
                type="number"
                min="0"
                step="0.1"
              />
            </FormField>
          </Box>
          <Box style={{ flex: 1 }}>
            <FormField label="Estado" error={errors.status}>
              <Select.Root value={form.status} onValueChange={v => update('status', v)}>
                <Select.Trigger placeholder="Estado" style={{ width: '100%' }} />
                <Select.Content>
                  {STATUS_OPTIONS.map(s => (
                    <Select.Item key={s.value} value={s.value}>{s.label}</Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </FormField>
          </Box>
        </Flex>

        <Flex gap="3">
          <Box style={{ flex: 1 }}>
            <FormField label="Fecha inicio" error={errors.start_date} required>
              <TextField.Root
                value={form.start_date}
                onChange={e => update('start_date', e.target.value)}
                type="date"
                size="2"
              />
            </FormField>
          </Box>
          <Box style={{ flex: 1 }}>
            <FormField label="Fecha meta" error={errors.target_date}>
              <TextField.Root
                value={form.target_date}
                onChange={e => update('target_date', e.target.value)}
                type="date"
                size="2"
              />
            </FormField>
          </Box>
        </Flex>

      </Flex>
    </StepModal>
  )
}
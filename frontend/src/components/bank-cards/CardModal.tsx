'use client'

import { useState, useEffect } from 'react'
import { Flex, TextField, Select, Box, Text } from '@radix-ui/themes'
import { Icons } from '@/components/ui/icons/icons'
import { FormField } from '@/components/ui/FormField'
import { StepModal } from '@/components/ui/StepModal'
import {
  BankCard, BankCardRequest,
  createBankCard, updateBankCard,
} from '@/services/bank-cards.service'
import { getBankAccounts, BankAccount } from '@/services/bank-accounts.service'

const CARD_TYPES = [
  { value: 'credito', label: 'Tarjeta de crédito' },
  { value: 'debito', label: 'Tarjeta de débito' },
]

type Props = {
  open: boolean
  onClose: () => void
  userId: number
  existing?: BankCard | null
  onSaved: (card: BankCard) => void
}

const EMPTY = {
  bank_account: '',
  card_type: '' as 'credito' | 'debito',
  card_number: '',
  cardholder_name: '',
  expiration_date: '',
  cvv: '',
}
type FormErrors = Partial<Record<keyof typeof EMPTY, string>>

export function CardModal({ open, onClose, userId, existing, onSaved }: Props) {
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
        card_type: existing.card_type,
        card_number: existing.card_number,
        cardholder_name: existing.cardholder_name,
        expiration_date: existing.expiration_date,
        cvv: existing.cvv,
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
    if (!form.card_type) newErrors.card_type = 'Selecciona el tipo de tarjeta'
    if (!form.card_number.trim()) newErrors.card_number = 'El número de tarjeta es obligatorio'
    else if (form.card_number.replace(/\s/g, '').length < 13) newErrors.card_number = 'Número de tarjeta inválido'
    if (!form.cardholder_name.trim()) newErrors.cardholder_name = 'El nombre del titular es obligatorio'
    if (!form.expiration_date.trim()) newErrors.expiration_date = 'La fecha de expiración es obligatoria'
    else if (!/^\d{2}\/\d{2}$/.test(form.expiration_date)) newErrors.expiration_date = 'Formato: MM/AA'
    if (!form.cvv.trim()) newErrors.cvv = 'El CVV es obligatorio'
    else if (form.cvv.length < 3) newErrors.cvv = 'CVV inválido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    setApiError(null)
    try {
      const payload: BankCardRequest = {
        user: userId,
        bank_account: Number(form.bank_account),
        card_type: form.card_type as 'credito' | 'debito',
        card_number: form.card_number.replace(/\s/g, ''),
        cardholder_name: form.cardholder_name,
        expiration_date: form.expiration_date,
        cvv: form.cvv,
      }
      const result = isEdit
        ? await updateBankCard(existing!.id, payload)
        : await createBankCard(payload)
      onSaved(result)
      setToastMessage(isEdit ? '¡Tarjeta actualizada!' : '¡Tarjeta creada!')
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
      title={isEdit ? 'Editar tarjeta' : 'Nueva tarjeta'}
      steps={[{ label: 'Datos', description: 'Cuenta, tipo, número y datos' }]}
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
      submitLabel={isEdit ? 'Actualizar' : 'Crear tarjeta'}
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

        <FormField label="Tipo de tarjeta" error={errors.card_type} required>
          <Select.Root value={form.card_type} onValueChange={v => update('card_type', v)}>
            <Select.Trigger placeholder="Tipo de tarjeta" style={{ width: '100%' }} />
            <Select.Content>
              {CARD_TYPES.map(t => (
                <Select.Item key={t.value} value={t.value}>{t.label}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormField>

        <FormField label="Número de tarjeta" error={errors.card_number} required hint="16 dígitos sin espacios">
          <TextField.Root
            value={form.card_number}
            onChange={e => update('card_number', e.target.value.replace(/\D/g, '').slice(0, 16))}
            placeholder="1234567890123456"
            size="2"
          >
            <TextField.Slot>
              <Icons.creditCard width={13} style={{ color: 'var(--gray-9)' }} />
            </TextField.Slot>
          </TextField.Root>
        </FormField>

        <FormField label="Nombre del titular" error={errors.cardholder_name} required>
          <TextField.Root
            value={form.cardholder_name}
            onChange={e => update('cardholder_name', e.target.value.toUpperCase())}
            placeholder="JUAN PEREZ"
            size="2"
          >
            <TextField.Slot>
              <Icons.user width={13} style={{ color: 'var(--gray-9)' }} />
            </TextField.Slot>
          </TextField.Root>
        </FormField>

        <Flex gap="3">
          <Box style={{ flex: 1 }}>
            <FormField label="Expiración" error={errors.expiration_date} required hint="MM/AA">
              <TextField.Root
                value={form.expiration_date}
                onChange={e => {
                  let v = e.target.value.replace(/\D/g, '').slice(0, 4)
                  if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2)
                  update('expiration_date', v)
                }}
                placeholder="12/28"
                size="2"
              />
            </FormField>
          </Box>
          <Box style={{ flex: 1 }}>
            <FormField label="CVV" error={errors.cvv} required>
              <TextField.Root
                value={form.cvv}
                onChange={e => update('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                size="2"
                type="password"
              />
            </FormField>
          </Box>
        </Flex>

      </Flex>
    </StepModal>
  )
}
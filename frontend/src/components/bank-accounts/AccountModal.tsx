'use client'

import { useState, useEffect } from 'react'
import { Flex, TextField, Select, Box, Text } from '@radix-ui/themes'
import { Icons } from '@/components/ui/icons/icons'
import { FormField } from '@/components/ui/FormField'
import { StepModal } from '@/components/ui/StepModal'
import {
  BankAccount, BankAccountRequest,
  createBankAccount, updateBankAccount,
} from '@/services/bank-accounts.service'

const BANKS = ['Bancolombia', 'Davivienda', 'BBVA', 'Nequi', 'Banco de Bogotá', 'Scotiabank', 'Otro']
const ACCOUNT_TYPES = [
  { value: 'ahorro', label: 'Cuenta de ahorro' },
  { value: 'corriente', label: 'Cuenta corriente' },
]

type Props = {
  open: boolean
  onClose: () => void
  userId: number
  existing?: BankAccount | null
  onSaved: (account: BankAccount) => void
}

const EMPTY = { bank_name: '', account_type: '' as 'ahorro' | 'corriente', account_number: '', balance: '' }
type FormErrors = Partial<Record<keyof typeof EMPTY, string>>

export function AccountModal({ open, onClose, userId, existing, onSaved }: Props) {
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
        bank_name: existing.bank_name,
        account_type: existing.account_type,
        account_number: existing.account_number,
        balance: String(existing.balance),
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
    if (!form.bank_name) newErrors.bank_name = 'Selecciona un banco'
    if (!form.account_type) newErrors.account_type = 'Selecciona el tipo de cuenta'
    if (!form.account_number.trim()) newErrors.account_number = 'El número de cuenta es obligatorio'
    else if (form.account_number.length < 5) newErrors.account_number = 'Mínimo 5 dígitos'
    if (!form.balance.trim()) newErrors.balance = 'El saldo es obligatorio'
    else if (isNaN(Number(form.balance)) || Number(form.balance) < 0) newErrors.balance = 'Ingresa un saldo válido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    setApiError(null)
    try {
      const payload: BankAccountRequest = {
        user: userId,
        bank_name: form.bank_name,
        account_type: form.account_type as 'ahorro' | 'corriente',
        account_number: form.account_number,
        balance: Number(form.balance),
      }
      const result = isEdit
        ? await updateBankAccount(existing!.id, payload)
        : await createBankAccount(payload)
      onSaved(result)
      setToastMessage(isEdit ? '¡Cuenta actualizada!' : '¡Cuenta creada!')
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
      title={isEdit ? 'Editar cuenta bancaria' : 'Nueva cuenta bancaria'}
      steps={[{ label: 'Datos', description: 'Banco, tipo, número y saldo' }]}
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
      submitLabel={isEdit ? 'Actualizar' : 'Crear cuenta'}
    >
      <Flex direction="column" gap="3">

        <FormField label="Banco" error={errors.bank_name} required>
          <Select.Root value={form.bank_name} onValueChange={v => update('bank_name', v)}>
            <Select.Trigger placeholder="Selecciona un banco" style={{ width: '100%' }} />
            <Select.Content>
              {BANKS.map(b => (
                <Select.Item key={b} value={b}>
                  <Flex align="center" gap="2">
                    <Icons.finance width={12} style={{ color: 'var(--accent-9)' }} />
                    {b}
                  </Flex>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormField>

        <FormField label="Tipo de cuenta" error={errors.account_type} required>
          <Select.Root value={form.account_type} onValueChange={v => update('account_type', v)}>
            <Select.Trigger placeholder="Tipo de cuenta" style={{ width: '100%' }} />
            <Select.Content>
              {ACCOUNT_TYPES.map(t => (
                <Select.Item key={t.value} value={t.value}>{t.label}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormField>

        <FormField label="Número de cuenta" error={errors.account_number} required hint="Solo dígitos, sin espacios">
          <TextField.Root
            value={form.account_number}
            onChange={e => update('account_number', e.target.value.replace(/\D/g, ''))}
            placeholder="12345678901"
            size="2"
            maxLength={20}
          >
            <TextField.Slot>
              <Icons.finance width={13} style={{ color: 'var(--gray-9)' }} />
            </TextField.Slot>
          </TextField.Root>
        </FormField>

        <FormField label="Saldo inicial (COP)" error={errors.balance} required>
          <TextField.Root
            value={form.balance}
            onChange={e => update('balance', e.target.value)}
            placeholder="250000"
            size="2"
            type="number"
            min="0"
          >
            <TextField.Slot>
              <Text size="1" color="gray" weight="bold">$</Text>
            </TextField.Slot>
          </TextField.Root>
        </FormField>

      </Flex>
    </StepModal>
  )
}
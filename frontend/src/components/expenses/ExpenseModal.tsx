'use client'

import { useState, useEffect } from 'react'
import { Flex, TextField, Select, TextArea, Box, Checkbox, Text } from '@radix-ui/themes'
import { Icons } from '@/components/ui/icons/icons'
import { FormField } from '@/components/ui/FormField'
import { StepModal } from '@/components/ui/StepModal'
import {
  Expense, ExpenseRequest,
  createExpense, updateExpense,
} from '@/services/expenses.service'

const CATEGORIES = [
  { value: 'alimentacion', label: 'Alimentación' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'vivienda', label: 'Vivienda' },
  { value: 'salud', label: 'Salud' },
  { value: 'educacion', label: 'Educación' },
  { value: 'entretenimiento', label: 'Entretenimiento' },
  { value: 'otro', label: 'Otro' },
]

type Props = {
  open: boolean
  onClose: () => void
  userId: number
  existing?: Expense | null
  onSaved: (expense: Expense) => void
}

const EMPTY = {
  title: '',
  amount: '',
  category: '',
  date: '',
  description: '',
  is_test: false,
  is_real: false,
}

type FormErrors = Partial<Record<keyof Omit<typeof EMPTY, 'is_test' | 'is_real'>, string>>

export function ExpenseModal({ open, onClose, userId, existing, onSaved }: Props) {
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
        title: existing.title ?? '',
        amount: String(existing.amount ?? ''),
        category: existing.category ?? '',
        date: existing.date ?? '',
        description: existing.description ?? '',
        is_test: existing.is_test ?? false,
        is_real: existing.is_real ?? false,
      })
    } else if (open) {
      setForm(EMPTY)
    }
    setErrors({})
    setApiError(null)
  }, [open, existing])

  function update(key: keyof typeof EMPTY, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
    setApiError(null)
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!form.title.trim()) newErrors.title = 'El título es obligatorio'
    if (!form.amount.trim()) newErrors.amount = 'El monto es obligatorio'
    else if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) newErrors.amount = 'Monto inválido'
    if (!form.category) newErrors.category = 'Selecciona una categoría'
    if (!form.date) newErrors.date = 'La fecha es obligatoria'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    setApiError(null)
    try {
      const payload: ExpenseRequest = {
        user: userId,
        title: form.title,
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        description: form.description,
        is_test: form.is_test,
        is_real: form.is_real,
      }
      const result = isEdit
        ? await updateExpense(existing!.id, payload)
        : await createExpense(payload)
      onSaved(result)
      setToastMessage(isEdit ? '¡Gasto actualizado!' : '¡Gasto creado!')
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
      title={isEdit ? 'Editar gasto' : 'Nuevo gasto'}
      steps={[{ label: 'Datos', description: 'Título, monto, categoría y fecha' }]}
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
      submitLabel={isEdit ? 'Actualizar' : 'Crear gasto'}
    >
      <Flex direction="column" gap="3">

        <FormField label="Título" error={errors.title} required>
          <TextField.Root
            value={form.title}
            onChange={e => update('title', e.target.value)}
            placeholder="Mi gasto"
            size="2"
          >
            <TextField.Slot>
              <Icons.analytics width={13} style={{ color: 'var(--gray-9)' }} />
            </TextField.Slot>
          </TextField.Root>
        </FormField>

        <FormField label="Monto (COP)" error={errors.amount} required>
          <TextField.Root
            value={form.amount}
            onChange={e => update('amount', e.target.value.replace(/\D/g, ''))}
            placeholder="50000"
            size="2"
            type="number"
          >
            <TextField.Slot>
              <Icons.money width={13} style={{ color: 'var(--gray-9)' }} />
            </TextField.Slot>
          </TextField.Root>
        </FormField>

        <FormField label="Categoría" error={errors.category} required>
          <Select.Root value={form.category} onValueChange={v => update('category', v)}>
            <Select.Trigger placeholder="Selecciona categoría" style={{ width: '100%' }} />
            <Select.Content>
              {CATEGORIES.map(c => (
                <Select.Item key={c.value} value={c.value}>{c.label}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormField>

        <FormField label="Fecha" error={errors.date} required>
          <TextField.Root
            value={form.date}
            onChange={e => update('date', e.target.value)}
            type="date"
            size="2"
          />
        </FormField>

        <FormField label="Descripción" error={errors.description}>
          <TextArea
            value={form.description}
            onChange={e => update('description', e.target.value)}
            placeholder="Descripción del gasto..."
            rows={2}
          />
        </FormField>

        <FormField label="Prueba">
          <Flex align="center" gap="2">
            <Checkbox
              checked={form.is_test}
              onCheckedChange={value => update('is_test', Boolean(value))}
            />
            <Text size="2">Marcar como gasto de prueba</Text>
          </Flex>
        </FormField>

        <FormField label="Real">
          <Flex align="center" gap="2">
            <Checkbox
              checked={form.is_real}
              onCheckedChange={value => update('is_real', Boolean(value))}
            />
            <Text size="2">Marcar como gasto real</Text>
          </Flex>
        </FormField>

      </Flex>
    </StepModal>
  )
}
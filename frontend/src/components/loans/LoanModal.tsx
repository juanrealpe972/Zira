'use client'

import { useState, useEffect } from 'react'
import { Flex, TextField, Select, TextArea, Box } from '@radix-ui/themes'
import { Icons } from '@/components/ui/icons/icons'
import { FormField } from '@/components/ui/FormField'
import { StepModal } from '@/components/ui/StepModal'
import {
  Loan, LoanRequest,
  createLoan, updateLoan,
} from '@/services/loans.service'

const LOAN_TYPES = [
  { value: 'prestado', label: 'Prestado (yo presté)' },
  { value: 'solicitado', label: 'Solicitado (me prestaron)' },
]

const STATUS_OPTIONS = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'pagando', label: 'Pagando' },
  { value: 'pagado', label: 'Pagado' },
  { value: 'vencido', label: 'Vencido' },
]

type Props = {
  open: boolean
  onClose: () => void
  userId: number
  existing?: Loan | null
  onSaved: (loan: Loan) => void
}

const EMPTY = {
  person: '',
  loan_type: '' as 'prestado' | 'solicitado',
  amount: '',
  interest_rate: '',
  start_date: '',
  end_date: '',
  status: 'pendiente' as const,
  notes: '',
}
type FormErrors = Partial<Record<keyof typeof EMPTY, string>>

export function LoanModal({ open, onClose, userId, existing, onSaved }: Props) {
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
        person: existing.person,
        loan_type: existing.loan_type,
        amount: String(existing.amount),
        interest_rate: String(existing.interest_rate),
        start_date: existing.start_date,
        end_date: existing.end_date ?? '',
        status: 'pendiente',
        notes: existing.notes,
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
    if (!form.person.trim()) newErrors.person = 'El nombre de la persona es obligatorio'
    if (!form.loan_type) newErrors.loan_type = 'Selecciona el tipo de préstamo'
    if (!form.amount.trim()) newErrors.amount = 'El monto es obligatorio'
    else if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) newErrors.amount = 'Monto inválido'
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
      const payload: LoanRequest = {
        user: userId,
        person: form.person,
        loan_type: form.loan_type as 'prestado' | 'solicitado',
        amount: Number(form.amount),
        interest_rate: Number(form.interest_rate),
        start_date: form.start_date,
        end_date: form.end_date || null,
        status: form.status,
        notes: form.notes,
      }
      const result = isEdit
        ? await updateLoan(existing!.id, payload)
        : await createLoan(payload)
      onSaved(result)
      setToastMessage(isEdit ? '¡Préstamo actualizado!' : '¡Préstamo creado!')
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
      title={isEdit ? 'Editar préstamo' : 'Nuevo préstamo'}
      steps={[{ label: 'Datos', description: 'Persona, monto, tasas y fechas' }]}
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
      submitLabel={isEdit ? 'Actualizar' : 'Crear préstamo'}
    >
      <Flex direction="column" gap="3">

        <FormField label="Persona" error={errors.person} required hint="Nombre deudor o acreedor">
          <TextField.Root
            value={form.person}
            onChange={e => update('person', e.target.value)}
            placeholder="Juan Pérez"
            size="2"
          >
            <TextField.Slot>
              <Icons.user width={13} style={{ color: 'var(--gray-9)' }} />
            </TextField.Slot>
          </TextField.Root>
        </FormField>

        <FormField label="Tipo de préstamo" error={errors.loan_type} required>
          <Select.Root value={form.loan_type} onValueChange={v => update('loan_type', v)}>
            <Select.Trigger placeholder="Selecciona tipo" style={{ width: '100%' }} />
            <Select.Content>
              {LOAN_TYPES.map(t => (
                <Select.Item key={t.value} value={t.value}>{t.label}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormField>

        <Flex gap="3">
          <Box style={{ flex: 1 }}>
            <FormField label="Monto (COP)" error={errors.amount} required>
              <TextField.Root
                value={form.amount}
                onChange={e => update('amount', e.target.value.replace(/\D/g, ''))}
                placeholder="500000"
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
            <FormField label="Tasa (%)" error={errors.interest_rate} required>
              <TextField.Root
                value={form.interest_rate}
                onChange={e => update('interest_rate', e.target.value.replace(/\D/g, ''))}
                placeholder="2"
                size="2"
                type="number"
                min="0"
                step="0.1"
              />
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
            <FormField label="Fecha fin" error={errors.end_date}>
              <TextField.Root
                value={form.end_date}
                onChange={e => update('end_date', e.target.value)}
                type="date"
                size="2"
              />
            </FormField>
          </Box>
        </Flex>

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

        <FormField label="Notas" error={errors.notes}>
          <TextArea
            value={form.notes}
            onChange={e => update('notes', e.target.value)}
            placeholder="Notas adicionales..."
            rows={2}
          />
        </FormField>

      </Flex>
    </StepModal>
  )
}
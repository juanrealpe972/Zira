'use client'

import { useState, useEffect } from 'react'
import { Flex, TextField, Select, TextArea } from '@radix-ui/themes'
import { Icons, FormField, StepModal } from '@/components/ui'
import { createIncome, updateIncome } from '@/services'
import { Income, IncomeRequest} from '@/types'

const CATEGORIES = [
    { value: 'salario', label: 'Salario' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'inversiones', label: 'Inversiones' },
    { value: 'bonus', label: 'Bono' },
    { value: 'otro', label: 'Otro' },
]

type Props = {
    open: boolean
    onClose: () => void
    userId: number
    existing?: Income | null
    onSaved: (income: Income) => void
}

const EMPTY = {
    title: '',
    amount: '',
    category: '',
    source: '',
    date: '',
    notes: '',
}

type FormErrors = Partial<Record<keyof typeof EMPTY, string>>

export function IncomeModal({ open, onClose, userId, existing, onSaved }: Props) {
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
                source: existing.source ?? '',
                date: existing.date ?? '',
                notes: existing.notes ?? '',
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
        if (!form.title.trim()) newErrors.title = 'El título es obligatorio'
        if (!form.amount.trim()) newErrors.amount = 'El monto es obligatorio'
        else if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) newErrors.amount = 'Monto inválido'
        if (!form.category) newErrors.category = 'Selecciona una categoría'
        if (!form.source.trim()) newErrors.source = 'La fuente es obligatoria'
        if (!form.date) newErrors.date = 'La fecha es obligatoria'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit() {
        if (!validate()) return
        setLoading(true)
        setApiError(null)
        try {
            const payload: IncomeRequest = {
                user: userId,
                title: form.title,
                amount: Number(form.amount),
                category: form.category,
                source: form.source,
                date: form.date,
                notes: form.notes,
            }
            const result = isEdit
                ? await updateIncome(existing!.id, payload)
                : await createIncome(payload)
            onSaved(result)
            setToastMessage(isEdit ? '¡Ingreso actualizado!' : '¡Ingreso creado!')
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
            title={isEdit ? 'Editar ingreso' : 'Nuevo ingreso'}
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
            submitLabel={isEdit ? 'Actualizar' : 'Crear ingreso'}
        >
            <Flex direction="column" gap="3">

                <FormField label="Título" error={errors.title} required>
                    <TextField.Root
                        value={form.title}
                        onChange={e => update('title', e.target.value)}
                        placeholder="Mi ingreso"
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
                        placeholder="1000000"
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

                <FormField label="Fuente" error={errors.source} required>
                    <TextField.Root
                        value={form.source}
                        onChange={e => update('source', e.target.value)}
                        placeholder="Empresa XYZ"
                        size="2"
                    />
                </FormField>

                <FormField label="Fecha" error={errors.date} required>
                    <TextField.Root
                        value={form.date}
                        onChange={e => update('date', e.target.value)}
                        type="date"
                        size="2"
                    />
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
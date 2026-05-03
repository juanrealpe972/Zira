'use client'

import { useState, useEffect } from 'react'
import { Flex, TextField, Box } from '@radix-ui/themes'
import { Icons, FormField, StepModal } from '@/components/ui'
import { createExpenseProduct, updateExpenseProduct } from '@/services'
import { ExpenseProduct, ExpenseProductRequest } from '@/types'

type Props = {
  open: boolean
  onClose: () => void
  userId: number
  existing?: ExpenseProduct | null
  onSaved: (product: ExpenseProduct) => void
}

const EMPTY = {
  expense: '',
  product: '',
  quantity: '',
  unit_price: '',
  subtotal: '',
}

type FormErrors = Partial<Record<keyof typeof EMPTY, string>>

export function ExpenseProductModal({ open, onClose, userId, existing, onSaved }: Props) {
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
        expense: String(existing.expense),
        product: String(existing.product),
        quantity: String(existing.quantity),
        unit_price: String(existing.unit_price),
        subtotal: String(existing.subtotal),
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
    if (!form.expense.trim()) newErrors.expense = 'El gasto es obligatorio'
    else if (isNaN(Number(form.expense)) || Number(form.expense) <= 0) newErrors.expense = 'ID inválido'
    if (!form.product.trim()) newErrors.product = 'El producto es obligatorio'
    else if (isNaN(Number(form.product)) || Number(form.product) <= 0) newErrors.product = 'ID inválido'
    if (!form.quantity.trim()) newErrors.quantity = 'La cantidad es obligatoria'
    else if (isNaN(Number(form.quantity)) || Number(form.quantity) <= 0) newErrors.quantity = 'Cantidad inválida'
    if (!form.unit_price.trim()) newErrors.unit_price = 'El precio unitario es obligatorio'
    else if (isNaN(Number(form.unit_price)) || Number(form.unit_price) <= 0) newErrors.unit_price = 'Precio inválido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    setApiError(null)
    try {
      const quantity = Number(form.quantity)
      const unitPrice = Number(form.unit_price)
      const payload: ExpenseProductRequest = {
        user: userId,
        expense: Number(form.expense),
        product: Number(form.product),
        quantity,
        unit_price: unitPrice,
        subtotal: quantity * unitPrice,
      }
      const result = isEdit
        ? await updateExpenseProduct(existing!.id, payload)
        : await createExpenseProduct(payload)
      onSaved(result)
      setToastMessage(isEdit ? '¡Producto actualizado!' : '¡Producto creado!')
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
      title={isEdit ? 'Editar producto' : 'Nuevo producto'}
      steps={[{ label: 'Datos', description: 'Gasto, producto, cantidad y precio' }]}
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
      submitLabel={isEdit ? 'Actualizar' : 'Crear producto'}
    >
      <Flex direction="column" gap="3">

        <Flex gap="3">
          <Box style={{ flex: 1 }}>
            <FormField label="ID Gasto" error={errors.expense} required>
              <TextField.Root
                value={form.expense}
                onChange={e => update('expense', e.target.value.replace(/\D/g, ''))}
                placeholder="1"
                size="2"
                type="number"
              />
            </FormField>
          </Box>
          <Box style={{ flex: 1 }}>
            <FormField label="ID Producto" error={errors.product} required>
              <TextField.Root
                value={form.product}
                onChange={e => update('product', e.target.value.replace(/\D/g, ''))}
                placeholder="1"
                size="2"
                type="number"
              />
            </FormField>
          </Box>
        </Flex>

        <Flex gap="3">
          <Box style={{ flex: 1 }}>
            <FormField label="Cantidad" error={errors.quantity} required>
              <TextField.Root
                value={form.quantity}
                onChange={e => update('quantity', e.target.value.replace(/\D/g, ''))}
                placeholder="2"
                size="2"
                type="number"
              />
            </FormField>
          </Box>
          <Box style={{ flex: 1 }}>
            <FormField label="Precio unitario (COP)" error={errors.unit_price} required>
              <TextField.Root
                value={form.unit_price}
                onChange={e => update('unit_price', e.target.value.replace(/\D/g, ''))}
                placeholder="25000"
                size="2"
                type="number"
              >
                <TextField.Slot>
                  <Icons.money width={13} style={{ color: 'var(--gray-9)' }} />
                </TextField.Slot>
              </TextField.Root>
            </FormField>
          </Box>
        </Flex>

      </Flex>
    </StepModal>
  )
}
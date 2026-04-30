'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text, Button, Grid, Spinner, Card } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import { Icons } from '@/components/ui/icons/icons'
import {
  getExpenses, deleteExpense,
  Expense,
} from '@/services/expenses.service'
import { ExpenseCard } from '@/components/expenses/ExpenseCard'
import { ExpenseModal } from '@/components/expenses/ExpenseModal'
import { AppToast } from '@/components/ui/AppToast'

function getUserIdFromToken(): number | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  if (!match) return null
  try {
    return JSON.parse(atob(match[1].split('.')[1])).user_id
  } catch { return null }
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    const id = getUserIdFromToken()
    setUserId(id)
    if (!id) return
    getExpenses(id)
      .then(response => setExpenses(response.results))
      .catch(() => showToast('Error al cargar gastos', 'error'))
      .finally(() => setLoading(false))
  }, [])

  function showToast(message: string, type: 'success' | 'error') {
    setToastMessage(message)
    setToastType(type)
    setToastOpen(true)
  }

  function handleSaved(expense: Expense) {
    setExpenses(prev => {
      const exists = prev.find(e => e.id === expense.id)
      return exists
        ? prev.map(e => e.id === expense.id ? expense : e)
        : [...prev, expense]
    })
    setEditingExpense(null)
  }

  async function handleDelete(id: number) {
    try {
      await deleteExpense(id)
      setExpenses(prev => prev.filter(e => e.id !== id))
      showToast('Gasto eliminado', 'success')
    } catch {
      showToast('Error al eliminar gasto', 'error')
    }
  }

  function handleEdit(expense: Expense) {
    setEditingExpense(expense)
    setModalOpen(true)
  }

  function handleOpenNew() {
    setEditingExpense(null)
    setModalOpen(true)
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '60vh' }} gap="2">
        <Spinner /><Text color="gray">Cargando gastos...</Text>
      </Flex>
    )
  }

  // Calcular total
  const totalGastos = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  )

  return (
    <Box p="5">

      {/* Header */}
      <Flex justify="between" align="center" mb="5">
        <Box>
          <Heading size="6">Gastos</Heading>
          <Flex align="center" gap="1" mt="1">
            <Text size="1" color="gray">Dashboard</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1" color="gray">Finanzas</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1">Gastos</Text>
          </Flex>
        </Box>
        <Button size="2" onClick={handleOpenNew}>
          <PlusIcon /> Nuevo gasto
        </Button>
      </Flex>

      {/* Stats */}
      <Card size="2" mb="5">
        <Flex direction="column" gap="1">
          <Text size="2" color="gray">Total de gastos</Text>
          <Text size="5" weight="bold" style={{ color: '#EF4444' }}>
            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(totalGastos)}
          </Text>
        </Flex>
      </Card>

      {/* Gastos */}
      {expenses.length > 0 && (
        <Box mb="5">
          <Heading size="4" mb="3">Mis gastos</Heading>
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
            {expenses.map(expense => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Sin gastos */}
      {expenses.length === 0 && (
        <Card size="3" mb="5">
          <Flex direction="column" align="center" justify="center" py="9" gap="3">
            <Flex
              align="center"
              justify="center"
              style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gray-3)' }}
            >
              <Icons.analytics width={28} height={28} style={{ color: 'var(--gray-8)' }} />
            </Flex>
            <Box style={{ textAlign: 'center' }}>
              <Text size="4" weight="bold" style={{ display: 'block', marginBottom: 4 }}>
                Sin gastos
              </Text>
              <Text size="2" color="gray">
                Registra tus gastos para hacer seguimiento
              </Text>
            </Box>
            <Button size="2" onClick={handleOpenNew} mt="2">
              <PlusIcon /> Agregar gasto
            </Button>
          </Flex>
        </Card>
      )}

      {/* Modal */}
      {userId && (
        <ExpenseModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditingExpense(null) }}
          userId={userId}
          existing={editingExpense}
          onSaved={handleSaved}
        />
      )}

      {/* Toast */}
      <AppToast
        open={toastOpen}
        onOpenChange={setToastOpen}
        message={toastMessage}
        type={toastType}
      />

    </Box>
  )
}
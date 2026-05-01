'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text, Button, Grid, Spinner, Card } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import { Icons } from '@/components/ui/icons/icons'
import {
  getIncomes, deleteIncome,
  Income,
} from '@/services/incomes.service'
import { IncomeCard } from '@/components/incomes/IncomeCard'
import { IncomeModal } from '@/components/incomes/IncomeModal'
import { AppToast } from '@/components/ui/AppToast'

function getUserIdFromToken(): number | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  if (!match) return null
  try {
    return JSON.parse(atob(match[1].split('.')[1])).user_id
  } catch { return null }
}

export default function IncomesPage() {
  const [incomes, setIncomes] = useState<Income[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingIncome, setEditingIncome] = useState<Income | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    const id = getUserIdFromToken()
    setUserId(id)
    if (!id) return
    getIncomes(id)
      .then(response => setIncomes(response.results))
      .catch(() => showToast('Error al cargar ingresos', 'error'))
      .finally(() => setLoading(false))
  }, [])

  function showToast(message: string, type: 'success' | 'error') {
    setToastMessage(message)
    setToastType(type)
    setToastOpen(true)
  }

  function handleSaved(income: Income) {
    setIncomes(prev => {
      const exists = prev.find(i => i.id === income.id)
      return exists
        ? prev.map(i => i.id === income.id ? income : i)
        : [...prev, income]
    })
    setEditingIncome(null)
  }

  async function handleDelete(id: number) {
    try {
      await deleteIncome(id)
      setIncomes(prev => prev.filter(i => i.id !== id))
      showToast('Ingreso eliminado', 'success')
    } catch {
      showToast('Error al eliminar ingreso', 'error')
    }
  }

  function handleEdit(income: Income) {
    setEditingIncome(income)
    setModalOpen(true)
  }

  function handleOpenNew() {
    setEditingIncome(null)
    setModalOpen(true)
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '60vh' }} gap="2">
        <Spinner /><Text color="gray">Cargando ingresos...</Text>
      </Flex>
    )
  }

  // Calcular total
  const totalIngresos = incomes.reduce(
    (sum, i) => sum + Number(i.amount || 0),
    0
  )

  return (
    <Box p="5">

      {/* Header */}
      <Flex justify="between" align="center" mb="5">
        <Box>
          <Heading size="6">Ingresos</Heading>
          <Flex align="center" gap="1" mt="1">
            <Text size="1" color="gray">Dashboard</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1" color="gray">Finanzas</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1">Ingresos</Text>
          </Flex>
        </Box>
        <Button size="2" onClick={handleOpenNew}>
          <PlusIcon /> Nuevo ingreso
        </Button>
      </Flex>

      {/* Stats */}
      <Card size="2" mb="5">
        <Flex direction="column" gap="1">
          <Text size="2" color="gray">Total de ingresos</Text>
          <Text size="5" weight="bold" style={{ color: '#10B981' }}>
            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(totalIngresos)}
          </Text>
        </Flex>
      </Card>

      {/* Ingresos */}
      {incomes.length > 0 && (
        <Box mb="5">
          <Heading size="4" mb="3">Mis ingresos</Heading>
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
            {incomes.map(income => (
              <IncomeCard
                key={income.id}
                income={income}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Sin ingresos */}
      {incomes.length === 0 && (
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
                Sin ingresos
              </Text>
              <Text size="2" color="gray">
                Registra tus ingresos para hacer seguimiento
              </Text>
            </Box>
            <Button size="2" onClick={handleOpenNew} mt="2">
              <PlusIcon /> Agregar ingreso
            </Button>
          </Flex>
        </Card>
      )}

      {/* Modal */}
      {userId && (
        <IncomeModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditingIncome(null) }}
          userId={userId}
          existing={editingIncome}
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
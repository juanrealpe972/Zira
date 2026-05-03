'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text, Button, Grid, Spinner, Card } from '@radix-ui/themes'
import { Icons } from '@/components/ui/icons/icons'
import { getLoans, deleteLoan } from '@/services'
import { Loan } from '@/types'
import { LoanCard } from '@/components/loans/LoanCard'
import { LoanModal } from '@/components/loans/LoanModal'
import { AppToast } from '@/components/ui/AppToast'

function getUserIdFromToken(): number | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  if (!match) return null
  try {
    return JSON.parse(atob(match[1].split('.')[1])).user_id
  } catch { return null }
}

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    const id = getUserIdFromToken()
    setUserId(id)
    if (!id) return
    getLoans(id)
      .then(response => setLoans(response.results))
      .catch(() => showToast('Error al cargar préstamos', 'error'))
      .finally(() => setLoading(false))
  }, [])

  function showToast(message: string, type: 'success' | 'error') {
    setToastMessage(message)
    setToastType(type)
    setToastOpen(true)
  }

  function handleSaved(loan: Loan) {
    setLoans(prev => {
      const exists = prev.find(l => l.id === loan.id)
      return exists
        ? prev.map(l => l.id === loan.id ? loan : l)
        : [...prev, loan]
    })
    setEditingLoan(null)
  }

  async function handleDelete(id: number) {
    try {
      await deleteLoan(id)
      setLoans(prev => prev.filter(l => l.id !== id))
      showToast('Préstamo eliminado', 'success')
    } catch {
      showToast('Error al eliminar préstamo', 'error')
    }
  }

  function handleEdit(loan: Loan) {
    setEditingLoan(loan)
    setModalOpen(true)
  }

  function handleOpenNew() {
    setEditingLoan(null)
    setModalOpen(true)
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '60vh' }} gap="2">
        <Spinner /><Text color="gray">Cargando préstamos...</Text>
      </Flex>
    )
  }

  // Calcular totales
  const totalPrestado = loans.filter(l => l.loan_type === 'prestado').reduce((sum, l) => sum + l.amount, 0)
  const totalSolicitado = loans.filter(l => l.loan_type === 'solicitado').reduce((sum, l) => sum + l.amount, 0)

  return (
    <Box p="5">

      {/* Header */}
      <Flex justify="between" align="center" mb="5">
        <Box>
          <Heading size="6">Préstamos</Heading>
          <Flex align="center" gap="1" mt="1">
            <Text size="1" color="gray">Dashboard</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1" color="gray">Finanzas</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1">Préstamos</Text>
          </Flex>
        </Box>
        <Button size="2" onClick={handleOpenNew}>
          <Icons.plusIcon /> Nuevo préstamo
        </Button>
      </Flex>

      {/* Stats */}
      <Grid columns={{ initial: '1', sm: '2' }} gap="4" mb="5">
        <Card size="2">
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">Total prestado</Text>
            <Text size="5" weight="bold" style={{ color: '#10B981' }}>
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(totalPrestado)}
            </Text>
          </Flex>
        </Card>
        <Card size="2">
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">Total solicitado</Text>
            <Text size="5" weight="bold" style={{ color: '#F59E0B' }}>
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(totalSolicitado)}
            </Text>
          </Flex>
        </Card>
      </Grid>

      {/* Préstamos */}
      {loans.length > 0 && (
        <Box mb="5">
          <Heading size="4" mb="3">Mis préstamos</Heading>
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
            {loans.map(loan => (
              <LoanCard
                key={loan.id}
                loan={loan}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Sin préstamos */}
      {loans.length === 0 && (
        <Card size="3" mb="5">
          <Flex direction="column" align="center" justify="center" py="9" gap="3">
            <Flex
              align="center"
              justify="center"
              style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gray-3)' }}
            >
              <Icons.money width={28} height={28} style={{ color: 'var(--gray-8)' }} />
            </Flex>
            <Box style={{ textAlign: 'center' }}>
              <Text size="4" weight="bold" style={{ display: 'block', marginBottom: 4 }}>
                Sin préstamos
              </Text>
              <Text size="2" color="gray">
                Registra préstamos que has dado o solicitado
              </Text>
            </Box>
            <Button size="2" onClick={handleOpenNew} mt="2">
              <Icons.plusIcon /> Agregar préstamo
            </Button>
          </Flex>
        </Card>
      )}

      {/* Modal */}
      {userId && (
        <LoanModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditingLoan(null) }}
          userId={userId}
          existing={editingLoan}
          onSaved={handleSaved}
        />
      )}

      <AppToast open={toastOpen} onOpenChange={setToastOpen} message={toastMessage} type={toastType} />
    </Box>
  )
}
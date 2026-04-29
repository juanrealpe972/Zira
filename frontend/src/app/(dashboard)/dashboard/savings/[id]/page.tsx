'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text, Button, Grid, Spinner, Card } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import { Icons } from '@/components/ui/icons/icons'
import {
  getSavings, deleteSaving,
  Saving,
} from '@/services/savings.service'
import { SavingCard } from '@/components/savings/SavingCard'
import { SavingModal } from '@/components/savings/SavingModal'
import { AppToast } from '@/components/ui/AppToast'

function getUserIdFromToken(): number | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  if (!match) return null
  try {
    return JSON.parse(atob(match[1].split('.')[1])).user_id
  } catch { return null }
}

export default function SavingsPage() {
  const [savings, setSavings] = useState<Saving[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSaving, setEditingSaving] = useState<Saving | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    const id = getUserIdFromToken()
    setUserId(id)
    if (!id) return
    getSavings(id)
      .then(response => setSavings(response.results))
      .catch(() => showToast('Error al cargar ahorros', 'error'))
      .finally(() => setLoading(false))
  }, [])

  function showToast(message: string, type: 'success' | 'error') {
    setToastMessage(message)
    setToastType(type)
    setToastOpen(true)
  }

  function handleSaved(saving: Saving) {
    setSavings(prev => {
      const exists = prev.find(s => s.id === saving.id)
      return exists
        ? prev.map(s => s.id === saving.id ? saving : s)
        : [...prev, saving]
    })
    setEditingSaving(null)
  }

  async function handleDelete(id: number) {
    try {
      await deleteSaving(id)
      setSavings(prev => prev.filter(s => s.id !== id))
      showToast('Ahorro eliminado', 'success')
    } catch {
      showToast('Error al eliminar ahorro', 'error')
    }
  }

  function handleEdit(saving: Saving) {
    setEditingSaving(saving)
    setModalOpen(true)
  }

  function handleOpenNew() {
    setEditingSaving(null)
    setModalOpen(true)
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '60vh' }} gap="2">
        <Spinner /><Text color="gray">Cargando ahorros...</Text>
      </Flex>
    )
  }

  // Calcular totales
  const totalAhorrado = savings.reduce((sum, s) => sum + s.current_amount, 0)
  const totalMeta = savings.reduce((sum, s) => sum + s.target_amount, 0)
  const metasCompletadas = savings.filter(s => s.status === 'completado').length

  return (
    <Box p="5">

      {/* Header */}
      <Flex justify="between" align="center" mb="5">
        <Box>
          <Heading size="6">Metas de ahorro</Heading>
          <Flex align="center" gap="1" mt="1">
            <Text size="1" color="gray">Dashboard</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1" color="gray">Finanzas</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1">Ahorros</Text>
          </Flex>
        </Box>
        <Button size="2" onClick={handleOpenNew}>
          <PlusIcon /> Nueva meta
        </Button>
      </Flex>

      {/* Stats */}
      <Grid columns={{ initial: '1', sm: '3' }} gap="4" mb="5">
        <Card size="2">
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">Total ahorrado</Text>
            <Text size="5" weight="bold" style={{ color: '#3B82F6' }}>
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(totalAhorrado)}
            </Text>
          </Flex>
        </Card>
        <Card size="2">
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">Total en metas</Text>
            <Text size="5" weight="bold">
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(totalMeta)}
            </Text>
          </Flex>
        </Card>
        <Card size="2">
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">Metas completadas</Text>
            <Text size="5" weight="bold" style={{ color: '#10B981' }}>
              {metasCompletadas} / {savings.length}
            </Text>
          </Flex>
        </Card>
      </Grid>

      {/* Ahorros */}
      {savings.length > 0 && (
        <Box mb="5">
          <Heading size="4" mb="3">Mis metas de ahorro</Heading>
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
            {savings.map(saving => (
              <SavingCard
                key={saving.id}
                saving={saving}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Sin ahorros */}
      {savings.length === 0 && (
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
                Sin metas de ahorro
              </Text>
              <Text size="2" color="gray">
                Crea una meta para comenzar a ahorrar
              </Text>
            </Box>
            <Button size="2" onClick={handleOpenNew} mt="2">
              <PlusIcon /> Crear meta
            </Button>
          </Flex>
        </Card>
      )}

      {/* Modal */}
      {userId && (
        <SavingModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditingSaving(null) }}
          userId={userId}
          existing={editingSaving}
          onSaved={handleSaved}
        />
      )}

      <AppToast open={toastOpen} onOpenChange={setToastOpen} message={toastMessage} type={toastType} />
    </Box>
  )
}
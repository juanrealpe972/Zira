'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text, Button, Grid, Spinner, Card } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import { Icons } from '@/components/ui/icons/icons'
import {
  getBankCards, deleteBankCard,
  BankCard,
} from '@/services/bank-cards.service'
import { CardCard } from '@/components/bank-cards/CardCard'
import { CardModal } from '@/components/bank-cards/CardModal'
import { AppToast } from '@/components/ui/AppToast'

function getUserIdFromToken(): number | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  if (!match) return null
  try {
    return JSON.parse(atob(match[1].split('.')[1])).user_id
  } catch { return null }
}

export default function BankCardsPage() {
  const [cards, setCards] = useState<BankCard[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCard, setEditingCard] = useState<BankCard | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    const id = getUserIdFromToken()
    setUserId(id)
    if (!id) return
    getBankCards(id)
      .then(response => setCards(response.results))
      .catch(() => showToast('Error al cargar tarjetas', 'error'))
      .finally(() => setLoading(false))
  }, [])

  function showToast(message: string, type: 'success' | 'error') {
    setToastMessage(message)
    setToastType(type)
    setToastOpen(true)
  }

  function handleSaved(card: BankCard) {
    setCards(prev => {
      const exists = prev.find(c => c.id === card.id)
      return exists
        ? prev.map(c => c.id === card.id ? card : c)
        : [...prev, card]
    })
    setEditingCard(null)
  }

  async function handleDelete(id: number) {
    try {
      await deleteBankCard(id)
      setCards(prev => prev.filter(c => c.id !== id))
      showToast('Tarjeta eliminada', 'success')
    } catch {
      showToast('Error al eliminar tarjeta', 'error')
    }
  }

  function handleEdit(card: BankCard) {
    setEditingCard(card)
    setModalOpen(true)
  }

  function handleOpenNew() {
    setEditingCard(null)
    setModalOpen(true)
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '60vh' }} gap="2">
        <Spinner /><Text color="gray">Cargando tarjetas...</Text>
      </Flex>
    )
  }

  return (
    <Box p="5">

      {/* Header */}
      <Flex justify="between" align="center" mb="5">
        <Box>
          <Heading size="6">Tarjetas bancarias</Heading>
          <Flex align="center" gap="1" mt="1">
            <Text size="1" color="gray">Dashboard</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1" color="gray">Finanzas</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1">Tarjetas</Text>
          </Flex>
        </Box>
        <Button size="2" onClick={handleOpenNew}>
          <PlusIcon /> Nueva tarjeta
        </Button>
      </Flex>

      {/* Tarjetas */}
      {cards.length > 0 && (
        <Box mb="5">
          <Heading size="4" mb="3">Mis tarjetas</Heading>
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
            {cards.map(card => (
              <CardCard
                key={card.id}
                card={card}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Sin tarjetas */}
      {cards.length === 0 && (
        <Card size="3" mb="5">
          <Flex direction="column" align="center" justify="center" py="9" gap="3">
            <Flex
              align="center"
              justify="center"
              style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gray-3)' }}
            >
              <Icons.creditCard width={28} height={28} style={{ color: 'var(--gray-8)' }} />
            </Flex>
            <Box style={{ textAlign: 'center' }}>
              <Text size="4" weight="bold" style={{ display: 'block', marginBottom: 4 }}>
                Sin tarjetas bancarias
              </Text>
              <Text size="2" color="gray">
                Agrega tu primera tarjeta para gestionar tus métodos de pago
              </Text>
            </Box>
            <Button size="2" onClick={handleOpenNew} mt="2">
              <PlusIcon /> Agregar tarjeta
            </Button>
          </Flex>
        </Card>
      )}

      {/* Modal */}
      {userId && (
        <CardModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditingCard(null) }}
          userId={userId}
          existing={editingCard}
          onSaved={handleSaved}
        />
      )}

      <AppToast open={toastOpen} onOpenChange={setToastOpen} message={toastMessage} type={toastType} />
    </Box>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text, Button, Grid, Spinner, Card } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import { Icons } from '@/components/ui/icons/icons'
import {
  getBankAccounts, deleteBankAccount,
  BankAccount,
} from '@/services/bank-accounts.service'
import { AccountCard } from '@/components/bank-accounts/AccountCard'
import { AccountModal } from '@/components/bank-accounts/AccountModal'
import { StatsCards } from '@/components/bank-accounts/StatsCards'
import { BalanceChart } from '@/components/bank-accounts/BalanceChart'
import { AppToast } from '@/components/ui/AppToast'

function getUserIdFromToken(): number | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  if (!match) return null
  try {
    return JSON.parse(atob(match[1].split('.')[1])).user_id
  } catch { return null }
}

export default function BankAccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    const id = getUserIdFromToken()
    setUserId(id)
    if (!id) return
    getBankAccounts(id)
      .then(setAccounts)
      .catch(() => showToast('Error al cargar cuentas', 'error'))
      .finally(() => setLoading(false))
  }, [])

  function showToast(message: string, type: 'success' | 'error') {
    setToastMessage(message)
    setToastType(type)
    setToastOpen(true)
  }

  function handleSaved(account: BankAccount) {
    setAccounts(prev => {
      const exists = prev.find(a => a.id === account.id)
      return exists
        ? prev.map(a => a.id === account.id ? account : a)
        : [...prev, account]
    })
    setEditingAccount(null)
  }

  async function handleDelete(id: number) {
    try {
      await deleteBankAccount(id)
      setAccounts(prev => prev.filter(a => a.id !== id))
      showToast('Cuenta eliminada', 'success')
    } catch {
      showToast('Error al eliminar cuenta', 'error')
    }
  }

  function handleEdit(account: BankAccount) {
    setEditingAccount(account)
    setModalOpen(true)
  }

  function handleOpenNew() {
    setEditingAccount(null)
    setModalOpen(true)
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '60vh' }} gap="2">
        <Spinner /><Text color="gray">Cargando cuentas...</Text>
      </Flex>
    )
  }

  return (
    <Box p="5">

      {/* Header */}
      <Flex justify="between" align="center" mb="5">
        <Box>
          <Heading size="6">Cuentas bancarias</Heading>
          <Flex align="center" gap="1" mt="1">
            <Text size="1" color="gray">Dashboard</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1" color="gray">Finanzas</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1">Cuentas bancarias</Text>
          </Flex>
        </Box>
        <Button size="2" onClick={handleOpenNew}>
          <PlusIcon /> Nueva cuenta
        </Button>
      </Flex>

      {/* Stats */}
      <StatsCards accounts={accounts} />

      {/* Tarjetas de cuentas */}
      {accounts.length > 0 && (
        <Box mb="5">
          <Heading size="4" mb="3">Mis cuentas</Heading>
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
            {accounts.map(account => (
              <AccountCard
                key={account.id}
                account={account}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Sin cuentas */}
      {accounts.length === 0 && (
        <Card size="3" mb="5">
          <Flex direction="column" align="center" justify="center" py="9" gap="3">
            <Flex
              align="center"
              justify="center"
              style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gray-3)' }}
            >
              <Icons.finance width={28} height={28} style={{ color: 'var(--gray-8)' }} />
            </Flex>
            <Box style={{ textAlign: 'center' }}>
              <Text size="4" weight="bold" style={{ display: 'block', marginBottom: 4 }}>
                Sin cuentas bancarias
              </Text>
              <Text size="2" color="gray">
                Agrega tu primera cuenta para comenzar a gestionar tus finanzas
              </Text>
            </Box>
            <Button size="2" onClick={handleOpenNew} mt="2">
              <PlusIcon /> Agregar cuenta
            </Button>
          </Flex>
        </Card>
      )}

      {/* Gráficas */}
      {accounts.length > 0 && <BalanceChart accounts={accounts} />}

      {/* Modal */}
      {userId && (
        <AccountModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditingAccount(null) }}
          userId={userId}
          existing={editingAccount}
          onSaved={handleSaved}
        />
      )}

      <AppToast open={toastOpen} onOpenChange={setToastOpen} message={toastMessage} type={toastType} />
    </Box>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text, Button, Grid, Spinner, Card } from '@radix-ui/themes'
import { Icons } from '@/components/ui/icons/icons'
import { getExpenseProducts, deleteExpenseProduct } from '@/services'
import { ExpenseProduct } from '@/types'
import { ExpenseProductCard } from '@/components/expense-products/ExpenseProductCard'
import { ExpenseProductModal } from '@/components/expense-products/ExpenseProductModal'
import { AppToast } from '@/components/ui/AppToast'

function getUserIdFromToken(): number | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  if (!match) return null
  try {
    return JSON.parse(atob(match[1].split('.')[1])).user_id
  } catch { return null }
}

export default function ExpenseProductsPage() {
  const [products, setProducts] = useState<ExpenseProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ExpenseProduct | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    const id = getUserIdFromToken()
    setUserId(id)
    if (!id) return
    getExpenseProducts(id)
      .then(response => setProducts(response.results))
      .catch(() => showToast('Error al cargar productos', 'error'))
      .finally(() => setLoading(false))
  }, [])

  function showToast(message: string, type: 'success' | 'error') {
    setToastMessage(message)
    setToastType(type)
    setToastOpen(true)
  }

  function handleSaved(product: ExpenseProduct) {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id)
      return exists
        ? prev.map(p => p.id === product.id ? product : p)
        : [...prev, product]
    })
    setEditingProduct(null)
  }

  async function handleDelete(id: number) {
    try {
      await deleteExpenseProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      showToast('Producto eliminado', 'success')
    } catch {
      showToast('Error al eliminar producto', 'error')
    }
  }

  function handleEdit(product: ExpenseProduct) {
    setEditingProduct(product)
    setModalOpen(true)
  }

  function handleOpenNew() {
    setEditingProduct(null)
    setModalOpen(true)
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '60vh' }} gap="2">
        <Spinner /><Text color="gray">Cargando productos...</Text>
      </Flex>
    )
  }

  // Calcular total
  const totalProductos = products.reduce((sum, p) => sum + Number(p.subtotal || 0), 0)

  return (
    <Box p="5">

      {/* Header */}
      <Flex justify="between" align="center" mb="5">
        <Box>
          <Heading size="6">Productos de Gastos</Heading>
          <Flex align="center" gap="1" mt="1">
            <Text size="1" color="gray">Dashboard</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1" color="gray">Finanzas</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1">Productos de Gastos</Text>
          </Flex>
        </Box>
        <Button size="2" onClick={handleOpenNew}>
          <Icons.plusIcon /> Nuevo producto
        </Button>
      </Flex>

      {/* Stats */}
      <Card size="2" mb="5">
        <Flex direction="column" gap="1">
          <Text size="2" color="gray">Total subtotal</Text>
          <Text size="5" weight="bold" style={{ color: '#8B5CF6' }}>
            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(totalProductos)}
          </Text>
        </Flex>
      </Card>

      {/* Productos */}
      {products.length > 0 && (
        <Box mb="5">
          <Heading size="4" mb="3">Mis productos</Heading>
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
            {products.map(product => (
              <ExpenseProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Sin productos */}
      {products.length === 0 && (
        <Card size="3" mb="5">
          <Flex direction="column" align="center" justify="center" py="9" gap="3">
            <Flex
              align="center"
              justify="center"
              style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gray-3)' }}
            >
              <Icons.file width={28} height={28} style={{ color: 'var(--gray-8)' }} />
            </Flex>
            <Box style={{ textAlign: 'center' }}>
              <Text size="4" weight="bold" style={{ display: 'block', marginBottom: 4 }}>
                Sin productos
              </Text>
              <Text size="2" color="gray">
                Registra productos asociados a gastos
              </Text>
            </Box>
            <Button size="2" onClick={handleOpenNew} mt="2">
              <Icons.plusIcon /> Agregar producto
            </Button>
          </Flex>
        </Card>
      )}

      {/* Modal */}
      {userId && (
        <ExpenseProductModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditingProduct(null) }}
          userId={userId}
          existing={editingProduct}
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
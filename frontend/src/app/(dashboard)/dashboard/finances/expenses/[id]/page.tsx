'use client'

import { useEffect, useState, useMemo } from 'react'
import { Box, Card } from '@radix-ui/themes'
import { useParams } from 'next/navigation'

import { TableActions, DataTable, DataTableHeader, DataTablePagination, DataTableToolbar, StatusTabs, PageHeader } from '@/components/common'
import { ALL_EXPENSES_COLUMNS, ColumnKey, getExpensesColumns, getExpenseActions, exportExpenses, importExpenses } from '@/data/expenses'
import { getExpenses, updateExpense } from '@/services'
import { Expense } from '@/types'
import { ExpenseModal } from '@/components/expenses/ExpenseModal'
import { AppToast, Icons } from '@/components/ui'

const DEFAULT_COLUMNS: ColumnKey[] = ['title', 'amount', 'category', 'date', 'is_active']

const STATUS_TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'active', label: 'Activos' },
  { key: 'inactive', label: 'Inactivos' },
] as const

export default function ExpensesListPage() {
  const params = useParams()
  const userId = parseInt(params.id as string) || 1

  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState<number[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [editExpenseId, setEditExpenseId] = useState<number | null>(null)
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(DEFAULT_COLUMNS)

  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [toastOpen, setToastOpen] = useState(false)

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg)
    setToastType(type)
    setToastOpen(true)
  }

  useEffect(() => {
    loadExpenses()
  }, [userId])

  async function loadExpenses() {
    try {
      setLoading(true)
      const data = await getExpenses(userId)
      const parsed = Array.isArray(data) ? data : data.results
      setExpenses(parsed)
    } catch (error) {
      console.error(error)
      showToast('Error al cargar gastos', 'error')
      setExpenses([])
    } finally {
      setLoading(false)
    }
  }

  const expenseActions = getExpenseActions(
    (id) => setEditExpenseId(id),
    handleToggleStatus
  )

  async function handleToggleStatus(expense: Expense) {
    const newStatus = !expense.is_active

    try {
      await updateExpense(expense.id, { is_active: newStatus })

      setExpenses(prev =>
        prev.map(e =>
          e.id === expense.id
            ? { ...e, is_active: newStatus }
            : e
        )
      )

      showToast(
        `Gasto ${newStatus ? 'activado' : 'inactivado'} correctamente`
      )

    } catch {
      showToast('Error al actualizar estado', 'error')
    }
  }

  const categories = useMemo(() => {
    return [...new Set(expenses.map(e => e.category).filter(Boolean))] as string[]
  }, [expenses])

  const counts = useMemo(() => ({
    all: expenses.length,
    active: expenses.filter(e => e.is_active).length,
    inactive: expenses.filter(e => !e.is_active).length,
  }), [expenses])

  const filtered = useMemo(() => {
    return expenses.filter(e => {
      const matchTab =
        activeTab === 'all'
          ? true
          : activeTab === 'active'
            ? e.is_active
            : !e.is_active

      const matchCategory =
        categoryFilter === 'all' || e.category === categoryFilter

      const matchType =
        typeFilter === 'all' || e.type === typeFilter

      const matchSearch =
        !search ||
        e.title?.toLowerCase().includes(search.toLowerCase()) ||
        e.description?.toLowerCase().includes(search.toLowerCase())

      return matchTab && matchCategory && matchType && matchSearch
    })
  }, [expenses, activeTab, categoryFilter, typeFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage))

  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  function toggleSelect(id: number) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  function toggleAll() {
    setSelected(
      selected.length === paginated.length
        ? []
        : paginated.map(e => e.id)
    )
  }

  const editingExpense = editExpenseId
    ? expenses.find(e => e.id === editExpenseId)
    : null

  return (
    <Box p="5">

      <PageHeader
        title="Gastos"
        breadcrumb={['Dashboard', 'Finanzas', 'Gastos']}
        actionLabel="Agregar gasto"
        onAction={() => setCreateOpen(true)}
        icon={<Icons.analytics />}
      />

      <Card mt="4" size="2">

        <StatusTabs
          tabs={STATUS_TABS}
          active={activeTab}
          counts={counts}
          onChange={(key) => {
            setActiveTab(key)
            setCurrentPage(1)
          }}
        />

        <DataTableHeader
          dataFilter={categoryFilter}
          onDataFilterChange={(v) => {
            setCategoryFilter(v)
            setCurrentPage(1)
          }}
          search={search}
          onSearchChange={(v) => {
            setSearch(v)
            setCurrentPage(1)
          }}
          optionsFilters={categories}
          titleFilters="Todas las categorías"
        />

        <DataTableToolbar
          selectedCount={selected.length}
          columns={ALL_EXPENSES_COLUMNS}
          visibleColumns={visibleColumns}
          onExport={() => exportExpenses(expenses, selected, visibleColumns)}
          onImport={importExpenses}
          onToggleColumn={(key) => {
            setVisibleColumns(prev =>
              prev.includes(key)
                ? prev.filter(c => c !== key)
                : [...prev, key]
            )
          }}
        />

        <DataTable
          data={paginated}
          loading={loading}
          loadingText="Cargando gastos..."
          emptyText="No hay gastos registrados"
          selected={selected}
          onSelect={toggleSelect}
          onSelectAll={toggleAll}
          columns={getExpensesColumns(visibleColumns)}
          actions={(expense) => (
            <TableActions row={expense} actions={expenseActions} />
          )}
        />

        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={filtered.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows)
            setCurrentPage(1)
          }}
        />

      </Card>

      <AppToast
        open={toastOpen}
        onOpenChange={setToastOpen}
        message={toastMessage}
        type={toastType}
      />

      <ExpenseModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        userId={userId}
        onSaved={(e) => {
          setExpenses(prev => [e, ...prev])
          setCreateOpen(false)
        }}
      />

      {editingExpense && (
        <ExpenseModal
          open={editExpenseId !== null}
          onClose={() => setEditExpenseId(null)}
          userId={editingExpense.user}
          existing={editingExpense}
          onSaved={(e) =>
            setExpenses(prev =>
              prev.map(x => x.id === e.id ? e : x)
            )
          }
        />
      )}

    </Box>
  )
}
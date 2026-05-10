'use client'

import { useEffect, useMemo, useState } from 'react'
import { Box, Card } from '@radix-ui/themes'
import { useParams } from 'next/navigation'

import { PageHeader, DataTable, DataTableHeader, DataTablePagination, DataTableToolbar, TableActions, StatusTabs } from '@/components/common'
import { ALL_INCOME_COLUMNS, ColumnKey, exportIncomes, getIncomeActions, getIncomeColumns, importIncomes } from '@/data/incomes'
import { getIncomes, updateIncome } from '@/services'
import { Income } from '@/types'
import { IncomeModal } from '@/components/incomes/IncomeModal'
import { AppToast, Icons } from '@/components/ui'

const DEFAULT_COLUMNS: ColumnKey[] = ['amount', 'category', 'date', 'description', 'is_active']

const STATUS_TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'active', label: 'Activos' },
  { key: 'inactive', label: 'Inactivos' },
] as const

export default function IncomesPage() {
  const params = useParams()
  const userId = parseInt(params.id as string) || 0

  const [incomes, setIncomes] = useState<Income[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState<number[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [editingIncomeId, setEditingIncomeId] = useState<number | null>(null)
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
    loadIncomes()
  }, [userId])

  async function loadIncomes() {
    try {
      setLoading(true)
      const data = await getIncomes(userId)
      const parsed = Array.isArray(data) ? data : data.results
      setIncomes(parsed)
    } catch (error) {
      console.error(error)
      showToast('Error al cargar ingresos', 'error')
      setIncomes([])
    } finally {
      setLoading(false)
    }
  }

  const incomeActions = getIncomeActions(
    (id) => setEditingIncomeId(id),
    handleToggleStatus
  )

  async function handleToggleStatus(income: Income) {
    const newStatus = !income.is_active

    try {
      await updateIncome(income.id, { is_active: newStatus })

      setIncomes(prev =>
        prev.map(e =>
          e.id === income.id
            ? { ...e, is_active: newStatus }
            : e
        )
      )

      showToast(
        `Ingreso ${newStatus ? 'activado' : 'inactivado'} correctamente`
      )

    } catch {
      showToast('Error al actualizar estado', 'error')
    }
  }

  const categories = useMemo(
    () => [...new Set(incomes.map(i => i.category).filter(Boolean))] as string[],
    [incomes]
  )

  const counts = useMemo(() => ({
    all: incomes.length,
    active: incomes.filter(i => i.is_active).length,
    inactive: incomes.filter(i => !i.is_active).length,
  }), [incomes])

  const filtered = useMemo(() => {
    return incomes.filter(i => {
      const matchTab =
        activeTab === 'all'
          ? true
          : activeTab === 'active'
            ? i.is_active
            : !i.is_active

      const matchCategory =
        categoryFilter === 'all' || i.category === categoryFilter

      const matchSearch =
        !search ||
        i.description.toLowerCase().includes(search.toLowerCase()) ||
        i.category.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().includes(search)

      return matchTab && matchCategory && matchSearch
    })
  }, [incomes, categoryFilter, search, activeTab])

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage))

  const paginatedIncomes = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  function toggleSelect(id: number) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  function toggleAll() {
    setSelected(
      selected.length === paginatedIncomes.length
        ? []
        : paginatedIncomes.map(income => income.id)
    )
  }

  const editingIncome = editingIncomeId
    ? incomes.find(i => i.id === editingIncomeId)
    : null

  return (
    <Box p="5">
      <PageHeader
        title="Ingresos"
        breadcrumb={['Dashboard', 'Finanzas', 'Ingresos']}
        actionLabel="Agregar ingreso"
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
          onDataFilterChange={(value) => {
            setCategoryFilter(value)
            setCurrentPage(1)
          }}
          search={search}
          onSearchChange={(value) => {
            setSearch(value)
            setCurrentPage(1)
          }}
          optionsFilters={categories}
          titleFilters="Todas las categorías"
        />

        <DataTableToolbar<Income>
          selectedCount={selected.length}
          columns={ALL_INCOME_COLUMNS as { key: keyof Income; label: string }[]}
          visibleColumns={visibleColumns as (keyof Income)[]}
          onExport={() => exportIncomes(incomes, selected, visibleColumns)}
          onImport={importIncomes}
          onToggleColumn={(key) => {
            setVisibleColumns(prev =>
              prev.includes(key as ColumnKey)
                ? prev.filter(column => column !== key)
                : [...prev, key as ColumnKey]
            )
          }}
        />

        <DataTable
          data={paginatedIncomes}
          loading={loading}
          loadingText="Cargando ingresos..."
          emptyText="No hay ingresos registrados"
          selected={selected}
          onSelect={toggleSelect}
          onSelectAll={toggleAll}
          columns={getIncomeColumns(visibleColumns)}
          actions={(income) => (
            <TableActions row={income} actions={incomeActions} />
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

      <IncomeModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        userId={userId}
        onSaved={(e) => {
          setIncomes(prev => [e, ...prev])
          setCreateOpen(false)
        }}
      />

      {editingIncome && (
        <IncomeModal
          open={editingIncomeId !== null}
          onClose={() => setEditingIncomeId(null)}
          userId={editingIncome.user}
          existing={editingIncome}
          onSaved={(e) =>
            setIncomes(prev =>
              prev.map(x => x.id === e.id ? e : x)
            )
          }
        />
      )}

    </Box>
  )
}

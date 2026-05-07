'use client'

import { useEffect, useState, useMemo } from 'react'
import { Box, Card } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

import { TableActions, DataTable, DataTableHeader, DataTablePagination, DataTableToolbar, StatusTabs, PageHeader } from '@/components/common'
import { ALL_USER_COLUMNS, ColumnKey, getUserColumns, getUserActions, exportUsers, importUsers } from '@/data/users'
import { getUsers, updateUserStatus } from '@/services'
import { User } from '@/types'
import { CreateUserModal } from '@/components/users/CreateUserModal'
import { EditUserModal } from '@/components/users/EditUserModal'
import { AppToast, Icons } from '@/components/ui'

const DEFAULT_COLUMNS: ColumnKey[] = ['name', 'phone', 'role', 'status', 'verified']

const STATUS_TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'active', label: 'Activos' },
  { key: 'inactive', label: 'Inactivos' },
] as const

export default function UsersListPage() {
  const router = useRouter()

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState<number[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [editUserId, setEditUserId] = useState<number | null>(null)
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
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      const data = await getUsers()
      const parsed = Array.isArray(data) ? data : data.results
      setUsers(parsed)
    } catch (error) {
      console.error(error)
      showToast('Error al cargar usuarios', 'error')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const userActions = getUserActions(
    router,
    (id) => setEditUserId(id),
    handleToggleStatus
  )

  async function handleToggleStatus(user: User) {
    const newStatus = !user.is_active

    try {
      await updateUserStatus(user.id, newStatus)

      setUsers(prev =>
        prev.map(u =>
          u.id === user.id
            ? { ...u, is_active: newStatus }
            : u
        )
      )

      showToast(
        `Usuario ${newStatus ? 'activado' : 'inactivado'} correctamente`
      )

    } catch {
      showToast('Error al actualizar estado', 'error')
    }
  }

  const roles = useMemo(() => {
    return [...new Set(users.map(u => u.role).filter(Boolean))] as string[]
  }, [users])

  const counts = useMemo(() => ({
    all: users.length,
    active: users.filter(u => u.is_active).length,
    inactive: users.filter(u => !u.is_active).length,
  }), [users])

  const filtered = useMemo(() => {
    return users.filter(u => {
      const matchTab =
        activeTab === 'all'
          ? true
          : activeTab === 'active'
            ? u.is_active
            : !u.is_active

      const matchRole =
        roleFilter === 'all' || u.role === roleFilter

      const matchSearch =
        !search ||
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())

      return matchTab && matchRole && matchSearch
    })
  }, [users, activeTab, roleFilter, search])

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
        : paginated.map(u => u.id)
    )
  }

  return (
    <Box p="5">

      <PageHeader
        title="Cuentas"
        breadcrumb={['Dashboard', 'Usuarios', 'Cuentas']}
        actionLabel="Agregar usuario"
        onAction={() => setCreateOpen(true)}
        icon={<Icons.user />}
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
          dataFilter={roleFilter}
          onDataFilterChange={(v) => {
            setRoleFilter(v)
            setCurrentPage(1)
          }}
          search={search}
          onSearchChange={(v) => {
            setSearch(v)
            setCurrentPage(1)
          }}
          optionsFilters={roles}
          titleFilters="Todos los roles"
        />

        <DataTableToolbar
          selectedCount={selected.length}
          columns={ALL_USER_COLUMNS}
          visibleColumns={visibleColumns}
          onExport={() => exportUsers(users, selected, visibleColumns)}
          onImport={importUsers}
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
          selected={selected}
          onSelect={toggleSelect}
          onSelectAll={toggleAll}
          columns={getUserColumns(router, visibleColumns)}
          actions={(user) => (
            <TableActions row={user} actions={userActions} />
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

      <CreateUserModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(u) => setUsers(prev => [u, ...prev])}
      />

      <EditUserModal
        userId={editUserId}
        open={editUserId !== null}
        onClose={() => setEditUserId(null)}
        onUpdated={(u) =>
          setUsers(prev =>
            prev.map(x => x.id === u.id ? u : x)
          )
        }
      />

    </Box>
  )
}
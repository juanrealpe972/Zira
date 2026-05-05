'use client'

import { PageHeader } from '@/components/common/PageHeader'
import { StatusTabs } from '@/components/common/StatusTabs'
import { UsersTableHeader } from '@/components/users/UsersTableHeader'
import { UsersTableData } from '@/components/users/UsersTableData'
import { UsersTableToolbar } from '@/components/users/UsersTableToolbar'
import { UsersTableActions } from '@/components/users/UsersTableActions'
import { UsersTablePagination } from '@/components/users/UsersTablePagination'

import { useEffect, useState, useMemo } from 'react'
import { Box, Flex, Text, Card, Badge, Avatar, Dialog } from '@radix-ui/themes'
import { PersonIcon } from '@radix-ui/react-icons'
import { getUsers, updateUserStatus } from '@/services'
import { User } from '@/types'
import { useRouter } from 'next/navigation'
import { CreateUserModal } from '@/components/users/CreateUserModal'
import { EditUserModal } from '@/components/users/EditUserModal'
import { AppToast } from '@/components/ui'

type ColumnKey = 'name' | 'email' | 'phone' | 'role' | 'company' |
  'country' | 'city' | 'verified' | 'is_staff' | 'created_at' | 'status' | 'description' | 'national_id'

const ALL_COLUMNS: { key: ColumnKey; label: string }[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'phone', label: 'Teléfono' },
  { key: 'role', label: 'Rol' },
  { key: 'company', label: 'Empresa' },
  { key: 'country', label: 'País' },
  { key: 'city', label: 'Ciudad' },
  { key: 'verified', label: 'Verificado' },
  { key: 'is_staff', label: 'Staff' },
  { key: 'created_at', label: 'Fecha creación' },
  { key: 'status', label: 'Estado' },
  { key: 'description', label: 'Descripción' },
  { key: 'national_id', label: 'ID nacional' },
]

const DEFAULT_COLUMNS: ColumnKey[] = ['name', 'phone', 'role', 'status', 'verified']

const STATUS_TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'active', label: 'Activos' },
  { key: 'inactive', label: 'Inactivos' },
] as const

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

export default function UsersListPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState<number[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [editUserId, setEditUserId] = useState<number | null>(null)
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(DEFAULT_COLUMNS)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [toastOpen, setToastOpen] = useState(false)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message)
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
      console.error('Error cargando usuarios:', error)
      // Verificar si hay token disponible
      const token = document.cookie.split('; ').find(row => row.startsWith('zira_access='))
      console.log('Token disponible:', !!token)
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar usuarios'
      showToast(errorMessage, 'error')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  function handleUserCreated(user: User) {
    setUsers(prev => [user, ...prev])
  }

  function handleUserUpdated(updated: User) {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
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
        activeTab === 'all' ? true :
          activeTab === 'active' ? u.is_active :
            !u.is_active

      const matchRole = roleFilter === 'all' || u.role === roleFilter

      const matchSearch = !search ||
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
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  function toggleAll() {
    setSelected(
      selected.length === paginated.length ? [] : paginated.map(u => u.id)
    )
  }

  async function handleToggleStatus(user: User) {
    try {
      await updateUserStatus(user.id, !user.is_active)
      setUsers(prev =>
        prev.map(u => u.id === user.id ? { ...u, is_active: !u.is_active } : u)
      )
      showToast(
        `Usuario ${user.is_active ? 'inactivado' : 'activado'} correctamente`,
        'success'
      )
    } catch (error) {
      console.error('Error al actualizar estado:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar estado del usuario'
      showToast(errorMessage, 'error')
    }
  }

  function handleExport() {
    const selectedUsers = users.filter(u => selected.includes(u.id))
    if (selectedUsers.length === 0) {
      alert('Selecciona usuarios para exportar')
      return
    }
    const csv = [
      visibleColumns.join(','),
      ...selectedUsers.map(u =>
        visibleColumns.map(col => {
          switch (col) {
            case 'name': return u.name
            case 'email': return u.email
            case 'phone': return u.phone
            case 'role': return u.role
            case 'company': return u.company
            case 'country': return u.country
            case 'city': return u.city
            case 'verified': return u.verified ? 'Sí' : 'No'
            case 'is_staff': return u.is_staff ? 'Sí' : 'No'
            case 'created_at': return formatDate(u.created_at)
            case 'status': return u.is_active ? 'Activo' : 'Inactivo'
            case 'description': return u.description
            case 'national_id': return u.national_id
            default: return ''
          }
        }).join(',')
      )
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'usuarios.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport() {
    alert('Funcionalidad de importación no implementada aún')
  }

  const getColumns = () => {
    return visibleColumns.map(key => {
      const col = ALL_COLUMNS.find(c => c.key === key)
      if (!col) return null

      let render: (user: User) => React.ReactNode

      switch (key) {
        case 'name':
          render = (user) => (
            <Flex align="center" gap="2">
              <Avatar
                size="2"
                src={user.photo ?? undefined}
                fallback={<PersonIcon />}
                radius="full"
              />

              <Box>
                <Text
                  size="2"
                  weight="medium"
                  onClick={() => router.push(`/dashboard/users/profile/${user.id}`)}
                  style={{
                    cursor: 'pointer',
                    display: 'block',
                  }}
                >
                  {user.name}
                </Text>

                <Text
                  size="1"
                  color="gray"
                  style={{
                    display: 'block',
                  }}
                >
                  {user.email}
                </Text>
              </Box>
            </Flex>
          )
          break
        case 'email':
          render = (user) => user.email ?? '—'
          break
        case 'phone':
          render = (user) => user.phone ?? '—'
          break
        case 'role':
          render = (user) => user.role ?? '—'
          break
        case 'company':
          render = (user) => user.company ?? '—'
          break
        case 'country':
          render = (user) => user.country ?? '—'
          break
        case 'city':
          render = (user) => user.city ?? '—'
          break
        case 'verified':
          render = (user) => user.verified ? 'Sí' : 'No'
          break
        case 'is_staff':
          render = (user) => user.is_staff ? 'Sí' : 'No'
          break
        case 'created_at':
          render = (user) => formatDate(user.created_at)
          break
        case 'status':
          render = (user) => (
            <Badge
              color={user.is_active ? 'green' : 'red'}
              variant="soft"
              radius="full"
            >
              {user.is_active ? 'Activo' : 'Inactivo'}
            </Badge>
          )
          break
        case 'description':
          render = (user) => user.description ?? '—'
          break
        case 'national_id':
          render = (user) => user.national_id ?? '—'
          break
        default:
          render = () => '—'
      }

      return { key, label: col.label, render }
    }).filter(Boolean) as { key: string; label: string; render: (user: User) => React.ReactNode }[]
  }

  return (
    <Box p="5">

      <PageHeader
        title="Cuentas"
        breadcrumb={['Dashboard', 'Usuarios', 'Cuentas']}
        actionLabel="Agregar usuario"
        onAction={() => setCreateOpen(true)}
        icon={<PersonIcon />}
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

        <UsersTableHeader
          roleFilter={roleFilter}
          onRoleFilterChange={(v) => { setRoleFilter(v); setCurrentPage(1) }}
          search={search}
          onSearchChange={(v) => { setSearch(v); setCurrentPage(1) }}
          roles={roles}
        />

        <UsersTableToolbar
          selectedCount={selected.length}
          columns={ALL_COLUMNS}
          visibleColumns={visibleColumns}
          onExport={handleExport}
          onImport={handleImport}
          onToggleColumn={(key) => {
            setVisibleColumns(prev =>
              prev.includes(key)
                ? prev.filter(c => c !== key)
                : [...prev, key]
            )
          }}
        />

        <UsersTableData
          data={paginated}
          loading={loading}
          selected={selected}
          onSelect={toggleSelect}
          onSelectAll={toggleAll}
          columns={getColumns()}
          actions={(user) => (
            <UsersTableActions
              user={user}
              onEdit={setEditUserId}
              onViewProfile={(id) => router.push(`/dashboard/users/profile/${id}`)}
              onToggleStatus={handleToggleStatus}
            />
          )}
        />

        <UsersTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={filtered.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(rows: number) => { setRowsPerPage(rows); setCurrentPage(1) }}
        />

      </Card>

      <AppToast
        open={toastOpen}
        onOpenChange={setToastOpen}
        message={toastMessage}
        type={toastType}
      />

      <Dialog.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
        <Dialog.Content>
          <Dialog.Title>Configurar columnas</Dialog.Title>
          <Dialog.Description>
            Selecciona las columnas que quieres mostrar en la tabla.
          </Dialog.Description>
          <Flex direction="column" gap="2" mt="4">
            {ALL_COLUMNS.map(col => (
              <label key={col.key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(col.key)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setVisibleColumns(prev => [...prev, col.key])
                    } else {
                      setVisibleColumns(prev => prev.filter(c => c !== col.key))
                    }
                  }}
                />
                {col.label}
              </label>
            ))}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <CreateUserModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleUserCreated}
      />

      <EditUserModal
        userId={editUserId}
        open={editUserId !== null}
        onClose={() => setEditUserId(null)}
        onUpdated={handleUserUpdated}
      />

    </Box>
  )
}
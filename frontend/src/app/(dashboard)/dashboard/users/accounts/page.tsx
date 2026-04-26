'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  Box, Flex, Heading, Text, Card, Badge, Avatar,
  TextField, Select, DropdownMenu, IconButton,
  Checkbox, Button, Separator,
} from '@radix-ui/themes'
import {
  MagnifyingGlassIcon, DotsHorizontalIcon, Pencil1Icon,
  PersonIcon, DownloadIcon, UploadIcon, ChevronLeftIcon, ChevronRightIcon, DotsVerticalIcon,
  MixerHorizontalIcon,
} from '@radix-ui/react-icons'
import { getUsers, PaginatedResponse, updateUserStatus, User } from '@/services/users.service'
import { useRouter } from 'next/navigation'
import { CreateUserModal } from '@/components/users/CreateUserModal'
import { EditUserModal } from '@/components/users/EditUserModal'


type ColumnKey = 'name' | 'email' | 'phone' | 'role' | 'company' |
  'country' | 'city' | 'verified' | 'is_staff' | 'created_at' | 'status' | 'description' | 'national_id'

const ALL_COLUMNS: { key: ColumnKey; label: string }[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Email' },
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

const DEFAULT_COLUMNS: ColumnKey[] = ['name', 'email', 'phone', 'role', 'status']

const STATUS_TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'active', label: 'Activos' },
  { key: 'inactive', label: 'Inactivos' },
] as const

const ROWS_OPTIONS = [5, 10, 25, 50]

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
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(DEFAULT_COLUMNS)
  const [createOpen, setCreateOpen] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [editUserId, setEditUserId] = useState<number | null>(null)

  useEffect(() => {
    getUsers()
      .then((data: User[] | PaginatedResponse<User>) => {
        const parsed = Array.isArray(data) ? data : data.results
        // console.log(`Usuarios cargados: ${parsed.length}`)
        setUsers(parsed)
      })
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [])

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

  function toggleColumn(key: ColumnKey) {
    setVisibleColumns(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  async function handleToggleStatus(user: User) {
    try {
      await updateUserStatus(user.id, !user.is_active)
      setUsers(prev =>
        prev.map(u => u.id === user.id ? { ...u, is_active: !u.is_active } : u)
      )
    } catch {
      console.error('Error al actualizar estado')
    }
  }

  function renderCell(user: User, col: ColumnKey) {
    switch (col) {
      case 'name':
        return (
          <Flex align="center" gap="2">
            <Avatar
              size="2"
              src={user.photo ?? undefined}
              fallback={<PersonIcon />}
              radius="full"
              style={{ background: 'var(--accent-3)', flexShrink: 0 }}
            />
            <Box>
              <Text
                size="2"
                weight="medium"
                onClick={() => router.push(`/dashboard/users/profile/${user.id}`)}
                style={{
                  display: 'block',
                  cursor: 'pointer',
                  color: 'var(--gray-12)',
                  textDecoration: hoveredRow === user.id ? 'underline solid var(--accent-9)' : 'none',
                  transition: 'text-decoration 0.15s',
                }}
              >
                {user.name}
              </Text>
              {/* Email debajo del nombre */}
              <Text size="1" color="gray" style={{ display: 'block' }}>
                {user.email}
              </Text>
            </Box>
          </Flex>
        )
      case 'email':
        return <Text size="2" color="gray">{user.email}</Text>
      case 'phone':
        return (
          <Text size="2" color="gray">
            {user.phone_prefix && user.phone
              ? `${user.phone_prefix} ${user.phone}`
              : user.phone ?? '—'}
          </Text>
        )
      case 'role':
        return <Text size="2">{user.role ?? '—'}</Text>
      case 'company':
        return <Text size="2" color="gray">{user.company ?? '—'}</Text>
      case 'country':
        return <Text size="2" color="gray">{user.country ?? '—'}</Text>
      case 'city':
        return <Text size="2" color="gray">{user.city ?? '—'}</Text>
      case 'verified':
        return (
          <Badge size="1" color={user.verified ? 'green' : 'gray'} variant="soft" radius="full">
            {user.verified ? 'Verificado' : 'No verificado'}
          </Badge>
        )
      case 'is_staff':
        return (
          <Badge size="1" color={user.is_staff ? 'blue' : 'gray'} variant="soft" radius="full">
            {user.is_staff ? 'Staff' : 'Usuario'}
          </Badge>
        )
      case 'created_at':
        return <Text size="2" color="gray">{formatDate(user.created_at)}</Text>
      case 'status':
        return (
          <Badge
            size="1"
            color={user.is_active ? 'green' : 'red'}
            variant="soft"
            radius="full"
          >
            {user.is_active ? 'Activo' : 'Inactivo'}
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Box p="5">

      {/* Header */}
      <Flex justify="between" align="center" mb="2">
        <Box>
          <Heading size="6">Cuentas</Heading>
          <Flex align="center" gap="1" mt="1">
            <Text size="1" color="gray">Dashboard</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1" color="gray">Usuarios</Text>
            <Text size="1" color="gray">•</Text>
            <Text size="1">Cuentas</Text>
          </Flex>
        </Box>
        <Button size="2" onClick={() => setCreateOpen(true)}>
          <PersonIcon /> Agregar usuario
        </Button>
      </Flex>

      <Card mt="4" size="2">

        {/* Tabs */}
        <Flex gap="4" mb="4" style={{ borderBottom: '1px solid var(--gray-4)' }}>
          {STATUS_TABS.map(tab => (
            <Box
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setCurrentPage(1) }}
              style={{
                cursor: 'pointer',
                paddingBottom: 12,
                borderBottom: activeTab === tab.key
                  ? '2px solid var(--accent-9)'
                  : '2px solid transparent',
                transition: 'border-color 0.15s ease',
              }}
            >
              <Flex align="center" gap="2">
                <Text
                  size="2"
                  weight={activeTab === tab.key ? 'bold' : 'regular'}
                  style={{ color: activeTab === tab.key ? 'var(--accent-9)' : 'var(--gray-11)' }}
                >
                  {tab.label}
                </Text>
                <Badge
                  size="1"
                  variant="soft"
                  color={activeTab === tab.key ? 'indigo' : 'gray'}
                  radius="full"
                >
                  {counts[tab.key as keyof typeof counts]}
                </Badge>
              </Flex>
            </Box>
          ))}
        </Flex>

        {/* Filtros */}
        <Flex gap="3" mb="4" align="center" wrap="wrap">
          {/* Rol */}
          <Select.Root
            value={roleFilter}
            onValueChange={v => { setRoleFilter(v); setCurrentPage(1) }}
          >
            <Select.Trigger placeholder="Rol" style={{ minWidth: 140 }} />
            <Select.Content>
              <Select.Item value="all">Todos los roles</Select.Item>
              {roles.map(role => (
                <Select.Item key={role} value={role}>{role}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          {/* Búsqueda */}
          <Box style={{ flex: 1, minWidth: 200 }}>
            <TextField.Root
              placeholder="Buscar por nombre o email..."
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            >
              <TextField.Slot>
                <MagnifyingGlassIcon />
              </TextField.Slot>
            </TextField.Root>
          </Box>

          {/* Contador resultados */}
          {(search || roleFilter !== 'all' || activeTab !== 'all') && (
            <Text size="1" color="gray">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </Text>
          )}

          {/* Columnas visibles */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="outline" size="2" title="Columnas visibles">
                <MixerHorizontalIcon />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <Text size="1" color="gray" style={{ padding: '4px 8px', display: 'block' }}>
                Columnas visibles
              </Text>
              <DropdownMenu.Separator />
              {ALL_COLUMNS.map(col => (
                <DropdownMenu.Item
                  key={col.key}
                  onSelect={e => { e.preventDefault(); toggleColumn(col.key) }}
                >
                  <Flex align="center" gap="2">
                    <Checkbox checked={visibleColumns.includes(col.key)} />
                    <Text size="2">{col.label}</Text>
                  </Flex>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Imprimir / Exportar / Importar */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost" size="2">
                <DotsHorizontalIcon />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Item><UploadIcon /> Imprimir</DropdownMenu.Item>
              <DropdownMenu.Item><DownloadIcon /> Exportar</DropdownMenu.Item>
              <DropdownMenu.Item><UploadIcon /> Importar</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>

        {loading ? (
          <Flex align="center" justify="center" py="8">
            <Text color="gray">Cargando usuarios...</Text>
          </Flex>
        ) : paginated.length === 0 ? (
          <Flex align="center" justify="center" py="8">
            <Text color="gray">No se encontraron usuarios</Text>
          </Flex>
        ) : (
          <>
            <Box style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--gray-2)' }}>
                    <th style={{ width: 40, padding: '10px 12px' }}>
                      <Checkbox
                        checked={selected.length === paginated.length && paginated.length > 0}
                        onCheckedChange={toggleAll}
                      />
                    </th>
                    {visibleColumns.map(col => (
                      <th
                        key={col}
                        style={{
                          padding: '10px 12px',
                          textAlign: 'left',
                          fontSize: 11,
                          fontWeight: 700,
                          color: 'var(--gray-10)',
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {ALL_COLUMNS.find(c => c.key === col)?.label}
                      </th>
                    ))}
                    <th style={{ padding: '10px 12px', width: 40 }} />
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((user, i) => (
                    <tr
                      key={user.id}
                      onMouseEnter={() => setHoveredRow(user.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        borderTop: '1px solid var(--gray-3)',
                        background: selected.includes(user.id)
                          ? 'var(--accent-2)'
                          : hoveredRow === user.id
                            ? 'var(--gray-2)'        // ← fondo sutil en hover
                            : i % 2 === 0 ? 'transparent' : 'var(--gray-1)',
                        transition: 'background 0.15s',
                      }}
                    >
                      <td style={{ padding: '10px 12px' }}>
                        <Checkbox
                          checked={selected.includes(user.id)}
                          onCheckedChange={() => toggleSelect(user.id)}
                        />
                      </td>

                      {visibleColumns.map(col => (
                        <td key={col} style={{ padding: '10px 12px' }}>
                          {renderCell(user, col)}
                        </td>
                      ))}

                      {/* Acciones */}
                      <td style={{ padding: '10px 12px' }}>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger>
                            <IconButton variant="ghost" size="1">
                              <DotsVerticalIcon />
                            </IconButton>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content align="end" size="1">
                            <DropdownMenu.Item onClick={() => setEditUserId(user.id)}>
                              <Pencil1Icon /> Editar
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              onClick={() => router.push(`/dashboard/users/profile/${user.id}`)}
                            >
                              <PersonIcon /> Ver perfil
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item
                              color={user.is_active ? 'red' : 'green'}
                              onClick={() => handleToggleStatus(user)}
                            >
                              {user.is_active ? 'Inactivar' : 'Activar'}
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            <Separator size="4" mt="3" />

            {/* Paginación */}
            <Flex justify="between" align="center" mt="3" wrap="wrap" gap="2">
              <Flex align="center" gap="2">
                <Text size="1" color="gray">Filas por página:</Text>
                <Select.Root
                  value={String(rowsPerPage)}
                  onValueChange={v => { setRowsPerPage(Number(v)); setCurrentPage(1) }}
                >
                  <Select.Trigger style={{ minWidth: 70 }} />
                  <Select.Content>
                    {ROWS_OPTIONS.map(n => (
                      <Select.Item key={n} value={String(n)}>{n}</Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Flex align="center" gap="3">
                <Text size="1" color="gray">
                  {(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, filtered.length)} de {filtered.length}
                </Text>
                <Flex gap="1">
                  <IconButton
                    variant="ghost"
                    size="1"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton
                    variant="ghost"
                    size="1"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Card>
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
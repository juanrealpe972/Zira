'use client'

import { Box, Table } from '@radix-ui/themes'
import { User } from '@/types'

type Column = {
  key: string
  label: string
  render: (user: User) => React.ReactNode
}

type Props = {
  data: User[]
  loading: boolean
  selected: number[]
  onSelect: (id: number) => void
  onSelectAll: () => void
  columns: Column[]
  actions?: (user: User) => React.ReactNode
}

export function UsersTableData({
  data,
  loading,
  selected,
  onSelect,
  onSelectAll,
  columns,
  actions,
}: Props) {

  if (loading) {
    return <Box p="4">Cargando...</Box>
  }

  return (
    <Table.Root variant="surface" style={{ width: '100%' }}>
      
      {/* HEADER */}
      <Table.Header>
        <Table.Row>

          {/* Checkbox header */}
          <Table.ColumnHeaderCell style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center',  width: '100%', height: '100%' }}>
              <input
                type="checkbox"
                checked={selected.length === data.length && data.length > 0}
                onChange={onSelectAll}
              />
            </div>
          </Table.ColumnHeaderCell>

          {/* Columnas */}
          {columns.map(col => (
            <Table.ColumnHeaderCell
              key={col.key}
              style={{ textAlign: 'center' }}
            >
              {col.label}
            </Table.ColumnHeaderCell>
          ))}

          {/* Acciones */}
          {actions && (
            <Table.ColumnHeaderCell style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', height: '100%' }} />
          )}

        </Table.Row>
      </Table.Header>

      {/* BODY */}
      <Table.Body>
        {data.map(user => (
          <Table.Row key={user.id}>

            {/* Checkbox */}
            <Table.Cell style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={() => onSelect(user.id)}
                />
              </div>
            </Table.Cell>

            {/* Celdas */}
            {columns.map(col => (
              <Table.Cell
                key={col.key}
                style={{ textAlign: 'left', height: '100%', alignItems: 'center' }}
              >
                <div style={{ display: 'flex', justifyContent: 'left', width: '100%', height: '100%' }}>
                  {col.render(user)}
                </div>
              </Table.Cell>
            ))}

            {/* Acciones */}
            {actions && (
              <Table.Cell style={{ textAlign: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                  {actions(user)}
                </div>
              </Table.Cell>
            )}

          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
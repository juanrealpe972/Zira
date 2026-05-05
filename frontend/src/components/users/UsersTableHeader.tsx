'use client'

import { Box, Flex, Select, TextField } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

type Props = {
  roleFilter: string
  onRoleFilterChange: (value: string) => void
  search: string
  onSearchChange: (value: string) => void
  roles: string[]
}

export function UsersTableHeader({
  roleFilter,
  onRoleFilterChange,
  search,
  onSearchChange,
  roles,
}: Props) {
  return (
    <Flex gap="3" mb="4" align="center" wrap="wrap">
      <Select.Root
        value={roleFilter}
        onValueChange={onRoleFilterChange}
      >
        <Select.Trigger placeholder="Rol" style={{ minWidth: 140 }} />
        <Select.Content>
          <Select.Item value="all">Todos los roles</Select.Item>
          {roles.map(role => (
            <Select.Item key={role} value={role}>{role}</Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Box style={{ flex: 1, minWidth: 200 }}>
        <TextField.Root
          placeholder="Buscar..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>
      </Box>
    </Flex>
  )
}
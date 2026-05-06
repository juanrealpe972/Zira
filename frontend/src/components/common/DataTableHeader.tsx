'use client'

import { Box, Flex, Select, TextField } from '@radix-ui/themes'
import { Icons } from '@/components/ui'

type Props = {
  dataFilter: string
  onDataFilterChange: (value: string) => void
  search: string
  onSearchChange: (value: string) => void
  optionsFilters: string[]
  titleFilters: string
}

export function DataTableHeader({ dataFilter, onDataFilterChange, search, onSearchChange, optionsFilters, titleFilters }: Props) {
  return (
    <Flex gap="3" mb="4" align="center" wrap="wrap">
      <Select.Root
        value={dataFilter}
        onValueChange={onDataFilterChange}
      >
        <Select.Trigger placeholder="Rol" style={{ minWidth: 140 }} />
        <Select.Content>
          <Select.Item value="all">{titleFilters}</Select.Item>
          {optionsFilters.map(optionFilter => (
            <Select.Item key={optionFilter} value={optionFilter}>{optionFilter}</Select.Item>
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
            <Icons.magnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>
      </Box>
    </Flex>
  )
}
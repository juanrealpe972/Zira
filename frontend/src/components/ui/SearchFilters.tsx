'use client'

import { useState, useCallback } from 'react'
import { Flex, TextField, Select, Button } from '@radix-ui/themes'
import { Icons } from '@/components/ui'
import { debounce } from '@/lib/utils'

interface Props {
  onSearch: (search: string) => void
  onFilterChange?: (filters: Record<string, string>) => void
  placeholder?: string
  filters?: {
    key: string
    label: string
    options: { value: string; label: string }[]
  }[]
  searchValue?: string
}

export function SearchFilters({ 
  onSearch, 
  onFilterChange, 
  placeholder = 'Buscar...',
  filters = [],
  searchValue = ''
}: Props) {
  const [search, setSearch] = useState(searchValue)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  // Debounce para evitar muchas llamadas
  const debouncedSearch = useCallback(
    debounce((value: string) => onSearch(value), 300),
    [onSearch]
  )

  const handleSearchChange = (value: string) => {
    setSearch(value)
    debouncedSearch(value)
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value }
    setActiveFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const clearFilters = () => {
    setSearch('')
    setActiveFilters({})
    onSearch('')
    onFilterChange?.({})
  }

  const hasActiveFilters = search || Object.keys(activeFilters).length > 0

  return (
    <Flex direction="column" gap="3" mb="4">
      <Flex gap="3" align="center" wrap="wrap">
        <TextField.Root 
          style={{ flex: 1, minWidth: 200 }}
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={placeholder}
        >
          <TextField.Slot>
            <Icons.magnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {filters.map((filter) => (
          <Select.Root
            key={filter.key}
            value={activeFilters[filter.key] || ''}
            onValueChange={(value) => handleFilterChange(filter.key, value)}
          >
            <Select.Trigger placeholder={filter.label} style={{ minWidth: 120 }} />
            <Select.Content>
              <Select.Item value="">Todos</Select.Item>
              {filter.options.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        ))}

        {hasActiveFilters && (
          <Button variant="ghost" size="1" onClick={clearFilters}>
            <Icons.close width={14} height={14} />
            Limpiar
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
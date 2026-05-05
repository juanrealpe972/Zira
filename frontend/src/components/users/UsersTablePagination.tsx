'use client'

import { Flex, Button, Text, Select } from '@radix-ui/themes'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

type Props = {
  currentPage: number
  totalPages: number
  rowsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
  rowsOptions?: number[]
}

export function UsersTablePagination({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
  rowsOptions = [5, 10, 25, 50],
}: Props) {
  const startItem = (currentPage - 1) * rowsPerPage + 1
  const endItem = Math.min(currentPage * rowsPerPage, totalItems)

  return (
    <Flex justify="between" align="center" mt="4">
      <Flex gap="2" align="center">
        <Text size="2" color="gray">
          Mostrando {startItem}-{endItem} de {totalItems}
        </Text>
        <Select.Root
          value={rowsPerPage.toString()}
          onValueChange={value => onRowsPerPageChange(parseInt(value))}
        >
          <Select.Trigger style={{ width: 80 }} />
          <Select.Content>
            {rowsOptions.map(option => (
              <Select.Item key={option} value={option.toString()}>
                {option}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Text size="2" color="gray">por página</Text>
      </Flex>

      <Flex gap="1" align="center">
        <Button
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeftIcon />
        </Button>

        <Text size="2">
          Página {currentPage} de {totalPages}
        </Text>

        <Button
          variant="soft"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRightIcon />
        </Button>
      </Flex>
    </Flex>
  )
}
'use client'

import { Flex, IconButton, Text, Box } from '@radix-ui/themes'
import { Icons } from '@/components/ui'

interface Props {
  page: number
  totalPages: number
  count: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, count, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const canGoPrevious = page > 1
  const canGoNext = page < totalPages

  return (
    <Flex align="center" justify="between" py="4">
      <Text size="2" color="gray">
        Mostrando {((page - 1) * 20) + 1} - {Math.min(page * 20, count)} de {count}
      </Text>
      
      <Flex gap="2" align="center">
        <IconButton
          variant="soft"
          size="1"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(1)}
        >
          <Icons.chevronLeft width={14} height={14} />
        </IconButton>
        
        <IconButton
          variant="soft"
          size="1"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(page - 1)}
        >
          <Icons.chevronLeft width={14} height={14} />
        </IconButton>
        
        <Box px="2">
          <Text size="2" weight="medium">
            Página {page} de {totalPages}
          </Text>
        </Box>
        
        <IconButton
          variant="soft"
          size="1"
          disabled={!canGoNext}
          onClick={() => onPageChange(page + 1)}
        >
          <Icons.chevronRight width={14} height={14} />
        </IconButton>
        
        <IconButton
          variant="soft"
          size="1"
          disabled={!canGoNext}
          onClick={() => onPageChange(totalPages)}
        >
          <Icons.chevronRight width={14} height={14} />
        </IconButton>
      </Flex>
    </Flex>
  )
}
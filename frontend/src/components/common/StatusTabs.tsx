'use client'

import { Flex, Box, Text, Badge } from '@radix-ui/themes'

type Tab = {
  key: string
  label: string
}

type Props = {
  tabs: readonly Tab[]
  active: string
  counts: Record<string, number>
  onChange: (key: string) => void
}

export function StatusTabs({ tabs, active, counts, onChange }: Props) {
  return (
    <Flex gap="4" mb="4" style={{ borderBottom: '1px solid var(--gray-4)' }}>
      {tabs.map(tab => (
        <Box
          key={tab.key}
          onClick={() => onChange(tab.key)}
          style={{
            cursor: 'pointer',
            paddingBottom: 12,
            borderBottom: active === tab.key
              ? '2px solid var(--accent-9)'
              : '2px solid transparent',
          }}
        >
          <Flex align="center" gap="2">
            <Text size="2" weight={active === tab.key ? 'bold' : 'regular'}>
              {tab.label}
            </Text>
            <Badge size="1" variant="soft">
              {counts[tab.key] ?? 0}
            </Badge>
          </Flex>
        </Box>
      ))}
    </Flex>
  )
}
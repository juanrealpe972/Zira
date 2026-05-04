'use client'

import { Box } from '@radix-ui/themes'

type Props = {
  checked: boolean
  onChange: (value: boolean) => void
}

export function AppSwitch({ checked, onChange }: Props) {
  return (
    <Box
      onClick={() => onChange(!checked)}
      style={{
        width: 42,
        height: 24,
        borderRadius: 999,
        background: checked ? 'var(--accent-9)' : 'var(--gray-6)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
      }}
    >
      <Box
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: 3,
          left: checked ? 21 : 3,
          transition: 'all 0.25s ease',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}
      />
    </Box>
  )
}
import { Box } from '@radix-ui/themes'

export function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <Box
      style={{
        padding: 14,
        borderRadius: 14,
        border: '1px solid var(--gray-4)',
        background: 'var(--color-panel-solid)',
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </Box>
  )
}
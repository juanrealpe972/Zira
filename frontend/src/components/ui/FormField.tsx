import { Box, Text, Flex } from '@radix-ui/themes'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

type Props = {
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
  required?: boolean
}

export function FormField({ label, error, hint, children, required }: Props) {
  return (
    <Box>
      <Text size="1" weight="medium" style={{ display: 'block', marginBottom: 4 }}>
        {label}{required && <span style={{ color: 'var(--red-9)', marginLeft: 2 }}>*</span>}
      </Text>
      {children}
      {hint && !error && (
        <Text size="1" color="gray" style={{ marginTop: 2, display: 'block' }}>{hint}</Text>
      )}
      {error && (
        <Flex align="center" gap="1" mt="1">
          <ExclamationTriangleIcon width={12} style={{ color: 'var(--red-9)' }} />
          <Text size="1" style={{ color: 'var(--red-9)' }}>{error}</Text>
        </Flex>
      )}
    </Box>
  )
}
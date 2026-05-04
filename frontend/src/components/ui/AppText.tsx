import { Text } from '@radix-ui/themes'
import type { ComponentProps } from 'react'

type AppTextProps = ComponentProps<typeof Text>

export function AppText({ children, ...props }: AppTextProps) {
  return (
    <Text size="3" color="gray" style={{ lineHeight: 1.5 }} {...props}>
      {children}
    </Text>
  )
}
import { Text } from '@radix-ui/themes'
import type { ComponentProps } from 'react'

type AppTextProps = ComponentProps<typeof Text>

export function AppText({ children, ...props }: AppTextProps) {
  return (
    <Text size="2" color="gray" {...props}>
      {children}
    </Text>
  )
}
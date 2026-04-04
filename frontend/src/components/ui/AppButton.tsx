import { Button } from '@radix-ui/themes'
import type { ComponentProps } from 'react'

type AppButtonProps = ComponentProps<typeof Button>

export function AppButton({ children, ...props }: AppButtonProps) {
  return (
    <Button size="2" radius="medium" {...props}>
      {children}
    </Button>
  )
}
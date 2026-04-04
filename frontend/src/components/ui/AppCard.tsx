import { Card } from '@radix-ui/themes'
import type { ComponentProps } from 'react'

type AppCardProps = ComponentProps<typeof Card>

export function AppCard({ children, ...props }: AppCardProps) {
  return (
    <Card size="3" className='rounded-2xl' {...props}>
      {children}
    </Card>
  )
}
import { Heading } from '@radix-ui/themes'
import type { ComponentProps } from 'react'

type AppHeadingProps = ComponentProps<typeof Heading>

export function AppHeading({ children, ...props }: AppHeadingProps) {
  return (
    <Heading size="6" mb="2" style={{ lineHeight: 1.2 }} {...props}>
      {children}
    </Heading>
  )
}
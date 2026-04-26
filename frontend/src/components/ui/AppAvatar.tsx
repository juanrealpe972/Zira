'use client'

import { Avatar as RadixAvatar } from '@radix-ui/themes'
import { getInitials } from '@/lib/utils'

interface Props {
  src?: string | null
  name: string
  size?: '1' | '2' | '3'
}

export function AppAvatar({ src, name, size = '2' }: Props) {
  return (
    <RadixAvatar
      size={size}
      src={src || undefined}
      fallback={getInitials(name)}
      radius="full"
    />
  )
}
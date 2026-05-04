'use client'

import { useRouter } from 'next/navigation'
import { AppButton, AppIcon } from '@/components/ui'

export function BackButton() {
  const router = useRouter()

  return (
    <AppButton variant="ghost" onClick={() => router.push('/')}>
      <AppIcon name="chevronLeft" size={18} />
      Volver
    </AppButton>
  )
}
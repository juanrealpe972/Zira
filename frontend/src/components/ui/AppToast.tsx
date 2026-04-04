'use client'

import * as Toast from '@radix-ui/react-toast'
import { Text } from '@radix-ui/themes'
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'

type AppToastProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  message: string
  type?: 'success' | 'error'
}

export function AppToast({ open, onOpenChange, message, type = 'success' }: AppToastProps) {
  const isSuccess = type === 'success'

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={onOpenChange}
        duration={3000}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          borderRadius: 8,
          background: isSuccess ? 'var(--green-3)' : 'var(--red-3)',
          border: `1px solid ${isSuccess ? 'var(--green-6)' : 'var(--red-6)'}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        {isSuccess
          ? <CheckCircledIcon width={18} height={18} style={{ color: 'var(--green-9)', flexShrink: 0 }} />
          : <CrossCircledIcon width={18} height={18} style={{ color: 'var(--red-9)', flexShrink: 0 }} />
        }
        <Toast.Description asChild>
          <Text size="2" style={{ color: isSuccess ? 'var(--green-11)' : 'var(--red-11)' }}>
            {message}
          </Text>
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 320,
        }}
      />
    </Toast.Provider>
  )
}
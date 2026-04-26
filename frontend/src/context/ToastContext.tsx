'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import * as Toast from '@radix-ui/react-toast'
import { Text } from '@radix-ui/themes'
import { CheckCircledIcon, CrossCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons'

// ============================================
// TIPOS
// ============================================

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showInfo: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

// ============================================
// PROVIDER
// ============================================

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts(prev => [...prev, { id, message, type }])
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    addToast(message, type)
  }, [addToast])

  const showSuccess = useCallback((message: string) => {
    addToast(message, 'success')
  }, [addToast])

  const showError = useCallback((message: string) => {
    addToast(message, 'error')
  }, [addToast])

  const showInfo = useCallback((message: string) => {
    addToast(message, 'info')
  }, [addToast])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const value: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showInfo,
  }

  return (
    <ToastContext.Provider value={value}>
      <Toast.Provider swipeDirection="right">
        {children}
        
        {toasts.map(toast => (
          <Toast.Root
            key={toast.id}
            open={true}
            onOpenChange={() => removeToast(toast.id)}
            duration={3000}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              borderRadius: 8,
              background: getToastBackground(toast.type),
              border: `1px solid ${getToastBorder(toast.type)}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              marginBottom: 8,
            }}
          >
            {getToastIcon(toast.type)}
            <Toast.Description asChild>
              <Text size="2" style={{ color: getToastTextColor(toast.type) }}>
                {toast.message}
              </Text>
            </Toast.Description>
          </Toast.Root>
        ))}
        
        <Toast.Viewport
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            width: 320,
            display: 'flex',
            flexDirection: 'column',
          }}
        />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}

// ============================================
// HELPERS
// ============================================

function getToastBackground(type: ToastType): string {
  switch (type) {
    case 'success': return 'var(--green-3)'
    case 'error': return 'var(--red-3)'
    case 'info': return 'var(--blue-3)'
  }
}

function getToastBorder(type: ToastType): string {
  switch (type) {
    case 'success': return 'var(--green-6)'
    case 'error': return 'var(--red-6)'
    case 'info': return 'var(--blue-6)'
  }
}

function getToastTextColor(type: ToastType): string {
  switch (type) {
    case 'success': return 'var(--green-11)'
    case 'error': return 'var(--red-11)'
    case 'info': return 'var(--blue-11)'
  }
}

function getToastIcon(type: ToastType) {
  switch (type) {
    case 'success':
      return <CheckCircledIcon width={18} height={18} style={{ color: 'var(--green-9)', flexShrink: 0 }} />
    case 'error':
      return <CrossCircledIcon width={18} height={18} style={{ color: 'var(--red-9)', flexShrink: 0 }} />
    case 'info':
      return <InfoCircledIcon width={18} height={18} style={{ color: 'var(--blue-9)', flexShrink: 0 }} />
  }
}

// ============================================
// HOOK
// ============================================

/**
 * Hook para mostrar toasts desde cualquier componente
 */
export function useToast() {
  const context = useContext(ToastContext)
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  
  return context
}
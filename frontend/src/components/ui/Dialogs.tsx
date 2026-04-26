'use client'

import * as Dialog from '@radix-ui/themes'
import { Flex, Text, Button } from '@radix-ui/themes'
import { ReactNode } from 'react'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  onConfirm: () => void
  loading?: boolean
  icon?: ReactNode
}

/**
 * Diálogo de confirmación reutilizable
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  onConfirm,
  loading = false,
  icon,
}: ConfirmDialogProps) {
  const colorMap = {
    danger: 'red',
    warning: 'amber',
    info: 'blue',
  }

  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>{title}</Dialog.Title>
        
        {description && (
          <Dialog.Description size="2" style={{ marginBottom: 16 }}>
            {description}
          </Dialog.Description>
        )}
        
        <Flex gap="3" justify="end" mt="4">
          <Dialog.Close>
            <Button variant="soft" color="gray" disabled={loading}>
              {cancelText}
            </Button>
          </Dialog.Close>
          
          <Button 
            color={colorMap[variant]} 
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Procesando...' : confirmText}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

/**
 * Componente de Alert simple
 */
interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  icon?: ReactNode
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  icon,
}: AlertDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: 400 }}>
        <Flex align="center" gap="3" mb="2">
          {icon && <Text size="4">{icon}</Text>}
          <Dialog.Title>{title}</Dialog.Title>
        </Flex>
        
        {description && (
          <Dialog.Description size="2">
            {description}
          </Dialog.Description>
        )}
        
        <Flex justify="end" mt="4">
          <Dialog.Close>
            <Button variant="soft">Cerrar</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
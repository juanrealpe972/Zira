'use client'

import { Dialog, Flex, Box, Text, Button, Separator } from '@radix-ui/themes'
import { Cross2Icon, CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { AppToast } from '@/components/ui/AppToast'
import { useState } from 'react'

export type StepConfig = {
  label: string
  description: string
}

type Props = {
  open: boolean
  onClose: () => void
  title: string
  steps: StepConfig[]
  currentStep: number
  loading: boolean
  apiError: string | null
  toastOpen: boolean
  toastMessage: string
  toastType: 'success' | 'error'
  onToastChange: (v: boolean) => void
  onNext: () => void
  onBack: () => void
  onSubmit: () => void
  submitLabel?: string
  children: React.ReactNode
}

export function StepModal({
  open, onClose, title, steps, currentStep,
  loading, apiError, toastOpen, toastMessage, toastType,
  onToastChange, onNext, onBack, onSubmit,
  submitLabel = 'Guardar',
  children,
}: Props) {
  return (
    <>
      <Dialog.Root open={open} onOpenChange={v => !v && onClose()}>
        <Dialog.Content style={{ maxWidth: 560, padding: 0, overflow: 'hidden' }}>

          {/* Header */}
          <Box
            style={{
              background: 'linear-gradient(135deg, var(--accent-9) 0%, var(--accent-11) 100%)',
              padding: '20px 24px 16px',
            }}
          >
            <Flex justify="between" align="start">
              <Box>
                <Dialog.Title style={{ margin: 0, color: 'white', fontSize: 18 }}>
                  {title}
                </Dialog.Title>
                <Text size="1" style={{ color: 'rgba(255,255,255,0.7)', marginTop: 2, display: 'block' }}>
                  {steps[currentStep]?.description}
                </Text>
              </Box>
              <Dialog.Close onClick={onClose}>
                <Box style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.8)', display: 'flex', padding: 4, borderRadius: 6 }}>
                  <Cross2Icon width={16} height={16} />
                </Box>
              </Dialog.Close>
            </Flex>

            {/* Steps */}
            {steps.length > 1 && (
              <Flex gap="2" mt="4" align="center">
                {steps.map((s, i) => (
                  <Flex key={i} align="center" gap="2">
                    <Flex
                      align="center"
                      justify="center"
                      style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: i <= currentStep ? 'white' : 'rgba(255,255,255,0.3)',
                        color: i <= currentStep ? 'var(--accent-9)' : 'white',
                        fontSize: 11, fontWeight: 700, flexShrink: 0, transition: 'all 0.2s',
                      }}
                    >
                      {i < currentStep ? <CheckCircledIcon width={14} /> : i + 1}
                    </Flex>
                    <Text size="1" style={{ color: i <= currentStep ? 'white' : 'rgba(255,255,255,0.6)', fontWeight: i === currentStep ? 600 : 400 }}>
                      {s.label}
                    </Text>
                    {i < steps.length - 1 && (
                      <Box style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.3)', marginLeft: 4 }} />
                    )}
                  </Flex>
                ))}
              </Flex>
            )}
          </Box>

          {/* Error API */}
          {apiError && (
            <Flex align="center" gap="2" mx="5" mt="4" p="3"
              style={{ borderRadius: 8, background: 'var(--red-3)', border: '1px solid var(--red-6)' }}
            >
              <ExclamationTriangleIcon style={{ color: 'var(--red-9)', flexShrink: 0 }} />
              <Text size="2" style={{ color: 'var(--red-11)' }}>{apiError}</Text>
            </Flex>
          )}

          {/* Contenido */}
          <Box px="5" py="4" style={{ maxHeight: '55vh', overflowY: 'auto' }}>
            {children}
          </Box>

          <Separator size="4" />

          {/* Footer */}
          <Flex justify="between" align="center" px="5" py="4">
            <Button
              variant="ghost"
              color="gray"
              onClick={currentStep === 0 ? onClose : onBack}
              disabled={loading}
            >
              {currentStep === 0 ? 'Cancelar' : '← Anterior'}
            </Button>
            <Flex align="center" gap="2">
              {steps.length > 1 && (
                <Text size="1" color="gray">{currentStep + 1} de {steps.length}</Text>
              )}
              {currentStep < steps.length - 1 ? (
                <Button onClick={onNext} disabled={loading}>Siguiente →</Button>
              ) : (
                <Button onClick={onSubmit} disabled={loading}>
                  {loading ? 'Guardando...' : submitLabel}
                </Button>
              )}
            </Flex>
          </Flex>

        </Dialog.Content>
      </Dialog.Root>

      <AppToast
        open={toastOpen}
        onOpenChange={onToastChange}
        message={toastMessage}
        type={toastType}
      />
    </>
  )
}
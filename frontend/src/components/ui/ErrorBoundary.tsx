'use client'

import { Component, ReactNode } from 'react'
import { Flex, Text, Button, Box } from '@radix-ui/themes'
import { Icons } from '@/components/ui'

// ============================================
// TIPOS
// ============================================

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

// ============================================
// COMPONENTE
// ============================================

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Flex 
          align="center" 
          justify="center" 
          style={{ minHeight: '50vh', padding: 24 }}
        >
          <Box style={{ textAlign: 'center', maxWidth: 400 }}>
            <Icons.error 
              width={48} 
              height={48} 
              style={{ color: 'var(--red-9)', marginBottom: 16 }} 
            />
            <Text size="5" weight="bold" as="p" mb="2">
              Algo salió mal
            </Text>
            <Text size="2" color="gray" as="p" mb="4">
              {this.state.error?.message || 'Ha ocurrido un error inesperado'}
            </Text>
            <Button onClick={this.handleReset} variant="soft">
              Intentar de nuevo
            </Button>
          </Box>
        </Flex>
      )
    }

    return this.props.children
  }
}

// ============================================
// HOC - Higher Order Component
// ============================================

/**
 * HOC para envolver componentes con ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
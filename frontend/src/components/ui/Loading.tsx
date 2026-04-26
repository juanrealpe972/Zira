'use client'

import { Flex, Text, Spinner } from '@radix-ui/themes'
import { ReactNode } from 'react'

interface LoadingProps {
  message?: string
  size?: '1' | '2' | '3'
  fullScreen?: boolean
}

/**
 * Componente de carga simple
 */
export function Loading({ 
  message = 'Cargando...', 
  size = '2',
  fullScreen = false 
}: LoadingProps) {
  const content = (
    <Flex direction="column" align="center" gap="3">
      <Spinner size={size} />
      {message && (
        <Text size="2" color="gray">{message}</Text>
      )}
    </Flex>
  )

  if (fullScreen) {
    return (
      <Flex 
        style={{ 
          minHeight: '100vh',
          backgroundColor: 'var(--gray-2)'
        }} 
        align="center" 
        justify="center"
      >
        {content}
      </Flex>
    )
  }

  return (
    <Flex py="9" justify="center" align="center">
      {content}
    </Flex>
  )
}

/**
 * Skeleton para tablas
 */
interface TableSkeletonProps {
  rows?: number
  columns?: number
}

export function TableSkeleton({ rows = 5, columns = 6 }: TableSkeletonProps) {
  return (
    <Flex direction="column" gap="2" py="4">
      {/* Header skeleton */}
      <Flex gap="2" pb="2">
        {Array.from({ length: columns }).map((_, i) => (
          <div 
            key={`header-${i}`}
            style={{
              flex: 1,
              height: 20,
              backgroundColor: 'var(--gray-5)',
              borderRadius: 4,
            }}
          />
        ))}
      </Flex>
      
      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Flex key={`row-${rowIndex}`} gap="2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              style={{
                flex: 1,
                height: 36,
                backgroundColor: 'var(--gray-4)',
                borderRadius: 4,
              }}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  )
}

/**
 * Skeleton para tarjetas
 */
interface CardSkeletonProps {
  count?: number
}

export function CardSkeleton({ count = 3 }: CardSkeletonProps) {
  return (
    <Flex gap="4" wrap="wrap">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 280,
            height: 160,
            backgroundColor: 'var(--gray-4)',
            borderRadius: 8,
          }}
        />
      ))}
    </Flex>
  )
}

/**
 * Skeleton para texto
 */
interface TextSkeletonProps {
  lines?: number
  width?: string | number
}

export function TextSkeleton({ lines = 3, width = '100%' }: TextSkeletonProps) {
  return (
    <Flex direction="column" gap="2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === lines - 1 ? '60%' : width,
            height: 16,
            backgroundColor: 'var(--gray-5)',
            borderRadius: 4,
          }}
        />
      ))}
    </Flex>
  )
}

/**
 * Skeleton para avatar
 */
interface AvatarSkeletonProps {
  size?: number
}

export function AvatarSkeleton({ size = 40 }: AvatarSkeletonProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'var(--gray-5)',
      }}
    />
  )
}

/**
 * Componente Empty State
 */
interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Flex direction="column" align="center" gap="4" py="9">
      {icon && (
        <Text size="6" color="gray" style={{ opacity: 0.5 }}>
          {icon}
        </Text>
      )}
      <Text size="4" weight="medium">{title}</Text>
      {description && (
        <Text size="2" color="gray">{description}</Text>
      )}
      {action && (
        <Flex mt="2">{action}</Flex>
      )}
    </Flex>
  )
}
'use client'

import { useState, useCallback, useEffect } from 'react'

// ============================================
// TIPOS
// ============================================

export interface PaginationInfo {
  count: number
  page: number
  pageSize: number
  totalPages: number
  next: string | null
  previous: string | null
  hasMore: boolean
}

export interface UsePaginationOptions {
  initialPage?: number
  pageSize?: number
  onPageChange?: (page: number) => void
}

export interface UsePaginationReturn {
  // Estado
  pagination: PaginationInfo
  loading: boolean
  
  // Acciones
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  goToFirst: () => void
  goToLast: () => void
  setPaginationInfo: (info: Partial<PaginationInfo>) => void
  
  // Utilidades
  canGoNext: boolean
  canGoPrev: boolean
  isFirstPage: boolean
  isLastPage: boolean
}

// ============================================
// HOOK
// ============================================

/**
 * Hook para manejo de paginación
 */
export function usePagination(options: UsePaginationOptions = {}) {
  const { 
    initialPage = 1, 
    pageSize = 20,
    onPageChange 
  } = options

  const [pagination, setPagination] = useState<PaginationInfo>({
    count: 0,
    page: initialPage,
    pageSize,
    totalPages: 1,
    next: null,
    previous: null,
    hasMore: false,
  })

  const [loading, setLoading] = useState(false)

  const setPage = useCallback((page: number) => {
    if (page < 1 || page > pagination.totalPages) return
    
    setPagination(prev => ({ ...prev, page }))
    onPageChange?.(page)
  }, [pagination.totalPages, onPageChange])

  const nextPage = useCallback(() => {
    if (pagination.hasMore) {
      setPage(pagination.page + 1)
    }
  }, [pagination.hasMore, pagination.page, setPage])

  const prevPage = useCallback(() => {
    if (pagination.page > 1) {
      setPage(pagination.page - 1)
    }
  }, [pagination.page, setPage])

  const goToFirst = useCallback(() => {
    setPage(1)
  }, [setPage])

  const goToLast = useCallback(() => {
    setPage(pagination.totalPages)
  }, [pagination.totalPages, setPage])

  const setPaginationInfo = useCallback((info: Partial<PaginationInfo>) => {
    setPagination(prev => {
      const newPageSize = info.pageSize ?? prev.pageSize
      const newCount = info.count ?? prev.count
      const newTotalPages = Math.ceil(newCount / newPageSize)
      
      return {
        ...prev,
        ...info,
        totalPages: newTotalPages,
        hasMore: info.next !== null,
      }
    })
  }, [])

  // Utilidades
  const canGoNext = pagination.hasMore
  const canGoPrev = pagination.page > 1
  const isFirstPage = pagination.page === 1
  const isLastPage = pagination.page >= pagination.totalPages

  return {
    pagination,
    loading,
    setPage,
    nextPage,
    prevPage,
    goToFirst,
    goToLast,
    setPaginationInfo,
    setLoading,
    canGoNext,
    canGoPrev,
    isFirstPage,
    isLastPage,
  }
}

// ============================================
// HOOK COMBINADO: PAGINACIÓN + DATOS
// ============================================

interface UsePaginatedDataOptions<T> {
  fetchFn: (params: { page: number; pageSize: number }) => Promise<{
    results: T[]
    count: number
    next: string | null
    previous: string | null
  }>
  initialPage?: number
  pageSize?: number
  enabled?: boolean
}

interface UsePaginatedDataReturn<T> {
  data: T[]
  loading: boolean
  error: string | null
  pagination: PaginationInfo
  refetch: () => Promise<void>
  setPage: (page: number) => void
}

/**
 * Hook para datos paginados con fetch automático
 */
export function usePaginatedData<T>(options: UsePaginatedDataOptions<T>): UsePaginatedDataReturn<T> {
  const { 
    fetchFn, 
    initialPage = 1, 
    pageSize = 20,
    enabled = true 
  } = options

  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<string | null>(null)

  const pagination = usePagination({
    initialPage,
    pageSize,
  })

  const fetchData = useCallback(async () => {
    if (!enabled) return
    
    pagination.setLoading(true)
    setError(null)
    
    try {
      const response = await fetchFn({
        page: pagination.pagination.page,
        pageSize: pagination.pagination.pageSize,
      })
      
      setData(response.results)
      pagination.setPaginationInfo({
        count: response.count,
        next: response.next,
        previous: response.previous,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos')
    } finally {
      pagination.setLoading(false)
    }
  }, [enabled, fetchFn, pagination])

  // Fetch cuando cambia la página
  useEffect(() => {
    if (enabled) {
      fetchData()
    }
  }, [pagination.pagination.page, enabled])

  return {
    data,
    loading: pagination.loading,
    error,
    pagination: pagination.pagination,
    refetch: fetchData,
    setPage: pagination.setPage,
  }
}
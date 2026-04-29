import { useState, useCallback } from 'react'

// ============================================
// TIPOS
// ============================================

interface UseAsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
}

type AsyncFunction<T, Args extends unknown[] = []> = (...args: Args) => Promise<T>

// ============================================
// HOOK PRINCIPAL
// ============================================

/**
 * Hook genérico para manejo de operaciones asíncronas
 * Proporciona estados de loading, error y datos de forma estandarizada
 */
export function useAsync<T>(initialData: T | null = null) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: initialData,
    loading: false,
    error: null,
  })

  const execute = useCallback(async <Args extends unknown[]>(
    asyncFn: AsyncFunction<T, Args>,
    options?: UseAsyncOptions<T>,
    ...args: Args
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const result = await asyncFn(...args)
      setState({ data: result, loading: false, error: null })
      options?.onSuccess?.(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setState({ data: null, loading: false, error: errorMessage })
      options?.onError?.(errorMessage)
      return null
    }
  }, [])

  const reset = useCallback(() => {
    setState({ data: initialData, loading: false, error: null })
  }, [initialData])

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }))
  }, [])

  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error, loading: false }))
  }, [])

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
    isIdle: !state.loading && !state.error && !state.data,
    isLoading: state.loading,
    isError: !!state.error,
    isSuccess: !state.loading && !state.error && !!state.data,
  }
}

// ============================================
// HOOK PARA OPERACIONES CON PROMESAS
// ============================================

/**
 * Hook para ejecutar operaciones que devuelven promesas
 * Útil para operaciones de CRUD
 */
export function useMutation<T, TData = unknown>(
  mutationFn: (data: TData) => Promise<T>
) {
  const [state, setState] = useState({
    data: null as T | null,
    loading: false,
    error: null as string | null,
  })

  const mutate = useCallback(async (data: TData) => {
    setState({ data: null, loading: true, error: null })

    try {
      const result = await mutationFn(data)
      setState({ data: result, loading: false, error: null })
      return { success: true, data: result }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setState({ data: null, loading: false, error: errorMessage })
      return { success: false, error: errorMessage }
    }
  }, [mutationFn])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    mutate,
    reset,
  }
}

// ============================================
// HOOK PARA CONSULTAS CON REFETCH
// ============================================

/**
 * Hook para operaciones de consulta (GET) con soporte para refetch
 */
export function useQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  enabled = true
) {
  const [state, setState] = useState({
    data: null as T | null,
    loading: false,
    error: null as string | null,
    refetching: false,
  })

  const fetch = useCallback(async (isRefetch = false) => {
    if (isRefetch) {
      setState(prev => ({ ...prev, refetching: true }))
    } else {
      setState(prev => ({ ...prev, loading: true }))
    }

    try {
      const result = await queryFn()
      setState({ data: result, loading: false, error: null, refetching: false })
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        refetching: false
      }))
      return null
    }
  }, [queryFn])

  const refetch = useCallback(() => fetch(true), [fetch])

  // Efecto para ejecutar la consulta inicial
  if (enabled && state.data === null && !state.loading && !state.error) {
    fetch()
  }

  return {
    ...state,
    fetch,
    refetch,
  }
}

// ============================================
// HOOK PARA MANEJO DE FORMULARIOS
// ============================================

interface UseFormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
}

interface UseFormOptions<T> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string>>
  onSubmit?: (values: T) => Promise<void> | void
}

/**
 * Hook para manejo de formularios
 */
export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [state, setState] = useState<UseFormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
  })

  const handleChange = useCallback((field: keyof T, value: unknown) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
    }))
  }, [])

  const handleBlur = useCallback((field: keyof T) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true },
    }))
  }, [])

  const validateForm = useCallback(() => {
    if (!validate) return true

    const errors = validate(state.values)
    setState(prev => ({ ...prev, errors }))
    return Object.keys(errors).length === 0
  }, [validate, state.values])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    // Marcar todos los campos como tocados
    const allTouched = Object.keys(state.values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Partial<Record<keyof T, boolean>>
    )
    setState(prev => ({ ...prev, touched: allTouched }))

    const isValid = validateForm()
    if (!isValid || !onSubmit) return

    try {
      await onSubmit(state.values)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al enviar'
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, form: errorMessage }
      }))
    }
  }, [state.values, validateForm, onSubmit])

  const reset = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
    })
  }, [initialValues])

  return {
    ...state,
    handleChange,
    handleBlur,
    handleSubmit,
    validateForm,
    reset,
    isValid: Object.keys(state.errors).length === 0,
  }
}
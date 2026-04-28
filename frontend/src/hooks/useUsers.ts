'use client'

import { useState, useCallback } from 'react'
import { 
  User, 
  getUsers, 
  createUser, 
  updateUser, 
  updateUserStatus,
  CreateUserRequest
} from '@/services/users.service'

interface UseUsersReturn {
  users: User[]
  loading: boolean
  error: string | null
  pagination: {
    count: number
    page: number
    totalPages: number
    next: string | null
    previous: string | null
  }
  fetchUsers: (params?: { page?: number; search?: string; role?: string }) => Promise<void>
  create: (data: CreateUserRequest) => Promise<User | null>
  update: (id: number, data: Partial<CreateUserRequest>) => Promise<User | null>
  toggleStatus: (id: number, isActive: boolean) => Promise<User | null>
  clearError: () => void
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    count: 0,
    page: 1,
    totalPages: 1,
    next: null as string | null,
    previous: null as string | null,
  })

  const fetchUsers = useCallback(async (params?: { 
    page?: number
    search?: string
    role?: string
  }) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await getUsers(params)
      setUsers(response.results)
      setPagination({
        count: response.count,
        page: params?.page || 1,
        totalPages: Math.ceil(response.count / 20),
        next: response.next,
        previous: response.previous,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }, [])

  const create = useCallback(async (data: CreateUserRequest): Promise<User | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const newUser = await createUser(data)
      setUsers(prev => [newUser, ...prev])
      return newUser
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear usuario')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const update = useCallback(async (
    id: number, 
    data: Partial<CreateUserRequest>
  ): Promise<User | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const updatedUser = await updateUser(id, data)
      setUsers(prev => prev.map(u => u.id === id ? updatedUser : u))
      return updatedUser
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar usuario')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleStatus = useCallback(async (
    id: number, 
    isActive: boolean
  ): Promise<User | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const updatedUser = await updateUserStatus(id, isActive)
      setUsers(prev => prev.map(u => u.id === id ? updatedUser : u))
      return updatedUser
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar estado')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {
    users,
    loading,
    error,
    pagination,
    fetchUsers,
    create,
    update,
    toggleStatus,
    clearError,
  }
}
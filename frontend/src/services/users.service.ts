import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'

// Tipos de usuario
export interface User {
  id: number
  national_id: string | null
  name: string
  email: string
  phone_prefix: string | null
  phone: string | null
  address: string | null
  company: string | null
  role: string
  country: string | null
  city: string | null
  photo: string | null
  verified: boolean
  created_at: string
  is_active: boolean
  is_staff: boolean
  description: string | null
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  phone_prefix?: string
  phone?: string
  address?: string
  company?: string
  role?: string
  country?: string
  city?: string
  national_id?: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// API endpoints
const USERS_ENDPOINT = '/api/v1/users'

// Funciones del servicio
export async function getUsers(params?: { 
  page?: number
  search?: string
  role?: string
  is_active?: boolean
}): Promise<PaginatedResponse<User>> {
  const queryParams = new URLSearchParams()
  if (params?.page) queryParams.set('page', params.page.toString())
  if (params?.search) queryParams.set('search', params.search)
  if (params?.role) queryParams.set('role', params.role)
  if (params?.is_active !== undefined) queryParams.set('is_active', params.is_active.toString())
  
  const query = queryParams.toString()
  return apiGet<PaginatedResponse<User>>(`${USERS_ENDPOINT}${query ? `?${query}` : ''}`)
}

export async function getUserById(id: number): Promise<User> {
  return apiGet<User>(`${USERS_ENDPOINT}/${id}/`)
}

export async function createUser(data: CreateUserRequest): Promise<User> {
  try {
    return await apiPost<User>('/api/v1/register/', data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('El email ya está registrado')
    }
    throw error
  }
}

export async function updateUser(id: number, data: Partial<CreateUserRequest>): Promise<User> {
  try {
    return await apiPatch<User>(`${USERS_ENDPOINT}/${id}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al actualizar usuario')
    }
    throw error
  }
}

export async function updateUserStatus(id: number, is_active: boolean): Promise<User> {
  return apiPatch<User>(`${USERS_ENDPOINT}/${id}/`, { is_active })
}

export async function deleteUser(id: number): Promise<void> {
  try {
    await apiDelete<void>(`${USERS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw new Error('Usuario no encontrado')
    }
    if (error instanceof ApiError && error.status === 403) {
      throw new Error('No tienes permiso para eliminar este usuario')
    }
    throw new Error('Error al eliminar usuario')
  }
}
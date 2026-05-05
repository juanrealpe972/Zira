import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'
import { User, CreateUserRequest, PaginatedResponse } from '@/types'

const USERS_ENDPOINT = '/api/v1/users'

export async function getUsers(params?: {
  page?: number
  search?: string
  role?: string
  is_active?: boolean
}): Promise<PaginatedResponse<User>> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.search) queryParams.set('search', params.search)
    if (params?.role) queryParams.set('role', params.role)
    if (params?.is_active !== undefined) queryParams.set('is_active', params.is_active.toString())

    const query = queryParams.toString()
    const result = await apiGet<PaginatedResponse<User>>(`${USERS_ENDPOINT}${query ? `?${query}` : ''}`)
    return result
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw new Error('No autorizado. Por favor inicia sesión nuevamente')
    }
    throw error
  }
}

export async function getUserById(id: number): Promise<User> {
  try {
    return await apiGet<User>(`${USERS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw new Error('Usuario no encontrado')
    }
    throw error
  }
}

export async function createUser(data: CreateUserRequest): Promise<User> {
  try {
    return await apiPost<User>('/api/v1/register/', data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      // console.error('ERROR REAL:', error)
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
  try {
    const result = await apiPatch<User>(`${USERS_ENDPOINT}/${id}/`, { is_active })
    return result
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw new Error('No autorizado. Por favor inicia sesión nuevamente')
    }
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al actualizar estado del usuario')
    }
    if (error instanceof ApiError && error.status === 404) {
      throw new Error('Usuario no encontrado')
    }
    throw error
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    return await apiDelete<void>(`${USERS_ENDPOINT}/${id}/`)
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
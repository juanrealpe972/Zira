import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'
import { Saving, SavingRequest, PaginatedResponse } from '@/types'

const SAVINGS_ENDPOINT = '/api/v1/savings'

export async function getSavings(userId: number): Promise<PaginatedResponse<Saving>> {
  try {
    return await apiGet<PaginatedResponse<Saving>>(`${SAVINGS_ENDPOINT}/?user=${userId}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener ahorros')
    }
    throw error
  }
}

export async function getSavingById(id: number): Promise<Saving> {
  try {
    return await apiGet<Saving>(`${SAVINGS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener el ahorro')
    }
    throw error
  }
}

export async function createSaving(data: SavingRequest): Promise<Saving> {
  try {
    return await apiPost<Saving>(`${SAVINGS_ENDPOINT}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para crear el ahorro')
    }
    throw error
  }
}

export async function updateSaving(id: number, data: Partial<SavingRequest>): Promise<Saving> {
  try {
    return await apiPatch<Saving>(`${SAVINGS_ENDPOINT}/${id}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para actualizar el ahorro')
    }
    throw error
  }
}

export async function deleteSaving(id: number): Promise<void> {
  try {
    return await apiDelete(`${SAVINGS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al eliminar el ahorro')
    }
    throw error
  }
}
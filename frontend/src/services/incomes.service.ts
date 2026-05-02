import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'
import { Income, IncomeRequest, PaginatedResponse } from '@/types'

const INCOMES_ENDPOINT = '/api/v1/incomes'

export async function getIncomes(userId: number): Promise<PaginatedResponse<Income>> {
  try {
    return await apiGet<PaginatedResponse<Income>>(`${INCOMES_ENDPOINT}/?user=${userId}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener ingresos')
    }
    throw error
  }
}

export async function getIncomeById(id: number): Promise<Income> {
  try {
    return await apiGet<Income>(`${INCOMES_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener el ingreso')
    }
    throw error
  }
}

export async function createIncome(data: IncomeRequest): Promise<Income> {
  try {
    return await apiPost<Income>(`${INCOMES_ENDPOINT}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para crear el ingreso')
    }
    throw error
  }
}

export async function updateIncome(id: number, data: Partial<IncomeRequest>): Promise<Income> {
  try {
    return await apiPatch<Income>(`${INCOMES_ENDPOINT}/${id}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para actualizar el ingreso')
    }
    throw error
  }
}

export async function deleteIncome(id: number): Promise<void> {
  try {
    return await apiDelete(`${INCOMES_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al eliminar el ingreso')
    }
    throw error
  }
}
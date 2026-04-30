import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'

export type Income = {
  id: number
  user: number
  title: string
  amount: number
  category: string
  source: string
  date: string
  notes: string
}

export type IncomeRequest = {
  user: number
  title: string
  amount: number
  category: string
  source: string
  date: string
  notes: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const INCOMES_ENDPOINT = '/api/v1/incomes'

export async function getIncomes(userId: number): Promise<PaginatedResponse<Income>> {
  return apiGet<PaginatedResponse<Income>>(`${INCOMES_ENDPOINT}/?user=${userId}`)
}

export async function getIncomeById(id: number): Promise<Income> {
  return apiGet<Income>(`${INCOMES_ENDPOINT}/${id}/`)
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
  await apiDelete(`${INCOMES_ENDPOINT}/${id}/`)
}
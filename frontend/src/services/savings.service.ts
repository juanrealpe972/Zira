import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'

export type Saving = {
  id: number
  user: number
  bank_account: number
  goal_name: string
  target_amount: number
  current_amount: number
  interest_rate: number
  start_date: string
  target_date: string | null
  status: string
}

export type SavingRequest = {
  user: number
  bank_account: number
  goal_name: string
  target_amount: number
  current_amount: number
  interest_rate: number
  start_date: string
  target_date: string | null
  status: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const SAVINGS_ENDPOINT = '/api/v1/savings'

export async function getSavings(userId: number): Promise<PaginatedResponse<Saving>> {
  return apiGet<PaginatedResponse<Saving>>(`${SAVINGS_ENDPOINT}/?user=${userId}`)
}

export async function getSavingById(id: number): Promise<Saving> {
  return apiGet<Saving>(`${SAVINGS_ENDPOINT}/${id}/`)
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
  await apiDelete(`${SAVINGS_ENDPOINT}/${id}/`)
}
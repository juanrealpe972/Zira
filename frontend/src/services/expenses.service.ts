import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'

export type Expense = {
  id: number
  user: number
  title: string
  amount: number
  category: string
  date: string
  description: string
  is_test: boolean
  is_real: boolean
}

export type ExpenseRequest = {
  user: number
  title: string
  amount: number
  category: string
  date: string
  description: string
  is_test: boolean
  is_real: boolean
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const EXPENSES_ENDPOINT = '/api/v1/expenses'

export async function getExpenses(userId: number): Promise<PaginatedResponse<Expense>> {
  return apiGet<PaginatedResponse<Expense>>(`${EXPENSES_ENDPOINT}/?user=${userId}`)
}

export async function getExpenseById(id: number): Promise<Expense> {
  return apiGet<Expense>(`${EXPENSES_ENDPOINT}/${id}/`)
}

export async function createExpense(data: ExpenseRequest): Promise<Expense> {
  try {
    return await apiPost<Expense>(`${EXPENSES_ENDPOINT}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para crear el gasto')
    }
    throw error
  }
}

export async function updateExpense(id: number, data: Partial<ExpenseRequest>): Promise<Expense> {
  try {
    return await apiPatch<Expense>(`${EXPENSES_ENDPOINT}/${id}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para actualizar el gasto')
    }
    throw error
  }
}

export async function deleteExpense(id: number): Promise<void> {
  await apiDelete(`${EXPENSES_ENDPOINT}/${id}/`)
}
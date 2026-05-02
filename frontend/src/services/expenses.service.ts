import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'
import { Expense, ExpenseRequest, PaginatedResponse } from '@/types'

const EXPENSES_ENDPOINT = '/api/v1/expenses'

export async function getExpenses(userId: number): Promise<PaginatedResponse<Expense>> {
  try {
    return await apiGet<PaginatedResponse<Expense>>(`${EXPENSES_ENDPOINT}/?user=${userId}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener gastos')
    }
    throw error
  }
}

export async function getExpenseById(id: number): Promise<Expense> {
  try {
    return await apiGet<Expense>(`${EXPENSES_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener el gasto')
    }
    throw error
  }
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
  try {
    return await apiDelete(`${EXPENSES_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al eliminar el gasto')
    }
    throw error
  }
}
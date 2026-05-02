import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'
import { ExpenseProduct, ExpenseProductRequest, PaginatedResponse } from '@/types'

const EXPENSE_PRODUCTS_ENDPOINT = '/api/v1/expense_products'

export async function getExpenseProducts(userId: number): Promise<PaginatedResponse<ExpenseProduct>> {
  try {
    return await apiGet<PaginatedResponse<ExpenseProduct>>(`${EXPENSE_PRODUCTS_ENDPOINT}/?user=${userId}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener productos de gasto')
    }
    throw error
  }
}

export async function getExpenseProductById(id: number): Promise<ExpenseProduct> {
  try {
    return await apiGet<ExpenseProduct>(`${EXPENSE_PRODUCTS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener el producto de gasto')
    }
    throw error
  }
}

export async function createExpenseProduct(data: ExpenseProductRequest): Promise<ExpenseProduct> {
  try {
    return await apiPost<ExpenseProduct>(`${EXPENSE_PRODUCTS_ENDPOINT}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para crear el producto de gasto')
    }
    throw error
  }
}

export async function updateExpenseProduct(id: number, data: Partial<ExpenseProductRequest>): Promise<ExpenseProduct> {
  try {
    return await apiPatch<ExpenseProduct>(`${EXPENSE_PRODUCTS_ENDPOINT}/${id}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para actualizar el producto de gasto')
    }
    throw error
  }
}

export async function deleteExpenseProduct(id: number): Promise<void> {
  try {
    return await apiDelete(`${EXPENSE_PRODUCTS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al eliminar el producto de gasto')
    }
    throw error
  }
}
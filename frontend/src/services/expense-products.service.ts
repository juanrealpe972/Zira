import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'

export type ExpenseProduct = {
  id: number
  user: number
  expense: number
  product: number
  quantity: number
  unit_price: number
  subtotal: number
}

export type ExpenseProductRequest = {
  user: number
  expense: number
  product: number
  quantity: number
  unit_price: number
  subtotal: number
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const EXPENSE_PRODUCTS_ENDPOINT = '/api/v1/expense_products'

export async function getExpenseProducts(userId: number): Promise<PaginatedResponse<ExpenseProduct>> {
  return apiGet<PaginatedResponse<ExpenseProduct>>(`${EXPENSE_PRODUCTS_ENDPOINT}/?user=${userId}`)
}

export async function getExpenseProductById(id: number): Promise<ExpenseProduct> {
  return apiGet<ExpenseProduct>(`${EXPENSE_PRODUCTS_ENDPOINT}/${id}/`)
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
  await apiDelete(`${EXPENSE_PRODUCTS_ENDPOINT}/${id}/`)
}
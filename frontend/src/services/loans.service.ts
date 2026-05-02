import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'
import { Loan, LoanRequest, PaginatedResponse } from '@/types'

const LOANS_ENDPOINT = '/api/v1/loans'

export async function getLoans(userId: number): Promise<PaginatedResponse<Loan>> {
  try {
    return apiGet<PaginatedResponse<Loan>>(`${LOANS_ENDPOINT}/?user=${userId}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener préstamos')
    }
    throw error
  }
}

export async function getLoanById(id: number): Promise<Loan> {
  try {
    return await apiGet<Loan>(`${LOANS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener el préstamo')
    }
    throw error
  }
}

export async function createLoan(data: LoanRequest): Promise<Loan> {
  try {
    return await apiPost<Loan>(`${LOANS_ENDPOINT}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para crear el préstamo')
    }
    throw error
  }
}

export async function updateLoan(id: number, data: Partial<LoanRequest>): Promise<Loan> {
  try {
    return await apiPatch<Loan>(`${LOANS_ENDPOINT}/${id}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para actualizar el préstamo')
    }
    throw error
  }
}

export async function deleteLoan(id: number): Promise<void> {
  try {
    return await apiDelete(`${LOANS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al eliminar el préstamo')
    }
    throw error
  }
}
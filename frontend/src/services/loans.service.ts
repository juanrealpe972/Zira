import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'

export type Loan = {
  id: number
  user: number
  person: string
  loan_type: 'prestado' | 'solicitado'
  amount: number
  interest_rate: number
  start_date: string
  end_date: string | null
  status: 'pendiente' | 'pagando' | 'pagado' | 'vencido'
  notes: string
}

export type LoanRequest = {
  user: number
  person: string
  loan_type: 'prestado' | 'solicitado'
  amount: number
  interest_rate: number
  start_date: string
  end_date: string | null
  status: 'pendiente' | 'pagando' | 'pagado' | 'vencido'
  notes: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const LOANS_ENDPOINT = '/api/v1/loans'

export async function getLoans(userId: number): Promise<PaginatedResponse<Loan>> {
  return apiGet<PaginatedResponse<Loan>>(`${LOANS_ENDPOINT}/?user=${userId}`)
}

export async function getLoanById(id: number): Promise<Loan> {
  return apiGet<Loan>(`${LOANS_ENDPOINT}/${id}/`)
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
  await apiDelete(`${LOANS_ENDPOINT}/${id}/`)
}
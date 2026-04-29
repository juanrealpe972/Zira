import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'

export type BankCard = {
  id: number
  user: number
  bank_account: number
  card_type: 'credito' | 'debito'
  card_number: string
  cardholder_name: string
  expiration_date: string
  cvv: string
}

export type BankCardRequest = {
  user: number
  bank_account: number
  card_type: 'credito' | 'debito'
  card_number: string
  cardholder_name: string
  expiration_date: string
  cvv: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const BANK_CARDS_ENDPOINT = '/api/v1/bank_cards'

export async function getBankCards(userId: number): Promise<PaginatedResponse<BankCard>> {
  return apiGet<PaginatedResponse<BankCard>>(`${BANK_CARDS_ENDPOINT}/?user=${userId}`)
}

export async function getBankCardById(id: number): Promise<BankCard> {
  return apiGet<BankCard>(`${BANK_CARDS_ENDPOINT}/${id}/`)
}

export async function createBankCard(data: BankCardRequest): Promise<BankCard> {
  try {
    return await apiPost<BankCard>(`${BANK_CARDS_ENDPOINT}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para crear la tarjeta')
    }
    throw error
  }
}

export async function updateBankCard(id: number, data: Partial<BankCardRequest>): Promise<BankCard> {
  try {
    return await apiPatch<BankCard>(`${BANK_CARDS_ENDPOINT}/${id}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Datos inválidos para actualizar la tarjeta')
    }
    throw error
  }
}

export async function deleteBankCard(id: number): Promise<void> {
  await apiDelete(`${BANK_CARDS_ENDPOINT}/${id}/`)
}
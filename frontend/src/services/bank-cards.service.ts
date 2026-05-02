import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'
import { BankCard, BankCardRequest, PaginatedResponse } from '@/types'

const BANK_CARDS_ENDPOINT = '/api/v1/bank_cards'

export async function getBankCards(userId: number): Promise<PaginatedResponse<BankCard>> {
  try {
    return await apiGet<PaginatedResponse<BankCard>>(`${BANK_CARDS_ENDPOINT}/?user=${userId}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener tarjetas bancarias')
    }
    throw error
  }
}

export async function getBankCardById(id: number): Promise<BankCard> {
  try {
    return await apiGet<BankCard>(`${BANK_CARDS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener la tarjeta bancaria')
    }
    throw error
  }
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
  try {
    return await apiDelete(`${BANK_CARDS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al eliminar la tarjeta')
    }
    throw error
  }
}
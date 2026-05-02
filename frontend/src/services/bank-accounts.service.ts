import { BankAccount, BankAccountRequest } from '@/types'
import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from '@/lib/api-client'

const BANK_ACCOUNTS_ENDPOINT = '/api/v1/bank_accounts'

export async function getBankAccounts(userId: number): Promise<BankAccount[]> {
  try {
    return await apiGet<BankAccount[]>(`${BANK_ACCOUNTS_ENDPOINT}/?user=${userId}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener cuentas bancarias')
    }
    throw error
  }
}

export async function createBankAccount(data: BankAccountRequest): Promise<BankAccount> {
  try {
    return await apiPost<BankAccount>(`${BANK_ACCOUNTS_ENDPOINT}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al crear cuenta')
    }
    throw error
  }
}

export async function updateBankAccount(id: number, data: BankAccountRequest): Promise<BankAccount> {
  try {
    return await apiPatch<BankAccount>(`${BANK_ACCOUNTS_ENDPOINT}/${id}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al actualizar cuenta')
    }
    throw error
  }
}

export async function deleteBankAccount(id: number): Promise<void> {
  try {
    return await apiDelete(`${BANK_ACCOUNTS_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al eliminar cuenta')
    }
    throw error
  }
}

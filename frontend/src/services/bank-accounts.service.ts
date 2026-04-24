const API_URL = process.env.NEXT_PUBLIC_API_URL

function getToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  return match ? match[1] : null
}

export type BankAccount = {
  id: number
  user: number
  bank_name: string
  account_type: 'ahorro' | 'corriente'
  account_number: string
  balance: number
}

export type BankAccountRequest = {
  user: number
  bank_name: string
  account_type: 'ahorro' | 'corriente'
  account_number: string
  balance: number
}

function authHeaders() {
  return {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  }
}

export async function getBankAccounts(userId: number): Promise<BankAccount[]> {
  const res = await fetch(`${API_URL}/api/v1/bank_accounts/?user=${userId}`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Error al obtener cuentas bancarias')
  return res.json()
}

export async function createBankAccount(data: BankAccountRequest): Promise<BankAccount> {
  const res = await fetch(`${API_URL}/api/v1/bank_accounts/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error?.detail ?? 'Error al crear cuenta')
  }
  return res.json()
}

export async function updateBankAccount(id: number, data: BankAccountRequest): Promise<BankAccount> {
  const res = await fetch(`${API_URL}/api/v1/bank_accounts/${id}/`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error?.detail ?? 'Error al actualizar cuenta')
  }
  return res.json()
}

export async function deleteBankAccount(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/v1/bank_accounts/${id}/`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Error al eliminar cuenta')
}
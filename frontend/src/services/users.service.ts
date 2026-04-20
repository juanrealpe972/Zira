const API_URL = process.env.NEXT_PUBLIC_API_URL

function getToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  return match ? match[1] : null
}

export type User = {
  id: number
  national_id: string | null
  name: string
  email: string
  phone_prefix: string | null
  phone: string | null
  address: string | null
  company: string | null
  role: string
  country: string | null
  city: string | null
  photo: string | null
  verified: boolean
  created_at: string
  is_active: boolean
  is_staff: boolean
  description: string | null
}

export type CreateUserRequest = {
  name: string
  email: string
  password: string
  phone_prefix?: string
  phone?: string
  address?: string
  company?: string
  role?: string
  country?: string
  city?: string
  national_id?: string
}

export async function getUsers(): Promise<User[]> {
  const token = getToken()
  const response = await fetch(`${API_URL}/api/v1/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) throw new Error('Error al obtener usuarios')
  return response.json()
}

export async function updateUserStatus(id: number, is_active: boolean): Promise<User> {
  const token = getToken()
  const response = await fetch(`${API_URL}/api/v1/users/${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ is_active }),
  })
  if (!response.ok) throw new Error('Error al actualizar estado')
  return response.json()
}

export async function createUser(data: CreateUserRequest): Promise<User> {
  const token = getToken()
  const response = await fetch(`${API_URL}/api/v1/register/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error?.email?.[0] ?? error?.detail ?? 'Error al crear usuario')
  }
  return response.json()
}

export async function getUserById(id: number): Promise<User> {
  const token = getToken()
  const response = await fetch(`${API_URL}/api/v1/users/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) throw new Error('Error al obtener usuario')
  return response.json()
}

export async function updateUser(id: number, data: Partial<CreateUserRequest>): Promise<User> {
  const token = getToken()
  const response = await fetch(`${API_URL}/api/v1/users/${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error?.email?.[0] ?? error?.detail ?? 'Error al actualizar usuario')
  }
  return response.json()
}
import { LoginRequest, LoginResponse } from '@/types/auth.types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/v1/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const error = await response.json()

    if (response.status === 401) {
      throw new Error('El email o la contraseña son incorrectos')
    }

    if (response.status === 400) {
      throw new Error('Por favor verifica los datos ingresados')
    }

    // Fallback — mensaje que venga del API
    throw new Error(error?.detail ?? 'Error al iniciar sesión')
  }

  return response.json()
}
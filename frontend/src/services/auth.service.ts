import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth.types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/v1/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const error = await response.json()
    if (response.status === 401) throw new Error('El email o la contraseña son incorrectos')
    if (response.status === 400) throw new Error('Por favor verifica los datos ingresados')
    throw new Error(error?.detail ?? 'Error al iniciar sesión')
  }

  return response.json()
}

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/api/v1/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    if (response.status === 400) {
      if (error?.email) throw new Error('Este email ya está registrado')
      throw new Error('Por favor verifica los datos ingresados')
    }
    throw new Error(error?.detail ?? 'Error al crear la cuenta')
  }

  return response.json()
}
import { apiPost, setTokens, clearTokens, ApiError } from '@/lib/api-client'
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types'

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const data = await apiPost<LoginResponse>('/api/v1/login/', credentials, false)
    setTokens(data.access, data.refresh)
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        throw new Error('El email o la contraseña son incorrectos')
      }
      if (error.status === 400) {
        throw new Error('Por favor verifica los datos ingresados')
      }
      throw new Error(error.message)
    }
    throw new Error('Error al iniciar sesión')
  }
}

export async function logout() {
  clearTokens()
}

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  try {
    return await apiPost<RegisterResponse>('/api/v1/register/', data, false)
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 400) {
        throw new Error('Este email ya está registrado')
      }
      throw new Error(error.message)
    }
    throw new Error('Error al crear la cuenta')
  }
}
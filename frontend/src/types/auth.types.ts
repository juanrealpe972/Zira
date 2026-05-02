export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  phone_prefix?: string
  phone?: string
  address?: string
  company?: string
  role?: string
  country?: string
  city?: string
  national_id?: string
}

export interface RegisterResponse {
  id: number
  email: string
  name: string
}

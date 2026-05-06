export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
}

export interface RegisterRequest {
  name: string
  phone?: string
  role?: string
  company?: string
  country?: string
  city?: string
  email: string
  password: string
  phone_prefix?: string
  address?: string
  national_id?: string
}

export interface RegisterResponse {
  id: number
  email: string
  name: string
}

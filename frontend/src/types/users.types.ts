export interface User {
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

export interface CreateUserRequest {
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
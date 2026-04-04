export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  access: string
  refresh: string
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
}

export type RegisterResponse = {
  id: number
  name: string
  email: string
}

export type ApiError = {
  detail: string
}
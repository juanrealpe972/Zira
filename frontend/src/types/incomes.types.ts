export type Income = {
  id: number
  user: number
  description: string
  amount: number
  category: string
  date: string
  notes: string
  is_active: boolean
  created_at: string
}

export type IncomeRequest = {
  category: string
  amount: number
  description: string
  date: string
  user: number
  is_active?: boolean
}
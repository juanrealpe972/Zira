export type Income = {
  id: number
  user: number
  title: string
  amount: number
  category: string
  source: string
  date: string
  notes: string
}

export type IncomeRequest = {
  user: number
  title: string
  amount: number
  category: string
  source: string
  date: string
  notes: string
}
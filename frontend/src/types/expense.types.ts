export type Expense = {
  id: number
  user: number
  title: string
  amount: number
  category: string
  date: string
  description: string
  type: string
}

export type ExpenseRequest = {
  user: number
  title: string
  amount: number
  category: string
  date: string
  description: string
  type: string
}
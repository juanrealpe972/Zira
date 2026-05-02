export type Saving = {
  id: number
  user: number
  bank_account: number
  goal_name: string
  target_amount: number
  current_amount: number
  interest_rate: number
  start_date: string
  target_date: string | null
  status: string
}

export type SavingRequest = {
  user: number
  bank_account: number
  goal_name: string
  target_amount: number
  current_amount: number
  interest_rate: number
  start_date: string
  target_date: string | null
  status: string
}
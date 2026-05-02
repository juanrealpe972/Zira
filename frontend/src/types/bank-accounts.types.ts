export type BankAccount = {
  id: number
  user: number
  bank_name: string
  account_type: 'ahorro' | 'corriente'
  account_number: string
  balance: number
}

export type BankAccountRequest = {
  user: number
  bank_name: string
  account_type: 'ahorro' | 'corriente'
  account_number: string
  balance: number
}
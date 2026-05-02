export type BankCard = {
  id: number
  user: number
  bank_account: number
  card_type: 'credito' | 'debito'
  card_number: string
  cardholder_name: string
  expiration_date: string
  cvv: string
}

export type BankCardRequest = {
  user: number
  bank_account: number
  card_type: 'credito' | 'debito'
  card_number: string
  cardholder_name: string
  expiration_date: string
  cvv: string
}

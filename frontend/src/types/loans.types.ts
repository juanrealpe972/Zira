export type Loan = {
  id: number
  user: number
  person: string
  loan_type: 'prestado' | 'solicitado'
  amount: number
  interest_rate: number
  start_date: string
  end_date: string | null
  status: 'pendiente' | 'pagando' | 'pagado' | 'vencido'
  notes: string
}

export type LoanRequest = {
  user: number
  person: string
  loan_type: 'prestado' | 'solicitado'
  amount: number
  interest_rate: number
  start_date: string
  end_date: string | null
  status: 'pendiente' | 'pagando' | 'pagado' | 'vencido'
  notes: string
}
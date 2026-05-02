export type ExpenseProduct = {
  id: number
  user: number
  expense: number
  product: number
  quantity: number
  unit_price: number
  subtotal: number
}

export type ExpenseProductRequest = {
  user: number
  expense: number
  product: number
  quantity: number
  unit_price: number
  subtotal: number
}
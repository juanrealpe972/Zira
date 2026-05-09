import { TableAction } from '@/components/common'
import { Icons } from '@/components/ui'
import { Expense } from '@/types'

export function getExpenseActions(
  onEdit: (id: number) => void,
  onToggleStatus: (expense: Expense) => void
): TableAction<Expense>[] {
  return [
    {
      label: 'Editar',
      icon: <Icons.edit />,
      onClick: (expense) => onEdit(expense.id),
    },

    {
      label: 'Inactivar',
      icon: <Icons.security />,
      color: 'red',
      separator: true,
      hidden: (expense) => expense.is_active === false,
      onClick: onToggleStatus,
    },

    {
      label: 'Activar',
      icon: <Icons.security />,
      color: 'green',
      separator: true,
      hidden: (expense) => expense.is_active === true,
      onClick: onToggleStatus,
    },
  ]
}
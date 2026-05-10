import { Income } from '@/types'
import { Icons } from '@/components/ui'
import { TableAction } from '@/components/common'

export function getIncomeActions(
  onEdit: (id: number) => void,
  onToggleStatus: (income: Income) => void
): TableAction<Income>[] {
  return [
    {
      label: 'Editar',
      icon: <Icons.edit />,
      onClick: (income) => onEdit(income.id),
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

import { TableAction } from '@/components/common'
import { Icons } from '@/components/ui'
import { User } from '@/types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export function getUserActions(
  router: AppRouterInstance,
  onEdit: (id: number) => void,
  onToggleStatus: (user: User) => void
): TableAction<User>[] {
  return [
    {
      label: 'Editar',
      icon: <Icons.edit />,
      onClick: (user) => onEdit(user.id),
    },

    {
      label: 'Ver perfil',
      icon: <Icons.user />,
      onClick: (user) =>
        router.push(`/dashboard/users/profile/${user.id}`),
    },

    {
      label: 'Inactivar',
      icon: <Icons.security />,
      color: 'red',
      separator: true,
      hidden: (user) => user.is_active === false,
      onClick: onToggleStatus,
    },

    {
      label: 'Activar',
      icon: <Icons.security />,
      color: 'green',
      separator: true,
      hidden: (user) => user.is_active === true,
      onClick: onToggleStatus,
    },
  ]
}
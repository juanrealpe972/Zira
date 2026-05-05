'use client'

import { IconButton, DropdownMenu } from '@radix-ui/themes'
import { Pencil1Icon, PersonIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { User } from '@/types'

type Props = {
  user: User
  onEdit: (userId: number) => void
  onViewProfile: (userId: number) => void
  onToggleStatus: (user: User) => void
}

export function UsersTableActions({
  user,
  onEdit,
  onViewProfile,
  onToggleStatus,
}: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" size="1">
          <DotsVerticalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onClick={() => onEdit(user.id)}>
          <Pencil1Icon /> Editar
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => onViewProfile(user.id)}>
          <PersonIcon /> Ver perfil
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          color={user.is_active ? 'red' : 'green'}
          onClick={() => onToggleStatus(user)}
        >
          {user.is_active ? 'Inactivar' : 'Activar'}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
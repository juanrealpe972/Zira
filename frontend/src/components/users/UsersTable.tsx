'use client'

import { User } from '@/services/users.service'
import { Badge, Flex, Text, IconButton, Box } from '@radix-ui/themes'
import { 
  Pencil1Icon, TrashIcon, CheckCircledIcon, CrossCircledIcon 
} from '@radix-ui/react-icons'
import { AppAvatar } from '@/components/ui/AppAvatar'

interface Props {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  onToggleStatus: (user: User) => void
  loading?: boolean
}

const ROLE_COLORS: Record<string, 'amber' | 'blue' | 'crimson' | 'green' | 'gray'> = {
  admin: 'crimson',
  premium: 'green',
  user: 'blue',
  editor: 'amber',
  viewer: 'gray',
}

export function UsersTable({ users, onEdit, onDelete, onToggleStatus, loading }: Props) {
  if (loading) {
    return (
      <Flex justify="center" py="9">
        <Text>Cargando usuarios...</Text>
      </Flex>
    )
  }

  if (users.length === 0) {
    return (
      <Flex justify="center" py="9">
        <Text color="gray">No hay usuarios registrados</Text>
      </Flex>
    )
  }

  return (
    <Box style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--gray-5)' }}>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}><Text weight="bold" size="2">Usuario</Text></th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}><Text weight="bold" size="2">Email</Text></th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}><Text weight="bold" size="2">Rol</Text></th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}><Text weight="bold" size="2">Estado</Text></th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}><Text weight="bold" size="2">Fecha</Text></th>
            <th style={{ textAlign: 'center', padding: '12px 8px' }}><Text weight="bold" size="2">Acciones</Text></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid var(--gray-4)' }}>
              <td style={{ padding: '12px 8px' }}>
                <Flex align="center" gap="3">
                  <AppAvatar src={user.photo} name={user.name} size="2" />
                  <Text size="2" weight="medium">{user.name}</Text>
                </Flex>
              </td>
              <td style={{ padding: '12px 8px' }}>
                <Text size="2" color="gray">{user.email}</Text>
              </td>
              <td style={{ padding: '12px 8px' }}>
                <Badge color={ROLE_COLORS[user.role] || 'gray'}>
                  {user.role}
                </Badge>
              </td>
              <td style={{ padding: '12px 8px' }}>
                <Badge color={user.is_active ? 'green' : 'red'} variant="solid">
                  {user.is_active ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td style={{ padding: '12px 8px' }}>
                <Text size="2" color="gray">
                  {new Date(user.created_at).toLocaleDateString('es-CO')}
                </Text>
              </td>
              <td style={{ padding: '12px 8px' }}>
                <Flex gap="2" justify="center">
                  <IconButton 
                    variant="soft" 
                    color="gray"
                    onClick={() => onEdit(user)}
                    title="Editar"
                  >
                    <Pencil1Icon width={14} height={14} />
                  </IconButton>
                  <IconButton 
                    variant="soft" 
                    color={user.is_active ? 'red' : 'green'}
                    onClick={() => onToggleStatus(user)}
                    title={user.is_active ? 'Desactivar' : 'Activar'}
                  >
                    {user.is_active 
                      ? <CrossCircledIcon width={14} height={14} />
                      : <CheckCircledIcon width={14} height={14} />
                    }
                  </IconButton>
                  <IconButton 
                    variant="soft" 
                    color="red"
                    onClick={() => onDelete(user)}
                    title="Eliminar"
                  >
                    <TrashIcon width={14} height={14} />
                  </IconButton>
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  )
}
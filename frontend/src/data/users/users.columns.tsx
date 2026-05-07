import { User } from '@/types'
import { Badge, Flex, Box, Text, Avatar } from '@radix-ui/themes'
import { Icons } from '@/components/ui'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export type ColumnKey =
  | 'name'
  | 'phone'
  | 'email'
  | 'role'
  | 'company'
  | 'country'
  | 'city'
  | 'verified'
  | 'is_staff'
  | 'created_at'
  | 'status'
  | 'national_id'

export const ALL_USER_COLUMNS: { key: ColumnKey; label: string }[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'phone', label: 'Teléfono' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Rol' },
  { key: 'company', label: 'Empresa' },
  { key: 'country', label: 'País' },
  { key: 'city', label: 'Ciudad' },
  { key: 'verified', label: 'Verificado' },
  { key: 'is_staff', label: 'Staff' },
  { key: 'created_at', label: 'Fecha creación' },
  { key: 'status', label: 'Estado' },
  { key: 'national_id', label: 'ID nacional' },
]

export function getUserColumns(
  router: AppRouterInstance,
  visibleColumns: ColumnKey[]
) {
  return visibleColumns.map((key) => {
    switch (key) {
      case 'name':
        return {
          key,
          label: 'Nombre',
          render: (user: User) => (
            <Flex align="center" gap="2">
              <Avatar
                size="2"
                src={user.photo ?? undefined}
                fallback={<Icons.user />}
                radius="full"
              />
              <Box>
                <Text
                  size="2"
                  weight="medium"
                  onClick={() =>
                    router.push(`/dashboard/users/profile/${user.id}`)
                  }
                  style={{ cursor: 'pointer', display: 'block' }}
                >
                  {user.name}
                </Text>
                <Text size="1" color="gray">
                  {user.email}
                </Text>
              </Box>
            </Flex>
          ),
        }

      case 'status':
        return {
          key,
          label: 'Estado',
          render: (user: User) => (
            <Badge color={user.is_active ? 'green' : 'red'} variant="soft">
              {user.is_active ? 'Activo' : 'Inactivo'}
            </Badge>
          ),
        }

      case 'created_at':
        return {
          key,
          label: 'Fecha creación',
          render: (user: User) =>
            new Date(user.created_at).toLocaleDateString('es-CO'),
        }

      default:
        return {
          key,
          label: ALL_USER_COLUMNS.find(c => c.key === key)?.label || key,
          render: (user: User) =>
            (user as any)[key] ?? '—',
        }
    }
  })
}
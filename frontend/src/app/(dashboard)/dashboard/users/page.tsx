import { Box, Flex, Heading, Text, Card, Avatar, Badge } from '@radix-ui/themes'
import { PersonIcon } from '@radix-ui/react-icons'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usuarios',
}

const users = [
  { id: 1, name: 'Juan Realpe', email: 'juan@zira.cc', role: 'Administrador', status: 'Activo' },
  { id: 2, name: 'Ana García', email: 'ana@zira.cc', role: 'Editor', status: 'Activo' },
  { id: 3, name: 'Carlos López', email: 'carlos@zira.cc', role: 'Viewer', status: 'Inactivo' },
  { id: 4, name: 'María Torres', email: 'maria@zira.cc', role: 'Editor', status: 'Activo' },
]

export default function UsersPage() {
  return (
    <Box p="6">
      <Flex justify="between" align="center" mb="6">
        <Box>
          <Heading size="6" mb="1">Usuarios</Heading>
          <Text color="gray" size="2">Gestiona los usuarios del sistema</Text>
        </Box>
      </Flex>

      <Card size="2">
        <Flex
          px="4"
          py="3"
          style={{ borderBottom: '1px solid var(--gray-4)' }}
        >
          <Text size="1" weight="bold" color="gray" style={{ width: '35%', textTransform: 'uppercase' }}>
            Usuario
          </Text>
          <Text size="1" weight="bold" color="gray" style={{ width: '25%', textTransform: 'uppercase' }}>
            Rol
          </Text>
          <Text size="1" weight="bold" color="gray" style={{ width: '20%', textTransform: 'uppercase' }}>
            Estado
          </Text>
        </Flex>

        {users.map((user) => (
          <Flex
            key={user.id}
            align="center"
            px="4"
            py="3"
            style={{
              borderBottom: '1px solid var(--gray-3)',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
          >
            <Flex align="center" gap="3" style={{ width: '35%' }}>
              <Avatar
                size="2"
                fallback={<PersonIcon />}
                radius="full"
                style={{ background: 'var(--accent-3)' }}
              />
              <Box>
                <Text size="2" weight="medium">{user.name}</Text>
                <Text size="1" color="gray" style={{ display: 'block' }}>{user.email}</Text>
              </Box>
            </Flex>

            <Text size="2" style={{ width: '25%' }}>{user.role}</Text>

            <Box style={{ width: '20%' }}>
              <Badge
                size="1"
                color={user.status === 'Activo' ? 'green' : 'gray'}
                variant="soft"
                radius="full"
              >
                {user.status}
              </Badge>
            </Box>
          </Flex>
        ))}
      </Card>
    </Box>
  )
}
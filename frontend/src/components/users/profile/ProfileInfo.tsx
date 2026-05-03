'use client'

import { useState } from 'react'
import { Box, Flex, Text, Heading, Badge, Separator, Avatar, Dialog, Button, IconButton } from '@radix-ui/themes'
import { Icons } from '@/components/ui'
import { User } from '@/types'

// Datos mock — luego conectas a tu API
const mockFollowers = [
  { id: 1, name: 'Ana García', role: 'Free', photo: null },
  { id: 2, name: 'Carlos López', role: 'Admin', photo: null },
  { id: 3, name: 'María Torres', role: 'Premium', photo: null },
]

const mockFollowing = [
  { id: 4, name: 'Pedro Ramírez', role: 'Free', photo: null },
  { id: 5, name: 'Laura Gómez', role: 'Premium', photo: null },
]

type ModalType = 'followers' | 'following' | 'posts' | null

export function ProfileInfo({ user }: { user: User }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const stats = [
    { key: 'followers' as ModalType, label: 'Seguidores', value: '120' },
    { key: 'following' as ModalType, label: 'Seguidos', value: '80' },
    { key: 'posts' as ModalType, label: 'Posts', value: '25' },
  ]

  const modalData = {
    followers: { title: 'Seguidores', users: mockFollowers },
    following: { title: 'Seguidos', users: mockFollowing },
    posts: { title: 'Posts', users: [] },
  }

  return (
    <Box px="6" mt="3">

      {/* Nombre y badges */}
      <Flex align="center" gap="2" wrap="wrap">
        <Heading size="6">{user.name}</Heading>
        {user.verified && (
          <Badge color="blue" variant="soft" size="1" radius="full">✓ Verificado</Badge>
        )}
        {user.is_staff && (
          <Badge color="orange" variant="soft" size="1" radius="full">Staff</Badge>
        )}
        <Badge color={user.is_active ? 'green' : 'red'} variant="soft" size="1" radius="full">
          {user.is_active ? 'Activo' : 'Inactivo'}
        </Badge>
      </Flex>

      {/* Email */}
      <Flex align="center" gap="1" mt="1">
        <Icons.mail width={13} style={{ color: 'var(--gray-9)' }} />
        <Text size="2" color="gray">{user.email}</Text>
      </Flex>

      {/* Ubicación */}
      {(user.city || user.country) && (
        <Flex align="center" gap="1" mt="1">
          <Text size="2" color="gray">📍</Text>
          <Text size="2" color="gray">
            {[user.city, user.country].filter(Boolean).join(', ')}
          </Text>
        </Flex>
      )}

      {/* Rol */}
      {user.role && (
        <Flex align="center" gap="1" mt="1">
          <Icons.user width={13} style={{ color: 'var(--gray-9)' }} />
          <Text size="2" color="gray" style={{ textTransform: 'capitalize' }}>{user.role}</Text>
        </Flex>
      )}

      {/* Estadísticas clicables */}
      <Flex gap="3" mt="4">
        {stats.map(({ key, label, value }) => (
          <Box
            key={key}
            onClick={() => setActiveModal(key)}
            style={{
              cursor: 'pointer',
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid var(--gray-4)',
              textAlign: 'center',
              transition: 'background 0.15s ease',
              minWidth: 80,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <Text size="5" weight="bold" style={{ display: 'block' }}>{value}</Text>
            <Text size="1" color="gray">{label}</Text>
          </Box>
        ))}
      </Flex>

      <Separator size="4" mt="4" />

      {/* Modal de seguidores/seguidos */}
      <Dialog.Root
        open={activeModal !== null}
        onOpenChange={v => !v && setActiveModal(null)}
      >
        <Dialog.Content style={{ maxWidth: 420, padding: 0 }}>

          {/* Header */}
          <Flex
            align="center"
            justify="between"
            px="4"
            py="3"
            style={{ borderBottom: '1px solid var(--gray-4)' }}
          >
            <Dialog.Title style={{ margin: 0 }}>
              {activeModal ? modalData[activeModal].title : ''}
            </Dialog.Title>
            <Dialog.Close>
              <IconButton variant="ghost" size="1">
                <Icons.crossIcon />
              </IconButton>
            </Dialog.Close>
          </Flex>

          {/* Lista de usuarios */}
          <Box style={{ maxHeight: 400, overflowY: 'auto' }}>
            {activeModal && modalData[activeModal].users.length === 0 ? (
              <Flex direction="column" align="center" justify="center" py="8" gap="2">
                <Icons.user />
                <Text color="gray" size="2">Sin {modalData[activeModal].title.toLowerCase()} aún</Text>
              </Flex>
            ) : (
              activeModal && modalData[activeModal].users.map(u => (
                <Flex
                  key={u.id}
                  align="center"
                  justify="between"
                  px="4"
                  py="3"
                  style={{
                    borderBottom: '1px solid var(--gray-3)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <Flex align="center" gap="3">
                    <Avatar
                      size="3"
                      src={u.photo ?? undefined}
                      fallback={u.name[0]}
                      radius="full"
                      style={{ background: 'var(--accent-3)' }}
                    />
                    <Box>
                      <Text size="2" weight="medium" style={{ display: 'block' }}>{u.name}</Text>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>{u.role}</Text>
                    </Box>
                  </Flex>
                  <Button size="1" variant="outline">Ver perfil</Button>
                </Flex>
              ))
            )}
          </Box>

        </Dialog.Content>
      </Dialog.Root>

    </Box>
  )
}
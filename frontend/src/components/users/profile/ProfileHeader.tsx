'use client'

import { Box, Flex, Avatar, Text, Heading, IconButton } from '@radix-ui/themes'
import { Icons } from '@/components/ui'
import { User } from '@/types'
import { EditUserModal } from '@/components/users/EditUserModal'
import { useState } from 'react'

type Tab = 'profile' | 'followers' | 'friends' | 'gallery'

type Props = {
  user: User
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const TABS: { key: Tab; label: string; icon: React.ComponentType<{ width?: number; height?: number; style?: React.CSSProperties }> }[] = [
  { key: 'profile', label: 'Perfil', icon: Icons.user },
  { key: 'followers', label: 'Seguidores', icon: Icons.notification },
  { key: 'friends', label: 'Amigos', icon: Icons.user },
  { key: 'gallery', label: 'Galería', icon: Icons.archive },
]

export function ProfileHeader({ user, activeTab, onTabChange }: Props) {
  const [users, setUsers] = useState<User[]>([])
  const [editUserId, setEditUserId] = useState<number | null>(null)

  function handleUserUpdated(updated: User) {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
  }

  return (
    <Box
      mb="4"
      style={{
        border: '1px solid var(--gray-4)',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--color-background)',
      }}
    >
      {/* Banner */}
      <Box
        style={{
          height: 200,
          background: 'linear-gradient(135deg, var(--accent-9) 0%, var(--accent-11) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <Box style={{ position: 'absolute', bottom: -30, right: 100, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        {/* Acciones top right */}
        <Flex gap="2" style={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton variant="soft" size="2" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>
            <Icons.share />
          </IconButton>
          <IconButton variant="soft" size="2" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }} onClick={() => setEditUserId(user.id)}>
            <Icons.edit />
          </IconButton>
        </Flex>

        {/* Avatar + nombre dentro del banner */}
        <Flex
          align="center"
          gap="4"
          style={{
            position: 'absolute',
            bottom: 20,
            left: 24,
          }}
        >
          <Box style={{ position: 'relative' }}>
            <Avatar
              size="7"
              src={user.photo ?? undefined}
              fallback={user.name?.[0]?.toUpperCase() ?? 'U'}
              radius="full"
              style={{ border: '3px solid rgba(255,255,255,0.4)', background: 'var(--accent-3)' }}
            />
            <Box
              style={{
                position: 'absolute', bottom: 3, right: 3,
                width: 12, height: 12, borderRadius: '50%',
                background: user.is_active ? 'var(--green-9)' : 'var(--gray-7)',
                border: '2px solid white',
              }}
            />
          </Box>
          <Box>
            <Heading size="5" style={{ color: 'white' }}>{user.name}</Heading>
            <Text size="2" style={{ color: 'rgba(255,255,255,0.75)', textTransform: 'capitalize' }}>
              {user.role}
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* Tabs */}
      <Flex
        px="4"
        style={{ borderTop: '1px solid var(--gray-4)' }}
      >
        {TABS.map(({ key, label, icon: Icon }) => (
          <Box
            key={key}
            onClick={() => onTabChange(key)}
            style={{
              cursor: 'pointer',
              padding: '14px 16px',
              borderBottom: activeTab === key
                ? '2px solid var(--accent-9)'
                : '2px solid transparent',
              transition: 'border-color 0.15s ease',
            }}
          >
            <Flex align="center" gap="2">
              <Icon
                width={14}
                height={14}
                style={{ color: activeTab === key ? 'var(--accent-9)' : 'var(--gray-9)' }}
              />
              <Text
                size="2"
                weight={activeTab === key ? 'bold' : 'regular'}
                style={{ color: activeTab === key ? 'var(--accent-9)' : 'var(--gray-11)' }}
              >
                {label}
              </Text>
            </Flex>
          </Box>
        ))}
      </Flex>
      <EditUserModal
        userId={editUserId}
        open={editUserId !== null}
        onClose={() => setEditUserId(null)}
        onUpdated={handleUserUpdated}
      />
    </Box>
  )
}
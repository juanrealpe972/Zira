'use client'

import { useState } from 'react'
import { Box, Flex, Text, Card, Avatar, Button, TextField } from '@radix-ui/themes'
import { MockFollower } from '@/data/profile.mock'
import { Icons } from '@/components/ui'

export function FollowersTab({ followers }: { followers: MockFollower[] }) {
  const [list, setList] = useState(followers)
  const [search, setSearch] = useState('')

  const filtered = list.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.location.toLowerCase().includes(search.toLowerCase())
  )

  function toggleFollow(id: number) {
    setList(prev => prev.map(f =>
      f.id === id ? { ...f, isFollowing: !f.isFollowing } : f
    ))
  }

  return (
    <Box>
      {/* Búsqueda */}
      <Box mb="4">
        <TextField.Root
          placeholder="Buscar seguidores..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        >
          <TextField.Slot><Icons.magnifyingGlassIcon /></TextField.Slot>
        </TextField.Root>
      </Box>

      <Flex wrap="wrap" gap="4">
        {filtered.length === 0 ? (
          <Flex align="center" justify="center" style={{ width: '100%' }} py="8">
            <Text color="gray">No se encontraron seguidores</Text>
          </Flex>
        ) : filtered.map(follower => (
          <Card
            key={follower.id}
            size="2"
            style={{
              width: 200,
              textAlign: 'center',
              border: '1px solid var(--gray-4)',
            }}
          >
            <Flex direction="column" align="center" gap="2">
              <Avatar
                size="5"
                src={follower.photo ?? undefined}
                fallback={follower.name[0]}
                radius="full"
                style={{ background: 'var(--accent-3)' }}
              />
              <Box>
                <Text size="2" weight="bold" style={{ display: 'block' }}>{follower.name}</Text>
                <Flex align="center" justify="center" gap="1" mt="1">
                  <Icons.archive width={11} style={{ color: 'var(--gray-9)' }} />
                  <Text size="1" color="gray">{follower.location}</Text>
                </Flex>
                <Text size="1" color="gray" style={{ textTransform: 'capitalize', display: 'block', marginTop: 2 }}>
                  {follower.role}
                </Text>
              </Box>
              <Button
                size="1"
                variant={follower.isFollowing ? 'outline' : 'solid'}
                style={{ width: '100%', marginTop: 4 }}
                onClick={() => toggleFollow(follower.id)}
              >
                {follower.isFollowing ? 'Siguiendo' : 'Seguir'}
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  )
}
'use client'

import { useState } from 'react'
import { Box, Flex, Text, Card, Avatar, Button, TextField } from '@radix-ui/themes'
import { MockFriend } from '@/data/profile.mock'
import { Icons } from '@/components/ui'

export function FriendsTab({ friends }: { friends: MockFriend[] }) {
  const [search, setSearch] = useState('')

  const filtered = friends.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.job.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box>
      <Box mb="4">
        <TextField.Root
          placeholder="Buscar amigos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        >
          <TextField.Slot><Icons.magnifyingGlassIcon /></TextField.Slot>
        </TextField.Root>
      </Box>

      <Flex direction="column" gap="3">
        {filtered.length === 0 ? (
          <Flex align="center" justify="center" py="8">
            <Text color="gray">No se encontraron amigos</Text>
          </Flex>
        ) : filtered.map(friend => (
          <Card
            key={friend.id}
            size="2"
            style={{ border: '1px solid var(--gray-4)' }}
          >
            <Flex justify="between" align="center">
              <Flex align="center" gap="3">
                <Avatar
                  size="4"
                  src={friend.photo ?? undefined}
                  fallback={friend.name[0]}
                  radius="full"
                  style={{ background: 'var(--accent-3)', flexShrink: 0 }}
                />
                <Box>
                  <Text size="2" weight="bold" style={{ display: 'block' }}>{friend.name}</Text>
                  <Flex align="center" gap="1" mt="1">
                    <Icons.task width={12} style={{ color: 'var(--gray-9)' }} />
                    <Text size="1" color="gray">{friend.job} en {friend.company}</Text>
                  </Flex>

                  {/* Redes sociales */}
                  <Flex gap="2" mt="2">
                    {Object.entries(friend.social).map(([platform, url]) => (
                      <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                        <Icons.share
                          width={14}
                          height={14}
                          style={{ color: 'var(--accent-9)', cursor: 'pointer' }}
                        />
                      </a>
                    ))}
                  </Flex>
                </Box>
              </Flex>

              <Flex gap="2">
                <Button size="1" variant="outline">Ver perfil</Button>
                <Button size="1" variant="soft" color="red">Eliminar</Button>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  )
}
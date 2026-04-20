'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Text, Card, Heading, IconButton, Button } from '@radix-ui/themes'
import { PlusIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Icons } from '@/components/ui/icons/icons'
import { MockPost } from '@/data/profile.mock'
import { PostCard } from '../PostCard'
import { CreatePostCard } from '../CreatePostCard'
import { User } from '@/services/users.service'
import { SocialNetworkModal } from '../SocialNetworkModal'
import {
  getSocialNetworks,
  deleteSocialNetwork,
  SocialNetwork,
} from '@/services/social-networks.service'
import PlatformIcon from '../../../ui/PlatformIcon'

type Props = {
  user: User
  viewerId: number | null        // ID del usuario que está viendo el perfil
  posts: MockPost[]
  newPost: string
  setNewPost: (v: string) => void
  imagePreview: string | null
  setImagePreview: (v: string | null) => void
  onCreatePost: () => void
}

export function ProfileTab({
  user, viewerId, posts, newPost,
  setNewPost, imagePreview, setImagePreview, onCreatePost,
}: Props) {
  const [socials, setSocials] = useState<SocialNetwork[]>([])
  const [socialModalOpen, setSocialModalOpen] = useState(false)
  const [editingSocial, setEditingSocial] = useState<SocialNetwork | null>(null)

  // Puede editar si es el dueño del perfil o admin
  const canEdit = viewerId === user.id || user.role === 'admin'

  useEffect(() => {
    getSocialNetworks(user.id)
      .then(setSocials)
      .catch(() => setSocials([]))
  }, [user.id])

  function handleSaved(social: SocialNetwork) {
    setSocials(prev => {
      const exists = prev.find(s => s.id === social.id)
      return exists
        ? prev.map(s => s.id === social.id ? social : s)
        : [...prev, social]
    })
    setEditingSocial(null)
  }

  async function handleDelete(id: number) {
    try {
      await deleteSocialNetwork(id)
      setSocials(prev => prev.filter(s => s.id !== id))
    } catch {
      console.error('Error al eliminar red social')
    }
  }

  return (
    <Flex gap="4" align="start">

      {/* Columna izquierda */}
      <Flex direction="column" gap="4" style={{ width: 280, flexShrink: 0 }}>

        {/* About */}
        <Card size="2">
          <Heading size="3" mb="3">Acerca de</Heading>
          {user.address && (
            <Text size="2" color="gray" style={{ lineHeight: 1.6, display: 'block', marginBottom: 12 }}>
              {user.address}
            </Text>
          )}
          <Flex direction="column" gap="2">
            {user.city || user.country ? (
              <Flex align="center" gap="2">
                <Icons.archive width={14} style={{ color: 'var(--gray-9)', flexShrink: 0 }} />
                <Text size="2" color="gray">
                  {[user.city, user.country].filter(Boolean).join(', ')}
                </Text>
              </Flex>
            ) : null}
            <Flex align="center" gap="2">
              <Icons.mail width={14} style={{ color: 'var(--gray-9)', flexShrink: 0 }} />
              <Text size="2" color="gray">{user.email}</Text>
            </Flex>
            {user.company && (
              <Flex align="center" gap="2">
                <Icons.task width={14} style={{ color: 'var(--gray-9)', flexShrink: 0 }} />
                <Text size="2" color="gray">Trabaja en {user.company}</Text>
              </Flex>
            )}
          </Flex>
        </Card>

        {/* Social */}
        <Card size="2">
          <Flex justify="between" align="center" mb="3">
            <Heading size="3">Social</Heading>
            {canEdit && (
              <IconButton
                variant="ghost"
                size="1"
                onClick={() => { setEditingSocial(null); setSocialModalOpen(true) }}
              >
                <PlusIcon />
              </IconButton>
            )}
          </Flex>

          {socials.length === 0 ? (
            <Text size="2" color="gray">Sin redes sociales</Text>
          ) : (
            <Flex direction="column" gap="2">
              {socials.map(social => (
                <Flex key={social.id} align="center" justify="between" gap="2">
                  <Flex align="center" gap="2" style={{ flex: 1, minWidth: 0 }}>
                    <PlatformIcon platform={social.platform} />
                    <Box style={{ minWidth: 0 }}>
                      <Text size="1" color="gray" style={{ display: 'block' }}>{social.platform}</Text>
                      <a href={social.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Text
                          size="2"
                          style={{
                            color: 'var(--accent-9)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                          }}
                        >
                          {social.username}
                        </Text>
                      </a>
                    </Box>
                  </Flex>

                  {canEdit && (
                    <Flex gap="1" style={{ flexShrink: 0 }}>
                      <IconButton
                        variant="ghost"
                        size="1"
                        onClick={() => { setEditingSocial(social); setSocialModalOpen(true) }}
                      >
                        <Pencil1Icon />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        size="1"
                        color="red"
                        onClick={() => handleDelete(social.id)}
                      >
                        <TrashIcon />
                      </IconButton>
                    </Flex>
                  )}
                </Flex>
              ))}
            </Flex>
          )}
        </Card>
      </Flex>

      {/* Columna derecha — posts */}
      <Flex direction="column" gap="4" style={{ flex: 1, minWidth: 0 }}>
        <CreatePostCard
          userName={user.name}
          userPhoto={user.photo}
          newPost={newPost}
          setNewPost={setNewPost}
          handleCreatePost={onCreatePost}
          setImagePreview={setImagePreview}
          imagePreview={imagePreview}
        />
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Flex>

      {/* Modal red social */}
      <SocialNetworkModal
        open={socialModalOpen}
        onClose={() => { setSocialModalOpen(false); setEditingSocial(null) }}
        userId={user.id}
        existing={editingSocial}
        onSaved={handleSaved}
      />
    </Flex>
  )
}
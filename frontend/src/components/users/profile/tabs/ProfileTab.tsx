'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Text, Card, Heading, IconButton } from '@radix-ui/themes'
import { Icons, PlatformIcon } from '@/components/ui'
import {  } from '@/components/users/profile/tabs'
import { MockPost } from '@/data/profile.mock'
import { PostCard } from '../PostCard'
import { CreatePostCard } from '../CreatePostCard'
import { User, SocialNetwork } from '@/types'
import { SocialNetworkModal } from '../SocialNetworkModal'
import { getSocialNetworks, deleteSocialNetwork } from '@/services'

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

type PaginatedResponse<T> = {
  count: number
  results: T[]
}

export function ProfileTab({
  user, viewerId, posts, newPost,
  setNewPost, imagePreview, setImagePreview, onCreatePost,
}: Props) {
  const [socials, setSocials] = useState<SocialNetwork[]>([]);
  const [socialModalOpen, setSocialModalOpen] = useState(false)
  const [editingSocial, setEditingSocial] = useState<SocialNetwork | null>(null)

  // Puede editar si es el dueño del perfil o admin
  const canEdit = viewerId === user.id || user.role === 'admin'

  useEffect(() => {
    getSocialNetworks(user.id)
      .then((data: SocialNetwork[] | PaginatedResponse<SocialNetwork>) => {
        const parsed = Array.isArray(data) ? data : data.results
        // console.log(`Redes sociales cargadas: ${parsed.length} para el usuario ${user.id}`)
        setSocials(parsed)
      })
      .catch(() => setSocials([]));
  }, [user.id]);

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

        <Card size="2">
          <Flex justify="between" align="center" mb="3">
            <Heading size="3">Social</Heading>
            {canEdit && (
              <IconButton
                variant="ghost"
                size="1"
                onClick={() => { setEditingSocial(null); setSocialModalOpen(true) }}
              >
                <Icons.plusIcon />
              </IconButton>
            )}
          </Flex>

          {!Array.isArray(socials) || socials.length === 0 ? (
            <Flex direction="column" align="center" gap="1" py="3">
              <Icons.share width={20} style={{ color: 'var(--gray-6)' }} />
              <Text size="1" color="gray">Sin redes sociales</Text>
            </Flex>
          ) : (
            <Flex direction="column" gap="3">
              {Array.isArray(socials) && socials.map(social => (
                <Flex key={social.id} align="center" justify="between" gap="2">

                  <Flex align="center" gap="3" style={{ flex: 1, minWidth: 0 }}>

                    {/* Ícono con fondo */}
                    <Flex
                      align="center"
                      justify="center"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'var(--accent-3)',
                        flexShrink: 0,
                      }}
                    >
                      <PlatformIcon platform={social.platform} size={16} />
                    </Flex>

                    {/* Info */}
                    <Box style={{ minWidth: 0 }}>
                      <Text
                        size="1"
                        weight="bold"
                        style={{
                          display: 'block',
                          textTransform: 'capitalize',
                          color: 'var(--gray-12)',
                        }}
                      >
                        {social.platform}
                      </Text>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                      >
                        <Text
                          size="1"
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            transition: 'opacity 0.15s',
                          }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                        >
                          {social.username}
                        </Text>
                      </a>
                    </Box>
                  </Flex>

                  {/* Acciones */}
                  {canEdit && (
                    <Flex gap="1" style={{ flexShrink: 0 }}>
                      <IconButton
                        variant="ghost"
                        size="1"
                        onClick={() => { setEditingSocial(social); setSocialModalOpen(true) }}
                      >
                        <Icons.edit />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        size="1"
                        color="red"
                        onClick={() => handleDelete(social.id)}
                      >
                        <Icons.delete />
                      </IconButton>
                    </Flex>
                  )}
                </Flex>
              ))}
            </Flex>
          )}
        </Card>
      </Flex >

      {/* Columna derecha — posts */}
      < Flex direction="column" gap="4" style={{ flex: 1, minWidth: 0 }
      }>
        <CreatePostCard
          userName={user.name}
          userPhoto={user.photo}
          newPost={newPost}
          setNewPost={setNewPost}
          handleCreatePost={onCreatePost}
          setImagePreview={setImagePreview}
          imagePreview={imagePreview}
        />
        {
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        }
      </Flex >

      {/* Modal red social */}
      < SocialNetworkModal
        open={socialModalOpen}
        onClose={() => { setSocialModalOpen(false); setEditingSocial(null) }}
        userId={user.id}
        existing={editingSocial}
        onSaved={handleSaved}
      />
    </Flex >
  )
}
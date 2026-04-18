'use client'

import { useState } from 'react'
import {
  Box, Flex, Card, Avatar, Text, IconButton,
  Separator, TextField, Button, DropdownMenu,
} from '@radix-ui/themes'
import {
  HeartIcon, ChatBubbleIcon, Share2Icon,
  DotsHorizontalIcon, Pencil1Icon, TrashIcon,
  BookmarkIcon, EyeNoneIcon,
} from '@radix-ui/react-icons'
import { Post } from '@/types/social'

export function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')
  const [saved, setSaved] = useState(false)
  const [hidden, setHidden] = useState(false)

  function handleLike() {
    setLiked(prev => !prev)
    setLikes(prev => liked ? prev - 1 : prev + 1)
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  if (hidden) return null

  return (
    <Card size="2" style={{ border: '1px solid var(--gray-4)' }}>

      {/* Header */}
      <Flex justify="between" align="center" mb="3">
        <Flex align="center" gap="2">
          <Avatar
            size="3"
            fallback="U"
            radius="full"
            style={{ background: 'var(--accent-3)' }}
          />
          <Box>
            <Text size="2" weight="bold" style={{ display: 'block' }}>Usuario</Text>
            <Text size="1" color="gray">{formatDate(post.createdAt)}</Text>
          </Box>
        </Flex>

        {/* ← Menú de 3 puntos mejorado */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton variant="ghost" size="1">
              <DotsHorizontalIcon />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end" size="2">
            <DropdownMenu.Item onClick={() => setSaved(v => !v)}>
              <BookmarkIcon />
              {saved ? 'Guardado' : 'Guardar publicación'}
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Share2Icon /> Compartir
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Pencil1Icon /> Editar
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setHidden(true)}>
              <EyeNoneIcon /> Ocultar publicación
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">
              <TrashIcon /> Eliminar
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>

      {/* Contenido */}
      <Text size="2" style={{ lineHeight: 1.6, display: 'block' }}>
        {post.text}
      </Text>

      {/* Imagen */}
      {post.image && (
        <Box mt="3" style={{ borderRadius: 8, overflow: 'hidden' }}>
          <img
            src={post.image}
            alt="post"
            style={{ width: '100%', maxHeight: 360, objectFit: 'cover', display: 'block' }}
          />
        </Box>
      )}

      <Separator size="4" mt="3" mb="3" />

      {/* Acciones */}
      <Flex gap="1">
        <Button
          variant="ghost"
          size="2"
          onClick={handleLike}
          style={{ color: liked ? 'var(--red-9)' : 'var(--gray-11)' }}
        >
          <HeartIcon /> {likes}
        </Button>

        <Button
          variant="ghost"
          size="2"
          onClick={() => setShowComments(v => !v)}
          style={{ color: 'var(--gray-11)' }}
        >
          <ChatBubbleIcon /> {post.comments.length}
        </Button>

        <Button variant="ghost" size="2" style={{ color: 'var(--gray-11)' }}>
          <Share2Icon /> Compartir
        </Button>

        {/* Guardar — al lado derecho */}
        <Box style={{ marginLeft: 'auto' }}>
          <IconButton
            variant="ghost"
            size="2"
            onClick={() => setSaved(v => !v)}
            style={{ color: saved ? 'var(--accent-9)' : 'var(--gray-11)' }}
          >
            <BookmarkIcon />
          </IconButton>
        </Box>
      </Flex>

      {/* Comentarios */}
      {showComments && (
        <Box mt="3">
          {post.comments.length > 0 && (
            <Flex direction="column" gap="2" mb="3">
              {post.comments.map(c => (
                <Flex key={c.id} gap="2" align="start">
                  <Avatar
                    size="1"
                    fallback={c.user[0]}
                    radius="full"
                    style={{ background: 'var(--accent-3)', flexShrink: 0 }}
                  />
                  <Box
                    px="3"
                    py="2"
                    style={{ background: 'var(--gray-2)', borderRadius: 8, flex: 1 }}
                  >
                    <Text size="1" weight="bold" style={{ display: 'block' }}>{c.user}</Text>
                    <Text size="2">{c.text}</Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          )}

          <Flex gap="2" align="center">
            <Avatar size="2" fallback="U" radius="full" style={{ flexShrink: 0 }} />
            <TextField.Root
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Escribe un comentario..."
              style={{ flex: 1 }}
              size="2"
            />
            <Button size="2" disabled={!comment.trim()}>Enviar</Button>
          </Flex>
        </Box>
      )}
    </Card>
  )
}
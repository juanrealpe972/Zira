'use client'

import { useState } from 'react'
import { Box, Flex, Card, Avatar, Button, IconButton, Separator } from '@radix-ui/themes'
import { Icons } from '@/components/ui'

type Props = {
  userName: string
  userPhoto?: string | null
  newPost: string
  setNewPost: (v: string) => void
  handleCreatePost: () => void
  setImagePreview: (v: string | null) => void
  imagePreview?: string | null
}

export function CreatePostCard({ userName, userPhoto, newPost, setNewPost, handleCreatePost, setImagePreview, imagePreview }: Props) {
  const [focused, setFocused] = useState(false)

  return (
    <Box px="6">
      <Card
        size="2"
        style={{
          border: focused ? '1px solid var(--accent-7)' : '1px solid var(--gray-4)',
          transition: 'border-color 0.2s',
        }}
      >
        <Flex gap="3" align="start">
          <Avatar
            size="3"
            src={userPhoto ?? undefined}
            fallback={userName?.[0]?.toUpperCase() ?? 'U'}
            radius="full"
            style={{ flexShrink: 0 }}
          />

          <Box style={{ flex: 1 }}>
            <textarea
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={`¿Qué estás pensando, ${userName?.split(' ')[0]}?`}
              rows={3}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontSize: 14,
                color: 'var(--gray-12)',
                fontFamily: 'inherit',
                lineHeight: 1.6,
              }}
            />

            {/* Preview imagen */}
            {imagePreview && (
              <Box style={{ position: 'relative', display: 'inline-block', marginTop: 8 }}>
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ maxHeight: 200, borderRadius: 8, maxWidth: '100%' }}
                />
                <IconButton
                  size="1"
                  variant="solid"
                  color="red"
                  onClick={() => setImagePreview(null)}
                  style={{ position: 'absolute', top: 4, right: 4 }}
                >
                  <Icons.close />
                </IconButton>
              </Box>
            )}
          </Box>
        </Flex>

        <Separator size="4" mt="3" mb="3" />

        {/* Acciones */}
        <Flex justify="between" align="center">
          <Flex gap="2">
            {/* Adjuntar imagen */}
            <label style={{ cursor: 'pointer' }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) setImagePreview(URL.createObjectURL(file))
                }}
              />
              <IconButton variant="soft" size="2" asChild>
                <span>
                  <Icons.imageIcon />
                </span>
              </IconButton>
            </label>
          </Flex>

          <Button
            size="2"
            disabled={!newPost.trim()}
            onClick={handleCreatePost}
          >
            <Icons.paperPlaneIcon /> Publicar
          </Button>
        </Flex>
      </Card>
    </Box>
  )
}
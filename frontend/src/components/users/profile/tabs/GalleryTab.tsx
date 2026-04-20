'use client'

import { useState } from 'react'
import { Box, Flex, Text, Dialog, IconButton } from '@radix-ui/themes'
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { MockGalleryItem } from '@/data/profile.mock'

export function GalleryTab({ gallery }: { gallery: MockGalleryItem[] }) {
  const [selected, setSelected] = useState<MockGalleryItem | null>(null)

  if (gallery.length === 0) {
    return (
      <Flex direction="column" align="center" justify="center" py="9" gap="2">
        <Text size="3" color="gray">Sin imágenes en la galería</Text>
        <Text size="2" color="gray">Las imágenes que compartas aparecerán aquí</Text>
      </Flex>
    )
  }

  return (
    <>
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
        }}
      >
        {gallery.map(item => (
          <Box
            key={item.id}
            onClick={() => setSelected(item)}
            style={{
              position: 'relative',
              aspectRatio: '1',
              borderRadius: 8,
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <img
              src={item.url}
              alt={item.caption ?? 'foto'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            {/* Overlay con caption */}
            {item.caption && (
              <Box
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  padding: '20px 8px 8px',
                }}
              >
                <Text size="1" style={{ color: 'white' }}>{item.caption}</Text>
              </Box>
            )}

            {/* Lupa hover */}
            <Flex
              align="center"
              justify="center"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}
            >
              <MagnifyingGlassIcon width={24} height={24} style={{ color: 'transparent' }} />
            </Flex>
          </Box>
        ))}
      </Box>

      {/* Modal imagen grande */}
      <Dialog.Root open={selected !== null} onOpenChange={v => !v && setSelected(null)}>
        <Dialog.Content style={{ maxWidth: 700, padding: 0, overflow: 'hidden' }}>
          <Box style={{ position: 'relative' }}>
            <img
              src={selected?.url}
              alt={selected?.caption ?? 'foto'}
              style={{ width: '100%', display: 'block', maxHeight: '80vh', objectFit: 'contain' }}
            />
            <IconButton
              variant="solid"
              size="2"
              onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.5)', color: 'white' }}
            >
              <Cross2Icon />
            </IconButton>
            {selected?.caption && (
              <Box p="3" style={{ borderTop: '1px solid var(--gray-4)' }}>
                <Text size="2" color="gray">{selected.caption}</Text>
              </Box>
            )}
          </Box>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
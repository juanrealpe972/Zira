'use client'

import { Flex, Text, Box, Heading, Avatar } from '@radix-ui/themes'
import { Cross1Icon, BellIcon } from '@radix-ui/react-icons'

type Props = {
  open: boolean
  onClose: () => void
}

const notifications = [
  { id: 1, title: 'Nuevo usuario registrado', description: 'Juan Realpe se unió al equipo', time: 'Hace 5 min' },
  { id: 2, title: 'Orden completada', description: 'La orden #1234 fue procesada', time: 'Hace 20 min' },
  { id: 3, title: 'Reporte listo', description: 'El reporte mensual está disponible', time: 'Hace 1 hora' },
]

export default function NotificationsPanel({ open, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <Box
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 40,
            transition: 'opacity 0.2s',
          }}
        />
      )}

      {/* Panel */}
      <Box
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 360,
          background: 'var(--color-background)',
          borderLeft: '1px solid var(--gray-4)',
          zIndex: 50,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Flex align="center" justify="between" p="4" style={{ borderBottom: '1px solid var(--gray-4)' }}>
          <Flex align="center" gap="2">
            <BellIcon />
            <Heading size="4">Notificaciones</Heading>
          </Flex>
          <Box onClick={onClose} style={{ cursor: 'pointer' }}>
            <Cross1Icon />
          </Box>
        </Flex>

        {/* Lista */}
        <Flex direction="column" style={{ flex: 1, overflowY: 'auto' }}>
          {notifications.map(({ id, title, description, time }) => (
            <Flex
              key={id}
              gap="3"
              p="4"
              style={{ borderBottom: '1px solid var(--gray-3)', cursor: 'pointer' }}
            >
              <Avatar size="2" fallback={title[0]} radius="full" />
              <Box style={{ flex: 1 }}>
                <Text size="2" weight="medium">{title}</Text>
                <Text size="1" color="gray" style={{ display: 'block' }}>{description}</Text>
                <Text size="1" color="gray">{time}</Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    </>
  )
}
import { Box, Flex, Avatar, IconButton } from '@radix-ui/themes'
import { Pencil1Icon, Share2Icon } from '@radix-ui/react-icons'
import { User } from '@/services/users.service'

export function ProfileHeader({ user }: { user: User }) {
  return (
    <Box style={{ position: 'relative' }}>

      {/* Banner */}
      <Box
        style={{
          height: 200,
          background: 'linear-gradient(135deg, var(--accent-9) 0%, var(--accent-11) 100%)',
          borderRadius: '0 0 16px 16px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decoración */}
        <Box
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            bottom: -20,
            right: 80,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />

        {/* Acciones */}
        <Flex
          gap="2"
          style={{ position: 'absolute', top: 16, right: 16 }}
        >
          <IconButton variant="soft" size="2" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            <Share2Icon />
          </IconButton>
          <IconButton variant="soft" size="2" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            <Pencil1Icon />
          </IconButton>
        </Flex>
      </Box>

      {/* Avatar + info básica */}
      <Box px="6" style={{ position: 'relative' }}>
        <Flex justify="between" align="end" style={{ marginTop: -40 }}>
          <Box style={{ position: 'relative' }}>
            <Avatar
              size="7"
              src={user.photo ?? undefined}
              fallback={user.name?.[0]?.toUpperCase() ?? 'U'}
              radius="full"
              style={{
                border: '4px solid var(--color-background)',
                background: 'var(--accent-3)',
              }}
            />
            {/* Indicador activo */}
            <Box
              style={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: user.is_active ? 'var(--green-9)' : 'var(--gray-7)',
                border: '2px solid var(--color-background)',
              }}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
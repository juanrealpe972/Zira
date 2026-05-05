'use client'

import { Box, Flex, Heading, Text, Button } from '@radix-ui/themes'

type Props = {
  title: string
  breadcrumb: string[]
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export function PageHeader({ title, breadcrumb, actionLabel, onAction, icon }: Props) {
  return (
    <Flex justify="between" align="center" mb="2">
      <Box>
        <Heading size="6">{title}</Heading>

        <Flex align="center" gap="1" mt="1">
          {breadcrumb.map((item, i) => (
            <Flex key={i} align="center" gap="1">
              <Text size="1" color={i === breadcrumb.length - 1 ? 'gray' : 'gray'}>
                {item}
              </Text>
              {i < breadcrumb.length - 1 && <Text size="1">•</Text>}
            </Flex>
          ))}
        </Flex>
      </Box>

      {actionLabel && (
        <Button size="2" onClick={onAction}>
          {icon} {actionLabel}
        </Button>
      )}
    </Flex>
  )
}
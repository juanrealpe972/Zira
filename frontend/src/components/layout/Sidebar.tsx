'use client'

import { useState } from 'react'
import { Flex, Text, Box, Badge, ScrollArea } from '@radix-ui/themes'
import { HamburgerMenuIcon, ChevronRightIcon, PersonIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import NavLink from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation } from '@/data/navigation'

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const [openGroups, setOpenGroups] = useState<string[]>([])
  const pathname = usePathname()

  function toggleGroup(label: string) {
    setOpenGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    )
  }

  return (
    <Flex
      direction="column"
      style={{
        width: expanded ? 260 : 80,
        minHeight: '100vh',
        borderRight: '1px solid var(--gray-4)',
        background: 'var(--color-background)',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
      }}
    >
      <Flex
        align="center"
        justify={expanded ? 'between' : 'center'}
        px={expanded ? '4' : '2'}
        py="4"
        style={{ flexShrink: 0 }}
      >
        <Flex align="center" gap="2">
          <Box style={{ flexShrink: 0, fontSize: 20 }}>🚀</Box>
        </Flex>
        <Box
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--gray-11)' }}
        >
          <HamburgerMenuIcon width={16} height={16} />
        </Box>
      </Flex>

      <ScrollArea style={{ flex: 1 }}>
        <Flex direction="column" py="3" gap="1">
          {navigation.map(({ group, items }) => (
            <Box key={group} mb="2">

              {expanded && (
                <Text
                  size="1"
                  weight="bold"
                  color="gray"
                  style={{ padding: '4px 16px', textTransform: 'uppercase', letterSpacing: 1, display: 'block' }}
                >
                  {group}
                </Text>
              )}

              {items.map((item) => {
                const isActive = pathname === item.href
                const hasChildren = item.children !== undefined
                const isOpen = openGroups.includes(item.label)
                const Icon = item.icon

                const itemContent = (
                  <Flex
                    direction={expanded ? 'row' : 'column'}
                    align="center"
                    justify={expanded ? 'between' : 'center'}
                    gap={expanded ? '0' : '1'}
                    px={expanded ? '3' : '1'}
                    py={expanded ? '2' : '2'}
                    mx="2"
                    style={{
                      borderRadius: 8,
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                      background: isActive ? 'var(--accent-3)' : 'transparent',
                      color: item.disabled
                        ? 'var(--gray-7)'
                        : isActive
                          ? 'var(--accent-9)'
                          : 'var(--gray-11)',
                      opacity: item.disabled ? 0.5 : 1,
                      transition: 'background 0.15s ease',
                      minHeight: expanded ? 'auto' : 52,
                    }}
                    onClick={() => hasChildren && toggleGroup(item.label)}
                  >
                    <Flex
                      direction={expanded ? 'row' : 'column'}
                      align="center"
                      gap={expanded ? '2' : '1'}
                      style={{ overflow: 'hidden', flex: expanded ? 1 : 'none' }}
                    >
                      {Icon && (
                        <Box style={{ flexShrink: 0 }}>
                          <Icon />
                        </Box>
                      )}
                      <Text
                        size={expanded ? '2' : '1'}
                        weight={isActive ? 'medium' : 'regular'}
                        style={{
                          whiteSpace: expanded ? 'nowrap' : 'normal',
                          overflow: 'hidden',
                          textOverflow: expanded ? 'ellipsis' : 'unset',
                          textAlign: expanded ? 'left' : 'center',
                          lineHeight: expanded ? 'inherit' : '1.2',
                          maxWidth: expanded ? 'none' : 64,
                        }}
                      >
                        {item.label}
                      </Text>
                    </Flex>

                    {expanded && (
                      <Flex align="center" gap="1">
                        {item.badge && (
                          <Badge size="1" color="blue" variant="soft">{item.badge}</Badge>
                        )}
                        {item.tag && (
                          <Badge size="1" color={item.tag === 'NEW' ? 'green' : 'orange'} variant="soft">
                            {item.tag}
                          </Badge>
                        )}
                        {item.external && <ExternalLinkIcon width={12} />}
                        {hasChildren && (
                          <ChevronRightIcon
                            style={{
                              transition: 'transform 0.2s',
                              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                            }}
                          />
                        )}
                      </Flex>
                    )}
                  </Flex>
                )

                const wrapped = item.href && !hasChildren ? (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    style={{ textDecoration: 'none' }}
                  >
                    {itemContent}
                  </NavLink>
                ) : (
                  <Box key={item.label}>{itemContent}</Box>
                )

                return wrapped
              })}
            </Box>
          ))}
        </Flex>
      </ScrollArea>

      <Flex
        align="center"
        justify={expanded ? 'start' : 'center'}
        gap="2"
        p="3"
        style={{ flexShrink: 0 }}
      >
        <Box style={{ flexShrink: 0 }}>
          <PersonIcon width={20} height={20} />
        </Box>
        {expanded && (
          <Box style={{ overflow: 'hidden' }}>
            <Text size="2" weight="medium" style={{ whiteSpace: 'nowrap' }}>Juan Realpe</Text>
            <Text size="1" color="gray" style={{ whiteSpace: 'nowrap', display: 'block' }}>demo@zira.cc</Text>
          </Box>
        )}
      </Flex>
    </Flex>
  )
}
'use client'

import { useState, useRef } from 'react'
import { Flex, Text, Box, Badge, ScrollArea, Avatar } from '@radix-ui/themes'
import NavLink from 'next/link'
import { Icons } from '@/components/ui/icons/icons'
import { usePathname } from 'next/navigation'
import { navigation } from '@/data/navigation'
import { ZiraLogo } from '@/components/ui/ZiraLogo'
import { User } from '@/types'

type Props = {
  user: User | null
}

export default function Sidebar({ user }: Props) {
  const [expanded, setExpanded] = useState(true)
  const [openGroups, setOpenGroups] = useState<string[]>([])
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hoveredChild, setHoveredChild] = useState<string | null>(null)
  const [popover, setPopover] = useState<{ itemId: string; top: number } | null>(null)
  const pathname = usePathname()
  const popoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  function toggleGroup(label: string) {
    setOpenGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    )
  }

  function showPopover(itemId: string, e: React.MouseEvent) {
    if (popoverTimeout.current) clearTimeout(popoverTimeout.current)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setPopover({ itemId, top: rect.top })
  }

  function hidePopover() {
    popoverTimeout.current = setTimeout(() => setPopover(null), 120)
  }

  function keepPopover() {
    if (popoverTimeout.current) clearTimeout(popoverTimeout.current)
  }

  return (
    <Flex
      direction="column"
      style={{
        width: expanded ? 230 : 78,
        height: '100vh',
        borderRight: '1px solid var(--gray-4)',
        background: 'var(--color-background)',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      {/* Logo + toggle */}
      <Flex
        align="center"
        justify={expanded ? 'between' : 'center'}
        px={expanded ? '4' : '2'}
        py="4"
        style={{ flexShrink: 0, minHeight: 60 }}
      >
        <NavLink href="/" style={{ textDecoration: 'none' }}>
          <ZiraLogo size={28} />
        </NavLink>
        {expanded && (
          <Box
            onClick={() => setExpanded(!expanded)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--gray-11)' }}
          >
            <Icons.chevronLeft />
          </Box>
        )}
        {!expanded && (
          <Box
            onClick={() => setExpanded(!expanded)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--gray-11)' }}
          >
            <Icons.chevronRight />
          </Box>
        )}
      </Flex>

      {/* Nav */}
      <ScrollArea style={{ flex: 1 }}>
        <Flex direction="column" py="3" gap="1">
          {navigation.map(({ group, items }) => (
            <Box key={group} mb="1">

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
                const itemId = `${group}__${item.label}`
                const isActive = pathname === item.href
                const hasChildren = item.children && item.children.length > 0
                const isOpen = openGroups.includes(item.label)
                const isHovered = hoveredItem === itemId
                const Icon = item.icon

                const getBackground = () => {
                  if (isActive) return 'var(--accent-3)'
                  if (isHovered && !isActive) return 'var(--gray-3)'
                  return 'transparent'
                }

                const itemContent = (
                  <Flex
                    direction={expanded ? 'row' : 'column'}
                    align="center"
                    my="1"
                    justify={expanded ? 'between' : 'center'}
                    gap={expanded ? '0' : '1'}
                    px={expanded ? '3' : '1'}
                    py={expanded ? '2' : '1'}
                    mx="2"
                    onMouseEnter={(e) => {
                      setHoveredItem(itemId)
                      if (!expanded && hasChildren) showPopover(itemId, e)
                    }}
                    onMouseLeave={() => {
                      setHoveredItem(null)
                      if (!expanded && hasChildren) hidePopover()
                    }}
                    style={{
                      borderRadius: 8,
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                      background: getBackground(),
                      color: item.disabled
                        ? 'var(--gray-7)'
                        : isActive
                          ? 'var(--accent-9)'
                          : isHovered
                            ? 'var(--gray-12)'
                            : 'var(--gray-11)',
                      opacity: item.disabled ? 0.5 : 1,
                      transition: 'background 0.15s ease, color 0.15s ease',
                      minHeight: expanded ? 'auto' : 52,
                      position: 'relative',
                    }}
                    onClick={() => expanded && hasChildren && toggleGroup(item.label)}
                  >
                    <Flex
                      direction={expanded ? 'row' : 'column'}
                      align="center"
                      gap={expanded ? '2' : '1'}
                      style={{ overflow: 'hidden', flex: expanded ? 1 : 'none' }}
                    >
                      {Icon && (
                        <Box style={{
                          flexShrink: 0,
                          fontSize: expanded ? 'inherit' : 16,
                          transition: 'transform 0.15s ease',
                          transform: isHovered && !isActive ? 'scale(1.1)' : 'scale(1)',
                        }}>
                          <Icon />
                        </Box>
                      )}
                      <Text
                        size={expanded ? '2' : '1'}
                        weight={isActive || isHovered ? 'medium' : 'regular'}
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          textAlign: expanded ? 'left' : 'center',
                          lineHeight: expanded ? 'inherit' : '1.2',
                          maxWidth: expanded ? 180 : 52,
                          display: 'block',
                          fontSize: expanded ? 12 : 9,
                        }}
                      >
                        {item.label}
                      </Text>
                    </Flex>

                    {expanded && (
                      <Flex align="center" gap="1">
                        {item.badge && <Badge size="1" color="blue" variant="soft">{item.badge}</Badge>}
                        {item.tag && (
                          <Badge size="1" color={item.tag === 'NEW' ? 'green' : 'orange'} variant="soft">
                            {item.tag}
                          </Badge>
                        )}
                        {item.external && <Icons.chevronDown />}

                        {hasChildren && (
                          isOpen ? <Icons.chevronDown /> : <Icons.chevronRight />
                        )}
                      </Flex>
                    )}

                    {/* Flecha cuando colapsado y tiene hijos */}
                    {!expanded && hasChildren && (
                      <Box style={{
                        position: 'absolute',
                        right: 2,
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}>
                        {isOpen
                          ? <Icons.chevronDown width={10} />
                          : <Icons.chevronRight width={10} />
                        }
                      </Box>
                    )}
                  </Flex>
                )

                return (
                  <Box key={itemId} style={{ position: 'relative' }}>

                    {/* Item principal */}
                    {item.href && !hasChildren ? (
                      <NavLink href={item.href} target={item.external ? '_blank' : undefined} style={{ textDecoration: 'none' }}>
                        {itemContent}
                      </NavLink>
                    ) : (
                      <Box>{itemContent}</Box>
                    )}

                    {/* Sub-items expandido */}
                    {expanded && hasChildren && (
                      <Box style={{
                        overflow: 'hidden',
                        maxHeight: isOpen ? `${item.children!.length * 34}px` : '0px',
                        transition: 'max-height 0.3s ease',
                      }}>
                        {item.children!.map((child) => {
                          const childId = `${group}__${item.label}__${child.label}`
                          const isChildActive = pathname === child.href
                          const isChildHovered = hoveredChild === childId

                          return (
                            <NavLink key={childId} href={child.href ?? '#'} style={{ textDecoration: 'none' }}>
                              <Flex
                                align="center"
                                gap="2"
                                onMouseEnter={() => setHoveredChild(childId)}
                                onMouseLeave={() => setHoveredChild(null)}
                                style={{
                                  paddingLeft: 40,
                                  paddingRight: 12,
                                  paddingTop: 6,
                                  paddingBottom: 6,
                                  marginLeft: 8,
                                  marginRight: 8,
                                  marginBottom: 2,
                                  borderRadius: 6,
                                  cursor: 'pointer',
                                  background: isChildActive
                                    ? 'var(--accent-3)'
                                    : isChildHovered
                                      ? 'var(--gray-3)'
                                      : 'transparent',
                                  color: isChildActive
                                    ? 'var(--accent-9)'
                                    : isChildHovered
                                      ? 'var(--gray-12)'
                                      : 'var(--gray-10)',
                                  transition: 'background 0.15s ease, color 0.15s ease',
                                }}
                              >
                                <Box style={{
                                  width: isChildActive || isChildHovered ? 6 : 4,
                                  height: isChildActive || isChildHovered ? 6 : 4,
                                  borderRadius: '50%',
                                  background: isChildActive
                                    ? 'var(--accent-9)'
                                    : isChildHovered
                                      ? 'var(--gray-11)'
                                      : 'var(--gray-7)',
                                  flexShrink: 0,
                                  transition: 'all 0.15s ease',
                                }} />
                                <Text
                                  size="1"
                                  weight={isChildActive || isChildHovered ? 'medium' : 'regular'}
                                  style={{ fontSize: 11 }}
                                >
                                  {child.label}
                                </Text>
                              </Flex>
                            </NavLink>
                          )
                        })}
                      </Box>
                    )}
                  </Box>
                )
              })}
            </Box>
          ))}
        </Flex>
      </ScrollArea>

      {/* Footer */}
      <Flex
        align="center"
        justify={expanded ? 'start' : 'center'}
        gap="2"
        p="3"
        style={{ flexShrink: 0, borderTop: '1px solid var(--gray-4)' }}
      >
        <Box style={{ flexShrink: 0 }}>
          <Avatar
            size="1"
            src={user?.photo ?? undefined}
            fallback={user?.name?.[0]?.toUpperCase() ?? 'U'}
            radius="full"
            style={{ background: 'var(--accent-3)' }}
          />

        </Box>
        {expanded && (
          <Box style={{ overflow: 'hidden' }}>
            <Text size="2" weight="medium" style={{ whiteSpace: 'nowrap' }}>
              {user?.name || 'Name User'}
            </Text>
            <Text size="1" color="gray" style={{ whiteSpace: 'nowrap', display: 'block' }}>
              {user?.email || 'demo@zira.cc'}
            </Text>
          </Box>
        )}
      </Flex>

      {/* ← Popover flotante para sidebar colapsado */}
      {!expanded && popover && (() => {
        const allItems = navigation.flatMap(g => g.items)
        const activeItem = allItems.find(i => {
          const id = navigation.find(g => g.items.includes(i))?.group + '__' + i.label
          return id === popover.itemId
        })

        if (!activeItem?.children) return null

        return (
          <Box
            onMouseEnter={keepPopover}
            onMouseLeave={hidePopover}
            style={{
              position: 'fixed',
              left: 76,
              top: popover.top - 8,
              zIndex: 999,
              background: 'var(--color-background)',
              border: '1px solid var(--gray-4)',
              borderRadius: 12,
              padding: '8px 0',
              minWidth: 160,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
          >
            {/* Título del grupo */}
            <Text
              size="1"
              weight="bold"
              color="gray"
              style={{ padding: '4px 16px 8px', display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}
            >
              {activeItem.label}
            </Text>

            {activeItem.children.map((child) => {
              const isChildActive = pathname === child.href
              const childId = `popover__${child.label}`
              const isChildHovered = hoveredChild === childId

              return (
                <NavLink key={child.label} href={child.href ?? '#'} style={{ textDecoration: 'none' }}>
                  <Flex
                    align="center"
                    gap="2"
                    onMouseEnter={() => setHoveredChild(childId)}
                    onMouseLeave={() => setHoveredChild(null)}
                    style={{
                      padding: '8px 16px',
                      cursor: 'pointer',
                      background: isChildActive
                        ? 'var(--accent-3)'
                        : isChildHovered
                          ? 'var(--gray-3)'
                          : 'transparent',
                      color: isChildActive
                        ? 'var(--accent-9)'
                        : isChildHovered
                          ? 'var(--gray-12)'
                          : 'var(--gray-11)',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <Text
                      size="2"
                      weight={isChildActive ? 'medium' : 'regular'}
                    >
                      {child.label}
                    </Text>
                  </Flex>
                </NavLink>
              )
            })}
          </Box>
        )
      })()}
    </Flex>
  )
}
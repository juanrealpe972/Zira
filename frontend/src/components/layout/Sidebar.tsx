'use client'

import { useState } from 'react'
import { Flex, Text, IconButton, Tooltip, Box } from '@radix-ui/themes'
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'
import NavLink from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/data/navigation'

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const pathname = usePathname()

  return (
    <Flex
      direction="column"
      justify="between"
      py="4"
      style={{
        width: expanded ? 220 : 60,
        minHeight: '100%',
        borderRight: '1px solid var(--gray-4)',
        background: 'var(--color-background)',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
      }}
    >
      {/* Top — toggle button */}
      <Flex direction="column" gap="1">
        <Flex
          px="3"
          mb="3"
          justify={expanded ? 'end' : 'center'}
        >
          <IconButton
            variant="ghost"
            size="2"
            onClick={() => setExpanded(!expanded)}
            style={{ cursor: 'pointer' }}
          >
            {expanded ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </IconButton>
        </Flex>

        {/* Nav items */}
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href

          const item = (
            <NavLink
              key={href}
              href={href}
              style={{ textDecoration: 'none' }}
            >
              <Flex
                align="center"
                gap="3"
                px="3"
                py="2"
                mx="2"
                style={{
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: isActive ? 'var(--accent-3)' : 'transparent',
                  color: isActive ? 'var(--accent-9)' : 'var(--gray-11)',
                  transition: 'background 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Box style={{ flexShrink: 0 }}>
                  <Icon />
                </Box>
                {expanded && (
                  <Text size="2" weight={isActive ? 'bold' : 'regular'}>
                    {label}
                  </Text>
                )}
              </Flex>
            </NavLink>
          )

          // Cuando está colapsado muestra tooltip con el nombre
          return expanded ? item : (
            <Tooltip key={href} content={label} side="right">
              {item}
            </Tooltip>
          )
        })}
      </Flex>
    </Flex>
  )
}
'use client'

import { Flex, Box } from '@radix-ui/themes'
import DashboardHeader from '@/components/layout/DashboardHeader'
import Footer from '@/components/layout/Footer'
import Sidebar from '@/components/layout/Sidebar'
import { getUserById } from '@/services'
import { User } from '@/types'
import { useEffect, useState } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    function getTokenUserId(): number | null {
      if (typeof document === 'undefined') return null
      const match = document.cookie.match(/zira_access=([^;]+)/)
      if (!match) return null
      try {
        const payload = JSON.parse(atob(match[1].split('.')[1]))
        return payload.user_id
      } catch { return null }
    }

    const userId = getTokenUserId()
    if (userId) {
      getUserById(userId).then(setCurrentUser).catch(() => null)
    }
  }, [])

  return (
    <Flex style={{ minHeight: '100vh' }}>

      <Sidebar user={currentUser} />

      <Flex direction="column" style={{ flex: 1, overflow: 'hidden' }}>
        <DashboardHeader />
        <Box style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </Box>
        <Footer />
      </Flex>

    </Flex>
  )
}
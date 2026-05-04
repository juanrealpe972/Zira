'use client'

import { Flex } from '@radix-ui/themes'
import { Header, Footer } from '@/components/layout'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" style={{ minHeight: '100vh' }}>
      <div id="app-root" style={{ fontFamily: 'var(--app-font)' }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </Flex>
  )
}
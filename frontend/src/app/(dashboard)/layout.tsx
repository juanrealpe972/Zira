import { Flex, Box } from '@radix-ui/themes'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" style={{ minHeight: '100vh' }}>
      <Header />

      <Flex style={{ flex: 1 }}>
        <Sidebar />
        <Box style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Flex>

      <Footer />
    </Flex>
  )
} 
import { Flex, Box } from '@radix-ui/themes'
import DashboardHeader from '@/components/layout/DashboardHeader'
import Footer from '@/components/layout/Footer'
import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex style={{ minHeight: '100vh' }}>

      <Sidebar />

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
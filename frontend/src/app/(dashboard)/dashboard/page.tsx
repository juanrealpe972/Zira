import { Grid, Heading, Text, Card, Flex, Box } from '@radix-ui/themes'
import { PersonIcon, BarChartIcon, FileTextIcon, RocketIcon } from '@radix-ui/react-icons'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const stats = [
  { label: 'Usuarios', value: '1,240', icon: PersonIcon, color: 'var(--blue-9)' },
  { label: 'Reportes', value: '38', icon: BarChartIcon, color: 'var(--green-9)' },
  { label: 'Documentos', value: '512', icon: FileTextIcon, color: 'var(--amber-9)' },
  { label: 'Proyectos', value: '7', icon: RocketIcon, color: 'var(--purple-9)' },
]

export default function DashboardPage() {
  return (
    <Box p="6">
      <Heading size="6" mb="1">Dashboard</Heading>
      <Text color="gray" size="2" mb="6">Bienvenido de nuevo</Text>

      <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} size="2">
            <Flex justify="between" align="center">
              <Box>
                <Text size="2" color="gray">{label}</Text>
                <Heading size="6" mt="1">{value}</Heading>
              </Box>
              <Box
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: 'var(--gray-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color,
                }}
              >
                <Icon width={20} height={20} />
              </Box>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Box>
  )
}
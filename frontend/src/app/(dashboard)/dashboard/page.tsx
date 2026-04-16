'use client'

import { Grid, Heading, Text, Card, Flex, Box, Badge, Button } from '@radix-ui/themes'
import { PersonIcon, BarChartIcon, FileTextIcon, RocketIcon, ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useState } from 'react'
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner'

const stats = [
  { label: 'Total usuarios activos', value: '18,765', change: '+2.6%', up: true, icon: PersonIcon, color: 'var(--green-9)' },
  { label: 'Total instalados', value: '4,876', change: '+0.2%', up: true, icon: BarChartIcon, color: 'var(--blue-9)' },
  { label: 'Total descargas', value: '678', change: '-0.1%', up: false, icon: FileTextIcon, color: 'var(--red-9)' },
  { label: 'Proyectos activos', value: '7', change: '+1.0%', up: true, icon: RocketIcon, color: 'var(--purple-9)' },
]

const barData = [
  { month: 'Ene', Asia: 12, Europa: 8, Americas: 5 },
  { month: 'Feb', Asia: 18, Europa: 22, Americas: 10 },
  { month: 'Mar', Asia: 10, Europa: 15, Americas: 8 },
  { month: 'Abr', Asia: 5, Europa: 12, Americas: 3 },
  { month: 'May', Asia: 20, Europa: 30, Americas: 12 },
  { month: 'Jun', Asia: 8, Europa: 10, Americas: 4 },
  { month: 'Jul', Asia: 30, Europa: 25, Americas: 15 },
  { month: 'Ago', Asia: 28, Europa: 20, Americas: 18 },
  { month: 'Sep', Asia: 22, Europa: 18, Americas: 12 },
  { month: 'Oct', Asia: 35, Europa: 22, Americas: 10 },
  { month: 'Nov', Asia: 12, Europa: 8, Americas: 6 },
  { month: 'Dic', Asia: 20, Europa: 15, Americas: 8 },
]

const pieData = [
  { name: 'Mac', value: 30, color: '#a3e635' },
  { name: 'Windows', value: 25, color: '#4ade80' },
  { name: 'iOS', value: 20, color: '#14b8a6' },
  { name: 'Android', value: 25, color: '#0f766e' },
]

const invoices = [
  { id: 'INV-1990', category: 'Android', price: '$83.74', status: 'Pagado', statusColor: 'green' },
  { id: 'INV-1991', category: 'Mac', price: '$97.14', status: 'Vencido', statusColor: 'red' },
  { id: 'INV-1992', category: 'Windows', price: '$68.71', status: 'En progreso', statusColor: 'orange' },
  { id: 'INV-1993', category: 'Android', price: '$85.21', status: 'Pagado', statusColor: 'green' },
  { id: 'INV-1994', category: 'Mac', price: '$52.17', status: 'Pagado', statusColor: 'green' },
]

const total = pieData.reduce((acc, d) => acc + d.value, 0)

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const { name, value, color } = payload[0].payload
  const pct = ((value / total) * 100).toFixed(1)
  return (
    <Box
      style={{
        background: 'var(--color-background)',
        border: '1px solid var(--gray-4)',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Flex align="center" gap="2">
        <Box style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
        <Text size="2" weight="bold">{name}</Text>
      </Flex>
      <Text size="1" color="gray">{value}k descargas ({pct}%)</Text>
    </Box>
  )
}

export default function DashboardPage() {
  const [hidden, setHidden] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  function toggleSeries(name: string) {
    setHidden(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  const visibleData = pieData.map(d =>
    hidden.includes(d.name) ? { ...d, value: 0 } : d
  )

  const visibleTotal = visibleData.reduce((acc, d) => acc + d.value, 0)

  return (
    <Box p="5" style={{ maxWidth: '100%' }}>
      <WelcomeBanner />
      <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4" mb="5">
        {stats.map(({ label, value, change, up, icon: Icon, color }) => (
          <Card key={label} size="2">
            <Flex justify="between" align="start">
              <Box>
                <Text size="1" color="gray">{label}</Text>
                <Heading size="6" mt="1">{value}</Heading>
                <Flex align="center" gap="1" mt="1">
                  {up
                    ? <ArrowUpIcon style={{ color: 'var(--green-9)' }} />
                    : <ArrowDownIcon style={{ color: 'var(--red-9)' }} />
                  }
                  <Text size="1" style={{ color: up ? 'var(--green-9)' : 'var(--red-9)' }}>
                    {change} últimos 7 días
                  </Text>
                </Flex>
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

      <Grid columns={{ initial: '1', md: '2' }} gap="4" mb="5">

        <Card size="2">
          <Flex justify="between" align="start" mb="2">
            <Box>
              <Heading size="3">Descargas actuales</Heading>
              <Text size="1" color="gray">Por sistema operativo</Text>
            </Box>
            <Box
              style={{
                background: 'var(--accent-3)',
                borderRadius: 6,
                padding: '2px 8px',
              }}
            >
              <Text size="1" color="gray">Últimos 7 días</Text>
            </Box>
          </Flex>


          <Flex gap="4" align="center" mt="2">
            <Box style={{ position: 'relative', flexShrink: 0, width: 200, height: 200 }}>
              <PieChart width={200} height={200}>
                <Pie
                  data={visibleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  strokeWidth={0}
                  paddingAngle={0}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {visibleData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                      style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ zIndex: 999 }}
                />
              </PieChart>

              <Box
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <Text size="1" color="gray" style={{ display: 'block' }}>Total</Text>
                <Text size="4" weight="bold" style={{ display: 'block' }}>
                  {activeIndex !== null
                    ? `${visibleData[activeIndex].value}k`
                    : `${visibleTotal}k`
                  }
                </Text>
                {activeIndex !== null && (
                  <Text size="1" color="gray">
                    {((visibleData[activeIndex].value / visibleTotal) * 100).toFixed(1)}%
                  </Text>
                )}
              </Box>
            </Box>

            <Flex direction="column" gap="2" style={{ flex: 1 }}>
              {pieData.map(({ name, value, color }) => {
                const isHidden = hidden.includes(name)
                const pct = visibleTotal > 0
                  ? ((isHidden ? 0 : value) / (visibleTotal || 1) * 100).toFixed(1)
                  : '0.0'

                return (
                  <Flex
                    key={name}
                    align="center"
                    justify="between"
                    onClick={() => toggleSeries(name)}
                    style={{
                      cursor: 'pointer',
                      opacity: isHidden ? 0.4 : 1,
                      transition: 'opacity 0.2s',
                      padding: '4px 0',
                    }}
                  >
                    <Flex align="center" gap="2">
                      <Box
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: isHidden ? 'var(--gray-5)' : color,
                          transition: 'background 0.2s',
                          flexShrink: 0,
                        }}
                      />
                      <Text size="2" style={{ textDecoration: isHidden ? 'line-through' : 'none' }}>
                        {name}
                      </Text>
                    </Flex>
                    <Flex align="center" gap="3">
                      <Text size="2" weight="bold">{isHidden ? '—' : `${value}k`}</Text>
                      <Box style={{ width: 36, textAlign: 'right' }}>
                        <Text size="1" color="gray">{isHidden ? '0%' : `${pct}%`}</Text>
                      </Box>
                    </Flex>
                  </Flex>
                )
              })}
            </Flex>
          </Flex>
        </Card>

        <Card size="2">
          <Flex justify="between" align="center" mb="1">
            <Box>
              <Heading size="3">Área instalada</Heading>
              <Text size="1" color="gray">(+43%) que el año pasado</Text>
            </Box>
          </Flex>
          <Flex gap="4" mb="3" mt="2">
            {[
              { label: 'Asia', value: '1.23k', color: '#14b8a6' },
              { label: 'Europa', value: '6.79k', color: '#f59e0b' },
              { label: 'Américas', value: '1.01k', color: '#06b6d4' },
            ].map(({ label, value, color }) => (
              <Flex key={label} align="center" gap="1">
                <Box style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                <Text size="1" color="gray">{label}</Text>
                <Text size="1" weight="bold">{value}</Text>
              </Flex>
            ))}
          </Flex>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barSize={12}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="Asia" stackId="a" fill="#14b8a6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Europa" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Americas" stackId="a" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Card size="2">
        <Flex justify="between" align="center" mb="4">
          <Heading size="3">Nuevas facturas</Heading>
          <Button variant="ghost" size="1">Ver todas →</Button>
        </Flex>

        <Flex
          px="3"
          py="2"
          style={{ borderBottom: '1px solid var(--gray-4)', background: 'var(--gray-2)', borderRadius: 6 }}
        >
          <Text size="1" weight="bold" color="gray" style={{ width: '25%' }}>ID Factura</Text>
          <Text size="1" weight="bold" color="gray" style={{ width: '25%' }}>Categoría</Text>
          <Text size="1" weight="bold" color="gray" style={{ width: '25%' }}>Precio</Text>
          <Text size="1" weight="bold" color="gray" style={{ width: '25%' }}>Estado</Text>
        </Flex>

        {invoices.map((inv) => (
          <Flex
            key={inv.id}
            align="center"
            px="3"
            py="3"
            style={{ borderBottom: '1px solid var(--gray-3)' }}
          >
            <Text size="2" style={{ width: '25%' }}>{inv.id}</Text>
            <Text size="2" style={{ width: '25%' }}>{inv.category}</Text>
            <Text size="2" style={{ width: '25%' }}>{inv.price}</Text>
            <Box style={{ width: '25%' }}>
              <Badge
                size="1"
                color={inv.statusColor as 'green' | 'red' | 'orange'}
                variant="soft"
                radius="full"
              >
                {inv.status}
              </Badge>
            </Box>
          </Flex>
        ))}
      </Card>

    </Box>
  )
}
'use client'

import { useState } from 'react'
import { Card, Flex, Text, Box, Heading } from '@radix-ui/themes'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { BankAccount } from '@/services/bank-accounts.service'

type Props = { accounts: BankAccount[] }

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

// Mock histórico — luego conectas a tu API
function generateHistory(accounts: BankAccount[]) {
  return MONTHS.map((month, i) => {
    const base = accounts.reduce((acc, a) => acc + a.balance, 0)
    return {
      month,
      balance: Math.round(base * (0.7 + (i / MONTHS.length) * 0.5) + Math.random() * 50000),
      ingresos: Math.round(Math.random() * 500000 + 200000),
      gastos: Math.round(Math.random() * 300000 + 100000),
    }
  })
}

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP',
    notation: 'compact', minimumFractionDigits: 0,
  }).format(value)
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
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
      <Text size="1" weight="bold" style={{ display: 'block', marginBottom: 4 }}>{label}</Text>
      {payload.map((p: any) => (
        <Text key={p.name} size="1" style={{ color: p.color, display: 'block' }}>
          {p.name}: {formatCOP(p.value)}
        </Text>
      ))}
    </Box>
  )
}

export function BalanceChart({ accounts }: Props) {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const history = generateHistory(accounts)

  const pieData = accounts.map(a => ({
    name: a.bank_name,
    value: a.balance,
  }))

  const PIE_COLORS = ['var(--accent-9)', 'var(--green-9)', 'var(--blue-9)', 'var(--orange-9)', 'var(--purple-9)']

  return (
    <Flex direction="column" gap="4">

      {/* Área — evolución del balance */}
      <Card size="2">
        <Flex justify="between" align="center" mb="4">
          <Box>
            <Heading size="3">Evolución del balance</Heading>
            <Text size="1" color="gray">Histórico mensual de tus cuentas</Text>
          </Box>
          <Flex gap="2">
            {(['monthly', 'yearly'] as const).map(p => (
              <Box
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: period === p ? 'var(--accent-9)' : 'var(--gray-3)',
                  color: period === p ? 'white' : 'var(--gray-11)',
                  fontSize: 12,
                  fontWeight: period === p ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {p === 'monthly' ? 'Mensual' : 'Anual'}
              </Box>
            ))}
          </Flex>
        </Flex>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={history}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-9)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--accent-9)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-4)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatCOP} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              name="Balance"
              stroke="var(--accent-9)"
              strokeWidth={2.5}
              fill="url(#balanceGradient)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Barra — ingresos vs gastos + Pie distribución */}
      <Grid columns={{ initial: '1', md: '2' }} gap="4">

        {/* Barras */}
        <Card size="2">
          <Heading size="3" mb="1">Ingresos vs Gastos</Heading>
          <Text size="1" color="gray" style={{ display: 'block', marginBottom: 16 }}>
            Estadísticas de balance
          </Text>
          <Flex gap="4" mb="3">
            {[
              { label: 'Ingresos (+43%)', color: 'var(--green-9)', value: '$6,789' },
              { label: 'Ahorros (+3%)', color: 'var(--amber-9)', value: '$1,234' },
              { label: 'Gastos (+8%)', color: 'var(--blue-9)', value: '$1,012' },
            ].map(({ label, color, value }) => (
              <Flex key={label} align="center" gap="1">
                <Box style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                <Text size="1" color="gray">{label}</Text>
                <Text size="1" weight="bold">{value}</Text>
              </Flex>
            ))}
          </Flex>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={history.slice(-6)} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-4)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatCOP} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="ingresos" name="Ingresos" fill="var(--green-9)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="gastos" name="Gastos" fill="var(--blue-9)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie — distribución por banco */}
        <Card size="2">
          <Heading size="3" mb="1">Distribución por banco</Heading>
          <Text size="1" color="gray" style={{ display: 'block', marginBottom: 8 }}>
            Balance por entidad bancaria
          </Text>
          {accounts.length === 0 ? (
            <Flex align="center" justify="center" style={{ height: 180 }}>
              <Text color="gray" size="2">Sin cuentas registradas</Text>
            </Flex>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  strokeWidth={0}
                  paddingAngle={3}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCOP(Number(value))} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span style={{ fontSize: 12 }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

      </Grid>
    </Flex>
  )
}

function Grid({ columns, gap, children }: any) {
  return (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns: typeof columns === 'object' ? columns.md ?? '1fr' : columns,
        gap: gap === '4' ? 16 : 8,
      }}
    >
      {children}
    </Box>
  )
}
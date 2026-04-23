import { Grid, Card, Flex, Text, Box } from '@radix-ui/themes'
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons'
import { BankAccount } from '@/services/bank-accounts.service'
import { Icons } from '@/components/ui/icons/icons'

type Props = { accounts: BankAccount[] }

function formatCurrency(v: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0,
  }).format(v)
}

export function StatsCards({ accounts }: Props) {
  const totalBalance = accounts.reduce((acc, a) => acc + a.balance, 0)
  const ahorros = accounts.filter(a => a.account_type === 'ahorro')
  const corrientes = accounts.filter(a => a.account_type === 'corriente')
  const totalAhorros = ahorros.reduce((acc, a) => acc + a.balance, 0)
  const totalCorrientes = corrientes.reduce((acc, a) => acc + a.balance, 0)

  const stats = [
    {
      label: 'Balance total',
      value: formatCurrency(totalBalance),
      sub: `${accounts.length} cuenta${accounts.length !== 1 ? 's' : ''}`,
      icon: Icons.finance,
      color: 'var(--accent-9)',
      bg: 'var(--accent-3)',
    },
    {
      label: 'Cuentas de ahorro',
      value: formatCurrency(totalAhorros),
      sub: `${ahorros.length} cuenta${ahorros.length !== 1 ? 's' : ''}`,
      icon: Icons.bookmark,
      color: 'var(--green-9)',
      bg: 'var(--green-3)',
      trend: '+8.2%',
      up: true,
    },
    {
      label: 'Cuentas corrientes',
      value: formatCurrency(totalCorrientes),
      sub: `${corrientes.length} cuenta${corrientes.length !== 1 ? 's' : ''}`,
      icon: Icons.analytics,
      color: 'var(--blue-9)',
      bg: 'var(--blue-3)',
      trend: '-6.6%',
      up: false,
    },
  ]

  return (
    <Grid columns={{ initial: '1', sm: '3' }} gap="4" mb="5">
      {stats.map(({ label, value, sub, icon: Icon, color, bg, trend, up }) => (
        <Card key={label} size="2">
          <Flex justify="between" align="start">
            <Box>
              <Text size="1" color="gray" style={{ display: 'block', marginBottom: 4 }}>
                {label}
              </Text>
              <Text size="5" weight="bold" style={{ display: 'block', color }}>
                {value}
              </Text>
              <Flex align="center" gap="1" mt="1">
                {trend && (
                  <>
                    {up
                      ? <ArrowUpIcon style={{ color: 'var(--green-9)' }} />
                      : <ArrowDownIcon style={{ color: 'var(--red-9)' }} />
                    }
                    <Text size="1" style={{ color: up ? 'var(--green-9)' : 'var(--red-9)' }}>
                      {trend}
                    </Text>
                  </>
                )}
                <Text size="1" color="gray">{sub}</Text>
              </Flex>
            </Box>
            <Flex
              align="center"
              justify="center"
              style={{ width: 44, height: 44, borderRadius: 10, background: bg, flexShrink: 0 }}
            >
              <Icon width={22} height={22} style={{ color }} />
            </Flex>
          </Flex>
        </Card>
      ))}
    </Grid>
  )
}
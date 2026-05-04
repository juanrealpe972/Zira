import { Box, Flex, Text, Badge, IconButton, Card } from '@radix-ui/themes'
import { BankAccount } from '@/types'
import { Icons } from '@/components/ui/icons/icons'

type Props = {
  account: BankAccount
  onEdit: (account: BankAccount) => void
  onDelete: (id: number) => void
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

const BANK_COLORS: Record<string, string> = {
  bancolombia: '#FCD116',
  davivienda: '#E30613',
  nequi: '#7B2D8B',
  bbva: '#004B9C',
  default: 'var(--accent-9)',
}

function getBankColor(bankName: string): string {
  const key = bankName.toLowerCase()
  return Object.entries(BANK_COLORS).find(([k]) => key.includes(k))?.[1] ?? BANK_COLORS.default
}

export function AccountCard({ account, onEdit, onDelete }: Props) {
  const color = getBankColor(account.bank_name)
  const isAhorro = account.account_type === 'ahorro'

  return (
    <Card
      size="2"
      style={{
        background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`,
        border: `1px solid ${color}33`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoración de fondo */}
      <Box
        style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `${color}12`,
        }}
      />

      <Flex direction="column" gap="3" style={{ position: 'relative' }}>

        {/* Header */}
        <Flex justify="between" align="start">
          <Flex align="center" gap="2">
            <Flex
              align="center"
              justify="center"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `${color}22`,
                flexShrink: 0,
              }}
            >
              <Icons.finance width={20} height={20} style={{ color }} />
            </Flex>
            <Box>
              <Text size="2" weight="bold" style={{ display: 'block' }}>
                {account.bank_name}
              </Text>
              <Badge
                size="1"
                variant="soft"
                style={{
                  background: `${color}22`,
                  color,
                  textTransform: 'capitalize',
                }}
              >
                {account.account_type}
              </Badge>
            </Box>
          </Flex>

          <Flex gap="1">
            <IconButton
              variant="ghost"
              size="1"
              onClick={() => onEdit(account)}
            >
              <Icons.edit />
            </IconButton>
            <IconButton
              variant="ghost"
              size="1"
              color="red"
              onClick={() => onDelete(account.id)}
            >
              <Icons.delete />
            </IconButton>
          </Flex>
        </Flex>

        {/* Número de cuenta */}
        <Text size="1" color="gray" style={{ letterSpacing: 2, fontFamily: 'monospace' }}>
          •••• •••• {account.account_number.slice(-4)}
        </Text>

        {/* Balance */}
        <Box>
          <Text size="1" color="gray" style={{ display: 'block', marginBottom: 2 }}>
            Saldo disponible
          </Text>
          <Text size="6" weight="bold" style={{ color }}>
            {formatCurrency(account.balance)}
          </Text>
        </Box>

        {/* Footer */}
        <Flex align="center" gap="1">
          {isAhorro
            ? <Icons.bookmark width={12} style={{ color: 'var(--green-9)' }} />
            : <Icons.analytics width={12} style={{ color: 'var(--blue-9)' }} />
          }
          <Text size="1" color="gray">
            Cuenta de {account.account_type}
          </Text>
        </Flex>
      </Flex>
    </Card>
  )
}
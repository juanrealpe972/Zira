import { Box, Flex, Text, Badge, IconButton, Card } from '@radix-ui/themes'
import { Income } from '@/types'
import { Icons } from '@/components/ui/icons/icons'

type Props = {
  income: Income
  onEdit: (income: Income) => void
  onDelete: (id: number) => void
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

const CATEGORY_COLORS: Record<string, string> = {
  salario: '#10B981',
  freelance: '#3B82F6',
  inversiones: '#8B5CF6',
  bonus: '#F59E0B',
  otro: '#6B7280',
}

export function IncomeCard({ income, onEdit, onDelete }: Props) {
  const color = CATEGORY_COLORS[income.category] ?? 'var(--accent-9)'

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
              <Icons.analytics width={20} height={20} style={{ color }} />
            </Flex>
            <Box>
              <Text size="2" weight="bold" style={{ display: 'block' }}>
                {income.title}
              </Text>
              <Flex gap="1">
                <Badge
                  size="1"
                  variant="soft"
                  style={{
                    background: `${color}22`,
                    color,
                    textTransform: 'capitalize',
                  }}
                >
                  {income.category}
                </Badge>
              </Flex>
            </Box>
          </Flex>

          <Flex gap="1">
            <IconButton
              variant="ghost"
              size="1"
              onClick={() => onEdit(income)}
            >
              <Icons.edit />
            </IconButton>
            <IconButton
              variant="ghost"
              size="1"
              color="red"
              onClick={() => onDelete(income.id)}
            >
              <Icons.delete />
            </IconButton>
          </Flex>
        </Flex>

        {/* Monto */}
        <Box>
          <Text size="1" color="gray" style={{ display: 'block', marginBottom: 2 }}>
            Monto
          </Text>
          <Text size="5" weight="bold" style={{ color }}>
            {formatCurrency(income.amount)}
          </Text>
        </Box>

        {/* Información */}
        <Flex justify="between">
          <Box>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              Fuente
            </Text>
            <Text size="2">
              {income.source}
            </Text>
          </Box>
          <Box style={{ textAlign: 'right' }}>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              Fecha
            </Text>
            <Text size="2">
              {new Date(income.date).toLocaleDateString('es-CO')}
            </Text>
          </Box>
        </Flex>

        {/* Notas */}
        {income.notes && (
          <Text size="1" color="gray" style={{ fontStyle: 'italic' }}>
            {income.notes}
          </Text>
        )}

      </Flex>
    </Card>
  )
}
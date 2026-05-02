import { Box, Flex, Text, Badge, IconButton, Card } from '@radix-ui/themes'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Expense } from '@/types/expense.types'
import { Icons } from '@/components/ui/icons/icons'

type Props = {
  expense: Expense
  onEdit: (expense: Expense) => void
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
  alimentacion: '#F59E0B',
  transporte: '#3B82F6', 
  vivienda: '#8B5CF6',
  servicios: '#06B6D4',
  salud: '#EF4444',
  educacion: '#10B981',
  entretenimiento: '#EC4899',
  compras: '#F97316',
  ropa: '#A855F7',
  tecnologia: '#6366F1',
  viajes: '#14B8A6',
  mascotas: '#84CC16',
  suscripciones: '#0EA5E9',
  deudas: '#DC2626',
  ahorro: '#22C55E',
  inversion: '#059669',
  impuestos: '#7C2D12',
  seguros: '#2563EB',
  regalos: '#DB2777',
  otros: '#6B7280',
}

export function ExpenseCard({ expense, onEdit, onDelete }: Props) {
  const color = CATEGORY_COLORS[expense.category] ?? 'var(--accent-9)'

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
                {expense.title}
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
                  {expense.category}
                </Badge>
              </Flex>
            </Box>
          </Flex>

          <Flex gap="1">
            <IconButton
              variant="ghost"
              size="1"
              onClick={() => onEdit(expense)}
            >
              <Pencil1Icon />
            </IconButton>
            <IconButton
              variant="ghost"
              size="1"
              color="red"
              onClick={() => onDelete(expense.id)}
            >
              <TrashIcon />
            </IconButton>
          </Flex>
        </Flex>

        {/* Monto */}
        <Box>
          <Text size="1" color="gray" style={{ display: 'block', marginBottom: 2 }}>
            Monto
          </Text>
          <Text size="5" weight="bold" style={{ color }}>
            {formatCurrency(expense.amount)}
          </Text>
        </Box>

        {/* Información */}
        <Box style={{ textAlign: 'right' }}>
          <Text size="1" color="gray" style={{ display: 'block' }}>
            Fecha
          </Text>
          <Text size="2">
            {new Date(expense.date).toLocaleDateString('es-CO')}
          </Text>
        </Box>

        {/* Descripción */}
        {expense.description && (
          <Text size="1" color="gray" style={{ fontStyle: 'italic' }}>
            {expense.description}
          </Text>
        )}

      </Flex>
    </Card>
  )
}
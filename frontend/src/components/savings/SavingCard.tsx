import { Box, Flex, Text, Badge, IconButton, Card, Progress } from '@radix-ui/themes'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Saving } from '@/services/savings.service'
import { Icons } from '@/components/ui/icons/icons'

type Props = {
  saving: Saving
  onEdit: (saving: Saving) => void
  onDelete: (id: number) => void
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

const STATUS_COLORS: Record<string, string> = {
  activo: '#3B82F6',
  completado: '#10B981',
  cancelado: '#6B7280',
}

export function SavingCard({ saving, onEdit, onDelete }: Props) {
  const color = STATUS_COLORS[saving.status] ?? 'var(--accent-9)'
  const progress = saving.target_amount > 0 
    ? Math.min(100, (saving.current_amount / saving.target_amount) * 100) 
    : 0

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
              <Icons.money width={20} height={20} style={{ color }} />
            </Flex>
            <Box>
              <Text size="2" weight="bold" style={{ display: 'block' }}>
                {saving.goal_name}
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
                {saving.status}
              </Badge>
            </Box>
          </Flex>

          <Flex gap="1">
            <IconButton
              variant="ghost"
              size="1"
              onClick={() => onEdit(saving)}
            >
              <Pencil1Icon />
            </IconButton>
            <IconButton
              variant="ghost"
              size="1"
              color="red"
              onClick={() => onDelete(saving.id)}
            >
              <TrashIcon />
            </IconButton>
          </Flex>
        </Flex>

        {/* Progreso */}
        <Box>
          <Flex justify="between" mb="1">
            <Text size="1" color="gray">Progreso</Text>
            <Text size="1" weight="bold">{Math.round(progress)}%</Text>
          </Flex>
          <Progress value={progress} />
        </Box>

        {/* Montos */}
        <Flex justify="between" align="end">
          <Box>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              Ahorrado
            </Text>
            <Text size="4" weight="bold" style={{ color }}>
              {formatCurrency(saving.current_amount)}
            </Text>
          </Box>
          <Box style={{ textAlign: 'right' }}>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              Meta
            </Text>
            <Text size="3" weight="bold">
              {formatCurrency(saving.target_amount)}
            </Text>
          </Box>
        </Flex>

        {/* Tasa y fechas */}
        <Flex justify="between">
          <Box>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              Tasa de interés
            </Text>
            <Text size="2" weight="bold">
              {saving.interest_rate}%
            </Text>
          </Box>
          {saving.target_date && (
            <Box style={{ textAlign: 'right' }}>
              <Text size="1" color="gray" style={{ display: 'block' }}>
                Fecha meta
              </Text>
              <Text size="2">
                {new Date(saving.target_date).toLocaleDateString('es-CO')}
              </Text>
            </Box>
          )}
        </Flex>

      </Flex>
    </Card>
  )
}
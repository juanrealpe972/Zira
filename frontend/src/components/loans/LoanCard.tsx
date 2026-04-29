import { Box, Flex, Text, Badge, IconButton, Card, Progress } from '@radix-ui/themes'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Loan } from '@/services/loans.service'
import { Icons } from '@/components/ui/icons/icons'

type Props = {
  loan: Loan
  onEdit: (loan: Loan) => void
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
  pendiente: '#F59E0B',
  pagando: '#3B82F6',
  pagado: '#10B981',
  vencido: '#EF4444',
}

const TYPE_LABELS: Record<string, string> = {
  prestado: 'Prestado',
  solicitado: 'Solicitado',
}

export function LoanCard({ loan, onEdit, onDelete }: Props) {
  const color = STATUS_COLORS[loan.status] ?? 'var(--accent-9)'
  const isGiven = loan.loan_type === 'prestado'

  // Calcular progreso si hay fecha fin
  const startDate = new Date(loan.start_date)
  const endDate = loan.end_date ? new Date(loan.end_date) : null
  const now = new Date()
  let progress = 0
  if (endDate && loan.status !== 'pagado') {
    const total = endDate.getTime() - startDate.getTime()
    const elapsed = now.getTime() - startDate.getTime()
    progress = Math.min(100, Math.max(0, (elapsed / total) * 100))
  } else if (loan.status === 'pagado') {
    progress = 100
  }

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
                {loan.person}
              </Text>
              <Flex gap="1">
                <Badge
                  size="1"
                  variant="soft"
                  style={{
                    background: `${color}22`,
                    color,
                  }}
                >
                  {TYPE_LABELS[loan.loan_type]}
                </Badge>
                <Badge
                  size="1"
                  variant="soft"
                  style={{
                    background: `${color}22`,
                    color,
                    textTransform: 'capitalize',
                  }}
                >
                  {loan.status}
                </Badge>
              </Flex>
            </Box>
          </Flex>

          <Flex gap="1">
            <IconButton
              variant="ghost"
              size="1"
              onClick={() => onEdit(loan)}
            >
              <Pencil1Icon />
            </IconButton>
            <IconButton
              variant="ghost"
              size="1"
              color="red"
              onClick={() => onDelete(loan.id)}
            >
              <TrashIcon />
            </IconButton>
          </Flex>
        </Flex>

        {/* Monto */}
        <Box>
          <Text size="1" color="gray" style={{ display: 'block', marginBottom: 2 }}>
            {isGiven ? 'Monto prestado' : 'Monto solicitado'}
          </Text>
          <Text size="5" weight="bold" style={{ color }}>
            {formatCurrency(loan.amount)}
          </Text>
        </Box>

        {/* Tasa de interés */}
        <Flex justify="between">
          <Box>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              Tasa de interés
            </Text>
            <Text size="2" weight="bold">
              {loan.interest_rate}%
            </Text>
          </Box>
          <Box style={{ textAlign: 'right' }}>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              Fecha inicio
            </Text>
            <Text size="2">
              {new Date(loan.start_date).toLocaleDateString('es-CO')}
            </Text>
          </Box>
        </Flex>

        {/* Progreso */}
        {loan.status !== 'pendiente' && (
          <Box>
            <Flex justify="between" mb="1">
              <Text size="1" color="gray">Progreso</Text>
              <Text size="1" weight="bold">{Math.round(progress)}%</Text>
            </Flex>
            <Progress value={progress}/>
          </Box>
        )}

        {/* Notas */}
        {loan.notes && (
          <Text size="1" color="gray" style={{ fontStyle: 'italic' }}>
            {loan.notes}
          </Text>
        )}

      </Flex>
    </Card>
  )
}
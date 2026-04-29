import { Box, Flex, Text, Badge, IconButton, Card } from '@radix-ui/themes'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { BankCard } from '@/services/bank-cards.service'
import { Icons } from '@/components/ui/icons/icons'

type Props = {
  card: BankCard
  onEdit: (card: BankCard) => void
  onDelete: (id: number) => void
}

function formatCardNumber(num: string): string {
  return num.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
}

const CARD_COLORS: Record<string, string> = {
  credito: '#7C3AED',
  debito: '#059669',
}

export function CardCard({ card, onEdit, onDelete }: Props) {
  const color = CARD_COLORS[card.card_type] ?? 'var(--accent-9)'
  const isCredit = card.card_type === 'credito'

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
              <Icons.creditCard width={20} height={20} style={{ color }} />
            </Flex>
            <Box>
              <Text size="2" weight="bold" style={{ display: 'block' }}>
                {card.cardholder_name}
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
                {card.card_type}
              </Badge>
            </Box>
          </Flex>

          <Flex gap="1">
            <IconButton
              variant="ghost"
              size="1"
              onClick={() => onEdit(card)}
            >
              <Pencil1Icon />
            </IconButton>
            <IconButton
              variant="ghost"
              size="1"
              color="red"
              onClick={() => onDelete(card.id)}
            >
              <TrashIcon />
            </IconButton>
          </Flex>
        </Flex>

        {/* Número de tarjeta */}
        <Text size="2" style={{ letterSpacing: 2, fontFamily: 'monospace' }}>
          {formatCardNumber(card.card_number)}
        </Text>

        {/* Fecha y CVV */}
        <Flex justify="between">
          <Box>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              Vence
            </Text>
            <Text size="2" style={{ fontFamily: 'monospace' }}>
              {card.expiration_date}
            </Text>
          </Box>
          <Box style={{ textAlign: 'right' }}>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              CVV
            </Text>
            <Text size="2" style={{ fontFamily: 'monospace' }}>
              •••
            </Text>
          </Box>
        </Flex>

      </Flex>
    </Card>
  )
}
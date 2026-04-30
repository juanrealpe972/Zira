import { Box, Flex, Text, Badge, IconButton, Card } from '@radix-ui/themes'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { ExpenseProduct } from '@/services/expense-products.service'
import { Icons } from '@/components/ui/icons/icons'

type Props = {
  product: ExpenseProduct
  onEdit: (product: ExpenseProduct) => void
  onDelete: (id: number) => void
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

const color = '#8B5CF6'

export function ExpenseProductCard({ product, onEdit, onDelete }: Props) {
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
              <Icons.file width={20} height={20} style={{ color }} />
            </Flex>
            <Box>
              <Text size="2" weight="bold" style={{ display: 'block' }}>
                Producto ID: {product.product}
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
                  Cantidad: {product.quantity}
                </Badge>
              </Flex>
            </Box>
          </Flex>

          <Flex gap="1">
            <IconButton
              variant="ghost"
              size="1"
              onClick={() => onEdit(product)}
            >
              <Pencil1Icon />
            </IconButton>
            <IconButton
              variant="ghost"
              size="1"
              color="red"
              onClick={() => onDelete(product.id)}
            >
              <TrashIcon />
            </IconButton>
          </Flex>
        </Flex>

        {/* Precio unitario y subtotal */}
        <Flex justify="between">
          <Box>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              Precio unitario
            </Text>
            <Text size="3" weight="bold" style={{ color }}>
              {formatCurrency(product.unit_price)}
            </Text>
          </Box>
          <Box style={{ textAlign: 'right' }}>
            <Text size="1" color="gray" style={{ display: 'block' }}>
              Subtotal
            </Text>
            <Text size="4" weight="bold" style={{ color }}>
              {formatCurrency(product.subtotal)}
            </Text>
          </Box>
        </Flex>

      </Flex>
    </Card>
  )
}
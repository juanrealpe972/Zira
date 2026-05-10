import { Income } from '@/types'
import { Badge } from '@radix-ui/themes'

export type ColumnKey =
    | 'description'
    | 'amount'
    | 'category'
    | 'date'
    | 'is_active'
    | 'created_at'

export const ALL_INCOME_COLUMNS: { key: ColumnKey; label: string }[] = [
    { key: 'description', label: 'Descripción' },
    { key: 'amount', label: 'Monto' },
    { key: 'category', label: 'Categoría' },
    { key: 'date', label: 'Fecha' },
    { key: 'is_active', label: 'Estado' },
    { key: 'created_at', label: 'Fecha creación' },
]

export function getIncomeColumns(visibleColumns: ColumnKey[]) {
    return visibleColumns.map((key) => {
        switch (key) {
            case 'is_active':
                return {
                    key,
                    label: 'Estado',
                    render: (income: Income) => (
                        <Badge color={income.is_active ? 'green' : 'red'} variant="soft">
                            {income.is_active ? 'Activo' : 'Inactivo'}
                        </Badge>
                    ),
                }

            case 'created_at':
                return {
                    key,
                    label: 'Fecha creación',
                    render: (income: Income) =>
                        new Date(income.created_at).toLocaleDateString('es-CO'),
                }

            case 'amount':
                return {
                    key,
                    label: 'Monto',
                    render: (income: Income) =>
                        new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 0,
                        }).format(income.amount),
                    align: 'right' as const,
                }

            case 'category':
                return {
                    key,
                    label: 'Categoría',
                    render: (income: Income) => (
                        <Badge variant="soft" size="2">
                            {income.category || '—'}
                        </Badge>
                    ),
                }

            default:
                return {
                    key,
                    label: ALL_INCOME_COLUMNS.find(c => c.key === key)?.label || key,
                    render: (income: Income) => (income as any)[key] ?? '—',
                }
        }
    })
}

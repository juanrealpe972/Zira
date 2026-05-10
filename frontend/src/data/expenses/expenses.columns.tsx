import { Expense } from '@/types'
import { Badge } from '@radix-ui/themes'

export type ColumnKey =
    | 'title'
    | 'amount'
    | 'category'
    | 'date'
    | 'description'
    | 'type'
    | 'is_active'
    | 'created_at'

export const ALL_EXPENSES_COLUMNS: { key: ColumnKey; label: string }[] = [
    { key: 'title', label: 'Título' },
    { key: 'amount', label: 'Monto' },
    { key: 'category', label: 'Categoría' },
    { key: 'date', label: 'Fecha' },
    { key: 'description', label: 'Descripción' },
    { key: 'type', label: 'Tipo' },
    { key: 'is_active', label: 'Activo' },
    { key: 'created_at', label: 'Fecha creación' },
]

export function getExpensesColumns(
    visibleColumns: ColumnKey[]
) {
    return visibleColumns.map((key) => {
        switch (key) {
            case 'is_active':
                return {
                    key,
                    label: 'Estado',
                    render: (expense: Expense) => (
                        <Badge color={expense.is_active ? 'green' : 'red'} variant="soft">
                            {expense.is_active ? 'Activo' : 'Inactivo'}
                        </Badge>
                    ),
                }

            case 'created_at':
                return {
                    key,
                    label: 'Fecha creación',
                    render: (expense: Expense) =>
                        new Date(expense.created_at).toLocaleDateString('es-CO'),
                }

            default:
                return {
                    key,
                    label: ALL_EXPENSES_COLUMNS.find(c => c.key === key)?.label || key,
                    render: (expense: Expense) =>
                        (expense as any)[key] ?? '—',
                }
        }
    })
}
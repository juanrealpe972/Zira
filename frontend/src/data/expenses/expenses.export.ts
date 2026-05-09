import { Expense } from '@/types'

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export function exportExpenses(
    expenses: Expense[],
    selected: number[],
    columns: string[]
) {
    const selectedExpenses = expenses.filter(e => selected.includes(e.id))

    if (selectedExpenses.length === 0) {
        alert('Selecciona gastos para exportar')
        return
    }

    const csv = [
        columns.join(','),

        ...selectedExpenses.map(e =>
            columns.map(col => {
                switch (col) {
                    case 'id': return e.id.toString()
                    case 'user': return e.user.toString()
                    case 'title': return e.title
                    case 'amount': return e.amount.toString()
                    case 'category': return e.category
                    case 'date': return e.date
                    case 'description': return e.description
                    case 'type': return e.type
                    case 'is_active': return e.is_active ? 'Sí' : 'No'
                    case 'created_at': return formatDate(e.created_at)
                    case 'status': return e.is_active ? 'Activo' : 'Inactivo'
                    case 'description': return e.description
                    default: return (e as any)[col] ?? ''
                }
            }).join(',')
        )

    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'gastos.csv'
    a.click()

    URL.revokeObjectURL(url)
}

export function importExpenses() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.csv'

    input.onchange = (e: any) => {
        const file = e.target.files[0]

        if (!file) return

        const reader = new FileReader()

        reader.onload = (event: any) => {
            const text = event.target.result as string

            console.log('CSV cargado:')
            console.log(text)

            alert('Archivo cargado correctamente (ver consola)')
        }

        reader.readAsText(file)
    }

    input.click()
}
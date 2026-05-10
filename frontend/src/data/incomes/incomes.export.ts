import { Income } from '@/types'

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export function exportIncomes(
    incomes: Income[],
    selected: number[],
    columns: string[]
) {
    const selectedIncomes = incomes.filter(i => selected.includes(i.id))

    if (selectedIncomes.length === 0) {
        alert('Selecciona ingresos para exportar')
        return
    }

    const csv = [
        columns.join(','),
        ...selectedIncomes.map(income =>
            columns.map(col => {
                switch (col) {
                    case 'id': return income.id.toString()
                    case 'user': return income.user.toString()
                    case 'amount': return income.amount.toString()
                    case 'category': return income.category
                    case 'date': return income.date
                    case 'description': return income.description
                    case 'is_active': return income.is_active ? 'Sí' : 'No'
                    case 'created_at': return formatDate(income.created_at)
                    default: return (income as any)[col] ?? ''
                }
            }).join(',')
        ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'ingresos.csv'
    a.click()

    URL.revokeObjectURL(url)
}

export function importIncomes() {
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

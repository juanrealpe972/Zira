import { User } from '@/types'

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export function exportUsers(
    users: User[],
    selected: number[],
    columns: string[]
) {
    const selectedUsers = users.filter(u => selected.includes(u.id))

    if (selectedUsers.length === 0) {
        alert('Selecciona usuarios para exportar')
        return
    }

    const csv = [
        columns.join(','),

        ...selectedUsers.map(u =>
            columns.map(col => {
                switch (col) {
                    case 'name': return u.name
                    case 'email': return u.email
                    case 'phone': return u.phone
                    case 'role': return u.role
                    case 'company': return u.company
                    case 'country': return u.country
                    case 'city': return u.city
                    case 'verified': return u.verified ? 'Sí' : 'No'
                    case 'is_staff': return u.is_staff ? 'Sí' : 'No'
                    case 'created_at': return formatDate(u.created_at)
                    case 'status': return u.is_active ? 'Activo' : 'Inactivo'
                    case 'description': return u.description
                    case 'national_id': return u.national_id
                    default: return (u as any)[col] ?? ''
                }
            }).join(',')
        )

    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'usuarios.csv'
    a.click()

    URL.revokeObjectURL(url)
}

export function importUsers() {
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
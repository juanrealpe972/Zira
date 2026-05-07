import { useEffect, useState } from 'react'
import { getUsers } from '@/services'
import { User } from '@/types'

export function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        load()
    }, [])

    async function load() {
        try {
            const data = await getUsers()
            const parsed = Array.isArray(data) ? data : data.results
            setUsers(parsed)
        } finally {
            setLoading(false)
        }
    }

    return { users, setUsers, loading }
}
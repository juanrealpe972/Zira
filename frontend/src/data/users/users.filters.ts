import { User } from '@/types'

export function filterUsers(
    users: User[],
    activeTab: string,
    roleFilter: string,
    search: string
) {
    return users.filter(u => {
        const matchTab =
            activeTab === 'all'
                ? true
                : activeTab === 'active'
                    ? u.is_active
                    : !u.is_active

        const matchRole =
            roleFilter === 'all' || u.role === roleFilter

        const matchSearch =
            !search ||
            u.name?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase())

        return matchTab && matchRole && matchSearch
    })
}
import { Income } from '@/types'

export function incomesExpenses(
    users: Income[],
    activeTab: string,
    expenseFilter: string,
    search: string
) {
    return users.filter(e => {
        const matchTab =
            activeTab === 'all'
                ? true
                : activeTab === 'active'
                    ? e.is_active
                    : !e.is_active

        const matchRole =
            expenseFilter === 'all' || e.category === expenseFilter

        const matchSearch =
            !search ||
            e.category?.toLowerCase().includes(search.toLowerCase()) ||
            e.date?.toLowerCase().includes(search.toLowerCase())

        return matchTab && matchRole && matchSearch
    })
}
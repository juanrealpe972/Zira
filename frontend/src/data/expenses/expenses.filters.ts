import { Expense } from '@/types'

export function filtersExpenses(
    users: Expense[],
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
            expenseFilter === 'all' || e.type === expenseFilter

        const matchSearch =
            !search ||
            e.title?.toLowerCase().includes(search.toLowerCase()) ||
            e.category?.toLowerCase().includes(search.toLowerCase()) ||
            e.date?.toLowerCase().includes(search.toLowerCase())

        return matchTab && matchRole && matchSearch
    })
}
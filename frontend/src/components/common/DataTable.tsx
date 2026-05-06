'use client'

import { Box, Table, Checkbox, Flex, Text } from '@radix-ui/themes'

export type DataTableColumn<T> = {
    key: string
    label: string
    render: (row: T) => React.ReactNode
    align?: 'left' | 'center' | 'right'
}

type Props<T extends { id: number }> = {
    data: T[]
    loading?: boolean
    loadingText?: string
    emptyText?: string
    selected?: number[]
    onSelect?: (id: number) => void
    onSelectAll?: () => void
    columns: DataTableColumn<T>[]
    actions?: (row: T) => React.ReactNode
}

export function DataTable<T extends { id: number }>({
    data,
    loading = false,
    loadingText,
    emptyText,
    selected = [],
    onSelect,
    onSelectAll,
    columns,
    actions,
}: Props<T>) {
    const showCheckbox = !!onSelect && !!onSelectAll

    if (loading) {
        return (
            <Flex align="center" justify="center" py="8">
                <Text color="gray" size="2">{loadingText}</Text>
            </Flex>
        )
    }

    if (data.length === 0) {
        return (
            <Flex align="center" justify="center" py="8">
                <Text color="gray" size="2">{emptyText}</Text>
            </Flex>
        )
    }

    return (
        <Box style={{ overflowX: 'auto' }}>
            <Table.Root variant="surface" style={{ width: '100%' }}>

                {/* Header */}
                <Table.Header>
                    <Table.Row>

                        {showCheckbox && (
                            <Table.ColumnHeaderCell style={{ width: 40 }}>
                                <Checkbox
                                    checked={selected.length === data.length && data.length > 0}
                                    onCheckedChange={onSelectAll}
                                />
                            </Table.ColumnHeaderCell>
                        )}

                        {columns.map(col => (
                            <Table.ColumnHeaderCell
                                key={col.key}
                                style={{
                                    textAlign: col.align ?? 'center',
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: 'var(--gray-10)',
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {col.label}
                            </Table.ColumnHeaderCell>
                        ))}

                        {actions && <Table.ColumnHeaderCell style={{ width: 40 }} />}

                    </Table.Row>
                </Table.Header>

                {/* Body */}
                <Table.Body>
                    {data.map(row => (
                        <Table.Row
                            key={row.id}
                            style={{
                                background: selected.includes(row.id) ? 'var(--accent-2)' : undefined,
                                transition: 'background 0.15s',
                            }}
                        >

                            {showCheckbox && (
                                <Table.Cell style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                                    <Flex align="center" justify="center" style={{ width: '100%' }}>
                                        <Checkbox
                                            checked={selected.includes(row.id)}
                                            onCheckedChange={() => onSelect!(row.id)}
                                        />
                                    </Flex>
                                </Table.Cell>
                            )}

                            {columns.map(col => (
                                <Table.Cell
                                    key={col.key}
                                    style={{ textAlign: col.align ?? 'left', verticalAlign: 'middle' }}
                                >
                                    {col.render(row)}
                                </Table.Cell>
                            ))}

                            {actions && (
                                <Table.Cell style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {actions(row)}
                                </Table.Cell>
                            )}

                        </Table.Row>
                    ))}
                </Table.Body>

            </Table.Root>
        </Box>
    )
}
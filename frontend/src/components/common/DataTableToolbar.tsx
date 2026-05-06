'use client'

import { Flex, Button, DropdownMenu, IconButton, Badge } from '@radix-ui/themes'
import { Icons } from '@/components/ui'

type Column<T> = {
    key: keyof T
    label: string
}

type Props<T> = {
    selectedCount: number
    columns: Column<T>[]
    visibleColumns: (keyof T)[]
    onToggleColumn: (key: keyof T) => void
    onExport?: () => void
    onImport?: () => void
}

export function DataTableToolbar<T>({ selectedCount, columns, visibleColumns, onToggleColumn, onExport, onImport }: Props<T>) {
    return (
        <Flex justify="between" align="center" mb="4">
            <Flex gap="2" align="center">
                <Badge color="blue" variant="soft">
                    {selectedCount === 1 ? '1 registro seleccionado' : `${selectedCount} registros seleccionados`}
                </Badge>
            </Flex>

            <Flex gap="2" align="center">

                {onImport && (
                    <Button variant="soft" onClick={onImport}>
                        <Icons.uploadIcon /> Importar
                    </Button>
                )}

                {onExport && (
                    <Button variant="soft" onClick={onExport}>
                        <Icons.downloadIcon /> Exportar
                    </Button>
                )}

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <IconButton variant="ghost" size="1">
                            <Icons.filter />
                        </IconButton>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content>
                        {columns.map(col => (
                            <DropdownMenu.CheckboxItem
                                key={String(col.key)}
                                checked={visibleColumns.includes(col.key)}
                                onCheckedChange={() => onToggleColumn(col.key)}
                            >
                                {col.label}
                            </DropdownMenu.CheckboxItem>
                        ))}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

            </Flex>
        </Flex>
    )
}
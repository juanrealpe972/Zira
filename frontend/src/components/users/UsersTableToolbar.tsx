'use client'

import { Flex, Button, DropdownMenu, IconButton, Badge } from '@radix-ui/themes'
import { DownloadIcon, UploadIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'

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

export function UsersTableToolbar<T>({
    selectedCount,
    columns,
    visibleColumns,
    onToggleColumn,
    onExport,
    onImport,
}: Props<T>) {
    return (
        <Flex justify="between" align="center" mb="4">
            <Flex gap="2" align="center">
                {selectedCount > 0 && (
                    <Badge color="blue" variant="soft">
                        {selectedCount} seleccionados
                    </Badge>
                )}
            </Flex>

            <Flex gap="2" align="center">

                {onImport && (
                    <Button variant="soft" onClick={onImport}>
                        <UploadIcon /> Importar
                    </Button>
                )}

                {onExport && (
                    <Button variant="soft" onClick={onExport}>
                        <DownloadIcon /> Exportar
                    </Button>
                )}

                {/* 🔥 Columnas */}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <IconButton variant="ghost" size="1">
                            <MixerHorizontalIcon />
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
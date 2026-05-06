'use client'

import { IconButton, DropdownMenu } from '@radix-ui/themes'
import { Icons } from '@/components/ui'

export type TableAction<T> = {
  label: string
  icon?: React.ReactNode
  color?: 'red' | 'green' | 'blue' | 'orange' | 'gray'
  separator?: boolean                        // pone separador ANTES de este item
  hidden?: (row: T) => boolean               // oculta el item según la fila
  onClick: (row: T) => void
}

type Props<T> = {
  row: T
  actions: TableAction<T>[]
}

export function TableActions<T>({ row, actions }: Props<T>) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" size="1">
          <Icons.dotsVerticalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" size="1">
        {actions.map((action, i) => {
          if (action.hidden?.(row)) return null
          return (
            <div key={i}>
              {action.separator && <DropdownMenu.Separator />}
              <DropdownMenu.Item
                color={action.color}
                onClick={() => action.onClick(row)}
              >
                {action.icon}
                {action.label}
              </DropdownMenu.Item>
            </div>
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
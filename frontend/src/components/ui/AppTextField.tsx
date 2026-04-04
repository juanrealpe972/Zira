import { TextField, Text } from '@radix-ui/themes'
import type { ComponentProps } from 'react'

type AppTextFieldProps = ComponentProps<typeof TextField.Root> & {
  label?: string
  icon?: React.ReactNode
}

export function AppTextField({ label, icon, id, ...props }: AppTextFieldProps) {
  return (
    <label htmlFor={id} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <Text size="2" weight="medium">{label}</Text>}
      <TextField.Root id={id} size="2" radius="medium" {...props}>
        {icon && <TextField.Slot>{icon}</TextField.Slot>}
      </TextField.Root>
    </label>
  )
}
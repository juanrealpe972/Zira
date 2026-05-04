import { Icons } from '@/components/ui'

type IconName = keyof typeof Icons

type Props = {
    name: IconName
    size?: number
    className?: string
}

export function AppIcon({ name, size = 16, className }: Props) {
    const IconComponent = Icons[name]

    if (!IconComponent) return null

    return (
        <IconComponent
            width={size}
            height={size}
            className={className}
        />
    )
}
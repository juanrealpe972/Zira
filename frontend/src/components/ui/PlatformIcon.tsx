'use client'
import { Icons } from '@/components/ui'

const PLATFORM_ICONS: Record<string, React.ComponentType<any>> = {
  facebook: Icons.facebook,
  instagram: Icons.instagram,
  twitter: Icons.twitter,
  linkedin: Icons.linkedin,
  youtube: Icons.youtube,
  tiktok: Icons.tiktok,
  github: Icons.github,
  otro: Icons.otro,
}

type Props = {
  platform?: string
  size?: number
}

export function PlatformIcon({ platform, size = 14 }: Props) {
  const key = platform?.toLowerCase() || ''
  const Icon = PLATFORM_ICONS[key] || Icons.link

  return (
    <Icon
      width={size}
      height={size}
      style={{
        color: 'var(--accent-9)',
        flexShrink: 0,
      }}
    />
  )
}
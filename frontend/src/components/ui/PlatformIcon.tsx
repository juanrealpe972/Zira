import {
  GlobeIcon,
  Link2Icon,
  ChatBubbleIcon,
  PersonIcon,
  VideoIcon,
  CodeIcon,
} from '@radix-ui/react-icons'

const PLATFORM_ICONS: Record<string, React.ComponentType<any>> = {
  facebook: ChatBubbleIcon,
  instagram: ChatBubbleIcon,
  twitter: ChatBubbleIcon,
  linkedin: PersonIcon,
  youtube: VideoIcon,
  tiktok: VideoIcon,
  github: CodeIcon,
  otro: GlobeIcon,
}

type Props = {
  platform?: string
  size?: number
}

export default function PlatformIcon({ platform, size = 14 }: Props) {
  const key = platform?.toLowerCase() || ''
  const Icon = PLATFORM_ICONS[key] || Link2Icon

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
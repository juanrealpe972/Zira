import {
  DashboardIcon,
  PersonIcon,
  GearIcon,
  BarChartIcon,
  FileTextIcon,
  EnvelopeClosedIcon,
  ChatBubbleIcon,
  CalendarIcon,
  LockClosedIcon,
  CardStackIcon,
  ReaderIcon,
  ArchiveIcon,
  BellIcon,
  BookmarkIcon,
  Share2Icon,
  CheckboxIcon,
  MixerHorizontalIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  MagicWandIcon,
  VideoIcon,
  MinusIcon,
  GlobeIcon,
  IdCardIcon,
} from '@radix-ui/react-icons'

export const Icons = {
  dashboard: DashboardIcon,
  user: PersonIcon,
  settings: GearIcon,
  analytics: BarChartIcon,
  file: FileTextIcon,
  mail: EnvelopeClosedIcon,
  chat: ChatBubbleIcon,
  calendar: CalendarIcon,
  security: LockClosedIcon,
  finance: CardStackIcon,
  content: ReaderIcon,
  archive: ArchiveIcon,
  notification: BellIcon,
  bookmark: BookmarkIcon,
  share: Share2Icon,
  task: CheckboxIcon,
  menu: MagicWandIcon,
  filter: MixerHorizontalIcon,

  // Redes sociales
  github: GitHubLogoIcon,
  linkedin: LinkedInLogoIcon,
  twitter: TwitterLogoIcon,
  instagram: InstagramLogoIcon,
  youtube: VideoIcon,
  tiktok: MinusIcon,
  facebook: GlobeIcon,
  otro: GlobeIcon,

  // Finance
  creditCard: CardStackIcon,
  money: IdCardIcon,
}

// Helper para obtener el ícono por plataforma
export function getSocialIcon(platform: string) {
  const key = platform.toLowerCase() as keyof typeof Icons
  return Icons[key] ?? Icons.share
}

// Color por plataforma
export function getSocialColor(platform: string): string {
  const colors: Record<string, string> = {
    facebook: '#1877F2',
    instagram: '#E1306C',
    linkedin: '#0A66C2',
    twitter: '#1DA1F2',
    youtube: '#FF0000',
    tiktok: '#010101',
    github: '#333333',
  }
  return colors[platform.toLowerCase()] ?? 'var(--accent-9)'
}
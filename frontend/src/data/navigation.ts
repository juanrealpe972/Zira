import {
  DashboardIcon,
  PersonIcon,
  GearIcon,
  BarChartIcon,
  FileTextIcon,
} from '@radix-ui/react-icons'

export type NavItem = {
  label: string
  href: string
  icon: React.ComponentType
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { label: 'Usuarios', href: '/dashboard/users', icon: PersonIcon },
  { label: 'Reportes', href: '/dashboard/reports', icon: BarChartIcon },
  { label: 'Documentos', href: '/dashboard/documents', icon: FileTextIcon },
  { label: 'Configuración', href: '/dashboard/settings', icon: GearIcon },
]
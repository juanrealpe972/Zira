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
} from '@radix-ui/react-icons'

export type NavItem = {
  label: string
  href?: string
  icon?: React.ComponentType
  badge?: string
  children?: NavItem[]
  disabled?: boolean
  external?: boolean
  tag?: 'NEW' | 'PRO'
}

export type NavGroup = {
  group: string
  items: NavItem[]
}

export const navigation: NavGroup[] = [
  {
    group: 'Descripción general',
    items: [
      { label: 'Aplicación', href: '/dashboard', icon: DashboardIcon },
      { label: 'Comercio electrónico', href: '/dashboard/ecommerce', icon: BarChartIcon },
      { label: 'Analítica', href: '/dashboard/analytics', icon: BarChartIcon },
      { label: 'Banca', href: '/dashboard/banking', icon: BarChartIcon },
      { label: 'Reserva', href: '/dashboard/booking', icon: CalendarIcon },
      { label: 'Archivo', href: '/dashboard/file', icon: FileTextIcon },
      { label: 'Curso', href: '/dashboard/course', icon: FileTextIcon },
    ],
  },
  {
    group: 'Gestión',
    items: [
      { label: 'Usuario', href: '/dashboard/users', icon: PersonIcon },
      { label: 'Producto', href: '/dashboard/products', icon: FileTextIcon, children: [] },
      { label: 'Orden', href: '/dashboard/orders', icon: FileTextIcon, children: [] },
      { label: 'Factura', href: '/dashboard/invoices', icon: FileTextIcon, children: [] },
      { label: 'Blog', href: '/dashboard/blog', icon: FileTextIcon, children: [] },
      { label: 'Trabajo', href: '/dashboard/jobs', icon: FileTextIcon, children: [] },
      { label: 'Tour', href: '/dashboard/tours', icon: FileTextIcon, children: [] },
      { label: 'Administrador de archivos', href: '/dashboard/file-manager', icon: FileTextIcon },
      { label: 'Correo', href: '/dashboard/mail', icon: EnvelopeClosedIcon, badge: '+32' },
      { label: 'Chat', href: '/dashboard/chat', icon: ChatBubbleIcon },
      { label: 'Calendario', href: '/dashboard/calendar', icon: CalendarIcon },
      { label: 'Kanban', href: '/dashboard/kanban', icon: DashboardIcon },
      { label: 'Permiso', href: '/dashboard/permissions', icon: LockClosedIcon },
    ],
  },
  {
    group: 'Misc',
    items: [
      { label: 'Permiso', href: '/dashboard/misc/permissions', icon: LockClosedIcon, tag: 'NEW', disabled: false },
      { label: 'Nivel', href: '/dashboard/misc/level', icon: GearIcon, disabled: true },
      { label: 'Parámetros', href: '/dashboard/misc/params', icon: GearIcon },
      { label: 'Enlace externo', href: 'https://google.com', icon: GearIcon, external: true },
    ],
  },
]
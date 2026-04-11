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
  disabled?: boolean
  external?: boolean
  tag?: 'NEW' | 'PRO'
  children?: NavItem[]
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
      {
        label: 'Usuario',
        icon: PersonIcon,
        children: [
          { label: 'Lista', href: '/dashboard/users/list' },
          { label: 'Detalles', href: '/dashboard/users/details' },
          { label: 'Crear', href: '/dashboard/users/create' },
          { label: 'Editar', href: '/dashboard/users/edit' },
          { label: 'Perfil', href: '/dashboard/users/profile' },
          { label: 'Tarjetas', href: '/dashboard/users/cards' },
          { label: 'Cuenta', href: '/dashboard/users/account' },
        ],
      },
      {
        label: 'Producto',
        icon: FileTextIcon,
        children: [
          { label: 'Lista', href: '/dashboard/products/list' },
          { label: 'Detalles', href: '/dashboard/products/details' },
          { label: 'Crear', href: '/dashboard/products/create' },
          { label: 'Editar', href: '/dashboard/products/edit' },
        ],
      },
      {
        label: 'Orden',
        icon: FileTextIcon,
        children: [
          { label: 'Lista', href: '/dashboard/orders/list' },
          { label: 'Detalles', href: '/dashboard/orders/details' },
          { label: 'Crear', href: '/dashboard/orders/create' },
          { label: 'Editar', href: '/dashboard/orders/edit' },
        ],
      },
      {
        label: 'Factura',
        icon: FileTextIcon,
        children: [
          { label: 'Lista', href: '/dashboard/invoices/list' },
          { label: 'Detalles', href: '/dashboard/invoices/details' },
          { label: 'Crear', href: '/dashboard/invoices/create' },
          { label: 'Editar', href: '/dashboard/invoices/edit' },
        ],
      },
      {
        label: 'Blog',
        icon: FileTextIcon,
        children: [
          { label: 'Lista', href: '/dashboard/blog/list' },
          { label: 'Detalles', href: '/dashboard/blog/details' },
          { label: 'Crear', href: '/dashboard/blog/create' },
          { label: 'Editar', href: '/dashboard/blog/edit' },
        ],
      },
      {
        label: 'Trabajo',
        icon: FileTextIcon,
        children: [
          { label: 'Lista', href: '/dashboard/jobs/list' },
          { label: 'Detalles', href: '/dashboard/jobs/details' },
          { label: 'Crear', href: '/dashboard/jobs/create' },
          { label: 'Editar', href: '/dashboard/jobs/edit' },
        ],
      },
      {
        label: 'Tour',
        icon: FileTextIcon,
        children: [
          { label: 'Lista', href: '/dashboard/tours/list' },
          { label: 'Detalles', href: '/dashboard/tours/details' },
          { label: 'Crear', href: '/dashboard/tours/create' },
          { label: 'Editar', href: '/dashboard/tours/edit' },
        ],
      },
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
      { label: 'Permiso', href: '/dashboard/misc/permissions', icon: LockClosedIcon, tag: 'NEW' },
      { label: 'Nivel', href: '/dashboard/misc/level', icon: GearIcon, disabled: true },
      { label: 'Parámetros', href: '/dashboard/misc/params', icon: GearIcon },
      { label: 'Enlace externo', href: 'https://google.com', icon: GearIcon, external: true },
    ],
  },
]
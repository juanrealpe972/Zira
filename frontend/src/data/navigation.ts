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

const crud = (base: string) => [
  { label: 'Lista', href: `/dashboard/${base}/list` },
  { label: 'Detalles', href: `/dashboard/${base}/details` },
  { label: 'Crear', href: `/dashboard/${base}/create` },
  { label: 'Editar', href: `/dashboard/${base}/edit` },
]

export const navigation: NavGroup[] = [
  {
    group: 'General',
    items: [
      { label: 'Aplicación', href: '/dashboard', icon: DashboardIcon },
      { label: 'Analítica', href: '/dashboard/analytics', icon: BarChartIcon },
      { label: 'Reserva', href: '/dashboard/booking', icon: CalendarIcon },
      { label: 'Archivo', href: '/dashboard/file', icon: ArchiveIcon },
      { label: 'Curso', href: '/dashboard/course', icon: ReaderIcon },
      { label: 'Calendario', href: '/dashboard/calendar', icon: CalendarIcon },
    ],
  },
  {
    group: 'Usuarios',
    items: [
      {
        label: 'Usuarios',
        icon: PersonIcon,
        children: [
          ...crud('users'),
          { label: 'Perfil', href: '/dashboard/users/profile' },
          { label: 'Tarjetas', href: '/dashboard/users/cards' },
          { label: 'Cuenta', href: '/dashboard/users/account' },
        ],
      },
    ],
  },
  {
    group: 'Finanzas',
    items: [
      {
        label: 'Cuentas bancarias',
        icon: CardStackIcon,
        children: crud('bank-accounts'),
      },
      {
        label: 'Tarjetas bancarias',
        icon: CardStackIcon,
        children: crud('bank-cards'),
      },
      {
        label: 'Préstamos',
        icon: MixerHorizontalIcon,
        children: crud('loans'),
      },
      {
        label: 'Ahorros',
        icon: BookmarkIcon,
        children: crud('savings'),
      },
      {
        label: 'Ingresos',
        icon: BarChartIcon,
        children: crud('incomes'),
      },
      {
        label: 'Gastos',
        icon: BarChartIcon,
        children: crud('expenses'),
      },
      {
        label: 'Productos por gasto',
        icon: FileTextIcon,
        children: crud('expense-products'),
      },
    ],
  },
  {
    group: 'Comercio',
    items: [
      {
        label: 'Productos',
        icon: FileTextIcon,
        children: crud('products'),
      },
      {
        label: 'Productos consumidos',
        icon: FileTextIcon,
        children: crud('products-consumed'),
      },
      {
        label: 'Órdenes',
        icon: ReaderIcon,
        children: crud('orders'),
      },
      {
        label: 'Items de orden',
        icon: ReaderIcon,
        children: crud('order-items'),
      },
    ],
  },
  {
    group: 'Contenido',
    items: [
      {
        label: 'Publicaciones',
        icon: ReaderIcon,
        children: crud('publications'),
      },
      {
        label: 'Comentarios',
        icon: ChatBubbleIcon,
        children: crud('comments'),
      },
      {
        label: 'Redes sociales',
        icon: Share2Icon,
        children: crud('social-networks'),
      },
      {
        label: 'Suscripciones',
        icon: BookmarkIcon,
        children: crud('subscriptions'),
      },
    ],
  },
  {
    group: 'Productividad',
    items: [
      {
        label: 'Tareas',
        icon: CheckboxIcon,
        children: crud('tasks'),
      },
      {
        label: 'Notificaciones',
        icon: BellIcon,
        children: crud('notifications'),
      },
      { label: 'Chat', href: '/dashboard/chat', icon: ChatBubbleIcon },
      { label: 'Correo', href: '/dashboard/mail', icon: EnvelopeClosedIcon },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { label: 'Permisos', href: '/dashboard/permissions', icon: LockClosedIcon },
      { label: 'Configuración', href: '/dashboard/settings', icon: GearIcon },
    ],
  },
]
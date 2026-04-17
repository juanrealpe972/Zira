import { Icons } from '@/components/ui/icons/icons'

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
  { label: 'Cuentas', href: `/dashboard/${base}/accounts` },
]

export const navigation: NavGroup[] = [
  {
    group: 'General',
    items: [
      { label: 'Aplicación', href: '/dashboard', icon: Icons.dashboard },
      { label: 'Analítica', href: '/dashboard/analytics', icon: Icons.analytics },
      { label: 'Reserva', href: '/dashboard/booking', icon: Icons.calendar },
      { label: 'Archivo', href: '/dashboard/file', icon: Icons.archive },
      { label: 'Curso', href: '/dashboard/course', icon: Icons.content },
      { label: 'Calendario', href: '/dashboard/calendar', icon: Icons.calendar },
    ],
  },
  {
    group: 'Usuarios',
    items: [
      {
        label: 'Usuarios',
        icon: Icons.user,
        children: [
          ...crud('users'),
          { label: 'Perfil', href: '/dashboard/users/profile/me' },
          { label: 'Usuarios', href: '/dashboard/users/users' },
        ],
      },
    ],
  },
  {
    group: 'Finanzas',
    items: [
      { label: 'Cuentas bancarias', href: '/dashboard/finances/bank-account', icon: Icons.finance },
      { label: 'Tarjetas bancarias', href: '/dashboard/finances/bank-cards', icon: Icons.finance },
      { label: 'Préstamos', href: '/dashboard/finances/loans', icon: Icons.filter },
      { label: 'Ahorros', href: '/dashboard/finances/savings', icon: Icons.bookmark },
      { label: 'Ingresos', href: '/dashboard/finances/incomes', icon: Icons.analytics },
      { label: 'Gastos', href: '/dashboard/finances/bills', icon: Icons.analytics },
      { label: 'Productos por gasto', href: '/dashboard/finances/expense-products', icon: Icons.file },
    ],
  },
  {
    group: 'Comercio',
    items: [
      { label: 'Productos', href: '/dashboard/trade/products', icon: Icons.file },
      { label: 'Productos consumidos', href: '/dashboard/trade/products-consumed', icon: Icons.file },
      { label: 'Órdenes', href: '/dashboard/trade/orders', icon: Icons.content },
      { label: 'Items de orden', href: '/dashboard/trade/order-items', icon: Icons.content },
    ],
  },
  {
    group: 'Contenido',
    items: [
      { label: 'Publicaciones', href: '/dashboard/content/publications', icon: Icons.content },
      { label: 'Comentarios', href: '/dashboard/content/comments', icon: Icons.chat },
      { label: 'Redes sociales', href: '/dashboard/content/social-networks', icon: Icons.share },
      { label: 'Suscripciones', href: '/dashboard/content/subscriptions', icon: Icons.bookmark },
    ],
  },
  {
    group: 'Productividad',
    items: [
      { label: 'Tareas', icon: Icons.task, children: crud('tasks') },
      { label: 'Notificaciones', icon: Icons.notification, children: crud('notifications') },
      { label: 'Chat', href: '/dashboard/chat', icon: Icons.chat },
      { label: 'Correo', href: '/dashboard/mail', icon: Icons.mail },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { label: 'Permisos', href: '/dashboard/permissions', icon: Icons.security },
      { label: 'Configuración', href: '/dashboard/settings', icon: Icons.settings },
    ],
  },
]
import { Icons } from '@/components/ui'

export type Feature = {
  icon: keyof typeof Icons
  title: string
  description: string
}

export const features: Feature[] = [
  {
    icon: 'money',
    title: 'Control financiero',
    description: 'Gestiona gastos, ingresos, deudas y ahorros fácilmente.'
  },
  {
    icon: 'check',
    title: 'Tareas y pendientes',
    description: 'Organiza tu día con tareas, recordatorios y prioridades.'
  },
  {
    icon: 'file',
    title: 'Archivos e imágenes',
    description: 'Guarda documentos importantes en un solo lugar.'
  },
  {
    icon: 'analytics',
    title: 'Estadísticas',
    description: 'Visualiza tu progreso con gráficos claros y útiles.'
  },
  {
    icon: 'bookmark',
    title: 'Cursos y aprendizaje',
    description: 'Accede y organiza contenido educativo.'
  },
  {
    icon: 'user',
    title: 'Trabajo en equipo',
    description: 'Comparte información y colabora fácilmente.'
  },
]
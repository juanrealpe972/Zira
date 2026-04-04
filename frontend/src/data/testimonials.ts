export type Testimonial = {
  name: string
  role: string
  comment: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Ana García',
    role: 'CEO, Startup XYZ',
    comment: 'Transformó completamente la forma en que trabajamos. Lo recomiendo a todos.',
  },
  {
    name: 'Carlos López',
    role: 'CTO, Empresa ABC',
    comment: 'La integración fue sencilla y el soporte es excelente. Muy satisfecho.',
  },
  {
    name: 'María Torres',
    role: 'Directora de Ops',
    comment: 'Ahorramos horas de trabajo cada semana. Una herramienta imprescindible.',
  },
]
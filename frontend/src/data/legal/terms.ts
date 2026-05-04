import { LegalSection } from './privacy'

export const termsSections: LegalSection[] = [
  {
    title: '1. Uso del servicio',
    content: [
      'Zira es una plataforma para gestión personal y empresarial.',
      'El uso indebido del sistema está prohibido.',
    ],
  },
  {
    title: '2. Cuenta de usuario',
    content: [
      'Debes proporcionar información veraz al registrarte.',
      'Eres responsable de la seguridad de tu cuenta.',
    ],
  },
  {
    title: '3. Responsabilidades',
    content: [
      'No utilizar el sistema para actividades ilegales',
      'No intentar vulnerar la seguridad de la plataforma',
      'No compartir credenciales de acceso',
    ],
    isList: true,
  },
  {
    title: '4. Contenido del usuario',
    content: [
      'El contenido que subas sigue siendo tu propiedad.',
      'Nos otorgas permiso para procesarlo con el fin de prestar el servicio.',
    ],
  },
  {
    title: '5. Disponibilidad',
    content: [
      'No garantizamos disponibilidad continua del servicio.',
      'Podemos realizar mantenimientos sin previo aviso.',
    ],
  },
  {
    title: '6. Limitación de responsabilidad',
    content: [
      'No somos responsables por pérdidas de datos o daños indirectos.',
      'El uso del servicio es bajo tu propio riesgo.',
    ],
  },
  {
    title: '7. Terminación',
    content: [
      'Podemos suspender cuentas que incumplan estos términos.',
      'El usuario puede cancelar su cuenta en cualquier momento.',
    ],
  },
  {
    title: '8. Cambios en los términos',
    content: [
      'Nos reservamos el derecho de modificar estos términos.',
      'El uso continuo implica aceptación de los cambios.',
    ],
  },
]
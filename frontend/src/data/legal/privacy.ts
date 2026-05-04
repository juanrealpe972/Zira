export type LegalSection = {
  title: string
  content: string[]
  isList?: boolean
}

export const privacySections: LegalSection[] = [
  {
    title: '1. Información que recopilamos',
    content: [
      'Recopilamos información personal como nombre, correo electrónico y datos que ingresas en la plataforma.',
      'También recopilamos información de uso como actividades, interacciones y preferencias dentro del sistema.',
    ],
  },
  {
    title: '2. Uso de la información',
    content: [
      'Proveer y mantener el servicio',
      'Mejorar la experiencia del usuario',
      'Personalizar funcionalidades',
      'Brindar soporte técnico',
      'Enviar notificaciones relevantes',
    ],
    isList: true,
  },
  {
    title: '3. Almacenamiento de datos',
    content: [
      'Tus datos son almacenados en servidores seguros y protegidos.',
      'Tomamos medidas para evitar accesos no autorizados o pérdida de información.',
    ],
  },
  {
    title: '4. Seguridad',
    content: [
      'Implementamos prácticas de seguridad como cifrado y control de acceso.',
      'Sin embargo, ningún sistema es completamente seguro, por lo que no garantizamos seguridad absoluta.',
    ],
  },
  {
    title: '5. Compartición de datos',
    content: [
      'No vendemos tu información personal.',
      'Podemos compartir datos con proveedores de servicios necesarios para el funcionamiento de la plataforma.',
      'También podemos compartir información si es requerido por ley.',
    ],
  },
  {
    title: '6. Cookies y tecnologías similares',
    content: [
      'Utilizamos cookies para mejorar la experiencia de usuario.',
      'Puedes configurar tu navegador para rechazar cookies si lo deseas.',
    ],
  },
  {
    title: '7. Derechos del usuario',
    content: [
      'Acceder a tu información personal',
      'Actualizar o corregir tus datos',
      'Solicitar la eliminación de tu cuenta',
    ],
    isList: true,
  },
  {
    title: '8. Cambios en la política',
    content: [
      'Podemos actualizar esta política en cualquier momento.',
      'Te notificaremos si los cambios son significativos.',
    ],
  },
]
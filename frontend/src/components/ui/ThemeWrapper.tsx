'use client'

import { Theme } from '@radix-ui/themes'
import { useTheme } from '@/context/ThemeContext'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <Theme
      appearance={theme.appearance}
      accentColor={theme.accentColor}
      grayColor={theme.grayColor}
      radius={theme.radius}
      scaling={theme.scaling}
      panelBackground={theme.panelBackground}
    >
      {children}
    </Theme>
  )
}
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

type AccentColor =
  | 'indigo' | 'blue' | 'cyan' | 'teal' | 'green'
  | 'orange' | 'red' | 'pink' | 'violet' | 'amber'

type GrayColor = 'slate' | 'mauve' | 'sand' | 'olive' | 'sage'

type FontFamily = 'inter' | 'dm-sans' | 'nunito' | 'public-sans'

type Appearance = 'light' | 'dark'

type Radius = 'none' | 'small' | 'medium' | 'large' | 'full'


type ThemeConfig = {
  appearance: Appearance
  accentColor: AccentColor
  grayColor: GrayColor
  fontFamily: FontFamily
  radius: Radius
  panelBackground: 'solid' | 'translucent'
}

type ThemeContextType = {
  theme: ThemeConfig
  setAppearance: (v: Appearance) => void
  setAccentColor: (v: AccentColor) => void
  setGrayColor: (v: GrayColor) => void
  setFontFamily: (v: FontFamily) => void
  setRadius: (v: Radius) => void
  setPanelBackground: (v: 'solid' | 'translucent') => void
}

const defaultTheme: ThemeConfig = {
  appearance: 'light',
  accentColor: 'indigo',
  grayColor: 'slate',
  fontFamily: 'inter',
  radius: 'medium',
  panelBackground: 'translucent',
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {

  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('zira-theme')
      if (saved) {
        setTheme(prev => ({ ...prev, ...JSON.parse(saved) }))
      }
    } catch { }
  }, [])

  useEffect(() => {
    const fontMap: Record<FontFamily, string> = {
      'inter': 'var(--font-inter)',
      'dm-sans': 'var(--font-dm)',
      'nunito': 'var(--font-nunito)',
      'public-sans': 'var(--font-public)',
    }

    document.documentElement.style.setProperty(
      '--app-font',
      fontMap[theme.fontFamily]
    )
  }, [theme.fontFamily])

  const update = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) =>
    setTheme(prev => ({ ...prev, [key]: value }))

  return (
    <ThemeContext.Provider value={{
      theme,
      setAppearance: (v) => update('appearance', v),
      setAccentColor: (v) => update('accentColor', v),
      setGrayColor: (v) => update('grayColor', v),
      setFontFamily: (v) => update('fontFamily', v),
      setRadius: (v) => update('radius', v),
      setPanelBackground: (v) => update('panelBackground', v),
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider')
  return ctx
}
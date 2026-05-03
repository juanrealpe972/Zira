'use client'
import { createContext, useContext, useState, useEffect } from 'react'

type AccentColor =
  | 'indigo' | 'blue' | 'cyan' | 'teal' | 'green'
  | 'orange' | 'red' | 'pink' | 'violet' | 'amber'

type GrayColor = 'slate' | 'mauve' | 'sand' | 'olive' | 'sage'

type FontFamily = 'inter' | 'dm-sans' | 'nunito' | 'public-sans'

type Appearance = 'light' | 'dark'

type Radius = 'none' | 'small' | 'medium' | 'large' | 'full'

type Scaling = '90%' | '95%' | '100%' | '105%' | '110%'

type ThemeConfig = {
  appearance: Appearance
  accentColor: AccentColor
  grayColor: GrayColor
  fontFamily: FontFamily
  radius: Radius
  scaling: Scaling
  panelBackground: 'solid' | 'translucent'
}

type ThemeContextType = {
  theme: ThemeConfig
  setAppearance: (v: Appearance) => void
  setAccentColor: (v: AccentColor) => void
  setGrayColor: (v: GrayColor) => void
  setFontFamily: (v: FontFamily) => void
  setRadius: (v: Radius) => void
  setScaling: (v: Scaling) => void
  setPanelBackground: (v: 'solid' | 'translucent') => void
}

const defaultTheme: ThemeConfig = {
  appearance: 'light',
  accentColor: 'indigo',
  grayColor: 'slate',
  fontFamily: 'inter',
  radius: 'medium',
  scaling: '100%',
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
    localStorage.setItem('zira-theme', JSON.stringify(theme))

    const fontMap: Record<FontFamily, string> = {
      'inter': "'Inter', sans-serif",
      'dm-sans': "'DM Sans', sans-serif",
      'nunito': "'Nunito Sans', sans-serif",
      'public-sans': "'Public Sans', sans-serif",
    }

    document.body.style.fontFamily = fontMap[theme.fontFamily]
  }, [theme])

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
      setScaling: (v) => update('scaling', v),
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
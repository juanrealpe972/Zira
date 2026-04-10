import type { Metadata } from 'next'
import { ThemeProvider } from '@/context/ThemeContext'
import { ThemeWrapper } from '@/components/ui/ThemeWrapper'
import { Inter, DM_Sans, Nunito_Sans, Public_Sans } from 'next/font/google'
import '@radix-ui/themes/styles.css'
import './globals.css'

export const metadata: Metadata = {
  title: { template: '%s | Zira', default: 'Zira' },
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const nunito = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito' })
const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} ${nunito.variable} ${publicSans.variable}`}>
      <body>
        <ThemeProvider>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
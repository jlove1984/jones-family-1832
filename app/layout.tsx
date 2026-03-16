import type { Metadata } from 'next'
import { Playfair_Display, Inter, Fira_Code } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Jones Family Hub - Connecting Family Since 1832',
    template: '%s | Jones Family Hub',
  },
  description: 'Official website of the Jones Family. Discover our heritage, celebrate achievements, and stay connected with family events.',
  keywords: ['Jones Family', 'Family Reunion', 'Family Heritage', 'Genealogy'],
  authors: [{ name: 'Jones Family Reunion Committee' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} ${firaCode.variable} font-body antialiased bg-off-white dark:bg-rich-black text-charcoal dark:text-light-text theme-transition`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="flex min-h-screen flex-col">{children}</div>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}

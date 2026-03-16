'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const THEME_SHORTCUT_KEY = 'd'
const THEME_MODIFIER = 'Shift'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === THEME_SHORTCUT_KEY) {
        e.preventDefault()
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mounted, resolvedTheme, setTheme])

  const isLight = resolvedTheme === 'light'
  const tooltipText = isLight ? 'Switch to dark mode (Ctrl+Shift+D)' : 'Switch to light mode (Ctrl+Shift+D)'
  const ariaLabel = isLight ? 'Switch to dark mode' : 'Switch to light mode'

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-light-gray/50 dark:hover:bg-dark-gray transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light focus:ring-offset-2"
        aria-label={ariaLabel}
        title={tooltipText}
      >
        <Sun className="h-6 w-6 text-legacy-gold-DEFAULT dark:text-legacy-gold-bright" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-light-gray/50 dark:hover:bg-dark-gray hover:scale-105 transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light focus:ring-offset-2"
      aria-label={ariaLabel}
      title={tooltipText}
    >
      {isLight ? (
        <Moon className="h-6 w-6 text-legacy-gold-DEFAULT dark:text-charcoal" />
      ) : (
        <Sun className="h-6 w-6 text-legacy-gold-bright dark:text-legacy-gold-bright" />
      )}
    </button>
  )
}

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

  const topBarButtonClass =
    'inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-rich-black hover:bg-light-gray/60 dark:hover:bg-medium-gray/60'

  if (!mounted) {
    return (
      <button
        type="button"
        className={topBarButtonClass}
        aria-label={ariaLabel}
        title={tooltipText}
      >
        <Sun className="size-6 text-legacy-gold-DEFAULT dark:text-legacy-gold-bright" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className={topBarButtonClass}
      aria-label={ariaLabel}
      title={tooltipText}
    >
      {isLight ? (
        <Moon className="size-6 text-legacy-gold-DEFAULT dark:text-charcoal" />
      ) : (
        <Sun className="size-6 text-legacy-gold-bright dark:text-legacy-gold-bright" />
      )}
    </button>
  )
}

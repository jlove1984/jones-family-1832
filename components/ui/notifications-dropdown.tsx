'use client'

import * as React from 'react'
import { Bell } from 'lucide-react'

const topBarButtonClass =
  'inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-rich-black hover:bg-light-gray/60 dark:hover:bg-medium-gray/60'

/**
 * NextAdmin-style notifications: bell icon with dropdown (empty state for now).
 */
export function NotificationsDropdown() {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={topBarButtonClass}
        aria-label="Notifications"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Bell className="size-6 text-charcoal dark:text-light-text" />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 w-72 rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray py-2 shadow-card dark:shadow-card-dark"
          role="menu"
        >
          <div className="px-4 py-2 border-b border-light-gray dark:border-medium-gray">
            <span className="text-sm font-semibold text-charcoal dark:text-light-text">
              Notifications
            </span>
          </div>
          <div className="px-4 py-8 text-center text-sm text-slate-gray dark:text-muted-text">
            No notifications yet
          </div>
        </div>
      )}
    </div>
  )
}

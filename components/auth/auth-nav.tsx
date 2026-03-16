'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, LayoutDashboard, LogOut, User, Settings } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import * as React from 'react'

const topBarButtonClass =
  'inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-rich-black hover:bg-light-gray/60 dark:hover:bg-medium-gray/60'

function getInitials(name: string | null | undefined): string {
  if (!name || !name.trim()) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

/**
 * NextAdmin-style user profile: avatar (initials) + dropdown (Dashboard, Log out).
 * When not logged in, shows a single "Log in" button.
 */
export function AuthNav() {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()
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

  async function handleSignOut() {
    setOpen(false)
    await authClient.signOut()
    router.push('/')
    router.refresh()
  }

  if (isPending) {
    return (
      <span className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-light-gray/50 dark:bg-medium-gray/50" />
    )
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-lg bg-heritage-green-DEFAULT dark:bg-heritage-green-light px-4 py-2 text-sm font-semibold text-white dark:text-rich-black shadow-button hover:opacity-90 transition-colors"
      >
        Log in
      </Link>
    )
  }

  const initials = getInitials(session.user.name ?? session.user.email)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-2 transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-rich-black hover:bg-light-gray/60 dark:hover:bg-medium-gray/60"
        aria-label="User menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span
          className="flex size-8 items-center justify-center rounded-full bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-sm font-medium text-white dark:text-rich-black"
          aria-hidden
        >
          {initials}
        </span>
        <ChevronDown className="size-5 text-charcoal dark:text-light-text" />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray py-1 shadow-card dark:shadow-card-dark"
          role="menu"
        >
          <div className="border-b border-light-gray dark:border-medium-gray px-4 py-3">
            <p className="text-sm font-medium text-charcoal dark:text-light-text truncate">
              {session.user.name ?? 'User'}
            </p>
            {session.user.email && (
              <p className="text-xs text-slate-gray dark:text-muted-text truncate">
                {session.user.email}
              </p>
            )}
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal dark:text-light-text hover:bg-light-gray/50 dark:hover:bg-medium-gray/50"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal dark:text-light-text hover:bg-light-gray/50 dark:hover:bg-medium-gray/50"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <User className="size-4" />
            View profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal dark:text-light-text hover:bg-light-gray/50 dark:hover:bg-medium-gray/50"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <Settings className="size-4" />
            Account settings
          </Link>
          <button
            type="button"
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-charcoal dark:text-light-text hover:bg-light-gray/50 dark:hover:bg-medium-gray/50"
            role="menuitem"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

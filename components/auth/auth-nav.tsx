'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthNav() {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push('/')
    router.refresh()
  }

  if (isPending) {
    return (
      <span className="hidden sm:inline-block h-9 w-20 animate-pulse rounded-lg bg-light-gray/50 dark:bg-medium-gray/50" />
    )
  }

  if (session?.user) {
    return (
      <div className="hidden sm:flex items-center gap-3">
        <span className="text-sm text-slate-gray dark:text-muted-text">{session.user.name}</span>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
        >
          Dashboard
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg border border-light-gray dark:border-medium-gray px-3 py-1.5 text-sm font-medium hover:bg-light-gray/50 dark:hover:bg-medium-gray/50"
        >
          Log out
        </button>
      </div>
    )
  }

  return (
    <Link
      href="/login"
      className="hidden sm:inline-flex items-center justify-center rounded-lg bg-heritage-green-DEFAULT dark:bg-heritage-green-light px-4 py-2 text-sm font-semibold text-white dark:text-rich-black shadow-button hover:opacity-90 transition-colors"
    >
      Log in
    </Link>
  )
}

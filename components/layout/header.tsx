import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { TopBarSearch } from '@/components/ui/top-bar-search'
import { NotificationsDropdown } from '@/components/ui/notifications-dropdown'
import { AuthNav } from '@/components/auth/auth-nav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-gray dark:border-medium-gray bg-white/95 dark:bg-rich-black/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-6 lg:gap-8">
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-display font-bold text-heritage-green-DEFAULT dark:text-heritage-green-light">
              Jones Family
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light">
              Home
            </Link>
            <Link href="/history" className="transition-colors hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light">
              History
            </Link>
            <Link href="/reunion" className="transition-colors hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light">
              Reunion 2027
            </Link>
            <Link href="/gallery" className="transition-colors hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light">
              Gallery
            </Link>
            <Link href="/directory" className="transition-colors hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light">
              Directory
            </Link>
            <Link href="/achievements" className="transition-colors hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light">
              Achievements
            </Link>
          </nav>
        </div>

        {/* NextAdmin-style right cluster: Search, Notifications, Theme, User */}
        <div className="flex shrink-0 items-center gap-1">
          <TopBarSearch />
          <NotificationsDropdown />
          <ThemeToggle />
          <AuthNav />
        </div>
      </div>
    </header>
  )
}

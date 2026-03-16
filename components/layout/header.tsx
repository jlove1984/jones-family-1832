import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-gray dark:border-medium-gray bg-white/95 dark:bg-rich-black/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-heritage-green-DEFAULT dark:text-heritage-green-light">
              Jones Family
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
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

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-heritage-green-DEFAULT dark:bg-heritage-green-light px-4 py-2 text-sm font-semibold text-white dark:text-rich-black shadow-button hover:opacity-90 transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  )
}

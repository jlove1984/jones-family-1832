import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'

/**
 * Auth layout inspired by dash.better-auth.com/sign-in:
 * Full-viewport split: left = brand panel, right = form area. No header/footer.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: brand panel — hidden on small screens */}
      <aside
        className="hidden md:flex md:w-[min(48%,480px)] flex-col justify-between bg-gradient-to-br from-heritage-green-DEFAULT to-heritage-green-light p-10 text-white"
        aria-hidden
      >
        <div>
          <Link
            href="/"
            className="text-2xl font-display font-bold text-white/95 hover:text-white transition-colors"
          >
            Jones Family Hub
          </Link>
        </div>
        <div>
          <p className="text-lg font-medium text-white/95">
            Connect with family. Share moments. Stay close.
          </p>
          <p className="mt-2 text-sm text-white/80">
            Sign in or create an account to access the directory, gallery, and more.
          </p>
        </div>
      </aside>

      {/* Right: form area */}
      <div className="flex-1 flex flex-col min-h-screen bg-white dark:bg-rich-black">
        <div className="flex items-center justify-between px-4 py-4 md:px-8 md:py-6">
          <Link
            href="/"
            className="text-lg font-display font-semibold text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline md:hidden"
          >
            Jones Family Hub
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              className="text-sm text-slate-gray dark:text-muted-text hover:text-charcoal dark:hover:text-light-text hover:underline"
            >
              Back to home
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 py-8 md:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}

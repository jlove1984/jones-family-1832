import Link from 'next/link'

export const metadata = {
  title: 'Log in',
  description: 'Log in to Jones Family Hub',
}

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark">
        <h1 className="text-2xl font-display font-semibold mb-6">Log in</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          Authentication will be implemented with Better Auth. Use the links below to register or return home.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/register"
            className="inline-flex justify-center rounded-lg border-2 border-heritage-green-DEFAULT dark:border-heritage-green-light px-4 py-2 text-center font-semibold text-heritage-green-DEFAULT dark:text-heritage-green-light"
          >
            Create account
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center rounded-lg bg-heritage-green-DEFAULT px-4 py-2 text-center font-semibold text-white hover:bg-heritage-green-DEFAULT/90"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

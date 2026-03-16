import Link from 'next/link'

export const metadata = {
  title: 'Dashboard',
  description: 'Your Jones Family Hub dashboard',
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark text-center">
        <h1 className="text-2xl font-display font-semibold mb-4">Dashboard</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          Your RSVP status, payment history, and quick links will appear here once authentication and APIs are implemented.
        </p>
        <Link href="/" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-semibold hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

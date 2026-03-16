import Link from 'next/link'

export const metadata = {
  title: 'Birthdays',
  description: 'Family birthdays calendar (login required)',
}

export default function BirthdaysPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark text-center">
        <h1 className="text-2xl font-display font-semibold mb-4">Birthdays</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          Monthly calendar view and birthday wishes will be available here once the birthdays API is implemented (auth required).
        </p>
        <Link href="/" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-semibold hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

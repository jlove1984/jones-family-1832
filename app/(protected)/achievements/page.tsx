import Link from 'next/link'

export const metadata = {
  title: 'Achievements',
  description: 'Family achievements and milestones',
}

export default function AchievementsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark text-center">
        <h1 className="text-2xl font-display font-semibold mb-4">Achievements</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          View and submit family achievements (graduations, weddings, new babies, etc.). Grid and timeline views will be available once the API is implemented.
        </p>
        <Link href="/" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-semibold hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

import Link from 'next/link'

export const metadata = {
  title: 'Reunion 2027',
  description: 'Jones Family Reunion 2027 — dates, location, RSVP',
}

export default function ReunionPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark">
        <h1 className="text-2xl font-display font-semibold mb-4">Reunion 2027</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          Event details, travel and lodging, daily itinerary, and the public RSVP form will be sourced from reunion content once the API is implemented.
        </p>
        <Link href="/" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-semibold hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

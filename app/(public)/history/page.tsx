import Link from 'next/link'

export const metadata = {
  title: 'Family History',
  description: 'Jones family lineage since 1832',
}

export default function HistoryPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark">
        <h1 className="text-2xl font-display font-semibold mb-4">Family History</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          Chronological lineage from 1832 to present and image-rich storytelling will be added from static markdown/MDX or CMS per the Technical Design Document.
        </p>
        <Link href="/" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-semibold hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

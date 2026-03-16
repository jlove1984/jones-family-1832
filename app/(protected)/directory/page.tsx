import Link from 'next/link'

export const metadata = {
  title: 'Family Directory',
  description: 'Family member directory (login required)',
}

export default function DirectoryPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark text-center">
        <h1 className="text-2xl font-display font-semibold mb-4">Family Directory</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          The directory is protected. Once authentication is implemented, you will be able to search and view family members here.
        </p>
        <Link href="/" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-semibold hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

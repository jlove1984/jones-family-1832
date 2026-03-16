import Link from 'next/link'

export const metadata = {
  title: 'Contact',
  description: 'Contact the Jones Family Reunion Committee',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark">
        <h1 className="text-2xl font-display font-semibold mb-4">Contact Us</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          The contact form with category selector (Directory, Reunion, Payments, Media) and email routing will be implemented with the contact API.
        </p>
        <Link href="/" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-semibold hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

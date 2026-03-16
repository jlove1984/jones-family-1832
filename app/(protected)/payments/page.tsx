import Link from 'next/link'

export const metadata = {
  title: 'Payments',
  description: 'Reunion dues and donations',
}

export default function PaymentsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark text-center">
        <h1 className="text-2xl font-display font-semibold mb-4">Payments</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          Reunion dues (Adult, Youth, Senior) and optional donations will be processed via Stripe once the payments API is implemented.
        </p>
        <Link href="/" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-semibold hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

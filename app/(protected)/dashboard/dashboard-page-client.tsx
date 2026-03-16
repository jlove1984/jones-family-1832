'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { StatCard } from '@/components/ui/stat-card'
import { Alert } from '@/components/ui/alert'
import { ButtonLink } from '@/components/ui/button'
import { CardSkeleton } from '@/components/ui/loading-skeleton'

type Summary = {
  rsvp: { attending: boolean; adultsCount: number; childrenCount: number } | null
  lastPayment: { amount: number; paymentType: string; status: string; createdAt: string } | null
  hasProfile: boolean
  reunionYear: number
}

export function DashboardPageClient() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/dashboard/summary')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load')
        return res.json()
      })
      .then(setSummary)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <PageHeader
        title="Dashboard"
        actions={<ButtonLink variant="tertiary" size="sm" href="/">Back to home</ButtonLink>}
      />

      {error && (
        <div className="mb-4">
          <Alert variant="error" description={error} />
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : summary ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Reunion RSVP"
              value={
                summary.rsvp
                  ? summary.rsvp.attending
                    ? `Yes — ${summary.rsvp.adultsCount} adult(s), ${summary.rsvp.childrenCount} child(ren)`
                    : 'Not attending'
                  : 'Not submitted'
              }
              href="/reunion"
              linkLabel="Update RSVP"
            />
            <StatCard
              label="Last payment"
              value={
                summary.lastPayment
                  ? `$${summary.lastPayment.amount} ${summary.lastPayment.paymentType} — ${summary.lastPayment.status}`
                  : 'None yet'
              }
              href="/payments"
              linkLabel="View payments"
            />
            <StatCard
              label="Directory profile"
              value={summary.hasProfile ? 'Complete' : 'Not set up'}
              href="/directory"
              linkLabel={summary.hasProfile ? 'Edit profile' : 'Add profile'}
            />
          </div>

          <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
            <h2 className="text-lg font-display font-semibold mb-4">Quick links</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/directory" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-medium hover:underline">
                Directory
              </Link>
              <Link href="/achievements" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-medium hover:underline">
                Achievements
              </Link>
              <Link href="/gallery" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-medium hover:underline">
                Gallery
              </Link>
              <Link href="/reunion" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-medium hover:underline">
                Reunion {summary.reunionYear}
              </Link>
              <Link href="/payments" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-medium hover:underline">
                Payments
              </Link>
              <Link href="/birthdays" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-medium hover:underline">
                Birthdays
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

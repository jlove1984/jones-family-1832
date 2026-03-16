'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-display font-semibold">Dashboard</h1>
        <Link href="/" className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
          Back to home
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-card border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-gray dark:text-muted-text py-8">Loading…</p>
      ) : summary ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
              <h2 className="text-sm font-semibold text-slate-gray dark:text-muted-text mb-2">Reunion RSVP</h2>
              {summary.rsvp ? (
                <p className="font-medium">
                  {summary.rsvp.attending
                    ? `Yes — ${summary.rsvp.adultsCount} adult(s), ${summary.rsvp.childrenCount} child(ren)`
                    : 'Not attending'}
                </p>
              ) : (
                <p className="text-slate-gray dark:text-muted-text">Not submitted</p>
              )}
              <Link href="/reunion" className="mt-2 inline-block text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
                Update RSVP →
              </Link>
            </div>
            <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
              <h2 className="text-sm font-semibold text-slate-gray dark:text-muted-text mb-2">Last payment</h2>
              {summary.lastPayment ? (
                <p className="font-medium">
                  ${summary.lastPayment.amount} {summary.lastPayment.paymentType} — {summary.lastPayment.status}
                </p>
              ) : (
                <p className="text-slate-gray dark:text-muted-text">None yet</p>
              )}
              <Link href="/payments" className="mt-2 inline-block text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
                View payments →
              </Link>
            </div>
            <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
              <h2 className="text-sm font-semibold text-slate-gray dark:text-muted-text mb-2">Directory profile</h2>
              <p className="font-medium">{summary.hasProfile ? 'Complete' : 'Not set up'}</p>
              <Link href="/directory" className="mt-2 inline-block text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
                {summary.hasProfile ? 'Edit profile →' : 'Add profile →'}
              </Link>
            </div>
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

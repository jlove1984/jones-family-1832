'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Birthday } from '@/types'

export function BirthdaysPageClient() {
  const [upcoming, setUpcoming] = useState<Birthday[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [wishFor, setWishFor] = useState<Birthday | null>(null)
  const [wishMessage, setWishMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    fetch('/api/birthdays/upcoming')
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 401 ? 'Please log in.' : 'Failed to load')
        return res.json()
      })
      .then(setUpcoming)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }, [])

  async function sendWish(e: React.FormEvent) {
    e.preventDefault()
    if (!wishFor || !wishMessage.trim()) return
    setSending(true)
    setError(null)
    try {
      const res = await fetch(`/api/birthdays/${wishFor.memberId}/wish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: wishMessage.trim() }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Failed to send')
      }
      setSent(true)
      setWishFor(null)
      setWishMessage('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-display font-semibold">Birthdays</h1>
        <Link href="/" className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
          Back to home
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-card border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}
      {sent && (
        <div className="mb-4 rounded-card border border-heritage-green-DEFAULT/50 dark:border-heritage-green-light/50 bg-green-50 dark:bg-green-950/20 p-4 text-heritage-green-DEFAULT dark:text-heritage-green-light">
          Wish sent!
        </div>
      )}

      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
        <h2 className="text-lg font-display font-semibold mb-4">Upcoming (next 7 days)</h2>
        {loading ? (
          <p className="text-slate-gray dark:text-muted-text">Loading…</p>
        ) : upcoming.length === 0 ? (
          <p className="text-slate-gray dark:text-muted-text">No upcoming birthdays in the next 7 days.</p>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {b.photo ? (
                    <img src={b.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted dark:bg-medium-gray flex items-center justify-center text-sm font-semibold text-heritage-green-DEFAULT dark:text-heritage-green-light">
                      {(b.name || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{b.name || '—'}</p>
                    <p className="text-sm text-slate-gray dark:text-muted-text">
                      {new Date(b.birthdate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setWishFor(b)}
                  className="text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
                >
                  Send wish
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {wishFor && (
        <div className="mt-6 rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
          <h3 className="font-display font-semibold mb-2">Birthday wish for {wishFor.name}</h3>
          <form onSubmit={sendWish} className="space-y-2">
            <textarea
              value={wishMessage}
              onChange={(e) => setWishMessage(e.target.value)}
              placeholder="Write a message…"
              rows={3}
              autoComplete="off"
              className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={sending}
                className="rounded-md bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white px-4 py-2 text-sm font-medium disabled:opacity-50"
              >
                {sending ? 'Sending…' : 'Send wish'}
              </button>
              <button type="button" onClick={() => { setWishFor(null); setWishMessage('') }} className="text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AchievementCard, CATEGORIES } from '@/components/features/achievements/achievement-card'
import { AchievementSubmitForm } from '@/components/features/achievements/achievement-submit-form'
import type { Achievement } from '@/types'

export function AchievementsPageClient() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [pending, setPending] = useState<Achievement[]>([])
  const [category, setCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showForm, setShowForm] = useState(false)

  function loadList() {
    const params = category ? `?category=${encodeURIComponent(category)}` : ''
    setLoading(true)
    setError(null)
    fetch(`/api/achievements${params}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load')
        return res.json()
      })
      .then(setAchievements)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }

  function loadPending() {
    fetch('/api/achievements?status=pending')
      .then((res) => {
        if (res.status === 403) return []
        if (!res.ok) return []
        return res.json()
      })
      .then(setPending)
  }

  useEffect(() => {
    loadList()
  }, [category])

  useEffect(() => {
    fetch('/api/achievements?status=pending')
      .then((res) => {
        if (res.ok) {
          setIsAdmin(true)
          return res.json()
        }
        return []
      })
      .then(setPending)
      .catch(() => {})
  }, [])

  function handleApprove(id: string) {
    fetch(`/api/achievements/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved' }),
    }).then(() => {
      loadPending()
      loadList()
    })
  }

  function handleReject(id: string) {
    fetch(`/api/achievements/${id}`, { method: 'DELETE' }).then(() => {
      loadPending()
    })
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-display font-semibold">Achievements</h1>
        <div className="flex gap-2">
          <Link href="/" className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
          >
            {showForm ? 'Cancel' : 'Submit achievement'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-8 rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
          <h2 className="text-lg font-display font-semibold mb-4">Submit an achievement</h2>
          <AchievementSubmitForm onSuccess={() => { loadList(); setShowForm(false) }} />
        </div>
      )}

      {isAdmin && pending.length > 0 && (
        <div className="mb-8 rounded-card border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-6">
          <h2 className="text-lg font-display font-semibold mb-4">Pending approval</h2>
          <ul className="space-y-4">
            {pending.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center gap-4 justify-between border-b border-amber-200 dark:border-amber-800 pb-4 last:border-0">
                <div>
                  <span className="text-xs text-heritage-green-DEFAULT dark:text-heritage-green-light font-medium">{a.category}</span>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-slate-gray dark:text-muted-text">{a.achievementDate}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleApprove(a.id)}
                    className="rounded-md bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white px-3 py-1.5 text-sm"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(a.id)}
                    className="rounded-md border border-red-500 text-red-600 dark:text-red-400 px-3 py-1.5 text-sm"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="achievements-category" className="sr-only">Filter by category</label>
        <select
          id="achievements-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-card border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4 text-red-700 dark:text-red-300 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-gray dark:text-muted-text py-8">Loading…</p>
      ) : achievements.length === 0 ? (
        <p className="text-slate-gray dark:text-muted-text py-8">No achievements yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      )}
    </div>
  )
}

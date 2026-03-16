'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DirectoryTable } from '@/components/features/directory/directory-table'
import { DirectoryCardList } from '@/components/features/directory/directory-card-list'
import type { Member } from '@/types'

export function DirectoryPageClient() {
  const [members, setMembers] = useState<Member[]>([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = query ? `/api/directory?q=${encodeURIComponent(query)}` : '/api/directory'
    setLoading(true)
    setError(null)
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 401 ? 'Please log in.' : 'Failed to load directory')
        return res.json()
      })
      .then(setMembers)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-display font-semibold">Family Directory</h1>
        <Link
          href="/"
          className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
        >
          ← Back to home
        </Link>
      </div>

      <div className="mb-6">
        <label htmlFor="directory-search" className="sr-only">
          Search directory
        </label>
        <input
          id="directory-search"
          type="search"
          placeholder="Search by name, email, branch, city, state…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setQuery(search)}
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-4 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => setQuery(search)}
          className="mt-2 rounded-md bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Search
        </button>
      </div>

      {error && (
        <div className="rounded-card border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-gray dark:text-muted-text py-8">Loading…</p>
      ) : (
        <>
          <div className="hidden md:block">
            <DirectoryTable members={members} />
          </div>
          <div className="md:hidden">
            <DirectoryCardList members={members} />
          </div>
        </>
      )}
    </div>
  )
}

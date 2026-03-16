'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { GalleryAlbum } from '@/types'

export function GalleryPageClient() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [createTitle, setCreateTitle] = useState('')
  const [createYear, setCreateYear] = useState('')
  const [creating, setCreating] = useState(false)

  function loadAlbums() {
    setLoading(true)
    fetch('/api/gallery/albums')
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 401 ? 'Please log in.' : 'Failed to load')
        return res.json()
      })
      .then(setAlbums)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadAlbums()
    fetch('/api/achievements?status=pending')
      .then((res) => { if (res.ok) setIsAdmin(true) })
      .catch(() => {})
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!createTitle.trim()) return
    setCreating(true)
    try {
      const res = await fetch('/api/gallery/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: createTitle.trim(),
          year: createYear ? parseInt(createYear, 10) : null,
        }),
      })
      if (!res.ok) throw new Error('Failed to create')
      const album = await res.json()
      setAlbums((prev) => [album, ...prev])
      setCreateTitle('')
      setCreateYear('')
      setShowCreate(false)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-display font-semibold">Photo Gallery</h1>
        <div className="flex gap-4">
          {isAdmin && (
            <>
              {!showCreate ? (
                <button type="button" onClick={() => setShowCreate(true)} className="text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
                  Create album
                </button>
              ) : (
                <form onSubmit={handleCreate} className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="Album title"
                    value={createTitle}
                    onChange={(e) => setCreateTitle(e.target.value)}
                    className="rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-1.5 text-sm w-40"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    value={createYear}
                    onChange={(e) => setCreateYear(e.target.value)}
                    min={1900}
                    max={2100}
                    className="rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-1.5 text-sm w-24"
                  />
                  <button type="submit" disabled={creating} className="rounded-md bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white px-3 py-1.5 text-sm disabled:opacity-50">
                    Create
                  </button>
                  <button type="button" onClick={() => setShowCreate(false)} className="text-sm">Cancel</button>
                </form>
              )}
            </>
          )}
          <Link href="/" className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
            Back to home
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-card border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4 text-red-700 dark:text-red-300 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-gray dark:text-muted-text py-8">Loading…</p>
      ) : albums.length === 0 ? (
        <p className="text-slate-gray dark:text-muted-text py-8">No albums yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <Link
              key={album.id}
              href={`/gallery/${album.id}`}
              className="block rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray overflow-hidden shadow-card dark:shadow-card-dark hover:border-heritage-green-DEFAULT/50 dark:hover:border-heritage-green-light/50 transition-colors"
            >
              {album.coverPhotoUrl ? (
                <div className="aspect-video bg-muted dark:bg-medium-gray">
                  <img src={album.coverPhotoUrl} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video bg-muted dark:bg-medium-gray flex items-center justify-center text-heritage-green-DEFAULT dark:text-heritage-green-light">
                  <span className="text-4xl">📷</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="font-display font-semibold">{album.title}</h2>
                {(album.year || album.category) && (
                  <p className="text-sm text-slate-gray dark:text-muted-text mt-0.5">
                    {[album.year, album.category].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

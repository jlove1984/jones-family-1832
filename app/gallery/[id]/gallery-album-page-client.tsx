'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { GalleryAlbum, GalleryMedia } from '@/types'

type AlbumWithMedia = GalleryAlbum & { media: GalleryMedia[] }

export function GalleryAlbumPageClient({
  album,
  isAdmin,
}: {
  album: AlbumWithMedia
  isAdmin: boolean
}) {
  const [mediaList, setMediaList] = useState(album.media)
  const [showAddForm, setShowAddForm] = useState(false)
  const [addUrl, setAddUrl] = useState('')
  const [addCaption, setAddCaption] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAddMedia(e: React.FormEvent) {
    e.preventDefault()
    if (!addUrl.trim()) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(`/api/gallery/albums/${album.id}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaUrl: addUrl.trim(),
          mediaType: addUrl.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image',
          caption: addCaption.trim() || null,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Failed to add')
      }
      const item = await res.json()
      setMediaList((prev) => [...prev, item])
      setAddUrl('')
      setAddCaption('')
      setShowAddForm(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteMedia(mediaId: string) {
    if (!confirm('Delete this item?')) return
    const res = await fetch(`/api/gallery/media/${mediaId}`, { method: 'DELETE' })
    if (res.ok) setMediaList((prev) => prev.filter((m) => m.id !== mediaId))
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <Link href="/gallery" className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline mb-6 inline-block">
        ← Back to gallery
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold">{album.title}</h1>
        {(album.year || album.category) && (
          <p className="text-slate-gray dark:text-muted-text mt-1">
            {[album.year, album.category].filter(Boolean).join(' · ')}
          </p>
        )}
        {album.description && (
          <p className="text-sm text-slate-gray dark:text-muted-text mt-2">{album.description}</p>
        )}
      </div>

      {isAdmin && (
        <div className="mb-6 rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-4 shadow-card dark:shadow-card-dark">
          {!showAddForm ? (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
            >
              + Add photo or video (URL)
            </button>
          ) : (
            <form onSubmit={handleAddMedia} className="space-y-2">
              <input
                type="url"
                placeholder="Image or video URL"
                value={addUrl}
                onChange={(e) => setAddUrl(e.target.value)}
                autoComplete="url"
                className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
                required
              />
              <input
                type="text"
                placeholder="Caption (optional)"
                value={addCaption}
                onChange={(e) => setAddCaption(e.target.value)}
                autoComplete="off"
                className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-md bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white px-3 py-1.5 text-sm disabled:opacity-50"
                >
                  Add
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} className="text-sm">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {mediaList.length === 0 ? (
        <p className="text-slate-gray dark:text-muted-text py-8">No photos or videos in this album yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mediaList.map((m) => (
            <div key={m.id} className="relative group rounded-card border border-light-gray dark:border-medium-gray overflow-hidden shadow-card dark:shadow-card-dark">
              {m.mediaType === 'video' ? (
                <video src={m.mediaUrl} controls className="w-full aspect-video object-cover" />
              ) : (
                <img src={m.mediaUrl} alt={m.caption ?? ''} className="w-full aspect-video object-cover" />
              )}
              {m.caption && (
                <p className="p-2 text-sm text-slate-gray dark:text-muted-text">{m.caption}</p>
              )}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => handleDeleteMedia(m.id)}
                  className="absolute top-2 right-2 rounded bg-red-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

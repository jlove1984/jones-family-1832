'use client'

import Link from 'next/link'
import type { Member } from '@/types'

export function DirectoryCardList({ members }: { members: Member[] }) {
  if (members.length === 0) {
    return (
      <p className="text-slate-gray dark:text-muted-text text-center py-8">
        No members found.
      </p>
    )
  }
  return (
    <ul className="space-y-4">
      {members.map((m) => (
        <li key={m.id}>
          <Link
            href={`/directory/${m.id}`}
            className="block rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-4 shadow-card dark:shadow-card-dark hover:border-heritage-green-DEFAULT/50 dark:hover:border-heritage-green-light/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              {m.photo ? (
                <img
                  src={m.photo}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-muted dark:bg-medium-gray flex-shrink-0 flex items-center justify-center text-lg font-semibold text-heritage-green-DEFAULT dark:text-heritage-green-light">
                  {(m.name || '?').charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-heritage-green-DEFAULT dark:text-heritage-green-light">
                  {m.name || '—'}
                </p>
                <p className="text-sm text-slate-gray dark:text-muted-text mt-0.5">
                  {m.branch || 'No branch'}
                </p>
                <p className="text-sm text-slate-gray dark:text-muted-text truncate">
                  {[m.city, m.state].filter(Boolean).join(', ') || '—'}
                </p>
              </div>
              <span className="text-xs text-heritage-green-DEFAULT dark:text-heritage-green-light font-medium flex-shrink-0">
                View profile →
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

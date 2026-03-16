'use client'

import Link from 'next/link'
import type { Member } from '@/types'

export function DirectoryTable({ members }: { members: Member[] }) {
  if (members.length === 0) {
    return (
      <p className="text-slate-gray dark:text-muted-text text-center py-8">
        No members found.
      </p>
    )
  }
  return (
    <div className="overflow-x-auto rounded-card border border-light-gray dark:border-medium-gray shadow-card dark:shadow-card-dark">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-light-gray dark:border-medium-gray bg-muted/50 dark:bg-rich-black/50">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold hidden sm:table-cell">Branch</th>
            <th className="px-4 py-3 font-semibold hidden md:table-cell">Location</th>
            <th className="px-4 py-3 font-semibold hidden lg:table-cell">Contact</th>
            <th className="px-4 py-3 font-semibold w-24">Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr
              key={m.id}
              className="border-b border-light-gray dark:border-medium-gray last:border-0 hover:bg-muted/30 dark:hover:bg-rich-black/30"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/directory/${m.id}`}
                  className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-medium hover:underline"
                >
                  {m.name || '—'}
                </Link>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell text-slate-gray dark:text-muted-text">
                {m.branch || '—'}
              </td>
              <td className="px-4 py-3 hidden md:table-cell text-slate-gray dark:text-muted-text">
                {[m.city, m.state].filter(Boolean).join(', ') || '—'}
              </td>
              <td className="px-4 py-3 hidden lg:table-cell text-slate-gray dark:text-muted-text">
                {m.phone || m.email || '—'}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/directory/${m.id}`}
                  className="text-heritage-green-DEFAULT dark:text-heritage-green-light text-xs font-medium hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

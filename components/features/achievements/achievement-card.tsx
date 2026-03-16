'use client'

import type { Achievement } from '@/types'

const CATEGORIES: Achievement['category'][] = [
  'New Baby',
  'Graduation',
  'Wedding',
  'Promotion',
  'Military',
  'Memorial',
]

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const a = achievement
  return (
    <article className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray overflow-hidden shadow-card dark:shadow-card-dark">
      {a.photoUrl && (
        <div className="aspect-video bg-muted dark:bg-medium-gray">
          <img
            src={a.photoUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <span className="text-xs font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light uppercase tracking-wide">
          {a.category}
        </span>
        <h2 className="text-lg font-display font-semibold mt-1">{a.title}</h2>
        <p className="text-sm text-slate-gray dark:text-muted-text mt-0.5">
          {a.achievementDate}
        </p>
        {a.description && (
          <p className="text-sm text-slate-gray dark:text-muted-text mt-2 line-clamp-3">
            {a.description}
          </p>
        )}
      </div>
    </article>
  )
}

export { CATEGORIES }

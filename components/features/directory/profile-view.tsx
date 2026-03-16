'use client'

import type { FamilyMember } from '@/types'

type ProfileWithUser = FamilyMember & { name?: string; email?: string }

export function ProfileView({ profile }: { profile: ProfileWithUser }) {
  const p = profile
  return (
    <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {p.profilePhotoUrl ? (
          <img
            src={p.profilePhotoUrl}
            alt=""
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-muted dark:bg-medium-gray flex items-center justify-center text-2xl font-semibold text-heritage-green-DEFAULT dark:text-heritage-green-light">
            {(p.name || '?').charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="text-xl font-display font-semibold">{p.name || '—'}</h2>
          <p className="text-slate-gray dark:text-muted-text">{p.email || '—'}</p>
          {p.branch && (
            <p className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light mt-1">
              {p.branch}
            </p>
          )}
        </div>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2">
        {p.phone && (
          <>
            <dt className="text-slate-gray dark:text-muted-text text-sm">Phone</dt>
            <dd className="font-medium">{p.phone}</dd>
          </>
        )}
        {p.city != null && (
          <>
            <dt className="text-slate-gray dark:text-muted-text text-sm">City</dt>
            <dd className="font-medium">{p.city}</dd>
          </>
        )}
        {p.state != null && (
          <>
            <dt className="text-slate-gray dark:text-muted-text text-sm">State</dt>
            <dd className="font-medium">{p.state}</dd>
          </>
        )}
        {p.householdSize != null && (
          <>
            <dt className="text-slate-gray dark:text-muted-text text-sm">Household size</dt>
            <dd className="font-medium">{p.householdSize}</dd>
          </>
        )}
        {p.birthDate && (
          <>
            <dt className="text-slate-gray dark:text-muted-text text-sm">Birth date</dt>
            <dd className="font-medium">{p.birthDate}</dd>
          </>
        )}
        {p.birthYear != null && (
          <>
            <dt className="text-slate-gray dark:text-muted-text text-sm">Birth year</dt>
            <dd className="font-medium">{p.birthYear}</dd>
          </>
        )}
      </dl>

      {p.bio && (
        <div>
          <h3 className="text-sm font-semibold text-slate-gray dark:text-muted-text mb-1">Bio</h3>
          <p className="text-sm whitespace-pre-wrap">{p.bio}</p>
        </div>
      )}
    </div>
  )
}

import Link from 'next/link'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import { redirect } from 'next/navigation'
import { PageHeader } from '@/components/ui/page-header'
import { ButtonLink } from '@/components/ui/button'
import { User, Settings, Users } from 'lucide-react'

export const metadata = {
  title: 'Profile',
  description: 'View your profile and account',
}

function getInitials(name: string | null | undefined): string {
  if (!name || !name.trim()) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export default async function ProfilePage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const { rows } = await sql`
    SELECT id FROM family_members WHERE user_id = ${session.user.id} LIMIT 1
  `
  const profileId = (rows as { id: string }[])[0]?.id ?? null

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <PageHeader
        title="Profile"
        description="Your account and directory profile"
        actions={
          <ButtonLink variant="secondary" size="sm" href="/settings">
            <Settings className="size-4 mr-1.5" />
            Account settings
          </ButtonLink>
        }
      />

      <div className="mt-8 space-y-6">
        <section className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
          <h2 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
            <User className="size-5" />
            Account
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-2xl font-semibold text-white dark:text-rich-black">
              {getInitials(session.user.name ?? session.user.email)}
            </div>
            <div>
              <p className="font-medium text-charcoal dark:text-light-text">
                {session.user.name ?? '—'}
              </p>
              <p className="text-sm text-slate-gray dark:text-muted-text">
                {session.user.email ?? '—'}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/settings"
                  className="text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
                >
                  Account settings →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
          <h2 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
            <Users className="size-5" />
            Directory profile
          </h2>
          {profileId ? (
            <>
              <p className="text-sm text-slate-gray dark:text-muted-text mb-4">
                Your family directory profile is set up. You can view and edit it from the directory.
              </p>
              <ButtonLink variant="primary" size="sm" href={`/directory/${profileId}`}>
                View profile
              </ButtonLink>
              <span className="mx-2 text-slate-gray dark:text-muted-text">or</span>
              <Link
                href={`/directory/${profileId}`}
                className="text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
              >
                Edit profile
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-gray dark:text-muted-text mb-4">
                Add your family directory profile to appear in the directory and share with family.
              </p>
              <ButtonLink variant="primary" size="sm" href="/directory">
                Add directory profile
              </ButtonLink>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

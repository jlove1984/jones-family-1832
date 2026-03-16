import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProfileView } from '@/components/features/directory/profile-view'
import { ProfileForm } from '@/components/features/directory/profile-form'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import type { FamilyMember } from '@/types'

type ProfileWithUser = FamilyMember & { name?: string; email?: string }

function rowToProfile(row: Record<string, unknown>): ProfileWithUser {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    branch: row.branch as string | null,
    phone: row.phone as string | null,
    city: row.city as string | null,
    state: row.state as string | null,
    householdSize: (row.household_size as number) ?? 1,
    profilePhotoUrl: row.profile_photo_url as string | null,
    bio: row.bio as string | null,
    birthDate: row.birth_date != null ? String(row.birth_date).slice(0, 10) : null,
    birthYear: row.birth_year as number | null,
    showBirthday: (row.show_birthday as boolean) ?? true,
    birthdayEmailNotifications: (row.birthday_email_notifications as boolean) ?? true,
    isVisible: (row.is_visible as boolean) ?? true,
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
    name: row.name as string | undefined,
    email: row.email as string | undefined,
  }
}

export default async function DirectoryProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getSession()
  if (!session) {
    notFound()
  }

  const { id } = await params
  const { rows } = await sql`
    SELECT fm.*, u.name, u.email
    FROM family_members fm
    LEFT JOIN users u ON u.id = fm.user_id
    WHERE fm.id = ${id}
  `
  const row = (rows as Record<string, unknown>[])[0]
  if (!row) notFound()

  const isOwner = (row.user_id as string) === session.user.id
  const isVisible = (row.is_visible as boolean) ?? true
  if (!isOwner && !isVisible) notFound()

  const profile = rowToProfile(row as Record<string, unknown>)

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/directory"
        className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline mb-6 inline-block"
      >
        ← Back to directory
      </Link>

      <ProfileView profile={profile} />

      {isOwner && (
        <div className="mt-8 rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
          <h2 className="text-lg font-display font-semibold mb-4">Edit your profile</h2>
          <ProfileForm profile={profile} />
        </div>
      )}
    </div>
  )
}

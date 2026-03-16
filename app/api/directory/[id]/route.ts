/**
 * GET /api/directory/[id] - Get one family member profile (TDD 5.3).
 * PATCH /api/directory/[id] - Update own profile (self-service only).
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import { directoryPatchBodySchema } from '@/lib/validations'
import type { FamilyMember } from '@/types'

function rowToFamilyMember(row: Record<string, unknown>): FamilyMember {
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
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  try {
    const { rows } = await sql`
      SELECT fm.*, u.name, u.email
      FROM family_members fm
      LEFT JOIN users u ON u.id = fm.user_id
      WHERE fm.id = ${id}
    `
    const row = (rows as Record<string, unknown>[])[0]
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const isOwner = (row.user_id as string) === session.user.id
    const isVisible = (row.is_visible as boolean) ?? true
    if (!isOwner && !isVisible) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const member = rowToFamilyMember(row)
    const profile = {
      ...member,
      name: (row.name as string) ?? '',
      email: (row.email as string) ?? '',
    }
    return NextResponse.json(profile)
  } catch (e) {
    console.error('GET /api/directory/[id]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = directoryPatchBodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
  }

  try {
    const { rows } = await sql`SELECT user_id FROM family_members WHERE id = ${id}`
    const row = (rows as Record<string, unknown>[])[0]
    if (!row || (row.user_id as string) !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const u = parsed.data
    await sql`
      UPDATE family_members SET
        branch = COALESCE(${u.branch ?? null}, branch),
        phone = COALESCE(${u.phone ?? null}, phone),
        city = COALESCE(${u.city ?? null}, city),
        state = COALESCE(${u.state ?? null}, state),
        household_size = COALESCE(${u.householdSize ?? null}, household_size),
        profile_photo_url = COALESCE(${u.profilePhotoUrl ?? null}, profile_photo_url),
        bio = COALESCE(${u.bio ?? null}, bio),
        birth_date = ${u.birthDate ?? null},
        birth_year = ${u.birthYear ?? null},
        show_birthday = COALESCE(${u.showBirthday ?? null}, show_birthday),
        birthday_email_notifications = COALESCE(${u.birthdayEmailNotifications ?? null}, birthday_email_notifications),
        is_visible = COALESCE(${u.isVisible ?? null}, is_visible),
        updated_at = NOW()
      WHERE id = ${id}
    `
    const { rows: updatedRows } = await sql`SELECT * FROM family_members WHERE id = ${id}`
    const member = rowToFamilyMember((updatedRows as Record<string, unknown>[])[0])
    return NextResponse.json(member)
  } catch (e) {
    console.error('PATCH /api/directory/[id]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

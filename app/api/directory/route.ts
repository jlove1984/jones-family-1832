/**
 * GET /api/directory - List visible family members (TDD 5.3).
 * Auth required. Returns members with name/email from users join.
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import type { Member } from '@/types'

function rowToMember(row: Record<string, unknown>): Member {
  return {
    id: row.id as string,
    name: (row.name as string) ?? '',
    email: (row.email as string) ?? '',
    phone: row.phone as string | undefined,
    city: row.city as string | undefined,
    state: row.state as string | undefined,
    branch: (row.branch as string) ?? '',
    photo: row.profile_photo_url as string | undefined,
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
  }
}

export async function GET(request: Request) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.trim()

    if (q) {
      const pattern = `%${q}%`
      const { rows } = await sql`
        SELECT fm.id, fm.branch, fm.phone, fm.city, fm.state, fm.profile_photo_url, fm.created_at, fm.updated_at,
               u.name, u.email
        FROM family_members fm
        LEFT JOIN users u ON u.id = fm.user_id
        WHERE fm.is_visible = true
          AND (u.name ILIKE ${pattern} OR u.email ILIKE ${pattern} OR fm.branch ILIKE ${pattern}
               OR fm.city ILIKE ${pattern} OR fm.state ILIKE ${pattern})
        ORDER BY u.name ASC
      `
      const members = (rows as Record<string, unknown>[]).map((r) => rowToMember({ ...r, name: r.name ?? '', email: r.email ?? '' }))
      return NextResponse.json(members)
    }

    const { rows } = await sql`
      SELECT fm.id, fm.branch, fm.phone, fm.city, fm.state, fm.profile_photo_url, fm.created_at, fm.updated_at,
             u.name, u.email
      FROM family_members fm
      LEFT JOIN users u ON u.id = fm.user_id
      WHERE fm.is_visible = true
      ORDER BY u.name ASC
    `
    const members = (rows as Record<string, unknown>[]).map((r) => rowToMember({ ...r, name: r.name ?? '', email: r.email ?? '' }))
    return NextResponse.json(members)
  } catch (e) {
    console.error('GET /api/directory', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

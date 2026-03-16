/**
 * POST /api/birthdays/[id]/wish - Post birthday wish for a family member (auth).
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import { birthdayWishBodySchema } from '@/lib/validations'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id: familyMemberId } = await params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = birthdayWishBodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
  }

  try {
    const { rows: fmRows } = await sql`SELECT id FROM family_members WHERE id = ${familyMemberId}`
    if ((fmRows as unknown[]).length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const { rows } = await sql`
      INSERT INTO birthday_wishes (family_member_id, from_user_id, message)
      VALUES (${familyMemberId}, ${session.user.id}, ${parsed.data.message})
      RETURNING id, family_member_id, created_at
    `
    const row = (rows as Record<string, unknown>[])[0]
    return NextResponse.json({ id: row?.id, familyMemberId, created_at: row?.created_at }, { status: 201 })
  } catch (e) {
    console.error('POST /api/birthdays/[id]/wish', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

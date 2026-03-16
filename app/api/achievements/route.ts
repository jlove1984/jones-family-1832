/**
 * GET /api/achievements - List achievements (approved for all; pending for admin).
 * POST /api/achievements - Submit new achievement (auth required).
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import { achievementPostBodySchema } from '@/lib/validations'
import type { Achievement, AchievementCategory } from '@/types'

function rowToAchievement(row: Record<string, unknown>): Achievement {
  return {
    id: row.id as string,
    familyMemberId: row.family_member_id as string | null,
    title: row.title as string,
    category: row.category as AchievementCategory,
    description: row.description as string | null,
    achievementDate: String(row.achievement_date).slice(0, 10),
    photoUrl: row.photo_url as string | null,
    status: (row.status as 'pending' | 'approved') ?? 'pending',
    submittedBy: row.submitted_by as string | null,
    approvedBy: row.approved_by as string | null,
    approvedAt: row.approved_at != null ? new Date(row.approved_at as string) : null,
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
  }
}

export async function GET(request: Request) {
  const session = await getSession(request)
  const { searchParams } = new URL(request.url)
  const statusParam = searchParams.get('status')
  const categoryParam = searchParams.get('category')
  const isAdmin = session?.user?.role === 'admin'

  try {
    if (statusParam === 'pending' && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const showPending = statusParam === 'pending' && isAdmin
    let rows: Record<string, unknown>[]
    if (showPending && categoryParam) {
      const r = await sql`SELECT * FROM achievements WHERE status = 'pending' AND category = ${categoryParam} ORDER BY created_at DESC`
      rows = r.rows as Record<string, unknown>[]
    } else if (showPending) {
      const r = await sql`SELECT * FROM achievements WHERE status = 'pending' ORDER BY created_at DESC`
      rows = r.rows as Record<string, unknown>[]
    } else if (categoryParam) {
      const r = await sql`SELECT * FROM achievements WHERE status = 'approved' AND category = ${categoryParam} ORDER BY achievement_date DESC, created_at DESC`
      rows = r.rows as Record<string, unknown>[]
    } else {
      const r = await sql`SELECT * FROM achievements WHERE status = 'approved' ORDER BY achievement_date DESC, created_at DESC`
      rows = r.rows as Record<string, unknown>[]
    }
    const list = rows.map(rowToAchievement)
    return NextResponse.json(list)
  } catch (e) {
    console.error('GET /api/achievements', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = achievementPostBodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
  }

  try {
    const { rows: fmRows } = await sql`
      SELECT id FROM family_members WHERE user_id = ${session.user.id} LIMIT 1
    `
    const familyMemberId = (fmRows as Record<string, unknown>[])[0]?.id as string | undefined

    const { title, category, description, achievementDate, photoUrl } = parsed.data
    const { rows } = await sql`
      INSERT INTO achievements (family_member_id, title, category, description, achievement_date, photo_url, status, submitted_by)
      VALUES (${familyMemberId ?? null}, ${title}, ${category}, ${description ?? null}, ${achievementDate}, ${photoUrl ?? null}, 'pending', ${session.user.id})
      RETURNING *
    `
    const row = (rows as Record<string, unknown>[])[0]
    const achievement = rowToAchievement(row)
    return NextResponse.json(achievement, { status: 201 })
  } catch (e) {
    console.error('POST /api/achievements', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

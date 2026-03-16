/**
 * GET /api/achievements/[id] - Get one achievement.
 * PATCH /api/achievements/[id] - Admin: update (e.g. approve/reject).
 * DELETE /api/achievements/[id] - Admin: delete.
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request)
  const { id } = await params

  try {
    const { rows } = await sql`SELECT * FROM achievements WHERE id = ${id}`
    const row = (rows as Record<string, unknown>[])[0]
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const status = (row.status as string) ?? 'approved'
    if (status !== 'approved' && session?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(rowToAchievement(row))
  } catch (e) {
    console.error('GET /api/achievements/[id]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const b = body as { status?: 'pending' | 'approved' }
  if (b.status !== 'approved' && b.status !== 'pending') {
    return NextResponse.json({ error: 'status must be approved or pending' }, { status: 400 })
  }

  try {
    if (b.status === 'approved') {
      await sql`
        UPDATE achievements SET
          status = 'approved',
          approved_by = ${session.user.id},
          approved_at = NOW(),
          updated_at = NOW()
        WHERE id = ${id}
      `
    } else {
      await sql`
        UPDATE achievements SET status = ${b.status}, updated_at = NOW() WHERE id = ${id}
      `
    }
    const { rows } = await sql`SELECT * FROM achievements WHERE id = ${id}`
    const row = (rows as Record<string, unknown>[])[0]
    if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(rowToAchievement(row))
  } catch (e) {
    console.error('PATCH /api/achievements/[id]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  try {
    await sql`DELETE FROM achievements WHERE id = ${id}`
    return new NextResponse(null, { status: 204 })
  } catch (e) {
    console.error('DELETE /api/achievements/[id]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * GET /api/reunion/[year]/rsvp - Get current user's RSVP.
 * POST /api/reunion/[year]/rsvp - Create or update RSVP (auth required).
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import { reunionRsvpBodySchema } from '@/lib/validations'
import type { ReunionRsvp } from '@/types'

const REUNION_YEAR_MIN = 2020
const REUNION_YEAR_MAX = 2030

function rowToRsvp(row: Record<string, unknown>): ReunionRsvp {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    reunionYear: row.reunion_year as number,
    attending: (row.attending as boolean) ?? false,
    adultsCount: (row.adults_count as number) ?? 0,
    childrenCount: (row.children_count as number) ?? 0,
    dietaryRestrictions: row.dietary_restrictions as string | null,
    lodgingNeeded: (row.lodging_needed as boolean) ?? false,
    specialRequests: row.special_requests as string | null,
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { year } = await params
  const y = parseInt(year, 10)
  if (Number.isNaN(y) || y < REUNION_YEAR_MIN || y > REUNION_YEAR_MAX) {
    return NextResponse.json({ error: 'Invalid year' }, { status: 400 })
  }

  try {
    const { rows } = await sql`
      SELECT * FROM reunion_rsvps
      WHERE user_id = ${session.user.id} AND reunion_year = ${y}
    `
    const row = (rows as Record<string, unknown>[])[0]
    if (!row) {
      return NextResponse.json(null)
    }
    return NextResponse.json(rowToRsvp(row))
  } catch (e) {
    console.error('GET /api/reunion/[year]/rsvp', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { year } = await params
  const y = parseInt(year, 10)
  if (Number.isNaN(y) || y < REUNION_YEAR_MIN || y > REUNION_YEAR_MAX) {
    return NextResponse.json({ error: 'Invalid year' }, { status: 400 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = reunionRsvpBodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
  }

  const { attending, adultsCount, childrenCount, dietaryRestrictions, lodgingNeeded, specialRequests } = parsed.data
  try {
    await sql`
      INSERT INTO reunion_rsvps (user_id, reunion_year, attending, adults_count, children_count, dietary_restrictions, lodging_needed, special_requests)
      VALUES (${session.user.id}, ${y}, ${attending}, ${adultsCount}, ${childrenCount}, ${dietaryRestrictions ?? null}, ${lodgingNeeded}, ${specialRequests ?? null})
      ON CONFLICT (user_id, reunion_year) DO UPDATE SET
        attending = EXCLUDED.attending,
        adults_count = EXCLUDED.adults_count,
        children_count = EXCLUDED.children_count,
        dietary_restrictions = EXCLUDED.dietary_restrictions,
        lodging_needed = EXCLUDED.lodging_needed,
        special_requests = EXCLUDED.special_requests,
        updated_at = NOW()
    `
    const { rows } = await sql`
      SELECT * FROM reunion_rsvps
      WHERE user_id = ${session.user.id} AND reunion_year = ${y}
    `
    const row = (rows as Record<string, unknown>[])[0]
    return NextResponse.json(rowToRsvp(row))
  } catch (e) {
    console.error('POST /api/reunion/[year]/rsvp', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

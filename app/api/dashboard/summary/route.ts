/**
 * GET /api/dashboard/summary - RSVP status, last payment, profile flag (auth).
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'

const REUNION_YEAR = 2027

export async function GET(request: Request) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { rows: rsvpRows } = await sql`
      SELECT attending, adults_count, children_count
      FROM reunion_rsvps
      WHERE user_id = ${session.user.id} AND reunion_year = ${REUNION_YEAR}
    `
    const rsvpRow = (rsvpRows as Record<string, unknown>[])[0]
    const rsvp = rsvpRow
      ? {
          attending: rsvpRow.attending as boolean,
          adultsCount: rsvpRow.adults_count as number,
          childrenCount: rsvpRow.children_count as number,
        }
      : null

    const { rows: paymentRows } = await sql`
      SELECT amount, payment_type, status, created_at
      FROM payments
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
      LIMIT 1
    `
    const paymentRow = (paymentRows as Record<string, unknown>[])[0]
    const lastPayment = paymentRow
      ? {
          amount: Number(paymentRow.amount),
          paymentType: paymentRow.payment_type as string,
          status: paymentRow.status as string,
          createdAt: paymentRow.created_at as string,
        }
      : null

    const { rows: fmRows } = await sql`
      SELECT id FROM family_members WHERE user_id = ${session.user.id} LIMIT 1
    `
    const hasProfile = (fmRows as unknown[]).length > 0

    return NextResponse.json({
      rsvp,
      lastPayment,
      hasProfile,
      reunionYear: REUNION_YEAR,
    })
  } catch (e) {
    console.error('GET /api/dashboard/summary', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

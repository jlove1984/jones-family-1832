/**
 * GET /api/payments/history - Current user's payment history (auth).
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import type { Payment } from '@/types'

function rowToPayment(row: Record<string, unknown>): Payment {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    stripePaymentIntentId: row.stripe_payment_intent_id as string | null,
    amount: Number(row.amount),
    currency: (row.currency as string) ?? 'USD',
    paymentType: row.payment_type as Payment['paymentType'],
    status: (row.status as string) ?? 'pending',
    reunionYear: row.reunion_year as number | null,
    metadata: row.metadata as Record<string, unknown> | null,
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
    const { rows } = await sql`
      SELECT * FROM payments
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
    `
    const list = (rows as Record<string, unknown>[]).map(rowToPayment)
    return NextResponse.json(list)
  } catch (e) {
    console.error('GET /api/payments/history', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/payments/create-intent - Create Stripe PaymentIntent (auth).
 * Returns { clientSecret } for Stripe Elements.
 */

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import { paymentsCreateIntentBodySchema } from '@/lib/validations'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

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
  const parsed = paymentsCreateIntentBodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
  }

  const { amount, paymentType, reunionYear } = parsed.data
  const amountCents = Math.round(amount * 100)

  if (!stripe) {
    return NextResponse.json(
      { error: 'Payments not configured' },
      { status: 503 }
    )
  }

  try {
    const pi = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: session.user.id,
        paymentType,
        ...(reunionYear != null && { reunionYear: String(reunionYear) }),
      },
    })

    await sql`
      INSERT INTO payments (user_id, stripe_payment_intent_id, amount, currency, payment_type, status, reunion_year)
      VALUES (${session.user.id}, ${pi.id}, ${amount}, 'USD', ${paymentType}, 'pending', ${reunionYear ?? null})
    `
    return NextResponse.json({ clientSecret: pi.client_secret })
  } catch (e) {
    console.error('POST /api/payments/create-intent', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

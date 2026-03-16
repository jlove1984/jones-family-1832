/**
 * POST /api/contact - Submit contact form (TDD 5.3).
 * Stores in contact_submissions; email routing can be added via Resend + env.
 */

import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { contactPostBodySchema } from '@/lib/validations'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = contactPostBodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
  }

  const { category, senderName, senderEmail, subject, message } = parsed.data
  try {
    const { rows } = await sql`
      INSERT INTO contact_submissions (category, sender_name, sender_email, subject, message)
      VALUES (${category}, ${senderName ?? null}, ${senderEmail}, ${subject ?? null}, ${message})
      RETURNING id, category, created_at
    `
    const row = (rows as Record<string, unknown>[])[0]
    return NextResponse.json({ id: row?.id, category, created_at: row?.created_at }, { status: 201 })
  } catch (e) {
    console.error('POST /api/contact', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

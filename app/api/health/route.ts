import { NextResponse } from 'next/server'
import { checkDatabase } from '@/lib/db'

const DB_CHECK_TIMEOUT_MS = 5000

/**
 * Health check endpoint (TDD 4.5, 8)
 * Returns 200 and { status: 'ok', db?, redis? } for CI/CD and monitoring.
 */
export async function GET() {
  const body: { status: string; db?: string; redis?: string } = {
    status: 'ok',
  }

  try {
    const dbOk = await Promise.race([
      checkDatabase(),
      new Promise<boolean>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), DB_CHECK_TIMEOUT_MS)
      ),
    ])
    if (dbOk === true) body.db = 'ok'
  } catch {
    // DB unreachable or timeout; leave body.db undefined
  }

  // Redis check can be added when Vercel KV is configured
  return NextResponse.json(body, { status: 200 })
}

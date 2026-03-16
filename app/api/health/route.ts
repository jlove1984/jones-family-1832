import { NextResponse } from 'next/server'

/**
 * Health check endpoint (TDD 4.5, 8)
 * Returns 200 and { status: 'ok', db?, redis? } for CI/CD and monitoring.
 */
export async function GET() {
  const body: { status: string; db?: string; redis?: string } = {
    status: 'ok',
  }
  // Optional: add db/redis checks when implemented (e.g. with 5s timeout)
  return NextResponse.json(body, { status: 200 })
}

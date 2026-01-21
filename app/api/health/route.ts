import { NextResponse } from 'next/server'

/**
 * Health check endpoint
 * Used for monitoring and deployment health verification
 */
export async function GET() {
  return NextResponse.json(
    { status: 'healthy', timestamp: new Date().toISOString() },
    { status: 200 }
  )
}

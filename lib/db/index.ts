/**
 * Database client and queries (TDD 4.3).
 * Uses @vercel/postgres (PostgreSQL). Set DATABASE_URL in env.
 */

import { sql } from '@vercel/postgres'

export { sql }

const DB_TIMEOUT_MS = 5000

/**
 * Execute a simple query to verify DB connectivity (for health check).
 */
export async function checkDatabase(): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), DB_TIMEOUT_MS)
    await sql`SELECT 1`
    clearTimeout(timeout)
    return true
  } catch {
    return false
  }
}

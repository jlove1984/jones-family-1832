/**
 * Get current session in API routes / server components.
 * Uses Better Auth getSession with the incoming request.
 */

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export type SessionUser = {
  id: string
  email: string
  name: string
  role?: string
}

/**
 * Returns current session and user, or null if not authenticated.
 * Call from Server Components or Route Handlers; pass request for Route Handlers.
 */
export async function getSession(request?: Request): Promise<{
  session: { id: string; userId: string; expiresAt: Date }
  user: SessionUser
} | null> {
  const h = request ? request.headers : (await headers()) as Headers
  const result = await auth.api.getSession({ headers: h })
  if (!result?.user) return null
  return {
    session: result.session as { id: string; userId: string; expiresAt: Date },
    user: {
      id: result.user.id,
      email: result.user.email ?? '',
      name: result.user.name ?? '',
      role: (result.user as { role?: string }).role,
    },
  }
}

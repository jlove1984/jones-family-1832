/**
 * Better Auth configuration (TDD 4.3, 5.3).
 * Uses PostgreSQL (pg Pool), HTTP-only cookies, email/password.
 */

import { betterAuth } from 'better-auth'
import { Pool } from 'pg'
import { nextCookies } from 'better-auth/next-js'

const pool =
  process.env.DATABASE_URL &&
  new Pool({
    connectionString: process.env.DATABASE_URL,
  })

export const auth = betterAuth({
  database: pool ?? undefined,
  secret: process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET,
  basePath: '/api/auth',
  baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'member',
      },
    },
  },
  plugins: [nextCookies()],
})

export type Auth = typeof auth

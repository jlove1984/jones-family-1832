/**
 * Better Auth client for React (sign in, sign up, session, magic link, email OTP, phone, passkey).
 */

import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields, magicLinkClient, emailOTPClient, phoneNumberClient } from 'better-auth/client/plugins'
import { passkeyClient } from '@better-auth/passkey/client'
import type { auth } from '@/lib/auth'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? undefined,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    magicLinkClient(),
    emailOTPClient(),
    phoneNumberClient(),
    passkeyClient(),
  ],
})

export const { signIn, signUp, signOut, useSession } = authClient

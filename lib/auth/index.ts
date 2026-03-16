/**
 * Better Auth configuration (TDD 4.3, 5.3).
 * Email/password, social (Google, Apple), magic link, email OTP, phone OTP, passkey.
 */

import { betterAuth } from 'better-auth'
import { magicLink, emailOTP, phoneNumber } from 'better-auth/plugins'
import { passkey } from '@better-auth/passkey'
import { Pool } from 'pg'
import { nextCookies } from 'better-auth/next-js'
import { sendEmail } from '@/lib/email'

const pool =
  process.env.DATABASE_URL &&
  new Pool({
    connectionString: process.env.DATABASE_URL,
  })

const baseURL = process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const auth = betterAuth({
  database: pool ?? undefined,
  secret: process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET,
  basePath: '/api/auth',
  baseURL,
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
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    }),
    ...(process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET && {
      apple: {
        clientId: process.env.APPLE_CLIENT_ID,
        clientSecret: process.env.APPLE_CLIENT_SECRET,
        ...(process.env.APPLE_APP_BUNDLE_IDENTIFIER && {
          appBundleIdentifier: process.env.APPLE_APP_BUNDLE_IDENTIFIER,
        }),
      },
    }),
  },
  trustedOrigins: ['https://appleid.apple.com'],
  plugins: [
    nextCookies(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmail({
          to: email,
          subject: 'Sign in to Jones Family Hub',
          text: `Click the link to sign in: ${url}\n\nThis link expires in 5 minutes.`,
        })
      },
      expiresIn: 60 * 5,
    }),
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        const subject =
          type === 'sign-in'
            ? 'Your sign-in code'
            : type === 'forget-password'
              ? 'Reset your password'
              : 'Verify your email'
        await sendEmail({
          to: email,
          subject: `${subject} – Jones Family Hub`,
          text: `Your code is: ${otp}\n\nIt expires in 5 minutes.`,
        })
      },
      expiresIn: 60 * 5,
    }),
    phoneNumber({
      sendOTP: async ({ phoneNumber: phone, code }) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[phone OTP] ${phone} → ${code}`)
        }
        // Production: set TWILIO_* env and implement SMS in a custom action or use another provider
      },
      signUpOnVerification: {
        getTempEmail: (phone) => `phone-${phone.replace(/\D/g, '')}@jonesfamily.placeholder`,
        getTempName: (phone) => phone,
      },
    }),
    passkey({
      rpID: typeof window !== 'undefined' ? window.location.hostname : new URL(baseURL).hostname,
      rpName: 'Jones Family Hub',
      origin: baseURL,
    }),
  ],
})

export type Auth = typeof auth

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { data, error: err } = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    })
    setLoading(false)
    if (err) {
      setError(err.message ?? 'Invalid email or password')
      return
    }
    if (data) router.push(callbackUrl)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="rounded-lg border border-family-burgundy-DEFAULT dark:border-family-burgundy-light bg-family-burgundy-DEFAULT/10 dark:bg-family-burgundy-light/10 px-4 py-3 text-sm text-family-burgundy-DEFAULT dark:text-family-burgundy-light">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="login-email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-4 py-2 text-charcoal dark:text-light-text focus:border-heritage-green-DEFAULT dark:focus:border-heritage-green-light focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT/20"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-4 py-2 text-charcoal dark:text-light-text focus:border-heritage-green-DEFAULT dark:focus:border-heritage-green-light focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT/20"
        />
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-heritage-green-DEFAULT dark:bg-heritage-green-light px-4 py-2.5 font-semibold text-white dark:text-rich-black hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Log in'}
        </button>
        <Link
          href="/register"
          className="text-center text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
        >
          Create account
        </Link>
        <Link href="/" className="text-center text-sm text-slate-gray dark:text-muted-text hover:underline">
          Back to home
        </Link>
      </div>
    </form>
  )
}

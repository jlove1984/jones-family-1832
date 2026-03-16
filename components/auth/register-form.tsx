'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { SocialSignIn } from '@/components/auth/social-sign-in'
import { AlternativeSignIn } from '@/components/auth/alternative-sign-in'

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { data, error: err } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: '/dashboard',
    })
    setLoading(false)
    if (err) {
      setError(err.message ?? 'Registration failed')
      return
    }
    if (data) router.push('/dashboard')
  }

  return (
    <div className="flex flex-col gap-4">
      <SocialSignIn callbackURL="/dashboard" disabled={loading} />
      <div className="relative">
        <span className="block text-center text-sm text-slate-gray dark:text-muted-text before:absolute before:inset-0 before:top-1/2 before:border-t before:border-light-gray dark:before:border-medium-gray">
          <span className="relative bg-white dark:bg-dark-gray px-2">or continue with email</span>
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <Alert variant="error" description={error} />}
        <div>
        <label htmlFor="register-name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-4 py-2 text-charcoal dark:text-light-text focus:border-heritage-green-DEFAULT dark:focus:border-heritage-green-light focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT/20"
        />
      </div>
      <div>
        <label htmlFor="register-email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-4 py-2 text-charcoal dark:text-light-text focus:border-heritage-green-DEFAULT dark:focus:border-heritage-green-light focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT/20"
        />
      </div>
      <div>
        <label htmlFor="register-password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-4 py-2 text-charcoal dark:text-light-text focus:border-heritage-green-DEFAULT dark:focus:border-heritage-green-light focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT/20"
        />
        <p className="mt-1 text-xs text-slate-gray dark:text-muted-text">At least 8 characters</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button type="submit" variant="primary" className="w-full" loading={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
        <Link
          href="/login"
          className="text-center text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
        >
          Already have an account? Log in
        </Link>
      </div>
    </form>

      <div className="relative mt-2">
        <span className="block text-center text-sm text-slate-gray dark:text-muted-text before:absolute before:inset-0 before:top-1/2 before:border-t before:border-light-gray dark:before:border-medium-gray">
          <span className="relative bg-white dark:bg-dark-gray px-2">or</span>
        </span>
      </div>
      <button
        type="button"
        onClick={() => setShowMoreOptions((v) => !v)}
        className="text-center text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
      >
        {showMoreOptions ? 'Hide' : 'More options'} (magic link, email code, phone)
      </button>
      {showMoreOptions && (
        <div className="mt-2 pt-2 border-t border-light-gray dark:border-medium-gray">
          <AlternativeSignIn callbackURL="/dashboard" disabled={loading} />
        </div>
      )}
    </div>
  )
}

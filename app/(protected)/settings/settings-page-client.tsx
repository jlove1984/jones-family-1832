'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { ButtonLink, Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { KeyRound } from 'lucide-react'

export function SettingsPageClient() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' })
      return
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters.' })
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error ?? 'Failed to change password.' })
        return
      }
      setMessage({ type: 'success', text: 'Password updated successfully.' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Account settings"
        description="Manage your account and security"
        actions={
          <ButtonLink variant="tertiary" size="sm" href="/profile">
            ← Profile
          </ButtonLink>
        }
      />

      <div className="mt-8 space-y-8">
        <section className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
          <h2 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
            <KeyRound className="size-5" />
            Change password
          </h2>
          {message && (
            <div className="mb-4">
              <Alert
                variant={message.type === 'success' ? 'success' : 'error'}
                description={message.text}
              />
            </div>
          )}
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="current-password" className="mb-1 block text-sm font-medium">
                Current password
              </label>
              <input
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-4 py-2 text-charcoal dark:text-light-text focus:border-heritage-green-DEFAULT dark:focus:border-heritage-green-light focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT/20"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="mb-1 block text-sm font-medium">
                New password
              </label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-4 py-2 text-charcoal dark:text-light-text focus:border-heritage-green-DEFAULT dark:focus:border-heritage-green-light focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT/20"
              />
              <p className="mt-1 text-xs text-slate-gray dark:text-muted-text">
                At least 8 characters
              </p>
            </div>
            <div>
              <label htmlFor="confirm-password" className="mb-1 block text-sm font-medium">
                Confirm new password
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-4 py-2 text-charcoal dark:text-light-text focus:border-heritage-green-DEFAULT dark:focus:border-heritage-green-light focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT/20"
              />
            </div>
            <Button type="submit" variant="primary" loading={loading} disabled={loading}>
              Update password
            </Button>
          </form>
        </section>

        <p className="text-sm text-slate-gray dark:text-muted-text">
          <Link href="/profile" className="text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
            ← Back to profile
          </Link>
        </p>
      </div>
    </>
  )
}

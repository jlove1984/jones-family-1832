'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { KeyRound, Mail, Link2, Smartphone } from 'lucide-react'

const inputClass =
  'w-full rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-4 py-2 text-charcoal dark:text-light-text focus:border-heritage-green-DEFAULT dark:focus:border-heritage-green-light focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT/20'

export interface AlternativeSignInProps {
  callbackURL: string
  disabled?: boolean
}

export function AlternativeSignIn({ callbackURL, disabled }: AlternativeSignInProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  // Magic link
  const [magicEmail, setMagicEmail] = useState('')
  const [magicSent, setMagicSent] = useState(false)
  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading('magic')
    const { error: err } = await authClient.signIn.magicLink({
      email: magicEmail,
      callbackURL,
    })
    setLoading(null)
    if (err) {
      setError(err.message ?? 'Failed to send link')
      return
    }
    setMagicSent(true)
  }

  // Email OTP
  const [otpEmail, setOtpEmail] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  async function handleSendEmailOtp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading('otp-send')
    const { error: err } = await authClient.emailOtp.sendVerificationOtp({
      email: otpEmail,
      type: 'sign-in',
    })
    setLoading(null)
    if (err) {
      setError(err.message ?? 'Failed to send code')
      return
    }
    setOtpSent(true)
  }
  async function handleVerifyEmailOtp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading('otp-verify')
    const { data, error: err } = await authClient.signIn.emailOtp({
      email: otpEmail,
      otp: otpCode,
    })
    setLoading(null)
    if (err) {
      setError(err.message ?? 'Invalid code')
      return
    }
    if (data) router.push(callbackURL)
  }

  // Phone
  const [phone, setPhone] = useState('')
  const [phoneCode, setPhoneCode] = useState('')
  const [phoneSent, setPhoneSent] = useState(false)
  async function handleSendPhoneOtp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const normalized = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`
    setLoading('phone-send')
    const { error: err } = await authClient.phoneNumber.sendOtp({ phoneNumber: normalized })
    setLoading(null)
    if (err) {
      setError(err.message ?? 'Failed to send code')
      return
    }
    setPhoneSent(true)
  }
  async function handleVerifyPhoneOtp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const normalized = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`
    setLoading('phone-verify')
    const { data, error: err } = await authClient.phoneNumber.verify({
      phoneNumber: normalized,
      code: phoneCode,
    })
    setLoading(null)
    if (err) {
      setError(err.message ?? 'Invalid code')
      return
    }
    if (data) router.push(callbackURL)
  }

  // Passkey
  async function handlePasskey() {
    setError(null)
    setLoading('passkey')
    const { data, error: err } = await authClient.signIn.passkey({
      callbackURL,
      fetchOptions: {
        onSuccess: () => router.push(callbackURL),
      },
    })
    setLoading(null)
    if (err) {
      setError(err.message ?? 'Passkey sign-in failed')
      return
    }
    if (data) router.push(callbackURL)
  }

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert variant="error" description={error} />}

      {/* Magic link */}
      <div className="rounded-lg border border-light-gray dark:border-medium-gray p-3">
        <p className="text-xs font-medium text-slate-gray dark:text-muted-text mb-2 flex items-center gap-1.5">
          <Link2 className="size-3.5" />
          Magic link
        </p>
        {magicSent ? (
          <p className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light">
            Check your email for the sign-in link.
          </p>
        ) : (
          <form onSubmit={handleMagicLink} className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              value={magicEmail}
              onChange={(e) => setMagicEmail(e.target.value)}
              required
              className={inputClass}
              disabled={disabled}
            />
            <Button type="submit" variant="secondary" size="sm" disabled={disabled || loading === 'magic'} loading={loading === 'magic'}>
              Send link
            </Button>
          </form>
        )}
      </div>

      {/* Email OTP */}
      <div className="rounded-lg border border-light-gray dark:border-medium-gray p-3">
        <p className="text-xs font-medium text-slate-gray dark:text-muted-text mb-2 flex items-center gap-1.5">
          <Mail className="size-3.5" />
          Email code
        </p>
        {!otpSent ? (
          <form onSubmit={handleSendEmailOtp} className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              value={otpEmail}
              onChange={(e) => setOtpEmail(e.target.value)}
              required
              className={inputClass}
              disabled={disabled}
            />
            <Button type="submit" variant="secondary" size="sm" disabled={disabled || loading === 'otp-send'} loading={loading === 'otp-send'}>
              Send code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyEmailOtp} className="flex flex-col gap-2">
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              className={inputClass}
              disabled={disabled}
            />
            <div className="flex gap-2">
              <Button type="submit" variant="primary" size="sm" className="flex-1" disabled={disabled || loading === 'otp-verify'} loading={loading === 'otp-verify'}>
                Verify
              </Button>
              <Button
                type="button"
                variant="tertiary"
                size="sm"
                onClick={() => { setOtpSent(false); setOtpCode('') }}
                disabled={disabled}
              >
                Back
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Phone */}
      <div className="rounded-lg border border-light-gray dark:border-medium-gray p-3">
        <p className="text-xs font-medium text-slate-gray dark:text-muted-text mb-2 flex items-center gap-1.5">
          <Smartphone className="size-3.5" />
          Phone number
        </p>
        {!phoneSent ? (
          <form onSubmit={handleSendPhoneOtp} className="flex gap-2">
            <input
              type="tel"
              placeholder="+1 555 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={inputClass}
              disabled={disabled}
            />
            <Button type="submit" variant="secondary" size="sm" disabled={disabled || loading === 'phone-send'} loading={loading === 'phone-send'}>
              Send code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyPhoneOtp} className="flex flex-col gap-2">
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              className={inputClass}
              disabled={disabled}
            />
            <div className="flex gap-2">
              <Button type="submit" variant="primary" size="sm" className="flex-1" disabled={disabled || loading === 'phone-verify'} loading={loading === 'phone-verify'}>
                Verify
              </Button>
              <Button
                type="button"
                variant="tertiary"
                size="sm"
                onClick={() => { setPhoneSent(false); setPhoneCode('') }}
                disabled={disabled}
              >
                Back
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Passkey */}
      <div className="rounded-lg border border-light-gray dark:border-medium-gray p-3">
        <p className="text-xs font-medium text-slate-gray dark:text-muted-text mb-2 flex items-center gap-1.5">
          <KeyRound className="size-3.5" />
          Passkey
        </p>
        <Button
          type="button"
          variant="secondary"
          size="default"
          className="w-full"
          disabled={disabled || loading === 'passkey'}
          loading={loading === 'passkey'}
          onClick={handlePasskey}
        >
          Sign in with passkey
        </Button>
      </div>
    </div>
  )
}

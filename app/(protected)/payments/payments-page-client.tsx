'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { paymentsCreateIntentBodySchema, type PaymentsCreateIntentBody } from '@/lib/validations'
import type { z } from 'zod'
import type { Payment } from '@/types'

const PAYMENT_TYPES = ['adult', 'youth', 'senior', 'donation'] as const

type FormData = z.infer<typeof paymentsCreateIntentBodySchema>

export function PaymentsPageClient() {
  const [history, setHistory] = useState<Payment[]>([])
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingHistory, setLoadingHistory] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(paymentsCreateIntentBodySchema),
    defaultValues: {
      amount: 50,
      paymentType: 'adult',
      reunionYear: 2027,
    },
  })

  function loadHistory() {
    fetch('/api/payments/history')
      .then((res) => (res.ok ? res.json() : []))
      .then(setHistory)
      .catch(() => setHistory([]))
      .finally(() => setLoadingHistory(false))
  }

  useEffect(() => {
    loadHistory()
  }, [])

  async function onSubmit(data: FormData) {
    setError(null)
    setClientSecret(null)
    const body: PaymentsCreateIntentBody = {
      amount: data.amount,
      paymentType: data.paymentType,
      reunionYear: data.reunionYear ?? null,
    }
    const res = await fetch('/api/payments/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError(json.error ?? 'Failed to create payment')
      return
    }
    if (json.clientSecret) {
      setClientSecret(json.clientSecret)
      loadHistory()
      reset()
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-display font-semibold">Payments</h1>
        <Link href="/" className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
          Back to home
        </Link>
      </div>

      <div className="mb-8 rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
        <h2 className="text-lg font-display font-semibold mb-4">Reunion dues & donations</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              {...register('paymentType')}
              autoComplete="off"
              className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
            >
              {PAYMENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount (USD) *</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              {...register('amount', { valueAsNumber: true })}
              autoComplete="off"
              className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Reunion year</label>
            <input
              type="number"
              min={2020}
              max={2030}
              {...register('reunionYear', { valueAsNumber: true })}
              autoComplete="off"
              className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Creating…' : 'Create payment'}
          </button>
        </form>
        {clientSecret && (
          <div className="mt-4 p-4 rounded-md bg-green-50 dark:bg-green-950/20 text-heritage-green-DEFAULT dark:text-heritage-green-light text-sm">
            Payment intent created. Complete payment with Stripe Elements using the client secret (or use Stripe Checkout).
          </div>
        )}
      </div>

      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
        <h2 className="text-lg font-display font-semibold mb-4">Payment history</h2>
        {loadingHistory ? (
          <p className="text-slate-gray dark:text-muted-text">Loading…</p>
        ) : history.length === 0 ? (
          <p className="text-slate-gray dark:text-muted-text">No payments yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((p) => (
              <li key={p.id} className="flex justify-between text-sm">
                <span>${p.amount} {p.paymentType} — {p.status}</span>
                <span className="text-slate-gray dark:text-muted-text">
                  {new Date(p.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

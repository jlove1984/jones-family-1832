'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactPostBodySchema, type ContactPostBody } from '@/lib/validations'
import type { z } from 'zod'

const CATEGORIES = ['Directory', 'Reunion', 'Payments', 'Media'] as const

type FormData = z.infer<typeof contactPostBodySchema>

export function ContactPageClient() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactPostBodySchema),
    defaultValues: {
      category: 'Reunion',
      senderName: '',
      senderEmail: '',
      subject: '',
      message: '',
    },
  })

  async function onSubmit(data: FormData) {
    setError(null)
    const body: ContactPostBody = {
      category: data.category,
      senderName: data.senderName || null,
      senderEmail: data.senderEmail,
      subject: data.subject || null,
      message: data.message,
    }
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      setError(err.error ?? 'Failed to send')
      return
    }
    setSuccess(true)
    reset()
  }

  if (success) {
    return (
      <div className="container mx-auto max-w-md px-4 py-16">
        <div className="rounded-card border border-heritage-green-DEFAULT/50 dark:border-heritage-green-light/50 bg-green-50 dark:bg-green-950/20 p-8 text-center">
          <h1 className="text-2xl font-display font-semibold mb-4">Message sent</h1>
          <p className="text-slate-gray dark:text-muted-text mb-6">
            Thank you. We will get back to you as soon as we can.
          </p>
          <Link href="/" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-semibold hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-display font-semibold">Contact Us</h1>
        <Link href="/" className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
          Back to home
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select
            {...register('category')}
            className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your name</label>
          <input {...register('senderName')} className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input type="email" {...register('senderEmail')} className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm" />
          {errors.senderEmail && <p className="text-red-500 text-xs mt-1">{errors.senderEmail.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input {...register('subject')} className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message *</label>
          <textarea {...register('message')} rows={5} className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm" />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white py-2 text-sm font-medium disabled:opacity-50">
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </div>
  )
}

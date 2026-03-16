'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { achievementPostBodySchema, type AchievementPostBody } from '@/lib/validations'
import type { z } from 'zod'
import { CATEGORIES } from './achievement-card'

type FormData = z.infer<typeof achievementPostBodySchema>

export function AchievementSubmitForm({ onSuccess }: { onSuccess?: () => void }) {
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(achievementPostBodySchema),
    defaultValues: {
      title: '',
      category: 'Graduation',
      description: '',
      achievementDate: '',
      photoUrl: '',
    },
  })

  async function onSubmit(data: FormData) {
    const body: AchievementPostBody = {
      title: data.title,
      category: data.category,
      description: data.description || undefined,
      achievementDate: data.achievementDate,
      photoUrl: data.photoUrl || undefined,
    }
    const res = await fetch('/api/achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error ?? 'Submit failed')
    }
    setSuccess(true)
    reset()
    onSuccess?.()
  }

  if (success) {
    return (
      <div className="rounded-card border border-heritage-green-DEFAULT/50 dark:border-heritage-green-light/50 bg-green-50 dark:bg-green-950/20 p-4 text-heritage-green-DEFAULT dark:text-heritage-green-light">
        <p className="font-medium">Achievement submitted!</p>
        <p className="text-sm mt-1">It will appear after an admin approves it.</p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-2 text-sm underline"
        >
          Submit another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input
          {...register('title')}
          autoComplete="off"
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Category *</label>
        <select
          {...register('category')}
          autoComplete="off"
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date *</label>
        <input
          {...register('achievementDate')}
          type="date"
          autoComplete="off"
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        />
        {errors.achievementDate && <p className="text-red-500 text-xs mt-1">{errors.achievementDate.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          autoComplete="off"
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Photo URL</label>
        <input
          {...register('photoUrl')}
          type="url"
          autoComplete="url"
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        />
        {errors.photoUrl && <p className="text-red-500 text-xs mt-1">{errors.photoUrl.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting…' : 'Submit achievement'}
      </button>
    </form>
  )
}

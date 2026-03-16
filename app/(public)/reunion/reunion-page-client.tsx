'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reunionRsvpBodySchema, type ReunionRsvpBody } from '@/lib/validations'
import type { z } from 'zod'
import type { ReunionContent } from '@/types'

const REUNION_YEAR = 2027

type RsvpFormData = z.infer<typeof reunionRsvpBodySchema>

export function ReunionPageClient() {
  const [content, setContent] = useState<ReunionContent[]>([])
  const [rsvp, setRsvp] = useState<RsvpFormData | null>(null)
  const [loadingContent, setLoadingContent] = useState(true)
  const [loadingRsvp, setLoadingRsvp] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RsvpFormData>({
    resolver: zodResolver(reunionRsvpBodySchema),
    defaultValues: {
      attending: false,
      adultsCount: 1,
      childrenCount: 0,
      lodgingNeeded: false,
      dietaryRestrictions: '',
      specialRequests: '',
    },
  })

  useEffect(() => {
    fetch(`/api/reunion/${REUNION_YEAR}`)
      .then((res) => res.ok ? res.json() : [])
      .then(setContent)
      .finally(() => setLoadingContent(false))
  }, [])

  useEffect(() => {
    fetch(`/api/reunion/${REUNION_YEAR}/rsvp`)
      .then((res) => {
        if (res.status === 401) return null
        if (!res.ok) return null
        return res.json()
      })
      .then((data) => {
        if (data) {
          setRsvp({
            attending: data.attending,
            adultsCount: data.adultsCount ?? data.adults_count ?? 1,
            childrenCount: data.childrenCount ?? data.children_count ?? 0,
            lodgingNeeded: data.lodgingNeeded ?? data.lodging_needed ?? false,
            dietaryRestrictions: data.dietaryRestrictions ?? data.dietary_restrictions ?? null,
            specialRequests: data.specialRequests ?? data.special_requests ?? null,
          })
          reset({
            attending: data.attending,
            adultsCount: data.adultsCount ?? data.adults_count ?? 1,
            childrenCount: data.childrenCount ?? data.children_count ?? 0,
            lodgingNeeded: data.lodgingNeeded ?? data.lodging_needed ?? false,
            dietaryRestrictions: data.dietaryRestrictions ?? data.dietary_restrictions ?? '',
            specialRequests: data.specialRequests ?? data.special_requests ?? '',
          })
        }
      })
      .finally(() => setLoadingRsvp(false))
  }, [reset])

  async function onSubmit(data: RsvpFormData) {
    setError(null)
    const res = await fetch(`/api/reunion/${REUNION_YEAR}/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data as ReunionRsvpBody),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      setError(err.error ?? 'Failed to save')
      return
    }
    setSaved(true)
    setRsvp(data)
  }

  const contentByKey = Object.fromEntries(content.map((c) => [c.contentKey, c.contentValue]))

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-display font-semibold">Reunion {REUNION_YEAR}</h1>
        <Link href="/" className="text-sm text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
          Back to home
        </Link>
      </div>

      {loadingContent ? null : (
        <div className="mb-8 rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark space-y-4">
          {(contentByKey.dates || contentByKey.location || contentByKey.theme) && (
            <>
              {contentByKey.dates && <p><strong>Dates:</strong> {contentByKey.dates}</p>}
              {contentByKey.location && <p><strong>Location:</strong> {contentByKey.location}</p>}
              {contentByKey.theme && <p><strong>Theme:</strong> {contentByKey.theme}</p>}
            </>
          )}
          {content.length === 0 && (
            <p className="text-slate-gray dark:text-muted-text">Event details will be posted here.</p>
          )}
        </div>
      )}

      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
        <h2 className="text-lg font-display font-semibold mb-4">RSVP</h2>
        <p className="text-sm text-slate-gray dark:text-muted-text mb-4">
          Log in to submit or update your RSVP.
        </p>
        {loadingRsvp ? (
          <p className="text-slate-gray dark:text-muted-text">Loading…</p>
        ) : rsvp === undefined && !loadingRsvp ? (
          <p className="text-slate-gray dark:text-muted-text">Log in to see and submit your RSVP.</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('attending')} autoComplete="off" className="rounded" />
              <span>I plan to attend</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Adults</label>
                <input type="number" min={0} max={50} {...register('adultsCount', { valueAsNumber: true })} autoComplete="off" className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm" />
                {errors.adultsCount && <p className="text-red-500 text-xs mt-1">{errors.adultsCount.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Children</label>
                <input type="number" min={0} max={50} {...register('childrenCount', { valueAsNumber: true })} autoComplete="off" className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm" />
                {errors.childrenCount && <p className="text-red-500 text-xs mt-1">{errors.childrenCount.message}</p>}
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('lodgingNeeded')} autoComplete="off" className="rounded" />
              <span>I need lodging</span>
            </label>
            <div>
              <label className="block text-sm font-medium mb-1">Dietary restrictions</label>
              <input {...register('dietaryRestrictions')} autoComplete="off" className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Special requests</label>
              <textarea {...register('specialRequests')} rows={2} autoComplete="off" className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {saved && <p className="text-heritage-green-DEFAULT dark:text-heritage-green-light text-sm">RSVP saved.</p>}
            <button type="submit" disabled={isSubmitting} className="rounded-md bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white px-4 py-2 text-sm font-medium disabled:opacity-50">
              {isSubmitting ? 'Saving…' : 'Save RSVP'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { directoryPatchBodySchema, type DirectoryPatchBody } from '@/lib/validations'
import type { FamilyMember } from '@/types'
import type { z } from 'zod'

type ProfileFormProps = {
  profile: FamilyMember
  onSuccess?: () => void
}

type FormData = z.infer<typeof directoryPatchBodySchema>

export function ProfileForm({ profile, onSuccess }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(directoryPatchBodySchema),
    defaultValues: {
      branch: profile.branch ?? '',
      phone: profile.phone ?? '',
      city: profile.city ?? '',
      state: profile.state ?? '',
      householdSize: profile.householdSize ?? 1,
      profilePhotoUrl: profile.profilePhotoUrl ?? '',
      bio: profile.bio ?? '',
      birthDate: profile.birthDate ?? '',
      birthYear: profile.birthYear ?? undefined,
      showBirthday: profile.showBirthday,
      birthdayEmailNotifications: profile.birthdayEmailNotifications,
      isVisible: profile.isVisible,
    },
  })

  async function onSubmit(data: FormData) {
    const body: DirectoryPatchBody = {
      branch: data.branch === '' ? null : data.branch ?? undefined,
      phone: data.phone === '' ? null : data.phone ?? undefined,
      city: data.city === '' ? null : data.city ?? undefined,
      state: data.state === '' ? null : data.state ?? undefined,
      householdSize: data.householdSize,
      profilePhotoUrl: data.profilePhotoUrl === '' ? null : data.profilePhotoUrl ?? undefined,
      bio: data.bio === '' ? null : data.bio ?? undefined,
      birthDate: data.birthDate === '' ? null : data.birthDate ?? undefined,
      birthYear: data.birthYear ?? undefined,
      showBirthday: data.showBirthday,
      birthdayEmailNotifications: data.birthdayEmailNotifications,
      isVisible: data.isVisible,
    }
    const cleaned = Object.fromEntries(
      Object.entries(body).filter(([, v]) => v !== undefined)
    ) as DirectoryPatchBody
    const res = await fetch(`/api/directory/${profile.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleaned),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error ?? 'Update failed')
    }
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Branch</label>
        <input
          {...register('branch')}
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        />
        {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          {...register('phone')}
          type="tel"
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            {...register('city')}
            className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            {...register('state')}
            className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Household size</label>
        <input
          {...register('householdSize', { valueAsNumber: true })}
          type="number"
          min={1}
          max={50}
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        />
        {errors.householdSize && <p className="text-red-500 text-xs mt-1">{errors.householdSize.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Profile photo URL</label>
        <input
          {...register('profilePhotoUrl')}
          type="url"
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        />
        {errors.profilePhotoUrl && <p className="text-red-500 text-xs mt-1">{errors.profilePhotoUrl.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          {...register('bio')}
          rows={4}
          className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
        />
        {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Birth date</label>
          <input
            {...register('birthDate')}
            type="date"
            className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
          />
          {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Birth year</label>
          <input
            {...register('birthYear', { valueAsNumber: true })}
            type="number"
            min={1900}
            max={2100}
            className="w-full rounded-md border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 text-sm"
          />
          {errors.birthYear && <p className="text-red-500 text-xs mt-1">{errors.birthYear.message}</p>}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('showBirthday')} className="rounded" />
          <span className="text-sm">Show birthday in directory</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('birthdayEmailNotifications')} className="rounded" />
          <span className="text-sm">Birthday email reminders</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('isVisible')} className="rounded" />
          <span className="text-sm">Visible in directory</span>
        </label>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  )
}

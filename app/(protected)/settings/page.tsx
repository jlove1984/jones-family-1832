import { getSession } from '@/lib/auth/get-session'
import { redirect } from 'next/navigation'
import { SettingsPageClient } from './settings-page-client'

export const metadata = {
  title: 'Account settings',
  description: 'Manage your account and security',
}

export default async function SettingsPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <SettingsPageClient />
    </div>
  )
}

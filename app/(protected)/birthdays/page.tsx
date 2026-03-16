import { BirthdaysPageClient } from './birthdays-page-client'

export const metadata = {
  title: 'Birthdays',
  description: 'Family birthdays calendar (login required)',
}

export default function BirthdaysPage() {
  return <BirthdaysPageClient />
}

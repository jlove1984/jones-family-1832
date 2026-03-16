import { DirectoryPageClient } from './directory-page-client'

export const metadata = {
  title: 'Family Directory',
  description: 'View and search family members (login required)',
}

export default function DirectoryPage() {
  return <DirectoryPageClient />
}

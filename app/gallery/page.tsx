import Link from 'next/link'

export const metadata = {
  title: 'Photo Gallery',
  description: 'Family photos and videos',
}

export default function GalleryPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark">
        <h1 className="text-2xl font-display font-semibold mb-4">Photo Gallery</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          Albums with year/category filters, lightbox viewing, and download will be available once the gallery API and Vercel Blob storage are implemented.
        </p>
        <Link href="/" className="text-heritage-green-DEFAULT dark:text-heritage-green-light font-semibold hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

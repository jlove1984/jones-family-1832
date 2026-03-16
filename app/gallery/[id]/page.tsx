import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import { GalleryAlbumPageClient } from './gallery-album-page-client'
import type { GalleryAlbum, GalleryMedia } from '@/types'

function rowToAlbum(row: Record<string, unknown>): GalleryAlbum {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string | null,
    year: row.year as number | null,
    category: row.category as string | null,
    coverPhotoUrl: row.cover_photo_url as string | null,
    createdBy: row.created_by as string | null,
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
  }
}

function rowToMedia(row: Record<string, unknown>): GalleryMedia {
  return {
    id: row.id as string,
    albumId: row.album_id as string,
    mediaUrl: row.media_url as string,
    mediaType: row.media_type as string,
    caption: row.caption as string | null,
    uploadedBy: row.uploaded_by as string | null,
    fileSize: row.file_size as number | null,
    width: row.width as number | null,
    height: row.height as number | null,
    createdAt: new Date(row.created_at as string),
  }
}

export default async function GalleryAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getSession()
  if (!session) notFound()

  const { id } = await params
  const { rows: albumRows } = await sql`SELECT * FROM gallery_albums WHERE id = ${id}`
  const albumRow = (albumRows as Record<string, unknown>[])[0]
  if (!albumRow) notFound()

  const { rows: mediaRows } = await sql`SELECT * FROM gallery_media WHERE album_id = ${id} ORDER BY created_at ASC`
  const album = rowToAlbum(albumRow)
  const media = (mediaRows as Record<string, unknown>[]).map(rowToMedia)

  return (
    <GalleryAlbumPageClient
      album={{ ...album, media }}
      isAdmin={session.user.role === 'admin'}
    />
  )
}

/**
 * POST /api/gallery/albums/[id]/media - Add media to album (auth required).
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import { galleryMediaPostBodySchema } from '@/lib/validations'
import type { GalleryMedia } from '@/types'

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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id: albumId } = await params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = galleryMediaPostBodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
  }

  try {
    const { rows: albumRows } = await sql`SELECT id FROM gallery_albums WHERE id = ${albumId}`
    if ((albumRows as unknown[]).length === 0) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    const { mediaUrl, mediaType, caption } = parsed.data
    const { rows } = await sql`
      INSERT INTO gallery_media (album_id, media_url, media_type, caption, uploaded_by)
      VALUES (${albumId}, ${mediaUrl}, ${mediaType}, ${caption ?? null}, ${session.user.id})
      RETURNING *
    `
    const row = (rows as Record<string, unknown>[])[0]
    return NextResponse.json(rowToMedia(row), { status: 201 })
  } catch (e) {
    console.error('POST /api/gallery/albums/[id]/media', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
